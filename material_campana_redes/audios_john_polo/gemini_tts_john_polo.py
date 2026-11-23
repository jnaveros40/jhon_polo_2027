import argparse
import base64
import os
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from google import genai

# Directorios del proyecto
AUDIO_DIR = Path(__file__).resolve().parent
ROOT_DIR = AUDIO_DIR.parent.parent
ENV_PATH = ROOT_DIR / ".env"

# Cargar variables de entorno desde .env
load_dotenv(dotenv_path=ENV_PATH)

# Modelos oficiales de Gemini 3.8 TTS
MODEL_FLASH_LITE_TTS = "gemini-3.8-flash-lite-tts"
MODEL_FLASH_TTS = "gemini-3.8-flash-tts"

# Voces masculinas preestablecidas recomendadas (Algenib: autoritaria/cálida, Puck: enérgica/cercana)
PRESET_MALE_VOICES = ("Algenib", "Puck", "Charon", "Fenrir", "Orus")


def obtener_cliente_gemini() -> genai.Client:
    """Inicializa el cliente de Google GenAI leyendo GEMINI_API_KEY desde .env."""
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError(
            f"No se encontró GEMINI_API_KEY en el entorno ni en {ENV_PATH}. "
            "Agrega GEMINI_API_KEY=tu_clave en el archivo .env."
        )
    return genai.Client(
        api_key=api_key,
        http_options={"api_version": "v1beta"},
    )


def listar_voces_masculinas_espanol(
    client: Optional[genai.Client] = None,
    preferida: str = "Algenib",
) -> Dict[str, Any]:
    """
    Consulta la Extended Voice Library con client.voices.list() filtrando nativamente
    por voces masculinas en español (language_code=['es-CO', 'es-419', 'es-MX', 'es-US', 'es-ES'])
    además de las voces masculinas preestablecidas (Algenib, Puck, Charon, Fenrir, Orus).
    """
    if client is None:
        client = obtener_cliente_gemini()

    voces_espanol_nativas: List[Dict[str, Any]] = []
    voces_multilingues_preset: List[Dict[str, Any]] = []
    preset_lower = {p.lower() for p in PRESET_MALE_VOICES}

    try:
        # 1. Filtrar voces masculinas en español directamente en la Extended Voice Library
        res_es = client.voices.list(
            language_code=["es-CO", "es-419", "es-MX", "es-US", "es-ES", "es-AR"],
            gender=["male"],
        )
        for v in getattr(res_es, "voices", None) or []:
            voces_espanol_nativas.append(
                {
                    "id": str(getattr(v, "id", "") or ""),
                    "display_name": str(getattr(v, "display_name", "") or ""),
                    "gender": str(getattr(v, "gender", "") or "male"),
                    "language_code": str(getattr(v, "language_code", "") or ""),
                    "accent": str(getattr(v, "accent", "") or ""),
                    "persona": str(getattr(v, "persona", "") or ""),
                    "description": str(getattr(v, "description", "") or ""),
                }
            )

        # 2. Consultar también las voces preestablecidas (Algenib, Puck, etc.)
        res_preset = client.voices.list(gender=["male"])
        for v in getattr(res_preset, "voices", None) or []:
            vid = str(getattr(v, "id", "") or "")
            display = str(getattr(v, "display_name", "") or vid)
            if vid.lower() in preset_lower or display.lower() in preset_lower:
                voces_multilingues_preset.append(
                    {
                        "id": vid,
                        "display_name": display,
                        "gender": str(getattr(v, "gender", "") or "male"),
                        "language_code": str(getattr(v, "language_code", "") or "multilingual"),
                        "accent": str(getattr(v, "accent", "") or ""),
                        "persona": str(getattr(v, "persona", "") or ""),
                        "description": str(getattr(v, "description", "") or ""),
                    }
                )
    except Exception as exc:
        print(f"[Aviso] No se pudo consultar Extended Voice Library ({exc}). Usando voz preestablecida '{preferida}'.")

    todas_disponibles = voces_espanol_nativas + voces_multilingues_preset
    voz_seleccionada = preferida.lower()
    for v in todas_disponibles:
        if v["display_name"].lower() == preferida.lower() or v["id"].lower() == preferida.lower():
            voz_seleccionada = v["id"]
            break

    return {
        "selected_voice": voz_seleccionada,
        "spanish_extended_male_voices": voces_espanol_nativas,
        "multilingual_preset_male_voices": voces_multilingues_preset,
        "available_spanish_male_voices": todas_disponibles,
        "preset_male_voices": list(PRESET_MALE_VOICES),
    }


