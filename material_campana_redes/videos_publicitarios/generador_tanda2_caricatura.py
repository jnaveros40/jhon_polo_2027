import os
import sys
import math
import wave
import random
import struct
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
IMG_DIR = os.path.join(ROOT_DIR, "public", "images")
CARICATURA_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "jhon_polo")
OUT_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "videos_publicitarios")
TEMP_DIR = os.path.join(OUT_DIR, "_temp_tanda2")
GIF_SCRIPT_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "gifs_animados")

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

# Import the skeletal galloping horse engine from generador_gifs_bandera.py
sys.path.insert(0, GIF_SCRIPT_DIR)
import generador_gifs_bandera as horse_engine

# Colors
COL_RED = (211, 47, 47)
COL_RED_BRIGHT = (239, 35, 45)
COL_YELLOW = (255, 214, 0)
COL_GOLD = (251, 192, 45)
COL_GREEN = (32, 145, 52)
COL_WHITE = (255, 255, 255)
COL_DARK = (10, 14, 24)


def get_font(size, bold=True):
    candidates = [
        "C:/Windows/Fonts/impact.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/segoeuib.ttf",
    ] if bold else [
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/segoeui.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return ImageFont.load_default()


def extract_caricature_rgba(jpeg_path, add_outline=True):
    """
    Remove the pure white background from a John Polo caricature JPEG using flood-fill
    from the outer borders so interior whites (eyes, teeth, hat weave, shirt buttons)
    stay 100% intact and opaque!
    """
    img = Image.open(jpeg_path).convert("RGBA")
    w, h = img.size
    # Resize to manageable high-res working size (700x700) before floodfill for speed
    work_w, work_h = 700, int(700 * h / float(w))
    img = img.resize((work_w, work_h), Image.LANCZOS)
    px = img.load()

    visited = bytearray(work_w * work_h)
    queue = []

    def is_bg_white(r, g, b):
        return r > 236 and g > 236 and b > 236

    # Seed border pixels
    for x in range(work_w):
        if is_bg_white(*px[x, 0][:3]):
            queue.append((x, 0))
            visited[x] = 1
        if is_bg_white(*px[x, work_h - 1][:3]):
            queue.append((x, work_h - 1))
            visited[(work_h - 1) * work_w + x] = 1
    for y in range(work_h):
        if is_bg_white(*px[0, y][:3]):
            queue.append((0, y))
            visited[y * work_w] = 1
        if is_bg_white(*px[work_w - 1, y][:3]):
            queue.append((work_w - 1, y))
            visited[y * work_w + (work_w - 1)] = 1

    # BFS flood-fill exterior white background
    while queue:
        cx, cy = queue.pop()
        px[cx, cy] = (0, 0, 0, 0)
        for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
            if 0 <= nx < work_w and 0 <= ny < work_h:
                idx = ny * work_w + nx
                if not visited[idx]:
                    r, g, b, _ = px[nx, ny]
                    if is_bg_white(r, g, b):
                        visited[idx] = 1
                        queue.append((nx, ny))
                    elif r > 210 and g > 210 and b > 210:
                        # Soft anti-aliased edge feathering
                        alpha = max(0, min(255, int((245 - max(r, g, b)) * 6)))
                        px[nx, ny] = (r, g, b, alpha)

    # Crop tight to non-empty bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    if add_outline:
        # Add a crisp golden-white heroic sticker rim around John Polo
        alpha = img.getchannel("A")
        dilated = alpha.filter(ImageFilter.MaxFilter(9))
        rim = Image.new("RGBA", img.size, (255, 225, 85, 0))
        rim.putalpha(dilated)
        combined = Image.new("RGBA", img.size, (0, 0, 0, 0))
        combined.alpha_composite(rim)
        combined.alpha_composite(img)
        return combined

    return img


def generate_euphoric_campaign_anthem(wav_path, duration_sec=15.0, sample_rate=44100):
    """
    Synthesize a high-energy, euphoric campaign soundtrack (.wav):
    - Stadium crowd euphoria roar & rhythmic clapping swells
    - Triumphant brass fanfare chords (D Major -> A Major -> B Minor -> G Major -> A Major -> D Major)
    - Driving epic percussion (deep stadium boom + Tolimense tambora snare + hi-hat pulse at 132 BPM)
    - Cinematic impact hits on scene transitions!
    """
    num_samples = int(duration_sec * sample_rate)
    bpm = 132.0
    beat_dur = 60.0 / bpm

    # Euphoric anthem progression in D Major (bright, victorious, heroic)
    chords = [
        [293.66, 369.99, 440.00, 587.33],  # D Major (Triumphant opening)
        [220.00, 277.18, 329.63, 440.00],  # A Major
        [246.94, 293.66, 369.99, 493.88],  # Bm (Heroic emotion)
        [196.00, 246.94, 293.66, 392.00],  # G Major (Uplifting)
    ]

    # Victory melody notes (fanfare trumpet motif)
    melody = [
        587.33, 587.33, 659.25, 739.99,  # D5, D5, E5, F#5
        880.00, 739.99, 659.25, 587.33,  # A5, F#5, E5, D5
        739.99, 739.99, 880.00, 987.77,  # F#5, F#5, A5, B5
        880.00, 739.99, 880.00, 1174.66  # A5, F#5, A5, D6 (Euphoric climax!)
    ]

    random.seed(2027)
    # Pre-generate filtered noise table for stadium crowd euphoria & applause
    noise_len = 22050
    crowd_noise = [random.uniform(-1.0, 1.0) for _ in range(noise_len)]
    # Smooth band-pass approximation for warm crowd roar
    smooth_crowd = [0.0] * noise_len
    acc = 0.0
    for idx in range(noise_len):
        acc = 0.88 * acc + 0.12 * crowd_noise[idx]
        smooth_crowd[idx] = acc

    with wave.open(wav_path, "w") as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)

        frames = bytearray()
        for i in range(num_samples):
            t = i / float(sample_rate)
            beat_idx = int(t / beat_dur)
            sub_beat = int(t / (beat_dur / 2.0))
            chord = chords[(beat_idx // 2) % len(chords)]
            mel_freq = melody[sub_beat % len(melody)]

            val = 0.0

            # 1. Triumphant Brass Fanfare Chords (rich saw/brass harmonics)
            beat_phase = (t % (beat_dur / 2.0)) / (beat_dur / 2.0)
            brass_env = math.exp(-2.2 * beat_phase) * (1.0 - math.exp(-40.0 * beat_phase))
            for freq in chord:
                val += 0.11 * brass_env * (
                    math.sin(2.0 * math.pi * freq * t) +
                    0.55 * math.sin(2.0 * math.pi * (freq * 2.0) * t) +
                    0.28 * math.sin(2.0 * math.pi * (freq * 3.0) * t)
                )

            # 2. Lead Euphoric Fanfare Trumpet Melody
            mel_env = math.exp(-2.8 * beat_phase) * (1.0 - math.exp(-50.0 * beat_phase))
            vibrato = 1.0 + 0.004 * math.sin(2.0 * math.pi * 6.0 * t)
            mf = mel_freq * vibrato
            val += 0.16 * mel_env * (
                math.sin(2.0 * math.pi * mf * t) +
                0.6 * math.sin(2.0 * math.pi * (mf * 2.0) * t) +
                0.3 * math.sin(2.0 * math.pi * (mf * 3.0) * t)
            )

            # 3. Driving Stadium Kick & Tambora Tolimense Percussion
            kick_phase = (t % beat_dur) / beat_dur
            if kick_phase < 0.22:
                k_env = math.exp(-16.0 * kick_phase)
                k_freq = 135.0 * math.exp(-14.0 * kick_phase) + 48.0
                val += 0.36 * k_env * math.sin(2.0 * math.pi * k_freq * t)

            # Off-beat rhythmic clap / snare (stadium rally feel!)
            clap_phase = ((t + beat_dur * 0.5) % beat_dur) / beat_dur
            if clap_phase < 0.14:
                c_env = math.exp(-24.0 * clap_phase)
                val += 0.22 * c_env * crowd_noise[i % noise_len]

            # 4. Stadium Crowd Euphoria & Cheering Swell (swells up at start, transitions, and finale!)
            euphoria_swell = (
                0.38
                + 0.35 * math.exp(-((t - 0.6) ** 2) / 0.8)
                + 0.35 * math.exp(-((t - 3.8) ** 2) / 0.9)
                + 0.38 * math.exp(-((t - 7.8) ** 2) / 0.9)
                + 0.45 * math.exp(-((t - (duration_sec - 2.2)) ** 2) / 2.0)
            )
            # Multi-layered crowd chorus resonance
            roar = (
                smooth_crowd[i % noise_len] * 0.7
                + smooth_crowd[(i * 2 + 500) % noise_len] * 0.4
                + 0.15 * math.sin(2.0 * math.pi * 440.0 * t) * smooth_crowd[(i + 1200) % noise_len]
            )
            val += 0.25 * euphoria_swell * roar

            # Fade in / out
            if t < 0.25:
                val *= (t / 0.25)
            elif t > duration_sec - 0.65:
                val *= max(0.0, (duration_sec - t) / 0.65)

            val = max(-0.96, min(0.96, val))
            frames.extend(struct.pack("<h", int(val * 32767)))

        wav_file.writeframes(frames)


def draw_tricolor_flag_ribbon(draw, W, y_top, height):
    """Draw the Ibagué flag tricolor bar (Yellow, Green, Red)."""
    w3 = W // 3
    draw.rectangle([0, y_top, w3, y_top + height], fill=COL_YELLOW)
    draw.rectangle([w3, y_top, 2 * w3, y_top + height], fill=COL_GREEN)
    draw.rectangle([2 * w3, y_top, W, y_top + height], fill=COL_RED)


def draw_rounded_box(base_img, box, radius, fill_rgba, outline_rgba=None, width=2):
    overlay = Image.new("RGBA", base_img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.rounded_rectangle(box, radius=radius, fill=fill_rgba, outline=outline_rgba, width=width)
    base_img.alpha_composite(overlay)


def draw_impact_text(draw, x, y, text, font, fill_col, stroke_col=(0, 0, 0), stroke_w=4):
    """Draw bold stadium-style impact typography with thick dark outline & drop shadow."""
    draw.text((x + 3, y + 4), text, font=font, fill=(0, 0, 0, 220), anchor="mm")
    draw.text((x, y), text, font=font, fill=fill_col, anchor="mm", stroke_width=stroke_w, stroke_fill=stroke_col)


def draw_partido_liberal_badge(canvas, x, y, w=110, h=110):
    """Draw the official Partido Liberal Colombiano crimson 'L' emblem + label."""
    draw_rounded_box(canvas, [x, y, x + w, y + h], 22, (211, 47, 47, 250), (255, 214, 0, 255), 3)
    d = ImageDraw.Draw(canvas)
    f_l = get_font(int(h * 0.58), True)
    f_lbl = get_font(int(h * 0.14), True)
    d.text((x + w // 2, y + int(h * 0.42)), "L", font=f_l, fill=COL_WHITE, anchor="mm")
    d.text((x + w // 2, y + int(h * 0.82)), "LIBERAL", font=f_lbl, fill=COL_YELLOW, anchor="mm")


def draw_sunburst_background(canvas, t, center_xy, base_dark=(12, 16, 28), ray_rgba=(211, 47, 47, 48)):
    """Draw rotating epic campaign light rays from center_xy."""
    W, H = canvas.size
    cx, cy = center_xy
    overlay = Image.new("RGBA", (W, H), base_dark + (255,))
    d = ImageDraw.Draw(overlay)
    num_rays = 16
    radius = max(W, H) * 1.4
    for r_i in range(num_rays):
        ang1 = (r_i * 2.0 * math.pi / num_rays) + t * 0.35
        ang2 = ang1 + (math.pi / num_rays) * 0.55
        p1 = (cx, cy)
        p2 = (cx + radius * math.cos(ang1), cy + radius * math.sin(ang1))
        p3 = (cx + radius * math.cos(ang2), cy + radius * math.sin(ang2))
        col = ray_rgba if r_i % 2 == 0 else (255, 214, 0, 26)
        d.polygon([p1, p2, p3], fill=col)
    canvas.alpha_composite(overlay)


def ease_out_back(x):
    x = max(0.0, min(1.0, x))
    c1 = 1.70158
    c3 = c1 + 1.0
    return 1.0 + c3 * pow(x - 1.0, 3) + c1 * pow(x - 1.0, 2)


def main():
    ffmpeg_bin = os.path.join(ROOT_DIR, "node_modules", "ffmpeg-static", "ffmpeg.exe")
    if not os.path.exists(ffmpeg_bin):
        ffmpeg_bin = "ffmpeg"

    print("1. Pre-computing 18 galloping horse frames (Red Flag + Ibagué Tricolor Flag)...")
    body_img, flag_red_img, flag_tri_img, scale = horse_engine.render_base_layers(scale=1.35)
    torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img = horse_engine.split_body_into_skeletal_parts(body_img, scale)

    num_horse_frames = 18
    horse_red_frames = []
    horse_tri_frames = []
    sello_tri_frames = []

    for i in range(num_horse_frames):
        ph = (i / float(num_horse_frames)) * 2.0 * math.pi
        g_red = horse_engine.compose_galloping_horse_frame(
            torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img,
            flag_red_img, scale, ph
        )
        g_tri = horse_engine.compose_galloping_horse_frame(
            torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img,
            flag_tri_img, scale, ph
        )
        horse_red_frames.append(g_red)
        horse_tri_frames.append(g_tri)

        # Build circular Ibagué Tricolor Seal frame
        sello = Image.new("RGBA", (240, 240), (0, 0, 0, 0))
        sd = ImageDraw.Draw(sello)
        sd.ellipse([4, 4, 236, 236], fill=(255, 255, 255, 255), outline=COL_RED + (255,), width=6)
        sd.ellipse([11, 11, 229, 229], outline=COL_GREEN + (255,), width=4)
        sd.ellipse([16, 16, 224, 224], outline=COL_YELLOW + (255,), width=4)
        h_in = g_tri.resize((125, 200), Image.LANCZOS)
        sello.alpha_composite(h_in, ((240 - 125) // 2, 18))
        sello_tri_frames.append(sello)

    print("2. Extracting approved John Polo Caricature Character poses (Sombrero Tolimense)...")
    pose_front = extract_caricature_rgba(os.path.join(CARICATURA_DIR, "pose_01_frontal_principal.jpg"))
    pose_thumb = extract_caricature_rgba(os.path.join(CARICATURA_DIR, "pose_03_frontal_pulgar.jpg"))
    pose_walk = pose_front
    pose_side = pose_thumb
    pose_point = pose_front

    logo_jp = Image.open(os.path.join(IMG_DIR, "logo-jp.png")).convert("RGBA")
    banner_sonar = Image.open(os.path.join(IMG_DIR, "ibague-banner.jpg")).convert("RGBA")

    # =========================================================================
    # VIDEO 4: EUFORIA ÉPICA (Estilo Alto Impacto - Caballo Galopando + John Caricatura)
    # 9:16 Vertical (720x1280), 14 seconds @ 24fps
    # =========================================================================
    W, H = 720, 1280
    FPS = 24
    DUR = 14.0
    total_frames = int(FPS * DUR)

    f_huge = get_font(58, True)
    f_title = get_font(44, True)
    f_sub = get_font(28, True)
    f_pill = get_font(23, True)

    for f in os.listdir(TEMP_DIR):
        if f.endswith(".jpg"):
            os.remove(os.path.join(TEMP_DIR, f))

    print("3. Rendering Video 4: Euforia Épica (Caballo Galopando + John Polo Caricatura + Logos Liberal e Ibagué)...")
    for idx in range(total_frames):
        t = idx / float(FPS)
        h_idx = (idx * 2) % num_horse_frames  # Vigorous fast gallop!

        canvas = Image.new("RGBA", (W, H), COL_DARK + (255,))
        draw_sunburst_background(canvas, t, (W // 2, 540))
        draw = ImageDraw.Draw(canvas)

        # Persistent Top & Bottom Ibagué Flag Ribbons + Logos
        draw_tricolor_flag_ribbon(draw, W, 0, 18)
        draw_tricolor_flag_ribbon(draw, W, H - 18, 18)

        # Top Institutional Header (Logo JP + Bandera Ibagué + Partido Liberal + Sello Galopando)
        draw_rounded_box(canvas, [20, 28, W - 20, 150], 22, (15, 23, 42, 235), (255, 214, 0, 220), 3)
        logo_top = logo_jp.resize((100, 100), Image.LANCZOS)
        canvas.alpha_composite(logo_top, (34, 39))
        sello_top = sello_tri_frames[h_idx].resize((100, 100), Image.LANCZOS)
        canvas.alpha_composite(sello_top, (142, 39))
        draw_partido_liberal_badge(canvas, W - 135, 39, 100, 100)

        draw_impact_text(draw, W // 2 + 45, 72, "JOHN POLO", get_font(34, True), COL_WHITE)
        draw_impact_text(draw, W // 2 + 45, 112, "CONCEJO IBAGUÉ 2027", get_font(21, True), COL_YELLOW)

        # ---------------------------------------------------------------------
        # SCENE 1 (0.0s - 3.6s): CABALLO GALOPANDO GIGANTE + JOHN APUNTANDO AL FUTURO
        # ---------------------------------------------------------------------
        if t < 3.6:
            prog = ease_out_back(t / 0.55)

            # Giant Galloping Horse with Ibagué Tricolor Flag on Left & Red Liberal Horse on Right
            h_left = horse_tri_frames[h_idx].resize((330, 520), Image.LANCZOS)
            hx_l = int(-30 + 25 * prog)
            canvas.alpha_composite(h_left, (hx_l, 165))

            # John Polo Caricature (Pointing Pose 5) entering heroically on the right
            pw = int(390 * prog)
            ph = int(pw * (pose_point.height / float(pose_point.width)))
            if pw > 20 and ph > 20:
                p_img = pose_point.resize((pw, ph), Image.LANCZOS)
                bob_y = int(6 * math.sin(t * 7.0))
                canvas.alpha_composite(p_img, (W - pw - 10, 210 + bob_y))

            # Slam Titles (De La Espriella high-impact campaign style)
            draw_rounded_box(canvas, [25, 760, W - 25, 985], 26, (183, 28, 28, 245), (255, 214, 0, 255), 4)
            draw_tricolor_flag_ribbon(draw, W - 80, 772, 10)
            draw_impact_text(draw, W // 2, 825, "¡DESPIERTA IBAGUÉ!", f_huge, COL_YELLOW)
            draw_impact_text(draw, W // 2, 895, "MERECE SONAR MÁS FUERTE", f_title, COL_WHITE)
            draw_impact_text(draw, W // 2, 952, "CARÁCTER • FIRMEZA • RESULTADOS", f_pill, COL_YELLOW)

            # Soundwave Euphoria Equalizer at bottom
            for b_i in range(26):
                bh = int(18 + 55 * abs(math.sin(t * 12.0 + b_i * 0.4)))
                bx = 42 + b_i * 25
                bcol = COL_YELLOW if b_i % 3 == 0 else (COL_GREEN if b_i % 3 == 1 else COL_RED_BRIGHT)
                draw.rounded_rectangle([bx, 1085 - bh, bx + 17, 1085 + bh], radius=5, fill=bcol)

            draw_impact_text(draw, W // 2, 1210, "PARTIDO LIBERAL COLOMBIANO • 2027", f_sub, COL_WHITE)

        # ---------------------------------------------------------------------
        # SCENE 2 (3.6s - 7.4s): JOHN POLO CAMINANDO DE FRENTE + CABALLO GALOPANDO
        # ---------------------------------------------------------------------
        elif t < 7.4:
            lt = t - 3.6
            prog = ease_out_back(lt / 0.5)

            # Banner "Ibagué merece sonar más fuerte" across upper middle
            bw = 660
            bh = int(bw * banner_sonar.height / float(banner_sonar.width))
            b_img = banner_sonar.resize((bw, bh), Image.LANCZOS)
            draw_rounded_box(canvas, [24, 164, W - 24, 176 + bh], 22, (255, 214, 0, 255), (211, 47, 47, 255), 4)
            canvas.alpha_composite(b_img, (30, 170))

            # Left: Galloping Red Liberal Horse charging forward
            h_red = horse_red_frames[h_idx].resize((300, 480), Image.LANCZOS)
            canvas.alpha_composite(h_red, (15, 520))

            # Right: John Polo Caricature Walking Forward (Pose 2) with animated walking stride bob!
            walk_zoom = 1.0 + 0.04 * (lt / 3.8)
            walk_bob = int(9 * abs(math.sin(t * 8.5)))
            walk_tilt = 1.8 * math.sin(t * 8.5)
            pw = int(370 * walk_zoom * prog)
            ph = int(pw * pose_walk.height / float(pose_walk.width))
            if pw > 20 and ph > 20:
                p_walk = pose_walk.resize((pw, ph), Image.LANCZOS).rotate(walk_tilt, resample=Image.BICUBIC)
                canvas.alpha_composite(p_walk, (W - pw - 15, 485 - walk_bob))

            # Bottom Kinetic Banner
            draw_rounded_box(canvas, [25, 1015, W - 25, 1235], 24, (15, 23, 42, 245), (255, 214, 0, 255), 4)
            draw_impact_text(draw, W // 2, 1065, "¡EN MARCHA POR LAS 13 COMUNAS!", get_font(34, True), COL_YELLOW)
            draw_impact_text(draw, W // 2, 1122, "✓ Primer Empleo Joven  ✓ Agua 24/7 IBAL", f_sub, COL_WHITE)
            draw_impact_text(draw, W // 2, 1175, "✓ Cultura, Turismo y Plazas Vivas", f_sub, (102, 255, 140))

        # ---------------------------------------------------------------------
        # SCENE 3 (7.4s - 10.8s): JOHN POLO FIRME & PERFIL + DOBLE CABALLO GALOPANDO
        # ---------------------------------------------------------------------
        elif t < 10.8:
            lt = t - 7.4
            prog = ease_out_back(lt / 0.5)

            # Center-left: John Polo Front Sombrero Pose (Pose 1) & Side Pose (Pose 4)
            p1_w = int(340 * prog)
            p1_h = int(p1_w * pose_front.height / float(pose_front.width))
            if p1_w > 20 and p1_h > 20:
                p1_img = pose_front.resize((p1_w, p1_h), Image.LANCZOS)
                canvas.alpha_composite(p1_img, (25, 210 + int(5 * math.sin(t * 6.0))))

            # Right: Giant Galloping Horse with Ibagué Tricolor Flag
            h_tri_big = horse_tri_frames[h_idx].resize((345, 545), Image.LANCZOS)
            canvas.alpha_composite(h_tri_big, (W - 355, 185))

            # 3 Bold Proposal Slam Bars
            cards = [
                ("1. PRIMER EMPLEO Y EMPRESA LOCAL", COL_RED),
                ("2. CONTROL IMPLACABLE AL AGUA (IBAL)", COL_GREEN),
                ("3. IBAGUÉ DESTINO MUNDO Y FOLCLOR", (195, 125, 0)),
            ]
            for c_i, (c_txt, c_col) in enumerate(cards):
                cy = 795 + c_i * 112
                slide = int((1.0 - min(1.0, max(0.0, (lt - c_i * 0.2) / 0.35))) * 300)
                draw_rounded_box(canvas, [35 + slide, cy, W - 35 + slide, cy + 92], 20, c_col + (245,), COL_YELLOW + (255,), 3)
                draw_impact_text(draw, W // 2 + slide, cy + 46, c_txt, get_font(28, True), COL_WHITE)

            draw_impact_text(draw, W // 2, 1195, "¡IBAGUÉ TIENE CON QUÉ! ES HORA DE CREER", f_sub, COL_YELLOW)

        # ---------------------------------------------------------------------
        # SCENE 4 (10.8s - 14.0s): GRAN FINAL DE EUFORIA - JOHN PULGAR ARRIBA + CABALLO
        # ---------------------------------------------------------------------
        else:
            lt = t - 10.8
            prog = ease_out_back(lt / 0.55)

            # Confetti explosion in Ibagué Flag Colors (Yellow, Green, Red)
            for c_i in range(42):
                cx = int((c_i * 97 + lt * 120 * ((c_i % 3) - 1)) % W)
                cy = int((c_i * 173 + lt * 220 * (0.7 + (c_i % 4) * 0.3)) % H)
                ccol = COL_YELLOW if c_i % 3 == 0 else (COL_GREEN if c_i % 3 == 1 else COL_RED_BRIGHT)
                draw.rectangle([cx, cy, cx + 12, cy + 8], fill=ccol + (230,))

            # Left & Right Galloping Horses flanking John Polo!
            h_l = horse_red_frames[h_idx].resize((250, 395), Image.LANCZOS)
            h_r = horse_tri_frames[h_idx].resize((250, 395), Image.LANCZOS)
            canvas.alpha_composite(h_l, (-10, 215))
            canvas.alpha_composite(h_r, (W - 240, 215))

            # Center Hero: John Polo Close-Up Thumbs Up Caricature (Pose 3)
            tw = int(470 * prog)
            th = int(tw * pose_thumb.height / float(pose_thumb.width))
            if tw > 20 and th > 20:
                p_th = pose_thumb.resize((tw, th), Image.LANCZOS)
                canvas.alpha_composite(p_th, ((W - tw) // 2, 235))

            # Grand Finale Banner
            draw_rounded_box(canvas, [25, 790, W - 25, 1125], 28, (15, 23, 42, 248), (255, 214, 0, 255), 5)
            draw_tricolor_flag_ribbon(draw, W - 60, 800, 14)

            draw_impact_text(draw, W // 2, 865, "JOHN POLO", get_font(64, True), COL_WHITE)
            draw_impact_text(draw, W // 2, 930, "AL CONCEJO DE IBAGUÉ 2027", get_font(36, True), COL_YELLOW)
            draw_impact_text(draw, W // 2, 995, "¡IBAGUÉ MERECE SONAR MÁS FUERTE!", get_font(30, True), (102, 255, 140))
            draw_impact_text(draw, W // 2, 1065, "PARTIDO LIBERAL COLOMBIANO", get_font(28, True), COL_RED_BRIGHT)

            draw_rounded_box(canvas, [90, 1150, W - 90, 1225], 20, COL_YELLOW + (255,), COL_RED + (255,), 3)
            draw.text((W // 2, 1187), "www.johnpolo2027.com", font=f_sub, fill=(15, 23, 42), anchor="mm")

        canvas.convert("RGB").save(os.path.join(TEMP_DIR, f"frame_{idx:04d}.jpg"), quality=92)

    wav_v4 = os.path.join(TEMP_DIR, "euforia_v4.wav")
    generate_euphoric_campaign_anthem(wav_v4, duration_sec=DUR)
    out_v4 = os.path.join(OUT_DIR, "video_04_euforia_epica_caballo_y_john_caricatura_9x16.mp4")

    subprocess.run([
        ffmpeg_bin, "-y", "-framerate", str(FPS),
        "-i", os.path.join(TEMP_DIR, "frame_%04d.jpg"),
        "-i", wav_v4,
        "-c:v", "libx264", "-preset", "fast", "-crf", "20",
        "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-shortest",
        out_v4
    ], check=True)
    print("Saved:", out_v4)

    # =========================================================================
    # VIDEO 5: LAS 5 POSES DE JOHN POLO EN ACCIÓN + CABALLO GALOPANDO (9:16)
    # =========================================================================
    for f in os.listdir(TEMP_DIR):
        if f.endswith(".jpg"):
            os.remove(os.path.join(TEMP_DIR, f))

    DUR5 = 12.5
    frames_v5 = int(FPS * DUR5)
    poses_sequence = [
        (pose_point, "¡VISIÓN Y LIDERAZGO!", "Rumbo claro para transformar a Ibagué"),
        (pose_walk, "¡CAMINANDO LAS 13 COMUNAS!", "En la calle, escuchando a nuestra gente"),
        (pose_side, "¡CONTROL FIRME AL AGUA!", "Cero tolerancia a los abusos en servicios"),
        (pose_front, "¡ORGULLO TOLIMENSE!", "Cultura, turismo y primer empleo joven"),
        (pose_thumb, "¡JOHN POLO CONCEJO 2027!", "Ibagué merece sonar más fuerte"),
    ]
    seg_dur = DUR5 / len(poses_sequence)

    print("4. Rendering Video 5: Las 5 Poses de John Polo en Acción + Caballo Galopando...")
    for idx in range(frames_v5):
        t = idx / float(FPS)
        h_idx = (idx * 2) % num_horse_frames
        seg_i = min(len(poses_sequence) - 1, int(t / seg_dur))
        lt = t - seg_i * seg_dur
        prog = ease_out_back(lt / 0.45)

        p_active, title_txt, sub_txt = poses_sequence[seg_i]

        canvas = Image.new("RGBA", (W, H), (14, 18, 32, 255))
        draw_sunburst_background(canvas, t * 1.2, (W // 2, 480))
        draw = ImageDraw.Draw(canvas)

        # Banner "Ibagué merece sonar más fuerte" as top backdrop
        b_top = banner_sonar.resize((W - 40, int((W - 40) * banner_sonar.height / float(banner_sonar.width))), Image.LANCZOS)
        canvas.alpha_composite(b_top, (20, 30))

        # Both Galloping Horses (Red Liberal & Tricolor Seal) prominently animating
        h_gal = (horse_tri_frames[h_idx] if seg_i % 2 == 0 else horse_red_frames[h_idx]).resize((310, 490), Image.LANCZOS)
        canvas.alpha_composite(h_gal, (15, 420))

        # Active John Polo Caricature Pose on Right
        pw = int(385 * prog)
        ph = int(pw * p_active.height / float(p_active.width))
        if pw > 20 and ph > 20:
            p_res = p_active.resize((pw, ph), Image.LANCZOS)
            canvas.alpha_composite(p_res, (W - pw - 15, 390 + int(6 * math.sin(t * 8.0))))

        # Logos bar (Logo JP + Sello Circular Tricolor + Partido Liberal)
        draw_rounded_box(canvas, [25, 925, W - 25, 1235], 26, (15, 23, 42, 245), (255, 214, 0, 255), 4)
        canvas.alpha_composite(logo_jp.resize((90, 90), Image.LANCZOS), (45, 945))
        canvas.alpha_composite(sello_tri_frames[h_idx].resize((90, 90), Image.LANCZOS), (145, 945))
        draw_partido_liberal_badge(canvas, W - 135, 945, 90, 90)

        draw_impact_text(draw, W // 2 + 45, 975, "JOHN POLO", get_font(36, True), COL_WHITE)
        draw_impact_text(draw, W // 2 + 45, 1015, "PARTIDO LIBERAL • 2027", get_font(20, True), COL_YELLOW)

        draw_impact_text(draw, W // 2, 1095, title_txt, get_font(40, True), COL_YELLOW)
        draw_impact_text(draw, W // 2, 1150, sub_txt, get_font(25, True), COL_WHITE)
        draw_impact_text(draw, W // 2, 1202, "www.johnpolo2027.com", get_font(22, True), (102, 255, 140))

        draw_tricolor_flag_ribbon(draw, W, 0, 16)
        draw_tricolor_flag_ribbon(draw, W, H - 16, 16)

        canvas.convert("RGB").save(os.path.join(TEMP_DIR, f"frame_{idx:04d}.jpg"), quality=92)

    wav_v5 = os.path.join(TEMP_DIR, "euforia_v5.wav")
    generate_euphoric_campaign_anthem(wav_v5, duration_sec=DUR5)
    out_v5 = os.path.join(OUT_DIR, "video_05_john_caricatura_en_marcha_con_el_caballo_9x16.mp4")

    subprocess.run([
        ffmpeg_bin, "-y", "-framerate", str(FPS),
        "-i", os.path.join(TEMP_DIR, "frame_%04d.jpg"),
        "-i", wav_v5,
        "-c:v", "libx264", "-preset", "fast", "-crf", "20",
        "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-shortest",
        out_v5
    ], check=True)
    print("Saved:", out_v5)

    # =========================================================================
    # VIDEO 6: FORMATO CUADRADO 1:1 (EUFORIA + CARICATURA + CABALLO GALOPANDO)
    # =========================================================================
    for f in os.listdir(TEMP_DIR):
        if f.endswith(".jpg"):
            os.remove(os.path.join(TEMP_DIR, f))

    W6, H6 = 720, 720
    DUR6 = 10.0
    frames_v6 = int(FPS * DUR6)

    print("5. Rendering Video 6: Spot Cuadrado 1:1 Euforia Caricatura + Caballo Galopando...")
    for idx in range(frames_v6):
        t = idx / float(FPS)
        h_idx = (idx * 2) % num_horse_frames
        canvas = Image.new("RGBA", (W6, H6), COL_DARK + (255,))
        draw_sunburst_background(canvas, t, (W6 // 2, H6 // 2))
        draw = ImageDraw.Draw(canvas)

        # Top header bar
        draw_rounded_box(canvas, [15, 18, W6 - 15, 112], 18, (15, 23, 42, 240), (255, 214, 0, 255), 3)
        canvas.alpha_composite(logo_jp.resize((76, 76), Image.LANCZOS), (28, 27))
        canvas.alpha_composite(sello_tri_frames[h_idx].resize((76, 76), Image.LANCZOS), (112, 27))
        draw_partido_liberal_badge(canvas, W6 - 104, 27, 76, 76)
        draw_impact_text(draw, W6 // 2 + 35, 52, "JOHN POLO • CONCEJO 2027", get_font(25, True), COL_WHITE)
        draw_impact_text(draw, W6 // 2 + 35, 86, "¡IBAGUÉ MERECE SONAR MÁS FUERTE!", get_font(20, True), COL_YELLOW)

        # Left: Galloping Horse moving legs & waving flag
        h_sq = (horse_tri_frames[h_idx] if t < 5.0 else horse_red_frames[h_idx]).resize((280, 445), Image.LANCZOS)
        canvas.alpha_composite(h_sq, (20, 125))

        # Right: John Polo Caricature (alternating Walking -> Pointing -> Thumbs Up)
        active_p = pose_walk if t < 3.3 else (pose_point if t < 6.6 else pose_thumb)
        pw = 330
        ph = int(pw * active_p.height / float(active_p.width))
        p_sq = active_p.resize((pw, ph), Image.LANCZOS)
        canvas.alpha_composite(p_sq, (W6 - pw - 20, 130 + int(5 * math.sin(t * 8.0))))

        # Bottom Euphoria Banner
        draw_rounded_box(canvas, [15, H6 - 135, W6 - 15, H6 - 18], 20, (183, 28, 28, 248), (255, 214, 0, 255), 3)
        draw_impact_text(draw, W6 // 2, H6 - 92, "¡CARÁCTER, EMPLEO JOVEN Y CONTROL AL AGUA!", get_font(26, True), COL_YELLOW)
        draw_impact_text(draw, W6 // 2, H6 - 46, "PARTIDO LIBERAL • www.johnpolo2027.com", get_font(22, True), COL_WHITE)

        draw_tricolor_flag_ribbon(draw, W6, 0, 10)
        draw_tricolor_flag_ribbon(draw, W6, H6 - 10, 10)

        canvas.convert("RGB").save(os.path.join(TEMP_DIR, f"frame_{idx:04d}.jpg"), quality=92)

    wav_v6 = os.path.join(TEMP_DIR, "euforia_v6.wav")
    generate_euphoric_campaign_anthem(wav_v6, duration_sec=DUR6)
    out_v6 = os.path.join(OUT_DIR, "video_06_spot_euforia_caricatura_feed_1x1.mp4")

    subprocess.run([
        ffmpeg_bin, "-y", "-framerate", str(FPS),
        "-i", os.path.join(TEMP_DIR, "frame_%04d.jpg"),
        "-i", wav_v6,
        "-c:v", "libx264", "-preset", "fast", "-crf", "20",
        "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-shortest",
        out_v6
    ], check=True)
    print("Saved:", out_v6)

    # Cleanup temp files
    for f in os.listdir(TEMP_DIR):
        try:
            os.remove(os.path.join(TEMP_DIR, f))
        except Exception:
            pass
    try:
        os.rmdir(TEMP_DIR)
    except Exception:
        pass
    print("ALL TANDA 2 VIDEOS GENERATED SUCCESSFULLY!")


if __name__ == "__main__":
    main()

