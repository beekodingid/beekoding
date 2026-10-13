from pathlib import Path

index_path = Path("public/slides/index.html")
content = index_path.read_text(encoding="utf-8")

old_s19 = """              {
                id: 19,
                num: "SESI 19",
                title: "Kontrol Keyboard Multi-Arah vs Mouse",
                desc: "Opsi Kendali Gamer: Panah Keyboard, Tombol WASD, Akselerasi & Navigasi Mouse.",
                duration: "90 Menit",
                tags: ["Keyboard Controls", "WASD", "Smooth Motion"],
                url: "/slides/sesi-19/index.html"
              },"""

new_s19 = """              {
                id: 19,
                num: "SESI 19",
                title: "Game Flappy Bee: Menembus Pipa Rintangan",
                desc: "Scrolling rintangan pipa menyamping dan menjaga ketinggian terbang. Tombol spasi mengepakkan sayap lebah ke atas.",
                duration: "90 Menit",
                tags: ["Flappy Bee", "Scrolling Pipa", "Tombol Spasi"],
                url: "/slides/sesi-19/index.html"
              },"""

if old_s19 in content:
    content = content.replace(old_s19, new_s19)
    index_path.write_text(content, encoding="utf-8")
    print("[OK] Sesi 19 updated in index.html")
else:
    print("[ERROR] old_s19 block not found in index.html")
