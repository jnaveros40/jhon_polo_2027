import asyncio
import os
import subprocess
import edge_tts

AUDIO_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(AUDIO_DIR, "..", ".."))
FFMPEG_BIN = os.path.join(ROOT_DIR, "node_modules", "ffmpeg-static", "ffmpeg.exe")
if not os.path.exists(FFMPEG_BIN):
    FFMPEG_BIN = "ffmpeg"

VOICE = "es-CO-GonzaloNeural"

# Each entry: (filename, target_max_seconds, rate, pitch, text)
# Timed so the voice finishes comfortably before the video ends, leaving the closing chord/chime clean.
SCRIPTS = [
    (
        "audio_01.mp3",
        11.2,
        "+26%",
        "-2Hz",
        "¡La fuerza que mueve a Ibagué está en marcha! Somos una ciudad con voz, oportunidades y futuro. Con empleo joven, cultura todo el año y control firme al agua... ¡Ibagué tiene con qué! Es hora de creer. Soy John Polo, al Concejo de Ibagué. ¡Ibagué merece sonar más fuerte!"
    ),
    (
        "audio_02.mp3",
        11.2,
        "+28%",
        "-2Hz",
        "¡Hola, mi gente de Ibagué! Soy John Polo. Vamos al Concejo por una ciudad que produce, recibe y crece: con destino mundo y sabor local, más industria, cultura que produce, primer empleo joven, control férreo al agua y plazas vivas. ¡Súmate a nuestro equipo! ¡Ibagué merece sonar más fuerte!"
    ),
    (
        "audio_03.mp3",
        9.3,
        "+18%",
        "-2Hz",
        "Ibagué no necesita más promesas vacías, necesita gerencia, carácter y resultados. Por el empleo de nuestros jóvenes, nuestras plazas y el agua de tus hijos: soy John Polo al Concejo. ¡Ibagué merece sonar más fuerte!"
    ),
    (
        "audio_04.mp3",
        13.2,
        "+18%",
        "-2Hz",
        "¡Despierta, Ibagué! Llegó la hora de sonar más fuerte. Con carácter y resultados vamos a recorrer las trece comunas y cada vereda: por el primer empleo joven, por agua las veinticuatro horas sin excusas y por un turismo que genere riqueza. ¡Soy John Polo al Concejo! ¡Es hora de creer!"
    ),
    (
        "audio_05.mp3",
        11.7,
        "+16%",
        "-2Hz",
        "Con el orgullo de nuestras raíces campesinas y los pies en el territorio, estamos caminando cada calle de Ibagué. Escuchando a la gente, defendiendo el agua y abriendo puertas a los jóvenes. ¡Con John Polo al Concejo, Ibagué merece sonar más fuerte!"
    ),
    (
        "audio_06.mp3",
        9.3,
        "+18%",
        "-2Hz",
        "¡Con rigor técnico y carácter devolveremos la dignidad a Ibagué! Empleo joven, vías para el campo y control implacable a los servicios públicos. Soy John Polo, Partido Liberal. ¡Ibagué merece sonar más fuerte!"
    ),
    (
        "audio_07.mp3",
        14.2,
        "+22%",
        "-2Hz",
        "¿Tu barrio sin agua y el recibo por las nubes? El IBAL pierde un millón de metros cúbicos de agua al mes y rompe las calles. Con treinta kilómetros por año de tubería nueva y telemetría digital, garantizaremos agua continua las veinticuatro horas. Desde el Concejo haré control sin tregua. ¡Ibagué merece sonar más fuerte!"
    ),
    (
        "audio_08.mp3",
        14.2,
        "+22%",
        "-2Hz",
        "Trece mil familias en nuestras ciento cuarenta y cuatro veredas sufren por malas vías y por intermediarios que encarecen la comida. Haremos cincuenta kilómetros por año de vías con las Juntas de Acción Comunal y la Central de Acopio en el antiguo Carrefour de la diecinueve. ¡Con palabra cumplida, Ibagué merece sonar más fuerte!"
    ),
    (
        "audio_09.mp3",
        14.2,
        "+22%",
        "-2Hz",
        "Más de trescientos diez mil vehículos atrapados en el trancón diario de Ibagué. Desde el Concejo destrabaremos la caja única del transporte público, el Cable Aéreo con tarifa integrada para Boquerón y la Comuna Dos, la Calle ciento tres y el puente en Mirolindo. ¡Con gerencia real, Ibagué merece sonar más fuerte!"
    ),
    (
        "audio_10.mp3",
        11.4,
        "+24%",
        "-2Hz",
        "Ibagué debe más de doscientos mil millones de pesos, pero no vamos a dejarte subir el Predial ni el ICA. Con el esquema ochenta-diez-diez y convirtiendo a INFIBAGUÉ en banca de desarrollo juvenil, haremos las obras sin endeudar más la ciudad. ¡Soy John Polo al Concejo! ¡Ibagué merece sonar más fuerte!"
    ),
    (
        "audio_11_nota_voz_whatsapp_45s.mp3",
        48.0,
        "+8%",
        "-2Hz",
        "¡Hola! Te habla John Polo. Como hijo de esta tierra y con el orgullo de nuestras raíces campesinas, quiero compartirte una propuesta seria, estudiada y sin carreta para transformar a Ibagué desde el Concejo. Mientras otros improvisan o quieren seguir endeudando la ciudad, hemos construido un Plan de Siete Ejes con soluciones reales: primero, campo y comida justa con la Central de Acopio en la Calle diecinueve y cincuenta kilómetros por año de vías rurales con las Juntas. Segundo, agua continua y eficiente: treinta kilómetros por año de tubería nueva en el IBAL y telemetría digital para cuidar cada gota. Tercero, movilidad de verdad con el Cable Aéreo para Boquerón y la Comuna Dos, y el puente en Mirolindo. Y todo sin subir el Predial ni el ICA. Ibagué tiene con qué. Es hora de creer. ¡Ibagué merece sonar más fuerte! Ayúdame compartiendo este mensaje con tu familia y tus vecinos."
    ),
]


