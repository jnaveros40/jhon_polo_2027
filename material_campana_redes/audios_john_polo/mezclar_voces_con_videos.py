import os
import glob
import subprocess

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
AUDIO_DIR = os.path.dirname(os.path.abspath(__file__))
VIDEO_DIR = os.path.join(ROOT_DIR, "material_campana_redes", "videos_publicitarios")

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
    """Find audio_01 / audio_1 in any common WhatsApp or voice recorder format (.ogg, .opus, .mp3, .m4a, .wav, .aac)."""
    patterns = [
        f"audio_{idx:02d}.*",
        f"audio_{idx}.*",
        f"video_{idx:02d}.*",
        f"*{idx:02d}*.ogg",
        f"*{idx:02d}*.mp3",
        f"*{idx:02d}*.m4a",
        f"*{idx:02d}*.wav",
    ]
    for pat in patterns:
        matches = glob.glob(os.path.join(AUDIO_DIR, pat))
        for m in matches:
            if not m.endswith(".md") and not m.endswith(".py"):
                return m
    return None


def main():
    ffmpeg_bin = os.path.join(ROOT_DIR, "node_modules", "ffmpeg-static", "ffmpeg.exe")
    if not os.path.exists(ffmpeg_bin):
        ffmpeg_bin = "ffmpeg"

    mixed_count = 0
    for idx, vid_name in VIDEO_MAP.items():
        audio_path = find_audio_for_index(idx)
        vid_path = os.path.join(VIDEO_DIR, vid_name)
        if not audio_path or not os.path.exists(vid_path):
            continue

        temp_out = os.path.join(VIDEO_DIR, f"_voiced_{vid_name}")
        print(f"Mezclando voz real ({os.path.basename(audio_path)}) en {vid_name}...")

        # Filter chain:
        # - Clean voice note (highpass 85Hz, presence boost 3.2kHz, radio compressor, volume boost)
        # - Lower background music to 25% so John Polo's voice is crystal-clear in the foreground
        filter_complex = (
            "[0:a]volume=0.25[bg];"
            "[1:a]highpass=f=85,lowpass=f=13000,"
            "acompressor=threshold=-18dB:ratio=3.5:attack=5:release=60,"
            "volume=1.6[voice];"
            "[bg][voice]amix=inputs=2:duration=first:dropout_transition=2[aout]"
        )

        cmd = [
            ffmpeg_bin, "-y",
            "-i", vid_path,
            "-i", audio_path,
            "-filter_complex", filter_complex,
            "-map", "0:v",
            "-map", "[aout]",
            "-c:v", "copy",
            "-c:a", "aac", "-b:a", "192k",
            temp_out
        ]
        subprocess.run(cmd, check=True)
        os.replace(temp_out, vid_path)
        mixed_count += 1
        print(f"✓ Actualizado con voz: {vid_path}")

    if mixed_count == 0:
        print("Aún no hay archivos de audio en material_campana_redes/audios_john_polo/.")
        print("Guarda allí las notas de voz como audio_01.ogg ... audio_10.ogg y vuelve a ejecutar este script.")
    else:
        print(f"¡Listo! Se actualizaron {mixed_count} videos con la voz real de John Polo.")


if __name__ == "__main__":
    main()
