import os
import sys
import json
import shutil
from pathlib import Path
from stage4_rich_blueprint import get_stage4_configs

sys.stdout.reconfigure(encoding='utf-8')

ARTIFACT_DIR = Path(r"C:\Users\devop\.gemini\antigravity\brain\645a5bda-8de7-4b62-a0d1-1f8ba42f03f5")
BASE_SLIDES_DIR = Path(r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\public\slides")

def generate_teacher_notes(s_num, cfg):
    return [
        {
            "title": f"Slide 1: Pembukaan & Sambutan Sesi {s_num:02d}",
            "time": "Menit 00–10 (Total 90 Menit)",
            "instructions": "Sambut siswa dengan semangat Game Jam! Tunjukkan ilustrasi 3D Beeby di layar proyektor dan jelaskan target pengembangan studio game hari ini.",
            "script": f"Halo para Game Developer Muda Beekoding! Selamat datang di STAGE 4: Sesi {s_num:02d}! Hari ini studio kita akan merancang dan memprogram {cfg['title']}! Siapa yang siap menciptakan karya game impian?"
        },
        {
            "title": f"Slide 2: Konsep Dasar & Simulator {cfg['mechanic_badge']}",
            "time": "Menit 10–22",
            "instructions": "Demonstrasikan simulator interaktif di slide ini dan jelaskan bagaimana arsitektur game RPG / Game Jam ini bekerja.",
            "script": f"Coba perhatikan simulator {cfg['sim_label']} di sebelah kanan! Saat kita menguji sistem ini, variabel dan daftar data di dalam game langsung bereaksi secara dinamis!"
        },
        {
            "title": "Slide 3: Balok Kunci & Inisialisasi Sistem Game",
            "time": "Menit 22–32",
            "instructions": "Bimbing siswa menyiapkan variabel, List (Daftar), atau broadcast awal pada proyek Scratch mereka.",
            "script": "Langkah pertama seorang Lead Programmer adalah memastikan semua data awal bersih dan terinisialisasi saat Bendera Hijau diklik!"
        },
        {
            "title": "Slide 4: Logika Utama & Mekanik Interaktif",
            "time": "Menit 32–42",
            "instructions": "Pandu siswa merakit blok logika utama (syarat kondisi, pengolahan List, atau state machine) pada karakter Beeby.",
            "script": "Sekarang kita rakit otak utama dari fitur hari ini! Perhatikan bagaimana balok kondisi memeriksa status permainan dengan sangat cerdas!"
        },
        {
            "title": "Slide 5: Sinkronisasi Antar-Sprite & Efek Audio-Visual",
            "time": "Menit 42–52",
            "instructions": "Ajak siswa menghubungkan sinyal broadcast antar-sprite serta menambahkan polesan efek visual dan suara.",
            "script": "Game yang hebat terasa hidup karena setiap karakter saling berkomunikasi lewat sinyal Broadcast dan efek suara yang pas!"
        },
        {
            "title": "Slide 6: Alur Arsitektur Game Studio",
            "time": "Menit 52–62",
            "instructions": "Jelaskan alur kerja sistem game: Inisialisasi Data -> Aksi Pemain -> Evaluasi Logika/List -> Umpan Balik Layar.",
            "script": "Mari kita lihat peta arsitektur game kita: dari aksi pemain, diproses oleh logika dan penyimpanan data, hingga menghasilkan respon di panggung!"
        },
        {
            "title": "Slide 7: Playtesting & Uji Coba Mekanik Game",
            "time": "Menit 62–74",
            "instructions": "Beri waktu siswa mencoba langsung simulator playable di slide dan menguji proyek game mereka bersama rekan satu tim.",
            "script": "Waktunya Playtesting! Klik bendera hijau, uji mekanik game kalian, dan pastikan semua fitur berjalan mulus!"
        },
        {
            "title": "Slide 8: Klinik Dokter Kode & Game QA (Debugging)",
            "time": "Menit 74–82",
            "instructions": "Bahas bug logika yang sering muncul pada tahap produksi game dan cara memperbaikinya secara sistematis.",
            "script": "Dokter Kode datang membantu! Di dunia studio game profesional, proses mencari dan memperbaiki bug ini disebut Quality Assurance (QA)!"
        },
        {
            "title": "Slide 9: Rangkuman & Pesta Apresiasi Kreator Game",
            "time": "Menit 82–87",
            "instructions": "Rayakan pencapaian studio hari ini dengan menekan tombol konfeti dan memberi apresiasi kepada setiap tim.",
            "script": "Luar biasa! Satu lagi fitur kelas profesional berhasil kalian tambahkan ke dalam proyek Game Jam kalian. Mari kita rayakan dengan konfeti!"
        },
        {
            "title": "Slide 10: Penutup, Backup File & Teaser Berikutnya",
            "time": "Menit 87–90",
            "instructions": "Ingatkan siswa menyimpan file proyek (.sb3) dengan nama versi yang rapi untuk dilanjutkan pada sesi berikutnya.",
            "script": "Jangan lupa simpan proyek kalian ke komputer! Sampai jumpa di sesi pengembangan Game Jam berikutnya!"
        }
    ]

def generate_slides_markup(s_num, cfg):
    slides = []

    # Slide 1: Cover with 3D Beeby Hero Image
    slides.append(f"""      <!-- ================= SLIDE 1: COVER ================= -->
      <div class="slide active" data-time="⏱️ Menit ke 00–10">
        <div class="slide-header">
          <div class="badge-session">{cfg['badge']}</div>
          <div class="badge-time">⏱️ Menit ke 00–10</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h1 class="slide-title">
              Junior Game Jam: <span>{cfg['title']}</span>! {cfg['icon']}
            </h1>
            <p style="color: #cbd5e1; font-size: 15.5px; margin: 12px 0 18px; line-height: 1.55;">
              Selamat datang di <strong>STAGE 4: SESI {s_num:02d}</strong>! Di tahap puncak <em>Junior Explorer</em> ini, kita berkolaborasi membangun karya terbaik melalui <strong>{cfg['subtitle']}</strong>.
            </p>
            <div class="concept-card">
              <div style="color: #fbbf24; font-weight: 800; font-size: 13.5px; margin-bottom: 6px;">🎯 Target Studio Hari Ini:</div>
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>{cfg['icon']} <strong>Fitur Utama:</strong> {cfg['mechanic_badge']}</li>
                <li>🧩 <strong>Arsitektur Scratch:</strong> Variabel, List (Daftar), &amp; Broadcast Modular</li>
                <li>🤝 <strong>Kolaborasi Kreator:</strong> Memadukan desain cerita, seni visual, dan logika kode</li>
                <li>🚀 <strong>Karya Portofolio:</strong> Menyiapkan proyek kebanggaan untuk Pameran Akbar!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <img src="{cfg['hero_img']}" alt="{cfg['title']} - Beekoding Stage 4" class="hero-img" />
          </div>
        </div>
      </div>""")

    # Slide 2: Interactive Game Mechanic Simulator
    slides.append(f"""      <!-- ================= SLIDE 2: KONSEP DASAR & SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 10–22">
        <div class="slide-header">
          <div class="badge-session">Konsep Desain Game • {cfg['mechanic_badge']}</div>
          <div class="badge-time">⏱️ Menit ke 10–22</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Mekanik Inti: <span>{cfg['title']}</span> 🤔
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Dalam pembuatan game petualangan &amp; proyek kolaborasi, sistem <strong>{cfg['mechanic_badge']}</strong> membuat permainan terasa jauh lebih seru dan profesional. Yuk uji cara kerjanya di simulator samping!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🎮 <strong>Pemicu Aksi:</strong> Pemain berinteraksi dengan objek, NPC, atau sistem menu</li>
                <li>🧠 <strong>Manajemen Data:</strong> Scratch memperbarui status Quest, List Inventory, atau Fase Game</li>
                <li>✨ <strong>Umpan Balik Visual:</strong> Panggung menampilkan perubahan status secara real-time!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <span style="font-weight: 800; font-size: 13px; color: #34d399;">🕹️ {cfg['sim_label']}: Sesi {s_num:02d}</span>
                <span id="sim2Status" style="color: #fbbf24; font-size: 12px; font-weight: 700;">Sistem Siaga</span>
              </div>
              <div id="sim2Stage" style="height: 180px; background: #020617; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; padding: 14px;">
                <div id="sim2DisplayVal" style="font-family: 'Fredoka', cursive; font-size: 36px; color: #34d399; margin-bottom: 6px; transition: transform 0.2s;">
                  {cfg['icon']} READY
                </div>
                <div id="sim2SubText" style="color: #94a3b8; font-size: 12px; text-align: center;">Klik tombol aksi di bawah untuk menguji sistem game!</div>
              </div>
              <div style="padding: 10px 14px; background: #0f172a; display: flex; justify-content: space-between; align-items: center;">
                <button onclick="triggerSim2Action()" style="background: #10b981; border: none; color: #000; font-size: 12px; font-weight: 800; padding: 7px 16px; border-radius: 8px; cursor: pointer;">
                  {cfg['sim_action_btn']}
                </button>
                <button onclick="resetSim2Action()" style="background: #1e293b; border: 1px solid #475569; color: #cbd5e1; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 8px; cursor: pointer;">
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>""")

    # Slide 3: Authentic Scratch Blocks 1 (Initialization & Data Structure)
    slides.append(f"""      <!-- ================= SLIDE 3: BALOK KUNCI UTAMA ================= -->
      <div class="slide" data-time="⏱️ Menit ke 22–32">
        <div class="slide-header">
          <div class="badge-session">Bedah Balok Kode • Struktur Data &amp; Inisialisasi</div>
          <div class="badge-time">⏱️ Menit ke 22–32</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Balok Kunci: <span>Inisialisasi &amp; Struktur Data</span> 🧩
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Agar game besar kita tidak mengalami error saat dimainkan ulang, kita selalu menyiapkan nilai awal variabel, membersihkan List, dan mengatur state awal saat bendera hijau diklik.
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>Setup Awal:</strong> Mengatur ulang status permainan dari awal</li>
                <li>📋 <strong>Variabel &amp; List:</strong> Menyimpan item, status misi, atau parameter level</li>
                <li>📡 <strong>Sinyal Pembuka:</strong> Memastikan semua sprite siap pada posisinya</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              {cfg['block3_html']}
            </div>
          </div>
        </div>
      </div>""")

    # Slide 4: Authentic Scratch Blocks 2 (Core Game Logic)
    slides.append(f"""      <!-- ================= SLIDE 4: LOGIKA KONDISI & KEPUTUSAN ================= -->
      <div class="slide" data-time="⏱️ Menit ke 32–42">
        <div class="slide-header">
          <div class="badge-session">Mekanik Inti • Algoritma &amp; Logika Game</div>
          <div class="badge-time">⏱️ Menit ke 32–42</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Merakit Logika: <span>Otak Permainan Cerdas</span> ⚡
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Di sinilah keajaiban koding bekerja! Balok kondisi akan mengecek syarat permainan (seperti isi tas Inventory, jarak teka-teki, atau fase Boss) dan mengeksekusi aksi yang tepat.
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🔍 <strong>Pengecekan Syarat:</strong> Memvalidasi apakah pemain memenuhi kondisi tertentu</li>
                <li>🎯 <strong>Perubahan State:</strong> Memperbarui isi List, skor, atau membuka gerbang rahasia</li>
                <li>🎵 <strong>Respon Instan:</strong> Memberikan dialog, animasi, dan efek suara yang seru</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              {cfg['block4_html']}
            </div>
          </div>
        </div>
      </div>""")

    # Slide 5: Authentic Scratch Blocks 3 (Broadcast & Polish)
    slides.append(f"""      <!-- ================= SLIDE 5: SINYAL BROADCAST & RESPON ================= -->
      <div class="slide" data-time="⏱️ Menit ke 42–52">
        <div class="slide-header">
          <div class="badge-session">Integrasi Sistem • Koordinasi Antar-Sprite</div>
          <div class="badge-time">⏱️ Menit ke 42–52</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Koordinasi Tim Sprite: <span>Sinyal &amp; Polesan Akhir</span> 📢
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Dalam proyek Game Jam, karakter utama, NPC, Boss, dan layar UI harus bekerja kompak menggunakan sinyal <code>broadcast</code> dan pemicu event yang rapi!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>📡 <strong>Komunikasi Modular:</strong> Menghubungkan aksi pemain dengan perubahan dunia game</li>
                <li>🎨 <strong>Transisi Halus:</strong> Mengatur kemunculan UI, cutscene, dan efek visual</li>
                <li>✨ <strong>Pengalaman Pemain:</strong> Membuat game terasa utuh dan memukau saat dimainkan</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="block-stack">
              {cfg['block5_html']}
            </div>
          </div>
        </div>
      </div>""")

    # Slide 6: Flowchart & Alur Instruksi
    slides.append(f"""      <!-- ================= SLIDE 6: ALUR INSTRUKSI LENGKAP ================= -->
      <div class="slide" data-time="⏱️ Menit ke 52–62">
        <div class="slide-header">
          <div class="badge-session">Arsitektur Studio • Alur Kerja Sistem Game</div>
          <div class="badge-time">⏱️ Menit ke 52–62</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Alur Arsitektur: <span>Setup ➔ Quest ➔ Evaluasi ➔ Reward</span> 🗺️
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Setiap fitur di dalam game petualangan selalu mengikuti 4 tahapan arsitektur terstruktur ini agar mudah dikembangkan bersama tim:
            </p>
            <div class="concept-card">
              <ol style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.7;">
                <li>1️⃣ <strong>Setup Awal:</strong> Siapkan variabel, List, dan tampilan awal panggung</li>
                <li>2️⃣ <strong>Interaksi Pemain:</strong> Pemain menjelajah, mengumpulkan item, atau melawan Boss</li>
                <li>3️⃣ <strong>Evaluasi Logika:</strong> Sistem memeriksa syarat ({cfg['mechanic_badge']})</li>
                <li>4️⃣ <strong>Reward &amp; Progres:</strong> Buka area baru, tampilkan efek kemenangan, dan lanjut ke tahap berikutnya!</li>
              </ol>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: #090d16; border: 2px solid #10b981; border-radius: 16px; padding: 22px; width: 100%; text-align: center;">
              <div style="font-size: 42px; margin-bottom: 8px;">{cfg['icon']} ➔ 🧠 ➔ 🏆</div>
              <h4 style="color: #34d399; font-size: 16px; font-weight: 800; margin-bottom: 6px;">Blueprint Game Jam Sesi {s_num:02d}</h4>
              <p style="color: #cbd5e1; font-size: 13px; line-height: 1.5;">Desain modular yang memudahkan kolaborasi tim dan pengembangan fitur lanjutan di Scratch 3.0!</p>
            </div>
          </div>
        </div>
      </div>""")

    # Slide 7: Playable Game Jam Simulator
    slides.append(f"""      <!-- ================= SLIDE 7: PLAYABLE SIMULATOR ================= -->
      <div class="slide" data-time="⏱️ Menit ke 62–74">
        <div class="slide-header">
          <div class="badge-session">Playtesting Arena • Uji Coba Proyek Game Jam</div>
          <div class="badge-time">⏱️ Menit ke 62–74</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Playtesting Langsung: <span>Misi Sesi {s_num:02d}</span>! 🎮
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Saatnya menguji prototipe game kita! Klik bendera hijau dan kendalikan Beeby untuk mengumpulkan item misi sambil menguji sistem <strong>{cfg['mechanic_badge']}</strong>!
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🚩 <strong>Klik Bendera Hijau</strong> untuk memulai sesi Playtesting</li>
                <li>🖱️ <strong>Gerakkan Karakter Beeby</strong> ke kiri &amp; kanan untuk menyelesaikan objektif</li>
                <li>🏆 <strong>Pantau Skor Misi:</strong> Pastikan respons tangkapan dan efek suara berjalan mulus!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div class="sim-box">
              <div class="sim-header">
                <div class="sim-btns">
                  <button class="btn-green-flag" onclick="startPlayableGame_{s_num}()">🚩</button>
                  <button class="btn-red-stop" onclick="stopPlayableGame_{s_num}()">🛑</button>
                </div>
                <div class="sim-score-badge">
                  POIN MISI: <span id="gameScore_{s_num}">0</span>
                </div>
              </div>

              <div id="gameCanvas_{s_num}" class="sim-canvas" onmousemove="handleGameMouse_{s_num}(event)">
                <div id="gameOverlay_{s_num}" style="position: absolute; inset: 0; background: rgba(0,0,0,0.72); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20;">
                  <span style="font-size: 34px; margin-bottom: 6px;">{cfg['icon']}</span>
                  <span style="font-size: 13px; font-weight: 700; color: #34d399;">Klik 🚩 untuk Mulai Playtesting Game Jam!</span>
                  <span style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Gerakkan kursor mouse untuk mengendalikan Beeby di arena</span>
                </div>

                <div id="gameApple_{s_num}" style="position: absolute; font-size: 26px; transform: translate(-50%, -50%); top: -30px; left: 160px; pointer-events: none;">{cfg['icon']}</div>
                <div id="gameBowl_{s_num}" style="position: absolute; font-size: 30px; transform: translate(-50%, -50%); bottom: 10px; left: 160px; pointer-events: none;">🐝</div>
              </div>

              <div style="background: #0f172a; padding: 6px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #1e293b; font-size: 11px; color: #94a3b8;">
                <span>Fitur: <strong style="color: #34d399;">{cfg['icon']} {cfg['mechanic_badge']}</strong></span>
                <span style="color: #10b981;">● Build Siap Uji</span>
              </div>
            </div>
          </div>
        </div>
      </div>""")

    # Slide 8: Dokter Kode (Debugging)
    slides.append(f"""      <!-- ================= SLIDE 8: DOKTER KODE ================= -->
      <div class="slide" data-time="⏱️ Menit ke 74–82">
        <div class="slide-header">
          <div class="badge-session">Klinik QA &amp; Debugging • Solusi Bug Game Jam</div>
          <div class="badge-time">⏱️ Menit ke 74–82</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Dokter Kode: <span>Inspeksi Kualitas Game (QA)</span> 🐛
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Sebelum game kita dipamerkan ke orang tua dan teman-teman, mari kita periksa bug yang sering terjadi dan cara memperbaikinya dengan tepat:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>🔍 Periksa konsistensi nama variabel, List, dan pesan Broadcast</li>
                <li>🔄 Pastikan semua data di-reset saat bendera hijau diklik</li>
                <li>🤝 Lakukan uji silang (cross-testing) dengan teman satu tim!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
              <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #ef4444; font-weight: 800; font-size: 13px; margin-bottom: 4px;">❌ BUG UMUM DI TEMUKAN:</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  {cfg['bug_wrong']}
                </div>
              </div>
              <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 12px; padding: 12px 16px;">
                <div style="color: #10b981; font-weight: 800; font-size: 13px; margin-bottom: 4px;">✅ SOLUSI DOKTER KODE:</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #cbd5e1; background: #0b0f19; padding: 8px; border-radius: 6px; line-height: 1.45;">
                  {cfg['bug_right']}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>""")

    # Slide 9: Review & Confetti
    slides.append(f"""      <!-- ================= SLIDE 9: RANGKUMAN & APRESIASI ================= -->
      <div class="slide" data-time="⏱️ Menit ke 82–87">
        <div class="slide-header">
          <div class="badge-session">Review Pencapaian • Sukses Sesi {s_num:02d}</div>
          <div class="badge-time">⏱️ Menit ke 82–87</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Kreator Hebat! <span>Review Pencapaian Hari Ini</span> 🌟
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Selamat! Studio kalian berhasil menguasai materi <strong>{cfg['title']}</strong> di Stage 4. Mari kita rangkum 3 ilmu kunci hari ini:
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>1️⃣ <strong>Mekanik Utama:</strong> {cfg['mechanic_badge']}</li>
                <li>2️⃣ <strong>Arsitektur Game:</strong> Setup Data ➔ Aksi Pemain ➔ Evaluasi ➔ Reward</li>
                <li>3️⃣ <strong>Kolaborasi:</strong> Bekerja sama dan saling menguji karya seperti tim developer profesional</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(16, 185, 129, 0.1); border: 2px solid #10b981; border-radius: 16px; padding: 24px; text-align: center; width: 100%;">
              <div style="font-size: 48px; margin-bottom: 10px;">🏆 {cfg['icon']}</div>
              <h3 style="color: #34d399; font-size: 20px; font-weight: 800; margin-bottom: 6px;">Misi Studio Selesai!</h3>
              <p style="color: #cbd5e1; font-size: 13.5px; line-height: 1.5;">Kamu resmi menguasai modul Junior Game Jam Sesi {s_num:02d} di Beekoding Academy!</p>
              <button onclick="triggerConfetti()" style="margin-top: 14px; background: #000; color: #34d399; border: 1px solid #34d399; padding: 10px 20px; border-radius: 999px; font-weight: 800; cursor: pointer; transition: transform 0.15s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                🎊 Rayakan Keberhasilan Tim (Klik Confetti)
              </button>
            </div>
          </div>
        </div>
      </div>""")

    # Slide 10: Teaser / Closing
    next_teaser_text = f"Sesi {s_num + 1:02d}" if s_num < 48 else "Kelulusan Junior Explorer & Langkah Menuju Intermediate Coder"
    slides.append(f"""      <!-- ================= SLIDE 10: PENUTUP & TEASER ================= -->
      <div class="slide" data-time="⏱️ Menit ke 87–90">
        <div class="slide-header">
          <div class="badge-session">Penutup Sesi • Menuju Tahap Berikutnya</div>
          <div class="badge-time">⏱️ Menit ke 87–90</div>
        </div>

        <div class="slide-body">
          <div class="text-column">
            <h2 class="slide-title">
              Langkah Berikutnya: <span>Menuju {next_teaser_text}</span>! 🚀
            </h2>
            <p style="color: #cbd5e1; font-size: 15px; margin: 10px 0 16px; line-height: 1.55;">
              Proyek Masterpiece Game Jam kalian semakin lengkap dan memukau! Pastikan kalian menyimpan file proyek hari ini dengan rapi.
            </p>
            <div class="concept-card">
              <ul style="padding-left: 18px; color: #e2e8f0; font-size: 13px; line-height: 1.6;">
                <li>💾 Klik <code>File ➔ Save to your computer</code> untuk menyimpan progres terbaru</li>
                <li>📝 Catat ide tambahan yang ingin kalian masukkan pada sesi berikutnya</li>
                <li>👏 Berikan tos terbaik dan tepuk tangan meriah untuk seluruh tim di kelas!</li>
              </ul>
            </div>
          </div>

          <div class="visual-column">
            <div style="background: rgba(30, 41, 59, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 26px; text-align: center; width: 100%;">
              <div style="font-size: 52px; margin-bottom: 10px;">🌟🎓</div>
              <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Sampai Jumpa di Sesi Berikutnya!</h3>
              <p style="color: #94a3b8; font-size: 13.5px; line-height: 1.5;">Terus berkarya, berkolaborasi, dan wujudkan imajinasimu bersama Beekoding Academy!</p>
            </div>
          </div>
        </div>
      </div>""")

    return "\n\n".join(slides)


def generate_simulator_js(s_num, cfg):
    return f"""
    // ================= SIMULATOR 1 (SLIDE 2): INTERACTIVE GAME JAM SYSTEM =================
    let sim2Counter = 0;
    function triggerSim2Action() {{
      sim2Counter++;
      playBeep(560 + (sim2Counter % 6) * 60, 'triangle', 0.18);
      const disp = document.getElementById('sim2DisplayVal');
      const sub = document.getElementById('sim2SubText');
      if (disp) {{
        disp.innerText = `{cfg['icon']} AKSI #${{sim2Counter}} AKTIF!`;
        disp.style.transform = 'scale(1.18)';
        setTimeout(() => {{ disp.style.transform = 'scale(1)'; }}, 200);
      }}
      if (sub) {{
        sub.innerText = `Sistem {cfg['mechanic_badge']} berhasil memperbarui data permainan!`;
      }}
      const st = document.getElementById('sim2Status');
      if (st) st.innerText = 'Status Diperbarui!';
    }}

    function resetSim2Action() {{
      sim2Counter = 0;
      playBeep(330, 'sine', 0.1);
      const disp = document.getElementById('sim2DisplayVal');
      if (disp) disp.innerText = `{cfg['icon']} READY`;
      const sub = document.getElementById('sim2SubText');
      if (sub) sub.innerText = 'Klik tombol aksi di bawah untuk menguji sistem game!';
      const st = document.getElementById('sim2Status');
      if (st) st.innerText = 'Sistem Siaga';
    }}

    // ================= SIMULATOR 2 (SLIDE 7): PLAYABLE GAME JAM ARENA =================
    let gameRunning_{s_num} = false;
    let gameScore_{s_num} = 0;
    let gameAppleX_{s_num} = 160;
    let gameAppleY_{s_num} = -20;
    let gameBowlX_{s_num} = 160;
    let gameAnimId_{s_num} = null;

    function startPlayableGame_{s_num}() {{
      gameRunning_{s_num} = true;
      gameScore_{s_num} = 0;
      const scoreEl = document.getElementById('gameScore_{s_num}');
      if (scoreEl) scoreEl.innerText = '0';
      const overlay = document.getElementById('gameOverlay_{s_num}');
      if (overlay) overlay.style.display = 'none';

      gameAppleY_{s_num} = -20;
      gameAppleX_{s_num} = Math.floor(Math.random() * 280) + 20;

      if (gameAnimId_{s_num}) cancelAnimationFrame(gameAnimId_{s_num});
      gameLoop_{s_num}();
    }}

    function stopPlayableGame_{s_num}() {{
      gameRunning_{s_num} = false;
      if (gameAnimId_{s_num}) cancelAnimationFrame(gameAnimId_{s_num});
      const overlay = document.getElementById('gameOverlay_{s_num}');
      if (overlay) overlay.style.display = 'flex';
    }}

    function handleGameMouse_{s_num}(e) {{
      if (!gameRunning_{s_num}) return;
      const stage = document.getElementById('gameCanvas_{s_num}');
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      mouseX = Math.max(25, Math.min(rect.width - 25, mouseX));
      gameBowlX_{s_num} = mouseX;

      const bowlEl = document.getElementById('gameBowl_{s_num}');
      if (bowlEl) bowlEl.style.left = `${{gameBowlX_{s_num}}}px`;
    }}

    function gameLoop_{s_num}() {{
      if (!gameRunning_{s_num}) return;

      gameAppleY_{s_num} += 4.5;
      const stage = document.getElementById('gameCanvas_{s_num}');
      const stageH = stage ? stage.clientHeight : 220;
      const bowlTop = stageH - 35;

      // Collision Check
      if (gameAppleY_{s_num} >= bowlTop - 20 && gameAppleY_{s_num} <= bowlTop + 15) {{
        if (Math.abs(gameAppleX_{s_num} - gameBowlX_{s_num}) < 40) {{
          gameScore_{s_num}++;
          const scoreEl = document.getElementById('gameScore_{s_num}');
          if (scoreEl) scoreEl.innerText = gameScore_{s_num};
          playBeep(700, 'triangle', 0.15);

          gameAppleY_{s_num} = -25;
          gameAppleX_{s_num} = Math.floor(Math.random() * (stage.clientWidth - 50)) + 25;
        }}
      }}

      // Missed
      if (gameAppleY_{s_num} > stageH + 20) {{
        gameAppleY_{s_num} = -25;
        gameAppleX_{s_num} = Math.floor(Math.random() * (stage.clientWidth - 50)) + 25;
      }}

      const appleEl = document.getElementById('gameApple_{s_num}');
      if (appleEl) {{
        appleEl.style.left = `${{gameAppleX_{s_num}}}px`;
        appleEl.style.top = `${{gameAppleY_{s_num}}}px`;
      }}

      gameAnimId_{s_num} = requestAnimationFrame(gameLoop_{s_num});
    }}
"""


def build_rich_stage4_session(s_num, cfg):
    num_str = f"{s_num:02d}"
    prev_str = f"{s_num - 1:02d}"
    next_str = f"{s_num + 1:02d}" if s_num < 48 else None

    title_meta = f"Slide Mengajar: Sesi {num_str} - {cfg['title']} | Beekoding Academy"

    portal_btn_html = '<a href="/slides/index.html" class="btn-nav-sesi" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 800;" title="Buka Portal Semua Sesi & Stage">🗂️ Semua Sesi</a>'
    prev_btn_html = f'<a href="/slides/sesi-{prev_str}/index.html" class="btn-nav-sesi">⏪ Sesi {s_num - 1}</a>'
    next_btn_html = f'<a href="/slides/sesi-{next_str}/index.html" class="btn-nav-sesi">Sesi {s_num + 1} ⏩</a>' if next_str else ''

    notes = generate_teacher_notes(s_num, cfg)
    notes_json = json.dumps(notes, indent=6, ensure_ascii=False)
    slides_html = generate_slides_markup(s_num, cfg)
    sim_js = generate_simulator_js(s_num, cfg)

    # Read CSS from sesi-25 to guarantee 100% identical styling & layout
    sesi25_html = (BASE_SLIDES_DIR / "sesi-25" / "index.html").read_text(encoding="utf-8")
    style_start = sesi25_html.find("<style>")
    style_end = sesi25_html.find("</style>") + len("</style>")
    style_block = sesi25_html[style_start:style_end]

    html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title_meta}</title>
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
      <span class="brand-stage-badge">STAGE 4: SESI {num_str}</span>
    </div>

    <div class="toolbar-actions">
      {portal_btn_html}
      {prev_btn_html}
      {next_btn_html}
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
    return html


