import os
import sys
import json
import shutil
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

ARTIFACT_DIR = Path(r"C:\Users\devop\.gemini\antigravity\brain\645a5bda-8de7-4b62-a0d1-1f8ba42f03f5")
SESI18_DIR = Path(r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\public\slides\sesi-18")
SESI18_HTML_PATH = SESI18_DIR / "index.html"

def build_sesi18():
    # Copy 3D flying/jumping hero image
    src_img = ARTIFACT_DIR / "beeby_flying_3d_1791793648391.jpg"
    dest_img = SESI18_DIR / "beeby-jump.jpg"
    if src_img.exists():
        shutil.copy2(src_img, dest_img)
        print(f"[OK] Copied {src_img.name} to {dest_img.name}")

    # Read existing styling to keep 100% exact styling
    existing_html = SESI18_HTML_PATH.read_text(encoding="utf-8")
    style_start = existing_html.find("<style>")
    style_end = existing_html.find("</style>") + len("</style>")
    style_block = existing_html[style_start:style_end]

    notes = [
        {
            "title": "Slide 1: Pembukaan & Sambutan Sesi 18",
            "time": "Menit 00–10 (Total 90 Menit)",
            "instructions": "Sambut siswa dengan antusiasme membuat mekanik game legendaris ala Mario Bros! Tunjukkan ilustrasi 3D Beeby yang melompat di udara pada layar proyektor.",
            "script": "Halo para Game Creator Hebat! Selamat datang di Sesi 18! Siapa di sini yang pernah main game Super Mario Bros atau Sonic? Pernahkah kalian bertanya-tanya, bagaimana cara membuat karakter melompat ke atas lalu mendarat kembali ke tanah? Hari ini kita akan membongkar rahasia kodingnya!"
        },
        {
            "title": "Slide 2: Konsep Dasar & Simulator Fisika Lompatan",
            "time": "Menit 10–22",
            "instructions": "Jelaskan konsep gaya dorong ke atas (Sumbu Y positif) dan gaya gravitasi yang menarik ke bawah (Sumbu Y negatif). Demonstrasikan simulator lompat interaktif di layar kanan.",
            "script": "Coba perhatikan simulator di layar sebelah kanan! Saat kita melompat di dunia nyata, kaki kita mendorong tubuh ke atas. Tapi kemudian gaya gravitasi bumi menarik kita kembali ke tanah! Di koding, kita buat Beeby naik ke atas dengan change y by (8), lalu ditarik gravitasi turun dengan change y by (-8)!"
        },
        {
            "title": "Slide 3: Balok Kunci & Menyiapkan Posisi Awal di Tanah",
            "time": "Menit 22–32",
            "instructions": "Bimbing siswa mengatur koordinat awal karakter di atas tanah dan membuat variabel penanda 'StatusLompat'.",
            "script": "Sebelum bisa melompat, karakter kita harus berdiri kokoh di atas tanah! Kita tentukan koordinat Y di dasar layar, misalnya y: -100, dan kita beri tanda bahwa karakter sedang berada di tanah!"
        },
        {
            "title": "Slide 4: Logika Inti: repeat (10) [+8] -> repeat (10) [-8]",
            "time": "Menit 32–42",
            "instructions": "Pandu siswa merakit balok pemicu tombol spasi: repeat (10) change y by (8) dilanjutkan repeat (10) change y by (-8).",
            "script": "Inilah rumus emas lompatan game kita! Ketika tombol SPASI ditekan: kita ulangi 10 kali change y by (8) untuk meluncur ke atas, lalu segera kita sambung dengan 10 kali change y by (-8) untuk jatuh kembali ke tanah! Perhatikan bagaimana pergerakannya terasa sangat halus!"
        },
        {
            "title": "Slide 5: Mencegah 'Infinite Flying' (Spam Tombol Spasi)",
            "time": "Menit 42–52",
            "instructions": "Jelaskan mengapa kita butuh pengaman kondisi if <StatusLompat = Tanah> agar pemain tidak bisa terbang ke luar layar dengan menekan spasi berulang kali.",
            "script": "Bayangkan kalau pemain memencet tombol spasi 100 kali berturut-turut! Karakternya bisa terbang menembus awan dan hilang dari layar! Makanya kita pasang gembok logika: karakter hanya boleh melompat jika kakinya sedang menyentuh tanah!"
        },
        {
            "title": "Slide 6: Alur Algoritma Lompatan Sempurna",
            "time": "Menit 52–62",
            "instructions": "Review alur 4 fase: Tekan Tombol -> Meluncur Naik (Ascent) -> Puncak Lompatan (Apex) -> Ditarik Gravitasi (Descent) -> Mendarat di Tanah.",
            "script": "Mari kita lihat fase lompatan: dari dorongan naik, berhenti sejenak di puncak tertinggi, ditarik gravitasi bumi, sampai mendarat mulus di tanah!"
        },
        {
            "title": "Slide 7: Playable Arcade: Lompati Rintangan",
            "time": "Menit 62–74",
            "instructions": "Ajak siswa mencoba playable simulator game lari & lompat di slide. Minta mereka menekan spasi untuk melompati rintangan kayu/batu yang datang dari kanan.",
            "script": "Waktunya bermain! Tekan tombol SPASI pada keyboard kalian tepat pada waktunya untuk melompati rintangan yang meluncur! Siapa yang bisa melompati 10 rintangan berturut-turut?"
        },
        {
            "title": "Slide 8: Klinik Dokter Kode: Mengatasi Karakter Tersangkut di Langit",
            "time": "Menit 74–82",
            "instructions": "Bahas bug umum di mana karakter melompat ke atas tapi lupa diberi balok turun (-8), sehingga tersangkut di langit.",
            "script": "Dokter Kode hadir! Kalau karakter kalian melompat ke atas tapi tidak mau turun lagi, periksa apakah kalian lupa memasang repeat 10 change y by (-8)! Ingat, apa yang naik ke atas harus ditarik kembali ke bawah!"
        },
        {
            "title": "Slide 9: Rangkuman & Pesta Apresiasi Platformer",
            "time": "Menit 82–87",
            "instructions": "Ajak siswa merayakan keberhasilan merakit fondasi game platformer dengan menekan tombol konfeti bersama.",
            "script": "Luar biasa! Hari ini kalian resmi menguasai rumus fisika lompat yang digunakan oleh pembuat game Mario Bros di seluruh dunia! Klik tombol konfeti untuk merayakan mahakarya kalian!"
        },
        {
            "title": "Slide 10: Penutup & Teaser Sesi 19",
            "time": "Menit 87–90",
            "instructions": "Ingatkan siswa menyimpan file proyek Scratch (.sb3) dan berikan teaser kontrol ganda Keyboard WASD & Panah di Sesi 19.",
            "script": "Simpan proyek kalian ke komputer ya! Di Sesi 19 pekan depan, kita akan menambahkan kontrol kemudi lari ke kiri dan kanan menggunakan tombol Panah dan WASD! Sampai jumpa, para juara!"
        }
    ]
    notes_json = json.dumps(notes, indent=6, ensure_ascii=False)

    slides_html = """      <!-- ================= SLIDE 1: COVER ================= -->
      <div class="slide active" data-time="⏱️ Menit ke 00–10">
        <div class="slide-header">
          <div class="badge-session">Sesi 18 • Fisika Lompat</div>
          <div class="badge-time">⏱️ Menit ke 00–10</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h1 class="slide-title">
              Misi Platformer: <span>Fisika Lompat &amp; Gravitasi Sederhana</span>! 🚀
            </h1>
            <p style="color: #cbd5e1; font-size: 15.5px; margin: 12px 0 18px; line-height: 1.55;">
              Selamat datang di <strong>STAGE 2: SESI 18</strong>! Hari ini kita membongkar rahasia mekanik game legendaris: <strong>Karakter Melompat ke Atas Lalu Tertarik Kembali ke Tanah oleh Gravitasi</strong>. Inilah fondasi utama dalam menciptakan game petualangan seru ala Super Mario Bros!
            </p>
            <div class="concept-card">
              <div style="color: #fbbf24; font-weight: 800; font-size: 13.5px; margin-bottom: 6px;">🎯 Misi Utama Hari Ini:</div>
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚀 <strong>Konsep &amp; Inti:</strong> Karakter melompat ke atas lalu tertarik kembali ke tanah</li>
                <li>🧩 <strong>Instruksi / Kode:</strong> <code>repeat (10) [change y by (8)] ➔ repeat (10) [change y by (-8)]</code></li>
                <li>🕹️ <strong>Fondasi Platformer:</strong> Teknik dasar pembuatan game lompat rintangan ala Mario Bros</li>
                <li>⚖️ <strong>Hukum Gravitasi:</strong> Gerakan dorong vertikal (+Y) diimbangi tarikan jatuh (-Y)</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <img src="beeby-jump.jpg" alt="Fisika Lompat Sederhana - Beekoding Level 2" class="hero-img" />
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 2: KONSEP DASAR & SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 10–22">
        <div class="slide-header">
          <div class="badge-session">Konsep Dasar • Gaya Dorong &amp; Gravitasi Bumi</div>
          <div class="badge-time">⏱️ Menit ke 10–22</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Cara Kerja Lompatan: <span>Dorong Naik ➔ Tarik Turun</span> 🤔
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Di dunia nyata maupun dunia game, lompatan bukanlah perpindahan sekejap (*teleport*). Karakter meluncur ke atas karena tenaga dorong, lalu ditarik kembali oleh gravitasi bumi!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⬆️ <strong>Fase Naik (Ascent):</strong> <code>change y by (8)</code> diulang 10 kali membawa karakter terbang ke langit</li>
                <li>⛰️ <strong>Puncak Lompatan (Apex):</strong> Titik tertinggi di mana tenaga dorong habis</li>
                <li>⬇️ <strong>Fase Turun (Descent):</strong> <code>change y by (-8)</code> diulang 10 kali menarik karakter kembali ke tanah</li>
                <li>🧱 <strong>Mendarat Mulus:</strong> Karakter berhenti tepat di lantai tanpa tembus ke bawah!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <span style="font-weight: 800; font-size: 13px; color: #38bdf8;">🚀 Simulator Fisika Lompatan</span>
                <span id="sim2PhaseBadge" style="color: #10b981; font-size: 12px; font-weight: 700;">Di Tanah (Siap Melompat)</span>
              </div>
              <div id="sim2Stage" style="height: 190px; background: linear-gradient(180deg, #090d16 0%, #1e293b 80%, #064e3b 81%, #047857 100%); display: flex; flex-direction: column; align-items: center; justify-content: flex-end; position: relative; padding: 12px; overflow: hidden;">
                <!-- Indikator Ketinggian -->
                <div style="position: absolute; top: 10px; right: 12px; background: rgba(0,0,0,0.6); border: 1px solid #334155; padding: 4px 10px; border-radius: 8px; font-size: 11px; color: #cbd5e1; font-family: 'JetBrains Mono', monospace;">
                  Tinggi Y: <span id="sim2YPosDisplay" style="color: #fbbf24; font-weight: 800;">-100</span>
                </div>

                <!-- Jalur Busur Lompatan (Arc) -->
                <div style="position: absolute; bottom: 30px; width: 140px; height: 90px; border: 2px dashed rgba(245, 158, 11, 0.3); border-bottom: none; border-radius: 999px 999px 0 0; pointer-events: none;"></div>

                <!-- Sprite Beeby Melompat -->
                <div id="sim2BeebySprite" style="font-size: 38px; transform: translateY(0); transition: transform 0.05s linear; margin-bottom: 24px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5));">
                  🐝
                </div>

                <div id="sim2SubText" style="position: absolute; bottom: 4px; color: #a7f3d0; font-size: 10.5px; font-weight: 700;">
                  Lantai Tanah Hijau (y: -100)
                </div>
              </div>
              <div style="padding: 10px 14px; background: #0f172a; display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                <button id="sim2JumpBtn" onclick="triggerSim2Jump()" style="background: #f59e0b; border: none; color: #000; font-size: 12px; font-weight: 800; padding: 7px 16px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                  🚀 Tekan SPASI (Lompat!)
                </button>
                <button onclick="resetSim2Jump()" style="background: #1e293b; border: 1px solid #475569; color: #cbd5e1; font-size: 11.5px; font-weight: 700; padding: 7px 12px; border-radius: 8px; cursor: pointer;">
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 3: BALOK KUNCI UTAMA ================= -->
      <div class="slide" data-time="⏱️ Menit ke 22–32">
        <div class="slide-header">
          <div class="badge-session">Bedah Balok Kode • Inisialisasi Posisi Karakter</div>
          <div class="badge-time">⏱️ Menit ke 22–32</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Balok Kunci: <span>Pijakan di Atas Tanah</span> 🧩
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Sebelum karakter bisa melompat, ia harus berdiri di lantai dasar. Di Scratch, kita kunci posisi awalnya di koordinat <code>y: -100</code> dan buat variabel <code>StatusLompat</code>!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>when ⚑ clicked:</strong> Meletakkan karakter di titik awal</li>
                <li>📍 <strong>go to x: (-150) y: (-100):</strong> Menempatkan karakter kokoh di atas tanah</li>
                <li>🔒 <strong>set [StatusLompat] to [Tanah]:</strong> Mengaktifkan izin melompat</li>
                <li>💬 <strong>say:</strong> Memberi instruksi ke pemain untuk menekan tombol SPASI</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block motion">
                go to x: <span class="block-input">-150</span> y: <span class="block-input">-100</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">StatusLompat ▾</span> to <span class="block-input">"Tanah"</span>
              </div>
              <div class="scratch-block looks">
                say <span class="block-input">"Tekan SPASI untuk Melompat! 🚀"</span> for <span class="block-input">2</span> secs
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 4: LOGIKA KONDISI & KEPUTUSAN ================= -->
      <div class="slide" data-time="⏱️ Menit ke 32–42">
        <div class="slide-header">
          <div class="badge-session">Mekanik Inti • Rumus Lompat &amp; Gravitasi</div>
          <div class="badge-time">⏱️ Menit ke 32–42</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Rumus Lompat: <span>repeat (10) [8] ➔ repeat (10) [-8]</span> ⚡
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Inilah instruksi inti fisika lompatan kita: ulangi 10 kali perubahan Y sebesar <code>8</code> untuk meluncur naik, lalu ulangi 10 kali perubahan Y sebesar <code>-8</code> untuk ditarik gravitasi kembali ke tanah!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⌨️ <strong>when [space] key pressed:</strong> Pemicu aksi dari jari pemain</li>
                <li>🔊 <strong>start sound [JumpBoing]:</strong> Efek audio pegas melontar</li>
                <li>⬆️ <strong>repeat (10) [change y by (8)]:</strong> Meluncur naik setinggi 80 langkah</li>
                <li>⬇️ <strong>repeat (10) [change y by (-8)]:</strong> Gravitasi menarik jatuh sejauh 80 langkah</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block event">
                when <span class="block-input">space ▾</span> key pressed
              </div>
              <div class="scratch-block sound">
                start sound <span class="block-input">JumpBoing ▾</span>
              </div>
              <div class="scratch-block-c">
                repeat <span class="block-input">10</span>
                <div class="scratch-c-indent">
                  <div class="scratch-block motion">
                    change y by <span class="block-input">8</span>
                  </div>
                </div>
              </div>
              <div class="scratch-block-c">
                repeat <span class="block-input">10</span>
                <div class="scratch-c-indent">
                  <div class="scratch-block motion">
                    change y by <span class="block-input">-8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 5: SINYAL BROADCAST & RESPON ================= -->
      <div class="slide" data-time="⏱️ Menit ke 42–52">
        <div class="slide-header">
          <div class="badge-session">Keamanan Kode • Pengaman Double Jump</div>
          <div class="badge-time">⏱️ Menit ke 42–52</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Pengaman Logika: <span>Mencegah Terbang Tak Terbatas</span> 📢
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Apa yang terjadi jika pemain menekan spasi terus-menerus saat di udara? Karakter bisa terbang keluar layar! Kita gunakan kondisi pengaman agar lompatan hanya aktif saat di tanah:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🔒 <strong>if &lt;StatusLompat = Tanah&gt;:</strong> Cek apakah kaki menyentuh lantai</li>
                <li>🪂 <strong>set Status to Melayang:</strong> Kunci tombol spasi selama di udara</li>
                <li>🦶 <strong>set Status to Tanah:</strong> Buka kembali izin melompat setelah mendarat</li>
                <li>🎮 <strong>Hasilnya:</strong> Karakter bergerak realistis persis Mario Bros!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block event">
                when <span class="block-input">space ▾</span> key pressed
              </div>
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">StatusLompat</span> = <span class="block-input">"Tanah"</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block variable">
                    set <span class="block-input">StatusLompat ▾</span> to <span class="block-input">"Melayang"</span>
                  </div>
                  <div class="scratch-block control">
                    repeat <span class="block-input">10</span> [ change y by <span class="block-input">8</span> ]
                  </div>
                  <div class="scratch-block control">
                    repeat <span class="block-input">10</span> [ change y by <span class="block-input">-8</span> ]
                  </div>
                  <div class="scratch-block variable">
                    set <span class="block-input">StatusLompat ▾</span> to <span class="block-input">"Tanah"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 6: ALUR INSTRUKSI LENGKAP ================= -->
      <div class="slide" data-time="⏱️ Menit ke 52–62">
        <div class="slide-header">
          <div class="badge-session">Algoritma Game • Siklus Lengkap Satu Lompatan</div>
          <div class="badge-time">⏱️ Menit ke 52–62</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Siklus Lompatan: <span>4 Fase Fisika Platformer</span> 🗺️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Berikut alur siklus pergerakan yang terjadi dalam hitungan detik saat tombol lompat ditekan:
            </p>
            <div class="concept-card">
              <ol style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.7;">
                <li>1️⃣ <strong>Kesiapan di Tanah:</strong> Karakter di <code>y: -100</code> &amp; status aktif di tanah</li>
                <li>2️⃣ <strong>Dorongan Naik:</strong> <code>repeat (10) change y by (8)</code> ➔ posisi naik +80px</li>
                <li>3️⃣ <strong>Puncak Gravitasi (Apex):</strong> Kecepatan vertikal melambat hingga 0</li>
                <li>4️⃣ <strong>Tarikan Turun &amp; Mendarat:</strong> <code>repeat (10) change y by (-8)</code> ➔ kembali ke <code>y: -100</code>!</li>
              </ol>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: #090d16; border: 2px solid #f59e0b; border-radius: 16px; padding: 22px; width: 100%; text-align: center;">
              <div style="font-size: 42px; margin-bottom: 8px;">🌱 ➔ 🚀 ➔ ⛰️ ➔ 🦶</div>
              <h4 style="color: #fbbf24; font-size: 16px; font-weight: 800; margin-bottom: 6px;">Fondasi Game Mario Bros</h4>
              <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5;">Prinsip dasar yang digunakan ribuan game platformer dunia dari masa ke masa!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 7: PLAYABLE SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 62–74">
        <div class="slide-header">
          <div class="badge-session">Playable Arcade • Lompati Rintangan Bergulir</div>
          <div class="badge-time">⏱️ Menit ke 62–74</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Uji Coba Langsung: <span>Lompati Rintangan Kayu</span>! 🎮
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Rintangan balok kayu meluncur dari kanan! Tekan <strong>SPASI</strong> pada keyboard atau klik tombol lompat untuk melompatinya sebelum menabrak!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>Klik Bendera Hijau:</strong> Memulai simulasi platformer</li>
                <li>⌨️ <strong>Tekan Tombol SPASI:</strong> Karakter melompat naik (+8) lalu turun (-8)</li>
                <li>🪵 <strong>Lompati Balok Kayu:</strong> Dapatkan +1 Poin setiap berhasil melompati</li>
                <li>💥 <strong>Jangan Menabrak:</strong> Hati-hati jangan sampai terantuk rintangan!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <div class="sim-btns">
                  <button class="btn-green-flag" onclick="startPlayableGame_18()" title="Mulai Permainan Lompat">🚩</button>
                  <button class="btn-red-stop" onclick="stopPlayableGame_18()" title="Hentikan Permainan">🛑</button>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <div id="simJumpStatusBadge_18" style="background: #090d16; border: 1px solid #10b981; color: #10b981; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 999px; font-family: 'Fredoka', cursive;">
                    STATUS: <span id="gameJumpStatus_18">Di Tanah</span>
                  </div>
                  <div class="sim-score-badge">
                    🏆 SKOR: <span id="gameScore_18">0</span>
                  </div>
                </div>
              </div>

              <div id="gameCanvas_18" class="sim-canvas" style="background: linear-gradient(180deg, #0284c7 0%, #38bdf8 65%, #15803d 66%, #166534 100%); position: relative; overflow: hidden;">
                <!-- Overlay Mulai -->
                <div id="gameOverlay_18" style="position: absolute; inset: 0; background: rgba(0,0,0,0.78); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; padding: 16px; text-align: center;">
                  <span style="font-size: 36px; margin-bottom: 6px;">🐝🪵</span>
                  <span style="font-size: 14px; font-weight: 800; color: #fbbf24;">Tantangan Platformer: Lompat Rintangan!</span>
                  <span style="font-size: 11.5px; color: #cbd5e1; margin: 4px 0 12px;">Tekan SPASI di keyboard untuk melompati balok kayu yang meluncur!</span>
                  <button onclick="startPlayableGame_18()" style="background: #10b981; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 13px; font-weight: 700; padding: 7px 18px; border-radius: 999px; cursor: pointer;">
                    🚩 Mulai Sekarang (Tekan Spasi)
                  </button>
                </div>

                <!-- Sprite Beeby (Karakter) -->
                <div id="gameBeeby_18" style="position: absolute; font-size: 36px; left: 50px; bottom: 32px; pointer-events: none; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));">🐝</div>

                <!-- Sprite Rintangan Kayu -->
                <div id="gameLog_18" style="position: absolute; font-size: 26px; right: -40px; bottom: 30px; pointer-events: none;">🪵</div>
              </div>

              <div style="background: #0f172a; padding: 8px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1e293b; font-size: 11px;">
                <button onclick="triggerGameJump_18()" style="background: #f59e0b; border: none; color: #000; font-weight: 800; font-size: 11.5px; padding: 5px 14px; border-radius: 6px; cursor: pointer;">
                  🚀 LOMPAT (SPASI)
                </button>
                <span id="gameLiveStatus_18" style="color: #10b981;">● Siap Melompat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 8: DOKTER KODE ================= -->
      <div class="slide" data-time="⏱️ Menit ke 74–82">
        <div class="slide-header">
          <div class="badge-session">Klinik Debugging • Mengatasi Bug Tersangkut di Langit</div>
          <div class="badge-time">⏱️ Menit ke 74–82</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Dokter Kode: <span>Menangani Karakter Tersangkut di Udara</span> 🐛
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Saat pertama kali memprogram lompatan, hampir semua programmer mengalami bug di mana karakternya melompat ke atas lalu melayang tersangkut di awan! Yuk lihat penyebabnya:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⬇️ Jangan lupa memasang balok turun <code>repeat (10) change y by (-8)</code> tepat setelah balok naik</li>
                <li>⚖️ Pastikan angka naik (+8) dan angka turun (-8) sama besar agar mendarat tepat di lantai</li>
                <li>🔒 Selalu periksa variabel <code>StatusLompat</code> agar tidak terjadi lompat di udara ganda</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
              <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #ef4444; font-weight: 800; font-size: 13px; margin-bottom: 4px;">❌ KODE SALAH: Lupa Balok Gravitasi Turun</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  repeat (10) [ change y by (8) ]<br>
                  <span style="color: #f87171;">⚠️ Karakter meluncur ke atas tetapi tidak ada perintah kembali ke tanah ➔ tersangkut di langit selamanya!</span>
                </div>
              </div>
              <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #10b981; font-weight: 800; font-size: 13px; margin-bottom: 4px;">✅ KODE BENAR: Pasangan Naik &amp; Turun Simetris</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  <span style="color: #34d399; font-weight: 700;">repeat (10) [ change y by (8) ]</span>  ➔ Dorong naik!<br>
                  <span style="color: #34d399; font-weight: 700;">repeat (10) [ change y by (-8) ]</span> ➔ Ditarik gravitasi turun! ✅
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 9: RANGKUMAN & APRESIASI ================= -->
      <div class="slide" data-time="⏱️ Menit ke 82–87">
        <div class="slide-header">
          <div class="badge-session">Review Pemahaman • Sukses Sesi 18</div>
          <div class="badge-time">⏱️ Menit ke 82–87</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Platformer Pro! <span>Review Kunci Hari Ini</span> 🌟
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Selamat! Kamu telah menguasai rumus fisika lompat yang menjadi fondasi utama seluruh game platformer legendaris dunia. Mari ingat 3 kunci penting hari ini:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>1️⃣ <strong>Konsep Inti:</strong> Karakter melompat ke atas lalu ditarik gravitasi kembali ke tanah</li>
                <li>2️⃣ <strong>Instruksi Kode:</strong> <code>repeat (10) [change y by (8)] ➔ repeat (10) [change y by (-8)]</code></li>
                <li>3️⃣ <strong>Fondasi Platformer:</strong> Langkah awal membuat game epik seperti Mario Bros!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(245, 158, 11, 0.1); border: 2px solid #f59e0b; border-radius: 16px; padding: 24px; text-align: center; width: 100%;">
              <div style="font-size: 48px; margin-bottom: 10px;">🏆 🚀</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 6px;">Kerja Keras Terbayar!</h3>
              <p style="color: #cbd5e1; font-size: 13.5px; line-height: 1.5;">Kamu resmi menguasai modul Fisika Lompat Sederhana &amp; Platformer di Beekoding Academy!</p>
              <button onclick="triggerConfetti()" style="margin-top: 14px; background: #000; color: #fbbf24; border: 1px solid #fbbf24; padding: 10px 20px; border-radius: 999px; font-weight: 800; cursor: pointer; transition: transform 0.15s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                🎊 Rayakan Keberhasilan (Klik Confetti)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 10: PENUTUP & TEASER ================= -->
      <div class="slide" data-time="⏱️ Menit ke 87–90">
        <div class="slide-header">
          <div class="badge-session">Teaser Sesi Berikutnya • Terus Berkembang</div>
          <div class="badge-time">⏱️ Menit ke 87–90</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Petualangan Berlanjut: <span>Menuju Sesi 19</span>! 🚀
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Game platformer kita semakin keren! Jangan lupa simpan file proyek Scratch (.sb3) di komputermu hari ini.
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>💾 Klik <code>File ➔ Save to your computer</code> di Scratch Studio</li>
                <li>⌨️ <strong>Sesi 19:</strong> Kombinasi Gerakan Keyboard (Panah &amp; WASD) vs Mouse</li>
                <li>👏 Berikan tepuk tangan meriah untuk seluruh teman di kelas!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(30, 41, 59, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 26px; text-align: center; width: 100%;">
              <div style="font-size: 52px; margin-bottom: 10px;">🌟⌨️</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Sampai Jumpa di Sesi 19!</h3>
              <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.5;">Tetap semangat bereksplorasi dan berkreasi membuat game impian bersama Beekoding Academy!</p>
            </div>
          </div>
        </div>
      </div>"""

    sim_js = """
    // ================= AUDIO HELPER (JUMP BOING & LANDING AUDIO) =================
    function playJumpSound() {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } catch(e) {}
    }

    function playLandSound() {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch(e) {}
    }

    function playScoreSound() {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch(e) {}
    }

    // ================= SIMULATOR 1 (SLIDE 2): INTERACTIVE JUMP PHYSICS =================
    let sim2IsJumping = false;
    let sim2CurrentY = -100;

    function triggerSim2Jump() {
      if (sim2IsJumping) return;
      sim2IsJumping = true;

      const badge = document.getElementById('sim2PhaseBadge');
      const yDisp = document.getElementById('sim2YPosDisplay');
      const sprite = document.getElementById('sim2BeebySprite');

      if (badge) {
        badge.innerText = 'Meluncur Naik (+8 x 10)';
        badge.style.color = '#f59e0b';
      }

      playJumpSound();

      let step = 0;
      // Fase 1: repeat (10) change y by (8)
      const upInterval = setInterval(() => {
        step++;
        sim2CurrentY += 8;
        if (yDisp) yDisp.innerText = sim2CurrentY;
        if (sprite) sprite.style.transform = `translateY(${-(sim2CurrentY + 100)}px)`;

        if (step >= 10) {
          clearInterval(upInterval);
          if (badge) {
            badge.innerText = 'Puncak Gravitasi (Apex)';
            badge.style.color = '#fbbf24';
          }

          // Jeda sejenak di puncak lalu turun
          setTimeout(() => {
            if (badge) {
              badge.innerText = 'Ditarik Gravitasi (-8 x 10)';
              badge.style.color = '#38bdf8';
            }

            let downStep = 0;
            // Fase 2: repeat (10) change y by (-8)
            const downInterval = setInterval(() => {
              downStep++;
              sim2CurrentY -= 8;
              if (yDisp) yDisp.innerText = sim2CurrentY;
              if (sprite) sprite.style.transform = `translateY(${-(sim2CurrentY + 100)}px)`;

              if (downStep >= 10) {
                clearInterval(downInterval);
                sim2CurrentY = -100;
                if (yDisp) yDisp.innerText = sim2CurrentY;
                if (sprite) sprite.style.transform = 'translateY(0)';
                if (badge) {
                  badge.innerText = 'Di Tanah (Siap Melompat)';
                  badge.style.color = '#10b981';
                }
                playLandSound();
                sim2IsJumping = false;
              }
            }, 25);
          }, 80);
        }
      }, 25);
    }

    function resetSim2Jump() {
      sim2IsJumping = false;
      sim2CurrentY = -100;
      const yDisp = document.getElementById('sim2YPosDisplay');
      const sprite = document.getElementById('sim2BeebySprite');
      const badge = document.getElementById('sim2PhaseBadge');
      if (yDisp) yDisp.innerText = sim2CurrentY;
      if (sprite) sprite.style.transform = 'translateY(0)';
      if (badge) {
        badge.innerText = 'Di Tanah (Siap Melompat)';
        badge.style.color = '#10b981';
      }
    }

    // ================= SIMULATOR 2 (SLIDE 7): PLAYABLE PLATFORMER RUN & JUMP =================
    let gameRunning_18 = false;
    let gameScore_18 = 0;
    let gameIsJumping_18 = false;
    let gameBeebyY_18 = 0; // offset dari tanah
    let gameLogX_18 = 360;
    let gameAnimId_18 = null;
    let gameHasClearedCurrentLog_18 = false;

    function startPlayableGame_18() {
      gameRunning_18 = true;
      gameScore_18 = 0;
      gameIsJumping_18 = false;
      gameBeebyY_18 = 0;
      gameLogX_18 = 360;
      gameHasClearedCurrentLog_18 = false;

      const scoreEl = document.getElementById('gameScore_18');
      if (scoreEl) scoreEl.innerText = '0';

      const overlay = document.getElementById('gameOverlay_18');
      if (overlay) overlay.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_18');
      if (liveSt) {
        liveSt.innerText = '● Bertanding! Tekan Spasi untuk Lompat';
        liveSt.style.color = '#10b981';
      }

      if (gameAnimId_18) cancelAnimationFrame(gameAnimId_18);
      gameLoop_18();
    }

    function stopPlayableGame_18() {
      gameRunning_18 = false;
      if (gameAnimId_18) cancelAnimationFrame(gameAnimId_18);

      const overlay = document.getElementById('gameOverlay_18');
      if (overlay) overlay.style.display = 'flex';

      const liveSt = document.getElementById('gameLiveStatus_18');
      if (liveSt) {
        liveSt.innerText = '● Permainan Dihentikan';
        liveSt.style.color = '#94a3b8';
      }
    }

    function triggerGameJump_18() {
      if (!gameRunning_18 || gameIsJumping_18) return;
      gameIsJumping_18 = true;

      const stBadge = document.getElementById('gameJumpStatus_18');
      if (stBadge) {
        stBadge.innerText = 'Melompat!';
        stBadge.style.color = '#f59e0b';
      }

      playJumpSound();

      let step = 0;
      // Naik: repeat 10 change y by 8
      const upTimer = setInterval(() => {
        step++;
        gameBeebyY_18 += 8;
        if (step >= 10) {
          clearInterval(upTimer);
          setTimeout(() => {
            let downStep = 0;
            // Turun: repeat 10 change y by -8
            const downTimer = setInterval(() => {
              downStep++;
              gameBeebyY_18 -= 8;
              if (downStep >= 10) {
                clearInterval(downTimer);
                gameBeebyY_18 = 0;
                gameIsJumping_18 = false;
                playLandSound();
                if (stBadge) {
                  stBadge.innerText = 'Di Tanah';
                  stBadge.style.color = '#10b981';
                }
              }
            }, 25);
          }, 40);
        }
      }, 25);
    }

    // Keyboard listener SPASI untuk lompat
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        const slide7 = document.querySelectorAll('.slide')[6];
        if (slide7 && slide7.classList.contains('active')) {
          e.preventDefault();
          triggerGameJump_18();
        }
      }
    });

    function gameLoop_18() {
      if (!gameRunning_18) return;

      const canvas = document.getElementById('gameCanvas_18');
      const canvasW = canvas ? canvas.clientWidth : 340;

      // Geser rintangan balok kayu dari kanan ke kiri
      gameLogX_18 -= 4.2;

      // Posisi horizontal Beeby tetap di x = 50
      const beebyX = 50;
      const beebyW = 36;
      const logW = 28;

      // Cek apakah Beeby sedang melintasi balok kayu
      if (gameLogX_18 < beebyX + beebyW && gameLogX_18 + logW > beebyX) {
        // Tabrakan jika tidak melompat cukup tinggi (ketinggian rintangan ~30px)
        if (gameBeebyY_18 < 30) {
          // Kena rintangan!
          playBeep(220, 'sawtooth', 0.15);
          if (canvas) {
            canvas.style.filter = 'brightness(1.4) drop-shadow(0 0 10px red)';
            setTimeout(() => { if (canvas) canvas.style.filter = 'none'; }, 150);
          }
        } else if (!gameHasClearedCurrentLog_18) {
          // Berhasil melompat!
          gameHasClearedCurrentLog_18 = true;
          gameScore_18++;
          const scoreEl = document.getElementById('gameScore_18');
          if (scoreEl) scoreEl.innerText = gameScore_18;
          playScoreSound();
        }
      }

      // Reset balok kayu jika sudah lewat kiri layar
      if (gameLogX_18 < -40) {
        gameLogX_18 = canvasW + Math.floor(Math.random() * 80) + 20;
        gameHasClearedCurrentLog_18 = false;
      }

      // Render posisi Beeby & Balok
      const beebyEl = document.getElementById('gameBeeby_18');
      if (beebyEl) {
        beebyEl.style.bottom = `${32 + gameBeebyY_18}px`;
      }
      const logEl = document.getElementById('gameLog_18');
      if (logEl) {
        logEl.style.left = `${gameLogX_18}px`;
        logEl.style.right = 'auto';
      }

      gameAnimId_18 = requestAnimationFrame(gameLoop_18);
    }
    """

    full_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slide Mengajar: Sesi 18 - Fisika Lompat Sederhana (Gravitasi &amp; Velocity Y Dasar) | Beekoding Academy</title>
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Fredoka:wght@600;700&family=JetBrains+Mono:wght@600;700;800&family=Space+Grotesk:wght@700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  {style_block}
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
          <span class="brand-subtitle">Platform Edukasi Koding &amp; AI</span>
        </div>
      </a>
      <span class="brand-stage-badge">STAGE 2: SESI 18</span>
    </div>

    <div class="toolbar-actions">
      <a href="/slides/index.html" class="btn-nav-sesi" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 800;" title="Buka Portal Semua Sesi &amp; Stage">🗂️ Semua Sesi</a>
      <a href="/slides/sesi-17/index.html" class="btn-nav-sesi">⏪ Sesi 17</a>
      <a href="/slides/sesi-19/index.html" class="btn-nav-sesi">Sesi 19 ⏩</a>
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

{slides_html}

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
            <span>📝 CATATAN GURU &amp; PANDUAN MENGAJAR</span>
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

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const progressDots = document.getElementById('progressDots');
    const notesPanel = document.getElementById('teacherNotesPanel');

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
      notesOpen = !notesOpen;
      notesPanel.classList.toggle('open', notesOpen);
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
          particleCount: 100,
          spread: 80,
          origin: {{ y: 0.6 }}
        }});
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

    // Audio Synthesizer (Web Audio API)
    let audioCtx = null;
    function getAudioCtx() {{
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }}

    function playBeep(freq = 440, type = 'sine', duration = 0.15) {{
      try {{
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      }} catch(e) {{}}
    }}

{sim_js}

    // Initialize
    updateSlide();
  </script>
</body>
</html>
"""

    SESI18_HTML_PATH.write_text(full_html, encoding="utf-8")
    open_div = full_html.count("<div")
    close_div = full_html.count("</div>")
    print(f"[OK] Sesi 18 updated. Open div: {open_div}, Close div: {close_div}, Diff: {open_div - close_div}")

if __name__ == "__main__":
    build_sesi18()
