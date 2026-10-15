import os
import sys
import json
import shutil
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

ARTIFACT_DIR = Path(r"C:\Users\devop\.gemini\antigravity\brain\645a5bda-8de7-4b62-a0d1-1f8ba42f03f5")
SESI23_DIR = Path(r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\public\slides\sesi-23")
SESI23_HTML_PATH = SESI23_DIR / "index.html"

def build_sesi23():
    # Copy 3D Platformer Hero image as beeby-platformer.jpg
    src_img = ARTIFACT_DIR / "beeby_game_builder_1792032681322.jpg"
    dest_img = SESI23_DIR / "beeby-platformer.jpg"
    if src_img.exists():
        shutil.copy2(src_img, dest_img)
        print(f"[OK] Copied {src_img.name} to {dest_img.name}")

    # Read existing styling to keep 100% exact styling
    existing_html = SESI23_HTML_PATH.read_text(encoding="utf-8")
    style_start = existing_html.find("<style>")
    style_end = existing_html.find("</style>") + len("</style>")
    style_block = existing_html[style_start:style_end]

    notes = [
        {
            "title": "Slide 1: Pembukaan & Sambutan Sesi 23",
            "time": "Menit 00–10 (Total 90 Menit)",
            "instructions": "Sambut siswa dengan antusiasme tinggi memasuki fase produksi kode mandiri! Ingatkan mereka untuk membuka lembar Game Sheet dari Sesi 22 dan membuka Scratch Studio.",
            "script": "Halo para Game Developer Hebat! Selamat datang di Sesi 23: Produksi Proyek Mandiri Game Platformer Cilik! Hari ini adalah hari pembuktian: kita akan mengubah sketsa Game Sheet yang kalian buat kemarin menjadi game nyata di Scratch! Guru akan mendampingi kalian satu per satu (1-on-1), dan kalian akan belajar menjadi programmer tangguh yang mandiri mengatasi bug!"
        },
        {
            "title": "Slide 2: Konsep Dasar & Simulator Platformer Physics",
            "time": "Menit 10–22",
            "instructions": "Jelaskan 3 pilar fisika platformer: berjalan horizontal (sumbu X), melompat melawan gravitasi (sumbu Y), dan berdiri di atas pijakan platform. Demonstrasikan simulator di kanan.",
            "script": "Coba perhatikan simulator di layar kanan! Karakter kita bergerak di sumbu X dan melompat di sumbu Y. Cobalah tombol lompat dan berjalan! Jika ada kode yang salah pasang, karakter bisa melayang atau tembus lantai. Kita akan belajar cara memeriksa dan memperbaikinya sendiri!"
        },
        {
            "title": "Slide 3: Balok Kunci: Gerakan Horizontal & Kostum Berjalan",
            "time": "Menit 22–32",
            "instructions": "Bimbing siswa merakit kontrol panah kanan dan kiri. Gunakan balok point in direction (90 / -90), set rotation style left-right, dan next costume untuk animasi langkah.",
            "script": "Langkah pertama: kita buat Beeby bisa melangkah ke kanan dan ke kiri! Gunakan change x by (8) untuk ke kanan, dan change x by (-8) untuk ke kiri. Tambahkan next costume agar sayap dan kakinya bergerak lincah!"
        },
        {
            "title": "Slide 4: Balok Kunci: Fisika Lompat Simetris & Gravitasi",
            "time": "Menit 32–42",
            "instructions": "Pandu siswa menerapkan rumus fisika lompat simetris: repeat (10) [change y by 10] diikuti repeat (10) [change y by -10].",
            "script": "Inilah rumus lompat legendaris seperti Mario Bros: ketika tombol spasi ditekan, dorong karakter naik ke atas dengan repeat (10) change y by (10), lalu tarik turun kembali ke tanah dengan repeat (10) change y by (-10)! Lompatan jadi terasa halus dan alami!"
        },
        {
            "title": "Slide 5: Mekanik Target Koin Emas & Rintangan Duri",
            "time": "Menit 42–52",
            "instructions": "Ajak siswa memprogram sprite koin dan duri. Koin menambah skor lalu menghilang sementara, duri mengurangi nyawa dan memindahkan karakter ke titik awal.",
            "script": "Sekarang kita masukkan tantangannya! Pasang koin-koin emas di atas platform: jika Beeby menyentuh koin, skor bertambah 1 dan bunyikan suara ding! Jika Beeby terpeleset menabrak duri merah, nyawa berkurang 1 hati!"
        },
        {
            "title": "Slide 6: Alur Algoritma: 4 Langkah Produksi Mandiri",
            "time": "Menit 52–62",
            "instructions": "Tunjukkan 4 fase produksi: Siapkan Sprite -> Rakit Gerakan & Lompat -> Pasang Koin & Bahaya -> Uji Coba Mandiri. Berikan bimbingan 1-on-1 secara bergiliran.",
            "script": "Inilah peta kerja kalian hari ini: ikuti 4 langkah ini secara berurutan. Kerjakan secara mandiri sesuai Game Sheet kalian masing-masing. Guru akan datang mendampingi meja kalian satu per satu untuk berdiskusi!"
        },
        {
            "title": "Slide 7: Playable Arcade: Game 2D Platformer Cilik Penuh",
            "time": "Menit 62–74",
            "instructions": "Beri kebebasan siswa memainkan game platformer lengkap di slide. Siswa melompat di atas 3 platform, mengumpulkan 5 koin emas, dan menghindari duri merah.",
            "script": "Waktunya bermain! Coba game platformer yang sudah jadi ini di layar kalian. Gunakan panah untuk berjalan dan SPASI untuk melompat di atas platform kayu. Kumpulkan semua koin emas dan hindari duri merah di bawah! Rasakan betapa serunya game buatan kalian sendiri!"
        },
        {
            "title": "Slide 8: Klinik Dokter Kode: 3 Checklist Mandiri Mengatasi Bug",
            "time": "Menit 74–82",
            "instructions": "Latih kemandirian anak: sebelum memanggil instruktur, minta anak memeriksa 3 checklist mandiri: loop forever, tanda positif/negatif X & Y, dan balok show di awal game.",
            "script": "Dokter Kode hadir untuk melatih kemandirian kalian! Sebelum kalian memanggil guru saat terjadi bug, tanyakan 3 hal ini pada diri sendiri: 1. Apakah balok kodenya sudah di dalam loop forever? 2. Apakah arah lompat Y sudah benar positif dan negatif? 3. Apakah koin sudah diberi balok show saat bendera hijau diklik? Kalian pasti bisa memecahkannya!"
        },
        {
            "title": "Slide 9: Rangkuman & Pesta Apresiasi Kemandirian",
            "time": "Menit 82–87",
            "instructions": "Ajak siswa merayakan selesainya produksi game platformer mandiri mereka. Tekan tombol konfeti bersama dan beri apresiasi atas ketangguhan mereka memecahkan bug.",
            "script": "Luar biasa! Kalian sudah berhasil memprogram game platformer lengkap secara mandiri! Setiap bug yang berhasil kalian atasi membuat kalian menjadi programmer yang semakin hebat! Klik tombol konfeti untuk merayakan hasil karya kalian!"
        },
        {
            "title": "Slide 10: Penutup & Teaser Sesi 24 (Showcase & Wisuda Akbar)",
            "time": "Menit 87–90",
            "instructions": "Ingatkan siswa menyimpan file Scratch (.sb3) dengan format nama yang rapi. Beri teaser acara Wisuda dan Pameran Game Capstone di Sesi 24.",
            "script": "Simpan proyek kalian ya! Beri nama: Capstone_NamaKalian.sb3. Pekan depan di Sesi 24 adalah momen puncak yang kita tunggu-tunggu: Pameran Game Showcase & Wisuda Kelulusan Level 2 Junior Explorer! Sampai jumpa di panggung wisuda!"
        }
    ]
    notes_json = json.dumps(notes, indent=6, ensure_ascii=False)

    slides_html = """      <!-- ================= SLIDE 1: COVER ================= -->
      <div class="slide active" data-time="⏱️ Menit ke 00–10">
        <div class="slide-header">
          <div class="badge-session">Sesi 23 • Produksi Mandiri Level 2</div>
          <div class="badge-time">⏱️ Menit ke 00–10</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h1 class="slide-title">
              Produksi Proyek Mandiri: <span>Game Platformer Cilik</span>! 🏃🎮
            </h1>
            <p style="color: #cbd5e1; font-size: 15.5px; margin: 12px 0 18px; line-height: 1.55;">
              Selamat datang di <strong>STAGE 2: SESI 23</strong>! Saatnya mengeksekusi cetak biru Game Sheet kalian menjadi game nyata di Scratch: <strong>Pembangunan Game Mandiri dengan Bimbingan 1-on-1 Instruktur</strong>. Latih mental pantang menyerah dan kemandirian dalam mengatasi setiap bug koding!
            </p>
            <div class="concept-card">
              <div style="color: #fbbf24; font-weight: 800; font-size: 13.5px; margin-bottom: 6px;">🎯 Misi Utama Hari Ini:</div>
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🏗️ <strong>Konsep &amp; Inti:</strong> Pembangunan game mandiri dengan bimbingan 1-on-1 instruktur</li>
                <li>🛠️ <strong>Instruksi / Kode:</strong> Memastikan setiap anak mandiri mengatasi bug koding (Self-Debugging)</li>
                <li>🏃 <strong>Mekanik Platformer:</strong> Gerak horizontal (X), lompat simetris (Y), koin melayang &amp; rintangan duri</li>
                <li>🎯 <strong>Target Capstone:</strong> Game berfungsi utuh dan siap dipamerkan di Sesi 24!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <img src="beeby-platformer.jpg" alt="Beeby Merakit Game Platformer Mandiri - Beekoding Level 2" class="hero-img" />
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 2: KONSEP DASAR & SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 10–22">
        <div class="slide-header">
          <div class="badge-session">Konsep Dasar • Fisika Platformer &amp; Laboratorium Debugging</div>
          <div class="badge-time">⏱️ Menit ke 10–22</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Anatomi Platformer: <span>Jalan, Lompat &amp; Pijakan</span> 🧱
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Game platformer seperti Mario Bros bertumpu pada interaksi koordinat X dan Y. Jika kodenya tepat, karakter bisa melompat anggun dan mendarat mulus di atas pijakan:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>➡️ <strong>Horizontal (Sumbu X):</strong> Tombol panah kanan/kiri menambah atau mengurangi koordinat X</li>
                <li>⬆️ <strong>Lompat (Sumbu Y):</strong> Tombol Spasi mendorong Y ke atas, lalu gravitasi menariknya kembali</li>
                <li>🪵 <strong>Platform Pijakan:</strong> Karakter bisa mendarat dan berdiri di atas balok kayu</li>
                <li>🩺 <strong>Lab Debugging:</strong> Coba uji tombol simulasi bug di sebelah kanan!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <span style="font-weight: 800; font-size: 13px; color: #38bdf8;">🧪 Simulator Fisika Platformer</span>
                <span id="sim2BugStatus" style="color: #10b981; font-size: 12px; font-weight: 700;">● Fisika Normal</span>
              </div>
              <!-- Mini Sandbox Stage -->
              <div id="sim2Stage" style="height: 180px; background: linear-gradient(180deg, #0f172a 0%, #1e1b4b 70%, #15803d 71%, #14532d 100%); position: relative; overflow: hidden; padding: 10px;">
                <!-- Platform Mengambang -->
                <div style="position: absolute; left: 80px; top: 95px; width: 85px; height: 14px; background: #854d0e; border: 2px solid #ca8a04; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.5);"></div>
                <div style="position: absolute; right: 40px; top: 65px; width: 75px; height: 14px; background: #854d0e; border: 2px solid #ca8a04; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.5);"></div>
                
                <!-- Koin Demo -->
                <div id="sim2Coin" style="position: absolute; right: 65px; top: 38px; font-size: 18px; animation: bounceBar 0.8s infinite alternate ease-in-out;">🪙</div>

                <!-- Sprite Beeby Demo -->
                <div id="sim2Beeby" style="position: absolute; left: 30px; bottom: 18px; font-size: 28px; transition: transform 0.05s ease-out, bottom 0.15s ease-out; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.6));">
                  🐝
                </div>
              </div>

              <!-- Kontrol Tombol Simulator -->
              <div style="padding: 10px 14px; background: #0f172a; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; gap: 6px; justify-content: space-between;">
                  <button onclick="sim2MoveLeft()" style="flex: 1; background: #1e293b; border: 1px solid #475569; color: #fff; font-weight: 700; font-size: 11.5px; padding: 6px; border-radius: 6px; cursor: pointer;">◀ Jalan Kiri</button>
                  <button onclick="sim2Jump()" style="flex: 1.4; background: #f59e0b; border: none; color: #000; font-weight: 800; font-size: 12px; padding: 6px; border-radius: 6px; cursor: pointer;">⬆️ Lompat (Spasi)</button>
                  <button onclick="sim2MoveRight()" style="flex: 1; background: #1e293b; border: 1px solid #475569; color: #fff; font-weight: 700; font-size: 11.5px; padding: 6px; border-radius: 6px; cursor: pointer;">Jalan Kanan ▶</button>
                </div>
                <div style="display: flex; gap: 6px; align-items: center; justify-content: space-between; border-top: 1px solid #1e293b; pt: 6px;">
                  <button onclick="triggerSim2Bug()" style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; cursor: pointer;">
                    🐛 Simulasikan Bug Gravitasi
                  </button>
                  <button onclick="fixSim2Bug()" style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #6ee7b7; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; cursor: pointer;">
                    🔧 Perbaiki Mandiri
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 3: BALOK KUNCI UTAMA ================= -->
      <div class="slide" data-time="⏱️ Menit ke 22–32">
        <div class="slide-header">
          <div class="badge-session">Bedah Balok Kode • Gerakan Horizontal &amp; Animasi</div>
          <div class="badge-time">⏱️ Menit ke 22–32</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Balok Kunci 1: <span>Gerak Kanan &amp; Kiri di Sumbu X</span> 🕹️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Karakter berjalan dengan memeriksa apakah tombol panah ditekan di dalam loop <code>forever</code>. Jangan lupa atur <code>rotation style</code> agar karakter tidak terbalik saat berbalik arah!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>➡️ <strong>Panah Kanan:</strong> <code>point in direction (90)</code> dan <code>change x by (8)</code></li>
                <li>⬅️ <strong>Panah Kiri:</strong> <code>point in direction (-90)</code> dan <code>change x by (-8)</code></li>
                <li>🔄 <strong>set rotation style [left-right]:</strong> Menjaga sprite tetap tegak</li>
                <li>👗 <strong>next costume:</strong> Memberikan ilusi langkah animasi yang hidup!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block motion">
                set rotation style <span class="block-input">left-right ▾</span>
              </div>
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-sensing">key <span class="block-input">right arrow ▾</span> pressed?</span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block motion">
                        point in direction <span class="block-input">90</span>
                      </div>
                      <div class="scratch-block motion">
                        change x by <span class="block-input">8</span>
                      </div>
                      <div class="scratch-block looks">
                        next costume
                      </div>
                    </div>
                  </div>
                  <div class="scratch-block-c" style="margin-top: 4px;">
                    if <span class="scratch-inline-sensing">key <span class="block-input">left arrow ▾</span> pressed?</span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block motion">
                        point in direction <span class="block-input">-90</span>
                      </div>
                      <div class="scratch-block motion">
                        change x by <span class="block-input">-8</span>
                      </div>
                      <div class="scratch-block looks">
                        next costume
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 4: LOGIKA KONDISI & KEPUTUSAN ================= -->
      <div class="slide" data-time="⏱️ Menit ke 32–42">
        <div class="slide-header">
          <div class="badge-session">Bedah Balok Kode • Fisika Lompat Simetris</div>
          <div class="badge-time">⏱️ Menit ke 32–42</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Balok Kunci 2: <span>Lompat Melawan Gravitasi</span> ⚡
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Inilah rumus lompat simetris yang dipelajari di Sesi 18: dorong ke atas dengan <code>repeat 10 [change y by 10]</code>, lalu biarkan gravitasi menarik kembali ke bawah dengan <code>repeat 10 [change y by -10]</code>!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⌨️ <strong>when [space ▾] key pressed:</strong> Memicu lompatan instan</li>
                <li>🔊 <strong>start sound [Jump ▾]:</strong> Efek audio pegas yang renyah</li>
                <li>⬆️ <strong>repeat (10) [change y by (10)]:</strong> Karakter melesat naik setinggi 100 pixel</li>
                <li>⬇️ <strong>repeat (10) [change y by (-10)]:</strong> Gravitasi menarik kembali ke tanah tepat 100 pixel!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block event">
                when <span class="block-input">space ▾</span> key pressed
              </div>
              <div class="scratch-block sound">
                start sound <span class="block-input">Jump ▾</span>
              </div>
              <div class="scratch-block-c">
                repeat <span class="block-input">10</span>
                <div class="scratch-c-indent">
                  <div class="scratch-block motion">
                    change y by <span class="block-input">10</span>
                  </div>
                </div>
              </div>
              <div class="scratch-block-c">
                repeat <span class="block-input">10</span>
                <div class="scratch-c-indent">
                  <div class="scratch-block motion">
                    change y by <span class="block-input">-10</span>
                  </div>
                </div>
              </div>
              <div style="background: rgba(16, 185, 129, 0.12); border-left: 3px solid #10b981; padding: 6px 10px; border-radius: 0 6px 6px 0; margin-top: 6px; font-size: 11.5px; color: #a7f3d0;">
                💡 <em>Rahasia Simetris:</em> Angka naik (+10) dan angka turun (-10) harus sama agar posisi mendarat tidak bergeser!
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 5: SINYAL BROADCAST & RESPON ================= -->
      <div class="slide" data-time="⏱️ Menit ke 42–52">
        <div class="slide-header">
          <div class="badge-session">Mekanik Game • Koin Hadiah &amp; Rintangan Duri</div>
          <div class="badge-time">⏱️ Menit ke 42–52</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Target vs Bahaya: <span>Koin Emas &amp; Duri Merah</span> 🪙⚠️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Setiap platformer butuh tujuan dan tantangan! Koin ditempatkan di atas platform melayang, sedangkan duri diletakkan di celah jurang bawah:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🪙 <strong>Koin Emas:</strong> Disentuh Hero ➔ <code>change Skor by (1)</code> ➔ <code>hide</code></li>
                <li>⚠️ <strong>Duri Merah:</strong> Disentuh Hero ➔ <code>change Nyawa by (-1)</code> ➔ Teleport ke Titik Mulai</li>
                <li>👁️ <strong>when 🏴 clicked:</strong> Selalu pasang <code>show</code> pada koin agar muncul kembali!</li>
                <li>🎯 <strong>Target Kemenangan:</strong> Kumpulkan 5 koin untuk menang!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div style="font-size: 11px; font-weight: 800; color: #fbbf24; margin-bottom: 2px;">SCRIPT PADA SPRITE KOIN:</div>
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block looks">
                show
              </div>
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-sensing">touching <span class="block-input">Hero ▾</span>?</span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block variable">
                        change <span class="block-input">Skor ▾</span> by <span class="block-input">1</span>
                      </div>
                      <div class="scratch-block sound">
                        start sound <span class="block-input">Coin ▾</span>
                      </div>
                      <div class="scratch-block looks">
                        hide
                      </div>
                      <div class="scratch-block control">
                        stop <span class="block-input">this script ▾</span>
                      </div>
                    </div>
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
          <div class="badge-session">Panduan 1-on-1 • 4 Langkah Produksi Mandiri</div>
          <div class="badge-time">⏱️ Menit ke 52–62</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Alur Produksi: <span>Fasilitasi 1-on-1 di Kelas</span> 🤝
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Instruktur akan berkeliling memberikan bimbingan personal satu per satu. Ikuti langkah kerja terstruktur berikut:
            </p>
            <div class="concept-card">
              <ol style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.7;">
                <li>1️⃣ <strong>Buka Game Sheet:</strong> Lihat catatan Hero, Target, dan Rintangan pilihanmu</li>
                <li>2️⃣ <strong>Pilih / Gambar Sprite:</strong> Masukkan Hero, Platform kayu, Koin, dan Duri</li>
                <li>3️⃣ <strong>Koding Bertahap:</strong> Mulai dari gerak X ➔ Lompat Y ➔ Tabrakan Koin &amp; Duri</li>
                <li>4️⃣ <strong>Self-Debugging:</strong> Uji coba mandiri setiap selesai merakit satu balok!</li>
              </ol>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: #090d16; border: 2px solid #10b981; border-radius: 16px; padding: 22px; width: 100%; text-align: center;">
              <div style="font-size: 42px; margin-bottom: 8px;">📋 ➔ 🏃 ➔ 🪙 ➔ 🏆</div>
              <h4 style="color: #10b981; font-size: 16px; font-weight: 800; margin-bottom: 6px;">Bimbingan Personal 1-on-1</h4>
              <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5;">Guru membimbing caramu berpikir, bukan mengetikkan kode untukmu. Jadilah Game Creator sejati!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 7: PLAYABLE SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 62–74">
        <div class="slide-header">
          <div class="badge-session">Playable Arcade • Game Platformer Cilik Nyata</div>
          <div class="badge-time">⏱️ Menit ke 62–74</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Mainkan Hasilnya: <span>Game Platformer Cilik</span>! 🎮
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Kendalikan Beeby melompati platform kayu, kumpulkan 5 koin emas, dan hindari duri merah di bawah! Uji kemampuan bermainmu:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>Klik Bendera Hijau:</strong> Memulai permainan baru (Skor = 0, Nyawa = 3)</li>
                <li>⌨️ <strong>Panah Kiri / Kanan:</strong> Berjalan ke kiri &amp; kanan</li>
                <li>⬆️ <strong>Tombol SPASI:</strong> Melompat ke platform kayu</li>
                <li>🪙 <strong>Koin Emas (+1):</strong> Kumpulkan kelimanya untuk MENANG!</li>
                <li>⚠️ <strong>Duri Merah:</strong> Jangan jatuh ke duri agar nyawamu tidak habis!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <div class="sim-btns">
                  <button class="btn-green-flag" onclick="startPlayableGame_23()" title="Mulai Game">🚩</button>
                  <button class="btn-red-stop" onclick="stopPlayableGame_23()" title="Hentikan Game">🛑</button>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <div class="sim-score-badge" style="border-color: #fbbf24; color: #fbbf24;">
                    🪙 KOIN: <span id="gameScore_23">0</span>/5
                  </div>
                  <div class="sim-score-badge" style="border-color: #ef4444; color: #fca5a5;">
                    ❤️ NYAWA: <span id="gameLives_23">3</span>
                  </div>
                </div>
              </div>

              <div id="gameCanvas_23" class="sim-canvas" style="background: linear-gradient(180deg, #090d16 0%, #1e1b4b 60%, #14532d 100%); position: relative; overflow: hidden; height: 215px;">
                <!-- Platform 1 (Kiri Bawah) -->
                <div style="position: absolute; left: 20px; top: 155px; width: 85px; height: 12px; background: #854d0e; border: 2px solid #ca8a04; border-radius: 4px;"></div>
                <!-- Platform 2 (Tengah) -->
                <div style="position: absolute; left: 120px; top: 115px; width: 80px; height: 12px; background: #854d0e; border: 2px solid #ca8a04; border-radius: 4px;"></div>
                <!-- Platform 3 (Kanan Atas) -->
                <div style="position: absolute; left: 215px; top: 75px; width: 85px; height: 12px; background: #854d0e; border: 2px solid #ca8a04; border-radius: 4px;"></div>

                <!-- Duri Merah Bahaya di Lantai Bawah -->
                <div style="position: absolute; left: 110px; bottom: 0; width: 100px; height: 18px; background: repeating-linear-gradient(45deg, #ef4444, #ef4444 6px, #7f1d1d 6px, #7f1d1d 12px); border-top: 2px solid #f87171; border-radius: 4px 4px 0 0;" title="Duri Berbahaya!"></div>

                <!-- Koin-Koin Emas di Panggung -->
                <div id="coin1_23" style="position: absolute; left: 55px; top: 130px; font-size: 16px;">🪙</div>
                <div id="coin2_23" style="position: absolute; left: 150px; top: 90px; font-size: 16px;">🪙</div>
                <div id="coin3_23" style="position: absolute; left: 235px; top: 50px; font-size: 16px;">🪙</div>
                <div id="coin4_23" style="position: absolute; left: 275px; top: 50px; font-size: 16px;">🪙</div>
                <div id="coin5_23" style="position: absolute; left: 28px; bottom: 18px; font-size: 16px;">🪙</div>

                <!-- Overlay Mulai -->
                <div id="gameOverlay_23" style="position: absolute; inset: 0; background: rgba(0,0,0,0.82); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; padding: 16px; text-align: center;">
                  <span style="font-size: 38px; margin-bottom: 4px;">🏃🪙</span>
                  <span style="font-size: 14.5px; font-weight: 800; color: #fbbf24;">Tantangan Platformer Cilik!</span>
                  <span style="font-size: 11.5px; color: #cbd5e1; margin: 4px 0 12px;">Gunakan panah untuk berjalan dan SPASI untuk melompat di platform!</span>
                  <button onclick="startPlayableGame_23()" style="background: #10b981; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 13px; font-weight: 700; padding: 7px 18px; border-radius: 999px; cursor: pointer;">
                    🚩 Mulai Mainkan (Tekan Spasi)
                  </button>
                </div>

                <!-- Overlay Game Over / Win Screen -->
                <div id="gameOverScreen_23" style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.94); display: none; flex-direction: column; align-items: center; justify-content: center; z-index: 25; padding: 16px; text-align: center;">
                  <span id="overIcon_23" style="font-size: 42px; margin-bottom: 2px;">🏆🎉</span>
                  <span id="overTitle_23" style="font-size: 16px; font-weight: 800; color: #fbbf24;">MISI PLATFORMER SELESAI!</span>
                  <span id="overSub_23" style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">Koin Terkumpul: <strong id="finalScoreVal_23" style="color: #fbbf24; font-size: 17px;">5/5</strong></span>
                  <button onclick="startPlayableGame_23()" style="margin-top: 12px; background: #f59e0b; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 12px; font-weight: 700; padding: 6px 16px; border-radius: 999px; cursor: pointer;">
                    🔄 Mainkan Lagi (Spasi)
                  </button>
                </div>

                <!-- Sprite Beeby Hero -->
                <div id="gameBeeby_23" style="position: absolute; font-size: 28px; left: 25px; bottom: 8px; pointer-events: none; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.6)); transition: transform 0.05s;">🐝</div>
              </div>

              <div style="background: #0f172a; padding: 8px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1e293b; font-size: 11px;">
                <div style="display: flex; gap: 6px;">
                  <button onclick="moveBeebyLeft_23()" style="background: #1e293b; border: 1px solid #475569; color: #cbd5e1; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 6px; cursor: pointer;">◀ Kiri</button>
                  <button onclick="triggerGameJump_23()" style="background: #f59e0b; border: none; color: #000; font-weight: 800; font-size: 12px; padding: 4px 14px; border-radius: 6px; cursor: pointer;">⬆️ Lompat (SPASI)</button>
                  <button onclick="moveBeebyRight_23()" style="background: #1e293b; border: 1px solid #475569; color: #cbd5e1; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 6px; cursor: pointer;">Kanan ▶</button>
                </div>
                <span id="gameLiveStatus_23" style="color: #10b981;">● Siap Bermain</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 8: DOKTER KODE ================= -->
      <div class="slide" data-time="⏱️ Menit ke 74–82">
        <div class="slide-header">
          <div class="badge-session">Klinik Debugging • Mandiri Membasmi 3 Bug Klasik</div>
          <div class="badge-time">⏱️ Menit ke 74–82</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Dokter Kode: <span>3 Checklist Mandiri Sebelum Tanya Guru</span> 🩺
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Sebelum mengangkat tangan memanggil instruktur, periksa 3 checklist mandiri ini di proyek Scratch kalian:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🔍 <strong>Checklist 1 (Looping):</strong> Apakah balok deteksi tombol sudah dibungkus loop <code>forever</code>?</li>
                <li>🔍 <strong>Checklist 2 (Simetri Lompat):</strong> Apakah angka naik (+10) dan turun (-10) sudah seimbang?</li>
                <li>🔍 <strong>Checklist 3 (Koin Hilang):</strong> Apakah koin sudah dipasangi balok <code>show</code> di bawah bendera hijau?</li>
                <li>💪 <strong>Kemandirian:</strong> Programmer hebat adalah yang bangga bisa memperbaiki kodenya sendiri!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
              <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #ef4444; font-weight: 800; font-size: 13px; margin-bottom: 4px;">❌ KODE BUG: Karakter Melayang di Langit</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  when [space] key pressed<br>
                  &nbsp;&nbsp;repeat (10) [change y by (10)]<br>
                  <span style="color: #f87171;">⚠️ Lupa pasang repeat change y by (-10), akibatnya karakter tidak pernah turun lagi!</span>
                </div>
              </div>
              <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #10b981; font-weight: 800; font-size: 13px; margin-bottom: 4px;">✅ KODE BERSIH: Lompatan Simetris &amp; Alami</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  when [space] key pressed<br>
                  &nbsp;&nbsp;repeat (10) [change y by (10)]<br>
                  &nbsp;&nbsp;<span style="color: #34d399; font-weight: 700;">repeat (10) [change y by (-10)]</span> ➔ Karakter turun mulus ke tanah! ✅
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 9: RANGKUMAN & APRESIASI ================= -->
      <div class="slide" data-time="⏱️ Menit ke 82–87">
        <div class="slide-header">
          <div class="badge-session">Review Pemahaman • Sukses Sesi 23</div>
          <div class="badge-time">⏱️ Menit ke 82–87</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Programmer Tangguh! <span>Game Berhasil Selesai</span> 🌟
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Kalian luar biasa! Game platformer mandiri kalian sudah berdiri kokoh dan seru dimainkan! Mari ingat 3 kunci sukses hari ini:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>1️⃣ <strong>Konsep Inti:</strong> Pembangunan game mandiri dengan bimbingan personal 1-on-1 instruktur</li>
                <li>2️⃣ <strong>Fisika Platformer:</strong> Menggabungkan gerak horizontal sumbu X dan lompat gravitasi sumbu Y</li>
                <li>3️⃣ <strong>Kemandirian Debugging:</strong> Mampu meneliti dan membasmi bug koding sendiri secara teliti!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 16px; padding: 24px; text-align: center; width: 100%;">
              <div style="font-size: 48px; margin-bottom: 10px;">🏃 🏆</div>
              <h3 style="color: #10b981; font-size: 20px; font-weight: 800; margin-bottom: 6px;">Game Platformer Siap Pameran!</h3>
              <p style="color: #cbd5e1; font-size: 13.5px; line-height: 1.5;">Kamu resmi menyelesaikan fase produksi proyek mandiri Capstone Level 2 di Beekoding Academy!</p>
              <button onclick="triggerConfetti()" style="margin-top: 14px; background: #000; color: #10b981; border: 1px solid #10b981; padding: 10px 20px; border-radius: 999px; font-weight: 800; cursor: pointer; transition: transform 0.15s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                🎊 Rayakan Keberhasilan (Klik Confetti)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 10: PENUTUP & TEASER ================= -->
      <div class="slide" data-time="⏱️ Menit ke 87–90">
        <div class="slide-header">
          <div class="badge-session">Teaser Sesi Berikutnya • Hari Besar Wisuda</div>
          <div class="badge-time">⏱️ Menit ke 87–90</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Puncak Petualangan: <span>Menuju Sesi 24</span>! 🎓🎉
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Simpan file proyek Scratch kalian dengan format nama: <code>Capstone_NamaKalian.sb3</code>. Pekan depan adalah perayaan akbar kelulusan kalian!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>💾 Simpan file proyek: <code>File ➔ Save to your computer</code></li>
                <li>🎓 <strong>Sesi 24:</strong> Showcase Akbar, Presentasi Game di Depan Kelas &amp; Wisuda Level 2!</li>
                <li>👏 Berikan tepuk tangan meriah untuk diri kalian sendiri atas kerja keras hari ini!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(30, 41, 59, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 26px; text-align: center; width: 100%;">
              <div style="font-size: 52px; margin-bottom: 10px;">🎓🌟</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Sampai Jumpa di Sesi 24!</h3>
              <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.5;">Bersiap memakai toga wisuda dan memamerkan game mahakaryamu bersama Beekoding Academy!</p>
            </div>
          </div>
        </div>
      </div>
"""

    script_logic = """
    // Speaker Notes Data
    const notesData = """ + notes_json + """;

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Build Progress Dots
    const progressContainer = document.getElementById('progressDots');
    if (progressContainer) {
      progressContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        progressContainer.appendChild(dot);
      }
    }

    function updateSlide() {
      slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === currentSlide);
      });

      const dots = document.querySelectorAll('.progress-dot');
      dots.forEach((d, idx) => {
        d.classList.toggle('active', idx === currentSlide);
      });

      const counter = document.getElementById('slideCounter');
      if (counter) counter.innerText = `Slide ${currentSlide + 1} / ${totalSlides}`;

      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      if (prevBtn) prevBtn.disabled = (currentSlide === 0);
      if (nextBtn) nextBtn.disabled = (currentSlide === totalSlides - 1);

      updateNotes();
    }

    function goToSlide(n) {
      if (n >= 0 && n < totalSlides) {
        currentSlide = n;
        updateSlide();
      }
    }

    function prevSlide() {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
      }
    }

    function nextSlide() {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
      }
    }

    const prevBtnEl = document.getElementById('prevBtn');
    const nextBtnEl = document.getElementById('nextBtn');
    if (prevBtnEl) prevBtnEl.onclick = prevSlide;
    if (nextBtnEl) nextBtnEl.onclick = nextSlide;

    // Teacher Notes Drawer
    function toggleNotes() {
      const panel = document.getElementById('teacherNotesPanel');
      if (panel) panel.classList.toggle('open');
    }

    function updateNotes() {
      const data = notesData[currentSlide] || {};
      const badge = document.getElementById('notesBadge');
      const inst = document.getElementById('notesInstructions');
      const scr = document.getElementById('notesScript');

      if (badge) badge.innerText = `(${data.time || ''} • Slide ${currentSlide + 1} dari ${totalSlides})`;
      if (inst) inst.innerText = data.instructions || '';
      if (scr) scr.innerText = `Naskah Guru: "${data.script || ''}"`;
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    }

    function triggerConfetti() {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }

    // Keyboard Shortcuts (Space is reserved for simulator & games, NOT changing slides!)
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToSlide(currentSlide - 1);
      } else if (e.key === 'n' || e.key === 'N') {
        toggleNotes();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.code === 'Space' || e.key === ' ') {
        // Tombol Spasi khusus simulator Slide 2 & arcade game Slide 7 (Jump & Restart)
        const slides = document.querySelectorAll('.slide');
        const slide2 = slides[1];
        const slide7 = slides[6];
        if (slide2 && slide2.classList.contains('active')) {
          e.preventDefault();
          sim2Jump();
        } else if (slide7 && slide7.classList.contains('active')) {
          e.preventDefault();
          if (!gameRunning_23) {
            startPlayableGame_23();
          } else {
            triggerGameJump_23();
          }
        } else {
          // Mencegah spasi berpindah slide di slide lain
          e.preventDefault();
        }
      }
    });

    // Audio Synthesizer (Web Audio API)
    let audioCtx = null;
    function getAudioCtx() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }

    function playBeep(freq = 440, type = 'sine', duration = 0.15, vol = 0.25) {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {}
    }

    function playJumpSound() {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(587.33, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      } catch (e) {}
    }

    function playCoinSound() {
      playBeep(987.77, 'sine', 0.12, 0.3);
      setTimeout(() => playBeep(1318.51, 'sine', 0.18, 0.35), 80);
    }

    function playHurtSound() {
      playBeep(180, 'sawtooth', 0.25, 0.4);
    }

    // ================= SIMULATOR 1 (SLIDE 2): MINI PLATFORMER SANDBOX =================
    let sim2X = 30;
    let sim2Bottom = 18;
    let sim2IsJumping = false;
    let sim2BugActive = false;

    function sim2MoveLeft() {
      sim2X = Math.max(15, sim2X - 25);
      const el = document.getElementById('sim2Beeby');
      if (el) {
        el.style.left = `${sim2X}px`;
        el.style.transform = 'scaleX(-1)';
      }
      playBeep(320, 'sine', 0.05, 0.15);
    }

    function sim2MoveRight() {
      sim2X = Math.min(260, sim2X + 25);
      const el = document.getElementById('sim2Beeby');
      if (el) {
        el.style.left = `${sim2X}px`;
        el.style.transform = 'scaleX(1)';
      }
      playBeep(380, 'sine', 0.05, 0.15);
    }

    function sim2Jump() {
      if (sim2IsJumping) return;
      sim2IsJumping = true;
      playJumpSound();
      const el = document.getElementById('sim2Beeby');

      if (sim2BugActive) {
        // Bug: Naik terus tanpa gravitasi turun
        if (el) el.style.bottom = '120px';
        const st = document.getElementById('sim2BugStatus');
        if (st) {
          st.innerText = '⚠️ Bug: Melayang di Udara!';
          st.style.color = '#ef4444';
        }
        return;
      }

      // Fisika normal: Lompat naik lalu mendarat
      if (el) el.style.bottom = '95px';
      setTimeout(() => {
        if (el) el.style.bottom = '18px';
        setTimeout(() => { sim2IsJumping = false; }, 160);
      }, 200);
    }

    function triggerSim2Bug() {
      sim2BugActive = true;
      const st = document.getElementById('sim2BugStatus');
      if (st) {
        st.innerText = '⚠️ Bug Aktif (Lupa Gravitasi Turun)';
        st.style.color = '#ef4444';
      }
      sim2Jump();
    }

    function fixSim2Bug() {
      sim2BugActive = false;
      sim2IsJumping = false;
      const el = document.getElementById('sim2Beeby');
      if (el) el.style.bottom = '18px';
      const st = document.getElementById('sim2BugStatus');
      if (st) {
        st.innerText = '✅ Kode Diperbaiki (Gravitasi Seimbang)';
        st.style.color = '#10b981';
      }
      playCoinSound();
    }

    // ================= SIMULATOR 2 (SLIDE 7): PLAYABLE 2D PLATFORMER GAME =================
    let gameRunning_23 = false;
    let gameScore_23 = 0;
    let gameLives_23 = 3;
    let gameBeebyX_23 = 25;
    let gameBeebyY_23 = 185; // koordinat top
    let gameVelocityY_23 = 0;
    let gameIsJumping_23 = false;
    let gameAnimId_23 = null;
    let coinsCollected_23 = [false, false, false, false, false];

    // Data 3 Platform Pijakan (x, yTop, width, height)
    const platforms_23 = [
      { x: 20, y: 155, w: 85, h: 12 },
      { x: 120, y: 115, w: 80, h: 12 },
      { x: 215, y: 75, w: 85, h: 12 }
    ];

    // Posisi 5 Koin
    const coinsData_23 = [
      { id: 'coin1_23', x: 55, y: 130 },
      { id: 'coin2_23', x: 150, y: 90 },
      { id: 'coin3_23', x: 235, y: 50 },
      { id: 'coin4_23', x: 275, y: 50 },
      { id: 'coin5_23', x: 28, y: 175 }
    ];

    function startPlayableGame_23() {
      gameRunning_23 = true;
      gameScore_23 = 0;
      gameLives_23 = 3;
      gameBeebyX_23 = 25;
      gameBeebyY_23 = 180;
      gameVelocityY_23 = 0;
      gameIsJumping_23 = false;
      coinsCollected_23 = [false, false, false, false, false];

      const sc = document.getElementById('gameScore_23');
      const lv = document.getElementById('gameLives_23');
      if (sc) sc.innerText = '0';
      if (lv) lv.innerText = '3';

      coinsData_23.forEach(c => {
        const el = document.getElementById(c.id);
        if (el) el.style.display = 'block';
      });

      const overlay = document.getElementById('gameOverlay_23');
      if (overlay) overlay.style.display = 'none';

      const overScreen = document.getElementById('gameOverScreen_23');
      if (overScreen) overScreen.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_23');
      if (liveSt) {
        liveSt.innerText = '● Bertualang! Kumpulkan 5 Koin';
        liveSt.style.color = '#10b981';
      }

      if (gameAnimId_23) cancelAnimationFrame(gameAnimId_23);
      gameLoop_23();
    }

    function stopPlayableGame_23() {
      gameRunning_23 = false;
      if (gameAnimId_23) cancelAnimationFrame(gameAnimId_23);

      const overlay = document.getElementById('gameOverlay_23');
      if (overlay) overlay.style.display = 'flex';

      const overScreen = document.getElementById('gameOverScreen_23');
      if (overScreen) overScreen.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_23');
      if (liveSt) {
        liveSt.innerText = '● Permainan Dihentikan';
        liveSt.style.color = '#94a3b8';
      }
    }

    function finishGameWin_23() {
      gameRunning_23 = false;
      if (gameAnimId_23) cancelAnimationFrame(gameAnimId_23);

      const overScreen = document.getElementById('gameOverScreen_23');
      const overIcon = document.getElementById('overIcon_23');
      const overTitle = document.getElementById('overTitle_23');
      const finalScore = document.getElementById('finalScoreVal_23');

      if (overIcon) overIcon.innerText = '🏆🎉';
      if (overTitle) {
        overTitle.innerText = 'HEBAT! SEMUA KOIN TERTANGKAP!';
        overTitle.style.color = '#fbbf24';
      }
      if (finalScore) finalScore.innerText = '5/5 Koin!';
      if (overScreen) overScreen.style.display = 'flex';

      playCoinSound();
      triggerConfetti();

      const liveSt = document.getElementById('gameLiveStatus_23');
      if (liveSt) {
        liveSt.innerText = '● Kemenangan Selesai!';
        liveSt.style.color = '#fbbf24';
      }
    }

    function finishGameOver_23() {
      gameRunning_23 = false;
      if (gameAnimId_23) cancelAnimationFrame(gameAnimId_23);

      const overScreen = document.getElementById('gameOverScreen_23');
      const overIcon = document.getElementById('overIcon_23');
      const overTitle = document.getElementById('overTitle_23');
      const finalScore = document.getElementById('finalScoreVal_23');

      if (overIcon) overIcon.innerText = '💀⚠️';
      if (overTitle) {
        overTitle.innerText = 'GAME OVER! NYAWA HABIS!';
        overTitle.style.color = '#ef4444';
      }
      if (finalScore) finalScore.innerText = `${gameScore_23}/5 Koin`;
      if (overScreen) overScreen.style.display = 'flex';

      playHurtSound();

      const liveSt = document.getElementById('gameLiveStatus_23');
      if (liveSt) {
        liveSt.innerText = '● Game Over';
        liveSt.style.color = '#ef4444';
      }
    }

    function triggerGameJump_23() {
      if (!gameRunning_23) return;
      if (!gameIsJumping_23) {
        gameIsJumping_23 = true;
        gameVelocityY_23 = -8.5; // impuls lompat ke atas
        playJumpSound();
      }
    }

    function moveBeebyLeft_23() {
      if (!gameRunning_23) return;
      gameBeebyX_23 = Math.max(10, gameBeebyX_23 - 18);
      const bEl = document.getElementById('gameBeeby_23');
      if (bEl) {
        bEl.style.left = `${gameBeebyX_23}px`;
        bEl.style.transform = 'scaleX(-1)';
      }
    }

    function moveBeebyRight_23() {
      if (!gameRunning_23) return;
      const canvas = document.getElementById('gameCanvas_23');
      const maxW = canvas ? canvas.clientWidth - 40 : 280;
      gameBeebyX_23 = Math.min(maxW, gameBeebyX_23 + 18);
      const bEl = document.getElementById('gameBeeby_23');
      if (bEl) {
        bEl.style.left = `${gameBeebyX_23}px`;
        bEl.style.transform = 'scaleX(1)';
      }
    }

    // Keyboard Panah & Spasi untuk Slide 7
    window.addEventListener('keydown', (e) => {
      const slide7 = document.querySelectorAll('.slide')[6];
      if (slide7 && slide7.classList.contains('active') && gameRunning_23) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          moveBeebyLeft_23();
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          moveBeebyRight_23();
        } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          triggerGameJump_23();
        }
      }
    });

    function gameLoop_23() {
      if (!gameRunning_23) return;

      const canvas = document.getElementById('gameCanvas_23');
      const canvasH = canvas ? canvas.clientHeight : 215;

      // 1. Fisika Gravitasi & Lompat
      gameVelocityY_23 += 0.55; // percepatan gravitasi
      gameBeebyY_23 += gameVelocityY_23;

      const beebyBottom = gameBeebyY_23 + 28;
      const beebyCenter = gameBeebyX_23 + 14;

      // 2. Deteksi Mendarat di Lantai Dasar
      const groundY = canvasH - 32;
      let onPlatform = false;

      // 3. Deteksi Pijakan di Platform Melayang
      platforms_23.forEach(p => {
        if (beebyCenter > p.x && beebyCenter < p.x + p.w) {
          // Sedang jatuh dan menyentuh permukaan atas platform
          if (beebyBottom >= p.y && beebyBottom <= p.y + 12 && gameVelocityY_23 > 0) {
            gameBeebyY_23 = p.y - 28;
            gameVelocityY_23 = 0;
            gameIsJumping_23 = false;
            onPlatform = true;
          }
        }
      });

      // Jika mendarat di tanah dasar
      if (!onPlatform && gameBeebyY_23 >= groundY) {
        // Cek apakah jatuh di atas duri merah (antara x=105 sampai x=210)
        if (beebyCenter >= 105 && beebyCenter <= 210) {
          // Kena Duri Merah!
          playHurtSound();
          gameLives_23--;
          const lv = document.getElementById('gameLives_23');
          if (lv) lv.innerText = gameLives_23;

          // Teleport kembali ke platform awal
          gameBeebyX_23 = 25;
          gameBeebyY_23 = 120;
          gameVelocityY_23 = 0;

          if (gameLives_23 <= 0) {
            finishGameOver_23();
            return;
          }
        } else {
          gameBeebyY_23 = groundY;
          gameVelocityY_23 = 0;
          gameIsJumping_23 = false;
        }
      }

      // 4. Deteksi Mengambil Koin Emas
      coinsData_23.forEach((c, idx) => {
        if (!coinsCollected_23[idx]) {
          const dist = Math.hypot(beebyCenter - (c.x + 8), (gameBeebyY_23 + 14) - (c.y + 8));
          if (dist < 22) {
            coinsCollected_23[idx] = true;
            gameScore_23++;
            playCoinSound();
            const sc = document.getElementById('gameScore_23');
            if (sc) sc.innerText = gameScore_23;

            const cEl = document.getElementById(c.id);
            if (cEl) cEl.style.display = 'none';

            // Jika semua 5 koin terkumpul
            if (gameScore_23 >= 5) {
              finishGameWin_23();
              return;
            }
          }
        }
      });

      // Render Posisi Beeby
      const bEl = document.getElementById('gameBeeby_23');
      if (bEl) {
        bEl.style.top = `${gameBeebyY_23}px`;
        bEl.style.left = `${gameBeebyX_23}px`;
      }

      gameAnimId_23 = requestAnimationFrame(gameLoop_23);
    }

    // Initialize
    updateSlide();
    """

    final_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slide Mengajar: Sesi 23 - Produksi Proyek Mandiri: Game Platformer Cilik | Beekoding Academy</title>
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
      <span class="brand-stage-badge">STAGE 2: SESI 23</span>
    </div>

    <div class="toolbar-actions">
      <a href="/slides/index.html" class="btn-nav-sesi" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 800;" title="Buka Portal Semua Sesi &amp; Stage">🗂️ Semua Sesi</a>
      <a href="/slides/sesi-22/index.html" class="btn-nav-sesi">⏪ Sesi 22</a>
      <a href="/slides/sesi-24/index.html" class="btn-nav-sesi">Sesi 24 ⏩</a>
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
{script_logic}
  </script>
</body>
</html>
"""

    SESI23_HTML_PATH.write_text(final_html, encoding="utf-8")
    o = final_html.count("<div")
    c = final_html.count("</div")
    print(f"[OK] Sesi 23 updated. Open div: {o}, Close div: {c}, Diff: {o - c}")

if __name__ == "__main__":
    build_sesi23()
