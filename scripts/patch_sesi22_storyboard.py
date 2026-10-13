import os
import sys
import json
import shutil
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

ARTIFACT_DIR = Path(r"C:\Users\devop\.gemini\antigravity\brain\645a5bda-8de7-4b62-a0d1-1f8ba42f03f5")
SESI22_DIR = Path(r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\public\slides\sesi-22")
SESI22_HTML_PATH = SESI22_DIR / "index.html"

def build_sesi22():
    # Copy 3D Storyboard hero image as beeby-storyboard.jpg
    src_img = ARTIFACT_DIR / "beeby_game_design_storyboard_1791883505152.jpg"
    dest_img = SESI22_DIR / "beeby-storyboard.jpg"
    if src_img.exists():
        shutil.copy2(src_img, dest_img)
        print(f"[OK] Copied {src_img.name} to {dest_img.name}")

    # Read existing styling to keep 100% exact styling
    existing_html = SESI22_HTML_PATH.read_text(encoding="utf-8")
    style_start = existing_html.find("<style>")
    style_end = existing_html.find("</style>") + len("</style>")
    style_block = existing_html[style_start:style_end]

    notes = [
        {
            "title": "Slide 1: Pembukaan & Sambutan Sesi 22",
            "time": "Menit 00–10 (Total 90 Menit)",
            "instructions": "Sambut siswa dengan antusiasme memulai Proyek Akhir Capstone Level 2! Jelaskan peran game designer profesional yang selalu membuat cetak biru sebelum mengoding. Tunjukkan ilustrasi 3D Beeby merancang Game Sheet.",
            "script": "Halo para Game Designer Hebat! Selamat datang di Sesi 22! Hari ini adalah tonggak bersejarah dalam perjalanan belajar kalian: kita memulai perancangan Capstone Project Level 2! Seperti arsitek yang menggambar denah rumah sebelum membangun, hari ini kita akan menuangkan semua ide game impian kalian ke dalam Lembar Game Sheet Beekoding!"
        },
        {
            "title": "Slide 2: Konsep Dasar & Simulator Game Sheet Designer",
            "time": "Menit 10–22",
            "instructions": "Jelaskan 4 elemen utama Game Sheet: Karakter Utama, Objek Target, Rintangan, dan Aturan Menang/Kalah. Demonstrasikan simulator blueprint di kanan.",
            "script": "Coba perhatikan simulator Game Sheet di sebelah kanan! Kalian bisa memilih jenis game, tokoh pahlawan, rintangan yang dihadapi, hingga fitur-fitur keren Stage 2 seperti Timer, Nyawa, dan Multi-Level. Klik tombol Hasilkan Blueprint dan lihat bagaimana ide kalian tersusun rapi!"
        },
        {
            "title": "Slide 3: Anatomi Game Sheet: Karakter & Mekanik Gerakan",
            "time": "Menit 22–32",
            "instructions": "Bimbing siswa mengisi bagian 1 Game Sheet: Nama tokoh, kostum, dan cara mengendalikannya (apakah berjalan panah, navigasi mouse, atau lompat/spasi).",
            "script": "Pertama, siapa tokoh utama di game kalian? Apakah Beeby sang lebah cerdas, robot penjelajah, atau kucing lincah? Lalu bagaimana pemain mengendalikannya? Tentukan apakah menggunakan tombol panah keyboard atau kepakan tombol spasi!"
        },
        {
            "title": "Slide 4: Anatomi Game Sheet: Target Skor vs Rintangan Bahaya",
            "time": "Menit 32–42",
            "instructions": "Pandu siswa merancang item yang dikumpulkan dan musuh yang harus dihindari. Tuliskan efek balok kodenya di lembar kerja.",
            "script": "Kedua, apa yang membuat game ini menantang? Tentukan benda apa yang memberi poin saat disentuh, dan bahaya apa yang mengurangi nyawa pemain! Jangan lupa bayangkan efek suaranya saat terjadi tabrakan!"
        },
        {
            "title": "Slide 5: Anatomi Game Sheet: Aturan Menang & Kalah (Win/Lose)",
            "time": "Menit 42–52",
            "instructions": "Ajak siswa menetapkan kondisi akhir game: Berapa skor untuk menang atau ganti ke Level 2? Apa yang terjadi jika waktu habis atau nyawa menjadi 0?",
            "script": "Ketiga, bagaimana pemain bisa menang? Apakah harus mencapai Skor 10 sebelum waktu 30 detik habis? Dan apa yang menyebabkan Game Over? Menetapkan aturan yang jelas adalah kunci game yang adil dan seru!"
        },
        {
            "title": "Slide 6: Alur Algoritma: Dari Lembar Kertas ke Balok Scratch",
            "time": "Menit 52–62",
            "instructions": "Jelaskan langkah metodologis: Sketsa Game Sheet -> Siapkan Aset Gambar -> Koding Balok Kunci (Sesi 23) -> Uji & Presentasi (Sesi 24).",
            "script": "Inilah alur kerja profesional: kita buat perencanaannya hari ini, lalu di Sesi 23 pekan depan kita rakit balok kodenya di Scratch, dan di Sesi 24 kita gelar pameran game akbar! Rencana yang rapi membuat koding jadi mudah dan menyenangkan!"
        },
        {
            "title": "Slide 7: Playable Sandbox: Menguji Purwarupa Cepat (Prototype)",
            "time": "Menit 62–74",
            "instructions": "Ajak siswa mencoba prototype mini di canvas slide. Siswa menguji kombinasi hero dan target untuk merasakan gameplay secara langsung.",
            "script": "Sebelum kalian menggambar di kertas, coba mainkan sandbox purwarupa cepat ini! Gerakkan hero kalian untuk menangkap target. Rasakan sensasi ritme permainannya. Apakah temponya sudah seru dan menantang?"
        },
        {
            "title": "Slide 8: Klinik Dokter Kode: Konsep MVP (Minimum Viable Product)",
            "time": "Menit 74–82",
            "instructions": "Bahas jebakan klasik: ingin membuat game terlalu rumit sekaligus (scope creep). Tekankan pentingnya membuat versi sederhana dulu (MVP) yang berfungsi sempurna.",
            "script": "Dokter Kode berpesan: jangan langsung ingin membuat 100 monster dan 50 level sekaligus ya! Buatlah game inti kalian berfungsi dengan sempurna terlebih dahulu: 1 pahlawan, 1 target, dan 1 rintangan. Jika sudah berjalan lancar, barulah tambahkan fitur-fitur ekstra!"
        },
        {
            "title": "Slide 9: Rangkuman & Pesta Apresiasi Desain Game",
            "time": "Menit 82–87",
            "instructions": "Ajak siswa saling menunjukkan lembar Game Sheet mereka dan berikan apresiasi atas ide-ide cemerlang. Tekan tombol konfeti bersama.",
            "script": "Luar biasa! Semua lembar Game Sheet kalian dipenuhi ide-ide brilian dan kreatif! Kalian resmi menjadi Game Designer masa depan! Klik tombol konfeti untuk merayakan selesainya cetak biru game kalian!"
        },
        {
            "title": "Slide 10: Penutup & Teaser Sesi 23",
            "time": "Menit 87–90",
            "instructions": "Ingatkan siswa menyimpan lembar Game Sheet dengan aman untuk dibawa dan dieksekusi menjadi kode Scratch di Sesi 23.",
            "script": "Simpan lembar Game Sheet kalian baik-baik di map ya! Di Sesi 23 pekan depan, kita akan mulai merangkai balok-balok kode Scratch untuk menghidupkan game impian kalian! Sampai jumpa di studio koding!"
        }
    ]
    notes_json = json.dumps(notes, indent=6, ensure_ascii=False)

    slides_html = """      <!-- ================= SLIDE 1: COVER ================= -->
      <div class="slide active" data-time="⏱️ Menit ke 00–10">
        <div class="slide-header">
          <div class="badge-session">Sesi 22 • Capstone Storyboard Level 2</div>
          <div class="badge-time">⏱️ Menit ke 00–10</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h1 class="slide-title">
              Brainstorming &amp; <span>Sketsa Storyboard</span>! 📝🎨
            </h1>
            <p style="color: #cbd5e1; font-size: 15.5px; margin: 12px 0 18px; line-height: 1.55;">
              Selamat datang di <strong>STAGE 2: SESI 22</strong>! Hari ini kita memulai proyek mahakarya kita: <strong>Merancang Alur Game Impian di Lembar Game Sheet Beekoding</strong>. Jadilah Game Designer profesional yang merencanakan segalanya dengan matang sebelum mulai merangkai balok kode!
            </p>
            <div class="concept-card">
              <div style="color: #fbbf24; font-weight: 800; font-size: 13.5px; margin-bottom: 6px;">🎯 Misi Utama Hari Ini:</div>
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>📝 <strong>Konsep &amp; Inti:</strong> Anak menggambar alur game impian di lembar Game Sheet Beekoding</li>
                <li>🧠 <strong>Instruksi / Kode:</strong> Perencanaan matang sebelum mulai merangkai balok kode di Scratch</li>
                <li>🏛️ <strong>Analogi Arsitek:</strong> Menyiapkan cetak biru (blueprint) agar struktur game kokoh &amp; terarah</li>
                <li>⭐ <strong>Kombinasi Stage 2:</strong> Memilih fitur keren: Timer, Nyawa, Multi-Level, High Score &amp; Audio!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <img src="beeby-storyboard.jpg" alt="Beeby Merancang Game Sheet Storyboard - Beekoding Level 2" class="hero-img" />
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 2: KONSEP DASAR & SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 10–22">
        <div class="slide-header">
          <div class="badge-session">Konsep Dasar • Desain Cetak Biru Game</div>
          <div class="badge-time">⏱️ Menit ke 10–22</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Cetak Biru Game: <span>Rencana Sebelum Koding</span> 🗺️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Game developer profesional tidak langsung membuka komputer dan mengetik kode secara acak! Mereka menuangkan ide di atas kertas terlebih dahulu agar tahu apa yang harus dibuat:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🐝 <strong>Karakter Utama:</strong> Siapa pahlawannya dan bagaimana cara mengendalikannya?</li>
                <li>🎯 <strong>Target &amp; Misi:</strong> Benda apa yang harus dikumpulkan untuk meraih skor?</li>
                <li>⚡ <strong>Rintangan &amp; Bahaya:</strong> Musuh atau perangkap apa yang mengurangi nyawa?</li>
                <li>🏆 <strong>Kondisi Akhir:</strong> Kapan pemain menang, dan kapan Game Over terjadi?</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <span style="font-weight: 800; font-size: 13px; color: #fbbf24;">📋 Game Sheet Planner Generator</span>
                <span id="sim2PlanBadge" style="color: #10b981; font-size: 12px; font-weight: 700;">Blueprint Siap</span>
              </div>
              <div style="padding: 14px; background: #0f172a; display: flex; flex-direction: column; gap: 10px;">
                <!-- Pilihan Genre & Hero -->
                <div style="display: flex; gap: 8px;">
                  <div style="flex: 1;">
                    <label style="font-size: 10.5px; color: #94a3b8; font-weight: 700;">TIPE GAME:</label>
                    <select id="sim2GenreSelect" onchange="generateBlueprintCard()" style="width: 100%; background: #1e293b; color: #fff; border: 1px solid #475569; padding: 6px; border-radius: 6px; font-size: 11.5px; margin-top: 3px;">
                      <option value="Catch Game (Tangkap Buah/Bintang)">🍎 Catch Game (Tangkap Objek)</option>
                      <option value="Flappy Arcade (Tembus Pipa)">🐝 Flappy Arcade (Menembus Pipa)</option>
                      <option value="Platformer Jump (Lompat Rintangan)">🏃 Platformer Jump (Lompat Duri)</option>
                      <option value="Maze Adventure (Labirin Madu)">🗺️ Maze Adventure (Petualangan)</option>
                    </select>
                  </div>
                  <div style="flex: 1;">
                    <label style="font-size: 10.5px; color: #94a3b8; font-weight: 700;">HERO SPRITE:</label>
                    <select id="sim2HeroSelect" onchange="generateBlueprintCard()" style="width: 100%; background: #1e293b; color: #fff; border: 1px solid #475569; padding: 6px; border-radius: 6px; font-size: 11.5px; margin-top: 3px;">
                      <option value="Beeby Sang Lebah Cerdik 🐝">🐝 Beeby Sang Lebah</option>
                      <option value="Kucing Penjelajah Bintang 🐱">🐱 Kucing Penjelajah</option>
                      <option value="Robot Cyber Pemburu Madu 🤖">🤖 Robot Cyber</option>
                    </select>
                  </div>
                </div>

                <!-- Pilihan Rintangan & Target -->
                <div style="display: flex; gap: 8px;">
                  <div style="flex: 1;">
                    <label style="font-size: 10.5px; color: #94a3b8; font-weight: 700;">TARGET POIN:</label>
                    <select id="sim2TargetSelect" onchange="generateBlueprintCard()" style="width: 100%; background: #1e293b; color: #fff; border: 1px solid #475569; padding: 6px; border-radius: 6px; font-size: 11.5px; margin-top: 3px;">
                      <option value="Bintang Madu Emas ⭐ (+1 Poin)">⭐ Bintang Madu Emas</option>
                      <option value="Apel Manis Segar 🍎 (+1 Poin)">🍎 Apel Manis Segar</option>
                      <option value="Permata Kristal Langka 💎 (+2 Poin)">💎 Permata Kristal</option>
                    </select>
                  </div>
                  <div style="flex: 1;">
                    <label style="font-size: 10.5px; color: #94a3b8; font-weight: 700;">RINTANGAN BAHAYA:</label>
                    <select id="sim2HazardSelect" onchange="generateBlueprintCard()" style="width: 100%; background: #1e293b; color: #fff; border: 1px solid #475569; padding: 6px; border-radius: 6px; font-size: 11.5px; margin-top: 3px;">
                      <option value="Laba-laba Patroli 🕷️ (-1 Nyawa)">🕷️ Laba-laba Patroli</option>
                      <option value="Buah Beracun Busuk 🍏 (-1 Nyawa)">🍏 Buah Beracun Busuk</option>
                      <option value="Pipa Raksasa Hijau 🧱 (Game Over)">🧱 Pipa Raksasa Hijau</option>
                    </select>
                  </div>
                </div>

                <!-- Kartu Hasil Blueprint -->
                <div id="sim2CardOutput" style="background: rgba(30, 41, 59, 0.85); border: 2px dashed #fbbf24; border-radius: 10px; padding: 10px 12px; font-size: 11.5px; color: #e2e8f0; line-height: 1.5;">
                  <!-- Diisi secara dinamis -->
                </div>

                <button onclick="triggerConfettiBlueprint()" style="background: linear-gradient(135deg, #10b981, #059669); border: none; color: #fff; font-weight: 800; font-size: 12px; padding: 8px 14px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
                  ✨ Kunci Ide Game Sheet Saya!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 3: BALOK KUNCI UTAMA ================= -->
      <div class="slide" data-time="⏱️ Menit ke 22–32">
        <div class="slide-header">
          <div class="badge-session">Bagian 1 Game Sheet • Tokoh &amp; Kontrol Pemain</div>
          <div class="badge-time">⏱️ Menit ke 22–32</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Kolom 1: <span>Hero Sprite &amp; Cara Mengendalikannya</span> 🕹️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Di kolom pertama Game Sheet, gambarlah sketsa karakter utama dan tentukan kode kendali yang akan kamu pasang:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🎨 <strong>Sketsa Tokoh:</strong> Gambar karakter impianmu dengan kostum unik</li>
                <li>📍 <strong>Posisi Mulai:</strong> Tentukan koordinat <code>go to x: (0) y: (-120)</code></li>
                <li>⌨️ <strong>Kendali Pemain:</strong> Apakah tombol panah, mouse gerak, atau tombol spasi?</li>
                <li>🔄 <strong>Ukuran (Size):</strong> Atur agar tidak terlalu besar di layar panggung (misal: 60%)</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block motion">
                go to x: <span class="block-input">0</span> y: <span class="block-input">-120</span>
              </div>
              <div class="scratch-block looks">
                set size to <span class="block-input">60</span> %
              </div>
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-sensing">key <span class="block-input">right arrow ▾</span> pressed?</span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block motion">
                        change x by <span class="block-input">10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="background: rgba(245, 158, 11, 0.15); border-left: 3px solid #f59e0b; padding: 6px 10px; border-radius: 0 6px 6px 0; margin-top: 6px; font-size: 11.5px; color: #fde68a;">
                💡 <em>Catatan Storyboard:</em> Tuliskan opsi kendali favoritmu di lembar kerja agar saat membuka Scratch minggu depan kamu langsung tahu balok apa yang harus ditarik!
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 4: LOGIKA KONDISI & KEPUTUSAN ================= -->
      <div class="slide" data-time="⏱️ Menit ke 32–42">
        <div class="slide-header">
          <div class="badge-session">Bagian 2 Game Sheet • Target Poin vs Rintangan</div>
          <div class="badge-time">⏱️ Menit ke 32–42</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Kolom 2: <span>Misi Poin vs Ancaman Bahaya</span> ⚔️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Game yang seru selalu memiliki pertarungan antara hadiah dan bahaya! Tuliskan apa target yang harus diburu dan apa yang harus dihindari:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>⭐ <strong>Target Poin:</strong> <code>if touching Hero then change Skor by (1)</code></li>
                <li>🔊 <strong>Efek Suara Hadiah:</strong> Mainkan suara ceria seperti <em>Coin</em> atau <em>Collect</em></li>
                <li>🍏 <strong>Rintangan Bahaya:</strong> <code>if touching Musuh then change Nyawa by (-1)</code></li>
                <li>💥 <strong>Efek Tabrakan:</strong> Suara <em>Oops</em> dan kurangi 1 hati nyawa pemain!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div style="font-size: 11px; font-weight: 800; color: #10b981; margin-bottom: 2px;">KODE TARGET POIN:</div>
              <div class="scratch-block-c">
                if <span class="scratch-inline-sensing">touching <span class="block-input">Hero ▾</span>?</span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block variable">
                    change <span class="block-input">Skor ▾</span> by <span class="block-input">1</span>
                  </div>
                  <div class="scratch-block sound">
                    start sound <span class="block-input">CollectDing ▾</span>
                  </div>
                </div>
              </div>
              <div style="font-size: 11px; font-weight: 800; color: #ef4444; margin: 8px 0 2px;">KODE RINTANGAN BAHAYA:</div>
              <div class="scratch-block-c">
                if <span class="scratch-inline-sensing">touching <span class="block-input">Hero ▾</span>?</span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block variable">
                    change <span class="block-input">Nyawa ▾</span> by <span class="block-input">-1</span>
                  </div>
                  <div class="scratch-block sound">
                    start sound <span class="block-input">Oops ▾</span>
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
          <div class="badge-session">Bagian 3 Game Sheet • Kondisi Menang &amp; Kalah</div>
          <div class="badge-time">⏱️ Menit ke 42–52</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Kolom 3: <span>Kapan Menang &amp; Kapan Game Over?</span> 🏁
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Setiap game harus memiliki garis akhir yang jelas! Di kolom ini, tentukan syarat kemenangan dan kekalahan:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🏆 <strong>Syarat Menang:</strong> Berhasil mencapai <code>Skor &gt;= 10</code> sebelum waktu habis</li>
                <li>🆙 <strong>Kenaikan Level:</strong> Berganti ke <em>Level 2 (Latar Malam)</em> dengan tantangan lebih cepat</li>
                <li>💀 <strong>Syarat Kalah:</strong> Jika <code>Nyawa = 0</code> atau <code>Waktu = 0</code></li>
                <li>📢 <strong>Sinyal Broadcast:</strong> Siarkan pesan <code>broadcast [GameOver ▾]</code> atau <code>broadcast [Menang ▾]</code>!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">Skor</span> &gt;= <span class="block-input">10</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block looks">
                    switch backdrop to <span class="block-input">Level 2 ▾</span>
                  </div>
                  <div class="scratch-block sound">
                    start sound <span class="block-input">VictoryFanfare ▾</span>
                  </div>
                </div>
              </div>
              <div class="scratch-block-c" style="margin-top: 6px;">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">Nyawa</span> = <span class="block-input">0</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block event" style="background:#ffab19; color:#fff;">
                    broadcast <span class="block-input">GameOver ▾</span>
                  </div>
                  <div class="scratch-block control">
                    stop <span class="block-input">all ▾</span>
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
          <div class="badge-session">Alur Capstone • Roadmap 3 Langkah Menuju Wisuda</div>
          <div class="badge-time">⏱️ Menit ke 52–62</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Roadmap Capstone: <span>Dari Kertas ke Game Nyata</span> 🗺️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Inilah tahapan lengkap penyelesaian proyek akhir Stage 2 di Beekoding Academy:
            </p>
            <div class="concept-card">
              <ol style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.7;">
                <li>1️⃣ <strong>Sesi 22 (Hari Ini):</strong> Sketsa Storyboard, Tulis Aturan &amp; Desain Game Sheet</li>
                <li>2️⃣ <strong>Sesi 23 (Pekan Depan):</strong> Merakit Balok Kode Scratch &amp; Memasukkan Fitur Spesial</li>
                <li>3️⃣ <strong>Sesi 24 (Pekan Terakhir):</strong> Polishing, Bug Testing, Game Showcase &amp; Wisuda Level 2!</li>
              </ol>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: #090d16; border: 2px solid #38bdf8; border-radius: 16px; padding: 22px; width: 100%; text-align: center;">
              <div style="font-size: 42px; margin-bottom: 8px;">📝 ➔ 🧩 ➔ 🎓</div>
              <h4 style="color: #38bdf8; font-size: 16px; font-weight: 800; margin-bottom: 6px;">Siklus Capstone Project</h4>
              <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5;">Perencanaan rapi di Sesi 22 adalah 50% kunci keberhasilan game kalian saat dikoding nanti!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 7: PLAYABLE SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 62–74">
        <div class="slide-header">
          <div class="badge-session">Playable Sandbox • Uji Purwarupa Cepat (Prototype)</div>
          <div class="badge-time">⏱️ Menit ke 62–74</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Coba Idenya: <span>Uji Prototype Cepat!</span> 🧪
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Sebelum digambar final di kertas Game Sheet, uji ide permainanmu di sandbox mini ini! Geser karaktermu untuk merasakan serunya menangkap target:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>Klik Mulai:</strong> Menjalankan prototipe game</li>
                <li>⌨️ <strong>Panah Kiri / Kanan atau Mouse:</strong> Menggerakkan karakter terpilih</li>
                <li>⭐ <strong>Tangkap Target:</strong> Poin bertambah dan suara berbunyi</li>
                <li>💡 <strong>Refleksi:</strong> Apakah kecepatan jatuh target sudah pas dan seru?</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <div class="sim-btns">
                  <button class="btn-green-flag" onclick="startPlayableGame_22()" title="Mulai Prototype">🚩</button>
                  <button class="btn-red-stop" onclick="stopPlayableGame_22()" title="Hentikan Prototype">🛑</button>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <div class="sim-score-badge" style="border-color: #fbbf24; color: #fbbf24;">
                    ⭐ SKOR: <span id="gameScore_22">0</span>
                  </div>
                  <div class="sim-score-badge" style="border-color: #38bdf8; color: #38bdf8;">
                    ⏱️ <span id="gameTimer_22">15</span>s
                  </div>
                </div>
              </div>

              <div id="gameCanvas_22" class="sim-canvas" style="background: linear-gradient(180deg, #090d16 0%, #1e1b4b 65%, #2e1065 100%); position: relative; overflow: hidden; height: 210px;">
                <!-- Overlay Mulai -->
                <div id="gameOverlay_22" style="position: absolute; inset: 0; background: rgba(0,0,0,0.82); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; padding: 16px; text-align: center;">
                  <span style="font-size: 38px; margin-bottom: 4px;">🧪🎮</span>
                  <span style="font-size: 14.5px; font-weight: 800; color: #fbbf24;">Laboratorium Prototipe Capstone!</span>
                  <span style="font-size: 11.5px; color: #cbd5e1; margin: 4px 0 12px;">Uji rasa permainanmu sebelum mulai menuangkannya di Game Sheet!</span>
                  <button onclick="startPlayableGame_22()" style="background: #10b981; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 13px; font-weight: 700; padding: 7px 18px; border-radius: 999px; cursor: pointer;">
                    🚩 Uji Purwarupa Sekarang (Spasi)
                  </button>
                </div>

                <!-- Overlay Game Over Screen -->
                <div id="gameOverScreen_22" style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.94); display: none; flex-direction: column; align-items: center; justify-content: center; z-index: 25; padding: 16px; text-align: center;">
                  <span style="font-size: 42px; margin-bottom: 2px;">🎉📋</span>
                  <span style="font-size: 16px; font-weight: 800; color: #fbbf24;">PROTOTYPE BERHASIL DIUJI!</span>
                  <span style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">Hasil Uji Coba: <strong id="finalScoreVal_22" style="color: #38bdf8; font-size: 17px;">0</strong> Target Tertangkap!</span>
                  <button onclick="startPlayableGame_22()" style="margin-top: 12px; background: #f59e0b; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 12px; font-weight: 700; padding: 6px 16px; border-radius: 999px; cursor: pointer;">
                    🔄 Coba Lagi (Spasi)
                  </button>
                </div>

                <!-- Sprite Hero -->
                <div id="gameBeeby_22" style="position: absolute; font-size: 32px; left: 135px; bottom: 8px; pointer-events: none; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5)); transition: left 0.05s ease-out;">🐝</div>

                <!-- Target Item Jatuh -->
                <div id="gameTarget_22" style="position: absolute; font-size: 26px; left: 140px; top: -35px; pointer-events: none; filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.9));">⭐</div>
              </div>

              <div style="background: #0f172a; padding: 8px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1e293b; font-size: 11px;">
                <div style="display: flex; gap: 6px;">
                  <button onclick="moveBeebyLeft_22()" style="background: #1e293b; border: 1px solid #475569; color: #cbd5e1; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 6px; cursor: pointer;">◀ Kiri</button>
                  <button onclick="moveBeebyRight_22()" style="background: #1e293b; border: 1px solid #475569; color: #cbd5e1; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 6px; cursor: pointer;">Kanan ▶</button>
                </div>
                <span id="gameLiveStatus_22" style="color: #10b981;">● Siap Uji Coba</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 8: DOKTER KODE ================= -->
      <div class="slide" data-time="⏱️ Menit ke 74–82">
        <div class="slide-header">
          <div class="badge-session">Klinik Debugging • Filosofi MVP vs Terlalu Rumit</div>
          <div class="badge-time">⏱️ Menit ke 74–82</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Dokter Kode: <span>Jebakan Ide Terlalu Rumit</span> 🩺
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Kesalahan paling umum pembuat game pemula: ingin memasukkan 100 monster, 50 senjata, dan 20 jurus sekaligus sehingga tidak pernah selesai!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>❌ <strong>Jebakan Scope Creep:</strong> Ide terlalu rumit hingga bingung sendiri saat menyusun kode</li>
                <li>✅ <strong>Prinsip MVP (Minimum Viable Product):</strong> Buat versi sederhana yang berfungsi dulu!</li>
                <li>🎯 <strong>Fokus Core Loop:</strong> 1 Hero + 1 Target + 1 Rintangan = Game Seru!</li>
                <li>➕ <strong>Tingkatkan Bertahap:</strong> Jika game inti sudah berjalan lancar, baru tambahkan fitur ekstra!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
              <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #ef4444; font-weight: 800; font-size: 13px; margin-bottom: 4px;">❌ RENCANA TERLALU RUMIT</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  "Mau buat 10 jenis boss naga, 20 pedang sakti, dan peta dunia 50 level..."<br>
                  <span style="color: #f87171;">⚠️ Terlalu rumit, waktu habis dan game tidak selesai dikoding!</span>
                </div>
              </div>
              <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #10b981; font-weight: 800; font-size: 13px; margin-bottom: 4px;">✅ RENCANA MVP CERDAS</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  "Beeby tangkap 10 Bintang Madu, hindari 1 Laba-laba Patroli, durasi 30 detik!"<br>
                  <span style="color: #34d399; font-weight: 700;">✅ Jelas, terarah, menyenangkan, dan 100% tuntas dikoding!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 9: RANGKUMAN & APRESIASI ================= -->
      <div class="slide" data-time="⏱️ Menit ke 82–87">
        <div class="slide-header">
          <div class="badge-session">Review Pemahaman • Sukses Sesi 22</div>
          <div class="badge-time">⏱️ Menit ke 82–87</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Master Perancang! <span>Game Sheet Selesai</span> 🌟
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Selamat! Cetak biru game impianmu sudah lengkap dan siap dieksekusi! Mari ingat 3 kunci sukses hari ini:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>1️⃣ <strong>Konsep Inti:</strong> Menggambar alur game impian di Game Sheet sebelum mulai koding</li>
                <li>2️⃣ <strong>Perencanaan Matang:</strong> Menentukan Hero, Target, Rintangan, dan Syarat Menang/Kalah</li>
                <li>3️⃣ <strong>Strategi MVP:</strong> Merancang game yang terarah agar selesai tepat waktu dengan kualitas terbaik!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(245, 158, 11, 0.1); border: 2px solid #f59e0b; border-radius: 16px; padding: 24px; text-align: center; width: 100%;">
              <div style="font-size: 48px; margin-bottom: 10px;">📋 🎨</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 6px;">Game Sheet Resmi Siap!</h3>
              <p style="color: #cbd5e1; font-size: 13.5px; line-height: 1.5;">Kamu resmi menguasai fase Game Design &amp; Storyboarding Capstone Level 2 di Beekoding Academy!</p>
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
          <div class="badge-session">Teaser Sesi Berikutnya • Waktunya Koding</div>
          <div class="badge-time">⏱️ Menit ke 87–90</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Petualangan Berlanjut: <span>Menuju Sesi 23</span>! 🚀
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Simpan lembar Game Sheet kalian dengan aman di dalam map! Pekan depan adalah saatnya mengeksekusi semua ide ini menjadi game nyata di Scratch.
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>📁 Simpan lembar Game Sheet fisikmu dengan rapi</li>
                <li>🧩 <strong>Sesi 23:</strong> Merakit Kode Capstone Project Level 2 di Scratch Studio!</li>
                <li>👏 Berikan tepuk tangan meriah untuk seluruh Game Designer cilik di kelas!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(30, 41, 59, 0.9); border: 2px solid #10b981; border-radius: 18px; padding: 26px; text-align: center; width: 100%;">
              <div style="font-size: 52px; margin-bottom: 10px;">🌟🧩</div>
              <h3 style="color: #10b981; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Sampai Jumpa di Sesi 23!</h3>
              <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.5;">Bersiap merakit balok-balok kode Scratch dan mewujudkan game impianmu bersama Beekoding Academy!</p>
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
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToSlide(currentSlide - 1);
      } else if (e.key === 'n' || e.key === 'N') {
        toggleNotes();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.code === 'Space' || e.key === ' ') {
        // Tombol Spasi khusus simulator Slide 2 & arcade prototype Slide 7
        const slides = document.querySelectorAll('.slide');
        const slide2 = slides[1];
        const slide7 = slides[6];
        if (slide2 && slide2.classList.contains('active')) {
          e.preventDefault();
          triggerConfettiBlueprint();
        } else if (slide7 && slide7.classList.contains('active')) {
          e.preventDefault();
          if (!gameRunning_22) {
            startPlayableGame_22();
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

    // ================= SIMULATOR 1 (SLIDE 2): BLUEPRINT CARD GENERATOR =================
    function generateBlueprintCard() {
      const genre = document.getElementById('sim2GenreSelect')?.value || 'Catch Game';
      const hero = document.getElementById('sim2HeroSelect')?.value || 'Beeby';
      const target = document.getElementById('sim2TargetSelect')?.value || 'Bintang Madu';
      const hazard = document.getElementById('sim2HazardSelect')?.value || 'Laba-laba';
      const card = document.getElementById('sim2CardOutput');

      if (card) {
        card.innerHTML = `
          <div style="color: #fbbf24; font-weight: 800; margin-bottom: 4px;">📌 CETAK BIRU GAME TERSUSUN:</div>
          <div>🎮 <strong>Genre:</strong> ${genre}</div>
          <div>🦸 <strong>Pahlawan:</strong> ${hero}</div>
          <div>⭐ <strong>Misi Target:</strong> ${target}</div>
          <div>⚠️ <strong>Bahaya:</strong> ${hazard}</div>
          <div style="margin-top: 4px; color: #a7f3d0; font-size: 11px;">
            [✓] Timer 30s &nbsp;|&nbsp; [✓] 3 Nyawa Hati &nbsp;|&nbsp; [✓] Level 2 &nbsp;|&nbsp; [✓] HighScore &nbsp;|&nbsp; [✓] BGM Mute
          </div>
        `;
      }
      playBeep(659.25, 'triangle', 0.1, 0.2);
    }

    function triggerConfettiBlueprint() {
      triggerConfetti();
      playBeep(880, 'sine', 0.2, 0.3);
      const b = document.getElementById('sim2PlanBadge');
      if (b) {
        b.innerText = '🎉 Blueprint Terkunci!';
        b.style.color = '#fbbf24';
      }
    }

    // Initialize Blueprint Card on Load
    generateBlueprintCard();

    // ================= SIMULATOR 2 (SLIDE 7): PLAYABLE PROTOTYPE SANDBOX =================
    let gameRunning_22 = false;
    let gameScore_22 = 0;
    let gameTimer_22 = 15;
    let gameTimerInterval_22 = null;
    let gameBeebyX_22 = 135;
    let gameTargetX_22 = 140;
    let gameTargetY_22 = -35;
    let gameTargetSpeed_22 = 3.8;
    let gameAnimId_22 = null;

    function startPlayableGame_22() {
      gameRunning_22 = true;
      gameScore_22 = 0;
      gameTimer_22 = 15;
      gameBeebyX_22 = 135;
      gameTargetY_22 = -35;
      gameTargetX_22 = Math.floor(Math.random() * 260) + 30;

      const scoreEl = document.getElementById('gameScore_22');
      const timerEl = document.getElementById('gameTimer_22');
      if (scoreEl) scoreEl.innerText = '0';
      if (timerEl) timerEl.innerText = '15';

      const overlay = document.getElementById('gameOverlay_22');
      if (overlay) overlay.style.display = 'none';

      const overScreen = document.getElementById('gameOverScreen_22');
      if (overScreen) overScreen.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_22');
      if (liveSt) {
        liveSt.innerText = '● Prototipe Berjalan! Tangkap Target';
        liveSt.style.color = '#10b981';
      }

      if (gameTimerInterval_22) clearInterval(gameTimerInterval_22);
      gameTimerInterval_22 = setInterval(() => {
        if (!gameRunning_22) return;
        gameTimer_22--;
        const tEl = document.getElementById('gameTimer_22');
        if (tEl) tEl.innerText = gameTimer_22;

        if (gameTimer_22 <= 0) {
          finishGameOver_22();
        }
      }, 1000);

      if (gameAnimId_22) cancelAnimationFrame(gameAnimId_22);
      gameLoop_22();
    }

    function stopPlayableGame_22() {
      gameRunning_22 = false;
      if (gameTimerInterval_22) clearInterval(gameTimerInterval_22);
      if (gameAnimId_22) cancelAnimationFrame(gameAnimId_22);

      const overlay = document.getElementById('gameOverlay_22');
      if (overlay) overlay.style.display = 'flex';

      const overScreen = document.getElementById('gameOverScreen_22');
      if (overScreen) overScreen.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_22');
      if (liveSt) {
        liveSt.innerText = '● Prototipe Dihentikan';
        liveSt.style.color = '#94a3b8';
      }
    }

    function finishGameOver_22() {
      gameRunning_22 = false;
      if (gameTimerInterval_22) clearInterval(gameTimerInterval_22);
      if (gameAnimId_22) cancelAnimationFrame(gameAnimId_22);

      const finalScore = document.getElementById('finalScoreVal_22');
      if (finalScore) finalScore.innerText = gameScore_22;

      const overScreen = document.getElementById('gameOverScreen_22');
      if (overScreen) overScreen.style.display = 'flex';

      playBeep(523.25, 'triangle', 0.2);
      setTimeout(() => playBeep(659.25, 'triangle', 0.25), 120);
      setTimeout(() => playBeep(783.99, 'triangle', 0.35), 240);
      triggerConfetti();

      const liveSt = document.getElementById('gameLiveStatus_22');
      if (liveSt) {
        liveSt.innerText = '● Uji Coba Selesai';
        liveSt.style.color = '#fbbf24';
      }
    }

    function moveBeebyLeft_22() {
      if (!gameRunning_22) return;
      gameBeebyX_22 = Math.max(15, gameBeebyX_22 - 28);
      const bEl = document.getElementById('gameBeeby_22');
      if (bEl) bEl.style.left = `${gameBeebyX_22}px`;
    }

    function moveBeebyRight_22() {
      if (!gameRunning_22) return;
      const canvas = document.getElementById('gameCanvas_22');
      const maxW = canvas ? canvas.clientWidth - 50 : 280;
      gameBeebyX_22 = Math.min(maxW, gameBeebyX_22 + 28);
      const bEl = document.getElementById('gameBeeby_22');
      if (bEl) bEl.style.left = `${gameBeebyX_22}px`;
    }

    // Keyboard Panah Kiri/Kanan & Mouse Touch Listener untuk Slide 7
    window.addEventListener('keydown', (e) => {
      const slide7 = document.querySelectorAll('.slide')[6];
      if (slide7 && slide7.classList.contains('active') && gameRunning_22) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          moveBeebyLeft_22();
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          moveBeebyRight_22();
        }
      }
    });

    const canvasEl_22 = document.getElementById('gameCanvas_22');
    if (canvasEl_22) {
      canvasEl_22.addEventListener('mousemove', (e) => {
        if (!gameRunning_22) return;
        const rect = canvasEl_22.getBoundingClientRect();
        const relX = e.clientX - rect.left - 20;
        gameBeebyX_22 = Math.max(15, Math.min(rect.width - 45, relX));
        const bEl = document.getElementById('gameBeeby_22');
        if (bEl) bEl.style.left = `${gameBeebyX_22}px`;
      });
    }

    function gameLoop_22() {
      if (!gameRunning_22) return;

      const canvas = document.getElementById('gameCanvas_22');
      const canvasH = canvas ? canvas.clientHeight : 210;
      const canvasW = canvas ? canvas.clientWidth : 320;

      // Jatuhkan Target Item
      gameTargetY_22 += gameTargetSpeed_22;

      // Cek Menangkap Target
      const beebyY = canvasH - 35;
      if (gameTargetY_22 > beebyY - 25 && gameTargetY_22 < beebyY + 25) {
        if (Math.abs(gameTargetX_22 - gameBeebyX_22) < 38) {
          // Tertangkap!
          gameScore_22++;
          playBeep(880, 'sine', 0.12, 0.3);
          const scEl = document.getElementById('gameScore_22');
          if (scEl) scEl.innerText = gameScore_22;

          // Reset Target ke atas
          gameTargetY_22 = -35;
          gameTargetX_22 = Math.floor(Math.random() * (canvasW - 60)) + 30;
        }
      }

      // Jika Target lolos jatuh ke lantai
      if (gameTargetY_22 > canvasH) {
        gameTargetY_22 = -35;
        gameTargetX_22 = Math.floor(Math.random() * (canvasW - 60)) + 30;
      }

      // Render posisi target
      const targetEl = document.getElementById('gameTarget_22');
      if (targetEl) {
        targetEl.style.top = `${gameTargetY_22}px`;
        targetEl.style.left = `${gameTargetX_22}px`;
      }

      gameAnimId_22 = requestAnimationFrame(gameLoop_22);
    }

    // Initialize
    updateSlide();
    """

    final_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slide Mengajar: Sesi 22 - Brainstorming &amp; Sketsa Storyboard Capstone Level 2 | Beekoding Academy</title>
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
      <span class="brand-stage-badge">STAGE 2: SESI 22</span>
    </div>

    <div class="toolbar-actions">
      <a href="/slides/index.html" class="btn-nav-sesi" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 800;" title="Buka Portal Semua Sesi &amp; Stage">🗂️ Semua Sesi</a>
      <a href="/slides/sesi-21/index.html" class="btn-nav-sesi">⏪ Sesi 21</a>
      <a href="/slides/sesi-23/index.html" class="btn-nav-sesi">Sesi 23 ⏩</a>
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

    SESI22_HTML_PATH.write_text(final_html, encoding="utf-8")
    o = final_html.count("<div")
    c = final_html.count("</div")
    print(f"[OK] Sesi 22 updated. Open div: {o}, Close div: {c}, Diff: {o - c}")

if __name__ == "__main__":
    build_sesi22()
