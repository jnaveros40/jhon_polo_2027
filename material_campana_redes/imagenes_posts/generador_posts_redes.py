import os
import sys
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

POSTS_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(POSTS_DIR, "..", ".."))
IMG_DIR = os.path.join(ROOT_DIR, "public", "images")
CARICATURA_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "jhon_polo")
GIF_SCRIPT_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "gifs_animados")
VID_SCRIPT_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "videos_publicitarios")

sys.path.insert(0, GIF_SCRIPT_DIR)
sys.path.insert(0, VID_SCRIPT_DIR)
import generador_gifs_bandera as horse_engine
from generador_tanda3_manual_voz_voto import extract_caricature_rgba

# Paleta Oficial del Manual de Voz y Voto
COL_NAVY = (15, 45, 82)
COL_NAVY_DARK = (9, 24, 46)
COL_RED = (178, 24, 32)
COL_RED_BRIGHT = (220, 38, 48)
COL_GREEN = (16, 108, 66)
COL_GREEN_LIGHT = (52, 211, 153)
COL_YELLOW = (234, 179, 8)
COL_YELLOW_BRIGHT = (255, 214, 10)
COL_WHITE = (255, 255, 255)


def get_font(size, bold=True):
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/impact.ttf",
    ] if bold else [
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()


def draw_tricolor_bar(draw, W, y, h):
    w3 = W // 3
    draw.rectangle([0, y, w3, y + h], fill=COL_YELLOW_BRIGHT)
    draw.rectangle([w3, y, 2 * w3, y + h], fill=COL_GREEN)
    draw.rectangle([2 * w3, y, W, y + h], fill=COL_RED_BRIGHT)


def draw_rounded_box(base, box, radius, fill_rgba, outline_rgba=None, width=2):
    ov = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    d.rounded_rectangle(box, radius=radius, fill=fill_rgba, outline=outline_rgba, width=width)
    base.alpha_composite(ov)


def draw_text_stroke(draw, x, y, text, font, fill, stroke=(0, 0, 0, 230), sw=3, anchor="mm"):
    draw.text((x + 2, y + 3), text, font=font, fill=(0, 0, 0, 180), anchor=anchor)
    draw.text((x, y), text, font=font, fill=fill, anchor=anchor, stroke_width=sw, stroke_fill=stroke)


def draw_sunburst(canvas, cx, cy, base_col=COL_NAVY_DARK, ray_rgba=(178, 24, 32, 42)):
    W, H = canvas.size
    ov = Image.new("RGBA", (W, H), base_col + (255,))
    d = ImageDraw.Draw(ov)
    num_rays = 18
    rad = max(W, H) * 1.45
    for i in range(num_rays):
        a1 = i * 2.0 * math.pi / num_rays
        a2 = a1 + (math.pi / num_rays) * 0.55
        col = ray_rgba if i % 2 == 0 else (255, 214, 10, 22)
        d.polygon([(cx, cy), (cx + rad * math.cos(a1), cy + rad * math.sin(a1)), (cx + rad * math.cos(a2), cy + rad * math.sin(a2))], fill=col)
    canvas.alpha_composite(ov)


def draw_header_institucional(canvas, logo_jp, sello_img, badge_text):
    W, _ = canvas.size
    draw = ImageDraw.Draw(canvas)
    draw_tricolor_bar(draw, W, 0, 16)
    draw_rounded_box(canvas, [28, 30, W - 28, 152], 24, (10, 26, 52, 242), (255, 214, 10, 230), 3)

    lp = logo_jp.resize((96, 96), Image.LANCZOS)
    canvas.alpha_composite(lp, (44, 43))

    sp = sello_img.resize((96, 96), Image.LANCZOS)
    canvas.alpha_composite(sp, (148, 43))

    # Partido Liberal Badge on right
    draw_rounded_box(canvas, [W - 144, 43, W - 48, 139], 20, (211, 47, 47, 255), (255, 214, 10, 255), 3)
    draw.text((W - 96, 80), "L", font=get_font(54, True), fill=COL_WHITE, anchor="mm")
    draw.text((W - 96, 122), "LIBERAL", font=get_font(14, True), fill=COL_YELLOW_BRIGHT, anchor="mm")

    draw_text_stroke(draw, (W // 2) + 45, 72, "JOHN POLO • CONCEJO 2027–2030", get_font(27, True), COL_WHITE)
    draw_rounded_box(canvas, [265, 98, W - 165, 138], 14, (234, 179, 8, 245))
    draw.text(((265 + W - 165) // 2, 118), badge_text, font=get_font(20, True), fill=(15, 23, 42), anchor="mm")


def draw_footer_institucional(canvas):
    W, H = canvas.size
    draw = ImageDraw.Draw(canvas)
    draw_rounded_box(canvas, [28, H - 108, W - 28, H - 26], 20, (178, 24, 32, 248), (255, 214, 10, 255), 3)
    draw_text_stroke(draw, W // 2, H - 78, "♪ ¡IBAGUÉ MERECE SONAR MÁS FUERTE! ♪", get_font(28, True), COL_YELLOW_BRIGHT)
    draw.text((W // 2, H - 44), "Es hora de creer • «El Gerente Campesino» • Partido Liberal Colombiano", font=get_font(18, True), fill=COL_WHITE, anchor="mm")
    draw_tricolor_bar(draw, W, H - 16, 16)


def build_sello_and_horse():
    body_img, _, flag_tri_img, scale = horse_engine.render_base_layers(scale=1.35)
    torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img = horse_engine.split_body_into_skeletal_parts(body_img, scale)
    g_tri = horse_engine.compose_galloping_horse_frame(
        torso_img, tail_img, leg_hind_img, leg_mid_img, leg_front_img,
        flag_tri_img, scale, 0.8
    )
    sello = Image.new("RGBA", (240, 240), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sello)
    sd.ellipse([4, 4, 236, 236], fill=(255, 255, 255, 255), outline=COL_RED + (255,), width=6)
    sd.ellipse([11, 11, 229, 229], outline=COL_GREEN + (255,), width=4)
    sd.ellipse([16, 16, 224, 224], outline=COL_YELLOW_BRIGHT + (255,), width=4)
    h_in = g_tri.resize((125, 200), Image.LANCZOS)
    sello.alpha_composite(h_in, ((240 - 125) // 2, 18))
    return sello, g_tri


def create_post_card(
    filename,
    badge_text,
    title_top,
    title_highlight,
    subtitle,
    bullets,
    pose_rgba,
    logo_jp,
    sello_img,
    horse_img,
    pose_on_right=True,
    accent_color=COL_GREEN,
):
    W, H = 1080, 1080
    canvas = Image.new("RGBA", (W, H), COL_NAVY_DARK + (255,))
    draw_sunburst(canvas, W // 2, 520, base_col=COL_NAVY_DARK, ray_rgba=accent_color + (48,))
    draw_header_institucional(canvas, logo_jp, sello_img, badge_text)
    draw = ImageDraw.Draw(canvas)

    # Headline Banner
    draw_rounded_box(canvas, [28, 168, W - 28, 325], 24, (15, 36, 68, 235), accent_color + (240,), 3)
    draw_text_stroke(draw, W // 2, 204, title_top, get_font(31, True), COL_WHITE)
    draw_text_stroke(draw, W // 2, 254, title_highlight, get_font(44, True), COL_YELLOW_BRIGHT)
    draw.text((W // 2, 300), subtitle, font=get_font(21, True), fill=(210, 230, 255), anchor="mm")

    # Left vs Right Layout for Character + Galloping Horse + Proposal Cards
    if pose_on_right:
        card_x1, card_x2 = 28, 635
        char_cx = 855
    else:
        card_x1, card_x2 = 445, W - 28
        char_cx = 225

    # Draw subtle galloping horse behind character
    hw = 270
    hh = int(hw * horse_img.height / float(horse_img.width))
    h_resized = horse_img.resize((hw, hh), Image.LANCZOS)
    hx = char_cx - hw // 2 + (-55 if pose_on_right else 55)
    canvas.alpha_composite(h_resized, (hx, 340))

    # Draw New John Polo Character with Official Sombrero Tolimense
    target_h = 625
    target_w = int(target_h * (pose_rgba.width / float(pose_rgba.height)))
    p_resized = pose_rgba.resize((target_w, target_h), Image.LANCZOS)
    canvas.alpha_composite(p_resized, (char_cx - target_w // 2, 338))

    # Draw Proposal Bullet Cards
    y_curr = 345
    card_h = 136
    for idx_b, (b_tag, b_title, b_desc) in enumerate(bullets):
        b_col = [COL_RED_BRIGHT, COL_GREEN, COL_YELLOW][idx_b % 3]
        draw_rounded_box(canvas, [card_x1, y_curr, card_x2, y_curr + card_h], 20, (12, 28, 54, 242), b_col + (240,), 3)
        # Tag pill
        draw_rounded_box(canvas, [card_x1 + 16, y_curr + 12, card_x1 + 245, y_curr + 42], 10, b_col + (255,))
        tag_txt_col = (15, 23, 42) if b_col == COL_YELLOW else COL_WHITE
        draw.text((card_x1 + 130, y_curr + 27), b_tag, font=get_font(16, True), fill=tag_txt_col, anchor="mm")
        # Title & description
        draw_text_stroke(draw, card_x1 + 20, y_curr + 66, b_title, get_font(23, True), COL_YELLOW_BRIGHT, sw=2, anchor="lm")
        draw.text((card_x1 + 20, y_curr + 104), b_desc, font=get_font(18, False), fill=(230, 240, 255), anchor="lm")
        y_curr += card_h + 15

    # Bottom Watermark Seal + Footer
    draw_footer_institucional(canvas)

    out_path = os.path.join(POSTS_DIR, filename)
    canvas.convert("RGB").save(out_path, "JPEG", quality=95)
    print("✓ Post generado:", out_path)
    return out_path


def create_vertical_story_card(filename, pose_front, pose_side, logo_jp, sello_img, horse_img):
    W, H = 1080, 1920
    canvas = Image.new("RGBA", (W, H), COL_NAVY_DARK + (255,))
    draw_sunburst(canvas, W // 2, 820, base_col=COL_NAVY_DARK, ray_rgba=(220, 38, 48, 52))
    draw_header_institucional(canvas, logo_jp, sello_img, "HISTORIA OFICIAL • 7 EJES POR IBAGUÉ")
    draw = ImageDraw.Draw(canvas)

    draw_rounded_box(canvas, [36, 175, W - 36, 365], 28, (15, 36, 68, 240), (255, 214, 10, 240), 4)
    draw_text_stroke(draw, W // 2, 222, "«EL GERENTE CAMPESINO» AL CONCEJO", get_font(34, True), COL_WHITE)
    draw_text_stroke(draw, W // 2, 282, "¡IBAGUÉ TIENE CON QUÉ!", get_font(56, True), COL_YELLOW_BRIGHT)
    draw.text((W // 2, 336), "13 Comunas • 17 Corregimientos • 144 Veredas • Partido Liberal", font=get_font(23, True), fill=COL_GREEN_LIGHT, anchor="mm")

    # Center Hero Composition: Galloping Horse + John Polo Sombrero Tolimense
    h_big = horse_img.resize((440, 690), Image.LANCZOS)
    canvas.alpha_composite(h_big, (45, 380))

    p_h = 760
    p_w = int(p_h * (pose_front.width / float(pose_front.height)))
    p_big = pose_front.resize((p_w, p_h), Image.LANCZOS)
    canvas.alpha_composite(p_big, (W - p_w - 35, 365))

    # 4 Key Pillars Box
    pillars = [
        ("1. CAMPO Y CALLE 19", "50 km/año vías con JAC + Central de Acopio Ex-Carrefour"),
        ("2. AGUA Y TELEMETRÍA IBAL", "30 km/año de tubería nueva y válvulas con telemetría 24/7"),
        ("3. MOVILIDAD Y 2 CABLES", "Caja única SETP, Cables Boquerón y Comuna 2 + Puente Mirolindo"),
        ("4. BLINDAJE FISCAL 80-10-10", "INFIBAGUÉ 75/25 Banca Juvenil y CERO alza a Predial o ICA"),
    ]
    y_p = 1135
    for idx_p, (pt, pd) in enumerate(pillars):
        col_b = [COL_GREEN, COL_RED_BRIGHT, COL_YELLOW, COL_GREEN][idx_p]
        draw_rounded_box(canvas, [40, y_p, W - 40, y_p + 142], 24, (12, 28, 54, 245), col_b + (245,), 3)
        draw_text_stroke(draw, 72, y_p + 48, pt, get_font(30, True), COL_YELLOW_BRIGHT, anchor="lm")
        draw.text((72, y_p + 100), pd, font=get_font(23, False), fill=COL_WHITE, anchor="lm")
        y_p += 158

    draw_footer_institucional(canvas)
    out_path = os.path.join(POSTS_DIR, filename)
    canvas.convert("RGB").save(out_path, "JPEG", quality=95)
    print("✓ Historia 9:16 generada:", out_path)
    return out_path


def main():
    logo_jp = Image.open(os.path.join(IMG_DIR, "logo-jp.png")).convert("RGBA")
    sello_img, horse_img = build_sello_and_horse()

    # Usar únicamente las 2 imágenes frontales aprobadas que quedaron en jhon_polo
    pose_front = extract_caricature_rgba(os.path.join(CARICATURA_DIR, "pose_01_frontal_principal.jpg"))
    pose_thumb = extract_caricature_rgba(os.path.join(CARICATURA_DIR, "pose_03_frontal_pulgar.jpg"))
    pose_side_l = pose_front
    pose_side_r = pose_thumb
    pose_back = pose_front

    # Also save transparent PNG cutout of the new character into public/images for web use
    pose_front.save(os.path.join(IMG_DIR, "john-polo-sombrero-tolimense.png"), "PNG")

    # POST 1: Lanzamiento Plataforma & El Gerente Campesino
    create_post_card(
        filename="post_01_lanzamiento_plataforma.jpg",
        badge_text="«EL GERENTE CAMPESINO» • PLAN 7 EJES",
        title_top="DEL CAMPO Y LAS COMUNAS AL CONCEJO:",
        title_highlight="GERENCIA, CARÁCTER Y RESULTADOS",
        subtitle="13 Comunas • 17 Corregimientos • 144 Veredas • Documento Maestro 2027–2030",
        bullets=[
            ("EJE 1 • AGRO Y VÍAS", "Acopio en Calle 19 + 50 km/año Vías", "Antiguo Carrefour con mayoristas con voz sin voto y convenios JAC."),
            ("EJE 2 • AGUA 24/7", "30 km/año Redes IBAL + Telemetría", "Recuperación de +$8.000M/año en agua potable y cero calles rotas."),
            ("EJE 4 Y 6 • FUTURO", "INFIBAGUÉ Banca Juvenil + 2 Cables", "Reingeniería 75/25 para empleo joven, SETP, Cable Aéreo y Mirolindo."),
        ],
        pose_rgba=pose_front,
        logo_jp=logo_jp,
        sello_img=sello_img,
        horse_img=horse_img,
        pose_on_right=True,
        accent_color=COL_RED_BRIGHT,
    )

    # POST 2: Control Firme al Agua e IBAL (Sin mención a valvuleros)
    create_post_card(
        filename="post_02_control_agua_ibal.jpg",
        badge_text="EJE 2 • AGUA CONTINUA Y TELEMETRÍA IBAL",
        title_top="¿TU BARRIO SIN AGUA Y LA FACTURA CARA?",
        title_highlight="¡30 KM/AÑO DE TUBERÍA Y TELEMETRÍA!",
        subtitle="El IBAL pierde ~1 millón de m³/mes ($32.000M/año) por redes obsoletas",
        bullets=[
            ("META VINCULANTE", "120 km de Red Nueva en 4 Años", "30 km anuales para frenar hundimientos viales y recuperar $8.000M/año."),
            ("TECNOLOGÍA 24/7", "Telemetría en Válvulas Matrices", "Sensores digitales de presión y caudal auditables en tiempo real."),
            ("ACUERDO MUNICIPAL", "Sincronía Hidráulica Obligatoria", "Prohibido pavimentar calles sin certificar antes la red subterránea."),
        ],
        pose_rgba=pose_side_l,
        logo_jp=logo_jp,
        sello_img=sello_img,
        horse_img=horse_img,
        pose_on_right=True,
        accent_color=COL_GREEN,
    )

    # POST 3: Campo, 144 Veredas, Calle 19, Plaza 28 Concordia y Cultura
    create_post_card(
        filename="post_03_cultura_festival_folclorico.jpg",
        badge_text="EJES 1 Y 5 • CAMPO, PLAZA 28 Y CULTURA",
        title_top="ORGULLO CAMPESINO Y COMIDA A PRECIO JUSTO:",
        title_highlight="144 VEREDAS Y ACOPIO EN CALLE 19",
        subtitle="Respaldo a 13.000 familias rurales, plazas dignas y cultura los 12 meses",
        bullets=[
            ("ANTIGUO CARREFOUR", "Central de Acopio y Frío Calle 19", "Descongestión de la Cra. 4ª y compra directa Ley 2046 a nuestras veredas."),
            ("MODELO CONCORDIA", "Nueva Plaza de la 28 Gastronómica", "Cocinas campesinas modernas en el 2º piso y turismo todo el año."),
            ("ECONOMÍA CIRCULAR", "Biofábrica en el Vivero Municipal", "15-20 ton/día de residuos orgánicos convertidos en abono para el campo."),
        ],
        pose_rgba=pose_thumb,
        logo_jp=logo_jp,
        sello_img=sello_img,
        horse_img=horse_img,
        pose_on_right=False,
        accent_color=COL_GREEN,
    )

    # POST 4: Movilidad Multimodal, SETP, 2 Cables Aéreos e INFIBAGUÉ Juvenil
    create_post_card(
        filename="post_04_respaldo_partido_liberal.jpg",
        badge_text="EJES 4 Y 6 • MOVILIDAD Y BANCA JUVENIL",
        title_top="SOLUCIONES REALES PARA +310.000 VEHÍCULOS:",
        title_highlight="SETP, 2 CABLES AÉREOS Y MIROLINDO",
        subtitle="Fuerza Liberal con rigor técnico para destrabar la movilidad y el empleo joven",
        bullets=[
            ("TRANSPORTE DIGNO", "Caja Única SETP + 2 Cables Aéreos", "Tarifa integrada para Sur-Occidente (Boquerón) y Comuna 2 (La Aurora)."),
            ("OBRAS VIALES", "Puente Mirolindo, Cll 103 y Cra 13", "Desembotellamiento hacia la Variante y cobro de cargas urbanísticas."),
            ("INFIBAGUÉ 75/25", "Banca de Desarrollo para Jóvenes", "Créditos semilla y capital para egresados del SENA y universidades."),
        ],
        pose_rgba=pose_side_r,
        logo_jp=logo_jp,
        sello_img=sello_img,
        horse_img=horse_img,
        pose_on_right=False,
        accent_color=COL_RED_BRIGHT,
    )

    # POST 5: Dato Mata Relato - Blindaje Fiscal 80-10-10 y Territorio
    create_post_card(
        filename="post_05_fin_de_semana_territorio.jpg",
        badge_text="DATO MATA RELATO • BLINDAJE FISCAL 80-10-10",
        title_top="OBRAS SIN ENDEUDAR MÁS A IBAGUÉ Y",
        title_highlight="¡CERO ALZA AL PREDIAL NI AL ICA!",
        subtitle="Caminando las 13 Comunas y 17 Corregimientos con cuentas claras y viables",
        bullets=[
            ("ESQUEMA 80-10-10", "80% Cooperación Internacional", "Fondos verdes, BID, UE y CIDCA + 10% Nación + 10% Municipio eficiente."),
            ("60.000 PLACAS", "Incentivos sin Garrote al Rodamiento", "+$10.000M a $14.000M/año para pavimentar las calles de tu barrio."),
            ("SEGURIDAD CÍVICA", "Recuperación Plaza 21 y Entornos LED", "Iluminación LED 100%, cámaras y deporte contra el microtráfico."),
        ],
        pose_rgba=pose_back,
        logo_jp=logo_jp,
        sello_img=sello_img,
        horse_img=horse_img,
        pose_on_right=True,
        accent_color=COL_YELLOW,
    )

    # HISTORIA VERTICAL 9:16 LISTA PARA INSTAGRAM / WHATSAPP STATUS / TIKTOK
    create_vertical_story_card(
        filename="historia_01_john_polo_sombrero_tolimense_9x16.jpg",
        pose_front=pose_front,
        pose_side=pose_side_l,
        logo_jp=logo_jp,
        sello_img=sello_img,
        horse_img=horse_img,
    )


if __name__ == "__main__":
    main()
