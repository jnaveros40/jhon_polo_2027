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
TEMP_DIR = os.path.join(OUT_DIR, "_temp_tanda3")
GIF_SCRIPT_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "gifs_animados")

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

sys.path.insert(0, GIF_SCRIPT_DIR)
import generador_gifs_bandera as horse_engine

# Official Color Palette from Manual de Voz, Voto y Marketing Político (Sección I.4):
# Rojo #B21820, Verde #106C42, Amarillo #EAB308, Azul Marino #0F2D52, Blanco #FFFFFF
COL_RED = (178, 24, 32)
COL_RED_BRIGHT = (220, 38, 48)
COL_GREEN = (16, 108, 66)
COL_GREEN_LIGHT = (52, 211, 153)
COL_YELLOW = (234, 179, 8)
COL_YELLOW_BRIGHT = (255, 214, 10)
COL_NAVY = (15, 45, 82)
COL_NAVY_DARK = (9, 28, 52)
COL_WHITE = (255, 255, 255)


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


def extract_caricature_rgba(jpeg_path):
    img = Image.open(jpeg_path).convert("RGBA")
    w, h = img.size
    work_w, work_h = 680, int(680 * h / float(w))
    img = img.resize((work_w, work_h), Image.LANCZOS)
    px = img.load()

    visited = bytearray(work_w * work_h)
    queue = []

    def is_bg_white(r, g, b):
        return r > 236 and g > 236 and b > 236

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
                        alpha = max(0, min(255, int((245 - max(r, g, b)) * 6)))
                        px[nx, ny] = (r, g, b, alpha)

    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    alpha = img.getchannel("A")
    dilated = alpha.filter(ImageFilter.MaxFilter(9))
    rim = Image.new("RGBA", img.size, (255, 214, 10, 0))
    rim.putalpha(dilated)
    combined = Image.new("RGBA", img.size, (0, 0, 0, 0))
    combined.alpha_composite(rim)
    combined.alpha_composite(img)
    return combined


def generate_tolimense_euphoria_soundtrack(wav_path, duration_sec=15.0, sample_rate=44100):
    """
    Combine Tolimense acoustic tiple/marimba warmth (Sección IV.3: 'música instrumental
    de identidad tolimense') with euphoric crowd energy & triumphant fanfare climax!
    """
    num_samples = int(duration_sec * sample_rate)
    bpm = 128.0
    beat_dur = 60.0 / bpm

    chords = [
        [293.66, 369.99, 440.00, 587.33],  # D Major
        [196.00, 246.94, 293.66, 392.00],  # G Major
        [220.00, 277.18, 329.63, 440.00],  # A Major
        [293.66, 369.99, 440.00, 587.33],  # D Major
    ]
    melody = [
        587.33, 659.25, 739.99, 880.00,
        739.99, 659.25, 587.33, 440.00,
        587.33, 739.99, 880.00, 987.77,
        880.00, 739.99, 880.00, 1174.66
    ]

    random.seed(2027)
    noise_len = 22050
    raw_noise = [random.uniform(-1.0, 1.0) for _ in range(noise_len)]
    smooth_crowd = [0.0] * noise_len
    acc = 0.0
    for idx in range(noise_len):
        acc = 0.87 * acc + 0.13 * raw_noise[idx]
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
            beat_phase = (t % (beat_dur / 2.0)) / (beat_dur / 2.0)

            # Tiple / Acoustic String Strum + Brass Harmonics
            str_env = math.exp(-3.0 * beat_phase) * (1.0 - math.exp(-60.0 * beat_phase))
            for idx_c, freq in enumerate(chord):
                val += 0.12 * str_env * (
                    math.sin(2.0 * math.pi * freq * t) +
                    0.5 * math.sin(2.0 * math.pi * (freq * 2.0) * t) +
                    0.25 * math.sin(2.0 * math.pi * (freq * 3.0) * t)
                )

            # Lead Tolimense Fanfare Melody
            mel_env = math.exp(-2.6 * beat_phase) * (1.0 - math.exp(-55.0 * beat_phase))
            val += 0.16 * mel_env * (
                math.sin(2.0 * math.pi * mel_freq * t) +
                0.55 * math.sin(2.0 * math.pi * (mel_freq * 2.0) * t)
            )

            # Tambora Tolimense Deep Bass & Rim Click
            kick_phase = (t % beat_dur) / beat_dur
            if kick_phase < 0.20:
                k_env = math.exp(-16.0 * kick_phase)
                k_freq = 125.0 * math.exp(-12.0 * kick_phase) + 46.0
                val += 0.35 * k_env * math.sin(2.0 * math.pi * k_freq * t)

            clap_phase = ((t + beat_dur * 0.5) % beat_dur) / beat_dur
            if clap_phase < 0.12:
                c_env = math.exp(-26.0 * clap_phase)
                val += 0.20 * c_env * raw_noise[i % noise_len]

            # Euphoria Crowd Swell at P-S-P transitions and the 3-second Clave de Sol Finale!
            swell = (
                0.30
                + 0.35 * math.exp(-((t - 0.5) ** 2) / 0.7)
                + 0.32 * math.exp(-((t - 3.6) ** 2) / 0.8)
                + 0.35 * math.exp(-((t - 8.2) ** 2) / 0.8)
                + 0.48 * math.exp(-((t - (duration_sec - 2.0)) ** 2) / 1.8)
            )
            val += 0.22 * swell * smooth_crowd[i % noise_len]

            if t < 0.25:
                val *= (t / 0.25)
            elif t > duration_sec - 0.55:
                val *= max(0.0, (duration_sec - t) / 0.55)

            val = max(-0.96, min(0.96, val))
            frames.extend(struct.pack("<h", int(val * 32767)))

        wav_file.writeframes(frames)


