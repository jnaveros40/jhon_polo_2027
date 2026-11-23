import os
import re
import math
import xml.etree.ElementTree as ET
from PIL import Image, ImageDraw, ImageFont

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SVG_PATH = os.path.join(ROOT_DIR, "public", "images", "caballo-liberal.svg")
GIF_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "gifs_animados")
os.makedirs(GIF_DIR, exist_ok=True)


def parse_svg_path_to_subpaths(d_str, steps_per_curve=24):
    """Parse SVG path d-attribute into closed polygon point lists."""
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
    return (x - 59.9631, 800.825 - y)


def render_base_layers(scale=1.5):
    """
    Render the vector paths into:
    1. body_raw: Full horse, rider, and flagpole (without the flag cloth).
    2. flag_red_img: Red flag cloth (Partido Liberal).
    3. flag_tricolor_img: Ibagué Tricolor flag cloth (Amarillo, Verde, Rojo).
    """
    W, H = int(472 * scale), int(793 * scale)
    tree = ET.parse(SVG_PATH)
    root = tree.getroot()
    paths = root.findall(".//{http://www.w3.org/2000/svg}path")

    body_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    body_draw = ImageDraw.Draw(body_img)

    flag_mask = Image.new("L", (W, H), 0)
    flag_mask_draw = ImageDraw.Draw(flag_mask)

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
                flag_mask_draw.polygon(pts, fill=255)
            else:
                if is_white:
                    body_draw.polygon(pts, fill=(0, 0, 0, 0))
                else:
                    body_draw.polygon(pts, fill=col)

    # Create Red Flag Cloth and Ibagué Tricolor Flag Cloth (Amarillo, Verde, Rojo)
    flag_red_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    flag_tricolor_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    f_red_px = flag_red_img.load()
    f_tri_px = flag_tricolor_img.load()
    mask_px = flag_mask.load()

    # Flagpole attachment points P1=(160.46, 10.28), P2=(250.98, 81.48)
    p1x, p1y = 160.46 * scale, 10.28 * scale
    p2x, p2y = 250.98 * scale, 81.48 * scale
    dx_p = p2x - p1x
    dy_p = p2y - p1y
    pole_len = math.hypot(dx_p, dy_p)
    ux, uy = dx_p / pole_len, dy_p / pole_len

    max_x = min(W, int(335 * scale))
    max_y = min(H, int(265 * scale))

    for y in range(max_y):
        for x in range(max_x):
            m = mask_px[x, y]
            if m > 0:
                f_red_px[x, y] = (225, 26, 36, m)

                # Project onto flagpole axis to divide into 3 horizontal flag stripes:
                # Top stripe: Yellow (#FFD600), Middle stripe: Green (#1B8A38), Bottom stripe: Red (#D32F2F)
                vx = x - p1x
                vy = y - p1y
                s_along = (vx * ux + vy * uy) / pole_len
                if s_along < 0.34:
                    # Amarillo vibrante de Ibagué
                    f_tri_px[x, y] = (255, 208, 0, m)
                elif s_along < 0.67:
                    # Verde territorial de Ibagué
                    f_tri_px[x, y] = (32, 145, 52, m)
                else:
                    # Rojo institucional de Ibagué
                    f_tri_px[x, y] = (220, 26, 36, m)

    return body_img, flag_red_img, flag_tricolor_img, scale


def split_body_into_skeletal_parts(body_img, scale):
    """
    Separate the horse body into:
    - torso_img: Rider, horse torso, head, and flagpole (above leg joints)
    - tail_img: Horse tail (X < 180, 375 < Y < 495)
    - leg_hind_img: Left hind leg (Y >= 500, X < 236)
    - leg_mid_img: Center legs (Y >= 510, 236 <= X < 332)
    - leg_front_img: Front raised leg (Y >= 490, X >= 332)
    """
    W, H = body_img.size
    src = body_img.load()

    torso_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    tail_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    leg_hind_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    leg_mid_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    leg_front_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    p_torso = torso_img.load()
    p_tail = tail_img.load()
    p_hind = leg_hind_img.load()
    p_mid = leg_mid_img.load()
    p_front = leg_front_img.load()

    for y in range(H):
        sy = y / float(scale)
        for x in range(W):
            c = src[x, y]
            if c[3] == 0:
                continue
            sx = x / float(scale)

            # 1. Check Tail region (only the free-hanging tail plume on the left)
            if sx < 170 and 380 <= sy <= 490:
                p_tail[x, y] = c
                if sx > 156:
                    p_torso[x, y] = c  # smooth overlap at tail root
                continue

            # 2. Check Hind Leg (leftmost leg, emerging below the thigh at sy >= 546)
            if sy >= 542 and sx < 236:
                p_hind[x, y] = c
                if sy <= 562:
                    p_torso[x, y] = c  # smooth hip overlap so croup never notches
                continue

            # 3. Check Center Legs (emerging below the barrel/belly at sy >= 548)
            if sy >= 546 and 236 <= sx < 332:
                p_mid[x, y] = c
                if sy <= 566:
                    p_torso[x, y] = c  # smooth belly overlap
                continue

            # 4. Check Front Right Leg (emerging below the chest at sy >= 534)
            if sy >= 532 and sx >= 332:
                p_front[x, y] = c
                if sy <= 554:
                    p_torso[x, y] = c  # smooth shoulder/chest overlap
                continue

            # Otherwise belongs to Torso/Rider/Head
            p_torso[x, y] = c

    return torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img


