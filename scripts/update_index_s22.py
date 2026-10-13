from pathlib import Path

index_path = Path("public/slides/index.html")
content = index_path.read_text(encoding="utf-8")

old_s22 = """              {
                id: 22,
                num: "SESI 22",
                title: "Kustomisasi Toko Karakter (Skin Shop)",
                desc: "Sistem Toko Kostum: Tukar Madu dengan Skin Topi Astronot & Efek Jejak Partikel.",
                duration: "90 Menit",
                tags: ["Skin Shop", "Ekonomi Game", "Kustomisasi"],
                url: "/slides/sesi-22/index.html"
              },"""

new_s22 = """              {
                id: 22,
                num: "SESI 22",
                title: "Brainstorming & Sketsa Storyboard Capstone Level 2",
                desc: "Anak menggambar alur game impian di lembar Game Sheet Beekoding. Perencanaan matang sebelum mulai merangkai balok kode.",
                duration: "90 Menit",
                tags: ["Capstone Level 2", "Game Sheet", "Storyboard"],
                url: "/slides/sesi-22/index.html"
              },"""

if old_s22 in content:
    content = content.replace(old_s22, new_s22)
    index_path.write_text(content, encoding="utf-8")
    print("[OK] Sesi 22 updated in index.html")
else:
    print("[ERROR] old_s22 not found in index.html")
