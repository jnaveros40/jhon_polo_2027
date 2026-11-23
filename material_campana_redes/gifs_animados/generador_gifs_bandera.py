import os
import re
import math
import xml.etree.ElementTree as ET
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
SVG_PATH = os.path.join(ROOT_DIR, "public", "images", "caballo-liberal.svg")
GIF_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "gifs_animados")
os.makedirs(GIF_DIR, exist_ok=True)


def parse_svg_path_to_subpaths(d_str, steps_per_curve=28):
    """
    Parse an SVG path string ('M x y L x y C x1 y1, x2 y2, x3 y3 Z')
    into a list of closed polygon point lists [(x, y), ...].
    """
    token_re = re.compile(r"([MLCZmlcz])|(-?\d+(?:\.\d+)?)")
    tokens = token_re.findall(d_str)

    subpaths = []
    curr_poly = []
    cmd = None
    nums = []
    cx, cy = 0.0, 0.0

    def flush_cmd(c, vals):
        nonlocal cx, cy, curr_poly, subpaths
        if c == "M":
            if curr_poly:
                subpaths.append(curr_poly)
            curr_poly = []
            for i in range(0, len(vals), 2):
                cx, cy = vals[i], vals[i + 1]
                curr_poly.append((cx, cy))
        elif c == "L":
            for i in range(0, len(vals), 2):
                cx, cy = vals[i], vals[i + 1]
                curr_poly.append((cx, cy))
        elif c == "C":
            for i in range(0, len(vals), 6):
                x1, y1, x2, y2, x3, y3 = vals[i:i + 6]
                x0, y0 = cx, cy
                for s in range(1, steps_per_curve + 1):
                    t = s / float(steps_per_curve)
                    mt = 1.0 - t
                    bx = (mt**3)*x0 + 3*(mt**2)*t*x1 + 3*mt*(t**2)*x2 + (t**3)*x3
                    by = (mt**3)*y0 + 3*(mt**2)*t*y1 + 3*mt*(t**2)*y2 + (t**3)*y3
                    curr_poly.append((bx, by))
                cx, cy = x3, y3
        elif c == "Z":
            if curr_poly:
                subpaths.append(curr_poly)
                curr_poly = []

    for cmd_tok, num_tok in tokens:
        if cmd_tok:
            if cmd is not None:
                flush_cmd(cmd, nums)
            cmd = cmd_tok.upper()
            nums = []
            if cmd == "Z":
                flush_cmd("Z", [])
                cmd = None
        elif num_tok:
            nums.append(float(num_tok))

    if cmd is not None and nums:
        flush_cmd(cmd, nums)
    if curr_poly:
        subpaths.append(curr_poly)

    return subpaths


def pdf_to_svg_coords(x, y):
    """Apply the SVG group transform: translate(-59.9631, 800.825) scale(1, -1)"""
    return (x - 59.9631, 800.825 - y)


def render_layers(scale=2):
    """
    Render two separate high-res RGBA layers from the vector paths:
    1. body_and_pole_layer: The horse, rider, hat, and flagpole (all paths except Path 1).
    2. flag_cloth_layer: Only Path 1 (the red flag cloth attached to the pole).
    """
    W, H = int(472 * scale), int(793 * scale)
    tree = ET.parse(SVG_PATH)
    root = tree.getroot()
    paths = root.findall(".//{http://www.w3.org/2000/svg}path")

    body_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    body_draw = ImageDraw.Draw(body_img)

    flag_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    flag_draw = ImageDraw.Draw(flag_img)

    for idx, p in enumerate(paths):
        d_str = p.attrib.get("d", "")
        fill_str = p.attrib.get("fill", "rgb(255,0,0)")
        is_white = "255,255,255" in fill_str.replace(" ", "")
        col = (0, 0, 0, 0) if is_white else (220, 24, 34, 255)

        subpaths = parse_svg_path_to_subpaths(d_str, steps_per_curve=24)
        for sp in subpaths:
            if len(sp) < 3:
                continue
            pts = []
            for px, py in sp:
                sx, sy = pdf_to_svg_coords(px, py)
                pts.append((sx * scale, sy * scale))

            if idx == 1:
                # Path 1 is the Flag Cloth!
                flag_draw.polygon(pts, fill=(225, 26, 36, 255))
            else:
                if is_white:
                    # Cutout inner negative space
                    body_draw.polygon(pts, fill=(0, 0, 0, 0))
                else:
                    body_draw.polygon(pts, fill=col)

    return body_img, flag_img, scale