def articulate_limb(limb_img, pivot_xy, knee_y, angle_upper_deg, angle_lower_deg, blend_top_y, scale):
    """
    2-segment skeletal limb deformation (Upper thigh/arm + Lower shin/hoof)
    with smooth skinning near the hip/shoulder joint so it never disconnects!
    """
    W, H = limb_img.size
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    src = limb_img.load()
    dst = out.load()

    px, py = pivot_xy[0] * scale, pivot_xy[1] * scale
    ky = knee_y * scale
    by = blend_top_y * scale

    rad_upper = math.radians(angle_upper_deg)
    rad_lower = math.radians(angle_lower_deg)

    # Forward position of the knee after upper rotation
    k_dx = 0.0
    k_dy = ky - py
    cos_u = math.cos(rad_upper)
    sin_u = math.sin(rad_upper)
    knee_curr_x = px + (k_dx * cos_u - k_dy * sin_u)
    knee_curr_y = py + (k_dx * sin_u + k_dy * cos_u)

    y_start = max(0, int(by - 20 * scale))
    for y in range(y_start, H):
        for x in range(W):
            # Determine effective rotation angle via inverse kinematics mapping
            if y <= ky:
                # Smooth blend weight from 0 at blend_top_y to 1 at py + 18*scale
                w = min(1.0, max(0.0, (y - by) / float(22.0 * scale)))
                ang = rad_upper * w
                ca = math.cos(-ang)
                sa = math.sin(-ang)
                dx = x - px
                dy = y - py
                sx = int(round(px + dx * ca - dy * sa))
                sy = int(round(py + dx * sa + dy * ca))
            else:
                # Below the knee: first undo lower leg flexion around moving knee, then undo upper rotation
                w_knee = min(1.0, max(0.0, (y - ky) / float(25.0 * scale)))
                ang_low = rad_lower * w_knee
                cl = math.cos(-ang_low)
                sl = math.sin(-ang_low)
                dx_k = x - knee_curr_x
                dy_k = y - knee_curr_y
                # Point in upper-rotated frame
                ux_p = knee_curr_x + dx_k * cl - dy_k * sl
                uy_p = knee_curr_y + dx_k * sl + dy_k * cl
                # Undo upper rotation around hip pivot
                ca = math.cos(-rad_upper)
                sa = math.sin(-rad_upper)
                dx = ux_p - px
                dy = uy_p - py
                sx = int(round(px + dx * ca - dy * sa))
                sy = int(round(py + dx * sa + dy * ca))

            if 0 <= sx < W and 0 <= sy < H:
                c = src[sx, sy]
                if c[3] > 0:
                    dst[x, y] = c

    return out


