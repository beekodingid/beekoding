import os
import sys
import json
import shutil
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

ARTIFACT_DIR = Path(r"C:\Users\devop\.gemini\antigravity\brain\645a5bda-8de7-4b62-a0d1-1f8ba42f03f5")
SESI20_DIR = Path(r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\public\slides\sesi-20")
SESI20_HTML_PATH = SESI20_DIR / "index.html"

def build_sesi20():
    # Copy 3D HighScore hero image as beeby-highscore.jpg
    src_img = ARTIFACT_DIR / "beeby_highscore_3d_1791853334064.jpg"
    dest_img = SESI20_DIR / "beeby-highscore.jpg"
    if src_img.exists():
        shutil.copy2(src_img, dest_img)
        print(f"[OK] Copied {src_img.name} to {dest_img.name}")

    # Read existing styling to keep 100% exact styling
    existing_html = SESI20_HTML_PATH.read_text(encoding="utf-8")
    style_start = existing_html.find("<style>")
    style_end = existing_html.find("</style>") + len("</style>")
    style_block = existing_html[style_start:style_end]

    notes = [
        {
            "title": "Slide 1: Pembukaan & Sambutan Sesi 20",
            "time": "Menit 00–10 (Total 90 Menit)",
            "instructions": "Sambut siswa dengan antusiasme mempelajari rahasia game arkade profesional: Papan Peringkat Rekor Tertinggi (High Score System)! Tunjukkan ilustrasi 3D Beeby memegang piala emas.",
            "script": "Halo para Juara Koding! Selamat datang di Sesi 20! Pernahkah kalian bermain game di mal atau di ponsel lalu melihat tulisan HIGH SCORE? Hari ini kita akan memprogram sistem rekor tertinggi kita sendiri! Kita akan belajar membandingkan nilai skor agar kalian selalu termotivasi memecahkan rekor terbaik kalian!"
        },
        {
            "title": "Slide 2: Konsep Dasar & Simulator Live High Score",
            "time": "Menit 10–22",
            "instructions": "Jelaskan konsep perbandingan nilai menggunakan operator matematika Lebih Besar Dari (>). Demonstrasikan simulator interaktif di layar kanan.",
            "script": "Coba perhatikan simulator di sebelah kanan! Rekor tertinggi itu seperti catatan juara olimpiade. Dia tidak akan pernah turun! Hanya jika skor kalian saat ini lebih besar dari rekor lama (Skor > HighScore), barulah piala emas bersinar dan rekor baru dicatat!"
        },
        {
            "title": "Slide 3: Balok Kunci: Variabel Skor vs HighScore",
            "time": "Menit 22–32",
            "instructions": "Tuntun siswa membedakan dua variabel: Skor yang selalu direset ke 0 setiap ronde baru, dan HighScore yang TIDAK BOLEH direset ke 0 agar catatan rekor tersimpan.",
            "script": "Penting sekali diperhatikan: Variabel Skor kita reset ke 0 setiap kali bendera hijau diklik. Tapi variabel HighScore JANGAN direset ke 0! Kita ingin rekor terbaik kita tetap bertahan untuk ditantang kembali di ronde berikutnya!"
        },
        {
            "title": "Slide 4: Logika Perbandingan: if Skor > HighScore",
            "time": "Menit 32–42",
            "instructions": "Bimbing siswa merakit balok if < Skor > HighScore > then set HighScore to Skor.",
            "script": "Inilah rumus ajaibnya: gunakan balok if dari kategori Control, lalu masukkan operator hijau Lebih Besar Dari (>). Komputer akan bertanya: Apakah Skor pemain sekarang lebih tinggi dari HighScore? Jika YA, langsung perbarui HighScore menjadi Skor saat ini!"
        },
        {
            "title": "Slide 5: Selebrasi & Efek Suara Rekor Baru",
            "time": "Menit 42–52",
            "instructions": "Pandu siswa menambahkan efek audio kemenangan dan ucapan selamat ketika rekor baru berhasil dipecahkan.",
            "script": "Setiap kali rekor baru tercipta, berikan hadiah visual dan suara untuk pemain! Pasang balok start sound VictoryFanfare dan minta karakter berkata: REKOR BARU TERCIPTA! Ini membuat pemain merasa sangat bangga dan ingin terus mencoba lagi!"
        },
        {
            "title": "Slide 6: Alur Algoritma Sistem High Score",
            "time": "Menit 52–62",
            "instructions": "Jelaskan bagan alur permainan: Mulai -> Kumpulkan Poin -> Game Over -> Evaluasi High Score -> Tampilkan Selebrasi / Motivasi.",
            "script": "Mari kita lihat alur logikanya: ketika permainan berakhir, sistem langsung membandingkan skor akhir dengan rekor. Jika rekor pecah, catat rekor baru dan rayakan! Jika belum, beri kata-kata semangat agar pemain pantang menyerah dan mencoba lagi!"
        },
        {
            "title": "Slide 7: Playable Arcade: Game Pemburu Bintang & High Score",
            "time": "Menit 62–74",
            "instructions": "Ajak siswa memainkan simulator mini game pemburu bintang di slide. Siswa mengumpulkan bintang selama 15 detik dan mencoba memecahkan HighScore berulang kali.",
            "script": "Sekarang giliran kalian! Klik Mulai dan tangkap bintang-bintang emas sebanyak mungkin sebelum waktu 15 detik habis! Coba perhatikan: apakah kalian berhasil memecahkan High Score kalian sendiri? Mainkan beberapa ronde dan buktikan ketangguhan kalian!"
        },
        {
            "title": "Slide 8: Klinik Dokter Kode: Operator Terbalik & Reset yang Salah",
            "time": "Menit 74–82",
            "instructions": "Bahas dua kesalahan umum: mereset HighScore ke 0 di bendera hijau, dan menggunakan operator Lebih Kecil (<) bukannya Lebih Besar (>).",
            "script": "Dokter Kode datang! Jangan sampai kalian salah memasang set HighScore to 0 di awal game ya, nanti rekornya hilang terus! Dan pastikan mulut operator hijau membuka ke arah Skor, artinya Skor LEBIH BESAR dari HighScore!"
        },
        {
            "title": "Slide 9: Rangkuman & Pesta Apresiasi Sesi 20",
            "time": "Menit 82–87",
            "instructions": "Ajak siswa merayakan penyelesaian modul High Score. Tekan tombol konfeti bersama dan tekankan pentingnya mental pantang menyerah.",
            "script": "Luar biasa! Kalian sudah berhasil membuat game dengan fitur papan peringkat profesional! Ingat, di dunia koding, kegagalan hanyalah langkah awal untuk mencetak rekor baru yang lebih hebat! Klik tombol konfeti untuk merayakannya!"
        },
        {
            "title": "Slide 10: Penutup & Teaser Sesi 21",
            "time": "Menit 87–90",
            "instructions": "Ingatkan siswa menyimpan file Scratch (.sb3) dan beri cuplikan materi musuh bergerak cerdas di Sesi 21.",
            "script": "Simpan proyek kalian ya! Di Sesi 21 pekan depan, kita akan memprogram kecerdasan buatan untuk musuh: Laba-Laba Patroli AI yang bisa berjalan bolak-balik menjaga wilayahnya! Sampai jumpa di petualangan berikutnya!"
        }
    ]
    notes_json = json.dumps(notes, indent=6, ensure_ascii=False)

    slides_html = """      <!-- ================= SLIDE 1: COVER ================= -->
      <div class="slide active" data-time="⏱️ Menit ke 00–10">
        <div class="slide-header">
          <div class="badge-session">Sesi 20 • High Score System</div>
          <div class="badge-time">⏱️ Menit ke 00–10</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h1 class="slide-title">
              Papan Peringkat Sederhana: <span>High Score System</span>! 🏆
            </h1>
            <p style="color: #cbd5e1; font-size: 15.5px; margin: 12px 0 18px; line-height: 1.55;">
              Selamat datang di <strong>STAGE 2: SESI 20</strong>! Hari ini kita memprogram fitur legendaris yang ada di setiap game arkade: <strong>Membandingkan Nilai untuk Mencatat Rekor Tertinggi (High Score)</strong>. Belajar logika perbandingan dan motivasi pantang menyerah untuk memecahkan rekor terbaikmu sendiri!
            </p>
            <div class="concept-card">
              <div style="color: #fbbf24; font-weight: 800; font-size: 13.5px; margin-bottom: 6px;">🎯 Misi Utama Hari Ini:</div>
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🏆 <strong>Konsep &amp; Inti:</strong> Membandingkan nilai: <code>if Skor &gt; HighScore then set HighScore to Skor</code></li>
                <li>⌨️ <strong>Instruksi / Kode:</strong> Memotivasi anak untuk terus mencoba memecahkan rekor sendiri</li>
                <li>💾 <strong>Penyimpanan Sesi:</strong> Menjaga nilai <code>HighScore</code> agar tidak hilang saat main ulang</li>
                <li>🎉 <strong>Game Juice:</strong> Selebrasi suara &amp; efek animasi saat rekor baru berhasil dipecahkan!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <img src="beeby-highscore.jpg" alt="Papan Peringkat High Score System - Beekoding Level 2" class="hero-img" />
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 2: KONSEP DASAR & SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 10–22">
        <div class="slide-header">
          <div class="badge-session">Konsep Dasar • Logika Rekor Tertinggi</div>
          <div class="badge-time">⏱️ Menit ke 10–22</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Analogi Juara: <span>Rekor Hanya Berubah Jika Terlampaui</span> 🤔
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Bayangkan papan rekor atlet dunia! Rekor terbaik tidak akan pernah turun. Jika kamu mencetak skor lebih tinggi, rekor lama tergeser dan rekor barumu dicatat dengan bangga!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🥇 <strong>Skor Saat Ini:</strong> Nilai yang baru saja kamu peroleh di ronde ini</li>
                <li>🏆 <strong>HighScore:</strong> Catatan nilai tertinggi yang pernah diraih sebelumnya</li>
                <li>⚖️ <strong>Uji Perbandingan:</strong> Komputer mengecek apakah <code>Skor &gt; HighScore</code></li>
                <li>✨ <strong>Hasil:</strong> Jika LEBIH BESAR, simpan angka baru dan rayakan kemenangan!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <span style="font-weight: 800; font-size: 13px; color: #fbbf24;">🏆 Simulator Uji High Score</span>
                <span id="sim2Badge" style="color: #10b981; font-size: 12px; font-weight: 700;">Siap Diuji</span>
              </div>
              <div style="padding: 16px; background: #0f172a; display: flex; flex-direction: column; gap: 12px;">
                <!-- Display Kartu Skor vs High Score -->
                <div style="display: flex; gap: 10px; justify-content: space-around;">
                  <div style="background: #1e293b; border: 2px solid #38bdf8; border-radius: 12px; padding: 10px 14px; text-align: center; flex: 1;">
                    <div style="font-size: 11px; color: #94a3b8; font-weight: 700;">SKOR KAMU</div>
                    <div id="sim2CurrentScore" style="font-size: 28px; font-weight: 800; color: #38bdf8; font-family: 'Fredoka', cursive;">12</div>
                  </div>
                  <div style="background: #1e293b; border: 2px solid #f59e0b; border-radius: 12px; padding: 10px 14px; text-align: center; flex: 1;">
                    <div style="font-size: 11px; color: #94a3b8; font-weight: 700;">HIGH SCORE</div>
                    <div id="sim2HighScore" style="font-size: 28px; font-weight: 800; color: #fbbf24; font-family: 'Fredoka', cursive;">15</div>
                  </div>
                </div>

                <!-- Slider untuk Mengubah Skor -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: #cbd5e1; margin-bottom: 4px;">
                    <span>Geser Skor Ronde Ini:</span>
                    <strong id="sim2SliderVal" style="color: #38bdf8;">12</strong>
                  </div>
                  <input type="range" id="sim2ScoreSlider" min="0" max="35" value="12" oninput="updateSim2Score(this.value)" style="width: 100%; cursor: pointer;" />
                </div>

                <!-- Tombol Bandingkan -->
                <button onclick="evaluateSim2HighScore()" style="background: linear-gradient(135deg, #f59e0b, #d97706); border: none; color: #000; font-weight: 800; font-size: 12.5px; padding: 9px 16px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
                  ⚖️ Uji: Apakah Skor &gt; HighScore?
                </button>

                <!-- Area Hasil Evaluasi -->
                <div id="sim2ResultBox" style="background: #1e1b4b; border: 1px dashed #6366f1; border-radius: 10px; padding: 10px; font-size: 12px; color: #cbd5e1; text-align: center; min-height: 48px; display: flex; align-items: center; justify-content: center;">
                  Geser nilai Skor di atas, lalu klik tombol untuk menguji!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 3: BALOK KUNCI UTAMA ================= -->
      <div class="slide" data-time="⏱️ Menit ke 22–32">
        <div class="slide-header">
          <div class="badge-session">Bedah Balok Kode • Variabel Skor vs HighScore</div>
          <div class="badge-time">⏱️ Menit ke 22–32</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Balok Kunci: <span>Jangan Reset HighScore ke 0</span>! 🧩
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Inilah perbedaan paling mendasar antara skor biasa dan rekor tertinggi: <code>Skor</code> selalu direset ke 0 saat permainan dimulai, tetapi <code>HighScore</code> dibiarkan tetap menyimpan rekor sebelumnya!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>when ⚑ clicked:</strong> Memulai permainan baru</li>
                <li>🔄 <strong>set [Skor ▾] to (0):</strong> Mengosongkan skor pemain untuk ronde baru</li>
                <li>🔒 <strong>HighScore Tetap Utuh:</strong> JANGAN letakkan balok reset untuk HighScore!</li>
                <li>👁️ <strong>show variable [HighScore ▾]:</strong> Tampilkan di layar agar pemain tertantang!</li>
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
              <div class="scratch-block variable" style="border: 2px dashed #10b981;">
                show variable <span class="block-input">HighScore ▾</span>
              </div>
              <div class="scratch-block variable">
                show variable <span class="block-input">Skor ▾</span>
              </div>
              <div style="background: rgba(16, 185, 129, 0.15); border-left: 3px solid #10b981; padding: 6px 10px; border-radius: 0 6px 6px 0; margin-top: 6px; font-size: 11.5px; color: #a7f3d0;">
                💡 <em>Catatan Guru:</em> Biarkan nilai HighScore bertahan agar pemain termotivasi memecahkan rekornya sendiri di ronde berikutnya!
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 4: LOGIKA KONDISI & KEPUTUSAN ================= -->
      <div class="slide" data-time="⏱️ Menit ke 32–42">
        <div class="slide-header">
          <div class="badge-session">Mekanik Inti • Operator Lebih Besar Dari (&gt;)</div>
          <div class="badge-time">⏱️ Menit ke 32–42</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Logika Pembanding: <span>if Skor &gt; HighScore</span> ⚡
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Saat ronde permainan berakhir (Game Over), komputer menjalankan perintah perbandingan. Jika skor yang baru diperoleh lebih besar daripada rekor lama, komputer langsung memperbarui nilai rekor!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>📩 <strong>when I receive [GameOver ▾]:</strong> Diperiksa saat ronde selesai</li>
                <li>🟢 <strong>Operator &gt; (Hijau):</strong> Membandingkan apakah nilai kiri lebih besar dari kanan</li>
                <li>📝 <strong>set [HighScore ▾] to (Skor):</strong> Rekor lama digantikan dengan skor baru</li>
                <li>🧠 <strong>Pola Berpikir:</strong> Mengajarkan anak konsep evaluasi kondisi relasional</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block event">
                when I receive <span class="block-input">GameOver ▾</span>
              </div>
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">Skor</span> &gt; <span class="scratch-inline-variable">HighScore</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block variable">
                    set <span class="block-input">HighScore ▾</span> to <span class="scratch-inline-variable">Skor</span>
                  </div>
                  <div class="scratch-block sound">
                    start sound <span class="block-input">VictoryFanfare ▾</span>
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
          <div class="badge-session">Pesta Selebrasi • Motivasi Memecahkan Rekor</div>
          <div class="badge-time">⏱️ Menit ke 42–52</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Pemberian Apresiasi: <span>Pesta Rekor Baru</span> 🎉
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Memberikan umpan balik instan sangat penting untuk membangun kepercayaan diri anak! Tambahkan kata-kata apresiasi dan efek suara meriah agar anak bersemangat mencoba lagi.
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>💬 <strong>say [🎉 REKOR BARU! 🎉] for (2) secs:</strong> Dialog bangga dari karakter</li>
                <li>📢 <strong>broadcast [PestaRekor ▾]:</strong> Memicu animasi piala atau kembang api</li>
                <li>💪 <strong>Pesan Penyemangat:</strong> Jika belum rekor baru, katakan: <em>"Ayo coba lagi!"</em></li>
                <li>🔄 <strong>Loop Motivasi:</strong> Anak tertantang untuk bermain berkali-kali</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">Skor</span> &gt; <span class="scratch-inline-variable">HighScore</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block variable">
                    set <span class="block-input">HighScore ▾</span> to <span class="scratch-inline-variable">Skor</span>
                  </div>
                  <div class="scratch-block sound">
                    start sound <span class="block-input">Tada ▾</span>
                  </div>
                  <div class="scratch-block looks">
                    say <span class="block-input">🎉 REKOR BARU TERCIPTA! 🎉</span> for <span class="block-input">2</span> secs
                  </div>
                  <div class="scratch-block event" style="background:#ffab19; color:#fff;">
                    broadcast <span class="block-input">PestaRekor ▾</span>
                  </div>
                </div>
                else
                <div class="scratch-c-indent">
                  <div class="scratch-block looks">
                    say <span class="block-input">Ayo coba lagi, kamu pasti bisa!</span> for <span class="block-input">2</span> secs
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
          <div class="badge-session">Algoritma Game • Siklus Lengkap Sistem High Score</div>
          <div class="badge-time">⏱️ Menit ke 52–62</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Siklus Sistem: <span>Bermain ➔ Bandingkan ➔ Rekor Baru</span> 🗺️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Berikut alur logika permainan yang mendorong anak terus berlatih dan berkembang:
            </p>
            <div class="concept-card">
              <ol style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.7;">
                <li>1️⃣ <strong>Mulai Ronde:</strong> <code>Skor = 0</code>, tetapi <code>HighScore</code> tetap angka rekor lama</li>
                <li>2️⃣ <strong>Kumpulkan Poin:</strong> Pemain mengumpulkan skor sebanyak-banyaknya</li>
                <li>3️⃣ <strong>Game Selesai:</strong> Evaluasi relasional: Apakah <code>Skor &gt; HighScore</code>?</li>
                <li>4️⃣ <strong>Pecah Rekor?</strong> Ya ➔ Update HighScore + Selebrasi | Belum ➔ Motivasi main lagi!</li>
              </ol>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: #090d16; border: 2px solid #f59e0b; border-radius: 16px; padding: 22px; width: 100%; text-align: center;">
              <div style="font-size: 42px; margin-bottom: 8px;">🎮 ➔ ⏳ ➔ ⚖️ ➔ 🏆</div>
              <h4 style="color: #fbbf24; font-size: 16px; font-weight: 800; margin-bottom: 6px;">Diagram Logika High Score</h4>
              <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5;">Perbandingan nilai yang memicu rasa ingin tahu, determinasi, dan kepuasan atas usaha sendiri!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 7: PLAYABLE SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 62–74">
        <div class="slide-header">
          <div class="badge-session">Playable Arcade • Pemburu Bintang &amp; Pemecah Rekor</div>
          <div class="badge-time">⏱️ Menit ke 62–74</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Mainkan Hasilnya: <span>Pecahkan High Score!</span> 🎮
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Kendalikan Beeby ke kiri &amp; kanan untuk menangkap bintang emas sebanyak mungkin sebelum waktu 15 detik habis! Uji apakah kamu berhasil memecahkan rekor terbaikmu!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>Klik Bendera Hijau:</strong> Memulai ronde baru (Skor kembali ke 0)</li>
                <li>⌨️ <strong>Panah Kiri / Kanan atau Mouse:</strong> Menggeser posisi Beeby</li>
                <li>⭐ <strong>Tangkap Bintang Emas:</strong> +1 Poin setiap bintang yang tertangkap</li>
                <li>🏆 <strong>Buktikan:</strong> Bisakah kamu mengalahkan nilai HighScore saat ini?</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <div class="sim-btns">
                  <button class="btn-green-flag" onclick="startPlayableGame_20()" title="Mulai Ronde Baru">🚩</button>
                  <button class="btn-red-stop" onclick="stopPlayableGame_20()" title="Hentikan Game">🛑</button>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <div class="sim-score-badge" style="border-color: #38bdf8; color: #38bdf8;">
                    ⭐ SKOR: <span id="gameScore_20">0</span>
                  </div>
                  <div class="sim-score-badge" style="border-color: #fbbf24; color: #fbbf24;">
                    🏆 REKOR: <span id="gameHighScore_20">5</span>
                  </div>
                  <div class="sim-score-badge" style="border-color: #ef4444; color: #fca5a5;">
                    ⏱️ <span id="gameTimer_20">15</span>s
                  </div>
                </div>
              </div>

              <div id="gameCanvas_20" class="sim-canvas" style="background: linear-gradient(180deg, #090d16 0%, #1e1b4b 65%, #312e81 100%); position: relative; overflow: hidden; height: 210px;">
                <!-- Overlay Mulai -->
                <div id="gameOverlay_20" style="position: absolute; inset: 0; background: rgba(0,0,0,0.82); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; padding: 16px; text-align: center;">
                  <span style="font-size: 38px; margin-bottom: 4px;">🏆⭐</span>
                  <span style="font-size: 14.5px; font-weight: 800; color: #fbbf24;">Tantangan Pecahkan Rekor Beeby!</span>
                  <span style="font-size: 11.5px; color: #cbd5e1; margin: 4px 0 12px;">Kumpulkan bintang emas dalam 15 detik untuk melampaui rekor!</span>
                  <button onclick="startPlayableGame_20()" style="background: #10b981; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 13px; font-weight: 700; padding: 7px 18px; border-radius: 999px; cursor: pointer;">
                    🚩 Mulai Ronde Baru (Tekan Spasi)
                  </button>
                </div>

                <!-- Overlay Game Over Screen -->
                <div id="gameOverScreen_20" style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.94); display: none; flex-direction: column; align-items: center; justify-content: center; z-index: 25; padding: 16px; text-align: center;">
                  <span id="overIcon_20" style="font-size: 42px; margin-bottom: 2px;">🎉🏆</span>
                  <span id="overTitle_20" style="font-size: 16px; font-weight: 800; color: #fbbf24;">REKOR BARU TERCIPTA!</span>
                  <span id="overSub_20" style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">Skor Kamu: <strong id="finalScoreVal_20" style="color: #38bdf8;">0</strong> | High Score: <strong id="finalHighVal_20" style="color: #fbbf24;">5</strong></span>
                  <button onclick="startPlayableGame_20()" style="margin-top: 12px; background: #f59e0b; border: none; color: #000; font-family: 'Fredoka', cursive; font-size: 12px; font-weight: 700; padding: 6px 16px; border-radius: 999px; cursor: pointer;">
                    🔄 Main Lagi &amp; Pecahkan Rekor (Spasi)
                  </button>
                </div>

                <!-- Sprite Beeby (Karakter Penjaga) -->
                <div id="gameBeeby_20" style="position: absolute; font-size: 32px; left: 140px; bottom: 8px; pointer-events: none; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4)); transition: left 0.05s ease-out;">🐝</div>

                <!-- Bintang Jatuh (Sprite Item) -->
                <div id="gameStar_20" style="position: absolute; font-size: 26px; left: 140px; top: -40px; pointer-events: none; filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.8));">⭐</div>
              </div>

              <div style="background: #0f172a; padding: 8px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1e293b; font-size: 11px;">
                <div style="display: flex; gap: 6px;">
                  <button onclick="moveBeebyLeft_20()" style="background: #1e293b; border: 1px solid #475569; color: #cbd5e1; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 6px; cursor: pointer;">◀ Kiri</button>
                  <button onclick="moveBeebyRight_20()" style="background: #1e293b; border: 1px solid #475569; color: #cbd5e1; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 6px; cursor: pointer;">Kanan ▶</button>
                </div>
                <span id="gameLiveStatus_20" style="color: #10b981;">● Siap Main</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 8: DOKTER KODE ================= -->
      <div class="slide" data-time="⏱️ Menit ke 74–82">
        <div class="slide-header">
          <div class="badge-session">Klinik Debugging • Menjaga Integritas High Score</div>
          <div class="badge-time">⏱️ Menit ke 74–82</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Dokter Kode: <span>3 Kesalahan Umum High Score</span> 🩺
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Tiga jebakan logika yang sering dialami kreator cilik saat membuat sistem rekor tertinggi:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>❌ <strong>Jebakan 1:</strong> Mereset HighScore ke 0 di bendera hijau ➔ Rekor selalu hilang!</li>
                <li>❌ <strong>Jebakan 2:</strong> Memakai operator <code>&lt;</code> (Lebih Kecil) ➔ HighScore malah mengecil!</li>
                <li>❌ <strong>Jebakan 3:</strong> Terbalik: <code>set Skor to HighScore</code> ➔ Skor pemain tertimpa!</li>
                <li>✅ <strong>Kunci Benar:</strong> <code>if Skor &gt; HighScore then set HighScore to Skor</code>!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
              <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #ef4444; font-weight: 800; font-size: 13px; margin-bottom: 4px;">❌ KODE SALAH: HighScore Ter-Reset</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  when 🏴 clicked<br>
                  &nbsp;&nbsp;set [Skor ▾] to (0)<br>
                  &nbsp;&nbsp;<span style="color: #f87171;">set [HighScore ▾] to (0)</span>  ➔ Rekor terbaik terhapus sia-sia! ❌
                </div>
              </div>
              <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #10b981; font-weight: 800; font-size: 13px; margin-bottom: 4px;">✅ KODE BENAR: HighScore Bertahan</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  when 🏴 clicked<br>
                  &nbsp;&nbsp;set [Skor ▾] to (0)<br>
                  &nbsp;&nbsp;<span style="color: #34d399; font-weight: 700;">// HighScore dibiarkan tanpa balok reset!</span> ✅
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= SLIDE 9: RANGKUMAN & APRESIASI ================= -->
      <div class="slide" data-time="⏱️ Menit ke 82–87">
        <div class="slide-header">
          <div class="badge-session">Review Pemahaman • Sukses Sesi 20</div>
          <div class="badge-time">⏱️ Menit ke 82–87</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Juara Sejati! <span>Rangkuman Sesi 20</span> 🌟
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Hebat sekali! Kamu sudah menguasai sistem papan peringkat rekor tertinggi! Ingat selalu 3 prinsip utama hari ini:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>1️⃣ <strong>Konsep Inti:</strong> Membandingkan nilai: <code>if Skor &gt; HighScore then set HighScore to Skor</code></li>
                <li>2️⃣ <strong>Penyimpanan Nilai:</strong> Jangan pernah mereset HighScore ke 0 di awal ronde</li>
                <li>3️⃣ <strong>Mental Juara:</strong> Terus mencoba memecahkan rekor terbaikmu sendiri tanpa takut gagal!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(245, 158, 11, 0.1); border: 2px solid #f59e0b; border-radius: 16px; padding: 24px; text-align: center; width: 100%;">
              <div style="font-size: 48px; margin-bottom: 10px;">🏆 🥇</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 6px;">Papan Rekor Selesai Dirakit!</h3>
              <p style="color: #cbd5e1; font-size: 13.5px; line-height: 1.5;">Kamu resmi menguasai logika High Score System di Beekoding Academy!</p>
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
              Petualangan Berlanjut: <span>Menuju Sesi 21</span>! 🚀
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Game dengan papan rekor membuat siapa saja betah bermain lama! Simpan file proyek Scratch (.sb3) di komputermu hari ini.
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>💾 Simpan file proyek: <code>File ➔ Save to your computer</code></li>
                <li>🕷️ <strong>Sesi 21:</strong> Musuh Bergerak Pintar: Laba-Laba Patroli AI yang menjaga wilayah!</li>
                <li>👏 Berikan tepuk tangan meriah untuk seluruh teman di kelas!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(30, 41, 59, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 26px; text-align: center; width: 100%;">
              <div style="font-size: 52px; margin-bottom: 10px;">🌟🕷️</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Sampai Jumpa di Sesi 21!</h3>
              <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.5;">Bersiap menghadapi musuh cerdas pertama kita bersama Beekoding Academy!</p>
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
        // Tombol Spasi khusus simulator Slide 2 & arcade game Slide 7
        const slides = document.querySelectorAll('.slide');
        const slide2 = slides[1];
        const slide7 = slides[6];
        if (slide2 && slide2.classList.contains('active')) {
          e.preventDefault();
          evaluateSim2HighScore();
        } else if (slide7 && slide7.classList.contains('active')) {
          e.preventDefault();
          if (!gameRunning_20) {
            startPlayableGame_20();
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

    function playBeep(freq = 440, type = 'sine', duration = 0.15) {
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {}
    }

    function playVictorySound() {
      try {
        const ctx = getAudioCtx();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          setTimeout(() => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
          }, idx * 110);
        });
      } catch (e) {}
    }

    function playPointSound() {
      playBeep(880, 'sine', 0.1);
    }

    // ================= SIMULATOR 1 (SLIDE 2): LIVE HIGH SCORE EVALUATION =================
    let sim2HighVal = 15;
    let sim2ScoreVal = 12;

    function updateSim2Score(val) {
      sim2ScoreVal = parseInt(val, 10);
      const scoreEl = document.getElementById('sim2CurrentScore');
      const sliderVal = document.getElementById('sim2SliderVal');
      if (scoreEl) scoreEl.innerText = sim2ScoreVal;
      if (sliderVal) sliderVal.innerText = sim2ScoreVal;
    }

    function evaluateSim2HighScore() {
      const resBox = document.getElementById('sim2ResultBox');
      const highEl = document.getElementById('sim2HighScore');
      const badge = document.getElementById('sim2Badge');

      if (sim2ScoreVal > sim2HighVal) {
        // Rekor Baru Tercapai!
        sim2HighVal = sim2ScoreVal;
        if (highEl) highEl.innerText = sim2HighVal;
        if (badge) {
          badge.innerText = '🎉 Rekor Baru!';
          badge.style.color = '#fbbf24';
        }
        if (resBox) {
          resBox.style.background = 'rgba(245, 158, 11, 0.2)';
          resBox.style.borderColor = '#fbbf24';
          resBox.innerHTML = `<span style="color:#fbbf24; font-weight:800;">🎉 REKOR BARU TERCIPTA!</span> Skor ${sim2ScoreVal} &gt; Rekor Lama. HighScore kini ${sim2HighVal}!`;
        }
        playVictorySound();
        triggerConfetti();
      } else {
        // Belum Melampaui Rekor
        if (badge) {
          badge.innerText = 'Tetap Bersemangat';
          badge.style.color = '#38bdf8';
        }
        if (resBox) {
          resBox.style.background = '#1e293b';
          resBox.style.borderColor = '#475569';
          resBox.innerHTML = `<span style="color:#94a3b8;">Belum pecah rekor. Skor (${sim2ScoreVal}) belum lebih besar dari HighScore (${sim2HighVal}). Ayo naikkan lagi!</span>`;
        }
        playBeep(330, 'sawtooth', 0.15);
      }
    }

    // ================= SIMULATOR 2 (SLIDE 7): PLAYABLE STAR CATCHER & HIGH SCORE ARCADE =================
    let gameRunning_20 = false;
    let gameScore_20 = 0;
    let gameHighScore_20 = 5;
    let gameTimer_20 = 15;
    let gameTimerInterval_20 = null;
    let gameBeebyX_20 = 140;
    let gameStarX_20 = 140;
    let gameStarY_20 = -30;
    let gameStarSpeed_20 = 3.5;
    let gameAnimId_20 = null;

    function startPlayableGame_20() {
      gameRunning_20 = true;
      gameScore_20 = 0;
      gameTimer_20 = 15;
      gameBeebyX_20 = 140;
      gameStarY_20 = -30;
      gameStarX_20 = Math.floor(Math.random() * 260) + 30;

      const scoreEl = document.getElementById('gameScore_20');
      const timerEl = document.getElementById('gameTimer_20');
      const highEl = document.getElementById('gameHighScore_20');
      if (scoreEl) scoreEl.innerText = '0';
      if (timerEl) timerEl.innerText = '15';
      if (highEl) highEl.innerText = gameHighScore_20;

      const overlay = document.getElementById('gameOverlay_20');
      if (overlay) overlay.style.display = 'none';

      const overScreen = document.getElementById('gameOverScreen_20');
      if (overScreen) overScreen.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_20');
      if (liveSt) {
        liveSt.innerText = '● Bertanding! Tangkap Bintang';
        liveSt.style.color = '#10b981';
      }

      if (gameTimerInterval_20) clearInterval(gameTimerInterval_20);
      gameTimerInterval_20 = setInterval(() => {
        if (!gameRunning_20) return;
        gameTimer_20--;
        const tEl = document.getElementById('gameTimer_20');
        if (tEl) tEl.innerText = gameTimer_20;

        if (gameTimer_20 <= 0) {
          finishGameOver_20();
        }
      }, 1000);

      if (gameAnimId_20) cancelAnimationFrame(gameAnimId_20);
      gameLoop_20();
    }

    function stopPlayableGame_20() {
      gameRunning_20 = false;
      if (gameTimerInterval_20) clearInterval(gameTimerInterval_20);
      if (gameAnimId_20) cancelAnimationFrame(gameAnimId_20);

      const overlay = document.getElementById('gameOverlay_20');
      if (overlay) overlay.style.display = 'flex';

      const overScreen = document.getElementById('gameOverScreen_20');
      if (overScreen) overScreen.style.display = 'none';

      const liveSt = document.getElementById('gameLiveStatus_20');
      if (liveSt) {
        liveSt.innerText = '● Permainan Dihentikan';
        liveSt.style.color = '#94a3b8';
      }
    }

    function finishGameOver_20() {
      gameRunning_20 = false;
      if (gameTimerInterval_20) clearInterval(gameTimerInterval_20);
      if (gameAnimId_20) cancelAnimationFrame(gameAnimId_20);

      const overScreen = document.getElementById('gameOverScreen_20');
      const overIcon = document.getElementById('overIcon_20');
      const overTitle = document.getElementById('overTitle_20');
      const finalScore = document.getElementById('finalScoreVal_20');
      const finalHigh = document.getElementById('finalHighVal_20');
      const highEl = document.getElementById('gameHighScore_20');

      if (finalScore) finalScore.innerText = gameScore_20;

      // Evaluasi Kunci Sesi 20: if Skor > HighScore then set HighScore to Skor!
      if (gameScore_20 > gameHighScore_20) {
        gameHighScore_20 = gameScore_20;
        if (highEl) highEl.innerText = gameHighScore_20;
        if (finalHigh) finalHigh.innerText = gameHighScore_20;
        if (overIcon) overIcon.innerText = '🎉🏆';
        if (overTitle) {
          overTitle.innerText = '🎉 REKOR BARU TERCIPTA! 🎉';
          overTitle.style.color = '#fbbf24';
        }
        playVictorySound();
        triggerConfetti();
      } else {
        if (finalHigh) finalHigh.innerText = gameHighScore_20;
        if (overIcon) overIcon.innerText = '💪⭐';
        if (overTitle) {
          overTitle.innerText = 'Waktu Habis! Ayo Coba Lagi!';
          overTitle.style.color = '#38bdf8';
        }
        playBeep(440, 'sine', 0.2);
      }

      if (overScreen) overScreen.style.display = 'flex';

      const liveSt = document.getElementById('gameLiveStatus_20');
      if (liveSt) {
        liveSt.innerText = '● Ronde Selesai';
        liveSt.style.color = '#fbbf24';
      }
    }

    function moveBeebyLeft_20() {
      if (!gameRunning_20) return;
      gameBeebyX_20 = Math.max(20, gameBeebyX_20 - 28);
      const bEl = document.getElementById('gameBeeby_20');
      if (bEl) bEl.style.left = `${gameBeebyX_20}px`;
    }

    function moveBeebyRight_20() {
      if (!gameRunning_20) return;
      const canvas = document.getElementById('gameCanvas_20');
      const maxW = canvas ? canvas.clientWidth - 50 : 280;
      gameBeebyX_20 = Math.min(maxW, gameBeebyX_20 + 28);
      const bEl = document.getElementById('gameBeeby_20');
      if (bEl) bEl.style.left = `${gameBeebyX_20}px`;
    }

    // Keyboard Panah Kiri/Kanan & Mouse Touch Listener untuk Slide 7
    window.addEventListener('keydown', (e) => {
      const slide7 = document.querySelectorAll('.slide')[6];
      if (slide7 && slide7.classList.contains('active') && gameRunning_20) {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          moveBeebyLeft_20();
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          moveBeebyRight_20();
        }
      }
    });

    const canvasEl_20 = document.getElementById('gameCanvas_20');
    if (canvasEl_20) {
      canvasEl_20.addEventListener('mousemove', (e) => {
        if (!gameRunning_20) return;
        const rect = canvasEl_20.getBoundingClientRect();
        const relX = e.clientX - rect.left - 20;
        gameBeebyX_20 = Math.max(15, Math.min(rect.width - 45, relX));
        const bEl = document.getElementById('gameBeeby_20');
        if (bEl) bEl.style.left = `${gameBeebyX_20}px`;
      });
    }

    function gameLoop_20() {
      if (!gameRunning_20) return;

      const canvas = document.getElementById('gameCanvas_20');
      const canvasH = canvas ? canvas.clientHeight : 210;
      const canvasW = canvas ? canvas.clientWidth : 320;

      // Jatuhkan Bintang Emas
      gameStarY_20 += gameStarSpeed_20;

      // Cek Menangkap Bintang
      const beebyY = canvasH - 35;
      if (gameStarY_20 > beebyY - 25 && gameStarY_20 < beebyY + 25) {
        if (Math.abs(gameStarX_20 - gameBeebyX_20) < 36) {
          // Tertangkap!
          gameScore_20++;
          playPointSound();
          const scEl = document.getElementById('gameScore_20');
          if (scEl) scEl.innerText = gameScore_20;

          // Reset Bintang ke atas dengan posisi acak
          gameStarY_20 = -30;
          gameStarX_20 = Math.floor(Math.random() * (canvasW - 60)) + 30;
        }
      }

      // Jika Bintang lolos jatuh ke tanah
      if (gameStarY_20 > canvasH) {
        gameStarY_20 = -30;
        gameStarX_20 = Math.floor(Math.random() * (canvasW - 60)) + 30;
      }

      // Render posisi bintang
      const starEl = document.getElementById('gameStar_20');
      if (starEl) {
        starEl.style.top = `${gameStarY_20}px`;
        starEl.style.left = `${gameStarX_20}px`;
      }

      gameAnimId_20 = requestAnimationFrame(gameLoop_20);
    }

    // Initialize
    updateSlide();
    """

    final_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slide Mengajar: Sesi 20 - Papan Peringkat Sederhana (High Score System) | Beekoding Academy</title>
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
      <span class="brand-stage-badge">STAGE 2: SESI 20</span>
    </div>

    <div class="toolbar-actions">
      <a href="/slides/index.html" class="btn-nav-sesi" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 800;" title="Buka Portal Semua Sesi &amp; Stage">🗂️ Semua Sesi</a>
      <a href="/slides/sesi-19/index.html" class="btn-nav-sesi">⏪ Sesi 19</a>
      <a href="/slides/sesi-21/index.html" class="btn-nav-sesi">Sesi 21 ⏩</a>
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

    SESI20_HTML_PATH.write_text(final_html, encoding="utf-8")
    o = final_html.count("<div")
    c = final_html.count("</div")
    print(f"[OK] Sesi 20 updated. Open div: {o}, Close div: {c}, Diff: {o - c}")

if __name__ == "__main__":
    build_sesi20()