def deform_flag_cloth_frame(flag_img, scale, phase):
    """
    Deform ONLY the flag cloth pixels with a realistic travelling 2D cloth wave
    anchored along the flagpole line, plus 3D fabric fold highlights & shadows!
    """
    W, H = flag_img.size
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    src_px = flag_img.load()
    dst_px = out.load()

    # Flagpole anchor line in SVG coords:
    # P1 = (160.46, 10.28), P2 = (250.98, 81.48)
    p1x, p1y = 160.46 * scale, 10.28 * scale
    p2x, p2y = 250.98 * scale, 81.48 * scale

    # Unit vector along the pole (u) and perpendicular away from the pole into the flag (n)
    dx_pole = p2x - p1x
    dy_pole = p2y - p1y
    pole_len = math.hypot(dx_pole, dy_pole)
    ux, uy = dx_pole / pole_len, dy_pole / pole_len
    # Perpendicular vector pointing down-left toward the flying tip of the flag
    nx, ny = -uy, ux
    if nx > 0:
        nx, ny = -nx, -ny

    # Bounding box of flag cloth in SVG coords is roughly x in [0..330*scale], y in [0..260*scale]
    max_x = min(W, int(335 * scale))
    max_y = min(H, int(265 * scale))
    max_dist = 185.0 * scale

    for y in range(max_y):
        for x in range(max_x):
            # Vector from P1 to (x, y)
            vx = x - p1x
            vy = y - p1y
            # Distance perpendicular to flagpole (how far out on the cloth we are)
            dist = vx * nx + vy * ny
            if dist <= 0:
                dist_norm = 0.0
            else:
                dist_norm = min(1.5, dist / max_dist)

            # Travelling wave along the flag cloth (propagating from pole to free tip)
            # Zero at dist=0 so the cloth remains 100% attached to the flagpole!
            envelope = (dist_norm ** 1.15)
            wave_arg1 = dist_norm * 7.2 - phase
            wave_arg2 = dist_norm * 13.5 - phase * 2.0 + (vx * ux + vy * uy) / (45.0 * scale)

            disp = envelope * (
                13.5 * scale * math.sin(wave_arg1) +
                4.2 * scale * math.cos(wave_arg2)
            )
            # Secondary flutter along the perpendicular axis
            disp_along = envelope * (4.5 * scale * math.sin(wave_arg1 + 1.2))

            # Inverse map to source pixel
            sx = int(round(x - disp * ux - disp_along * nx))
            sy = int(round(y - disp * uy - disp_along * ny))

            if 0 <= sx < W and 0 <= sy < H:
                r, g, b, a = src_px[sx, sy]
                if a > 0:
                    # 3D Fabric shading from wave slope (derivative of sin is cos)
                    slope = envelope * (
                        0.85 * math.cos(wave_arg1) -
                        0.35 * math.sin(wave_arg2)
                    )
                    # Modulate red brightness and depth to simulate billowing cloth folds
                    light = int(slope * 48)
                    nr = max(135, min(255, r + light))
                    ng = max(8, min(95, g + max(0, int(light * 0.45))))
                    nb = max(12, min(95, b + max(0, int(light * 0.45))))
                    dst_px[x, y] = (nr, ng, nb, a)

    return out