def _decodificar_data(data: Any) -> Optional[bytes]:
    if not data:
        return None
    if isinstance(data, (bytes, bytearray)):
        return bytes(data)
    if isinstance(data, str):
        return base64.b64decode(data)
    return None


def _extraer_bytes_audio(interaction: Any) -> bytes:
    """Extrae los bytes WAV devueltos por Gemini 3.8 TTS desde interaction.output_audio o interaction.outputs."""
    # 1. Revisar directamente interaction.output_audio
    top_audio = getattr(interaction, "output_audio", None)
    if top_audio:
        raw = _decodificar_data(getattr(top_audio, "data", None))
        if raw:
            return raw

    # 2. Revisar cada elemento en interaction.outputs
    outputs = getattr(interaction, "outputs", None) or []
    for out in outputs:
        # 2a. out.data directo
        raw = _decodificar_data(getattr(out, "data", None) or (out.get("data") if isinstance(out, dict) else None))
        if raw:
            return raw

        # 2b. out.output_audio (puede ser AudioContent o list[AudioContent])
        out_audio = getattr(out, "output_audio", None) or (out.get("output_audio") if isinstance(out, dict) else None)
        if out_audio:
            items = out_audio if isinstance(out_audio, list) else [out_audio]
            for item in items:
                raw = _decodificar_data(
                    getattr(item, "data", None) or (item.get("data") if isinstance(item, dict) else None)
                )
                if raw:
                    return raw

        # 2c. out.content (list de partes)
        content_list = getattr(out, "content", None) or (out.get("content") if isinstance(out, dict) else None) or []
        for item in content_list:
            raw = _decodificar_data(
                getattr(item, "data", None) or (item.get("data") if isinstance(item, dict) else None)
            )
            if raw:
                return raw

    raise ValueError("La respuesta de Gemini 3.8 TTS no incluyó bytes de audio.")


