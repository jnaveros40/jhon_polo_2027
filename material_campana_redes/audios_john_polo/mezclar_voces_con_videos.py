import os
import glob
import shutil
import subprocess

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
AUDIO_DIR = os.path.dirname(os.path.abspath(__file__))
VIDEO_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "videos_publicitarios")
BACKUP_BG_DIR = os.path.join(VIDEO_DIR, "_pistas_instrumentales_base")

VIDEO_MAP = {
    1: "video_01_identidad_caballo_sonar_fuerte_9x16.mp4",
    2: "video_02_john_polo_poster_oficial_animado_9x16.mp4",
    3: "video_03_spot_campana_feed_1x1.mp4",
    4: "video_04_euforia_epica_caballo_y_john_caricatura_9x16.mp4",
    5: "video_05_john_caricatura_en_marcha_con_el_caballo_9x16.mp4",
    6: "video_06_spot_euforia_caricatura_feed_1x1.mp4",
    7: "video_07_oleada3_psp_agua_ibal_sin_mafias_9x16.mp4",
    8: "video_08_oleada3_psp_campo_144_veredas_calle19_9x16.mp4",
    9: "video_09_oleada3_psp_movilidad_setp_cable_mirolindo_9x16.mp4",
    10: "video_10_oleada3_dato_mata_relato_blindaje_fiscal_1x1.mp4",
}


def find_audio_for_index(idx):
    """Find audio_01 / audio_1 in any common WhatsApp or voice recorder format (.ogg, .opus, .mp3, .m4a, .wav, .aac).
    Prioritizes .ogg/.m4a/.wav (real WhatsApp recordings) over .mp3 (TTS maqueta) if both exist!"""
    priority_exts = ["ogg", "opus", "m4a", "wav", "aac", "mp3"]
    for ext in priority_exts:
        for pat in [f"audio_{idx:02d}.{ext}", f"audio_{idx}.{ext}", f"video_{idx:02d}.{ext}"]:
            matches = glob.glob(os.path.join(AUDIO_DIR, pat))
            if matches:
                return matches[0]
    return None


def main():
    ffmpeg_bin = os.path.join(ROOT_DIR, "node_modules", "ffmpeg-static", "ffmpeg.exe")
    if not os.path.exists(ffmpeg_bin):
        ffmpeg_bin = "ffmpeg"

    os.makedirs(BACKUP_BG_DIR, exist_ok=True)

    mixed_count = 0
    for idx, vid_name in VIDEO_MAP.items():
        audio_path = find_audio_for_index(idx)
        vid_path = os.path.join(VIDEO_DIR, vid_name)
        if not audio_path or not os.path.exists(vid_path):
            continue

        # Preserve original instrumental audio track the very first time before mixing voice
        bg_audio_backup = os.path.join(BACKUP_BG_DIR, f"bg_{idx:02d}.m4a")
        if not os.path.exists(bg_audio_backup):
            subprocess.run([
                ffmpeg_bin, "-y", "-i", vid_path,
                "-vn", "-c:a", "aac", "-b:a", "192k",
                bg_audio_backup
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        temp_out = os.path.join(VIDEO_DIR, f"_voiced_{vid_name}")
        print(f"Mezclando locución ({os.path.basename(audio_path)}) + música de euforia en {vid_name}...")

        # Filter chain:
        # - Input 1: Clean instrumental/euphoria soundtrack at 26% under voice
        # - Input 2: Voiceover delayed by 180ms with EQ presence boost, radio compressor, and crisp foreground gain
        filter_complex = (
            "[1:a]volume=0.26[bg];"
            "[2:a]adelay=180|180,highpass=f=85,lowpass=f=13500,"
            "acompressor=threshold=-18dB:ratio=3.2:attack=5:release=60,"
            "volume=1.65[voice];"
            "[bg][voice]amix=inputs=2:duration=first:dropout_transition=1.5:normalize=0[aout]"
        )

        cmd = [
            ffmpeg_bin, "-y",
            "-i", vid_path,
            "-i", bg_audio_backup,
            "-i", audio_path,
            "-filter_complex", filter_complex,
            "-map", "0:v",
            "-map", "[aout]",
            "-c:v", "copy",
            "-c:a", "aac", "-b:a", "192k",
            temp_out
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        os.replace(temp_out, vid_path)
        mixed_count += 1
        print(f"✓ Video actualizado con voz + música: {vid_name}")

    if mixed_count == 0:
        print("Aún no hay archivos de audio en material_campana_redes/audios_john_polo/.")
    else:
        print(f"¡Listo! Se actualizaron {mixed_count} videos con locución hablada + música de fondo.")


if __name__ == "__main__":
    main()
