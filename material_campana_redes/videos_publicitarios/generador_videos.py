import os
import math
import wave
import struct
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

# Directories
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(ROOT_DIR, "public", "images")
OUT_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "videos_publicitarios")
TEMP_DIR = os.path.join(OUT_DIR, "_temp_frames")

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

# Paths to official assets
PATH_LOGO = os.path.join(IMG_DIR, "logo-jp.png")
PATH_BANNER = os.path.join(IMG_DIR, "ibague-banner.jpg")
PATH_CABALLO = os.path.join(IMG_DIR, "caballo-liberal.jpg")
PATH_POSTER_HERO = os.path.join(IMG_DIR, "candidato-hero.jpg")
PATH_POSTER_CREER = os.path.join(IMG_DIR, "candidato-accion.jpg")

# Colors (Ibagué Flag & Partido Liberal)
COL_RED = (211, 47, 47)
COL_RED_DARK = (150, 20, 20)
COL_YELLOW = (251, 192, 45)
COL_YELLOW_BRIGHT = (255, 214, 0)
COL_GREEN = (46, 125, 50)
COL_DARK = (11, 15, 25)
COL_WHITE = (255, 255, 255)


def get_font(size, bold=True):
    """Load Windows system font (Arial Bold / Impact / Segoe UI Bold) with fallback."""
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/impact.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ] if bold else [
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return ImageFont.load_default()


def generate_audio_track(wav_path, duration_sec=15.0, sample_rate=44100):
    """
    Generate an upbeat, optimistic instrumental campaign soundtrack (.wav)
    inspired by Colombian/Tolimense rhythmic acoustic progression (C - G - Am - F).
    """
    num_samples = int(duration_sec * sample_rate)
    # Chord progression frequencies (C major, G major, A minor, F major)
    chords = [
        [261.63, 329.63, 392.00, 523.25],  # C
        [196.00, 246.94, 293.66, 392.00],  # G
        [220.00, 261.63, 329.63, 440.00],  # Am
        [174.61, 220.00, 261.63, 349.23],  # F
    ]
    bpm = 120.0
    beat_dur = 60.0 / bpm

    with wave.open(wav_path, "w") as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)

        frames = bytearray()
        for i in range(num_samples):
            t = i / sample_rate
            beat_idx = int(t / beat_dur)
            chord = chords[(beat_idx // 2) % len(chords)]

            # Plucked warm harmonic chord
            beat_phase = (t % (beat_dur / 2)) / (beat_dur / 2)
            env = math.exp(-3.5 * beat_phase)

            val = 0.0
            for idx, freq in enumerate(chord):
                # Add slight arpeggio offset
                arp_t = max(0.0, t - idx * 0.03)
                val += 0.18 * env * math.sin(2.0 * math.pi * freq * arp_t)
                val += 0.06 * env * math.sin(2.0 * math.pi * (freq * 2.0) * arp_t)

            # Soft bass drum pulse on every beat
            kick_phase = (t % beat_dur) / beat_dur
            if kick_phase < 0.18:
                kick_env = math.exp(-18.0 * kick_phase)
                kick_freq = 110.0 * math.exp(-12.0 * kick_phase) + 45.0
                val += 0.32 * kick_env * math.sin(2.0 * math.pi * kick_freq * t)

            # Fade in and fade out
            if t < 0.4:
                val *= (t / 0.4)
            elif t > duration_sec - 0.8:
                val *= max(0.0, (duration_sec - t) / 0.8)

            val = max(-0.95, min(0.95, val))
            sample_int = int(val * 32767)
            frames.extend(struct.pack("<h", sample_int))

        wav_file.writeframes(frames)


def prepare_horse_rgba():
    """Extract the red Liberal horseman from caballo-liberal.jpg with transparent background and wave-ready quality."""
    img = Image.open(PATH_CABALLO).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # Remove black background, keep bright crimson red silhouette
            if r < 60 and g < 50 and b < 50:
                pixels[x, y] = (0, 0, 0, 0)
            else:
                # Boost red vibrancy and smooth alpha edge
                alpha = min(255, int((r - max(g, b)) * 1.8))
                if alpha < 35:
                    pixels[x, y] = (0, 0, 0, 0)
                else:
                    pixels[x, y] = (230, 25, 35, alpha)
    return img


def warp_horse_flag(horse_rgba, t):
    """
    Animate the horseman so the flag waves dynamically in the wind (upper half)
    and the horse has a natural galloping motion!
    """
    w, h = horse_rgba.size
    out = Image.new("RGBA", (w + 40, h + 40), (0, 0, 0, 0))
    # Strip-based horizontal & vertical wave deformation for smooth flag waving
    strip_h = 4
    for y in range(0, h, strip_h):
        # Upper portion (y < h * 0.55) is the waving flag and rider hat
        norm_y = 1.0 - (y / float(h))
        wave_amp = 14.0 * (norm_y ** 1.6)
        dx = int(wave_amp * math.sin(t * 7.5 - y * 0.035))
        strip = horse_rgba.crop((0, y, w, min(h, y + strip_h)))
        out.paste(strip, (20 + dx, 20 + y), strip)

    # Slight gallop tilt
    angle = 2.8 * math.sin(t * 5.0)
    out = out.rotate(angle, resample=Image.BICUBIC, expand=False)
    return out


def draw_tricolor_bar(draw, x, y, w, h):
    """Draw the Ibagué flag tricolor bar (Yellow, Green, Red)."""
    w3 = w // 3
    draw.rectangle([x, y, x + w3, y + h], fill=COL_YELLOW_BRIGHT)
    draw.rectangle([x + w3, y, x + 2 * w3, y + h], fill=COL_GREEN)
    draw.rectangle([x + 2 * w3, y, x + w, y + h], fill=COL_RED)


def draw_rounded_box(base_img, box, radius, fill_rgba, outline_rgba=None, width=2):
    overlay = Image.new("RGBA", base_img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.rounded_rectangle(box, radius=radius, fill=fill_rgba, outline=outline_rgba, width=width)
    base_img.alpha_composite(overlay)


def ease_out_back(x):
    c1 = 1.70158
    c3 = c1 + 1
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)


def ease_out_cubic(x):
    return 1 - pow(1 - x, 3)


def render_video_1_identidad(horse_rgba, logo_img, banner_img, ffmpeg_bin):
    """
    VIDEO 1 (9:16 - 720x1280 HD vertical for fast rendering & crisp TikTok/Reels quality, 12 seconds @ 24fps)
    Act 1 (0-3.8s): Animated Liberal Horseman waving the flag + "PARTIDO LIBERAL COLOMBIANO"
    Act 2 (3.8-8.0s): "IBAGUÉ MERECE SONAR MÁS FUERTE" banner + animated soundwave equalizer
    Act 3 (8.0-12.0s): "JOHN POLO AL CONCEJO DE IBAGUÉ 2027" + 6 key proposals + Call to Action
    """
    W, H = 720, 1280
    FPS = 24
    DUR = 12.0
    total_frames = int(FPS * DUR)

    f_title = get_font(44, True)
    f_big = get_font(54, True)
    f_sub = get_font(26, True)
    f_pill = get_font(24, True)
    f_small = get_font(22, False)

    # Pre-resize logo
    logo_sm = logo_img.resize((130, 130), Image.LANCZOS)
    logo_lg = logo_img.resize((210, 210), Image.LANCZOS)

    # Clear old frames
    for f in os.listdir(TEMP_DIR):
        if f.endswith(".jpg"):
            os.remove(os.path.join(TEMP_DIR, f))

    print("Rendering Video 1 (Identidad: Caballo Liberal + Ibagué Merece Sonar Más Fuerte + John Polo 2027)...")
    for idx in range(total_frames):
        t = idx / float(FPS)
        canvas = Image.new("RGBA", (W, H), (11, 15, 25, 255))
        draw = ImageDraw.Draw(canvas)

        # Animated background gradient bands
        for by in range(0, H, 16):
            ratio = by / float(H)
            r = int(20 + 45 * math.sin(ratio * 3.14 + t * 0.8))
            g = int(12 + 10 * ratio)
            b = int(28 + 20 * (1 - ratio))
            draw.rectangle([0, by, W, by + 16], fill=(max(10, r), max(10, g), max(15, b), 255))

        # Top & Bottom Tricolor Flag Bars
        draw_tricolor_bar(draw, 0, 0, W, 16)
        draw_tricolor_bar(draw, 0, H - 16, W, 16)

        # Floating golden/red particles
        for p in range(18):
            px = int((p * 137 + t * 55 * (1 + (p % 3) * 0.3)) % W)
            py = int((p * 251 - t * 90 * (0.8 + (p % 4) * 0.25)) % H)
            pr = 3 + (p % 5)
            p_col = (255, 214, 0, 110) if p % 2 == 0 else (239, 68, 68, 110)
            draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=p_col)

        # =====================================================================
        # ACT 1: 0.0s to 3.8s -> EL CABALLO DEL PARTIDO LIBERAL COBRA VIDA
        # =====================================================================
        if t < 3.8:
            prog = min(1.0, t / 0.7)
            eased = ease_out_back(prog)

            # Pulsing red/gold aura behind horse
            aura_r = int(230 + 25 * math.sin(t * 6.0))
            draw_rounded_box(
                canvas,
                [W // 2 - aura_r, 380 - aura_r, W // 2 + aura_r, 380 + aura_r],
                radius=aura_r,
                fill_rgba=(211, 47, 47, 55),
                outline_rgba=(251, 192, 45, 120),
                width=3
            )

            # Animated waving horse
            warped = warp_horse_flag(horse_rgba, t)
            target_w = int(340 * eased)
            target_h = int(530 * eased)
            if target_w > 10 and target_h > 10:
                horse_frame = warped.resize((target_w, target_h), Image.LANCZOS)
                hx = (W - target_w) // 2
                hy = int(170 + 10 * math.sin(t * 5.0))
                canvas.alpha_composite(horse_frame, (hx, hy))

            # Top badge
            draw_rounded_box(canvas, [90, 55, W - 90, 120], 30, (211, 47, 47, 235), (255, 214, 0, 255), 3)
            draw.text((W // 2, 87), "PARTIDO LIBERAL COLOMBIANO", font=f_pill, fill=COL_WHITE, anchor="mm")

            # Bottom headline entering
            text_prog = min(1.0, max(0.0, (t - 0.35) / 0.6))
            ty = int(840 - 40 * ease_out_cubic(text_prog))
            draw_rounded_box(canvas, [45, ty - 55, W - 45, ty + 145], 24, (15, 23, 42, 230), (211, 47, 47, 200), 3)
            draw.text((W // 2, ty), "¡LA FUERZA QUE MUEVE", font=f_title, fill=COL_WHITE, anchor="mm")
            draw.text((W // 2, ty + 55), "A IBAGUÉ!", font=f_big, fill=COL_YELLOW_BRIGHT, anchor="mm")
            draw.text((W // 2, ty + 110), "Renovación • Juventud • Justicia Social", font=f_small, fill=(226, 232, 240), anchor="mm")

            # Logo JP at bottom
            canvas.alpha_composite(logo_sm, ((W - 130) // 2, 1040))
            draw.text((W // 2, 1205), "JOHN POLO • CONCEJO DE IBAGUÉ 2027", font=f_pill, fill=COL_YELLOW_BRIGHT, anchor="mm")

        # =====================================================================
        # ACT 2: 3.8s to 7.8s -> IBAGUÉ MERECE SONAR MÁS FUERTE + ECUALIZADOR
        # =====================================================================
        elif t < 7.8:
            local_t = t - 3.8
            prog = min(1.0, local_t / 0.65)
            eased = ease_out_back(prog)

            # Top header with mini animated horse + logo
            canvas.alpha_composite(logo_sm, (45, 45))
            mini_horse = warp_horse_flag(horse_rgba, t).resize((85, 130), Image.LANCZOS)
            canvas.alpha_composite(mini_horse, (W - 130, 45))
            draw.text((W // 2, 95), "JOHN POLO", font=f_title, fill=COL_WHITE, anchor="mm")
            draw.text((W // 2, 140), "CONCEJO DE IBAGUÉ 2027", font=f_pill, fill=COL_YELLOW_BRIGHT, anchor="mm")

            # Official Banner "IBAGUÉ MERECE SONAR MÁS FUERTE" zooming in
            bw = int(660 * max(0.2, eased))
            bh = int(bw * (banner_img.height / float(banner_img.width)))
            if bw > 20 and bh > 20:
                b_resized = banner_img.resize((bw, bh), Image.LANCZOS).convert("RGBA")
                bx = (W - bw) // 2
                by = 225
                # Glowing frame around banner
                draw_rounded_box(
                    canvas,
                    [bx - 10, by - 10, bx + bw + 10, by + bh + 10],
                    22,
                    (255, 214, 0, 220),
                    (211, 47, 47, 255),
                    4
                )
                canvas.alpha_composite(b_resized, (bx, by))

            # Animated Musical Soundwave Equalizer ("Sonar Más Fuerte")
            eq_y = 780
            num_bars = 24
            bar_w = 18
            gap = 8
            total_eq_w = num_bars * (bar_w + gap)
            start_x = (W - total_eq_w) // 2
            for b_i in range(num_bars):
                bh_eq = int(25 + 65 * abs(math.sin(t * 9.0 + b_i * 0.45) * math.cos(t * 4.0 - b_i * 0.2)))
                bx_eq = start_x + b_i * (bar_w + gap)
                b_col = COL_YELLOW_BRIGHT if b_i % 3 == 0 else (COL_GREEN if b_i % 3 == 1 else COL_RED)
                draw.rounded_rectangle([bx_eq, eq_y - bh_eq, bx_eq + bar_w, eq_y + bh_eq], radius=6, fill=b_col)

            # Callout Box below equalizer
            draw_rounded_box(canvas, [40, 895, W - 40, 1140], 26, (211, 47, 47, 235), (255, 214, 0, 255), 3)
            draw.text((W // 2, 950), "¡IBAGUÉ TIENE CON QUÉ!", font=f_title, fill=COL_YELLOW_BRIGHT, anchor="mm")
            draw.text((W // 2, 1015), "Una ciudad con voz, oportunidades", font=f_sub, fill=COL_WHITE, anchor="mm")
            draw.text((W // 2, 1055), "y futuro para nuestra gente.", font=f_sub, fill=COL_WHITE, anchor="mm")
            draw.text((W // 2, 1105), "#EsHoraDeCreer", font=f_pill, fill=COL_YELLOW_BRIGHT, anchor="mm")

            draw.text((W // 2, 1210), "www.johnpolo2027.com", font=f_sub, fill=COL_WHITE, anchor="mm")

        # =====================================================================
        # ACT 3: 7.8s to 12.0s -> PROPUESTAS & CIERRE JOHN POLO CONCEJO 2027
        # =====================================================================
        else:
            local_t = t - 7.8
            prog = min(1.0, local_t / 0.5)

            # Top Logo JP + Horseman side by side
            canvas.alpha_composite(logo_lg, (W // 2 - 220, 45))
            horse_med = warp_horse_flag(horse_rgba, t).resize((140, 215), Image.LANCZOS)
            canvas.alpha_composite(horse_med, (W // 2 + 40, 40))

            draw.text((W // 2, 295), "JOHN POLO", font=f_big, fill=COL_WHITE, anchor="mm")
            draw_rounded_box(canvas, [110, 335, W - 110, 390], 20, (211, 47, 47, 255), (255, 214, 0, 255), 2)
            draw.text((W // 2, 362), "AL CONCEJO DE IBAGUÉ 2027", font=f_sub, fill=COL_YELLOW_BRIGHT, anchor="mm")

            # 6 Proposals sliding in one by one
            proposals = [
                ("1. Destino Mundo y Sabor Local", COL_RED),
                ("2. Más Industria, Más Inversión", COL_GREEN),
                ("3. Cultura que Produce Todo el Año", (180, 115, 0)),
                ("4. Primer Empleo para Jóvenes", COL_RED),
                ("5. Control Férreo al Agua y Servicios", COL_GREEN),
                ("6. Plazas Vivas y Seguridad Alimentaria", (180, 115, 0)),
            ]

            for p_idx, (p_text, p_col) in enumerate(proposals):
                appear_t = local_t - p_idx * 0.22
                if appear_t > 0:
                    p_prog = min(1.0, appear_t / 0.35)
                    slide_x = int((1.0 - ease_out_cubic(p_prog)) * 350)
                    py = 425 + p_idx * 98
                    draw_rounded_box(
                        canvas,
                        [50 + slide_x, py, W - 50 + slide_x, py + 82],
                        18,
                        (255, 255, 255, 245),
                        p_col + (255,),
                        3
                    )
                    # Left color badge
                    draw.rounded_rectangle([50 + slide_x, py, 74 + slide_x, py + 82], radius=12, fill=p_col)
                    draw.text((98 + slide_x, py + 41), p_text, font=f_sub, fill=(15, 23, 42), anchor="lm")

            # Bottom Call to Action Banner
            draw_rounded_box(canvas, [40, 1045, W - 40, 1215], 24, (251, 192, 45, 255), (211, 47, 47, 255), 4)
            draw.text((W // 2, 1090), "¡IBAGUÉ MERECE SONAR MÁS FUERTE!", font=f_sub, fill=(15, 23, 42), anchor="mm")
            draw.text((W // 2, 1135), "Por una Ibagué que produce, recibe y crece", font=f_small, fill=(183, 28, 28), anchor="mm")
            draw.text((W // 2, 1180), "Súmate en: www.johnpolo2027.com", font=f_pill, fill=(15, 23, 42), anchor="mm")

        # Save frame
        frame_rgb = canvas.convert("RGB")
        frame_rgb.save(os.path.join(TEMP_DIR, f"frame_{idx:04d}.jpg"), quality=92)

    # Generate Audio & Encode MP4
    wav_path = os.path.join(TEMP_DIR, "audio_v1.wav")
    generate_audio_track(wav_path, duration_sec=DUR)
    out_mp4 = os.path.join(OUT_DIR, "video_01_identidad_caballo_sonar_fuerte_9x16.mp4")

    cmd = [
        ffmpeg_bin, "-y",
        "-framerate", str(FPS),
        "-i", os.path.join(TEMP_DIR, "frame_%04d.jpg"),
        "-i", wav_path,
        "-c:v", "libx264", "-preset", "fast", "-crf", "21",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k",
        "-shortest",
        out_mp4
    ]
    subprocess.run(cmd, check=True)
    print("Saved:", out_mp4)


def render_video_2_poster_john_polo(horse_rgba, logo_img, poster_hero_img, banner_img, ffmpeg_bin):
    """
    VIDEO 2 (9:16 - 720x1280 HD vertical, 12 seconds @ 24fps)
    Uses the EXACT real poster of John Polo shared by the user (candidato-hero.jpg),
    animating it with cinematic 2.5D Ken Burns, spotlighting each of his proposals,
    combining with the animated Liberal Horseman and the "Ibagué merece sonar más fuerte" identity!
    """
    W, H = 720, 1280
    FPS = 24
    DUR = 12.0
    total_frames = int(FPS * DUR)

    f_title = get_font(40, True)
    f_big = get_font(50, True)
    f_sub = get_font(25, True)
    f_pill = get_font(22, True)

    logo_sm = logo_img.resize((115, 115), Image.LANCZOS)

    for f in os.listdir(TEMP_DIR):
        if f.endswith(".jpg"):
            os.remove(os.path.join(TEMP_DIR, f))

    print("Rendering Video 2 (John Polo Imagen Real del Póster + Caballo Animado + Propuestas)...")
    for idx in range(total_frames):
        t = idx / float(FPS)
        canvas = Image.new("RGBA", (W, H), (15, 23, 42, 255))
        draw = ImageDraw.Draw(canvas)

        # Dynamic Ken Burns zoom & pan on the REAL Poster of John Polo
        zoom = 1.0 + 0.06 * math.sin(t * 0.45)
        pw = int(W * zoom)
        ph = int(pw * (poster_hero_img.height / float(poster_hero_img.width)))
        poster_resized = poster_hero_img.resize((pw, ph), Image.LANCZOS).convert("RGBA")

        # Center poster vertically in the main viewport
        px = -(pw - W) // 2
        py = 135 - int(15 * math.sin(t * 0.6))
        canvas.alpha_composite(poster_resized, (px, py))

        # Top header bar with Ibagué flag gradient + animated horse + JP logo
        draw.rectangle([0, 0, W, 145], fill=(11, 15, 25, 240))
        draw_tricolor_bar(draw, 0, 0, W, 14)
        canvas.alpha_composite(logo_sm, (24, 20))

        # Animated Waving Horseman in top right
        waving_horse = warp_horse_flag(horse_rgba, t).resize((92, 138), Image.LANCZOS)
        canvas.alpha_composite(waving_horse, (W - 115, 10))

        draw.text((W // 2, 58), "JOHN POLO AL CONCEJO", font=f_sub, fill=COL_WHITE, anchor="mm")
        draw_rounded_box(canvas, [185, 84, W - 185, 128], 16, (211, 47, 47, 255), (255, 214, 0, 255), 2)
        draw.text((W // 2, 106), "PARTIDO LIBERAL • 2027", font=f_pill, fill=COL_YELLOW_BRIGHT, anchor="mm")

        # Animated Golden Spotlight Badge highlighting proposals sequentially over time
        proposals_highlight = [
            "🎵 Destino Mundo y Sabor Local",
            "🏭 Más Industria, Más Inversión",
            "🎭 Cultura que Produce Todo el Año",
            "💼 Primer Empleo para Jóvenes",
            "💧 Control Férreo al Agua y Servicios",
            "🛒 Plazas Vivas y Seguridad Alimentaria",
        ]
        active_idx = int((t / DUR) * len(proposals_highlight)) % len(proposals_highlight)
        active_text = proposals_highlight[active_idx]

        # Bottom animated lower-third broadcast overlay
        draw.rectangle([0, H - 245, W, H], fill=(11, 15, 25, 238))
        draw_tricolor_bar(draw, 0, H - 245, W, 10)

        # Animated pulse pill showing the active proposal
        pulse_scale = int(6 * math.sin(t * 8.0))
        draw_rounded_box(
            canvas,
            [35 - pulse_scale, H - 215, W - 35 + pulse_scale, H - 140],
            22,
            (211, 47, 47, 250),
            (255, 214, 0, 255),
            3
        )
        draw.text((W // 2, H - 177), active_text, font=f_sub, fill=COL_WHITE, anchor="mm")

        # Slogan and URL in lower third
        draw.text((W // 2, H - 98), "«Por una Ibagué que produce, recibe y crece»", font=f_pill, fill=COL_YELLOW_BRIGHT, anchor="mm")
        draw.text((W // 2, H - 52), "Súmate hoy en: www.johnpolo2027.com", font=f_sub, fill=COL_WHITE, anchor="mm")
        draw_tricolor_bar(draw, 0, H - 14, W, 14)

        frame_rgb = canvas.convert("RGB")
        frame_rgb.save(os.path.join(TEMP_DIR, f"frame_{idx:04d}.jpg"), quality=92)

    wav_path = os.path.join(TEMP_DIR, "audio_v2.wav")
    generate_audio_track(wav_path, duration_sec=DUR)
    out_mp4 = os.path.join(OUT_DIR, "video_02_john_polo_poster_oficial_animado_9x16.mp4")

    cmd = [
        ffmpeg_bin, "-y",
        "-framerate", str(FPS),
        "-i", os.path.join(TEMP_DIR, "frame_%04d.jpg"),
        "-i", wav_path,
        "-c:v", "libx264", "-preset", "fast", "-crf", "21",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k",
        "-shortest",
        out_mp4
    ]
    subprocess.run(cmd, check=True)
    print("Saved:", out_mp4)


def render_video_3_cuadrado_feed(horse_rgba, logo_img, poster_hero_img, banner_img, ffmpeg_bin):
    """
    VIDEO 3 (1:1 Square - 720x720 for Instagram Feed, Facebook Feed & WhatsApp, 10 seconds @ 24fps)
    Combines the animated Liberal Horseman, the "Ibagué merece sonar más fuerte" banner,
    and John Polo's official poster in a split/transition dynamic layout.
    """
    W, H = 720, 720
    FPS = 24
    DUR = 10.0
    total_frames = int(FPS * DUR)

    f_title = get_font(36, True)
    f_sub = get_font(22, True)
    f_pill = get_font(20, True)

    logo_sm = logo_img.resize((95, 95), Image.LANCZOS)

    for f in os.listdir(TEMP_DIR):
        if f.endswith(".jpg"):
            os.remove(os.path.join(TEMP_DIR, f))

    print("Rendering Video 3 (Formato Cuadrado 1:1 para Feed de Instagram y Facebook)...")
    for idx in range(total_frames):
        t = idx / float(FPS)
        canvas = Image.new("RGBA", (W, H), (15, 23, 42, 255))
        draw = ImageDraw.Draw(canvas)

        if t < 4.5:
            # First half: Banner "Ibagué Merece Sonar Más Fuerte" + Waving Liberal Horseman
            b_res = banner_img.resize((W, int(W * banner_img.height / banner_img.width)), Image.LANCZOS).convert("RGBA")
            canvas.alpha_composite(b_res, (0, 70))

            # Dark overlay top and bottom
            draw.rectangle([0, 0, W, 80], fill=(11, 15, 25, 235))
            draw.rectangle([0, H - 155, W, H], fill=(11, 15, 25, 240))
            draw_tricolor_bar(draw, 0, 0, W, 10)
            draw_tricolor_bar(draw, 0, H - 10, W, 10)

            canvas.alpha_composite(logo_sm, (20, 12))
            draw.text((W // 2 + 20, 42), "JOHN POLO • CONCEJO 2027", font=f_sub, fill=COL_YELLOW_BRIGHT, anchor="mm")

            # Animated horseman bottom left
            wh = warp_horse_flag(horse_rgba, t).resize((115, 175), Image.LANCZOS)
            canvas.alpha_composite(wh, (25, H - 185))

            draw.text((W // 2 + 45, H - 105), "PARTIDO LIBERAL COLOMBIANO", font=f_sub, fill=COL_WHITE, anchor="mm")
            draw.text((W // 2 + 45, H - 65), "¡Una ciudad con voz, oportunidades y futuro!", font=f_pill, fill=COL_YELLOW_BRIGHT, anchor="mm")
            draw.text((W // 2 + 45, H - 30), "www.johnpolo2027.com", font=f_pill, fill=(203, 213, 225), anchor="mm")
        else:
            # Second half: Split screen with John Polo Official Poster on Left + Animated Proposals & Horse on Right
            p_h = H - 20
            p_w = int(p_h * (poster_hero_img.width / float(poster_hero_img.height)))
            p_res = poster_hero_img.resize((p_w, p_h), Image.LANCZOS).convert("RGBA")
            canvas.alpha_composite(p_res, (10, 10))

            # Right panel
            rx = p_w + 20
            rw = W - rx - 10
            draw_rounded_box(canvas, [rx, 15, W - 12, H - 15], 20, (15, 23, 42, 245), (211, 47, 47, 255), 3)

            rcx = rx + rw // 2
            wh = warp_horse_flag(horse_rgba, t).resize((90, 138), Image.LANCZOS)
            canvas.alpha_composite(wh, (rcx - 95, 25))
            canvas.alpha_composite(logo_sm, (rcx + 5, 45))

            draw.text((rcx, 185), "JOHN POLO", font=f_title, fill=COL_WHITE, anchor="mm")
            draw.text((rcx, 220), "CONCEJO 2027", font=f_pill, fill=COL_YELLOW_BRIGHT, anchor="mm")

            items = [
                "✓ Destino Mundo y Sabor",
                "✓ Más Industria e Inversión",
                "✓ Cultura que Produce",
                "✓ Primer Empleo Joven",
                "✓ Control al Agua e IBAL",
                "✓ Plazas Vivas",
            ]
            for i_idx, item_txt in enumerate(items):
                iy = 265 + i_idx * 56
                highlight = (int(t * 2.5) % len(items)) == i_idx
                bg_c = (211, 47, 47, 255) if highlight else (30, 41, 59, 230)
                draw_rounded_box(canvas, [rx + 12, iy, W - 24, iy + 46], 12, bg_c, (251, 192, 45, 180), 1)
                draw.text((rcx, iy + 23), item_txt, font=get_font(16, True), fill=COL_WHITE, anchor="mm")

            draw.text((rcx, H - 45), "www.johnpolo2027.com", font=get_font(17, True), fill=COL_YELLOW_BRIGHT, anchor="mm")
            draw_tricolor_bar(draw, 0, 0, W, 8)
            draw_tricolor_bar(draw, 0, H - 8, W, 8)

        frame_rgb = canvas.convert("RGB")
        frame_rgb.save(os.path.join(TEMP_DIR, f"frame_{idx:04d}.jpg"), quality=92)

    wav_path = os.path.join(TEMP_DIR, "audio_v3.wav")
    generate_audio_track(wav_path, duration_sec=DUR)
    out_mp4 = os.path.join(OUT_DIR, "video_03_spot_campana_feed_1x1.mp4")

    cmd = [
        ffmpeg_bin, "-y",
        "-framerate", str(FPS),
        "-i", os.path.join(TEMP_DIR, "frame_%04d.jpg"),
        "-i", wav_path,
        "-c:v", "libx264", "-preset", "fast", "-crf", "21",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "128k",
        "-shortest",
        out_mp4
    ]
    subprocess.run(cmd, check=True)
    print("Saved:", out_mp4)


def main():
    # Find ffmpeg binary from node_modules/ffmpeg-static
    ffmpeg_bin = os.path.join(ROOT_DIR, "node_modules", "ffmpeg-static", "ffmpeg.exe")
    if not os.path.exists(ffmpeg_bin):
        ffmpeg_bin = "ffmpeg"

    print("Using ffmpeg:", ffmpeg_bin)
    horse_rgba = prepare_horse_rgba()
    logo_img = Image.open(PATH_LOGO).convert("RGBA")
    banner_img = Image.open(PATH_BANNER).convert("RGBA")
    poster_hero_img = Image.open(PATH_POSTER_HERO).convert("RGBA")

    render_video_1_identidad(horse_rgba, logo_img, banner_img, ffmpeg_bin)
    render_video_2_poster_john_polo(horse_rgba, logo_img, poster_hero_img, banner_img, ffmpeg_bin)
    render_video_3_cuadrado_feed(horse_rgba, logo_img, poster_hero_img, banner_img, ffmpeg_bin)

    # Cleanup temp frames
    for f in os.listdir(TEMP_DIR):
        try:
            os.remove(os.path.join(TEMP_DIR, f))
        except Exception:
            pass
    try:
        os.rmdir(TEMP_DIR)
    except Exception:
        pass
    print("ALL 3 VIDEOS GENERATED SUCCESSFULLY!")


if __name__ == "__main__":
    main()