def sintetizar_voz_gemini_38(
    text: str,
    output_path: str | Path,
    *,
    style: str = (
        "Warm, confident, authoritative Colombian male speaker from Tolima. "
        "Clear political campaign delivery with steady pacing and natural conviction."
    ),
    voice: str = "Algenib",
    model: str = MODEL_FLASH_LITE_TTS,
    client: Optional[genai.Client] = None,
) -> Path:
    """
    Sintetiza audio en español usando la estructura nueva de Gemini 3.8 TTS:
    - Separa estrictamente `voice` (en generation_config.speech_config),
      `speech_metadata.style` (en annotations) y `text` (solo el guion literal,
      con soporte opcional para etiquetas inline como <short pause>).
    - Devuelve un archivo WAV estándar con encabezado RIFF nativo de Gemini 3.8 TTS
      (o lo convierte a MP3 si output_path termina en .mp3).
    """
    if client is None:
        client = obtener_cliente_gemini()

    output_path = Path(output_path).resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Estructura oficial de Gemini 3.8 TTS separando voice, speech_metadata.style y text
    interaction = client.interactions.create(
        model=model,
        input=[
            {
                "type": "user_input",
                "content": [
                    {
                        "type": "text",
                        "text": text,
                        "annotations": [
                            {
                                "type": "speech_metadata",
                                "style": style,
                            }
                        ],
                    }
                ],
            }
        ],
        response_format={"type": "audio"},
        generation_config={
            "speech_config": [
                {
                    "voice": voice,
                }
            ]
        },
    )

    wav_bytes = _extraer_bytes_audio(interaction)

    if output_path.suffix.lower() == ".mp3":
        temp_wav = output_path.with_suffix(".temp.wav")
        temp_wav.write_bytes(wav_bytes)
        ffmpeg_bin = ROOT_DIR / "node_modules" / "ffmpeg-static" / "ffmpeg.exe"
        ffmpeg_cmd = str(ffmpeg_bin) if ffmpeg_bin.exists() else "ffmpeg"
        subprocess.run(
            [ffmpeg_cmd, "-y", "-i", str(temp_wav), "-c:a", "libmp3lame", "-b:a", "192k", str(output_path)],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        temp_wav.unlink(missing_ok=True)
    else:
        output_path.write_bytes(wav_bytes)

    return output_path


def _obtener_duracion_segundos(ffmpeg_cmd: str, ruta_audio: Path) -> float:
    res = subprocess.run(
        [ffmpeg_cmd, "-i", str(ruta_audio)],
        stderr=subprocess.PIPE,
        stdout=subprocess.PIPE,
        text=True,
        encoding="utf-8",
        errors="ignore",
    )
    for line in res.stderr.splitlines():
        if "Duration:" in line:
            parts = line.split("Duration:")[1].split(",")[0].strip().split(":")
            return float(parts[0]) * 3600 + float(parts[1]) * 60 + float(parts[2])
    return 0.0


# Los 11 guiones oficiales de la campaña de John Polo (separando speech_metadata.style y text)
GUIONES_CAMPANA_GEMINI_38 = [
    (
        "audio_01.mp3",
        11.2,
        "Energetic, proud, and inspiring Colombian male political speaker from Ibagué, Tolima. Fast, rhythmic, and uplifting delivery.",
        "¡La fuerza que mueve a Ibagué está en marcha! Somos una ciudad con voz, oportunidades y futuro. Con empleo joven, cultura todo el año y control firme al agua... ¡Ibagué tiene con qué! Es hora de creer. Soy John Polo, al Concejo de Ibagué. ¡Ibagué merece sonar más fuerte!",
    ),
    (
        "audio_02.mp3",
        11.2,
        "Warm, approachable, confident Colombian male candidate speaking directly to neighbors with dynamic, agile pacing.",
        "¡Hola, mi gente de Ibagué! Soy John Polo. Vamos al Concejo por una ciudad que produce, recibe y crece: con destino mundo y sabor local, más industria, cultura que produce, primer empleo joven, control férreo al agua y plazas vivas. ¡Súmate a nuestro equipo! ¡Ibagué merece sonar más fuerte!",
    ),
    (
        "audio_03.mp3",
        9.2,
        "Direct, decisive, executive Colombian male voice with strong conviction and brisk pacing.",
        "Ibagué no necesita más promesas vacías, necesita gerencia, carácter y resultados. Por el empleo de nuestros jóvenes, nuestras plazas y el agua de tus hijos: soy John Polo al Concejo. ¡Ibagué merece sonar más fuerte!",
    ),
    (
        "audio_04.mp3",
        13.1,
        "Epic, euphoric, powerful Colombian male leader awakening a crowd with high energy, authority, and joyful finale.",
        "¡Despierta, Ibagué! Llegó la hora de sonar más fuerte. Con carácter y resultados vamos a recorrer las trece comunas y cada vereda: por el primer empleo joven, por agua las veinticuatro horas sin excusas y por un turismo que genere riqueza. ¡Soy John Polo al Concejo! ¡Es hora de creer!",
    ),
    (
        "audio_05.mp3",
        11.6,
        "Warm peasant pride ('El Gerente Campesino'), grounded Colombian male voice walking the neighborhoods with sincerity and strength.",
        "Con el orgullo de nuestras raíces campesinas y los pies en el territorio, estamos caminando cada calle de Ibagué. Escuchando a la gente, defendiendo el agua y abriendo puertas a los jóvenes. ¡Con John Polo al Concejo, Ibagué merece sonar más fuerte!",
    ),
    (
        "audio_06.mp3",
        9.2,
        "Firm, winning, technically rigorous Colombian male leader speaking with brisk, clear determination.",
        "¡Con rigor técnico y carácter devolveremos la dignidad a Ibagué! Empleo joven, vías para el campo y control implacable a los servicios públicos. Soy John Polo, Partido Liberal. ¡Ibagué merece sonar más fuerte!",
    ),
    (
        "audio_07.mp3",
        14.1,
        "Constructive indignation at the start, transitioning into sharp managerial authority and firm commitment. Agile pacing.",
        "¿Tu barrio sin agua y el recibo por las nubes? El IBAL pierde un millón de metros cúbicos de agua al mes y rompe las calles. Con treinta kilómetros por año de tubería nueva y telemetría digital, acabaremos el cartel de los valvuleros. Desde el Concejo haré control sin tregua. ¡Ibagué merece sonar más fuerte!",
    ),
    (
        "audio_08.mp3",
        14.1,
        "Fraternal with rural farmers, knowledgeable and resolute 'Gerente Campesino' Colombian male voice with agile pacing.",
        "Trece mil familias en nuestras ciento cuarenta y cuatro veredas sufren por malas vías y por intermediarios que encarecen la comida. Haremos cincuenta kilómetros por año de vías con las Juntas de Acción Comunal y la Central de Acopio en el antiguo Carrefour de la diecinueve. ¡Con palabra cumplida, Ibagué merece sonar más fuerte!",
    ),
    (
        "audio_09.mp3",
        14.1,
        "Agile, executive, problem-solving Colombian male manager delivering concrete infrastructure solutions with energetic rhythm.",
        "Más de trescientos diez mil vehículos atrapados en el trancón diario de Ibagué. Desde el Concejo destrabaremos la caja única del transporte público, el Cable Aéreo con tarifa integrada para Boquerón y la Comuna Dos, la Calle ciento tres y el puente en Mirolindo. ¡Con gerencia real, Ibagué merece sonar más fuerte!",
    ),
    (
        "audio_10.mp3",
        11.2,
        "Serious, financially solvent, authoritative Colombian male speaker explaining fiscal numbers clearly and briskly.",
        "Ibagué debe más de doscientos mil millones de pesos, pero no vamos a dejarte subir el Predial ni el ICA. Con el esquema ochenta-diez-diez y convirtiendo a INFIBAGUÉ en banca de desarrollo juvenil, haremos las obras sin endeudar más la ciudad. ¡Soy John Polo al Concejo! ¡Ibagué merece sonar más fuerte!",
    ),
    (
        "audio_11_nota_voz_whatsapp_45s.mp3",
        47.5,
        "Warm, conversational, trustworthy Colombian male voice sending a personal WhatsApp voice note to a community leader friend.",
        "¡Hola! Te habla John Polo. <short pause> Como hijo de esta tierra y con el orgullo de nuestras raíces campesinas, quiero compartirte una propuesta seria, estudiada y sin carreta para transformar a Ibagué desde el Concejo. Mientras otros improvisan o quieren seguir endeudando la ciudad, hemos construido un Plan de Siete Ejes con soluciones reales: primero, campo y comida justa con la Central de Acopio en la Calle diecinueve y cincuenta kilómetros por año de vías rurales con las Juntas. Segundo, agua sin mafias: treinta kilómetros por año de tubería nueva en el IBAL y fin del cartel de los valvuleros. Tercero, movilidad de verdad con el Cable Aéreo para Boquerón y la Comuna Dos, y el puente en Mirolindo. Y todo sin subir el Predial ni el ICA. <short pause> Ibagué tiene con qué. Es hora de creer. ¡Ibagué merece sonar más fuerte! Ayúdame compartiendo este mensaje con tu familia y tus vecinos.",
    ),
]


def generar_locuciones_campana_gemini_38(
    usar_modelo_expresivo: bool = False,
    voz: str = "Algenib",
) -> None:
    """
    Genera las 11 locuciones oficiales de campaña usando Gemini 3.8 TTS,
    recorta silencios extremos y ajusta la cadencia para que cada locución encaje
    exactamente dentro de la ventana de tiempo de su video MP4 correspondiente.
    """
    client = obtener_cliente_gemini()
    modelo = MODEL_FLASH_TTS if usar_modelo_expresivo else MODEL_FLASH_LITE_TTS
    info_voces = listar_voces_masculinas_espanol(client, preferida=voz)
    voz_final = info_voces["selected_voice"]

    ffmpeg_bin = ROOT_DIR / "node_modules" / "ffmpeg-static" / "ffmpeg.exe"
    ffmpeg_cmd = str(ffmpeg_bin) if ffmpeg_bin.exists() else "ffmpeg"

    print(f"🎙️ Generando las 11 locuciones de campaña con Gemini 3.8 TTS ({modelo} | voz: {voz_final})...")

    for fname, max_s, style, text in GUIONES_CAMPANA_GEMINI_38:
        out_mp3 = AUDIO_DIR / fname
        raw_wav = AUDIO_DIR / f"_raw_g38_{fname}.wav"
        trim_wav = AUDIO_DIR / f"_trim_g38_{fname}.wav"

        sintetizar_voz_gemini_38(
            text=text,
            output_path=raw_wav,
            style=style,
            voice=voz_final,
            model=modelo,
            client=client,
        )

        # Recortar silencios iniciales y finales para sincronía inmediata con el video
        subprocess.run(
            [
                ffmpeg_cmd,
                "-y",
                "-i",
                str(raw_wav),
                "-af",
                "silenceremove=start_periods=1:start_silence=0.04:start_threshold=-42dB,"
                "areverse,silenceremove=start_periods=1:start_silence=0.06:start_threshold=-42dB,areverse",
                str(trim_wav),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )

        dur = _obtener_duracion_segundos(ffmpeg_cmd, trim_wav)
        if dur > max_s and max_s > 0:
            # Ajustar cadencia con atempo (encadenando si supera 2.0) sin alterar el tono de la voz
            ratio = (dur / max_s) * 1.015
            if ratio <= 2.0:
                af_filter = f"atempo={ratio:.4f}"
            else:
                half = ratio ** 0.5
                af_filter = f"atempo={half:.4f},atempo={half:.4f}"
            subprocess.run(
                [
                    ffmpeg_cmd,
                    "-y",
                    "-i",
                    str(trim_wav),
                    "-af",
                    af_filter,
                    "-c:a",
                    "libmp3lame",
                    "-b:a",
                    "192k",
                    str(out_mp3),
                ],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
        else:
            subprocess.run(
                [
                    ffmpeg_cmd,
                    "-y",
                    "-i",
                    str(trim_wav),
                    "-c:a",
                    "libmp3lame",
                    "-b:a",
                    "192k",
                    str(out_mp3),
                ],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )

        raw_wav.unlink(missing_ok=True)
        trim_wav.unlink(missing_ok=True)

        final_dur = _obtener_duracion_segundos(ffmpeg_cmd, out_mp3)
        print(f"✓ {fname} generado con Gemini 3.8 TTS ({final_dur:.2f}s / máx {max_s:.1f}s)")

        if "audio_11" in fname:
            ogg_path = out_mp3.with_suffix(".ogg")
            subprocess.run(
                [
                    ffmpeg_cmd,
                    "-y",
                    "-i",
                    str(out_mp3),
                    "-c:a",
                    "libopus",
                    "-b:a",
                    "48k",
                    "-vbr",
                    "on",
                    str(ogg_path),
                ],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
            print(f"✓ Nota de voz nativa WhatsApp actualizada: {ogg_path.name}")

    print("🎉 ¡Las 11 locuciones oficiales con Gemini 3.8 TTS están listas!")


def probar_tts_espanol(
    texto: str = (
        "¡Hola, mi gente de Ibagué! <short pause> Soy John Polo. "
        "Con gerencia, carácter y el orgullo de nuestras raíces campesinas, "
        "vamos al Concejo para defender el agua, las vías rurales y el empleo joven. "
        "<short pause> ¡Ibagué merece sonar más fuerte!"
    ),
    archivo_salida: str | Path = AUDIO_DIR / "prueba_gemini_38_tts_john_polo.wav",
    usar_modelo_expresivo: bool = False,
    voz: str = "Algenib",
    estilo: str = (
        "Warm, energetic, trustworthy Colombian male voice with clear articulation "
        "and inspiring leadership tone."
    ),
    reproducir: bool = False,
) -> Path:
    """
    Función de prueba que recibe un texto en español, consulta las voces masculinas,
    genera el audio con Gemini 3.8 TTS y lo guarda (y opcionalmente lo reproduce).
    """
    client = obtener_cliente_gemini()
    modelo = MODEL_FLASH_TTS if usar_modelo_expresivo else MODEL_FLASH_LITE_TTS

    info_voces = listar_voces_masculinas_espanol(client, preferida=voz)
    voz_final = info_voces["selected_voice"]

    print(f"🎙️ Modelo seleccionado : {modelo}")
    print(f"🗣️ Voz masculina       : {voz_final} (Preestablecidas: {', '.join(PRESET_MALE_VOICES)})")
    print(f"🎭 speech_metadata.style: {estilo}")
    print(f"📝 Texto literal       : {texto}")

    ruta_generada = sintetizar_voz_gemini_38(
        text=texto,
        output_path=archivo_salida,
        style=estilo,
        voice=voz_final,
        model=modelo,
        client=client,
    )

    tamano_kb = ruta_generada.stat().st_size / 1024.0
    print(f"✅ Audio generado exitosamente en: {ruta_generada} ({tamano_kb:.1f} KB)")

    if reproducir and sys.platform.startswith("win"):
        try:
            import winsound

            if ruta_generada.suffix.lower() == ".wav":
                winsound.PlaySound(str(ruta_generada), winsound.SND_FILENAME)
        except Exception as exc:
            print(f"[Aviso] No se pudo reproducir automáticamente en consola: {exc}")

    return ruta_generada


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Síntesis de voz en español con Gemini 3.8 TTS")
    parser.add_argument(
        "--texto",
        type=str,
        default=(
            "¡Hola, mi gente de Ibagué! <short pause> Soy John Polo. "
            "Con gerencia, carácter y el orgullo de nuestras raíces campesinas, "
            "vamos al Concejo para defender el agua, las vías rurales y el empleo joven. "
            "<short pause> ¡Ibagué merece sonar más fuerte!"
        ),
        help="Texto literal en español a sintetizar (sin instrucciones de estilo dentro del texto).",
    )
    parser.add_argument(
        "--voz",
        type=str,
        default="Algenib",
        help="Voz masculina a utilizar (ej. Algenib, Puck, Charon, Fenrir, Orus).",
    )
    parser.add_argument(
        "--estilo",
        type=str,
        default="Warm, energetic, authoritative Colombian male speaker with clear articulation and conviction.",
        help="Instrucción de estilo para speech_metadata.style.",
    )
    parser.add_argument(
        "--expresivo",
        action="store_true",
        help="Usa gemini-3.8-flash-tts en lugar de gemini-3.8-flash-lite-tts.",
    )
    parser.add_argument(
        "--salida",
        type=str,
        default=str(AUDIO_DIR / "prueba_gemini_38_tts_john_polo.wav"),
        help="Ruta del archivo de salida (.wav o .mp3).",
    )
    parser.add_argument(
        "--reproducir",
        action="store_true",
        help="Reproduce el audio WAV al finalizar (en Windows).",
    )
    parser.add_argument(
        "--listar-voces",
        action="store_true",
        help="Lista las voces masculinas compatibles con español en la Extended Voice Library.",
    )
    parser.add_argument(
        "--generar-campana",
        action="store_true",
        help="Genera los 11 audios oficiales de la campaña de John Polo con Gemini 3.8 TTS.",
    )
    args = parser.parse_args()

    if args.listar_voces:
        info = listar_voces_masculinas_espanol(preferida=args.voz)
        print(f"Voz seleccionada: {info['selected_voice']}")
        print(f"Voces masculinas nativas en español (es-*) en Extended Voice Library: {len(info['spanish_extended_male_voices'])}")
        for v in info["spanish_extended_male_voices"][:25]:
            print(f"  - ID: {v['id']} | Nombre: {v['display_name']} | Idioma: {v['language_code']} | Acento: {v['accent']} | Persona: {v['persona']}")
        print(f"Voces masculinas multilingües preestablecidas: {len(info['multilingual_preset_male_voices'])}")
        for v in info["multilingual_preset_male_voices"]:
            print(f"  - ID: {v['id']} | Nombre: {v['display_name']} | Persona: {v['persona']} | Descripción: {v['description']}")
        sys.exit(0)

    if args.generar_campana:
        generar_locuciones_campana_gemini_38(
            usar_modelo_expresivo=args.expresivo,
            voz=args.voz,
        )
        sys.exit(0)

    probar_tts_espanol(
        texto=args.texto,
        archivo_salida=args.salida,
        usar_modelo_expresivo=args.expresivo,
        voz=args.voz,
        estilo=args.estilo,
        reproducir=args.reproducir,
    )