def update_svg_with_animated_flag():
    """
    Also inject a native 60fps SVG <animate> wave into public/images/caballo-liberal.svg
    so the flag waves continuously inside the React app too!
    """
    with open(SVG_PATH, "r", encoding="utf-8") as f:
        svg_text = f.read()

    # Original Path 1 (the flag cloth):
    orig_flag_d = "M 69.9631 660.596 L 163.269 581.411 C 212.385 581.158, 280.259 642.999, 310.94 719.349 L 220.421 790.546 C 195.876 741.402, 156.843 681.593, 69.9631 660.596 Z"

    # Build 9 smooth keyframe d strings where the pole attachment (310.94, 719.349) and (220.421, 790.546)
    # remain fixed, while the control points and flying tips billow in a travelling wave!
    keyframes = []
    num_kf = 8
    for k in range(num_kf + 1):
        ph = (k / float(num_kf)) * 2.0 * math.pi
        # Flying tips (69.96, 660.60) and (163.27, 581.41) wave with phase lag
        tip1_x = 69.9631 + 9.0 * math.sin(ph - 1.4)
        tip1_y = 660.596 + 16.0 * math.cos(ph - 1.4)

        tip2_x = 163.269 + 10.0 * math.sin(ph - 1.7)
        tip2_y = 581.411 + 17.0 * math.cos(ph - 1.7)

        # Mid control points billow with intermediate phase
        c1_x = 212.385 + 7.0 * math.sin(ph - 0.9)
        c1_y = 581.158 + 15.0 * math.cos(ph - 0.9)

        c2_x = 280.259 + 4.0 * math.sin(ph - 0.4)
        c2_y = 642.999 + 10.0 * math.cos(ph - 0.4)

        c3_x = 195.876 + 5.0 * math.sin(ph - 0.4)
        c3_y = 741.402 + 11.0 * math.cos(ph - 0.4)

        c4_x = 156.843 + 8.0 * math.sin(ph - 1.0)
        c4_y = 681.593 + 16.0 * math.cos(ph - 1.0)

        kf_d = (
            f"M {tip1_x:.2f} {tip1_y:.2f} "
            f"L {tip2_x:.2f} {tip2_y:.2f} "
            f"C {c1_x:.2f} {c1_y:.2f}, {c2_x:.2f} {c2_y:.2f}, 310.94 719.349 "
            f"L 220.421 790.546 "
            f"C {c3_x:.2f} {c3_y:.2f}, {c4_x:.2f} {c4_y:.2f}, {tip1_x:.2f} {tip1_y:.2f} Z"
        )
        keyframes.append(kf_d)

    values_str = ";".join(keyframes)
    animated_path = (
        f'<path d="{orig_flag_d}" fill="rgb(255,0,0)">'
        f'<animate attributeName="d" values="{values_str}" dur="1.15s" repeatCount="indefinite" />'
        f'</path>'
    )

    target_tag = f'<path d="{orig_flag_d}" fill="rgb(255,0,0)" />'
    if target_tag in svg_text:
        new_svg = svg_text.replace(target_tag, animated_path, 1)
        with open(SVG_PATH, "w", encoding="utf-8") as f:
            f.write(new_svg)
        print("Updated public/images/caballo-liberal.svg with native 60fps waving flag animation!")
    else:
        print("Note: SVG already has animated flag or modified tag.")


