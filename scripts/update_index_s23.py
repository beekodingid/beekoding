from pathlib import Path

index_path = Path("public/slides/index.html")
content = index_path.read_text(encoding="utf-8")

old_s23 = """              {
                id: 23,
                num: "SESI 23",
                title: "Game Balancing & Orkestrasi Audio",
                desc: "Menyetel Ritme Arkade: Balancing Drop Rate, Background Music Loop & Polish Akhir.",
                duration: "90 Menit",
                tags: ["Game Balancing", "Soundtrack Loop", "QA Testing"],
                url: "/slides/sesi-23/index.html"
              },"""

new_s23 = """              {
                id: 23,
                num: "SESI 23",
                title: "Produksi Proyek Mandiri: Game Platformer Cilik",
                desc: "Pembangunan game mandiri dengan bimbingan 1-on-1 instruktur. Memastikan setiap anak mandiri mengatasi bug koding.",
                duration: "90 Menit",
                tags: ["Capstone Level 2", "Game Platformer", "Bimbingan 1-on-1"],
                url: "/slides/sesi-23/index.html"
              },"""

if old_s23 in content:
    content = content.replace(old_s23, new_s23)
    index_path.write_text(content, encoding="utf-8")
    print("[OK] Sesi 23 updated in index.html")
else:
    print("[ERROR] old_s23 not found in index.html")