def draw_tricolor_bar(draw, W, y, h):
    w3 = W // 3
    draw.rectangle([0, y, w3, y + h], fill=COL_YELLOW_BRIGHT)
    draw.rectangle([w3, y, 2 * w3, y + h], fill=COL_GREEN)
    draw.rectangle([2 * w3, y, W, y + h], fill=COL_RED)


def draw_rounded_box(base_img, box, radius, fill_rgba, outline_rgba=None, width=2):
    overlay = Image.new("RGBA", base_img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.rounded_rectangle(box, radius=radius, fill=fill_rgba, outline=outline_rgba, width=width)
    base_img.alpha_composite(overlay)


def draw_impact_text(draw, x, y, text, font, fill_col, stroke_col=(0, 0, 0), stroke_w=4):
    draw.text((x + 3, y + 4), text, font=font, fill=(0, 0, 0, 225), anchor="mm")
    draw.text((x, y), text, font=font, fill=fill_col, anchor="mm", stroke_width=stroke_w, stroke_fill=stroke_col)


def draw_navy_rays_background(canvas, t, center_xy):
    """Official Manual Palette Background: Deep Navy #0F2D52 with Crimson #B21820 & Gold #EAB308 rays."""
    W, H = canvas.size
    cx, cy = center_xy
    overlay = Image.new("RGBA", (W, H), COL_NAVY_DARK + (255,))
    d = ImageDraw.Draw(overlay)
    num_rays = 16
    radius = max(W, H) * 1.4
    for r_i in range(num_rays):
        ang1 = (r_i * 2.0 * math.pi / num_rays) + t * 0.3
        ang2 = ang1 + (math.pi / num_rays) * 0.55
        p1 = (cx, cy)
        p2 = (cx + radius * math.cos(ang1), cy + radius * math.sin(ang1))
        p3 = (cx + radius * math.cos(ang2), cy + radius * math.sin(ang2))
        col = (178, 24, 32, 52) if r_i % 2 == 0 else (234, 179, 8, 28)
        d.polygon([p1, p2, p3], fill=col)
    canvas.alpha_composite(overlay)


def ease_out_back(x):
    x = max(0.0, min(1.0, x))
    c1 = 1.70158
    c3 = c1 + 1.0
    return 1.0 + c3 * pow(x - 1.0, 3) + c1 * pow(x - 1.0, 2)


def render_psp_vertical_video(
    out_filename,
    nicho_badge,
    hook_3s_top,
    hook_3s_main,
    p_problema_lines,
    s_solucion_lines,
    p_concejo_lines,
    pose_p1,
    pose_s2,
    pose_p3,
    pose_thumb,
    sello_frames,
    horse_tri_frames,
    logo_jp,
    banner_sonar,
    ffmpeg_bin
):
    """
    Render a 15-second 9:16 vertical video strictly following the Manual de Voz y Voto:
    - Persistent Watermark: Circular Emblem of the Jinete with Ibagué Flag (Sección I.4).
    - 0.0s - 3.6s: 1. PROBLEMA REAL QUE DUELE (3-second hook + big yellow/white subtitles on Navy #0F2D52).
    - 3.6s - 8.2s: 2. SOLUCIÓN GERENCIAL CONCRETA ('El Gerente Campesino' + Galloping Horse).
    - 8.2s - 12.0s: 3. PRIMERA PIEDRA DESDE EL CONCEJO (Art. 313 C.P. & Ley 136/1994).
    - 12.0s - 15.0s: CIERRE OBLIGATORIO DE 3 SEGUNDOS DEL MANUAL:
      Emblema del Jinete + Sticker Lema y Clave de Sol 'Ibagué merece sonar más fuerte' +
      'Turismo que genera empleo • Jóvenes que cuentan nuestra historia • Ibagué que crece'.
    """
    W, H = 720, 1280
    FPS = 24
    DUR = 15.0
    total_frames = int(FPS * DUR)
    num_h = len(sello_frames)

    f_huge = get_font(50, True)
    f_title = get_font(38, True)
    f_sub = get_font(27, True)
    f_pill = get_font(21, True)
    f_small = get_font(19, True)

    for f in os.listdir(TEMP_DIR):
        if f.endswith(".jpg"):
            os.remove(os.path.join(TEMP_DIR, f))

    print(f"Rendering {out_filename}...")
    for idx in range(total_frames):
        t = idx / float(FPS)
        h_idx = (idx * 2) % num_h

        canvas = Image.new("RGBA", (W, H), COL_NAVY_DARK + (255,))
        draw_navy_rays_background(canvas, t, (W // 2, 520))
        draw = ImageDraw.Draw(canvas)

        draw_tricolor_bar(draw, W, 0, 16)
        draw_tricolor_bar(draw, W, H - 16, 16)

        # Persistent Top Bar: Emblema Circular del Jinete (Sello de Agua Oficial Manual I.4) + Nicho Badge
        draw_rounded_box(canvas, [18, 26, W - 18, 138], 20, (15, 45, 82, 240), (234, 179, 8, 230), 3)
        sello_watermark = sello_frames[h_idx].resize((92, 92), Image.LANCZOS)
        canvas.alpha_composite(sello_watermark, (30, 36))
        canvas.alpha_composite(logo_jp.resize((88, 88), Image.LANCZOS), (W - 118, 38))

        draw_impact_text(draw, W // 2, 62, "JOHN POLO • «EL GERENTE CAMPESINO»", get_font(24, True), COL_WHITE)
        draw_rounded_box(canvas, [145, 84, W - 145, 124], 14, COL_RED + (255,), COL_YELLOW_BRIGHT + (255,), 2)
        draw.text((W // 2, 104), nicho_badge, font=get_font(18, True), fill=COL_YELLOW_BRIGHT, anchor="mm")

        # =====================================================================
        # ACT 1 (0.0s - 3.6s): 1. PROBLEMA REAL QUE DUELE (Gancho de 3 Segundos)
        # =====================================================================
        if t < 3.6:
            prog = ease_out_back(t / 0.5)

            # Step Tag
            draw_rounded_box(canvas, [35, 155, W - 35, 215], 16, COL_RED + (250,), COL_YELLOW_BRIGHT + (255,), 3)
            draw_impact_text(draw, W // 2, 185, "1. PROBLEMA REAL QUE DUELE EN IBAGUÉ", get_font(25, True), COL_YELLOW_BRIGHT)

            # Galloping Horse with Ibagué Tricolor Flag on Left + John Polo Caricature on Right
            h_gal = horse_tri_frames[h_idx].resize((305, 485), Image.LANCZOS)
            canvas.alpha_composite(h_gal, (15, 235))

            pw = int(365 * prog)
            ph = int(pw * pose_p1.height / float(pose_p1.width))
            if pw > 20 and ph > 20:
                canvas.alpha_composite(pose_p1.resize((pw, ph), Image.LANCZOS), (W - pw - 15, 240 + int(5 * math.sin(t * 7.0))))

            # Big 3-Second Hook & Data Box (Large Yellow/White Subtitles on Dark Navy #0F2D52)
            draw_rounded_box(canvas, [22, 745, W - 22, 1185], 26, (9, 28, 52, 248), COL_RED_BRIGHT + (255,), 4)
            draw_impact_text(draw, W // 2, 805, hook_3s_top, get_font(34, True), COL_YELLOW_BRIGHT)
            draw_impact_text(draw, W // 2, 868, hook_3s_main, f_huge, COL_WHITE)

            for l_i, line_txt in enumerate(p_problema_lines):
                draw_impact_text(draw, W // 2, 955 + l_i * 58, line_txt, f_sub, COL_YELLOW_BRIGHT if l_i % 2 == 0 else COL_WHITE)

            draw_impact_text(draw, W // 2, 1225, "FÓRMULA P-S-P • DATO MATA RELATO", f_pill, COL_GREEN_LIGHT)

        # =====================================================================
        # ACT 2 (3.6s - 8.2s): 2. SOLUCIÓN GERENCIAL CONCRETA (Sin Subir Impuestos)
        # =====================================================================
        elif t < 8.2:
            lt = t - 3.6
            prog = ease_out_back(lt / 0.5)

            draw_rounded_box(canvas, [35, 155, W - 35, 215], 16, COL_GREEN + (250,), COL_YELLOW_BRIGHT + (255,), 3)
            draw_impact_text(draw, W // 2, 185, "2. SOLUCIÓN GERENCIAL CONCRETA (80-10-10)", get_font(24, True), COL_WHITE)

            # John Polo Caricature on Left + Galloping Horse with Ibagué Flag on Right
            pw = int(355 * prog)
            ph = int(pw * pose_s2.height / float(pose_s2.width))
            if pw > 20 and ph > 20:
                walk_bob = int(7 * abs(math.sin(t * 8.0)))
                canvas.alpha_composite(pose_s2.resize((pw, ph), Image.LANCZOS), (20, 235 - walk_bob))

            h_gal = horse_tri_frames[h_idx].resize((315, 500), Image.LANCZOS)
            canvas.alpha_composite(h_gal, (W - 325, 225))

            # Solution Cards sliding in
            draw_rounded_box(canvas, [22, 740, W - 22, 1185], 26, (15, 45, 82, 248), COL_GREEN_LIGHT + (255,), 4)
            for s_i, s_txt in enumerate(s_solucion_lines):
                sy = 805 + s_i * 92
                draw_rounded_box(canvas, [42, sy - 34, W - 42, sy + 40], 16, (16, 108, 66, 235), COL_YELLOW_BRIGHT + (220,), 2)
                draw_impact_text(draw, W // 2, sy + 2, s_txt, get_font(25, True), COL_WHITE)

            draw_impact_text(draw, W // 2, 1225, "CERO SUBIDAS DE PREDIAL NI ICA • RIGOR TÉCNICO", f_pill, COL_YELLOW_BRIGHT)

        # =====================================================================
        # ACT 3 (8.2s - 12.0s): 3. PRIMERA PIEDRA DESDE EL CONCEJO (Art. 313 C.P.)
        # =====================================================================
        elif t < 12.0:
            lt = t - 8.2
            prog = ease_out_back(lt / 0.5)

            draw_rounded_box(canvas, [35, 155, W - 35, 215], 16, COL_YELLOW + (255,), COL_RED + (255,), 3)
            draw.text((W // 2, 185), "3. PRIMERA PIEDRA DESDE EL CONCEJO (2027–2030)", font=get_font(23, True), fill=COL_NAVY_DARK, anchor="mm")

            # Galloping Horse & John Polo Caricature
            h_gal = horse_tri_frames[h_idx].resize((300, 475), Image.LANCZOS)
            canvas.alpha_composite(h_gal, (20, 235))

            pw = int(365 * prog)
            ph = int(pw * pose_p3.height / float(pose_p3.width))
            if pw > 20 and ph > 20:
                canvas.alpha_composite(pose_p3.resize((pw, ph), Image.LANCZOS), (W - pw - 15, 235))

            draw_rounded_box(canvas, [22, 740, W - 22, 1185], 26, (178, 24, 32, 248), COL_YELLOW_BRIGHT + (255,), 4)
            draw_impact_text(draw, W // 2, 795, "ACCIÓN CON LA CREDENCIAL (ART. 313 C.P.):", get_font(27, True), COL_YELLOW_BRIGHT)

            for c_i, c_txt in enumerate(p_concejo_lines):
                draw_impact_text(draw, W // 2, 875 + c_i * 68, c_txt, get_font(26, True), COL_WHITE)

            draw_impact_text(draw, W // 2, 1140, "«PALABRA CUMPLIDA DEL CAMPO CON RIGOR GERENCIAL»", get_font(22, True), COL_YELLOW_BRIGHT)
            draw_impact_text(draw, W // 2, 1225, "JOHN POLO • PARTIDO LIBERAL • IBAGUÉ", f_pill, COL_WHITE)

        # =====================================================================
        # ACT 4 (12.0s - 15.0s): CIERRE OBLIGATORIO DE 3 SEGUNDOS DEL MANUAL
        # Emblema del Jinete (Sombrero, Rabo de Gallo Blanco y Bandera de Ibagué) +
        # Sticker Lema y Clave de Sol 'Ibagué merece sonar más fuerte' +
        # Pie Institucional: 'Turismo que genera empleo • Jóvenes que cuentan nuestra historia • Ibagué que crece'
        # =====================================================================
        else:
            lt = t - 12.0
            prog = ease_out_back(lt / 0.45)

            # Tricolor Confetti Celebration
            for c_i in range(38):
                cx = int((c_i * 97 + lt * 130 * ((c_i % 3) - 1)) % W)
                cy = int((c_i * 163 + lt * 210 * (0.7 + (c_i % 4) * 0.3)) % H)
                ccol = COL_YELLOW_BRIGHT if c_i % 3 == 0 else (COL_GREEN_LIGHT if c_i % 3 == 1 else COL_RED_BRIGHT)
                draw.rectangle([cx, cy, cx + 11, cy + 7], fill=ccol + (230,))

            # 1. Sticker del Lema y Clave de Sol 'Ibagué merece sonar más fuerte'
            bw = int(660 * max(0.25, prog))
            bh = int(bw * banner_sonar.height / float(banner_sonar.width))
            if bw > 20 and bh > 20:
                b_res = banner_sonar.resize((bw, bh), Image.LANCZOS)
                bx = (W - bw) // 2
                draw_rounded_box(canvas, [bx - 8, 152, bx + bw + 8, 168 + bh], 22, COL_YELLOW_BRIGHT + (255,), COL_RED + (255,), 4)
                canvas.alpha_composite(b_res, (bx, 160))

            # 2. Emblema Circular Grande del Jinete (Caballo Galopando + Sombrero + Rabo de Gallo Blanco + Bandera Ibagué)
            # flanked by John Polo Thumbs Up Caricature!
            sello_big = sello_frames[h_idx].resize((265, 265), Image.LANCZOS)
            canvas.alpha_composite(sello_big, (35, 625))

            tw = int(370 * prog)
            th = int(tw * pose_thumb.height / float(pose_thumb.width))
            if tw > 20 and th > 20:
                canvas.alpha_composite(pose_thumb.resize((tw, th), Image.LANCZOS), (W - tw - 20, 565))

            # 3. Pie Institucional Oficial del Manual (Sección I.3 y I.4)
            draw_rounded_box(canvas, [20, 955, W - 20, 1245], 24, (9, 28, 52, 250), COL_YELLOW_BRIGHT + (255,), 4)
            draw_tricolor_bar(draw, W - 60, 965, 12)
            draw_impact_text(draw, W // 2, 1018, "JOHN POLO AL CONCEJO DE IBAGUÉ", get_font(38, True), COL_WHITE)
            draw_impact_text(draw, W // 2, 1068, "«IBAGUÉ TIENE CON QUÉ. ES HORA DE CREER.»", get_font(25, True), COL_YELLOW_BRIGHT)

            # Los 3 Pilares Comunicacionales del Pie Institucional (Sección I.3 del Manual)
            draw_rounded_box(canvas, [35, 1100, W - 35, 1178], 16, COL_RED + (245,), COL_YELLOW_BRIGHT + (200,), 2)
            draw_impact_text(draw, W // 2, 1125, "• TURISMO QUE GENERA EMPLEO • JÓVENES QUE CUENTAN", get_font(19, True), COL_WHITE)
            draw_impact_text(draw, W // 2, 1154, "NUESTRA HISTORIA • IBAGUÉ QUE CRECE •", get_font(20, True), COL_YELLOW_BRIGHT)

            draw_impact_text(draw, W // 2, 1212, "www.johnpolo2027.com • PARTIDO LIBERAL", get_font(22, True), COL_GREEN_LIGHT)

        canvas.convert("RGB").save(os.path.join(TEMP_DIR, f"frame_{idx:04d}.jpg"), quality=92)

    wav_path = os.path.join(TEMP_DIR, "audio_psp.wav")
    generate_tolimense_euphoria_soundtrack(wav_path, duration_sec=DUR)
    out_mp4 = os.path.join(OUT_DIR, out_filename)

    subprocess.run([
        ffmpeg_bin, "-y", "-framerate", str(FPS),
        "-i", os.path.join(TEMP_DIR, "frame_%04d.jpg"),
        "-i", wav_path,
        "-c:v", "libx264", "-preset", "fast", "-crf", "20",
        "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-shortest",
        out_mp4
    ], check=True)
    print("Saved:", out_mp4)


def render_dato_mata_relato_square_video(
    out_filename,
    pose_front,
    pose_point,
    pose_thumb,
    sello_frames,
    horse_tri_frames,
    logo_jp,
    banner_sonar,
    ffmpeg_bin
):
    """
    VIDEO 10 (1:1 Square - 720x720, 12 seconds @ 24fps):
    Producto 3 del Manual: 'Dato Mata Relato' — Blindaje Fiscal ($165.799M + $40.000M),
    Esquema 80-10-10, INFIBAGUÉ 75/25 Banca Juvenil y Cero Impuestos Nuevos.
    Closes with the mandatory 3-second Jinete + Clave de Sol 'Ibagué merece sonar más fuerte'.
    """
    W, H = 720, 720
    FPS = 24
    DUR = 12.0
    total_frames = int(FPS * DUR)
    num_h = len(sello_frames)

    for f in os.listdir(TEMP_DIR):
        if f.endswith(".jpg"):
            os.remove(os.path.join(TEMP_DIR, f))

    print(f"Rendering {out_filename} (1:1 Dato Mata Relato)...")
    for idx in range(total_frames):
        t = idx / float(FPS)
        h_idx = (idx * 2) % num_h

        canvas = Image.new("RGBA", (W, H), COL_NAVY_DARK + (255,))
        draw_navy_rays_background(canvas, t, (W // 2, H // 2))
        draw = ImageDraw.Draw(canvas)

        draw_tricolor_bar(draw, W, 0, 12)
        draw_tricolor_bar(draw, W, H - 12, 12)

        # Header Bar with Circular Jinete Watermark + Logo JP
        draw_rounded_box(canvas, [14, 18, W - 14, 108], 18, (15, 45, 82, 242), COL_YELLOW_BRIGHT + (240,), 3)
        canvas.alpha_composite(sello_frames[h_idx].resize((74, 74), Image.LANCZOS), (24, 26))
        canvas.alpha_composite(logo_jp.resize((74, 74), Image.LANCZOS), (W - 98, 26))
        draw_impact_text(draw, W // 2, 48, "DATO MATA RELATO • BLINDAJE FISCAL", get_font(25, True), COL_YELLOW_BRIGHT)
        draw_impact_text(draw, W // 2, 82, "JOHN POLO • «EL GERENTE CAMPESINO»", get_font(20, True), COL_WHITE)

        if t < 4.5:
            # 1. PROBLEMA REAL QUE DUELE: Deuda $165.799M + $40.000M
            h_gal = horse_tri_frames[h_idx].resize((250, 395), Image.LANCZOS)
            canvas.alpha_composite(h_gal, (15, 120))
            p_res = pose_point.resize((310, int(310 * pose_point.height / float(pose_point.width))), Image.LANCZOS)
            canvas.alpha_composite(p_res, (W - 325, 125))

            draw_rounded_box(canvas, [18, 515, W - 18, H - 20], 20, COL_RED + (248,), COL_YELLOW_BRIGHT + (255,), 3)
            draw_impact_text(draw, W // 2, 552, "1. EL PROBLEMA: DEUDA DE $165.799M + $40.000M", get_font(24, True), COL_YELLOW_BRIGHT)
            draw_impact_text(draw, W // 2, 598, "¿Cómo hacer obras sin subir Predial ni ICA?", get_font(27, True), COL_WHITE)
            draw_impact_text(draw, W // 2, 648, "Acabando el derroche y la burocracia en INFIBAGUÉ e IBAL", get_font(21, True), COL_YELLOW_BRIGHT)

        elif t < 9.0:
            # 2. SOLUCIÓN GERENCIAL + 3. PRIMERA PIEDRA
            p_res = pose_front.resize((275, int(275 * pose_front.height / float(pose_front.width))), Image.LANCZOS)
            canvas.alpha_composite(p_res, (20, 120))

            items = [
                "✓ Esquema 80-10-10 (Nación + Cooperación)",
                "✓ INFIBAGUÉ 75/25: Banca Juvenil y Mujeres",
                "✓ Plaza de la 28 Estilo Concordia + Plaza 21",
                "✓ Cero Sobretasas • Cero Subida de Predial",
            ]
            for i_idx, txt in enumerate(items):
                iy = 135 + i_idx * 88
                draw_rounded_box(canvas, [285, iy, W - 18, iy + 74], 16, COL_GREEN + (242,), COL_YELLOW_BRIGHT + (240,), 2)
                draw_impact_text(draw, 285 + (W - 303) // 2, iy + 37, txt, get_font(20, True), COL_WHITE)

            draw_rounded_box(canvas, [18, 520, W - 18, H - 20], 20, (9, 28, 52, 248), COL_YELLOW_BRIGHT + (255,), 3)
            draw_impact_text(draw, W // 2, 560, "PRIMERA PIEDRA EN EL CONCEJO 2027–2030:", get_font(23, True), COL_YELLOW_BRIGHT)
            draw_impact_text(draw, W // 2, 608, "Auditoría a la Deuda (MFMP 2026-2035) y Acuerdo 75/25", get_font(23, True), COL_WHITE)
            draw_impact_text(draw, W // 2, 655, "Proyectando a Ibagué a 8 años frente a Pereira y Manizales", get_font(19, True), COL_GREEN_LIGHT)

        else:
            # 3-SECOND MANDATORY FINALE (9.0s - 12.0s): Clave de Sol + Jinete + 3 Pilares
            bw = 420
            bh = int(bw * banner_sonar.height / float(banner_sonar.width))
            b_res = banner_sonar.resize((bw, bh), Image.LANCZOS)
            draw_rounded_box(canvas, [18, 125, 30 + bw, 137 + bh], 18, COL_YELLOW_BRIGHT + (255,), COL_RED + (255,), 3)
            canvas.alpha_composite(b_res, (24, 131))

            p_th = pose_thumb.resize((245, int(245 * pose_thumb.height / float(pose_thumb.width))), Image.LANCZOS)
            canvas.alpha_composite(p_th, (W - 260, 125))

            draw_rounded_box(canvas, [18, 495, W - 18, H - 18], 22, COL_RED + (248,), COL_YELLOW_BRIGHT + (255,), 4)
            draw_impact_text(draw, W // 2, 538, "JOHN POLO AL CONCEJO DE IBAGUÉ 2027–2030", get_font(26, True), COL_WHITE)
            draw_impact_text(draw, W // 2, 582, "Turismo que genera empleo • Jóvenes que cuentan", get_font(20, True), COL_YELLOW_BRIGHT)
            draw_impact_text(draw, W // 2, 614, "nuestra historia • Ibagué que crece", get_font(20, True), COL_YELLOW_BRIGHT)
            draw_impact_text(draw, W // 2, 662, "www.johnpolo2027.com • PARTIDO LIBERAL", get_font(21, True), COL_WHITE)

        canvas.convert("RGB").save(os.path.join(TEMP_DIR, f"frame_{idx:04d}.jpg"), quality=92)

    wav_path = os.path.join(TEMP_DIR, "audio_sq.wav")
    generate_tolimense_euphoria_soundtrack(wav_path, duration_sec=DUR)
    out_mp4 = os.path.join(OUT_DIR, out_filename)

    subprocess.run([
        ffmpeg_bin, "-y", "-framerate", str(FPS),
        "-i", os.path.join(TEMP_DIR, "frame_%04d.jpg"),
        "-i", wav_path,
        "-c:v", "libx264", "-preset", "fast", "-crf", "20",
        "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-shortest",
        out_mp4
    ], check=True)
    print("Saved:", out_mp4)


def main():
    ffmpeg_bin = os.path.join(ROOT_DIR, "node_modules", "ffmpeg-static", "ffmpeg.exe")
    if not os.path.exists(ffmpeg_bin):
        ffmpeg_bin = "ffmpeg"

    print("1. Building Galloping Horse with Ibagué Flag & Circular Jinete Emblem...")
    body_img, _, flag_tri_img, scale = horse_engine.render_base_layers(scale=1.35)
    torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img = horse_engine.split_body_into_skeletal_parts(body_img, scale)

    num_h = 18
    horse_tri_frames = []
    sello_frames = []
    for i in range(num_h):
        ph = (i / float(num_h)) * 2.0 * math.pi
        g_tri = horse_engine.compose_galloping_horse_frame(
            torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img,
            flag_tri_img, scale, ph
        )
        horse_tri_frames.append(g_tri)

        sello = Image.new("RGBA", (240, 240), (0, 0, 0, 0))
        sd = ImageDraw.Draw(sello)
        sd.ellipse([4, 4, 236, 236], fill=(255, 255, 255, 255), outline=COL_RED + (255,), width=6)
        sd.ellipse([11, 11, 229, 229], outline=COL_GREEN + (255,), width=4)
        sd.ellipse([16, 16, 224, 224], outline=COL_YELLOW_BRIGHT + (255,), width=4)
        h_in = g_tri.resize((125, 200), Image.LANCZOS)
        sello.alpha_composite(h_in, ((240 - 125) // 2, 18))
        sello_frames.append(sello)

    print("2. Loading John Polo Caricature Poses & Official Assets...")
    pose_front = extract_caricature_rgba(os.path.join(CARICATURA_DIR, "Gemini_Generated_Image_3j909g3j909g3j90.jpeg"))
    pose_walk = extract_caricature_rgba(os.path.join(CARICATURA_DIR, "Gemini_Generated_Image_3j909g3j909g3j90 (1).jpeg"))
    pose_thumb = extract_caricature_rgba(os.path.join(CARICATURA_DIR, "Gemini_Generated_Image_3j909g3j909g3j90 (2).jpeg"))
    pose_side = extract_caricature_rgba(os.path.join(CARICATURA_DIR, "Gemini_Generated_Image_3j909g3j909g3j90 (3).jpeg"))
    pose_point = extract_caricature_rgba(os.path.join(CARICATURA_DIR, "Gemini_Generated_Image_3j909g3j909g3j90 (4).jpeg"))

    logo_jp = Image.open(os.path.join(IMG_DIR, "logo-jp.png")).convert("RGBA")
    banner_sonar = Image.open(os.path.join(IMG_DIR, "ibague-banner.jpg")).convert("RGBA")

    # VIDEO 7: Fórmula P-S-P -> Eje 2: Agua Continua, IBAL y Telemetría Digital
    render_psp_vertical_video(
        out_filename="video_07_oleada3_psp_agua_ibal_sin_mafias_9x16.mp4",
        nicho_badge="EJE 2 • AGUA CONTINUA Y TELEMETRÍA IBAL (13 COMUNAS)",
        hook_3s_top="¿TU BARRIO SIN AGUA Y LA FACTURA CARA?",
        hook_3s_main="¡1 MILLÓN DE M³ PERDIDOS!",
        p_problema_lines=[
            "El IBAL pierde ~1 millón de m³/mes en fugas,",
            "socava y rompe las calles por redes obsoletas",
            "y deja a los barrios con baja presión y cortes."
        ],
        s_solucion_lines=[
            "✓ Meta: 30 km/año de tubería nueva (120 km en 4 años)",
            "✓ Telemetría digital y válvulas automatizadas 24/7",
            "✓ +$8.000 Millones/año recuperados en agua potable"
        ],
        p_concejo_lines=[
            "1. Control político citando al IBAL con metas por comuna",
            "2. Acuerdo de Sincronía Hidráulica: prohibido pavimentar",
            "   sin certificar primero la red subterránea",
            "3. Blindaje de la cuenca del Cañón del Combeima"
        ],
        pose_p1=pose_point,
        pose_s2=pose_walk,
        pose_p3=pose_side,
        pose_thumb=pose_thumb,
        sello_frames=sello_frames,
        horse_tri_frames=horse_tri_frames,
        logo_jp=logo_jp,
        banner_sonar=banner_sonar,
        ffmpeg_bin=ffmpeg_bin
    )

    # VIDEO 8: Fórmula P-S-P -> Eje 1 & 5: Campo, 144 Veredas, Acopio Calle 19 y Biofábrica
    render_psp_vertical_video(
        out_filename="video_08_oleada3_psp_campo_144_veredas_calle19_9x16.mp4",
        nicho_badge="EJE 1 Y 5 • 17 CORREGIMIENTOS Y 144 VEREDAS",
        hook_3s_top="¡ORGULLO CAMPESINO Y COMIDA JUSTA!",
        hook_3s_main="13.000 FAMILIAS RURALES",
        p_problema_lines=[
            "144 veredas con vías terciarias destruidas",
            "e intermediarios que se quedan con la ganancia",
            "del campesino y encarecen la canasta familiar."
        ],
        s_solucion_lines=[
            "✓ 50 km/año de vías terciarias con las JAC (80-10-10)",
            "✓ Antiguo Carrefour Cll 19: Central de Acopio y Frío",
            "✓ Mayoristas socios con voz sin voto + Biofábrica"
        ],
        p_concejo_lines=[
            "1. Acuerdo Municipal adoptando la Ley 2046 de compras",
            "   públicas locales directas a nuestras veredas",
            "2. Creación de la Empresa de Economía Mixta en Cll 19",
            "3. Plaza de la 28 estilo Concordia con cocinas dignas"
        ],
        pose_p1=pose_front,
        pose_s2=pose_walk,
        pose_p3=pose_point,
        pose_thumb=pose_thumb,
        sello_frames=sello_frames,
        horse_tri_frames=horse_tri_frames,
        logo_jp=logo_jp,
        banner_sonar=banner_sonar,
        ffmpeg_bin=ffmpeg_bin
    )

    # VIDEO 9: Fórmula P-S-P -> Eje 6 & 7: Movilidad, SETP, Cable Aéreo, Mirolindo y Seguridad
    render_psp_vertical_video(
        out_filename="video_09_oleada3_psp_movilidad_setp_cable_mirolindo_9x16.mp4",
        nicho_badge="EJE 6 Y 7 • MOVILIDAD, CABLE AÉREO Y SEGURIDAD",
        hook_3s_top="¿ATRAPADO EN EL TRANCÓN TODOS LOS DÍAS?",
        hook_3s_main="+310.000 VEHÍCULOS EN CAOS",
        p_problema_lines=[
            "Malla vial colapsada, SETP estancado, laderas",
            "aisladas en Boquerón y Comuna 2, y 60.000 carros",
            "con placa foránea tributando fuera de Ibagué."
        ],
        s_solucion_lines=[
            "✓ Caja única SETP + 2 Cables Aéreos (Boquerón y Comuna 2)",
            "✓ Puente en Mirolindo, Calle 103 y Av. Cra. 13",
            "✓ Incentivos sin garrote a 60.000 placas + Seguridad 21"
        ],
        p_concejo_lines=[
            "1. Acuerdo de integración tarifaria SETP + Cable Aéreo",
            "2. Cobro riguroso de Cargas Urbanísticas a constructoras",
            "3. Plan de Choque con luz LED, cámaras y deporte contra",
            "   el microtráfico en la Plaza 21 y las 13 comunas"
        ],
        pose_p1=pose_side,
        pose_s2=pose_point,
        pose_p3=pose_walk,
        pose_thumb=pose_thumb,
        sello_frames=sello_frames,
        horse_tri_frames=horse_tri_frames,
        logo_jp=logo_jp,
        banner_sonar=banner_sonar,
        ffmpeg_bin=ffmpeg_bin
    )

    # VIDEO 10: Formato Cuadrado 1:1 'Dato Mata Relato' (Blindaje Fiscal + INFIBAGUÉ 75/25)
    render_dato_mata_relato_square_video(
        out_filename="video_10_oleada3_dato_mata_relato_blindaje_fiscal_1x1.mp4",
        pose_front=pose_front,
        pose_point=pose_point,
        pose_thumb=pose_thumb,
        sello_frames=sello_frames,
        horse_tri_frames=horse_tri_frames,
        logo_jp=logo_jp,
        banner_sonar=banner_sonar,
        ffmpeg_bin=ffmpeg_bin
    )

    for f in os.listdir(TEMP_DIR):
        try:
            os.remove(os.path.join(TEMP_DIR, f))
        except Exception:
            pass
    try:
        os.rmdir(TEMP_DIR)
    except Exception:
        pass
    print("ALL 4 OLEADA 3 (MANUAL VOZ Y VOTO) VIDEOS GENERATED SUCCESSFULLY!")


if __name__ == "__main__":
    main()
