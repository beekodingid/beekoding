import os
import sys
import json
import shutil
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

ARTIFACT_DIR = Path(r"C:\Users\devop\.gemini\antigravity\brain\645a5bda-8de7-4b62-a0d1-1f8ba42f03f5")
SESI19_DIR = Path(r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\public\slides\sesi-19")
SESI19_HTML_PATH = SESI19_DIR / "index.html"

def build_sesi19():
    # Copy 3D flying hero image as beeby-flappy.jpg
    src_img = ARTIFACT_DIR / "beeby_flying_3d_1791793648391.jpg"
    dest_img = SESI19_DIR / "beeby-flappy.jpg"
    if src_img.exists():
        shutil.copy2(src_img, dest_img)
        print(f"[OK] Copied {src_img.name} to {dest_img.name}")

    # Read existing styling to keep 100% exact styling
    existing_html = SESI19_HTML_PATH.read_text(encoding="utf-8")
    style_start = existing_html.find("<style>")
    style_end = existing_html.find("</style>") + len("</style>")
    style_block = existing_html[style_start:style_end]

    notes = [
        {
            "title": "Slide 1: Pembukaan & Sambutan Sesi 19",
            "time": "Menit 00–10 (Total 90 Menit)",
            "instructions": "Sambut siswa dengan antusiasme membuat remake game legendaris Flappy Bird versi lebah: Flappy Bee! Tunjukkan ilustrasi 3D Beeby terbang di layar.",
            "script": "Halo para Game Creator Hebat! Selamat datang di Sesi 19! Siapa yang tahu game paling viral di dunia, Flappy Bird? Hari ini kita akan membuat mahakarya kita sendiri: Flappy Bee! Kita akan memprogram sayap lebah yang mengepak dengan tombol spasi dan rintangan pipa yang meluncur menyamping!"
        },
        {
            "title": "Slide 2: Konsep Dasar & Simulator Flappy Bee",
            "time": "Menit 10–22",
            "instructions": "Jelaskan 2 komponen utama: gravitasi konstan yang menarik lebah turun, dan tombol spasi yang mengepakkan sayap lebah ke atas. Demonstrasikan simulator interaktif di layar kanan.",
            "script": "Coba perhatikan simulator di layar sebelah kanan! Secara alami, lebah ditarik gravitasi ke bawah terus menerus. Tugas kita adalah menekan tombol SPASI untuk mengepakkan sayap lebah ke atas dan menjaga ketinggian agar bisa lolos menembus celah pipa!"
        },
        {
            "title": "Slide 3: Balok Kunci & Gravitasi Konstan Lebah",
            "time": "Menit 22–32",
            "instructions": "Bimbing siswa memprogram gerakan jatuh alami lebah menggunakan forever [change y by -3] dan deteksi jatuh ke tanah.",
            "script": "Pertama, kita pasang gravitasi alami pada Beeby! Di dalam loop forever, kita masukkan change y by (-3). Jika pemain tidak menekan tombol apa pun, lebah akan meluncur turun ke tanah!"
        },
        {
            "title": "Slide 4: Logika Kepakan Sayap: Tombol Spasi",
            "time": "Menit 32–42",
            "instructions": "Pandu siswa merakit balok when space key pressed -> change y by (25) -> start sound [FlapWing].",
            "script": "Sekarang kita buat kendali terbangnya! Setiap kali tombol SPASI ditekan, kita bunyikan suara kepakan sayap dan angkat posisi lebah ke atas dengan change y by (25)! Tekan berirama agar lebah tetap stabil di udara!"
        },
        {
            "title": "Slide 5: Scrolling Pipa Menyamping & Deteksi Skor",
            "time": "Menit 42–52",
            "instructions": "Jelaskan konsep ilusi gerak: pipa meluncur dari kanan ke kiri dengan change x by (-6), dan posisi Y pipa diacak dengan pick random.",
            "script": "Di game Flappy Bee, bukan lebah yang maju ke depan, melainkan pipanya yang berjalan mundur ke kiri! Ketika pipa sampai di ujung kiri layar, pipa langsung teleportasi kembali ke kanan dengan ketinggian celah acak, dan skor pemain bertambah 1!"
        },
        {
            "title": "Slide 6: Alur Algoritma Game Flappy Bee",
            "time": "Menit 52–62",
            "instructions": "Jelaskan alur sistem: Gravitasi Turun vs Kepakan Spasi -> Pipa Scrolling Menyamping -> Cek Tabrakan vs Skor Lewat Celah.",
            "script": "Mari kita lihat alur kerja game kita: gravitasi menarik turun, spasi mendorong naik, pipa bergerak ke samping, dan skor bertambah setiap kali lebah berhasil menembus celah pipa!"
        },
        {
            "title": "Slide 7: Playable Arcade: Game Flappy Bee Penuh",
            "time": "Menit 62–74",
            "instructions": "Beri kebebasan siswa memainkan simulator Flappy Bee di slide dan bertanding menembus pipa sebanyak-banyaknya.",
            "script": "Waktunya bertanding! Tekan tombol SPASI di keyboard untuk mengepakkan sayap Beeby. Jaga ketinggian terbang dan tembus pipa rintangan sebanyak-banyaknya! Siapa yang bisa menembus 5 pipa berturut-turut?"
        },
        {
            "title": "Slide 8: Klinik Dokter Kode: Mengatur Celah Pipa & Keseimbangan Lonjakan",
            "time": "Menit 74–82",
            "instructions": "Bahas bug klasik: lonjakan spasi terlalu tinggi sehingga lebah menabrak pipa atas, atau celah pipa terlalu sempit.",
            "script": "Dokter Kode hadir! Kalau lebah kalian selalu menabrak pipa atas saat spasi ditekan, kecilkan angka change y by dari 50 menjadi 25! Pastikan celah pipa cukup lebar untuk dilewati lebah dengan aman!"
        },
        {
            "title": "Slide 9: Rangkuman & Pesta Apresiasi Flappy Bee",
            "time": "Menit 82–87",
            "instructions": "Ajak siswa merayakan keberhasilan merakit game Flappy Bee dengan menekan tombol konfeti bersama.",
            "script": "Luar biasa! Kalian sudah berhasil memprogram mekanik game legendaris Flappy Bee yang mendunia! Klik tombol konfeti dan beri tepuk tangan untuk kita semua!"
        },
        {
            "title": "Slide 10: Penutup & Teaser Sesi 20",
            "time": "Menit 87–90",
            "instructions": "Ingatkan siswa menyimpan file proyek Scratch (.sb3) dan berikan teaser item Power-Up Magnet Buah di Sesi 20.",
            "script": "Simpan proyek kalian ya! Di Sesi 20 pekan depan, kita akan menambahkan item Power-Up ajaib: Magnet Penarik Buah dan Mangkuk Raksasa! Sampai jumpa, para kreator cilik!"
        }
    ]
    notes_json = json.dumps(notes, indent=6, ensure_ascii=False)

    slides_html = """      <!-- ================= SLIDE 1: COVER ================= -->
      <div class="slide active" data-time="⏱️ Menit ke 00–10">
        <div class="slide-header">
          <div class="badge-session">Sesi 19 • Flappy Bee</div>
          <div class="badge-time">⏱️ Menit ke 00–10</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h1 class="slide-title">
              Misi Arkade: <span>Game Flappy Bee (Menembus Pipa)</span>! 🐝
            </h1>
            <p style="color: #cbd5e1; font-size: 15.5px; margin: 12px 0 18px; line-height: 1.55;">
              Selamat datang di <strong>STAGE 2: SESI 19</strong>! Hari ini kita membongkar rahasia game legendaris dunia: <strong>Scrolling Rintangan Pipa Menyamping dan Menjaga Ketinggian Terbang dengan Tombol Spasi</strong>. Uji refleksmu untuk menembus celah rintangan tanpa menabrak!
            </p>
            <div class="concept-card">
              <div style="color: #fbbf24; font-weight: 800; font-size: 13.5px; margin-bottom: 6px;">🎯 Misi Utama Hari Ini:</div>
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🐝 <strong>Konsep &amp; Inti:</strong> Scrolling rintangan pipa menyamping dan menjaga ketinggian terbang</li>
                <li>⌨️ <strong>Instruksi / Kode:</strong> Tombol spasi mengepakkan sayap lebah ke atas <code>change y by (25)</code></li>
                <li>🧱 <strong>Scrolling Pipa:</strong> Rintangan pipa meluncur ke kiri dengan celah acak <code>pick random</code></li>
                <li>🎯 <strong>Target Skor:</strong> Menembus celah pipa dengan aman untuk mencetak poin kemenangan!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <img src="beeby-flappy.jpg" alt="Game Flappy Bee Menembus Pipa - Beekoding Level 2" class="hero-img" />
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 2: KONSEP DASAR & SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 10–22">
        <div class="slide-header">
          <div class="badge-session">Konsep Dasar • Scrolling Pipa &amp; Kepakan Sayap</div>
          <div class="badge-time">⏱️ Menit ke 10–22</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Fisika Flappy Bee: <span>Jatuh Alami vs Kepakan Spasi</span> 🤔
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Game Flappy Bee bekerja dengan pertarungan 2 gaya gerak: gaya gravitasi yang menarik lebah turun terus-menerus, dan dorongan kepakan sayap ke atas saat tombol spasi ditekan!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⬇️ <strong>Gravitasi Alami:</strong> <code>change y by (-3)</code> membuat lebah meluncur turun perlahan</li>
                <li>🪽 <strong>Kepakan Spasi:</strong> <code>change y by (25)</code> mengangkat lebah ke atas seketika</li>
                <li>➡️ <strong>Scrolling Menyamping:</strong> Pipa rintangan bergerak mundur dari kanan ke kiri</li>
                <li>📐 <strong>Celah Aman:</strong> Jaga posisi lebah tepat di tengah lubang pipa!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <span style="font-weight: 800; font-size: 13px; color: #38bdf8;">🐝 Simulator Flappy Bee</span>
                <span id="sim2StatusBadge" style="color: #10b981; font-size: 12px; font-weight: 700;">Terbang Stabil</span>
              </div>
              <div id="sim2Stage" style="height: 190px; background: linear-gradient(180deg, #0284c7 0%, #38bdf8 70%, #15803d 71%, #166534 100%); display: flex; align-items: center; justify-content: center; position: relative; padding: 12px; overflow: hidden;">
                <!-- Pipa Atas Demo -->
                <div id="sim2PipeTop" style="position: absolute; top: 0; left: 210px; width: 34px; height: 60px; background: #22c55e; border: 2px solid #14532d; border-top: none; border-radius: 0 0 6px 6px;"></div>
                <!-- Pipa Bawah Demo -->
                <div id="sim2PipeBottom" style="position: absolute; bottom: 25px; left: 210px; width: 34px; height: 55px; background: #22c55e; border: 2px solid #14532d; border-bottom: none; border-radius: 6px 6px 0 0;"></div>

                <!-- Sprite Beeby -->
                <div id="sim2BeebySprite" style="position: absolute; left: 70px; top: 75px; font-size: 34px; transition: top 0.08s ease-out; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));">
                  🐝
                </div>

                <div id="sim2SubText" style="position: absolute; bottom: 4px; color: #a7f3d0; font-size: 10.5px; font-weight: 700;">
                  Tekan SPASI untuk melawan gravitasi &amp; tembus celah pipa!
                </div>
              </div>
              <div style="padding: 10px 14px; background: #0f172a; display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                <button id="sim2FlapBtn" onclick="triggerSim2Flap()" style="background: #f59e0b; border: none; color: #000; font-size: 12px; font-weight: 800; padding: 7px 16px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                  🪽 Tekan SPASI (Kepakkan Sayap!)
                </button>
                <button onclick="resetSim2Flap()" style="background: #1e293b; border: 1px solid #475569; color: #cbd5e1; font-size: 11.5px; font-weight: 700; padding: 7px 12px; border-radius: 8px; cursor: pointer;">
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
          <div class="badge-session">Bedah Balok Kode • Gravitasi Alami Lebah</div>
          <div class="badge-time">⏱️ Menit ke 22–32</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Balok Kunci: <span>Gravitasi Turun Berkelanjutan</span> 🧩
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Di awal permainan, Beeby diletakkan di tengah panggung (<code>x: -120, y: 0</code>). Di dalam loop <code>forever</code>, koordinat Y terus dikurangi sebesar <code>-3</code> agar lebah ditarik jatuh secara alami!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>when ⚑ clicked:</strong> Meletakkan Beeby di posisi awal terbang</li>
                <li>📍 <strong>go to x: (-120) y: (0):</strong> Menjaga posisi horizontal Beeby di sisi kiri</li>
                <li>🔄 <strong>forever [change y by (-3)]:</strong> Menghadirkan gaya gravitasi konstan</li>
                <li>💀 <strong>Deteksi Batas Bawah:</strong> Jika menyentuh lantai (y &lt; -160) ➔ Game Over!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block motion">
                go to x: <span class="block-input">-120</span> y: <span class="block-input">0</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">Skor ▾</span> to <span class="block-input">0</span>
              </div>
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block motion">
                    change y by <span class="block-input">-3</span>
                  </div>
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-operator"><span class="scratch-inline-sensing">y position</span> &lt; <span class="block-input">-160</span></span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block event" style="background:#ffab19; color:#fff;">
                        broadcast <span class="block-input">GameOver ▾</span>
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
          <div class="badge-session">Mekanik Inti • Kepakan Sayap Spasi</div>
          <div class="badge-time">⏱️ Menit ke 32–42</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Kepakan Sayap: <span>Tombol Spasi Melawan Gravitasi</span> ⚡
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Inilah instruksi kunci kendali pemain: saat tombol <strong>SPASI</strong> ditekan, mainkan suara kepakan sayap dan angkat posisi lebah ke atas sebesar <code>change y by (25)</code>!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⌨️ <strong>when [space] key pressed:</strong> Respons instan dari jempol pemain</li>
                <li>🔊 <strong>start sound [FlapWing]:</strong> Efek suara kepakan sayap lebah yang lucu</li>
                <li>⬆️ <strong>change y by (25):</strong> Mengangkat lebah naik seketika untuk melawan gravitasi</li>
                <li>🎮 <strong>Irama Terbang:</strong> Tekan spasi berirama agar lebah melayang stabil!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block event">
                when <span class="block-input">space ▾</span> key pressed
              </div>
              <div class="scratch-block sound">
                start sound <span class="block-input">FlapWing ▾</span>
              </div>
              <div class="scratch-block motion">
                change y by <span class="block-input">25</span>
              </div>
              <div class="scratch-block motion">
                point in direction <span class="block-input">75</span>
              </div>
              <div class="scratch-block control">
                wait <span class="block-input">0.1</span> seconds
              </div>
              <div class="scratch-block motion">
                point in direction <span class="block-input">90</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 5: SINYAL BROADCAST & RESPON ================= -->
      <div class="slide" data-time="⏱️ Menit ke 42–52">
        <div class="slide-header">
          <div class="badge-session">Rintangan Pipa • Scrolling Menyamping &amp; Celah Acak</div>
          <div class="badge-time">⏱️ Menit ke 42–52</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Scrolling Pipa: <span>Meluncur Menyamping ke Kiri</span> 📢
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Rintangan pipa muncul dari kanan (<code>x: 240</code>) lalu meluncur ke kiri dengan <code>change x by (-6)</code>. Saat melewati Beeby, skor bertambah dan pipa kembali ke kanan dengan celah acak!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⬅️ <strong>change x by (-6):</strong> Rintangan pipa meluncur mundur menyamping</li>
                <li>🎲 <strong>pick random (-60 to 60):</strong> Mengacak ketinggian celah pipa</li>
                <li>🎯 <strong>change [Skor] by (1):</strong> Poin didapat saat berhasil menembus celah</li>
                <li>💥 <strong>if &lt;touching Beeby?&gt;:</strong> Siarkan pesan <code>broadcast [GameOver]</code>!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block motion">
                    change x by <span class="block-input">-6</span>
                  </div>
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-operator"><span class="scratch-inline-sensing">x position</span> &lt; <span class="block-input">-240</span></span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block motion">
                        go to x: <span class="block-input">240</span> y: <span class="scratch-inline-operator">pick random <span class="block-input">-60</span> to <span class="block-input">60</span></span>
                      </div>
                      <div class="scratch-block variable">
                        change <span class="block-input">Skor ▾</span> by <span class="block-input">1</span>
                      </div>
                      <div class="scratch-block sound">
                        start sound <span class="block-input">PointDing ▾</span>
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
          <div class="badge-session">Algoritma Game • Siklus Lengkap Flappy Bee</div>
          <div class="badge-time">⏱️ Menit ke 52–62</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Siklus Sistem: <span>Gravitasi ➔ Kepakan ➔ Scrolling Pipa</span> 🗺️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Berikut alur pikir logika yang berjalan harmonis saat game Flappy Bee dimainkan:
            </p>
            <div class="concept-card">
              <ol style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.7;">
                <li>1️⃣ <strong>Gravitasi Aktif:</strong> Beeby turun perlahan sebesar <code>-3</code> setiap saat</li>
                <li>2️⃣ <strong>Pemain Menekan SPASI:</strong> Beeby melesat naik <code>+25</code> melawan gravitasi</li>
                <li>3️⃣ <strong>Pipa Scrolling Menyamping:</strong> Rintangan bergeser ke kiri sebesar <code>-6</code></li>
                <li>4️⃣ <strong>Evaluasi:</strong> Lolos celah pipa ➔ <code>Skor +1</code> | Menabrak pipa / tanah ➔ <code>GameOver</code>!</li>
              </ol>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: #090d16; border: 2px solid #22c55e; border-radius: 16px; padding: 22px; width: 100%; text-align: center;">
              <div style="font-size: 42px; margin-bottom: 8px;">⬇️ ➔ 🪽 ➔ 🧱 ➔ 🏆</div>
              <h4 style="color: #22c55e; font-size: 16px; font-weight: 800; margin-bottom: 6px;">Arsitektur Game Flappy Bee</h4>
              <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5;">Perpaduan gravitasi konstan, kontrol impuls spasi, dan scrolling rintangan tanpa henti!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 7: PLAYABLE SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 62–74">
        <div class="slide-header">
          <div class="badge-session">Playable Arcade • Game Flappy Bee Nyata</div>
          <div class="badge-time">⏱️ Menit ke 62–74</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Mainkan Hasilnya: <span>Game Flappy Bee</span>! 🎮
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Waktunya beraksi! Tekan <strong>SPASI</strong> pada keyboard atau klik tombol kepak untuk menjaga ketinggian terbang Beeby dan tembus pipa sebanyak mungkin!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>Klik Bendera Hijau:</strong> Memulai simulasi Flappy Bee</li>
                <li>⌨️ <strong>Tekan Tombol SPASI:</strong> Mengepakkan sayap lebah ke atas</li>
                <li>🧱 <strong>Tembus Pipa Hijau:</strong> Raih +1 Poin setiap menembus sepasang pipa</li>
                <li>💥 <strong>Jangan Menabrak:</strong> Hindari pipa dan jangan sampai jatuh ke tanah!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <div class="sim-btns">
                  <button class="btn-green-flag" onclick="startPlayableGame_19()" title="Mulai Flappy Bee">🚩</button>
                  <button class="btn-red-stop" onclick="stopPlayableGame_19()" title="Hentikan Game">🛑</button>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <div class="sim-score-badge">
                    🏆 PIPA DITEMBUS: <span id="gameScore_19">0</span>
                  </div>
                </div>
              </div>

              <div id="gameCanvas_19" class="sim-canvas" style="background: linear-gradient(180deg, #0284c7 0%, #38bdf8 65%, #15803d 66%, #166534 100%); position: relative; overflow: hidden;">
                <!-- Overlay Mulai -->
                <div id="gameOverlay_19" style="position: absolute; inset: 0; background: rgba(0,0,0,0.78); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; padding: 16px; text-align: center;">
                  <span style="font-size: 36px; margin-bottom: 6px;">🐝🧱</span>
                  <span style="font-size: 14px; font-weight: 800; color: #fbbf24;">Tantangan Flappy Bee: Tembus Pipa!</span>
                  <span style="font-size: 11.5px; color: #cbd5e1; margin: 4px 0 12px;">Tekan SPASI di keyboard untuk mengepakkan sayap lebah ke atas!</span>
                  <button onclick="startPlayableGame_19()" style="background: #10b981; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 13px; font-weight: 700; padding: 7px 18px; border-radius: 999px; cursor: pointer;">
                    🚩 Mulai Sekarang (Tekan Spasi)
                  </button>
                </div>

                <!-- Overlay Game Over Screen -->
                <div id="gameOverScreen_19" style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.94); display: none; flex-direction: column; align-items: center; justify-content: center; z-index: 25; padding: 16px; text-align: center;">
                  <span style="font-size: 42px; margin-bottom: 4px;">💥💀</span>
                  <span style="font-size: 17px; font-weight: 800; color: #ef4444;">GAME OVER! MENABRAK PIPA!</span>
                  <span style="font-size: 12.5px; color: #cbd5e1; margin-top: 4px;">Skor Akhir Kamu: <strong id="finalScoreVal_19" style="font-size: 18px; color: #fbbf24;">0</strong> Pipa Ditembus!</span>
                  <button onclick="startPlayableGame_19()" style="margin-top: 12px; background: #f59e0b; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 12px; font-weight: 700; padding: 6px 16px; border-radius: 999px; cursor: pointer;">
                    🔄 Main Ulang (Tekan Spasi)
                  </button>
                </div>

                <!-- Sprite Beeby (Karakter) -->
                <div id="gameBeeby_19" style="position: absolute; font-size: 32px; left: 50px; top: 90px; pointer-events: none; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4)); transition: transform 0.1s;">🐝</div>

                <!-- Pipa Atas -->
                <div id="gamePipeTop_19" style="position: absolute; top: 0; width: 38px; height: 60px; background: #22c55e; border: 2px solid #14532d; border-top: none; border-radius: 0 0 6px 6px; pointer-events: none; left: 340px;"></div>
                <!-- Pipa Bawah -->
                <div id="gamePipeBottom_19" style="position: absolute; bottom: 25px; width: 38px; height: 60px; background: #22c55e; border: 2px solid #14532d; border-bottom: none; border-radius: 6px 6px 0 0; pointer-events: none; left: 340px;"></div>
              </div>

              <div style="background: #0f172a; padding: 8px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1e293b; font-size: 11px;">
                <button onclick="triggerGameFlap_19()" style="background: #f59e0b; border: none; color: #000; font-weight: 800; font-size: 11.5px; padding: 5px 14px; border-radius: 6px; cursor: pointer;">
                  🪽 KEPAKKAN SAYAP (SPASI)
                </button>
                <span id="gameLiveStatus_19" style="color: #10b981;">● Siap Terbang</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 8: DOKTER KODE ================= -->
      <div class="slide" data-time="⏱️ Menit ke 74–82">
        <div class="slide-header">
          <div class="badge-session">Klinik Debugging • Menyeimbangkan Kepakan Sayap</div>
          <div class="badge-time">⏱️ Menit ke 74–82</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Dokter Kode: <span>Menangani Kepakan Sayap Terlalu Tinggi</span> 🐛
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Bug paling sering dialami pada game Flappy Bird adalah lebah melenting terlalu tinggi saat tombol spasi ditekan, sehingga kepala lebah langsung membentur pipa atas! Yuk lihat solusinya:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>📏 Gunakan angka kepakan yang pas: <code>change y by (25)</code>, jangan terlalu besar seperti 60 atau 80</li>
                <li>🧱 Pastikan celah antara pipa atas dan pipa bawah cukup lapang (minimal 80px)</li>
                <li>🔄 Jangan lupa gravitasi jatuh <code>change y by (-3)</code> harus stabil di dalam loop forever</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
              <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #ef4444; font-weight: 800; font-size: 13px; margin-bottom: 4px;">❌ KODE SALAH: Kepakan Terlalu Ekstrem</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  when [space] key pressed<br>
                  &nbsp;&nbsp;change y by (80)<br>
                  <span style="color: #f87171;">⚠️ Sekali pencet spasi lebah melenting terlalu tinggi dan langsung menabrak pipa atas!</span>
                </div>
              </div>
              <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #10b981; font-weight: 800; font-size: 13px; margin-bottom: 4px;">✅ KODE BENAR: Kepakan Terukur &amp; Terkendali</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  when [space] key pressed<br>
                  &nbsp;&nbsp;start sound [FlapWing ▾]<br>
                  &nbsp;&nbsp;<span style="color: #34d399; font-weight: 700;">change y by (25)</span>  ➔ Lompatan terkendali &amp; nyaman! ✅
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 9: RANGKUMAN & APRESIASI ================= -->
      <div class="slide" data-time="⏱️ Menit ke 82–87">
        <div class="slide-header">
          <div class="badge-session">Review Pemahaman • Sukses Sesi 19</div>
          <div class="badge-time">⏱️ Menit ke 82–87</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Flappy Master! <span>Review Kunci Hari Ini</span> 🌟
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Selamat! Kamu telah menguasai mekanik game paling populer di dunia: Flappy Bee! Mari ingat 3 kunci penting hari ini:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>1️⃣ <strong>Konsep Inti:</strong> Scrolling rintangan pipa menyamping dan menjaga ketinggian terbang</li>
                <li>2️⃣ <strong>Instruksi Kode:</strong> Tombol spasi mengepakkan sayap lebah ke atas <code>change y by (25)</code></li>
                <li>3️⃣ <strong>Keseimbangan Game:</strong> Menyeimbangkan gravitasi jatuh dengan impuls kepakan sayap</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e; border-radius: 16px; padding: 24px; text-align: center; width: 100%;">
              <div style="font-size: 48px; margin-bottom: 10px;">🏆 🐝</div>
              <h3 style="color: #22c55e; font-size: 20px; font-weight: 800; margin-bottom: 6px;">Kerja Keras Terbayar!</h3>
              <p style="color: #cbd5e1; font-size: 13.5px; line-height: 1.5;">Kamu resmi menguasai modul Game Flappy Bee &amp; Scrolling Rintangan di Beekoding Academy!</p>
              <button onclick="triggerConfetti()" style="margin-top: 14px; background: #000; color: #22c55e; border: 1px solid #22c55e; padding: 10px 20px; border-radius: 999px; font-weight: 800; cursor: pointer; transition: transform 0.15s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
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
              Petualangan Berlanjut: <span>Menuju Sesi 20</span>! 🚀
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Game Flappy buatanmu sangat seru dan adiktif! Jangan lupa simpan file proyek Scratch (.sb3) di laptopmu hari ini.
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>💾 Klik <code>File ➔ Save to your computer</code> di Scratch Studio</li>
                <li>🧲 <strong>Sesi 20:</strong> Koleksi Power-Up Ajaib: Magnet Buah &amp; Keranjang Raksasa!</li>
                <li>👏 Berikan tepuk tangan meriah untuk seluruh teman di kelas!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(30, 41, 59, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 26px; text-align: center; width: 100%;">
              <div style="font-size: 52px; margin-bottom: 10px;">🌟🧲</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Sampai Jumpa di Sesi 20!</h3>
              <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.5;">Tetap semangat bereksplorasi dan berkreasi membuat game impian bersama Beekoding Academy!</p>
            </div>
          </div>
        </div>
      </div>"""

    sim_js = """
    // ================= AUDIO HELPER (FLAP SOUND, POINT SOUND & HIT SOUND) =================
    function playFlapSound() {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } catch(e) {}
    }

    function playPointSound() {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch(e) {}
    }

    function playHitSound() {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } catch(e) {}
    }

    // ================= SIMULATOR 1 (SLIDE 2): INTERACTIVE FLAPPY WINGS =================
    let sim2BeebyTop = 75;

    function triggerSim2Flap() {
      playFlapSound();
      sim2BeebyTop = Math.max(10, sim2BeebyTop - 25);
      const sprite = document.getElementById('sim2BeebySprite');
      if (sprite) {
        sprite.style.top = `${sim2BeebyTop}px`;
        sprite.style.transform = 'rotate(-15deg)';
        setTimeout(() => { if (sprite) sprite.style.transform = 'rotate(0deg)'; }, 100);
      }
      const st = document.getElementById('sim2StatusBadge');
      if (st) {
        st.innerText = 'Mengepak Naik (+25px)!';
        st.style.color = '#fbbf24';
        setTimeout(() => { if (st) { st.innerText = 'Terbang Stabil'; st.style.color = '#10b981'; } }, 300);
      }
    }

    function resetSim2Flap() {
      sim2BeebyTop = 75;
      const sprite = document.getElementById('sim2BeebySprite');
      if (sprite) {
        sprite.style.top = `${sim2BeebyTop}px`;
        sprite.style.transform = 'rotate(0deg)';
      }
    }

    // ================= SIMULATOR 2 (SLIDE 7): PLAYABLE FLAPPY BEE GAME =================
    let gameRunning_19 = false;
    let gameScore_19 = 0;
    let gameBeebyY_19 = 90; // koordinat top
    let gameVelocityY_19 = 0;
    let gamePipeX_19 = 340;
    let gamePipeGapY_19 = 85; // pusat celah
    let gamePipeGapHeight_19 = 75; // tinggi celah aman
    let gameAnimId_19 = null;
    let gameHasClearedPipe_19 = false;

    function startPlayableGame_19() {
      gameRunning_19 = true;
      gameScore_19 = 0;
      gameBeebyY_19 = 90;
      gameVelocityY_19 = 0;
      gamePipeX_19 = 340;
      gamePipeGapY_19 = 85;
      gameHasClearedPipe_19 = false;

      const scoreEl = document.getElementById('gameScore_19');
      if (scoreEl) scoreEl.innerText = '0';

      const overlay = document.getElementById('gameOverlay_19');
      if (overlay) overlay.style.display = 'none';

      const overScreen = document.getElementById('gameOverScreen_19');
      if (overScreen) overScreen.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_19');
      if (liveSt) {
        liveSt.innerText = '● Bertanding! Tekan Spasi untuk Terbang';
        liveSt.style.color = '#10b981';
      }

      if (gameAnimId_19) cancelAnimationFrame(gameAnimId_19);
      gameLoop_19();
    }

    function stopPlayableGame_19() {
      gameRunning_19 = false;
      if (gameAnimId_19) cancelAnimationFrame(gameAnimId_19);

      const overlay = document.getElementById('gameOverlay_19');
      if (overlay) overlay.style.display = 'flex';

      const overScreen = document.getElementById('gameOverScreen_19');
      if (overScreen) overScreen.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_19');
      if (liveSt) {
        liveSt.innerText = '● Permainan Dihentikan';
        liveSt.style.color = '#94a3b8';
      }
    }

    function finishGameOver_19() {
      gameRunning_19 = false;
      if (gameAnimId_19) cancelAnimationFrame(gameAnimId_19);

      playHitSound();

      const finalScore = document.getElementById('finalScoreVal_19');
      if (finalScore) finalScore.innerText = gameScore_19;

      const overScreen = document.getElementById('gameOverScreen_19');
      if (overScreen) overScreen.style.display = 'flex';

      const liveSt = document.getElementById('gameLiveStatus_19');
      if (liveSt) {
        liveSt.innerText = '● Game Over - Menabrak Pipa!';
        liveSt.style.color = '#ef4444';
      }
    }

    function triggerGameFlap_19() {
      if (!gameRunning_19) return;
      playFlapSound();
      gameVelocityY_19 = -5.5; // impuls ke atas
      const beebyEl = document.getElementById('gameBeeby_19');
      if (beebyEl) {
        beebyEl.style.transform = 'rotate(-20deg)';
        setTimeout(() => { if (beebyEl) beebyEl.style.transform = 'rotate(10deg)'; }, 140);
      }
    }

    // Keyboard listener SPASI
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        const slide7 = document.querySelectorAll('.slide')[6];
        if (slide7 && slide7.classList.contains('active')) {
          e.preventDefault();
          triggerGameFlap_19();
        }
      }
    });

    function gameLoop_19() {
      if (!gameRunning_19) return;

      const canvas = document.getElementById('gameCanvas_19');
      const canvasW = canvas ? canvas.clientWidth : 340;
      const canvasH = canvas ? canvas.clientHeight : 220;

      // 1. Fisika Beeby (Gravitasi terus-menerus)
      gameVelocityY_19 += 0.35; // percepatan gravitasi
      gameBeebyY_19 += gameVelocityY_19;

      // Cek jatuh ke tanah atau mentok langit
      const groundY = canvasH - 50;
      if (gameBeebyY_19 > groundY) {
        finishGameOver_19();
        return;
      }
      if (gameBeebyY_19 < 0) {
        gameBeebyY_19 = 0;
        gameVelocityY_19 = 0;
      }

      // 2. Scrolling Pipa Menyamping ke Kiri
      gamePipeX_19 -= 3.2;

      // Dimensi Beeby & Pipa
      const beebyX = 50;
      const beebyW = 28;
      const beebyH = 26;
      const pipeW = 38;

      const topPipeH = gamePipeGapY_19 - (gamePipeGapHeight_19 / 2);
      const bottomPipeTop = gamePipeGapY_19 + (gamePipeGapHeight_19 / 2);

      // Cek Tabrakan dengan Pipa
      if (gamePipeX_19 < beebyX + beebyW && gamePipeX_19 + pipeW > beebyX) {
        // Tabrakan Pipa Atas
        if (gameBeebyY_19 < topPipeH) {
          finishGameOver_19();
          return;
        }
        // Tabrakan Pipa Bawah
        if (gameBeebyY_19 + beebyH > bottomPipeTop) {
          finishGameOver_19();
          return;
        }

        // Jika berhasil menembus celah pipa
        if (!gameHasClearedPipe_19) {
          gameHasClearedPipe_19 = true;
          gameScore_19++;
          const scoreEl = document.getElementById('gameScore_19');
          if (scoreEl) scoreEl.innerText = gameScore_19;
          playPointSound();
        }
      }

      // Reset Pipa saat keluar sisi kiri
      if (gamePipeX_19 < -50) {
        gamePipeX_19 = canvasW + 20;
        // Acak ketinggian celah pipa
        gamePipeGapY_19 = Math.floor(Math.random() * 80) + 55;
        gameHasClearedPipe_19 = false;
      }

      // Render Posisi di Canvas
      const beebyEl = document.getElementById('gameBeeby_19');
      if (beebyEl) {
        beebyEl.style.top = `${gameBeebyY_19}px`;
      }

      const pTop = document.getElementById('gamePipeTop_19');
      const pBot = document.getElementById('gamePipeBottom_19');
      if (pTop && pBot) {
        pTop.style.left = `${gamePipeX_19}px`;
        pTop.style.height = `${Math.max(10, topPipeH)}px`;

        pBot.style.left = `${gamePipeX_19}px`;
        pBot.style.top = `${bottomPipeTop}px`;
        pBot.style.height = `${Math.max(10, canvasH - 25 - bottomPipeTop)}px`;
      }

      gameAnimId_19 = requestAnimationFrame(gameLoop_19);
    }
    """

    full_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slide Mengajar: Sesi 19 - Game Flappy Bee: Menembus Pipa Rintangan | Beekoding Academy</title>
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
      <span class="brand-stage-badge">STAGE 2: SESI 19</span>
    </div>

    <div class="toolbar-actions">
      <a href="/slides/index.html" class="btn-nav-sesi" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 800;" title="Buka Portal Semua Sesi &amp; Stage">🗂️ Semua Sesi</a>
      <a href="/slides/sesi-18/index.html" class="btn-nav-sesi">⏪ Sesi 18</a>
      <a href="/slides/sesi-20/index.html" class="btn-nav-sesi">Sesi 20 ⏩</a>
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

    SESI19_HTML_PATH.write_text(full_html, encoding="utf-8")
    open_div = full_html.count("<div")
    close_div = full_html.count("</div>")
    print(f"[OK] Sesi 19 updated. Open div: {open_div}, Close div: {close_div}, Diff: {open_div - close_div}")

if __name__ == "__main__":
    build_sesi19()
