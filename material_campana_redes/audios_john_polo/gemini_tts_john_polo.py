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
    Consulta la Extended Voice Library con client.voices.list() para filtrar voces
    masculinas en español (language_code que inicia con 'es') y las voces masculinas
    multilingües preestablecidas (Algenib, Puck, Charon, Fenrir, Orus).
    """
    if client is None:
        client = obtener_cliente_gemini()

    voces_espanol_nativas: List[Dict[str, Any]] = []
    voces_multilingues_preset: List[Dict[str, Any]] = []
    preset_lower = {p.lower() for p in PRESET_MALE_VOICES}

    try:
        page_token: Optional[str] = None
        for _ in range(15):
            kwargs: Dict[str, Any] = {}
            if page_token:
                kwargs["page_token"] = page_token
            respuesta = client.voices.list(**kwargs)
            lista_raw = getattr(respuesta, "voices", None) or []

            for v in lista_raw:
                vid = str(getattr(v, "id", "") or "")
                display = str(getattr(v, "display_name", "") or vid)
                gender = str(getattr(v, "gender", "") or "").lower()
                lang_code = str(getattr(v, "language_code", "") or "").lower()
                accent = str(getattr(v, "accent", "") or "")
                persona = str(getattr(v, "persona", "") or "")
                description = str(getattr(v, "description", "") or "")

                if gender != "male":
                    continue

                info_voz = {
                    "id": vid,
                    "display_name": display,
                    "gender": gender,
                    "language_code": getattr(v, "language_code", "") or "multilingual",
                    "accent": accent,
                    "persona": persona,
                    "description": description,
                }

                if lang_code.startswith("es"):
                    voces_espanol_nativas.append(info_voz)
                elif vid.lower() in preset_lower or display.lower() in preset_lower:
                    voces_multilingues_preset.append(info_voz)

            page_token = getattr(respuesta, "next_page_token", None)
            if not page_token:
                break
    except Exception as exc:
        print(f"[Aviso] No se pudo paginar Extended Voice Library ({exc}). Usando voz preestablecida '{preferida}'.")

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

    probar_tts_espanol(
        texto=args.texto,
        archivo_salida=args.salida,
        usar_modelo_expresivo=args.expresivo,
        voz=args.voz,
        estilo=args.estilo,
        reproducir=args.reproducir,
    )