def deform_flag_cloth_frame(flag_img, scale, phase):
    """
    Deform ONLY the flag cloth pixels with a realistic travelling 2D cloth wave
    anchored along the flagpole line, plus 3D fabric fold highlights & shadows!
    Works for both the Red Flag and the Ibagué Tricolor Flag!
    """
    W, H = flag_img.size
    out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    src_px = flag_img.load()
    dst_px = out.load()

    p1x, p1y = 160.46 * scale, 10.28 * scale
    p2x, p2y = 250.98 * scale, 81.48 * scale

    dx_pole = p2x - p1x
    dy_pole = p2y - p1y
    pole_len = math.hypot(dx_pole, dy_pole)
    ux, uy = dx_pole / pole_len, dy_pole / pole_len
    nx, ny = -uy, ux
    if nx > 0:
        nx, ny = -nx, -ny

    max_x = min(W, int(335 * scale))
    max_y = min(H, int(265 * scale))
    max_dist = 185.0 * scale

    for y in range(max_y):
        for x in range(max_x):
            vx = x - p1x
            vy = y - p1y
            dist = vx * nx + vy * ny
            dist_norm = 0.0 if dist <= 0 else min(1.5, dist / max_dist)

            envelope = (dist_norm ** 1.15)
            wave_arg1 = dist_norm * 7.2 - phase
            wave_arg2 = dist_norm * 13.5 - phase * 2.0 + (vx * ux + vy * uy) / (45.0 * scale)

            disp = envelope * (
                14.5 * scale * math.sin(wave_arg1) +
                4.5 * scale * math.cos(wave_arg2)
            )
            disp_along = envelope * (4.8 * scale * math.sin(wave_arg1 + 1.2))

            sx = int(round(x - disp * ux - disp_along * nx))
            sy = int(round(y - disp * uy - disp_along * ny))

            if 0 <= sx < W and 0 <= sy < H:
                r, g, b, a = src_px[sx, sy]
                if a > 0:
                    slope = envelope * (
                        0.85 * math.cos(wave_arg1) -
                        0.35 * math.sin(wave_arg2)
                    )
                    light = int(slope * 48)
                    nr = max(15, min(255, r + light))
                    ng = max(10, min(255, g + light))
                    nb = max(10, min(255, b + light))
                    dst_px[x, y] = (nr, ng, nb, a)

    return out


def compose_galloping_horse_frame(
    torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img,
    flag_layer_img, scale, phase
):
    """
    Assemble one complete frame of the galloping horse:
    1. Articulate the 3 leg groups in a vigorous gallop stride (upper + knee bend).
    2. Articulate the whipping tail.
    3. Wave the flag cloth with 3D folds.
    4. Apply natural galloping body pitch & bounce.
    """
    W, H = torso_img.size
    frame = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    # 1. Hind Leg (Pata trasera izquierda): strong propulsion swing + hock bend
    ang_hind_upper = 20.0 * math.sin(phase)
    ang_hind_knee = -26.0 * max(0.0, math.sin(phase - 0.7))
    hind_anim = articulate_limb(
        leg_hind_img, pivot_xy=(208, 552), knee_y=645,
        angle_upper_deg=ang_hind_upper, angle_lower_deg=ang_hind_knee,
        blend_top_y=544, scale=scale
    )

    # 2. Mid Legs (Patas centrales): counter-phase stride so legs scissor visibly!
    ang_mid_upper = -19.0 * math.sin(phase + 0.35)
    ang_mid_knee = -24.0 * max(0.0, -math.sin(phase - 0.3))
    mid_anim = articulate_limb(
        leg_mid_img, pivot_xy=(272, 556), knee_y=650,
        angle_upper_deg=ang_mid_upper, angle_lower_deg=ang_mid_knee,
        blend_top_y=548, scale=scale
    )

    # 3. Front Right Leg (Pata delantera levantada): reaches forward and bends knee
    ang_front_upper = -22.0 * math.sin(phase - 0.85)
    ang_front_knee = 28.0 * max(0.0, math.sin(phase + 0.5))
    front_anim = articulate_limb(
        leg_front_img, pivot_xy=(364, 542), knee_y=625,
        angle_upper_deg=ang_front_upper, angle_lower_deg=ang_front_knee,
        blend_top_y=534, scale=scale
    )

    # 4. Tail (Cola): whips with the gallop rhythm
    ang_tail = 15.0 * math.sin(phase - 1.1)
    tail_anim = articulate_limb(
        tail_img, pivot_xy=(168, 412), knee_y=455,
        angle_upper_deg=ang_tail, angle_lower_deg=ang_tail * 0.6,
        blend_top_y=385, scale=scale
    )

    # 5. Waving Flag Cloth
    waved_flag = deform_flag_cloth_frame(flag_layer_img, scale, phase)

    # Composite limbs + torso + waving flag
    frame.alpha_composite(waved_flag)
    frame.alpha_composite(tail_anim)
    frame.alpha_composite(hind_anim)
    frame.alpha_composite(mid_anim)
    frame.alpha_composite(front_anim)
    frame.alpha_composite(torso_img)

    # Whole-horse gallop rocking pitch (+-2.6 deg) and vertical suspension bounce (+-6px)
    pitch_deg = 2.6 * math.cos(phase)
    bounce_dy = int(6.0 * scale * math.sin(phase))
    rocked = frame.rotate(pitch_deg, resample=Image.BICUBIC, center=(265 * scale, 470 * scale))

    padded = Image.new("RGBA", (W + 40, H + 40), (0, 0, 0, 0))
    padded.alpha_composite(rocked, (20, 20 + bounce_dy))
    return padded