def generate_gifs():
    print("Rendering vector layers of the Liberal Horseman & Flag...")
    body_img, flag_img, scale = render_layers(scale=1.5)
    W, H = body_img.size

    num_frames = 20
    frames_transparent = []
    frames_dark_card = []
    frames_white_badge = []

    for i in range(num_frames):
        phase = (i / float(num_frames)) * 2.0 * math.pi

        # Deform the flag cloth with 3D travelling wave
        waved_flag = deform_flag_cloth_frame(flag_img, scale, phase)

        # Combine body + waving flag
        combined = Image.new("RGBA", (W + 40, H + 40), (0, 0, 0, 0))
        # Subtle breathing poise on the horse (2px vertical)
        horse_dy = int(2.5 * math.sin(phase))
        combined.alpha_composite(waved_flag, (20, 20 + horse_dy))
        combined.alpha_composite(body_img, (20, 20 + horse_dy))

        # Downsample cleanly for crisp anti-aliased GIF (400 x 660)
        out_w, out_h = 400, 660
        smooth_rgba = combined.resize((out_w, out_h), Image.LANCZOS)

        # 1. Transparent GIF frame (using alpha threshold palette)
        alpha = smooth_rgba.getchannel("A")
        rgb_for_trans = Image.new("RGB", smooth_rgba.size, (255, 255, 255))
        rgb_for_trans.paste(smooth_rgba, mask=alpha)
        p_frame = rgb_for_trans.convert("P", palette=Image.ADAPTIVE, colors=255)
        mask = Image.eval(alpha, lambda a: 255 if a <= 128 else 0)
        p_frame.paste(255, mask)
        frames_transparent.append(p_frame)

        # 2. Dark Campaign Poster GIF frame (with glowing aura + "JOHN POLO • PARTIDO LIBERAL")
        dark_bg = Image.new("RGBA", (540, 780), (11, 15, 25, 255))
        d_draw = ImageDraw.Draw(dark_bg)
        # Tricolor top and bottom bars
        w3 = 540 // 3
        d_draw.rectangle([0, 0, w3, 12], fill=(255, 214, 0, 255))
        d_draw.rectangle([w3, 0, 2 * w3, 12], fill=(46, 125, 50, 255))
        d_draw.rectangle([2 * w3, 0, 540, 12], fill=(211, 47, 47, 255))
        d_draw.rectangle([0, 768, w3, 780], fill=(255, 214, 0, 255))
        d_draw.rectangle([w3, 768, 2 * w3, 780], fill=(46, 125, 50, 255))
        d_draw.rectangle([2 * w3, 768, 540, 780], fill=(211, 47, 47, 255))

        # Glowing red circle aura
        aura_r = int(195 + 10 * math.sin(phase))
        aura_layer = Image.new("RGBA", (540, 780), (0, 0, 0, 0))
        ad = ImageDraw.Draw(aura_layer)
        ad.ellipse([270 - aura_r, 340 - aura_r, 270 + aura_r, 340 + aura_r], fill=(211, 47, 47, 45), outline=(251, 192, 45, 110), width=2)
        dark_bg.alpha_composite(aura_layer)

        dark_bg.alpha_composite(smooth_rgba, ((540 - out_w) // 2, 25))

        try:
            f_b = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 28)
            f_s = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 20)
        except Exception:
            f_b = ImageFont.load_default()
            f_s = ImageFont.load_default()

        d_draw.text((270, 700), "JOHN POLO • CONCEJO 2027", font=f_b, fill=(255, 255, 255), anchor="mm")
        d_draw.text((270, 738), "PARTIDO LIBERAL • IBAGUÉ SUENA MÁS FUERTE", font=f_s, fill=(255, 214, 0), anchor="mm")
        frames_dark_card.append(dark_bg.convert("RGB").quantize(colors=256))

        # 3. Clean White Circular Emblem GIF (like a live animated logo sticker!)
        white_bg = Image.new("RGBA", (500, 500), (255, 255, 255, 255))
        w_draw = ImageDraw.Draw(white_bg)
        w_draw.ellipse([16, 16, 484, 484], fill=(255, 250, 250, 255), outline=(211, 47, 47, 255), width=8)
        w_draw.ellipse([28, 28, 472, 472], outline=(251, 192, 45, 255), width=3)
        emblem_horse = smooth_rgba.resize((250, 412), Image.LANCZOS)
        white_bg.alpha_composite(emblem_horse, ((500 - 250) // 2, 36))
        frames_white_badge.append(white_bg.convert("RGB").quantize(colors=256))

    # Save GIF 1: Transparent Background
    gif1_path = os.path.join(GIF_DIR, "caballo_liberal_bandera_transparente.gif")
    frames_transparent[0].save(
        gif1_path,
        save_all=True,
        append_images=frames_transparent[1:],
        duration=55,
        loop=0,
        transparency=255,
        disposal=2
    )
    print("Saved:", gif1_path)

    # Also copy transparent GIF to public/images/caballo-liberal-animado.gif for direct web app use
    pub_gif_path = os.path.join(ROOT_DIR, "public", "images", "caballo-liberal-animado.gif")
    frames_transparent[0].save(
        pub_gif_path,
        save_all=True,
        append_images=frames_transparent[1:],
        duration=55,
        loop=0,
        transparency=255,
        disposal=2
    )
    print("Saved:", pub_gif_path)

    # Save GIF 2: Dark Campaign Card GIF (for WhatsApp / Instagram / Facebook)
    gif2_path = os.path.join(GIF_DIR, "caballo_liberal_john_polo_card.gif")
    frames_dark_card[0].save(
        gif2_path,
        save_all=True,
        append_images=frames_dark_card[1:],
        duration=55,
        loop=0
    )
    print("Saved:", gif2_path)

    # Save GIF 3: Circular Emblem Sticker GIF
    gif3_path = os.path.join(GIF_DIR, "caballo_liberal_sello_circular.gif")
    frames_white_badge[0].save(
        gif3_path,
        save_all=True,
        append_images=frames_white_badge[1:],
        duration=55,
        loop=0
    )
    print("Saved:", gif3_path)


if __name__ == "__main__":
    generate_gifs()
    update_svg_with_animated_flag()