def get_audio_duration(path):
    """Use ffmpeg to inspect duration in seconds."""
    res = subprocess.run(
        [FFMPEG_BIN, "-i", path],
        stderr=subprocess.PIPE,
        stdout=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="ignore"
    )
    for line in res.stderr.splitlines():
        if "Duration:" in line:
            parts = line.split("Duration:")[1].split(",")[0].strip().split(":")
            return float(parts[0]) * 3600 + float(parts[1]) * 60 + float(parts[2])
    return 0.0


async def synthesize_one(fname, target_max_s, rate, pitch, text):
    out_path = os.path.join(AUDIO_DIR, fname)
    raw_path = os.path.join(AUDIO_DIR, f"_raw_{fname}")
    communicate = edge_tts.Communicate(text=text, voice=VOICE, rate=rate, pitch=pitch)
    await communicate.save(raw_path)

    # Trim leading/trailing silence and check duration
    trimmed_path = os.path.join(AUDIO_DIR, f"_trim_{fname}")
    subprocess.run([
        FFMPEG_BIN, "-y", "-i", raw_path,
        "-af", "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_silence=0.08:start_threshold=-45dB,areverse",
        "-c:a", "libmp3lame", "-b:a", "192k",
        trimmed_path
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    dur = get_audio_duration(trimmed_path)
    # If slightly longer than target_max_s, apply gentle atempo so it fits the exact video window without clipping a single word
    if dur > target_max_s and target_max_s > 0:
        tempo = min(1.35, max(1.01, (dur / target_max_s) * 1.02))
        subprocess.run([
            FFMPEG_BIN, "-y", "-i", trimmed_path,
            "-af", f"atempo={tempo:.3f}",
            "-c:a", "libmp3lame", "-b:a", "192k",
            out_path
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        os.remove(trimmed_path)
    else:
        os.replace(trimmed_path, out_path)

    if os.path.exists(raw_path):
        os.remove(raw_path)

    final_dur = get_audio_duration(out_path)
    print(f"✓ Generado {fname} ({final_dur:.2f}s / límite {target_max_s:.1f}s) — Voz: {VOICE}")

    # Also export audio_11 as native WhatsApp .ogg (Opus) voice note
    if "audio_11" in fname:
        ogg_path = out_path.replace(".mp3", ".ogg")
        subprocess.run([
            FFMPEG_BIN, "-y", "-i", out_path,
            "-c:a", "libopus", "-b:a", "48k", "-vbr", "on",
            ogg_path
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"✓ Generado formato nota de voz nativa WhatsApp: {os.path.basename(ogg_path)}")


async def main():
    print(f"🎙️ Iniciando síntesis neural colombiana ({VOICE}) para 11 guiones de John Polo...")
    for item in SCRIPTS:
        await synthesize_one(*item)
    print("🎉 ¡Las 11 locuciones neurales en español de Colombia están listas!")


if __name__ == "__main__":
    asyncio.run(main())