def generate_gifs():
    print("Rendering skeletal layers & flags (Partido Liberal Red & Ibagué Tricolor)...")
    body_img, flag_red_img, flag_tricolor_img, scale = render_base_layers(scale=1.35)
    torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img = split_body_into_skeletal_parts(body_img, scale)

    num_frames = 18
    frames_transparent = []
    frames_transparent_tricolor = []
    frames_dark_card = []
    frames_white_badge_tricolor = []

    out_w, out_h = 400, 660

    for i in range(num_frames):
        phase = (i / float(num_frames)) * 2.0 * math.pi

        # Render horse galloping with RED flag (for Transparent & Dark Card)
        gallop_red = compose_galloping_horse_frame(
            torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img,
            flag_red_img, scale, phase
        ).resize((out_w, out_h), Image.LANCZOS)

        # Render horse galloping with IBAGUÉ TRICOLOR FLAG (Amarillo, Verde, Rojo) for the Circular Seal!
        gallop_tricolor = compose_galloping_horse_frame(
            torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img,
            flag_tricolor_img, scale, phase
        ).resize((out_w, out_h), Image.LANCZOS)

        # ---------------------------------------------------------------------
        # GIF 1A: Transparent Background (Galloping + Waving RED Flag)
        # ---------------------------------------------------------------------
        alpha = gallop_red.getchannel("A")
        rgb_for_trans = Image.new("RGB", gallop_red.size, (255, 255, 255))
        rgb_for_trans.paste(gallop_red, mask=alpha)
        p_frame = rgb_for_trans.convert("P", palette=Image.ADAPTIVE, colors=255)
        mask = Image.eval(alpha, lambda a: 255 if a <= 128 else 0)
        p_frame.paste(255, mask)
        frames_transparent.append(p_frame)

        # ---------------------------------------------------------------------
        # GIF 1B: Transparent Background (Galloping + Waving IBAGUÉ TRICOLOR Flag)
        # ---------------------------------------------------------------------
        alpha_tri = gallop_tricolor.getchannel("A")
        rgb_for_trans_tri = Image.new("RGB", gallop_tricolor.size, (255, 255, 255))
        rgb_for_trans_tri.paste(gallop_tricolor, mask=alpha_tri)
        p_frame_tri = rgb_for_trans_tri.convert("P", palette=Image.ADAPTIVE, colors=255)
        mask_tri = Image.eval(alpha_tri, lambda a: 255 if a <= 128 else 0)
        p_frame_tri.paste(255, mask_tri)
        frames_transparent_tricolor.append(p_frame_tri)

        # ---------------------------------------------------------------------
        # GIF 2: Dark Campaign Poster GIF (Galloping + Waving Flag)
        # ---------------------------------------------------------------------
        dark_bg = Image.new("RGBA", (540, 780), (11, 15, 25, 255))
        d_draw = ImageDraw.Draw(dark_bg)
        w3 = 540 // 3
        d_draw.rectangle([0, 0, w3, 12], fill=(255, 214, 0, 255))
        d_draw.rectangle([w3, 0, 2 * w3, 12], fill=(46, 125, 50, 255))
        d_draw.rectangle([2 * w3, 0, 540, 12], fill=(211, 47, 47, 255))
        d_draw.rectangle([0, 768, w3, 780], fill=(255, 214, 0, 255))
        d_draw.rectangle([w3, 768, 2 * w3, 780], fill=(46, 125, 50, 255))
        d_draw.rectangle([2 * w3, 768, 540, 780], fill=(211, 47, 47, 255))

        aura_r = int(195 + 10 * math.sin(phase))
        aura_layer = Image.new("RGBA", (540, 780), (0, 0, 0, 0))
        ad = ImageDraw.Draw(aura_layer)
        ad.ellipse([270 - aura_r, 340 - aura_r, 270 + aura_r, 340 + aura_r], fill=(211, 47, 47, 45), outline=(251, 192, 45, 110), width=2)
        dark_bg.alpha_composite(aura_layer)
        dark_bg.alpha_composite(gallop_red, ((540 - out_w) // 2, 25))

        try:
            f_b = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 28)
            f_s = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 20)
        except Exception:
            f_b = ImageFont.load_default()
            f_s = ImageFont.load_default()

        d_draw.text((270, 700), "JOHN POLO • CONCEJO 2027", font=f_b, fill=(255, 255, 255), anchor="mm")
        d_draw.text((270, 738), "PARTIDO LIBERAL • IBAGUÉ SUENA MÁS FUERTE", font=f_s, fill=(255, 214, 0), anchor="mm")
        frames_dark_card.append(dark_bg.convert("RGB").quantize(colors=256))

        # ---------------------------------------------------------------------
        # GIF 3: Circular Seal with IBAGUÉ TRICOLOR FLAG (Amarillo, Verde, Rojo)
        # ---------------------------------------------------------------------
        white_bg = Image.new("RGBA", (520, 520), (255, 255, 255, 255))
        w_draw = ImageDraw.Draw(white_bg)

        # Tricolor concentric seal rings (Amarillo, Verde, Rojo) + inner white medallion
        w_draw.ellipse([12, 12, 508, 508], fill=(255, 252, 248, 255), outline=(211, 47, 47, 255), width=8)
        w_draw.ellipse([22, 22, 498, 498], outline=(32, 145, 52, 255), width=5)
        w_draw.ellipse([30, 30, 490, 490], outline=(255, 208, 0, 255), width=5)

        emblem_horse = gallop_tricolor.resize((260, 428), Image.LANCZOS)
        white_bg.alpha_composite(emblem_horse, ((520 - 260) // 2, 42))
        frames_white_badge_tricolor.append(white_bg.convert("RGB").quantize(colors=256))

    # Save GIF 1: Transparent Background
    gif1_path = os.path.join(GIF_DIR, "caballo_liberal_bandera_transparente.gif")
    frames_transparent[0].save(
        gif1_path, save_all=True, append_images=frames_transparent[1:],
        duration=55, loop=0, transparency=255, disposal=2
    )
    print("Saved:", gif1_path)

    # Save to public/images/caballo-liberal-animado.gif for the web app
    pub_gif_path = os.path.join(ROOT_DIR, "public", "images", "caballo-liberal-animado.gif")
    frames_transparent[0].save(
        pub_gif_path, save_all=True, append_images=frames_transparent[1:],
        duration=55, loop=0, transparency=255, disposal=2
    )
    print("Saved:", pub_gif_path)

    # Save GIF 2: Dark Campaign Card
    gif2_path = os.path.join(GIF_DIR, "caballo_liberal_john_polo_card.gif")
    frames_dark_card[0].save(
        gif2_path, save_all=True, append_images=frames_dark_card[1:],
        duration=55, loop=0
    )
    print("Saved:", gif2_path)

    # Save GIF 3: Circular Seal with Ibagué Tricolor Flag (Amarillo, Verde, Rojo)
    gif3_path = os.path.join(GIF_DIR, "caballo_liberal_sello_circular.gif")
    frames_white_badge_tricolor[0].save(
        gif3_path, save_all=True, append_images=frames_white_badge_tricolor[1:],
        duration=55, loop=0
    )
    print("Saved:", gif3_path)

    # Also save all animated GIFs into public/images/ for the Landing Page
    pub_sello_path = os.path.join(ROOT_DIR, "public", "images", "sello-caballo-tricolor.gif")
    frames_white_badge_tricolor[0].save(
        pub_sello_path, save_all=True, append_images=frames_white_badge_tricolor[1:],
        duration=55, loop=0
    )
    print("Saved:", pub_sello_path)

    pub_tri_path = os.path.join(ROOT_DIR, "public", "images", "caballo-tricolor-animado.gif")
    frames_transparent_tricolor[0].save(
        pub_tri_path, save_all=True, append_images=frames_transparent_tricolor[1:],
        duration=55, loop=0, transparency=255, disposal=2
    )
    print("Saved:", pub_tri_path)

    pub_card_path = os.path.join(ROOT_DIR, "public", "images", "caballo-liberal-card.gif")
    frames_dark_card[0].save(
        pub_card_path, save_all=True, append_images=frames_dark_card[1:],
        duration=55, loop=0
    )
    print("Saved:", pub_card_path)


if __name__ == "__main__":
    generate_gifs()
