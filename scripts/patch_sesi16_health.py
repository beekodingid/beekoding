import os
import sys
import json
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

SESI16_HTML_PATH = Path(r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\public\slides\sesi-16\index.html")

def build_sesi16():
    # Read existing styling to keep 100% exact styling
    existing_html = SESI16_HTML_PATH.read_text(encoding="utf-8")
    style_start = existing_html.find("<style>")
    style_end = existing_html.find("</style>") + len("</style>")
    style_block = existing_html[style_start:style_end]

    notes = [
        {
            "title": "Slide 1: Pembukaan & Sambutan Sesi 16",
            "time": "Menit 00–10 (Total 90 Menit)",
            "instructions": "Sambut siswa dengan tema tantangan baru: sistem Nyawa dan bahaya rintangan! Tunjukkan ilustrasi 3D Beeby dengan 3 hati kehidupan di layar.",
            "script": "Halo para programmer tangguh! Selamat datang di Sesi 16! Hari ini game kita akan semakin seru dan menantang karena kita akan menambahkan sistem 3 Hati Nyawa dan Buah Beracun! Siapa yang berani menghadapi tantangannya?"
        },
        {
            "title": "Slide 2: Konsep Dasar & Simulator 3 Hati Kehidupan",
            "time": "Menit 10–22",
            "instructions": "Jelaskan konsep variabel Nyawa dan mekanisme Risiko vs Hadiah (Risk & Reward). Demonstrasikan simulator interaktif pengurangan nyawa di slide ini.",
            "script": "Coba lihat simulator di sebelah kanan! Pemain kita memiliki modal 3 Hati Nyawa. Jika menangkap apel segar, skor bertambah. Tapi awas! Jika menyentuh buah busuk beracun, hati kita berkurang satu dan terdengar suara Oops! Dan jika semua hati habis menyentuh 0, game langsung Game Over!"
        },
        {
            "title": "Slide 3: Balok Kunci & Inisialisasi 3 Nyawa",
            "time": "Menit 22–32",
            "instructions": "Bimbing siswa membuat variabel baru bernama 'Nyawa' di Scratch dan mengatur nilainya ke 3 saat bendera hijau diklik.",
            "script": "Ayo buat variabel baru bernama Nyawa di Scratch! Ingat prinsip dokter koding: setiap kali bendera hijau diklik, kita wajib mereset set Nyawa to 3 agar pemain memulai ronde dengan hati penuh!"
        },
        {
            "title": "Slide 4: Logika Tabrakan Buah Busuk & Pengurangan Nyawa",
            "time": "Menit 32–42",
            "instructions": "Pandu siswa merakit balok: if touching Buah Busuk -> change Nyawa by (-1) -> start sound [Oops] -> teleportasi buah ke atas.",
            "script": "Inilah balok deteksi bahaya kita: jika mangkuk menyentuh Buah Busuk, kita kurangi Nyawa sebesar -1, mainkan efek suara Oops, lalu langsung lempar buah busuk kembali ke atas langit agar tidak mengenai mangkuk dua kali!"
        },
        {
            "title": "Slide 5: Kondisi Kalah: Jika Nyawa = 0 Siarkan Game Over",
            "time": "Menit 42–52",
            "instructions": "Jelaskan logika pengecekan kondisi kalah: if <Nyawa = 0> then broadcast [GameOver] dan pandu sprite lain merespons siaran Game Over.",
            "script": "Komputer selalu memantau sisa hati kita: jika Nyawa sama dengan 0, panggung langsung memancarkan siaran universal: broadcast GameOver! Semua apel berhenti jatuh dan layar Game Over langsung muncul!"
        },
        {
            "title": "Slide 6: Alur Algoritma Sistem Nyawa & Rintangan",
            "time": "Menit 52–62",
            "instructions": "Jelaskan alur 4 tahap: Setup 3 Hati -> Tangkap Apel / Buah Busuk -> Evaluasi Sisa Hati -> Game Over saat Nyawa 0.",
            "script": "Mari kita lihat alur kerja sistem nyawa: mulai dari 3 hati penuh, bedakan mana apel segar dan mana buah beracun, kurangi hati jika salah tangkap, dan akhiri game saat hati habis!"
        },
        {
            "title": "Slide 7: Playable Arcade: Tangkap Apel vs Hindari Buah Busuk",
            "time": "Menit 62–74",
            "instructions": "Beri kebebasan siswa memainkan simulator game playable dengan 3 hati nyawa di slide, lalu implementasikan pada proyek Scratch mereka.",
            "script": "Ayo coba langsung di panggung! Klik bendera hijau dan kendalikan mangkukmu. Tangkap apel merah sebanyak-banyaknya, dan hindari buah hijau beracun agar 3 hatimu tetap bertahan!"
        },
        {
            "title": "Slide 8: Klinik Dokter Kode: Mengatasi Bug Nyawa",
            "time": "Menit 74–82",
            "instructions": "Bahas 2 bug klasik: lupa me-reset Nyawa to 3 saat bendera hijau diklik, dan lupa melempar buah busuk ke atas sehingga nyawa langsung habis dalam 1 frame.",
            "script": "Dokter Kode hadir! Jika nyawa kalian langsung habis dalam sekejap saat menyentuh buah busuk, cek apakah kalian lupa memasang balok go to x: random y: 170 tepat setelah change Nyawa by -1!"
        },
        {
            "title": "Slide 9: Rangkuman & Pesta Apresiasi",
            "time": "Menit 82–87",
            "instructions": "Ajak siswa menekan tombol konfeti bersama dan merayakan penguasaan sistem game over berdasar nyawa.",
            "script": "Hebat sekali! Kalian sudah bisa membuat game dengan sistem nyawa seperti game petualangan profesional! Klik tombol konfeti dan beri tepuk tangan untuk kita semua!"
        },
        {
            "title": "Slide 10: Penutup & Teaser Sesi 17",
            "time": "Menit 87–90",
            "instructions": "Ingatkan siswa menyimpan file proyek (File -> Save to your computer) dan beri teaser fitur Multi-Level Switching di Sesi 17.",
            "script": "Simpan proyek kalian ya! Di Sesi 17 pekan depan, kita akan belajar membuat pergantian latar panggung otomatis saat skor mencapai 50! Sampai jumpa, para juara!"
        }
    ]
    notes_json = json.dumps(notes, indent=6, ensure_ascii=False)

    slides_html = """      <!-- ================= SLIDE 1: COVER ================= -->
      <div class="slide active" data-time="⏱️ Menit ke 00–10">
        <div class="slide-header">
          <div class="badge-session">Sesi 16 • Logika Nyawa</div>
          <div class="badge-time">⏱️ Menit ke 00–10</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h1 class="slide-title">
              Misi Arkade: <span>Logika Nyawa (Health Heart) &amp; Buah Beracun</span>! ❤️
            </h1>
            <p style="color: #cbd5e1; font-size: 15.5px; margin: 12px 0 18px; line-height: 1.55;">
              Selamat datang di <strong>STAGE 2: SESI 16</strong>! Hari ini kita membuat game kita semakin menegangkan dengan <strong>Variabel Nyawa 3 Hati, Buah Beracun, Suara Oops, dan Sinyal Game Over</strong>. Siapkan logikamu untuk menjaga sisa hati karakter hingga meraih skor tertinggi!
            </p>
            <div class="concept-card">
              <div style="color: #fbbf24; font-weight: 800; font-size: 13.5px; margin-bottom: 6px;">🎯 Misi Utama Hari Ini:</div>
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>❤️ <strong>Konsep &amp; Inti:</strong> Variabel <code>Nyawa</code> berkurang jika menangkap buah busuk</li>
                <li>🧩 <strong>Instruksi / Kode:</strong> <code>if touching Buah Busuk ➔ change Nyawa by (-1) ➔ start sound [Oops]</code></li>
                <li>☠️ <strong>Rintangan Bahaya:</strong> Membedakan apel segar (+1 Skor) vs buah busuk beracun (-1 Nyawa)</li>
                <li>📢 <strong>Panduan Mengajar:</strong> Jika <code>Nyawa = 0</code> ➔ siarkan pesan <code>broadcast [GameOver]</code>!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <img src="beeby-health.jpg" alt="Logika Nyawa &amp; Apel Beracun - Beekoding Level 2" class="hero-img" />
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 2: KONSEP DASAR & SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 10–22">
        <div class="slide-header">
          <div class="badge-session">Konsep Dasar • Sistem Nyawa &amp; Bahaya Buah Busuk</div>
          <div class="badge-time">⏱️ Menit ke 10–22</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Mekanisme Risiko: <span>Menjaga 3 Hati Kehidupan</span> 🤔
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Game yang seru memiliki aturan <em>Risk vs Reward</em> (Peluang vs Bahaya). Pemain tidak boleh asal menangkap semua benda yang jatuh dari langit!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>❤️ <strong>Modal 3 Hati:</strong> Dimulai dengan variabel <code>Nyawa = 3</code> di awal ronde</li>
                <li>🍎 <strong>Apel Segar:</strong> Menambah <code>Skor by 1</code> dan bersuara renyah <em>Chomp</em>!</li>
                <li>🍏 <strong>Buah Busuk Beracun:</strong> Mengurangi <code>Nyawa by (-1)</code> dan bersuara <em>Oops</em>!</li>
                <li>💀 <strong>Kondisi Kalah:</strong> Jika seluruh hati habis (<code>Nyawa = 0</code>), siarkan sinyal <strong>GameOver</strong>!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <span style="font-weight: 800; font-size: 13px; color: #f43f5e;">❤️ Simulator Nyawa: Sesi 16</span>
                <span id="sim2Status" style="color: #fbbf24; font-size: 12px; font-weight: 700;">Hati Penuh (3/3)</span>
              </div>
              <div id="sim2Stage" style="height: 190px; background: #020617; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; padding: 12px; transition: background 0.2s;">
                <div id="sim2HeartsIcon" style="font-size: 38px; margin-bottom: 6px; letter-spacing: 4px; transition: transform 0.2s;">
                  ❤️❤️❤️
                </div>
                <div id="sim2DisplayVal" style="font-family: 'Fredoka', cursive; font-size: 24px; color: #fbbf24; font-weight: 800;">
                  Nyawa: 3 / 3
                </div>
                <div id="sim2SubText" style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 6px; max-width: 90%;">
                  Uji coba menangkap buah busuk beracun atau apel segar di bawah!
                </div>
              </div>
              <div style="padding: 10px 14px; background: #0f172a; display: flex; justify-content: space-between; align-items: center; gap: 6px; flex-wrap: wrap;">
                <button onclick="triggerCatchRottenAppleSim2()" style="background: #ef4444; border: none; color: #fff; font-size: 11px; font-weight: 800; padding: 7px 12px; border-radius: 8px; cursor: pointer;">
                  🍏 Kena Buah Busuk (-1 ❤️)
                </button>
                <button onclick="triggerCatchFreshAppleSim2()" style="background: #10b981; border: none; color: #000; font-size: 11px; font-weight: 800; padding: 7px 12px; border-radius: 8px; cursor: pointer;">
                  🍎 Tangkap Apel (+1 Skor)
                </button>
                <button onclick="resetHeartsSim2()" style="background: #1e293b; border: 1px solid #475569; color: #cbd5e1; font-size: 11px; font-weight: 700; padding: 7px 10px; border-radius: 8px; cursor: pointer;">
                  🔄 Reset (3 ❤️)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 3: BALOK KUNCI UTAMA ================= -->
      <div class="slide" data-time="⏱️ Menit ke 22–32">
        <div class="slide-header">
          <div class="badge-session">Bedah Balok Kode • Inisialisasi Nyawa</div>
          <div class="badge-time">⏱️ Menit ke 22–32</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Balok Kunci: <span>Inisialisasi Modal 3 Nyawa</span> 🧩
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Sebelum permainan dimulai, kita harus memberikan nyawa penuh kepada pemain. Di Scratch, kita gunakan balok <code>set [Nyawa] to (3)</code> saat bendera hijau diklik!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>when ⚑ clicked:</strong> Memicu ronde baru dengan kondisi bersih</li>
                <li>❤️ <strong>set [Nyawa] to (3):</strong> Mengisi 3 poin kehidupan awal</li>
                <li>🍎 <strong>set [Skor] to (0):</strong> Mengatur ulang skor buah ke angka nol</li>
                <li>👁️ <strong>show variable [Nyawa]:</strong> Menampilkan bar hati di pojok kiri panggung</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">Nyawa ▾</span> to <span class="block-input">3</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">Skor ▾</span> to <span class="block-input">0</span>
              </div>
              <div class="scratch-block looks">
                show variable <span class="block-input">Nyawa ▾</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 4: LOGIKA KONDISI & KEPUTUSAN ================= -->
      <div class="slide" data-time="⏱️ Menit ke 32–42">
        <div class="slide-header">
          <div class="badge-session">Mekanik Inti • Deteksi Buah Busuk</div>
          <div class="badge-time">⏱️ Menit ke 32–42</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Deteksi Bahaya: <span>Sentuhan Buah Busuk</span> ⚡
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Inilah instruksi kunci saat mangkuk salah menangkap buah beracun: kurangi <strong>Nyawa</strong> sebesar <code>-1</code>, bunyikan suara <strong>Oops</strong>, dan segera lempar buah busuk kembali ke atas!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🔍 <strong>if &lt;touching BuahBusuk?&gt;:</strong> Mendeteksi tabrakan dengan objek bahaya</li>
                <li>➖ <strong>change [Nyawa] by (-1):</strong> Mengurangi hati kehidupan pemain 1 poin</li>
                <li>🔊 <strong>start sound [Oops]:</strong> Memberi efek suara kekecewaan instan</li>
                <li>🚀 <strong>go to x: random y: 170:</strong> Mencegah pengurangan ganda dalam 1 detik!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-sensing">touching <span class="block-input">BuahBusuk ▾</span> ?</span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block variable">
                        change <span class="block-input">Nyawa ▾</span> by <span class="block-input">-1</span>
                      </div>
                      <div class="scratch-block sound">
                        start sound <span class="block-input">Oops ▾</span>
                      </div>
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

      <!-- ================= SLIDE 5: SINYAL BROADCAST & RESPON ================= -->
      <div class="slide" data-time="⏱️ Menit ke 42–52">
        <div class="slide-header">
          <div class="badge-session">Kondisi Kalah • Siarkan Sinyal Game Over</div>
          <div class="badge-time">⏱️ Menit ke 42–52</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Jika Nyawa = 0: <span>Siarkan Game Over</span> 📢
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Ketika seluruh hati habis terpakai (<code>Nyawa = 0</code>), komputer langsung memancarkan siaran universal <code>broadcast [GameOver]</code> untuk menghentikan permainan!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⚖️ <strong>if &lt;Nyawa = 0&gt;:</strong> Memeriksa apakah pemain sudah kehabisan kesempatan</li>
                <li>📢 <strong>broadcast [GameOver]:</strong> Memberi tahu seluruh sprite bahwa game selesai</li>
                <li>🖼️ <strong>switch backdrop to [LayarGameOver]:</strong> Mengganti panggung ke layar kalah</li>
                <li>🛑 <strong>stop [all]:</strong> Menghentikan jatuhnya seluruh buah dan mengunci skor</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">Nyawa</span> = <span class="block-input">0</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block event" style="background:#ffab19; color:#fff;">
                    broadcast <span class="block-input">GameOver ▾</span>
                  </div>
                  <div class="scratch-block control">
                    stop <span class="block-input">this script ▾</span>
                  </div>
                </div>
              </div>
              <div class="scratch-block event" style="margin-top: 8px;">
                when I receive <span class="block-input">GameOver ▾</span>
              </div>
              <div class="scratch-block looks">
                switch backdrop to <span class="block-input">LayarGameOver ▾</span>
              </div>
              <div class="scratch-block sound">
                start sound <span class="block-input">LoseFanfare ▾</span>
              </div>
              <div class="scratch-block control">
                stop <span class="block-input">all ▾</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 6: ALUR INSTRUKSI LENGKAP ================= -->
      <div class="slide" data-time="⏱️ Menit ke 52–62">
        <div class="slide-header">
          <div class="badge-session">Algoritma Game • Alur Kerja Logika Nyawa</div>
          <div class="badge-time">⏱️ Menit ke 52–62</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Alur Algoritma: <span>Deteksi Buah vs Evaluasi Hati</span> 🗺️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Berikut alur pikir logis yang dijalankan Scratch setiap detik selama game arkade berlangsung:
            </p>
            <div class="concept-card">
              <ol style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.7;">
                <li>1️⃣ <strong>Mulai Ronde:</strong> <code>set Nyawa to 3</code> &amp; <code>set Skor to 0</code></li>
                <li>2️⃣ <strong>Deteksi Tangkapan:</strong>
                  <br>• Apel Segar 🍎 ➔ <code>Skor +1</code> &amp; suara <em>Chomp</em>
                  <br>• Buah Busuk 🍏 ➔ <code>Nyawa -1</code> &amp; suara <em>Oops</em>
                </li>
                <li>3️⃣ <strong>Pengecekan Syarat:</strong> Apakah <code>Nyawa = 0</code>?</li>
                <li>4️⃣ <strong>Kondisi Kalah:</strong> Jika ya ➔ <code>broadcast GameOver</code> &amp; hentikan game!</li>
              </ol>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: #090d16; border: 2px solid #ef4444; border-radius: 16px; padding: 22px; width: 100%; text-align: center;">
              <div style="font-size: 42px; margin-bottom: 8px;">❤️ ➔ 🍏 ➔ 💀</div>
              <h4 style="color: #f43f5e; font-size: 16px; font-weight: 800; margin-bottom: 6px;">Arsitektur Nyawa Sesi 16</h4>
              <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5;">Kombinasi deteksi bahaya, pengurangan variabel, dan siaran broadcast kekalahan!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 7: PLAYABLE SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 62–74">
        <div class="slide-header">
          <div class="badge-session">Playable Arcade • Tangkap Apel vs Hindari Buah Busuk</div>
          <div class="badge-time">⏱️ Menit ke 62–74</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Tantangan Nyata: <span>Pertahankan 3 Hatimu</span>! 🎮
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Waktunya beraksi! Tangkap <strong>Apel Segar (🍎)</strong> untuk menambah skor, dan <strong>HINDARI Buah Busuk (🍏)</strong> agar 3 hatimu tidak habis!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>Klik Bendera Hijau:</strong> Memulai game dengan 3 Hati Nyawa penuh</li>
                <li>🖱️ <strong>Gerakkan Mouse:</strong> Geser mangkuk ke kiri &amp; kanan</li>
                <li>🍎 <strong>Apel Segar (+1):</strong> Menambah skor tangkapan</li>
                <li>🍏 <strong>Buah Busuk (-1 ❤️):</strong> Mengurangi nyawa &amp; bersuara <em>Oops</em>!</li>
                <li>💀 <strong>Jika Nyawa = 0:</strong> Game Over seketika!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <div class="sim-btns">
                  <button class="btn-green-flag" onclick="startPlayableGame_16()" title="Mulai Permainan 3 Nyawa">🚩</button>
                  <button class="btn-red-stop" onclick="stopPlayableGame_16()" title="Hentikan Permainan">🛑</button>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <div id="simHeartsBadge_16" style="background: #090d16; border: 1px solid #ef4444; color: #f43f5e; font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 999px; font-family: 'Fredoka', cursive; transition: all 0.2s;">
                    NYAWA: <span id="gameHearts_16">❤️❤️❤️</span>
                  </div>
                  <div class="sim-score-badge">
                    🍎 SKOR: <span id="gameScore_16">0</span>
                  </div>
                </div>
              </div>

              <div id="gameCanvas_16" class="sim-canvas" onmousemove="handleGameMouse_16(event)">
                <!-- Overlay Mulai -->
                <div id="gameOverlay_16" style="position: absolute; inset: 0; background: rgba(0,0,0,0.78); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; padding: 16px; text-align: center;">
                  <span style="font-size: 36px; margin-bottom: 6px;">🍎 vs 🍏</span>
                  <span style="font-size: 14px; font-weight: 800; color: #fbbf24;">Tantangan 3 Hati Nyawa!</span>
                  <span style="font-size: 11.5px; color: #cbd5e1; margin: 4px 0 12px;">Tangkap apel merah 🍎 dan HINDARI buah busuk hijau 🍏!</span>
                  <button onclick="startPlayableGame_16()" style="background: #10b981; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 13px; font-weight: 700; padding: 7px 18px; border-radius: 999px; cursor: pointer;">
                    🚩 Mulai Sekarang (3 Nyawa)
                  </button>
                </div>

                <!-- Overlay Game Over Screen -->
                <div id="gameOverScreen_16" style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.94); display: none; flex-direction: column; align-items: center; justify-content: center; z-index: 25; padding: 16px; text-align: center;">
                  <span style="font-size: 42px; margin-bottom: 4px;">💀💥</span>
                  <span style="font-size: 17px; font-weight: 800; color: #ef4444;">GAME OVER! NYAWA HABIS!</span>
                  <span style="font-size: 12.5px; color: #cbd5e1; margin-top: 4px;">Kamu terkena buah beracun! Skor Akhir: <strong id="finalScoreVal_16" style="font-size: 18px; color: #fbbf24;">0</strong></span>
                  <button onclick="startPlayableGame_16()" style="margin-top: 12px; background: #f59e0b; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 12px; font-weight: 700; padding: 6px 16px; border-radius: 999px; cursor: pointer;">
                    🔄 Main Ulang (3 Hati Penuh)
                  </button>
                </div>

                <!-- Sprite Apel Segar -->
                <div id="gameAppleFresh_16" style="position: absolute; font-size: 26px; transform: translate(-50%, -50%); top: -30px; left: 120px; pointer-events: none;">🍎</div>
                <!-- Sprite Buah Busuk -->
                <div id="gameAppleRotten_16" style="position: absolute; font-size: 26px; transform: translate(-50%, -50%); top: -60px; left: 220px; pointer-events: none;">🍏</div>
                <!-- Sprite Mangkuk -->
                <div id="gameBowl_16" style="position: absolute; font-size: 30px; transform: translate(-50%, -50%); bottom: 10px; left: 160px; pointer-events: none;">🥣</div>
              </div>

              <div style="background: #0f172a; padding: 6px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1e293b; font-size: 11px; color: #94a3b8;">
                <span>Mekanik: <strong style="color: #f43f5e;">❤️ 3 Health Hearts &amp; 🍏 Buah Busuk</strong></span>
                <span id="gameLiveStatus_16" style="color: #10b981;">● Siap Dimainkan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 8: DOKTER KODE ================= -->
      <div class="slide" data-time="⏱️ Menit ke 74–82">
        <div class="slide-header">
          <div class="badge-session">Klinik Debugging • Mengatasi Bug Nyawa</div>
          <div class="badge-time">⏱️ Menit ke 74–82</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Dokter Kode: <span>Menangani Bug Nyawa Habis Seketika</span> 🐛
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Saat merakit buah busuk, ada bug fatal yang sering membuat pemain frustrasi: menyentuh buah busuk sekali saja tapi nyawa langsung ludes jadi nol! Yuk lihat cara mengatasinya:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚀 Segera lempar buah busuk ke atas <code>go to x: random y: 170</code> tepat setelah mengurangi nyawa</li>
                <li>🔄 Jangan lupa me-reset <code>set [Nyawa] to 3</code> di balok <code>when 🏴 clicked</code></li>
                <li>🎯 Gunakan angka negatif <code>-1</code> di <code>change [Nyawa] by (-1)</code></li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
              <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #ef4444; font-weight: 800; font-size: 13px; margin-bottom: 4px;">❌ KODE SALAH: Buah Busuk Menempel Terus</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  if &lt;touching BuahBusuk?&gt; then<br>
                  &nbsp;&nbsp;change [Nyawa ▾] by (-1)<br>
                  <span style="color: #f87171;">⚠️ Buah busuk tidak dipindahkan ke atas, sehingga terus menempel di mangkuk dan mengurangi nyawa 3 kali dalam 0.1 detik!</span>
                </div>
              </div>
              <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #10b981; font-weight: 800; font-size: 13px; margin-bottom: 4px;">✅ KODE BENAR: Lempar Langsung ke Langit Atas</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  if &lt;touching BuahBusuk?&gt; then<br>
                  &nbsp;&nbsp;change [Nyawa ▾] by (-1)<br>
                  &nbsp;&nbsp;start sound [Oops ▾]<br>
                  &nbsp;&nbsp;<span style="color: #34d399; font-weight: 700;">go to x: (pick random -200 to 200) y: (170)</span> ✅
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 9: RANGKUMAN & APRESIASI ================= -->
      <div class="slide" data-time="⏱️ Menit ke 82–87">
        <div class="slide-header">
          <div class="badge-session">Review Pemahaman • Sukses Sesi 16</div>
          <div class="badge-time">⏱️ Menit ke 82–87</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Programmer Tangguh! <span>Review Kunci Hari Ini</span> 🌟
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Selamat! Game arkade kamu kini memiliki sistem nyawa dan bahaya yang menantang. Mari ingat 3 poin kunci hari ini:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>1️⃣ <strong>Konsep Inti:</strong> Variabel <code>Nyawa</code> berkurang saat menangkap buah busuk</li>
                <li>2️⃣ <strong>Instruksi Kode:</strong> <code>if touching Buah Busuk ➔ change Nyawa by (-1) ➔ start sound [Oops]</code></li>
                <li>3️⃣ <strong>Panduan Mengajar:</strong> Jika <code>Nyawa = 0</code> ➔ siarkan sinyal <code>broadcast [GameOver]</code>!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(244, 63, 94, 0.1); border: 2px solid #f43f5e; border-radius: 16px; padding: 24px; text-align: center; width: 100%;">
              <div style="font-size: 48px; margin-bottom: 10px;">🏆 ❤️</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 6px;">Kerja Keras Terbayar!</h3>
              <p style="color: #cbd5e1; font-size: 13.5px; line-height: 1.5;">Kamu resmi menguasai modul Logika Nyawa &amp; Rintangan Buah Beracun di Beekoding Academy!</p>
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
              Petualangan Berlanjut: <span>Menuju Sesi 17</span>! 🚀
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Game kita semakin kaya fitur dan semakin dekat menjadi mahakarya lengkap! Jangan lupa simpan file proyek Scratch (.sb3) di laptopmu hari ini.
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>💾 Klik <code>File ➔ Save to your computer</code> di Scratch Studio</li>
                <li>🌙 <strong>Sesi 17:</strong> Multi-Level Switching &amp; Hutan Badai Malam saat Skor mencapai 50</li>
                <li>👏 Berikan tepuk tangan meriah untuk seluruh teman di kelas!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(30, 41, 59, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 26px; text-align: center; width: 100%;">
              <div style="font-size: 52px; margin-bottom: 10px;">🌟🌙</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Sampai Jumpa di Sesi 17!</h3>
              <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.5;">Tetap semangat bereksplorasi dan berkreasi membuat game impian bersama Beekoding Academy!</p>
            </div>
          </div>
        </div>
      </div>"""

    sim_js = """
    // ================= AUDIO HELPER (CHOMP, OOPS SOUND & GAME OVER SOUND) =================
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

    function playOopsSound() {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } catch(e) {}
    }

    function playGameOverSound() {
      try {
        const ctx = getAudioCtx();
        const notes = [349.23, 311.13, 261.63, 196.00]; // F4, Eb4, C4, G3
        notes.forEach((freq, idx) => {
          setTimeout(() => {
            try {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sawtooth';
              osc.frequency.setValueAtTime(freq, ctx.currentTime);
              gain.gain.setValueAtTime(0.25, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.38);
            } catch(e) {}
          }, idx * 140);
        });
      } catch(e) {}
    }

    // ================= SIMULATOR 1 (SLIDE 2): INTERACTIVE HEARTS DEMO =================
    let sim2HeartsVal = 3;
    let sim2ScoreVal = 0;

    function renderSim2Hearts() {
      const heartsEl = document.getElementById('sim2HeartsIcon');
      const valEl = document.getElementById('sim2DisplayVal');
      const stEl = document.getElementById('sim2Status');
      const subEl = document.getElementById('sim2SubText');

      let heartsStr = '';
      for (let i = 0; i < 3; i++) {
        heartsStr += (i < sim2HeartsVal) ? '❤️' : '🖤';
      }

      if (heartsEl) heartsEl.innerText = heartsStr;
      if (valEl) valEl.innerText = `Nyawa: ${sim2HeartsVal} / 3 (Skor: ${sim2ScoreVal})`;

      if (stEl) {
        if (sim2HeartsVal === 3) {
          stEl.innerText = 'Hati Penuh (3/3)';
          stEl.style.color = '#fbbf24';
        } else if (sim2HeartsVal > 0) {
          stEl.innerText = `Sisa ${sim2HeartsVal} Hati!`;
          stEl.style.color = '#f59e0b';
        } else {
          stEl.innerText = '💀 NYAWA HABIS! SIARKAN GAME OVER!';
          stEl.style.color = '#ef4444';
        }
      }
    }

    function triggerCatchRottenAppleSim2() {
      if (sim2HeartsVal > 0) {
        sim2HeartsVal--;
        playOopsSound();
        renderSim2Hearts();

        const stage = document.getElementById('sim2Stage');
        if (stage) {
          stage.style.background = '#450a0a';
          setTimeout(() => { stage.style.background = '#020617'; }, 200);
        }

        const subEl = document.getElementById('sim2SubText');
        if (sim2HeartsVal === 0) {
          playGameOverSound();
          if (subEl) subEl.innerHTML = '<strong style="color: #ef4444;">💀 Nyawa = 0! Pesan broadcast [GameOver] terpancar ke seluruh sprite!</strong>';
        } else {
          if (subEl) subEl.innerHTML = `<span style="color: #f87171;">Aduh! Buah busuk tertangkap! [change Nyawa by (-1) ➔ start sound Oops]. Sisa: ${sim2HeartsVal} ❤️</span>`;
        }
      } else {
        playOopsSound();
        const subEl = document.getElementById('sim2SubText');
        if (subEl) subEl.innerHTML = '<span style="color: #ef4444;">Hati sudah habis (0). Klik tombol Reset (3 ❤️) untuk memulai kembali!</span>';
      }
    }

    function triggerCatchFreshAppleSim2() {
      if (sim2HeartsVal > 0) {
        sim2ScoreVal++;
        playChompSound();
        renderSim2Hearts();

        const subEl = document.getElementById('sim2SubText');
        if (subEl) subEl.innerHTML = `<span style="color: #34d399;">Nyam! Apel segar tertangkap! Skor bertambah +1 (Skor: ${sim2ScoreVal}). Hati tetap aman!</span>`;
      }
    }

    function resetHeartsSim2() {
      sim2HeartsVal = 3;
      sim2ScoreVal = 0;
      playBeep(440, 'sine', 0.1);
      renderSim2Hearts();
      const subEl = document.getElementById('sim2SubText');
      if (subEl) subEl.innerText = 'Uji coba menangkap buah busuk beracun atau apel segar di bawah!';
    }

    // ================= SIMULATOR 2 (SLIDE 7): PLAYABLE GAME WITH 3 HEARTS & ROTTEN FRUIT =================
    let gameRunning_16 = false;
    let gameScore_16 = 0;
    let gameHearts_16 = 3;

    let freshAppleX_16 = 120;
    let freshAppleY_16 = -20;
    let rottenAppleX_16 = 220;
    let rottenAppleY_16 = -80;
    let gameBowlX_16 = 160;
    let gameAnimId_16 = null;

    function renderGameHeartsBadge_16() {
      const heartsEl = document.getElementById('gameHearts_16');
      if (heartsEl) {
        let str = '';
        for (let i = 0; i < 3; i++) {
          str += (i < gameHearts_16) ? '❤️' : '🖤';
        }
        heartsEl.innerText = str;
      }
    }

    function startPlayableGame_16() {
      gameRunning_16 = true;
      gameScore_16 = 0;
      gameHearts_16 = 3;

      const scoreEl = document.getElementById('gameScore_16');
      if (scoreEl) scoreEl.innerText = '0';
      renderGameHeartsBadge_16();

      const overlay = document.getElementById('gameOverlay_16');
      if (overlay) overlay.style.display = 'none';

      const overScreen = document.getElementById('gameOverScreen_16');
      if (overScreen) overScreen.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_16');
      if (liveSt) {
        liveSt.innerText = '● Bertanding! Hindari Buah Busuk';
        liveSt.style.color = '#10b981';
      }

      freshAppleY_16 = -20;
      freshAppleX_16 = Math.floor(Math.random() * 260) + 30;

      rottenAppleY_16 = -80;
      rottenAppleX_16 = Math.floor(Math.random() * 260) + 30;

      if (gameAnimId_16) cancelAnimationFrame(gameAnimId_16);
      gameLoop_16();
    }

    function finishGameOver_16() {
      gameRunning_16 = false;
      if (gameAnimId_16) cancelAnimationFrame(gameAnimId_16);

      renderGameHeartsBadge_16();

      const finalScoreEl = document.getElementById('finalScoreVal_16');
      if (finalScoreEl) finalScoreEl.innerText = gameScore_16;

      const overScreen = document.getElementById('gameOverScreen_16');
      if (overScreen) overScreen.style.display = 'flex';

      const liveSt = document.getElementById('gameLiveStatus_16');
      if (liveSt) {
        liveSt.innerText = '● Game Over (Nyawa 0)';
        liveSt.style.color = '#ef4444';
      }

      playGameOverSound();
    }

    function stopPlayableGame_16() {
      gameRunning_16 = false;
      if (gameAnimId_16) cancelAnimationFrame(gameAnimId_16);

      const overlay = document.getElementById('gameOverlay_16');
      if (overlay) overlay.style.display = 'flex';

      const overScreen = document.getElementById('gameOverScreen_16');
      if (overScreen) overScreen.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_16');
      if (liveSt) {
        liveSt.innerText = '● Permainan Dihentikan';
        liveSt.style.color = '#94a3b8';
      }
    }

    function handleGameMouse_16(e) {
      if (!gameRunning_16) return;
      const stage = document.getElementById('gameCanvas_16');
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      mouseX = Math.max(25, Math.min(rect.width - 25, mouseX));
      gameBowlX_16 = mouseX;

      const bowlEl = document.getElementById('gameBowl_16');
      if (bowlEl) bowlEl.style.left = `${gameBowlX_16}px`;
    }

    function gameLoop_16() {
      if (!gameRunning_16) return;

      const stage = document.getElementById('gameCanvas_16');
      const stageW = stage ? stage.clientWidth : 320;
      const stageH = stage ? stage.clientHeight : 220;
      const bowlTop = stageH - 35;

      // Move Fresh Apple
      freshAppleY_16 += 4.2;
      // Move Rotten Apple (slightly faster)
      rottenAppleY_16 += 4.8;

      // 1. Collision with Fresh Apple 🍎
      if (freshAppleY_16 >= bowlTop - 20 && freshAppleY_16 <= bowlTop + 15) {
        if (Math.abs(freshAppleX_16 - gameBowlX_16) < 38) {
          // Tangkap Apel Segar!
          gameScore_16++;
          const scoreEl = document.getElementById('gameScore_16');
          if (scoreEl) scoreEl.innerText = gameScore_16;
          playChompSound();

          freshAppleY_16 = -25;
          freshAppleX_16 = Math.floor(Math.random() * (stageW - 50)) + 25;
        }
      }

      // 2. Collision with Rotten Apple 🍏 (Buah Busuk)
      if (rottenAppleY_16 >= bowlTop - 20 && rottenAppleY_16 <= bowlTop + 15) {
        if (Math.abs(rottenAppleX_16 - gameBowlX_16) < 38) {
          // Kena Buah Busuk!
          gameHearts_16--;
          renderGameHeartsBadge_16();
          playOopsSound();

          // Flash effect
          if (stage) {
            stage.style.filter = 'brightness(1.5) drop-shadow(0 0 10px red)';
            setTimeout(() => { if (stage) stage.style.filter = 'none'; }, 180);
          }

          // Segera lempar buah busuk ke atas agar tidak kena 2 kali!
          rottenAppleY_16 = -50;
          rottenAppleX_16 = Math.floor(Math.random() * (stageW - 50)) + 25;

          // Cek Kondisi Kalah: Nyawa = 0
          if (gameHearts_16 <= 0) {
            finishGameOver_16();
            return;
          }
        }
      }

      // Missed bottom check
      if (freshAppleY_16 > stageH + 20) {
        freshAppleY_16 = -25;
        freshAppleX_16 = Math.floor(Math.random() * (stageW - 50)) + 25;
      }
      if (rottenAppleY_16 > stageH + 20) {
        rottenAppleY_16 = -40;
        rottenAppleX_16 = Math.floor(Math.random() * (stageW - 50)) + 25;
      }

      // Render Positions
      const freshEl = document.getElementById('gameAppleFresh_16');
      if (freshEl) {
        freshEl.style.left = `${freshAppleX_16}px`;
        freshEl.style.top = `${freshAppleY_16}px`;
      }
      const rottenEl = document.getElementById('gameAppleRotten_16');
      if (rottenEl) {
        rottenEl.style.left = `${rottenAppleX_16}px`;
        rottenEl.style.top = `${rottenAppleY_16}px`;
      }

      gameAnimId_16 = requestAnimationFrame(gameLoop_16);
    }
    """

    full_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slide Mengajar: Sesi 16 - Logika Nyawa (Health Heart) &amp; Buah Beracun | Beekoding Academy</title>
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
      <span class="brand-stage-badge">STAGE 2: SESI 16</span>
    </div>

    <div class="toolbar-actions">
      <a href="/slides/index.html" class="btn-nav-sesi" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 800;" title="Buka Portal Semua Sesi &amp; Stage">🗂️ Semua Sesi</a>
      <a href="/slides/sesi-15/index.html" class="btn-nav-sesi">⏪ Sesi 15</a>
      <a href="/slides/sesi-17/index.html" class="btn-nav-sesi">Sesi 17 ⏩</a>
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

    SESI16_HTML_PATH.write_text(full_html, encoding="utf-8")
    open_div = full_html.count("<div")
    close_div = full_html.count("</div>")
    print(f"[OK] Sesi 16 updated. Open div: {open_div}, Close div: {close_div}, Diff: {open_div - close_div}")

if __name__ == "__main__":
    build_sesi16()