def main():
    configs = get_stage4_configs()
    for s_num in range(37, 49):
        cfg = configs[s_num]
        ses_dir = BASE_SLIDES_DIR / f"sesi-{s_num:02d}"
        ses_dir.mkdir(parents=True, exist_ok=True)

        # Copy 3D hero image
        src_img = ARTIFACT_DIR / cfg["src_artifact"]
        dest_img = ses_dir / cfg["hero_img"]
        assert src_img.exists(), f"Missing artifact image: {src_img}"
        shutil.copy2(src_img, dest_img)

        # Generate index.html
        html = build_rich_stage4_session(s_num, cfg)
        html_path = ses_dir / "index.html"
        html_path.write_text(html, encoding="utf-8")
        print(f"[OK] Sesi {s_num:02d} generated -> {html_path} ({len(html):,} bytes), hero={dest_img.name}")

    # Also update Sesi 36 toolbar to include link to Sesi 37
    sesi36_path = BASE_SLIDES_DIR / "sesi-36" / "index.html"
    if sesi36_path.exists():
        s36_html = sesi36_path.read_text(encoding="utf-8")
        if '/slides/sesi-37/index.html' not in s36_html:
            s36_html = s36_html.replace(
                '<a href="/slides/sesi-35/index.html" class="btn-nav-sesi">⏪ Sesi 35</a>',
                '<a href="/slides/sesi-35/index.html" class="btn-nav-sesi">⏪ Sesi 35</a>\n      <a href="/slides/sesi-37/index.html" class="btn-nav-sesi">Sesi 37 ⏩</a>'
            )
            sesi36_path.write_text(s36_html, encoding="utf-8")
            print("[OK] Added 'Sesi 37 ⏩' link to Sesi 36 toolbar.")


if __name__ == "__main__":
    main()
