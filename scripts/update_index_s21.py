from pathlib import Path

index_path = Path("public/slides/index.html")
content = index_path.read_text(encoding="utf-8")

old_s21 = """              {
                id: 21,
                num: "SESI 21",
                title: "Musuh Bergerak: Laba-Laba Patroli AI",
                desc: "Musuh Pencuri Apel: Patroli Horizontal, Deteksi Titik Tabrakan & Menangkis Musuh.",
                duration: "90 Menit",
                tags: ["Smart Patrol", "Enemy Collision", "Dynamic Threat"],
                url: "/slides/sesi-21/index.html"
              },"""

new_s21 = """              {
                id: 21,
                num: "SESI 21",
                title: "Efek Suara Latar Dinamis & Tombol Mute",
                desc: "Background music loop dan tombol kontrol suara yang bisa diklik. Belajar kenyamanan pengalaman bermain pengguna (UX).",
                duration: "90 Menit",
                tags: ["Audio Dinamis", "Tombol Mute", "User Experience"],
                url: "/slides/sesi-21/index.html"
              },"""

if old_s21 in content:
    content = content.replace(old_s21, new_s21)
    index_path.write_text(content, encoding="utf-8")
    print("[OK] Sesi 21 updated in index.html")
else:
    print("[ERROR] old_s21 not found in index.html")
