import os
import sys
import json
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

SESI17_HTML_PATH = Path(r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\public\slides\sesi-17\index.html")

def build_sesi17():
    # Read existing styling to keep 100% exact styling
    existing_html = SESI17_HTML_PATH.read_text(encoding="utf-8")
    style_start = existing_html.find("<style>")
    style_end = existing_html.find("</style>") + len("</style>")
    style_block = existing_html[style_start:style_end]

    notes = [
        {
            "title": "Slide 1: Pembukaan & Sambutan Sesi 17",
            "time": "Menit 00–10 (Total 90 Menit)",
            "instructions": "Sambut siswa dengan antusiasme kenaikan tingkat kesulitan game! Tunjukkan ilustrasi 3D Beeby di depan latar siang dan malam di layar.",
            "script": "Halo para Game Developer Hebat! Selamat datang di Sesi 17! Hari ini game arkade kita akan semakin seru seperti game profesional: kita akan membuat sistem Multi-Level Switching di mana latar berganti dan kecepatan bertambah saat Skor mencapai 10! Siapa yang siap menguji konsentrasinya?"
        },
        {
            "title": "Slide 2: Konsep Dasar & Simulator Multi-Level Switching",
            "time": "Menit 10–22",
            "instructions": "Jelaskan konsep Dynamic Difficulty Curve. Demonstrasikan simulator interaktif pergantian level saat Skor >= 10 di layar kanan.",
            "script": "Coba perhatikan simulator di layar kanan! Saat Skor masih di bawah 10, pemain berada di Level 1 dengan kecepatan santai. Tapi begitu Skor mencapai 10, latar langsung berganti ke malam hari dan kecepatan apel melonjak cepat! Kecepatan yang bertambah membuat konsentrasi pemain semakin tertantang!"
        },
        {
            "title": "Slide 3: Balok Kunci & Inisialisasi Level 1",
            "time": "Menit 22–32",
            "instructions": "Bimbing siswa membuat variabel 'Level' dan 'Kecepatan', serta menyetel nilai awal saat bendera hijau diklik.",
            "script": "Ayo buat variabel baru di Scratch: Level dan Kecepatan! Setiap bendera hijau diklik, kita set Level to 1, set Kecepatan to -5, dan switch backdrop to Level1 agar permainan selalu dimulai dari tingkat dasar yang ramah pemain!"
        },
        {
            "title": "Slide 4: Logika Transisi: if Skor >= 10",
            "time": "Menit 32–42",
            "instructions": "Pandu siswa merakit balok if <Skor >= 10> untuk mengganti backdrop ke Level 2, menaikkan kecepatan ke -9, dan memainkan suara LevelUp.",
            "script": "Inilah gerbang perpindahan level kita: if Skor >= 10, panggung langsung switch backdrop to Level2, ubah Kecepatan jadi -9, dan bunyikan nada kemenangan Level Up!"
        },
        {
            "title": "Slide 5: Dinamika Kecepatan Menggunakan Variabel",
            "time": "Menit 42–52",
            "instructions": "Tekankan pentingnya memasukkan variabel Kecepatan ke dalam balok change y by (Kecepatan) pada sprite apel.",
            "script": "Perhatikan balok jatuhnya apel: jangan tulis angka mati -5! Masukkan variabel Kecepatan ke dalamnya: change y by (Kecepatan). Dengan begitu, saat Level 2 aktif, apel otomatis jatuh jauh lebih deras dan cepat!"
        },
        {
            "title": "Slide 6: Alur Algoritma Kenaikan Tingkat Kesulitan",
            "time": "Menit 52–62",
            "instructions": "Jelaskan alur sistem: Mulai Level 1 -> Hitung Skor -> Cek Syarat Skor >= 10 -> Switch Level 2 & Speed Up.",
            "script": "Mari kita lihat peta alur pikirnya: dari santai di Level 1, komputer memantau skor kita. Saat menyentuh 10, sistem langsung menaikkan tantangan ke Level 2!"
        },
        {
            "title": "Slide 7: Playable Arcade: Game Multi-Level 1 & 2",
            "time": "Menit 62–74",
            "instructions": "Beri kebebasan siswa memainkan simulator game multi-level di slide dan merasakan sensasi kecepatan apel yang meningkat saat skor 10.",
            "script": "Waktunya uji konsentrasi! Klik bendera hijau dan tangkap apelmu. Raih skor 10 dan rasakan sensasi lonjakan kecepatan di Level 2!"
        },
        {
            "title": "Slide 8: Klinik Dokter Kode: Menghindari Bug Kecepatan Tetap",
            "time": "Menit 74–82",
            "instructions": "Bahas bug klasik: menulis angka tetap bukannya variabel Kecepatan, dan lupa mereset backdrop ke Level 1 saat bendera hijau diklik.",
            "script": "Dokter Kode hadir! Kalau level sudah ganti tapi apel tetap lambat, periksa apakah kalian lupa memasukkan balok variabel Kecepatan di change y by! Cek perbandingan balok merah vs hijau di layar!"
        },
        {
            "title": "Slide 9: Rangkuman & Pesta Apresiasi",
            "time": "Menit 82–87",
            "instructions": "Ajak siswa menekan tombol konfeti bersama dan merayakan keberhasilan membuat game dengan sistem multi-level bertingkat.",
            "script": "Luar biasa! Kalian sudah berhasil menciptakan game dengan tingkat kesulitan bertahap seperti game arkade komersial! Klik tombol konfeti dan beri tepuk tangan meriah!"
        },
        {
            "title": "Slide 10: Penutup & Teaser Sesi 18",
            "time": "Menit 87–90",
            "instructions": "Ingatkan siswa menyimpan file proyek Scratch (.sb3) dan berikan teaser sistem Skor Tertinggi (High Score) di Sesi 18.",
            "script": "Jangan lupa simpan proyek kalian ya! Di Sesi 18 pekan depan, kita akan menambahkan sistem High Score untuk mencatat siapa pemegang rekor tertinggi di kelas! Sampai jumpa, para juara!"
        }
    ]
    notes_json = json.dumps(notes, indent=6, ensure_ascii=False)

    slides_html = """      <!-- ================= SLIDE 1: COVER ================= -->
      <div class="slide active" data-time="⏱️ Menit ke 00–10">
        <div class="slide-header">
          <div class="badge-session">Sesi 17 • Multi-Level</div>
          <div class="badge-time">⏱️ Menit ke 00–10</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h1 class="slide-title">
              Misi Arkade: <span>Multi-Level Switching (Kenaikan Kesulitan)</span>! 🌙
            </h1>
            <p style="color: #cbd5e1; font-size: 15.5px; margin: 12px 0 18px; line-height: 1.55;">
              Selamat datang di <strong>STAGE 2: SESI 17</strong>! Hari ini kita membuat game kita semakin menantang dengan <strong>Sistem Multi-Level Switching: Saat Skor &ge; 10, Ganti Background ke Level 2 dan Naikkan Kecepatan Jatuh</strong>. Kecepatan yang bertambah akan membuat konsentrasi pemain semakin tertantang!
            </p>
            <div class="concept-card">
              <div style="color: #fbbf24; font-weight: 800; font-size: 13.5px; margin-bottom: 6px;">🎯 Misi Utama Hari Ini:</div>
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🌙 <strong>Konsep &amp; Inti:</strong> Jika <code>Skor &ge; 10</code>, ganti background ke Level 2 dan naikkan kecepatan jatuh</li>
                <li>⚡ <strong>Instruksi / Kode:</strong> Kecepatan bertambah membuat pemain semakin tertantang konsentrasi</li>
                <li>🖼️ <strong>Pergantian Visual:</strong> Transisi mulus dari Latar Pagi (Level 1) ke Malam Badai (Level 2)</li>
                <li>🎵 <strong>Audio Level Up:</strong> Efek suara magis penyemangat saat berhasil naik tingkat!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <img src="beeby-multilevel.jpg" alt="Multi-Level Switching &amp; Hutan Badai - Beekoding Level 2" class="hero-img" />
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 2: KONSEP DASAR & SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 10–22">
        <div class="slide-header">
          <div class="badge-session">Konsep Dasar • Dynamic Difficulty &amp; Level Switch</div>
          <div class="badge-time">⏱️ Menit ke 10–22</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Kenaikan Kesulitan: <span>Skor &ge; 10 ➔ Level 2</span> 🤔
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Dalam desain game profesional, tingkat kesulitan tidak boleh monoton. Kenaikan kecepatan saat mencapai target skor memberi rasa pencapaian (*progression*) yang sangat memuaskan!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>☀️ <strong>Level 1 (Skor 0–9):</strong> Latar Pagi Cerah, kecepatan apel santai (Kecepatan: -5)</li>
                <li>🌙 <strong>Level 2 (Skor &ge; 10):</strong> Latar Malam Badai, kecepatan apel bertambah deras (Kecepatan: -9)</li>
                <li>🧠 <strong>Tantangan Konsentrasi:</strong> Kecepatan yang lebih tinggi menuntut refleks pemain lebih cepat!</li>
                <li>✨ <strong>Uji Langsung:</strong> Klik tombol tambah skor di simulator samping untuk melihat transisi seketika!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <span style="font-weight: 800; font-size: 13px; color: #38bdf8;">🌙 Simulator Multi-Level: Sesi 17</span>
                <span id="sim2LevelBadge" style="color: #fbbf24; font-size: 12px; font-weight: 700;">LEVEL 1 (Santai)</span>
              </div>
              <div id="sim2Stage" style="height: 190px; background: linear-gradient(180deg, #0284c7 0%, #0369a1 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; padding: 12px; transition: background 0.4s ease; border-radius: 4px;">
                <div id="sim2BackdropIcon" style="font-size: 38px; margin-bottom: 4px; transition: transform 0.3s;">
                  ☀️🌲
                </div>
                <div id="sim2DisplayVal" style="font-family: 'Fredoka', cursive; font-size: 26px; color: #ffffff; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                  Skor: <span id="sim2ScoreVal">0</span> / 10
                </div>
                <div id="sim2SpeedText" style="font-size: 12px; color: #e0f2fe; margin-top: 4px; font-weight: 700;">
                  Kecepatan Jatuh: Normal (-5)
                </div>
                <div id="sim2SubText" style="color: #e2e8f0; font-size: 11.5px; text-align: center; margin-top: 6px; max-width: 90%;">
                  Kumpulkan 10 skor untuk membuka Level 2 &amp; Speed Up!
                </div>
              </div>
              <div style="padding: 10px 14px; background: #0f172a; display: flex; justify-content: space-between; align-items: center; gap: 6px; flex-wrap: wrap;">
                <button onclick="addScoreSim2()" style="background: #10b981; border: none; color: #000; font-size: 11.5px; font-weight: 800; padding: 7px 12px; border-radius: 8px; cursor: pointer;">
                  🍎 Tambah Skor (+1)
                </button>
                <button onclick="quickTestLevel2Sim2()" style="background: #f59e0b; border: none; color: #000; font-size: 11.5px; font-weight: 800; padding: 7px 12px; border-radius: 8px; cursor: pointer;">
                  ⚡ Tes Skor 10 (Level 2)
                </button>
                <button onclick="resetSim2()" style="background: #1e293b; border: 1px solid #475569; color: #cbd5e1; font-size: 11.5px; font-weight: 700; padding: 7px 10px; border-radius: 8px; cursor: pointer;">
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
          <div class="badge-session">Bedah Balok Kode • Inisialisasi Level 1</div>
          <div class="badge-time">⏱️ Menit ke 22–32</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Balok Kunci: <span>Inisialisasi Level 1 &amp; Kecepatan</span> 🧩
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Agar ronde baru selalu dimulai dari awal yang adil, kita siapkan variabel <code>Level</code> ke 1, variabel <code>Kecepatan</code> ke -5, dan pasang latar panggung ke <code>LatarLevel1</code>!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>when ⚑ clicked:</strong> Memulai permainan dari kondisi dasar</li>
                <li>🎯 <strong>set [Level] to (1):</strong> Menandai bahwa pemain berada di babak pertama</li>
                <li>⚡ <strong>set [Kecepatan] to (-5):</strong> Menyetel kecepatan jatuh awal yang santai</li>
                <li>🖼️ <strong>switch backdrop to [LatarLevel1]:</strong> Menampilkan latar pagi cerah</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">Skor ▾</span> to <span class="block-input">0</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">Level ▾</span> to <span class="block-input">1</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">Kecepatan ▾</span> to <span class="block-input">-5</span>
              </div>
              <div class="scratch-block looks">
                switch backdrop to <span class="block-input">LatarLevel1 ▾</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 4: LOGIKA KONDISI & KEPUTUSAN ================= -->
      <div class="slide" data-time="⏱️ Menit ke 32–42">
        <div class="slide-header">
          <div class="badge-session">Mekanik Inti • Transisi Level 2</div>
          <div class="badge-time">⏱️ Menit ke 32–42</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Logika Transisi: <span>if Skor &ge; 10 ➔ Level 2</span> ⚡
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Inilah instruksi kunci perpindahan level: kita memeriksa jika nilai <code>Skor &ge; 10</code>, ganti backdrop ke <strong>LatarLevel2</strong> dan naikkan kecepatan apel menjadi <strong>-9</strong>!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🔍 <strong>if &lt;Skor &ge; 10&gt;:</strong> Memeriksa syarat target nilai terpenuhi</li>
                <li>🖼️ <strong>switch backdrop to [LatarLevel2]:</strong> Mengubah nuansa visual menjadi malam badai</li>
                <li>⚡ <strong>set [Kecepatan] to (-9):</strong> Menambah kecepatan jatuh agar lebih menantang</li>
                <li>🎵 <strong>start sound [LevelUp]:</strong> Memberikan nada selebrasi pencapaian</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-operator"><span class="scratch-inline-variable">Skor</span> &gt; <span class="block-input">9</span></span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block variable">
                        set <span class="block-input">Level ▾</span> to <span class="block-input">2</span>
                      </div>
                      <div class="scratch-block variable">
                        set <span class="block-input">Kecepatan ▾</span> to <span class="block-input">-9</span>
                      </div>
                      <div class="scratch-block looks">
                        switch backdrop to <span class="block-input">LatarLevel2 ▾</span>
                      </div>
                      <div class="scratch-block sound">
                        start sound <span class="block-input">LevelUp ▾</span>
                      </div>
                    </div>
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
          <div class="badge-session">Logika Gerak • Variabel Kecepatan Dinamis</div>
          <div class="badge-time">⏱️ Menit ke 42–52</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Kecepatan Dinamis: <span>change y by (Kecepatan)</span> 📢
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Agar apel otomatis menyesuaikan kecepatan tanpa merombak kode, kita pasang balok <code>change y by (Kecepatan)</code>. Saat variabel bernilai -5 apel jatuh santai, saat bernilai -9 apel melesat kencang!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🟠 <strong>Variabel di Dalam Balok Gerak:</strong> Fleksibel mengikuti level permainan</li>
                <li>⚡ <strong>Tantangan Bertambah:</strong> Pemain harus berkonsentrasi penuh menggeser mangkuk</li>
                <li>🔄 <strong>Loop Berulang:</strong> Jika apel menyentuh batas bawah, ia kembali jatuh dari langit</li>
                <li>🏆 <strong>Sensasi Menegangkan:</strong> Permainan terasa hidup seperti game di arcade mall!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block motion">
                    change y by <span class="scratch-inline-variable">Kecepatan</span>
                  </div>
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-operator"><span class="scratch-inline-sensing">y position</span> &lt; <span class="block-input">-160</span></span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block motion">
                        go to x: <span class="scratch-inline-operator">pick random <span class="block-input">-200</span> to <span class="block-input">200</span></span> y: <span class="block-input">170</span>
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
          <div class="badge-session">Algoritma Game • Alur Kerja Multi-Level</div>
          <div class="badge-time">⏱️ Menit ke 52–62</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Alur Algoritma: <span>Level 1 ➔ Pengecekan Skor ➔ Level 2</span> 🗺️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Berikut alur pikir logika sistem multi-level switching pada game kita:
            </p>
            <div class="concept-card">
              <ol style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.7;">
                <li>1️⃣ <strong>Mulai di Level 1:</strong> Background Pagi, <code>Kecepatan = -5</code>, <code>Skor = 0</code></li>
                <li>2️⃣ <strong>Pemain Mengumpulkan Skor:</strong> Menangkap apel merah hingga skor bertambah</li>
                <li>3️⃣ <strong>Pengecekan Syarat:</strong> Apakah <code>Skor &ge; 10</code>?</li>
                <li>4️⃣ <strong>Transisi Level 2:</strong> Background Malam Aktif, <code>Kecepatan = -9</code>, tantangan konsentrasi meningkat!</li>
              </ol>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: #090d16; border: 2px solid #38bdf8; border-radius: 16px; padding: 22px; width: 100%; text-align: center;">
              <div style="font-size: 42px; margin-bottom: 8px;">☀️ ➔ 🔟 ➔ 🌙⚡</div>
              <h4 style="color: #38bdf8; font-size: 16px; font-weight: 800; margin-bottom: 6px;">Arsitektur Multi-Level Sesi 17</h4>
              <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5;">Perpaduan pergantian latar panggung, evaluasi skor, dan dinamika akselerasi kecepatan!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 7: PLAYABLE SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 62–74">
        <div class="slide-header">
          <div class="badge-session">Playable Arcade • Tantangan Multi-Level Nyata</div>
          <div class="badge-time">⏱️ Menit ke 62–74</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Uji Coba Langsung: <span>Raih Skor 10 &amp; Masuki Level 2</span>! 🎮
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Kendalikan mangkuk dan tangkap apel! Begitu skormu menyentuh <strong>10</strong>, perhatikan panggung berganti malam dan apel jatuh jauh lebih kencang!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>Klik Bendera Hijau:</strong> Memulai permainan di Level 1</li>
                <li>🍎 <strong>Tangkap Apel:</strong> Kumpulkan skor dari 0 sampai 9</li>
                <li>🌙 <strong>Skor 10 Tercapai:</strong> Latar berganti ke Level 2 &amp; Speed Up!</li>
                <li>⚡ <strong>Uji Konsentrasi:</strong> Tahan refleksmu saat apel jatuh sangat deras!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <div class="sim-btns">
                  <button class="btn-green-flag" onclick="startPlayableGame_17()" title="Mulai Permainan Multi-Level">🚩</button>
                  <button class="btn-red-stop" onclick="stopPlayableGame_17()" title="Hentikan Permainan">🛑</button>
                </div>
                <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                  <div id="simLevelBadge_17" style="background: #090d16; border: 1px solid #38bdf8; color: #38bdf8; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 999px; font-family: 'Fredoka', cursive;">
                    🌟 LEVEL: <span id="gameLevel_17">1</span>
                  </div>
                  <div class="sim-score-badge">
                    🍎 SKOR: <span id="gameScore_17">0</span>
                  </div>
                </div>
              </div>

              <div id="gameCanvas_17" class="sim-canvas" onmousemove="handleGameMouse_17(event)" style="background: linear-gradient(180deg, #0f172a 0%, #1e3a8a 70%, #172554 100%); transition: background 0.5s ease;">
                <!-- Overlay Mulai -->
                <div id="gameOverlay_17" style="position: absolute; inset: 0; background: rgba(0,0,0,0.78); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; padding: 16px; text-align: center;">
                  <span style="font-size: 36px; margin-bottom: 6px;">☀️ ➔ 🌙⚡</span>
                  <span style="font-size: 14px; font-weight: 800; color: #fbbf24;">Tantangan Multi-Level: Target Skor 10!</span>
                  <span style="font-size: 11.5px; color: #cbd5e1; margin: 4px 0 12px;">Tangkap apel hingga skor 10 untuk membuka Level 2 dengan kecepatan tinggi!</span>
                  <button onclick="startPlayableGame_17()" style="background: #10b981; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 13px; font-weight: 700; padding: 7px 18px; border-radius: 999px; cursor: pointer;">
                    🚩 Mulai Sekarang (Level 1)
                  </button>
                </div>

                <!-- Banner Notifikasi Level Up -->
                <div id="levelUpBanner_17" style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #f59e0b, #ef4444); color: #000; font-family: 'Fredoka', cursive; font-size: 13px; font-weight: 900; padding: 6px 16px; border-radius: 999px; display: none; z-index: 15; box-shadow: 0 0 16px rgba(245, 158, 11, 0.8);">
                  ⚡ LEVEL 2: SPEED UP! 🌙
                </div>

                <div id="gameApple_17" style="position: absolute; font-size: 26px; transform: translate(-50%, -50%); top: -30px; left: 160px; pointer-events: none;">🍎</div>
                <div id="gameBowl_17" style="position: absolute; font-size: 30px; transform: translate(-50%, -50%); bottom: 10px; left: 160px; pointer-events: none;">🥣</div>
              </div>

              <div style="background: #0f172a; padding: 6px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1e293b; font-size: 11px; color: #94a3b8;">
                <span>Kecepatan: <strong id="gameSpeedText_17" style="color: #38bdf8;">Normal (-5)</strong></span>
                <span id="gameLiveStatus_17" style="color: #10b981;">● Siap Dimainkan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 8: DOKTER KODE ================= -->
      <div class="slide" data-time="⏱️ Menit ke 74–82">
        <div class="slide-header">
          <div class="badge-session">Klinik Debugging • Mengatasi Bug Level Switch</div>
          <div class="badge-time">⏱️ Menit ke 74–82</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Dokter Kode: <span>Menangani Bug Kecepatan Tidak Berubah</span> 🐛
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Saat merakit sistem multi-level, ada bug yang sering membuat bingung: latar sudah berganti ke Level 2, tapi apel tetap jatuh lambat seperti Level 1! Yuk lihat penyebabnya:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⚡ Selalu gunakan variabel <code>Kecepatan</code> di dalam balok <code>change y by (Kecepatan)</code></li>
                <li>🚫 Jangan menulis angka mati <code>-5</code> di dalam balok gerak apel</li>
                <li>🔄 Jangan lupa me-reset <code>switch backdrop to LatarLevel1</code> saat bendera hijau diklik</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
              <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #ef4444; font-weight: 800; font-size: 13px; margin-bottom: 4px;">❌ KODE SALAH: Angka Mati (Hardcoded)</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  change y by (-5)<br>
                  <span style="color: #f87171;">⚠️ Karena menulis angka tetap -5, perubahan variabel Kecepatan ke -9 saat Level 2 tidak berpengaruh sama sekali!</span>
                </div>
              </div>
              <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #10b981; font-weight: 800; font-size: 13px; margin-bottom: 4px;">✅ KODE BENAR: Dinamis Mengikuti Variabel</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  change y by <span style="color: #34d399; font-weight: 700;">(Kecepatan)</span> ✅<br>
                  <span style="color: #94a3b8;">Level 1 = -5 (santai) ➔ Level 2 = -9 (deras &amp; menantang konsentrasi!)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 9: RANGKUMAN & APRESIASI ================= -->
      <div class="slide" data-time="⏱️ Menit ke 82–87">
        <div class="slide-header">
          <div class="badge-session">Review Pemahaman • Sukses Sesi 17</div>
          <div class="badge-time">⏱️ Menit ke 82–87</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Programmer Hebat! <span>Review Kunci Hari Ini</span> 🌟
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Selamat! Game arkade kamu kini memiliki level bertingkat dengan akselerasi kecepatan. Mari ingat 3 poin penting hari ini:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>1️⃣ <strong>Konsep Inti:</strong> Jika <code>Skor &ge; 10</code>, ganti background ke Level 2 dan naikkan kecepatan jatuh</li>
                <li>2️⃣ <strong>Instruksi Kode:</strong> Kecepatan bertambah membuat pemain semakin tertantang konsentrasi</li>
                <li>3️⃣ <strong>Struktur Modular:</strong> Gunakan variabel <code>Kecepatan</code> di balok gerak untuk kemudahan perubahan</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(56, 189, 248, 0.1); border: 2px solid #38bdf8; border-radius: 16px; padding: 24px; text-align: center; width: 100%;">
              <div style="font-size: 48px; margin-bottom: 10px;">🏆 🌙</div>
              <h3 style="color: #38bdf8; font-size: 20px; font-weight: 800; margin-bottom: 6px;">Kerja Keras Terbayar!</h3>
              <p style="color: #cbd5e1; font-size: 13.5px; line-height: 1.5;">Kamu resmi menguasai modul Multi-Level Switching &amp; Tantangan Kecepatan di Beekoding Academy!</p>
              <button onclick="triggerConfetti()" style="margin-top: 14px; background: #000; color: #38bdf8; border: 1px solid #38bdf8; padding: 10px 20px; border-radius: 999px; font-weight: 800; cursor: pointer; transition: transform 0.15s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
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
              Petualangan Berlanjut: <span>Menuju Sesi 18</span>! 🚀
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Game kita semakin kaya fitur dan semakin dekat menjadi mahakarya lengkap! Jangan lupa simpan file proyek Scratch (.sb3) di laptopmu hari ini.
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>💾 Klik <code>File ➔ Save to your computer</code> di Scratch Studio</li>
                <li>👑 <strong>Sesi 18:</strong> Sistem Rekor Skor Tertinggi (High Score Persistence)</li>
                <li>👏 Berikan tepuk tangan meriah untuk seluruh teman di kelas!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(30, 41, 59, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 26px; text-align: center; width: 100%;">
              <div style="font-size: 52px; margin-bottom: 10px;">🌟👑</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Sampai Jumpa di Sesi 18!</h3>
              <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.5;">Tetap semangat bereksplorasi dan berkreasi membuat game impian bersama Beekoding Academy!</p>
            </div>
          </div>
        </div>
      </div>"""

    sim_js = """
    // ================= AUDIO HELPER (CHOMP & LEVEL UP MELODY) =================
    function playChompSound() {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(680, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } catch(e) {}
    }

    function playLevelUpSound() {
      try {
        const ctx = getAudioCtx();
        const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
        notes.forEach((freq, idx) => {
          setTimeout(() => {
            try {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(freq, ctx.currentTime);
              gain.gain.setValueAtTime(0.25, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.28);
            } catch(e) {}
          }, idx * 110);
        });
      } catch(e) {}
    }

    // ================= SIMULATOR 1 (SLIDE 2): INTERACTIVE MULTI-LEVEL SWITCH =================
    let sim2Score = 0;
    let sim2Level = 1;

    function renderSim2UI() {
      const scoreVal = document.getElementById('sim2ScoreVal');
      const badge = document.getElementById('sim2LevelBadge');
      const stage = document.getElementById('sim2Stage');
      const icon = document.getElementById('sim2BackdropIcon');
      const speedText = document.getElementById('sim2SpeedText');
      const sub = document.getElementById('sim2SubText');

      if (scoreVal) scoreVal.innerText = sim2Score;

      if (sim2Score >= 10) {
        sim2Level = 2;
        if (badge) {
          badge.innerText = 'LEVEL 2 (SUPER CEPAT!) ⚡';
          badge.style.color = '#f59e0b';
        }
        if (stage) {
          stage.style.background = 'linear-gradient(180deg, #09090b 0%, #1e1b4b 60%, #311042 100%)';
        }
        if (icon) {
          icon.innerText = '🌙⚡🌲';
          icon.style.transform = 'scale(1.2)';
        }
        if (speedText) {
          speedText.innerText = 'Kecepatan Jatuh: Kencang (-9) 🚀';
          speedText.style.color = '#f59e0b';
        }
        if (sub) {
          sub.innerHTML = '<strong style="color: #fbbf24;">🎉 Target Skor &ge; 10 Tercapai! Latar berganti ke Level 2 &amp; kecepatan bertambah menantang konsentrasi!</strong>';
        }
      } else {
        sim2Level = 1;
        if (badge) {
          badge.innerText = 'LEVEL 1 (Santai)';
          badge.style.color = '#38bdf8';
        }
        if (stage) {
          stage.style.background = 'linear-gradient(180deg, #0284c7 0%, #0369a1 100%)';
        }
        if (icon) {
          icon.innerText = '☀️🌲';
          icon.style.transform = 'scale(1)';
        }
        if (speedText) {
          speedText.innerText = 'Kecepatan Jatuh: Normal (-5)';
          speedText.style.color = '#e0f2fe';
        }
        if (sub) {
          sub.innerText = 'Kumpulkan 10 skor untuk membuka Level 2 & Speed Up!';
        }
      }
    }

    function addScoreSim2() {
      sim2Score++;
      playChompSound();
      if (sim2Score === 10) {
        playLevelUpSound();
        triggerConfetti();
      }
      renderSim2UI();
    }

    function quickTestLevel2Sim2() {
      sim2Score = 10;
      playLevelUpSound();
      triggerConfetti();
      renderSim2UI();
    }

    function resetSim2() {
      sim2Score = 0;
      playBeep(350, 'sine', 0.1);
      renderSim2UI();
    }

    // ================= SIMULATOR 2 (SLIDE 7): PLAYABLE MULTI-LEVEL ARCADE =================
    let gameRunning_17 = false;
    let gameScore_17 = 0;
    let gameLevel_17 = 1;
    let gameSpeed_17 = 4.2;

    let gameAppleX_17 = 160;
    let gameAppleY_17 = -20;
    let gameBowlX_17 = 160;
    let gameAnimId_17 = null;

    function renderGameHeader_17() {
      const scoreEl = document.getElementById('gameScore_17');
      const levelEl = document.getElementById('gameLevel_17');
      const badgeEl = document.getElementById('simLevelBadge_17');
      const speedEl = document.getElementById('gameSpeedText_17');
      const stage = document.getElementById('gameCanvas_17');
      const banner = document.getElementById('levelUpBanner_17');

      if (scoreEl) scoreEl.innerText = gameScore_17;
      if (levelEl) levelEl.innerText = gameLevel_17;

      if (gameScore_17 >= 10) {
        gameLevel_17 = 2;
        gameSpeed_17 = 7.5; // Kecepatan meningkat tajam!
        if (badgeEl) {
          badgeEl.style.borderColor = '#f59e0b';
          badgeEl.style.color = '#fbbf24';
          badgeEl.innerHTML = '🌟 LEVEL: <span>2 (SPEED UP!)</span>';
        }
        if (speedEl) {
          speedEl.innerText = 'Kencang (-9) ⚡';
          speedEl.style.color = '#f59e0b';
        }
        if (stage) {
          stage.style.background = 'linear-gradient(180deg, #09090b 0%, #1e1b4b 65%, #311042 100%)';
        }
        if (banner) {
          banner.style.display = 'block';
        }
      } else {
        gameLevel_17 = 1;
        gameSpeed_17 = 4.2;
        if (badgeEl) {
          badgeEl.style.borderColor = '#38bdf8';
          badgeEl.style.color = '#38bdf8';
          badgeEl.innerHTML = '🌟 LEVEL: <span>1</span>';
        }
        if (speedEl) {
          speedEl.innerText = 'Normal (-5)';
          speedEl.style.color = '#38bdf8';
        }
        if (stage) {
          stage.style.background = 'linear-gradient(180deg, #0f172a 0%, #1e3a8a 70%, #172554 100%)';
        }
        if (banner) {
          banner.style.display = 'none';
        }
      }
    }

    function startPlayableGame_17() {
      gameRunning_17 = true;
      gameScore_17 = 0;
      gameLevel_17 = 1;
      gameSpeed_17 = 4.2;

      renderGameHeader_17();

      const overlay = document.getElementById('gameOverlay_17');
      if (overlay) overlay.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_17');
      if (liveSt) {
        liveSt.innerText = '● Bertanding! Raih Skor 10';
        liveSt.style.color = '#10b981';
      }

      gameAppleY_17 = -20;
      gameAppleX_17 = Math.floor(Math.random() * 260) + 30;

      if (gameAnimId_17) cancelAnimationFrame(gameAnimId_17);
      gameLoop_17();
    }

    function stopPlayableGame_17() {
      gameRunning_17 = false;
      if (gameAnimId_17) cancelAnimationFrame(gameAnimId_17);

      const overlay = document.getElementById('gameOverlay_17');
      if (overlay) overlay.style.display = 'flex';

      const liveSt = document.getElementById('gameLiveStatus_17');
      if (liveSt) {
        liveSt.innerText = '● Permainan Dihentikan';
        liveSt.style.color = '#94a3b8';
      }
    }

    function handleGameMouse_17(e) {
      if (!gameRunning_17) return;
      const stage = document.getElementById('gameCanvas_17');
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      mouseX = Math.max(25, Math.min(rect.width - 25, mouseX));
      gameBowlX_17 = mouseX;

      const bowlEl = document.getElementById('gameBowl_17');
      if (bowlEl) bowlEl.style.left = `${gameBowlX_17}px`;
    }

    function gameLoop_17() {
      if (!gameRunning_17) return;

      const stage = document.getElementById('gameCanvas_17');
      const stageW = stage ? stage.clientWidth : 320;
      const stageH = stage ? stage.clientHeight : 220;
      const bowlTop = stageH - 35;

      // Apel jatuh dengan kecepatan dinamis sesuai level!
      gameAppleY_17 += gameSpeed_17;

      // Cek Tangkapan
      if (gameAppleY_17 >= bowlTop - 20 && gameAppleY_17 <= bowlTop + 15) {
        if (Math.abs(gameAppleX_17 - gameBowlX_17) < 38) {
          gameScore_17++;
          playChompSound();

          // Deteksi Transisi Level Up tepat di skor 10
          if (gameScore_17 === 10) {
            playLevelUpSound();
            triggerConfetti();
          }

          renderGameHeader_17();

          gameAppleY_17 = -25;
          gameAppleX_17 = Math.floor(Math.random() * (stageW - 50)) + 25;
        }
      }

      // Missed bottom check
      if (gameAppleY_17 > stageH + 20) {
        gameAppleY_17 = -25;
        gameAppleX_17 = Math.floor(Math.random() * (stageW - 50)) + 25;
      }

      const appleEl = document.getElementById('gameApple_17');
      if (appleEl) {
        appleEl.style.left = `${gameAppleX_17}px`;
        appleEl.style.top = `${gameAppleY_17}px`;
      }

      gameAnimId_17 = requestAnimationFrame(gameLoop_17);
    }
    """

    full_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slide Mengajar: Sesi 17 - Multi-Level Switching (Kenaikan Tingkat Kesulitan) | Beekoding Academy</title>
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
      <span class="brand-stage-badge">STAGE 2: SESI 17</span>
    </div>

    <div class="toolbar-actions">
      <a href="/slides/index.html" class="btn-nav-sesi" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 800;" title="Buka Portal Semua Sesi &amp; Stage">🗂️ Semua Sesi</a>
      <a href="/slides/sesi-16/index.html" class="btn-nav-sesi">⏪ Sesi 16</a>
      <a href="/slides/sesi-18/index.html" class="btn-nav-sesi">Sesi 18 ⏩</a>
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

    SESI17_HTML_PATH.write_text(full_html, encoding="utf-8")
    open_div = full_html.count("<div")
    close_div = full_html.count("</div>")
    print(f"[OK] Sesi 17 updated. Open div: {open_div}, Close div: {close_div}, Diff: {open_div - close_div}")

if __name__ == "__main__":
    build_sesi17()
