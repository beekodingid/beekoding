import os
import json

def build_sesi_14_html():
    target_file = r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\public\slides\sesi-14\index.html"
    
    teacher_notes = [
        {
            "title": "Slide 1: Pembukaan & Antusiasme Game Juice",
            "time": "Menit 00–10 (Total 90 Menit)",
            "instructions": "Buka sesi dengan menyapa siswa penuh energi. Tunjukkan gambar robot Beeby yang dikelilingi bintang berkilau dan angka +1 melayang.",
            "script": "Halo para master programmer Beekoding! Di Sesi 13 kemarin, game tangkap apel kita sudah bisa dimainkan. Tapi hari ini, kita akan menyuntikkan 'Game Juice'—ramuan rahasia pembuat game profesional agar game kita berkilau, ada bintang berhamburan, dan teks skor melayang! Siapa yang mau game-nya jadi 100 kali lebih seru? Angkat tangannya!"
        },
        {
            "title": "Slide 2: Konsep Game Juice & Uji Coba Komparasi",
            "time": "Menit 10–22",
            "instructions": "Gunakan tombol komparasi interaktif di slide. Tunjukkan kepada siswa bedanya bermain di Mode Hambar vs Mode Penuh Game Juice.",
            "script": "Coba lihat simulator di sebelah kanan! Kalau kita klik apel di Mode Hambar: 'klik', skor cuma naik diam-diam, sepi dan membosankan kan? Nah sekarang kakak nyalakan Mode Full Game Juice: 'Ting!' Muncul suara ajaib, bintang meledak berputar, dan angka +1 meluncur ke atas! Terasa beda banget kan sensasinya?"
        },
        {
            "title": "Slide 3: Konsep Kloning Sprite (Sprite Cloning)",
            "time": "Menit 22–32",
            "instructions": "Jelaskan analogi mesin foto kopi atau jurus bayangan Naruto. Tidak perlu menggambar 20 sprite bintang di Scratch.",
            "script": "Kalau kita mau 10 bintang meledak ke segala arah, apakah kita harus gambar 10 bintang satu per satu? Capek dong! Scratch punya jurus ajaib namanya 'Clone' (Kloning). Cukup gambar 1 bintang master, lalu kita perintahkan komputer: buat klon diriku! Klon ini akan lahir, berhamburan, lalu menghilang otomatis."
        },
        {
            "title": "Slide 4: Merakit Teks Skor Terapung & Efek Ghost",
            "time": "Menit 32–42",
            "instructions": "Ajak murid mencoba slider Ghost Effect di simulator. Tunjukkan bahwa 0 adalah solid dan 100 adalah transparan.",
            "script": "Coba geser slider Ghost di layar! Nilai 0 artinya terlihat jelas, tapi makin kita tambah nilainya sampai 100, gambarnya memudar seperti hantu transparan! Kita gabungkan: setiap kali melayang naik (change y by 4), kita pudarkan (change ghost by 10). Hasilnya? Teks melayang lalu lenyap halus!"
        },
        {
            "title": "Slide 5: Ledakan Bintang Partikel 360 Derajat",
            "time": "Menit 42–52",
            "instructions": "Pandu siswa menggunakan blok 'point in direction pick random 0 to 360' agar bintang menyebar ke segala penjuru.",
            "script": "Bagaimana cara membuat ledakan kembang api? Kita putar arah bintang secara acak dari 0 sampai 360 derajat! Lalu biarkan meluncur keluar sambil berputar. Klik tombol Ledakkan Bintang di simulator untuk melihat kembang api mini kita!"
        },
        {
            "title": "Slide 6: Menghubungkan dengan Sinyal Broadcast",
            "time": "Menit 52–62",
            "instructions": "Jelaskan bahwa broadcast adalah walkie-talkie antar sprite. Apel memberi kabar, bintang langsung merespons.",
            "script": "Bagaimana bintang tahu apel sudah ditangkap? Apel berteriak lewat walkie-talkie: 'broadcast Munculkan Efek!'. Begitu mendengar teriakan itu, sprite bintang dan angka +1 langsung melahirkan klonnya detik itu juga!"
        },
        {
            "title": "Slide 7: Praktik Mandiri & Game Playable Interaktif",
            "time": "Menit 62–74",
            "instructions": "Biarkan siswa mencoba game simulator langsung di slide, lalu implementasikan ke proyek Scratch masing-masing.",
            "script": "Ayo mainkan game di layar kalian! Tangkap apelnya dengan mangkuk, rasakan denting loncengnya, perhatikan bintangnya dan angka +1 yang terbang! Sekarang giliran kalian menyusun balok-balok ini di laptop kalian!"
        },
        {
            "title": "Slide 8: Klinik Dokter Kode (Menemukan Bug Kloning)",
            "time": "Menit 74–82",
            "instructions": "Bimbing siswa memahami batas memori 300 klon di Scratch dan pentingnya blok 'delete this clone'.",
            "script": "Dokter Kode datang! Kalau game kalian tiba-tiba macet atau bintangnya berhenti keluar, periksa ujung skrip klonnya. Apakah kalian lupa memasang 'delete this clone'? Komputer tidak boleh menyimpan sampah klon terlalu banyak, jadi harus selalu dihapus setelah selesai dipakai!"
        },
        {
            "title": "Slide 9: Rangkuman & Pesta Konfeti Prestasi",
            "time": "Menit 82–87",
            "instructions": "Ajak seluruh kelas menekan tombol konfeti bersama-sama dan memberikan tepuk tangan meriah.",
            "script": "Luar biasa! Hari ini game tangkap apel kalian sudah naik kelas dari game biasa menjadi game profesional bertabur Game Juice! Tekan tombol konfeti dan beri tepuk tangan untuk kita semua!"
        },
        {
            "title": "Slide 10: Penutup & Teaser Sesi 15 (Countdown Timer)",
            "time": "Menit 87–90",
            "instructions": "Ingatkan siswa untuk menyimpan proyek Scratch ke komputer masing-masing (File -> Save to your computer).",
            "script": "Simpan proyek kalian ya! Pekan depan di Sesi 15, kita akan pasang detak jantung game kita: Timer hitung mundur 30 detik dan alarm bunyi peluit! Siapkan adrenalin kalian, sampai jumpa pekan depan!"
        }
    ]

    notes_json = json.dumps(teacher_notes, indent=6, ensure_ascii=False)

    html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slide Mengajar: Sesi 14 - Efek Partikel & Animasi Skor Terapung (Game Juice) | Beekoding Academy</title>
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Fredoka:wght@600;700&family=JetBrains+Mono:wght@600;700;800&family=Space+Grotesk:wght@700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  <style>
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      background-color: #0b0f19;
      color: #f8fafc;
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      user-select: none;
    }}

    /* Top Navigation Toolbar */
    .top-toolbar {{
      background: #111827;
      border-bottom: 1px solid #1f2937;
      padding: 10px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      height: 60px;
    }}

    .brand-tag {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .brand-link {{
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }}
    .brand-link:hover {{
      transform: scale(1.03);
    }}

    .brand-logo-wrap {{
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }}

    .brand-logo-box {{
      width: 36px;
      height: 36px;
      border-radius: 12px;
      background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
      padding: 2px;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
    }}

    .brand-logo-inner {{
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background: #121520;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }}

    .brand-logo-img {{
      width: 24px;
      height: 24px;
      object-fit: contain;
    }}

    .brand-sparkle-ping {{
      position: absolute;
      top: -2px;
      right: -2px;
      width: 10px;
      height: 10px;
      display: flex;
    }}

    .brand-sparkle-ping .ping-ring {{
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #fbbf24;
      opacity: 0.75;
      animation: brandPing 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
    }}

    .brand-sparkle-ping .ping-dot {{
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #f59e0b;
      box-shadow: 0 0 6px rgba(245, 158, 11, 0.8);
    }}

    @keyframes brandPing {{
      75%, 100% {{
        transform: scale(2.2);
        opacity: 0;
      }}
    }}

    .brand-text-col {{
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }}

    .brand-title {{
      font-family: 'Space Grotesk', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.3px;
    }}

    .brand-title .accent {{
      color: #fbbf24;
    }}

    .brand-subtitle {{
      font-size: 10px;
      font-weight: 600;
      color: #94a3b8;
      letter-spacing: 0.2px;
    }}

    .brand-stage-badge {{
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.3) 100%);
      color: #fbbf24;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid rgba(245, 158, 11, 0.4);
      letter-spacing: 0.5px;
      margin-left: 6px;
      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);
    }}

    .toolbar-actions {{
      display: flex;
      gap: 10px;
      align-items: center;
    }}

    .btn {{
      background: #1f2937;
      color: #f8fafc;
      border: 1px solid #374151;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }}

    .btn:hover {{
      background: #374151;
      border-color: #4b5563;
    }}

    .btn-toggle-notes {{
      background: #f59e0b;
      color: #000000;
      border-color: #d97706;
      font-weight: 700;
    }}

    .btn-toggle-notes:hover {{
      background: #fbbf24;
      border-color: #f59e0b;
    }}

    .btn-nav-sesi {{
      background: #1f2937;
      color: #d1d5db;
      border: 1px solid #374151;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }}

    .btn-nav-sesi:hover {{
      background: #374151;
      color: #ffffff;
      border-color: #4b5563;
    }}

    /* Stage Area */
    .stage-wrapper {{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      position: relative;
    }}

    .slide-viewport {{
      width: 100%;
      max-width: 1200px;
      aspect-ratio: 16 / 9;
      background: #0f172a;
      border-radius: 20px;
      border: 2px solid #334155;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }}

    .slide-canvas {{
      flex: 1;
      width: 100%;
      height: 100%;
      position: relative;
    }}

    .slide {{
      position: absolute;
      inset: 0;
      padding: 32px 48px;
      display: none;
      flex-direction: column;
      justify-content: space-between;
      opacity: 0;
      background: radial-gradient(circle at top right, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 1) 100%);
    }}

    .slide.active {{
      display: flex;
      opacity: 1;
    }}

    .slide-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }}

    .badge-session {{
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.35);
      font-size: 12px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}

    .badge-time {{
      color: #94a3b8;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    .slide-body {{
      flex: 1;
      display: flex;
      gap: 36px;
      align-items: center;
      min-height: 0;
    }}

    .text-column {{
      flex: 1.15;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }}

    .visual-column {{
      flex: 0.95;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      max-height: 430px;
    }}

    .slide-title {{
      font-family: 'Fredoka', cursive;
      font-size: 32px;
      line-height: 1.25;
      color: #ffffff;
      margin-bottom: 6px;
      letter-spacing: -0.3px;
    }}

    .slide-title span {{
      color: #fbbf24;
    }}

    .concept-card {{
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 16px 20px;
      backdrop-filter: blur(8px);
    }}

    .hero-img {{
      width: 100%;
      height: 100%;
      max-height: 380px;
      object-fit: cover;
      border-radius: 16px;
      border: 2px solid #334155;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    }}

    /* Footer & Controls */
    .slide-footer {{
      background: #0f172a;
      border-top: 1px solid #1e293b;
      padding: 14px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 20;
    }}

    .footer-left {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}

    .slide-progress-dots {{
      display: flex;
      gap: 8px;
    }}

    .dot {{
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #334155;
      cursor: pointer;
      transition: all 0.2s;
    }}

    .dot.active {{
      background: #f59e0b;
      transform: scale(1.3);
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
    }}

    .slide-counter {{
      font-size: 13px;
      font-weight: 700;
      color: #94a3b8;
    }}

    .footer-controls {{
      display: flex;
      gap: 10px;
    }}

    .btn-nav {{
      background: #1e293b;
      color: #ffffff;
      border: 1px solid #334155;
      padding: 8px 18px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }}

    .btn-nav:hover:not(:disabled) {{
      background: #334155;
      border-color: #475569;
    }}

    .btn-nav:disabled {{
      opacity: 0.35;
      cursor: not-allowed;
    }}

    .btn-nav.primary {{
      background: #d97706;
      border-color: #b45309;
      color: #ffffff;
    }}

    .btn-nav.primary:hover:not(:disabled) {{
      background: #f59e0b;
      color: #000000;
    }}
/* Teacher Notes Drawer */
    .teacher-notes-panel {{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(15, 23, 42, 0.95);
      border-top: 2px solid #f59e0b;
      padding: 16px 32px;
      backdrop-filter: blur(12px);
      transform: translateY(100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 50;
      max-height: 230px;
      overflow-y: auto;
    }}

    .teacher-notes-panel.open {{
      transform: translateY(0);
    }}

    .notes-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }}

    .notes-title {{
      color: #fbbf24;
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .notes-close {{
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 18px;
      cursor: pointer;
    }}

    .notes-content {{
      font-size: 13.5px;
      line-height: 1.55;
      color: #e2e8f0;
    }}

    .notes-script {{
      background: rgba(245, 158, 11, 0.08);
      border-left: 3px solid #f59e0b;
      padding: 8px 12px;
      margin-top: 6px;
      border-radius: 0 8px 8px 0;
      font-style: italic;
    }}

    /* ================= SCRATCH BLOCKS AUTHENTIC STYLING ================= */
    .block-stack {{
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 440px;
      margin: 8px 0;
      gap: 2px;
    }}

    .scratch-block {{
      border-radius: 8px;
      padding: 7px 13px;
      font-family: 'Fredoka', cursive;
      font-size: 14px;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
      position: relative;
      margin: 2px 0;
      border: 1px solid rgba(255, 255, 255, 0.15);
      font-weight: 600;
    }}

    .scratch-block.event {{
      background: #ffbf00;
      color: #000000;
      border-top-left-radius: 18px;
      border-top-right-radius: 18px;
      font-weight: 700;
    }}

    .scratch-block.control {{
      background: #ffab19;
      color: #ffffff;
    }}

    .scratch-block.motion {{
      background: #4c97ff;
      color: #ffffff;
    }}

    .scratch-block.looks {{
      background: #9966ff;
      color: #ffffff;
    }}

    .scratch-block.sensing {{
      background: #5cb1d6;
      color: #ffffff;
    }}

    .scratch-block.operator {{
      background: #59c059;
      color: #ffffff;
    }}

    .scratch-block.variable {{
      background: #ff8c1a;
      color: #ffffff;
    }}

    .scratch-block.sound {{
      background: #cf63cf;
      color: #ffffff;
    }}

    .scratch-block-c {{
      background: #ffab19;
      border-radius: 8px;
      padding: 6px 10px 8px;
      margin: 3px 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      color: #ffffff;
      font-family: 'Fredoka', cursive;
      font-size: 14px;
      font-weight: 600;
    }}

    .scratch-c-indent {{
      background: rgba(15, 23, 42, 0.4);
      border-left: 12px solid #ffab19;
      padding: 6px 6px 6px 14px;
      margin: 4px 0 4px -2px;
      border-radius: 0 6px 6px 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }}

    .scratch-inline-sensing {{
      background: #5cb1d6;
      border-radius: 999px;
      padding: 2px 9px;
      font-size: 12.5px;
      display: inline-flex;
      align-items: center;
      color: #ffffff;
      font-weight: 600;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.25);
    }}

    .scratch-inline-operator {{
      background: #59c059;
      border-radius: 999px;
      padding: 2px 9px;
      font-size: 12.5px;
      display: inline-flex;
      align-items: center;
      color: #ffffff;
      font-weight: 600;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.25);
    }}

    .scratch-inline-variable {{
      background: #ff8c1a;
      border-radius: 999px;
      padding: 2px 9px;
      font-size: 12.5px;
      display: inline-flex;
      align-items: center;
      color: #ffffff;
      font-weight: 600;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.25);
    }}

    .block-input {{
      background: #ffffff;
      color: #000000;
      border-radius: 999px;
      padding: 1px 8px;
      font-size: 13px;
      font-weight: 800;
      display: inline-block;
      margin: 0 2px;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
    }}

    /* ================= MINI SIMULATORS STYLING ================= */
    .sim-box {{
      background: #090d16;
      border: 2px solid #334155;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      width: 100%;
      max-width: 440px;
      display: flex;
      flex-direction: column;
    }}

    .sim-header {{
      background: #1e293b;
      padding: 8px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #334155;
    }}

    .sim-btns {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .btn-green-flag {{
      background: #10b981;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: transform 0.15s, box-shadow 0.15s;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
    }}
    .btn-green-flag:hover {{
      transform: scale(1.1);
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.7);
    }}

    .btn-red-stop {{
      background: #ef4444;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      transition: transform 0.15s;
    }}
    .btn-red-stop:hover {{
      transform: scale(1.1);
    }}

    .sim-score-badge {{
      background: #090d16;
      border: 1px solid #f59e0b;
      color: #fbbf24;
      font-size: 13px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 999px;
      font-family: 'Fredoka', cursive;
    }}

    .sim-canvas {{
      height: 220px;
      background: linear-gradient(180deg, #0f172a 0%, #1e1b4b 65%, #312e81 100%);
      position: relative;
      overflow: hidden;
      cursor: crosshair;
    }}

    /* Floating +1 Text particle */
    @keyframes floatScoreUp {{
      0% {{
        transform: translateY(0) scale(0.8);
        opacity: 1;
      }}
      100% {{
        transform: translateY(-50px) scale(1.2);
        opacity: 0;
      }}
    }}

    .floating-score-tag {{
      position: absolute;
      font-family: 'Fredoka', cursive;
      font-size: 20px;
      font-weight: 800;
      color: #fbbf24;
      text-shadow: 0 0 8px rgba(251, 191, 36, 0.8), 0 2px 4px #000;
      pointer-events: none;
      animation: floatScoreUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      z-index: 10;
    }}

    /* Star burst particle */
    .star-particle {{
      position: absolute;
      pointer-events: none;
      user-select: none;
      font-size: 18px;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }}
  </style>
</head>
<body>

  <!-- Top Toolbar -->
  <div class="top-toolbar">
    <div class="brand-tag">
      <a href="/" class="brand-link" title="Kembali ke Beranda Beekoding">
        <div class="brand-logo-wrap">
          <div class="brand-logo-box">
            <div class="brand-logo-inner">
              <img src="/beekoding-logo.png" alt="Beekoding Logo" class="brand-logo-img" />
            </div>
          </div>
          <span class="brand-sparkle-ping">
            <span class="ping-ring"></span>
            <span class="ping-dot"></span>
          </span>
        </div>
        <div class="brand-text-col">
          <span class="brand-title">Bee<span class="accent">koding</span></span>
          <span class="brand-subtitle">Platform Edukasi Koding & AI</span>
        </div>
      </a>
      <span class="brand-stage-badge">STAGE 2: SESI 14</span>
    </div>

    <div class="toolbar-actions">
      <a href="/slides/sesi-13/index.html" class="btn-nav-sesi">⏪ Sesi 13</a>
      <a href="/slides/sesi-15/index.html" class="btn-nav-sesi">Sesi 15 ⏩</a>
      <button class="btn btn-toggle-notes" onclick="toggleNotes()">
        📝 Catatan Guru (N)
      </button>
      <button class="btn" onclick="toggleFullscreen()">
        ⛶ Layar Penuh (F)
      </button>
    </div>
  </div>

  <!-- Stage Presentation -->
  <div class="stage-wrapper">
    <div class="slide-viewport">
      <div class="slide-canvas">

      <!-- ================= SLIDE 1: COVER (HERO IMAGE BEEBY GAME JUICE) ================= -->
      <div class="slide active" data-time="⏱️ Menit ke 00–10">
        <div class="slide-header">
          <div class="badge-session">Sesi 14 • Game Feel & Partikel</div>
          <div class="badge-time">⏱️ Menit ke 00–10</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h1 class="slide-title">
              Petualangan Efek Game: <span>Game Juice & Partikel</span>! ✨🎮
            </h1>
            <p style="color: #cbd5e1; font-size: 15.5px; margin: 12px 0 18px; line-height: 1.55;">
              Selamat datang di <strong>SESI 14</strong>! Hari ini kita akan mempelajari rahasia penting para game developer profesional: bagaimana menyulap game biasa menjadi spektakuler dengan <strong>Game Juice</strong>, kloning partikel bintang berkilau, dan efek teks skor <strong>+1</strong> melayang!
            </p>
            <div class="concept-card">
              <div style="color: #fbbf24; font-weight: 800; font-size: 13.5px; margin-bottom: 6px;">🎯 Misi Utama Hari Ini:</div>
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>✨ <strong>Game Juice (Game Feel):</strong> Membuat gameplay terasa renyah dan sangat memuaskan</li>
                <li>🧬 <strong>Kloning Sprite:</strong> Menggandakan bintang dan angka tanpa bikin banyak sprite baru</li>
                <li>👻 <strong>Ghost Transparency:</strong> Mengatur efek pudar dari padat (0) ke tembus pandang (100)</li>
                <li>🎈 <strong>Floating Score (+1):</strong> Teks skor meluncur ke atas lalu menghilang anggun</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <img src="beeby-game-juice.jpg" alt="Game Juice & Partikel Kloning - Beekoding Level 2" class="hero-img" />
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 2: KONSEP GAME JUICE (INTERACTIVE COMPARISON SIMULATOR) ================= -->
      <div class="slide" data-time="⏱️ Menit ke 10–22">
        <div class="slide-header">
          <div class="badge-session">Konsep Dasar • Rahasia Game Dev</div>
          <div class="badge-time">⏱️ Menit ke 10–22</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Mengapa Game Butuh <span>Game Juice</span>? 🤔
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Pernahkah kamu membandingkan makan kerupuk renyah vs kerupuk melempem? <strong>Game Juice</strong> adalah 'kerenyahan' dalam game yang memanjakan panca indra pemain!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>❌ <strong>Game Hambar (No Juice):</strong> Apel hilang seketika, skor naik diam-diam, sepi tanpa jiwa.</li>
                <li>✨ <strong>Game Ber-Juice:</strong> Lonceng berdenting merdu, bintang berkilau meledak, angka +1 melayang!</li>
                <li>🎮 <strong>Efek Psikologis:</strong> Pemain merasa dihargai dan ketagihan ingin terus bermain.</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <!-- Juice Comparison Box -->
            <div class="sim-box">
              <div class="sim-header">
                <span style="font-weight: 800; font-size: 13px; color: #38bdf8;">🧪 Uji Coba: Hambar vs Juicy</span>
                <div class="sim-btns">
                  <button id="btnToggleJuiceMode" onclick="toggleJuiceMode()" style="background: #1e1b4b; border: 1px solid #818cf8; color: #c7d2fe; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; cursor: pointer;">
                    Mode: ✨ Full Juice
                  </button>
                </div>
              </div>

              <div id="juiceStage" style="height: 190px; background: #020617; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; border-bottom: 1px solid #1e293b;">
                <div id="juiceTargetApple" style="font-size: 44px; cursor: pointer; transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);" onclick="simulateCatchEvent(event)" title="Klik Apel untuk Menangkap!">
                  🍎
                </div>
                <div id="juiceBowl" style="font-size: 34px; margin-top: 8px;">
                  🥣
                </div>
                <span style="position: absolute; bottom: 8px; font-size: 11px; color: #64748b;">(Klik Buah Apel untuk Uji Respon!)</span>
              </div>

              <div style="background: #0f172a; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 12px; color: #94a3b8;">
                  Skor: <strong id="juiceScoreText" style="color: #fbbf24; font-size: 16px;">0</strong>
                </div>
                <button onclick="simulateCatchEvent(null)" style="background: #f59e0b; border: none; color: #000; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 8px; cursor: pointer;">
                  ⚡ Tangkap Apel!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 3: SPRITE CLONING (AUTENTIK SCRATCH BLOK) ================= -->
      <div class="slide" data-time="⏱️ Menit ke 22–32">
        <div class="slide-header">
          <div class="badge-session">Mekanik Inti 1 • Pasukan Duplikat</div>
          <div class="badge-time">⏱️ Menit ke 22–32</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Jurus Bayangan: <span>Sprite Cloning</span> 🧬
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Jika kita butuh 10 bintang meledak ke segala arah, apakah kita harus menggambar 10 sprite terpisah? Tentu tidak! Scratch punya fitur <strong>Kloning (Clone)</strong>!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>👑 <strong>Sprite Master:</strong> Cukup 1 sprite asli yang biasanya kita sembunyikan (<code>hide</code>)</li>
                <li>🐣 <strong>Lahirkan Klon:</strong> Blok <code>create clone of (myself)</code> melahirkan kembaran baru</li>
                <li>🎬 <strong>Saat Klon Lahir:</strong> Dipicu oleh balok kepala <code>when I start as a clone</code></li>
                <li>🧹 <strong>Hapus Klon:</strong> Selalu akhiri dengan <code>delete this clone</code> agar laptop tidak lag!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block control">
                create clone of <span class="block-input">myself ▾</span>
              </div>
              <div style="height: 10px;"></div>
              <div class="scratch-block event" style="background: #ffab19; color: #ffffff;">
                when I start as a clone
              </div>
              <div class="scratch-block looks">
                show
              </div>
              <div class="scratch-block-c">
                repeat <span class="block-input">10</span>
                <div class="scratch-c-indent">
                  <div class="scratch-block motion">
                    move <span class="block-input">5</span> steps
                  </div>
                  <div class="scratch-block looks">
                    change <span class="block-input">ghost ▾</span> effect by <span class="block-input">10</span>
                  </div>
                </div>
              </div>
              <div class="scratch-block control" style="background: #e11d48; border-color: #be123c;">
                delete this clone
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 4: EFEK GHOST & TEKS SKOR MELAYANG ================= -->
      <div class="slide" data-time="⏱️ Menit ke 32–42">
        <div class="slide-header">
          <div class="badge-session">Mekanik Inti 2 • Teks Skor Terapung</div>
          <div class="badge-time">⏱️ Menit ke 32–42</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Teks Skor Melayang: <span>+1 Floating Score</span> 🎈
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Saat apel ditangkap, angka <strong>+1</strong> meluncur naik ke atas sambil perlahan memudar menjadi transparan. Ini dibuat menggunakan efek <strong>Ghost (Hantu)</strong>!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>👻 <strong>Ghost = 0:</strong> Warna terlihat jelas dan padat 100%</li>
                <li>🌫️ <strong>Ghost = 50:</strong> Mulai tembus pandang separuh</li>
                <li>💨 <strong>Ghost = 100:</strong> Lenyap sepenuhnya seperti hantu!</li>
                <li>🚀 <strong>Rumus Melayang:</strong> <code>change y by 4</code> + <code>change ghost by 10</code> di dalam repeat 10x</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <span style="font-weight: 800; font-size: 13px; color: #a855f7;">👻 Eksplorasi Ghost Transparency</span>
                <span id="ghostValDisplay" style="color: #c084fc; font-weight: 800; font-size: 12px;">Ghost: 0%</span>
              </div>
              <div style="height: 160px; background: #020617; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
                <div id="ghostPreviewBadge" style="font-family: 'Fredoka', cursive; font-size: 42px; font-weight: 800; color: #fbbf24; text-shadow: 0 0 14px rgba(251, 191, 36, 0.8);">
                  +1
                </div>
                <div style="color: #94a3b8; font-size: 12px; margin-top: 6px;">Status: <span id="ghostStatusText" style="color: #38bdf8;">Padat Nyata</span></div>
              </div>
              <div style="padding: 12px 16px; background: #0f172a;">
                <label style="font-size: 12px; color: #cbd5e1; display: block; margin-bottom: 6px;">Ubah Nilai Ghost Effect (0 s/d 100):</label>
                <input type="range" id="ghostSlider" min="0" max="100" value="0" style="width: 100%; accent-color: #a855f7; cursor: pointer;" oninput="updateGhostSimulator(this.value)">
                <div style="display: flex; justify-content: space-between; font-size: 11px; color: #64748b; margin-top: 4px;">
                  <span>0 (Solid)</span>
                  <span>50 (Tembus Pandang)</span>
                  <span>100 (Gaib)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 5: LEDAKAN BINTANG PARTIKEL (STAR BURST) ================= -->
      <div class="slide" data-time="⏱️ Menit ke 42–52">
        <div class="slide-header">
          <div class="badge-session">Mekanik Inti 3 • Ledakan Bintang 360°</div>
          <div class="badge-time">⏱️ Menit ke 42–52</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Ledakan Kembang Api: <span>Star Burst Particle</span> 🌟
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Agar percikan bintang memancar ke segala arah seperti kembang api, kita arahkan sudut pergerakannya secara acak dari 0 sampai 360 derajat!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🧭 <strong>Arah Acak:</strong> <code>point in direction (pick random 0 to 360)</code></li>
                <li>⚡ <strong>Meluncur Cepat:</strong> <code>move (7) steps</code> di tiap pengulangan</li>
                <li>🔄 <strong>Efek Berputar:</strong> <code>turn ↻ (15) degrees</code> saat melayang</li>
                <li>✨ <strong>Satu Tombol Ledakan:</strong> Uji semburan bintang pada simulator di samping!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <span style="font-weight: 800; font-size: 13px; color: #fbbf24;">⭐ Simulator Semburan Partikel</span>
                <span id="starCloneCounter" style="background: #020617; border: 1px solid #334155; font-size: 11px; padding: 2px 8px; border-radius: 999px; color: #38bdf8;">Klon Aktif: 0</span>
              </div>
              <div id="starBurstStage" style="height: 180px; background: #020617; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                <div style="font-size: 32px; z-index: 5;">✨</div>
              </div>
              <div style="padding: 10px 14px; background: #0f172a; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; color: #cbd5e1;">Picu Ledakan Kembang Api:</span>
                <button onclick="triggerStarBurstDemo()" style="background: linear-gradient(135deg, #f59e0b, #ea580c); border: none; color: #fff; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);">
                  💥 Ledakkan Bintang!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 6: BROADCAST SINYAL TANGKAPAN ================= -->
      <div class="slide" data-time="⏱️ Menit ke 52–62">
        <div class="slide-header">
          <div class="badge-session">Integrasi Proyek • Sinyal Broadcast</div>
          <div class="badge-time">⏱️ Menit ke 52–62</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Walkie-Talkie Antar Sprite: <span>Broadcast Sinyal</span> 📢
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Bagaimana sprite bintang dan angka +1 tahu kapan harus lahir? Sprite Apel mengirimkan sinyal siaran rahasia: <strong>broadcast (Munculkan Efek)</strong>!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🍎 <strong>Sprite Apel (Pengirim):</strong> Menyentuh mangkuk -> kirim siaran broadcast!</li>
                <li>⭐ <strong>Sprite Bintang (Penerima):</strong> Menangkap siaran -> langsung buat 6 klon bintang!</li>
                <li>🎈 <strong>Sprite Angka +1 (Penerima):</strong> Menangkap siaran -> buat 1 klon teks melayang!</li>
                <li>⚡ <strong>Serentak:</strong> Semua efek meledak bersamaan dalam 1 milidetik!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div style="font-size: 12px; color: #fbbf24; font-weight: 800; margin-bottom: 2px;">🍎 KODE SPRITE APEL:</div>
              <div class="scratch-block-c">
                if <span class="scratch-inline-sensing">touching <span class="block-input">Bowl ▾</span> ?</span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block sound">start sound <span class="block-input">Chomp ▾</span></div>
                  <div class="scratch-block variable">change <span class="block-input">Skor ▾</span> by <span class="block-input">1</span></div>
                  <div class="scratch-block event" style="background: #ffab19; color: #fff;">broadcast <span class="block-input">EfekTangkap ▾</span></div>
                  <div class="scratch-block motion">go to x: <span class="scratch-inline-operator">pick random <span class="block-input">-200</span> to <span class="block-input">200</span></span> y: <span class="block-input">160</span></div>
                </div>
              </div>
              <div style="height: 8px;"></div>
              <div style="font-size: 12px; color: #38bdf8; font-weight: 800; margin-bottom: 2px;">⭐ KODE SPRITE BINTANG:</div>
              <div class="scratch-block event">when I receive <span class="block-input">EfekTangkap ▾</span></div>
              <div class="scratch-block motion">go to <span class="block-input">Apple ▾</span></div>
              <div class="scratch-block-c">
                repeat <span class="block-input">6</span>
                <div class="scratch-c-indent">
                  <div class="scratch-block control">create clone of <span class="block-input">myself ▾</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 7: FULL PLAYABLE SIMULATOR WITH JUICE ================= -->
      <div class="slide" data-time="⏱️ Menit ke 62–74">
        <div class="slide-header">
          <div class="badge-session">Playable Arcade • Full Game Juice</div>
          <div class="badge-time">⏱️ Menit ke 62–74</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Mainkan Hasilnya: <span>Game Tangkap Apel Spektakuler</span>! 🎮
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Ayo kita uji hasil mahakarya kita! Gerakkan mangkuk dengan mouse, tangkap apel jatuh, dan saksikan seluruh Game Juice bekerja: suara renyah, ledakan bintang, dan angka skor melayang!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>Klik Bendera Hijau</strong> untuk memulai game</li>
                <li>🖱️ <strong>Gerakkan Mouse ke Kiri & Kanan</strong> untuk menangkap</li>
                <li>✨ Perhatikan teks <strong>+1</strong> melayang ke langit saat apel ditangkap!</li>
                <li>🌟 Perhatikan <strong>percikan bintang</strong> yang menghilang bersih!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <div class="sim-btns">
                  <button class="btn-green-flag" onclick="startPlayableJuiceGame()" title="Mulai Game (Green Flag)">🚩</button>
                  <button class="btn-red-stop" onclick="stopPlayableJuiceGame()" title="Stop Game">🛑</button>
                </div>
                <div class="sim-score-badge">
                  🍎 SKOR: <span id="gameScoreDisplay">0</span>
                </div>
              </div>

              <div id="gamePlayStage" class="sim-canvas" onmousemove="handleGameMouseMove(event)">
                <div id="gameStartOverlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.7); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20;">
                  <span style="font-size: 32px; margin-bottom: 6px;">🕹️</span>
                  <span style="font-size: 13px; font-weight: 700; color: #fbbf24;">Klik 🚩 untuk Mulai Bermain!</span>
                  <span style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Gerakkan kursor mouse untuk geser mangkuk</span>
                </div>

                <!-- Game Actors -->
                <div id="gameActorApple" style="position: absolute; font-size: 26px; transform: translate(-50%, -50%); top: -30px; left: 160px; pointer-events: none;">🍎</div>
                <div id="gameActorBowl" style="position: absolute; font-size: 30px; transform: translate(-50%, -50%); bottom: 10px; left: 160px; pointer-events: none;">🥣</div>
              </div>

              <div style="background: #0f172a; padding: 6px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1e293b; font-size: 11px; color: #94a3b8;">
                <span>Klon Aktif: <strong id="gameActiveClones" style="color: #38bdf8;">0</strong></span>
                <span style="color: #10b981;">● Status: 60 FPS Bersih</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 8: DOKTER KODE & CLINIC DEBUGGING ================= -->
      <div class="slide" data-time="⏱️ Menit ke 74–82">
        <div class="slide-header">
          <div class="badge-session">Klinik Debugging • Temukan Bug Kloning</div>
          <div class="badge-time">⏱️ Menit ke 74–82</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Dokter Kode: <span>Jurus Bebas Lag & Error Kloning</span> 🐛
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Saat menggunakan kloning, ada aturan emas yang tidak boleh dilanggar. Mari bedah bug yang sering terjadi dan cara memperbaikinya!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⚠️ <strong>Batas 300 Klon Scratch:</strong> Komputer hanya menampung 300 klon. Jika penuh, Scratch mogok kerja!</li>
                <li>🧹 <strong>Wajib Hapus:</strong> Selalu taruh <code>delete this clone</code> di baris terakhir skrip klon.</li>
                <li>👁️ <strong>Lupa Blok Show:</strong> Jika sprite asli di-<code>hide</code>, klon juga lahir tersembunyi. Wajib beri <code>show</code> saat klon lahir!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
              <!-- Wrong Code Box -->
              <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 12px 16px;">
                <div style="display: flex; align-items: center; gap: 8px; color: #ef4444; font-weight: 800; font-size: 13px; margin-bottom: 6px;">
                  <span>❌ KODE SALAH: Lupa Menghapus Klon</span>
                </div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; line-height: 1.5; background: #0b0f19; padding: 8px; border-radius: 6px;">
                  when I start as a clone<br>
                  &nbsp;&nbsp;repeat (10) [ change y by 4 ]<br>
                  <span style="color: #ef4444; font-weight: 700;">&nbsp;&nbsp;(TIDAK ADA delete this clone -> Layar Macet!)</span>
                </div>
              </div>

              <!-- Right Code Box -->
              <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 12px; padding: 12px 16px;">
                <div style="display: flex; align-items: center; gap: 8px; color: #10b981; font-weight: 800; font-size: 13px; margin-bottom: 6px;">
                  <span>✅ KODE BENAR: Bersih & Ringan</span>
                </div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; line-height: 1.5; background: #0b0f19; padding: 8px; border-radius: 6px;">
                  when I start as a clone<br>
                  &nbsp;&nbsp;show<br>
                  &nbsp;&nbsp;repeat (10) [ change y by 4, change ghost by 10 ]<br>
                  <span style="color: #10b981; font-weight: 800;">&nbsp;&nbsp;delete this clone ✅</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 9: RANGKUMAN & APRESIASI ================= -->
      <div class="slide" data-time="⏱️ Menit ke 82–87">
        <div class="slide-header">
          <div class="badge-session">Review Pemahaman • Sukses Stage 2 Sesi 14</div>
          <div class="badge-time">⏱️ Menit ke 82–87</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Hebat Sekali! <span>Review Kunci Hari Ini</span> 🌟
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Game Tangkap Apel buatanmu sekarang sudah sejajar dengan game komersial sungguhan! Mari ingat 4 konsep kunci hari ini:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>1️⃣ <strong>Game Juice:</strong> Memberi umpan balik audiovisual yang memuaskan pemain</li>
                <li>2️⃣ <strong>Sprite Cloning:</strong> Menggandakan sprite secara dinamis saat game berjalan</li>
                <li>3️⃣ <strong>Ghost Effect:</strong> Mengatur transparansi visual secara halus dari 0% ke 100%</li>
                <li>4️⃣ <strong>Delete This Clone:</strong> Menghapus klon agar performa game tetap 60 FPS kencang</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(245, 158, 11, 0.1); border: 2px solid #f59e0b; border-radius: 16px; padding: 24px; text-align: center; width: 100%;">
              <div style="font-size: 48px; margin-bottom: 10px;">🏆🎉</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 6px;">Programmer Kelas Dunia!</h3>
              <p style="color: #cbd5e1; font-size: 13.5px; line-height: 1.5;">Kamu telah berhasil menguasai seni Game Juice dan Kloning Sprite di Scratch 3.0!</p>
              <button onclick="triggerConfetti()" style="margin-top: 14px; background: #000; color: #fbbf24; border: 1px solid #fbbf24; padding: 10px 20px; border-radius: 999px; font-weight: 800; cursor: pointer; transition: transform 0.15s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                🎊 Rayakan Keberhasilan (Klik Confetti)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 10: PENUTUP & TEASER SESI 15 ================= -->
      <div class="slide" data-time="⏱️ Menit ke 87–90">
        <div class="slide-header">
          <div class="badge-session">Teaser Sesi Berikutnya • Menuju Sesi 15</div>
          <div class="badge-time">⏱️ Menit ke 87–90</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Tantangan Berikutnya: <span>Sistem Timer 30 Detik!</span> ⏱️⚡
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Di Sesi 15 pekan depan, kita akan memacu adrenalin pemain dengan menambahkan batas waktu yang mendebarkan!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⏳ <strong>Variabel Timer:</strong> Menghitung mundur dari 30 -> 29 -> 28 hingga 0 detik</li>
                <li>📢 <strong>Alarm Broadcast:</strong> Suara peluit berbunyi nyaring saat waktu habis!</li>
                <li>🏆 <strong>Layar Game Over:</strong> Menampilkan skor akhir dan tombol 'Main Lagi'</li>
                <li>💾 <strong>Simpan Proyekmu:</strong> Klik <code>File ➔ Save to your computer</code> sekarang!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(30, 41, 59, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 26px; text-align: center; width: 100%;">
              <div style="font-size: 52px; margin-bottom: 10px;">⏱️🚨</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Sesi 15: Timer & Alarm Kemenangan</h3>
              <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.5;">Siapkan fokusmu untuk adu cepat menangkap apel sebanyak mungkin dalam 30 detik!</p>
            </div>
          </div>
        </div>
      </div>

      
      </div><!-- .slide-canvas -->

      <!-- Slide Footer Bar -->
      <footer class="slide-footer">
        <div class="footer-left">
          <div class="slide-progress-dots" id="progressDots"></div>
          <span class="slide-counter" id="slideCounter">Slide 1 / 10</span>
        </div>
        <div class="footer-controls">
          <button class="btn-nav" id="prevBtn" disabled>◀ Sebelumnya</button>
          <button class="btn-nav primary" id="nextBtn">Selanjutnya ▶</button>
        </div>
      </footer>

      <!-- Teacher Notes Drawer Panel -->
      <div id="teacherNotesPanel" class="teacher-notes-panel">
        <div class="notes-header">
          <div class="notes-title">
            <span>📋 CATATAN GURU & PANDUAN MENGAJAR</span>
            <span id="notesBadge" style="font-size: 11px; color: #94a3b8; font-weight: 600;">(Slide 1 dari 10)</span>
          </div>
          <button class="notes-close" onclick="toggleNotes()">✕</button>
        </div>
        <div class="notes-content">
          <div id="notesInstructions" style="color: #94a3b8; margin-bottom: 6px;"></div>
          <div id="notesScript" class="notes-script"></div>
        </div>
      </div>

    </div><!-- .slide-viewport -->
  </div><!-- .stage-wrapper -->

  <script>
    // Speaker Notes Data
    const notesData = {notes_json};

    let currentSlide = 1;
    const totalSlides = 10;
    let notesOpen = false;

    // Audio Synthesizer (Web Audio API)
    let audioCtx = null;
    function getAudioContext() {{
      if (!audioCtx) {{
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }}
      if (audioCtx.state === 'suspended') {{
        audioCtx.resume();
      }}
      return audioCtx;
    }}

    // Play Magic Sparkle Chime
    function playSparkleAudio() {{
      try {{
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((freq, idx) => {{
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.18, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.28);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.3);
        }});
      }} catch(e) {{}}
    }}

    // Play Chomp Crunch
    function playChompAudio() {{
      try {{
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.13);
      }} catch(e) {{}}
    }}

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const progressDots = document.getElementById('progressDots');

    // Create progress dots
    progressDots.innerHTML = '';
    for (let i = 1; i <= totalSlides; i++) {{
      const dot = document.createElement('div');
      dot.className = `dot ${{i === 1 ? 'active' : ''}}`;
      dot.addEventListener('click', () => goToSlide(i));
      progressDots.appendChild(dot);
    }}

    const dots = document.querySelectorAll('.dot');

    // Slide Navigation
    function goToSlide(n) {{
      currentSlide = Math.max(1, Math.min(totalSlides, n));
      updateSlide();
    }}

    function updateSlide() {{
      slides.forEach((sl, idx) => {{
        sl.classList.toggle('active', idx + 1 === currentSlide);
      }});

      dots.forEach((dot, idx) => {{
        dot.classList.toggle('active', idx + 1 === currentSlide);
      }});

      if (slideCounter) {{
        slideCounter.textContent = `Slide ${{currentSlide}} / ${{totalSlides}}`;
      }}
      if (prevBtn) prevBtn.disabled = currentSlide === 1;
      if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;

      // Update teacher notes
      const note = notesData[currentSlide - 1];
      if (note) {{
        const b = document.getElementById('notesBadge');
        if (b) b.innerText = `Slide ${{currentSlide}} • ${{note.time}}`;
        const inst = document.getElementById('notesInstructions');
        if (inst) inst.innerHTML = `<strong>Instruksi Guru:</strong> ${{note.instructions}}`;
        const sc = document.getElementById('notesScript');
        if (sc) sc.innerText = `"${{note.script}}"`;
      }}
    }}

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    function toggleNotes() {{
      const panel = document.getElementById('teacherNotesPanel');
      notesOpen = !notesOpen;
      if (notesOpen) {{
        panel.classList.add('open');
      }} else {{
        panel.classList.remove('open');
      }}
    }}

    function toggleFullscreen() {{
      if (!document.fullscreenElement) {{
        document.documentElement.requestFullscreen().catch(err => {{}});
      }} else {{
        document.exitFullscreen().catch(err => {{}});
      }}
    }}

    function triggerConfetti() {{
      if (typeof confetti === 'function') {{
        confetti({{
          particleCount: 80,
          spread: 70,
          origin: {{ y: 0.6 }}
        }});
      }}
    }}

    // ================= SIMULATOR 1: JUICE COMPARISON =================
    let isJuicyMode = true;
    let juiceScore = 0;

    function toggleJuiceMode() {{
      isJuicyMode = !isJuicyMode;
      const btn = document.getElementById('btnToggleJuiceMode');
      if (isJuicyMode) {{
        btn.innerText = 'Mode: ✨ Full Juice';
        btn.style.background = '#1e1b4b';
        btn.style.borderColor = '#818cf8';
        btn.style.color = '#c7d2fe';
      }} else {{
        btn.innerText = 'Mode: ❌ Hambar (No Juice)';
        btn.style.background = '#1f2937';
        btn.style.borderColor = '#475569';
        btn.style.color = '#94a3b8';
      }}
    }}

    function simulateCatchEvent(e) {{
      juiceScore++;
      document.getElementById('juiceScoreText').innerText = juiceScore;

      const stage = document.getElementById('juiceStage');
      const apple = document.getElementById('juiceTargetApple');

      if (!isJuicyMode) {{
        // Dull flat response
        apple.style.opacity = '0.3';
        setTimeout(() => {{ apple.style.opacity = '1'; }}, 150);
        return;
      }}

      // JUICY RESPONSE!
      playSparkleAudio();
      apple.style.transform = 'scale(1.35) rotate(-15deg)';
      setTimeout(() => {{
        apple.style.transform = 'scale(1) rotate(0deg)';
      }}, 200);

      // Spawn floating +1
      const scoreTag = document.createElement('div');
      scoreTag.className = 'floating-score-tag';
      scoreTag.innerText = '+1';
      scoreTag.style.left = '50%';
      scoreTag.style.top = '40%';
      stage.appendChild(scoreTag);
      setTimeout(() => scoreTag.remove(), 800);

      // Spawn 8 star particles
      const starColors = ['⭐', '✨', '🌟'];
      for (let i = 0; i < 8; i++) {{
        const star = document.createElement('div');
        star.className = 'star-particle';
        star.innerText = starColors[i % starColors.length];
        const angle = (i / 8) * (2 * Math.PI);
        const dist = 60 + Math.random() * 30;
        star.style.left = '50%';
        star.style.top = '45%';
        stage.appendChild(star);

        requestAnimationFrame(() => {{
          star.style.transform = `translate(${{Math.cos(angle) * dist}}px, ${{Math.sin(angle) * dist}}px) rotate(${{Math.random() * 360}}deg)`;
          star.style.opacity = '0';
        }});

        setTimeout(() => star.remove(), 600);
      }}
    }}

    // ================= SIMULATOR 2: GHOST EFFECT SIMULATOR =================
    function updateGhostSimulator(val) {{
      document.getElementById('ghostValDisplay').innerText = `Ghost: ${{val}}%`;
      const badge = document.getElementById('ghostPreviewBadge');
      const opacity = (100 - val) / 100;
      badge.style.opacity = opacity;

      const statusText = document.getElementById('ghostStatusText');
      if (val == 0) {{
        statusText.innerText = 'Padat Nyata (Solid)';
        statusText.style.color = '#38bdf8';
      }} else if (val < 50) {{
        statusText.innerText = 'Agak Transparan';
        statusText.style.color = '#fbbf24';
      }} else if (val < 95) {{
        statusText.innerText = 'Tembus Pandang (Hantu)';
        statusText.style.color = '#f97316';
      }} else {{
        statusText.innerText = 'Lenyap Sepenuhnya (Gaib)';
        statusText.style.color = '#ef4444';
      }}
    }}

    // ================= SIMULATOR 3: STAR BURST PARTICLES DEMO =================
    let starCloneCount = 0;
    function triggerStarBurstDemo() {{
      const stage = document.getElementById('starBurstStage');
      playSparkleAudio();

      const numStars = 10;
      starCloneCount += numStars;
      document.getElementById('starCloneCounter').innerText = `Klon Aktif: ${{starCloneCount}}`;

      for (let i = 0; i < numStars; i++) {{
        const p = document.createElement('div');
        p.className = 'star-particle';
        p.innerText = ['⭐', '✨', '🌟', '💫'][i % 4];
        const angle = Math.random() * 2 * Math.PI;
        const dist = 50 + Math.random() * 60;
        p.style.left = '50%';
        p.style.top = '50%';
        p.style.fontSize = `${{14 + Math.random() * 12}}px`;
        stage.appendChild(p);

        requestAnimationFrame(() => {{
          p.style.transform = `translate(${{Math.cos(angle) * dist}}px, ${{Math.sin(angle) * dist}}px) rotate(${{Math.random() * 360}}deg)`;
          p.style.opacity = '0';
        }});

        setTimeout(() => {{
          p.remove();
          starCloneCount = Math.max(0, starCloneCount - 1);
          document.getElementById('starCloneCounter').innerText = `Klon Aktif: ${{starCloneCount}}`;
        }}, 650);
      }}
    }}

    // ================= SIMULATOR 4: FULL PLAYABLE GAME =================
    let gameRunning = false;
    let gameScore = 0;
    let gameAppleX = 160;
    let gameAppleY = -20;
    let gameBowlX = 160;
    let gameAnimId = null;
    let gameActiveClonesCount = 0;

    function startPlayableJuiceGame() {{
      gameRunning = true;
      gameScore = 0;
      gameActiveClonesCount = 0;
      document.getElementById('gameScoreDisplay').innerText = gameScore;
      document.getElementById('gameActiveClones').innerText = 0;
      document.getElementById('gameStartOverlay').style.display = 'none';

      gameAppleY = -20;
      gameAppleX = Math.floor(Math.random() * 280) + 20;

      if (gameAnimId) cancelAnimationFrame(gameAnimId);
      gameGameLoop();
    }}

    function stopPlayableJuiceGame() {{
      gameRunning = false;
      if (gameAnimId) cancelAnimationFrame(gameAnimId);
      document.getElementById('gameStartOverlay').style.display = 'flex';
    }}

    function handleGameMouseMove(e) {{
      if (!gameRunning) return;
      const stage = document.getElementById('gamePlayStage');
      const rect = stage.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      mouseX = Math.max(25, Math.min(rect.width - 25, mouseX));
      gameBowlX = mouseX;

      const bowlEl = document.getElementById('gameActorBowl');
      if (bowlEl) bowlEl.style.left = `${{gameBowlX}}px`;
    }}

    function gameGameLoop() {{
      if (!gameRunning) return;

      gameAppleY += 4.2;
      const stage = document.getElementById('gamePlayStage');
      const stageH = stage.clientHeight || 220;
      const bowlTop = stageH - 35;

      // Catch check
      if (gameAppleY >= bowlTop - 20 && gameAppleY <= bowlTop + 15) {{
        if (Math.abs(gameAppleX - gameBowlX) < 38) {{
          // CATCH!
          gameScore++;
          document.getElementById('gameScoreDisplay').innerText = gameScore;
          playChompAudio();
          playSparkleAudio();

          // Spawn floating +1
          spawnGameScoreBubble(gameAppleX, gameAppleY);
          // Spawn burst stars
          spawnGameStarBurst(gameAppleX, gameAppleY);

          // Reset apple
          gameAppleY = -25;
          gameAppleX = Math.floor(Math.random() * (stage.clientWidth - 50)) + 25;
        }}
      }}

      // Miss check
      if (gameAppleY > stageH + 20) {{
        gameAppleY = -25;
        gameAppleX = Math.floor(Math.random() * (stage.clientWidth - 50)) + 25;
      }}

      const appleEl = document.getElementById('gameActorApple');
      if (appleEl) {{
        appleEl.style.left = `${{gameAppleX}}px`;
        appleEl.style.top = `${{gameAppleY}}px`;
      }}

      gameAnimId = requestAnimationFrame(gameGameLoop);
    }}

    function spawnGameScoreBubble(x, y) {{
      const stage = document.getElementById('gamePlayStage');
      const bubble = document.createElement('div');
      bubble.className = 'floating-score-tag';
      bubble.innerText = '+1';
      bubble.style.left = `${{x}}px`;
      bubble.style.top = `${{y}}px`;
      stage.appendChild(bubble);

      gameActiveClonesCount++;
      document.getElementById('gameActiveClones').innerText = gameActiveClonesCount;

      setTimeout(() => {{
        bubble.remove();
        gameActiveClonesCount = Math.max(0, gameActiveClonesCount - 1);
        document.getElementById('gameActiveClones').innerText = gameActiveClonesCount;
      }}, 800);
    }}

    function spawnGameStarBurst(x, y) {{
      const stage = document.getElementById('gamePlayStage');
      for (let i = 0; i < 6; i++) {{
        const star = document.createElement('div');
        star.className = 'star-particle';
        star.innerText = ['⭐', '✨', '🌟'][i % 3];
        const angle = Math.random() * 2 * Math.PI;
        const dist = 35 + Math.random() * 40;
        star.style.left = `${{x}}px`;
        star.style.top = `${{y}}px`;
        stage.appendChild(star);

        gameActiveClonesCount++;
        document.getElementById('gameActiveClones').innerText = gameActiveClonesCount;

        requestAnimationFrame(() => {{
          star.style.transform = `translate(${{Math.cos(angle) * dist}}px, ${{Math.sin(angle) * dist}}px) rotate(${{Math.random() * 360}}deg)`;
          star.style.opacity = '0';
        }});

        setTimeout(() => {{
          star.remove();
          gameActiveClonesCount = Math.max(0, gameActiveClonesCount - 1);
          document.getElementById('gameActiveClones').innerText = gameActiveClonesCount;
        }}, 600);
      }}
    }}

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {{
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {{
        goToSlide(currentSlide + 1);
      }} else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {{
        goToSlide(currentSlide - 1);
      }} else if (e.key === 'n' || e.key === 'N') {{
        toggleNotes();
      }} else if (e.key === 'f' || e.key === 'F') {{
        toggleFullscreen();
      }}
    }});

    // Initialize
    updateSlide();
  </script>
</body>
</html>
"""

    with open(target_file, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Successfully generated {target_file}")

if __name__ == "__main__":
    build_sesi_14_html()
