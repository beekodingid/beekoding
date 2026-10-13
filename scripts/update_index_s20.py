from pathlib import Path

index_path = Path("public/slides/index.html")
content = index_path.read_text(encoding="utf-8")

old_s20 = """              {
                id: 20,
                num: "SESI 20",
                title: "Power-Up Ajaib: Magnet Buah & Booster",
                desc: "Item Spesial: Magnet Penyedot Koin Madu & Keranjang Raksasa Durasi Sementara.",
                duration: "90 Menit",
                tags: ["Power-Ups", "Magnet Logic", "Timed Buff"],
                url: "/slides/sesi-20/index.html"
              },"""

new_s20 = """              {
                id: 20,
                num: "SESI 20",
                title: "Papan Peringkat Sederhana (High Score System)",
                desc: "Membandingkan nilai: if Skor > HighScore then set HighScore to Skor. Memotivasi anak memecahkan rekor sendiri.",
                duration: "90 Menit",
                tags: ["High Score", "Papan Peringkat", "Operator Lebih Besar"],
                url: "/slides/sesi-20/index.html"
              },"""

if old_s20 in content:
    content = content.replace(old_s20, new_s20)
    index_path.write_text(content, encoding="utf-8")
    print("[OK] Sesi 20 updated in index.html")
else:
    print("[ERROR] old_s20 not found in index.html")
