# Comprehensive blueprint for Stage 4 sessions (Sesi 37 to 48)
# Theme: Junior Game Jam & Kolaborasi Karya (RPG Quest, List Inventory, Boss Battle, Voice Dubbing & Annual Expo)

def get_stage4_configs():
    return {
        37: {
            "title": "Pengenalan Game Jam & Pembentukan Tim Kreator Cilik",
            "subtitle": "Kolaborasi Tim Studio Game: Pembagian Peran Game Designer, Artist Karakter, dan Programmer Logika",
            "badge": "Sesi 37 • Junior Game Jam",
            "hero_img": "beeby-gamejam.jpg",
            "src_artifact": "beeby_scratch_3d_1791793582242.jpg",
            "icon": "🤝",
            "mechanic_badge": "Team Role Sync & Modular Broadcast",
            "sim_label": "Simulator Sinkronisasi Tim Game Jam",
            "sim_action_btn": "🤝 Gabungkan Modul Tim",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">NamaStudio ▾</span> to <span class="block-input">"BeeDev Team"</span>
              </div>
              <div class="scratch-block event" style="background:#ffab19; color:#fff;">
                broadcast <span class="block-input">InisialisasiDunia ▾</span> and wait
              </div>
              <div class="scratch-block event" style="background:#ffab19; color:#fff;">
                broadcast <span class="block-input">MunculkanHero ▾</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block event">
                when I receive <span class="block-input">MunculkanHero ▾</span>
              </div>
              <div class="scratch-block looks">
                show
              </div>
              <div class="scratch-block motion">
                go to x: <span class="block-input">-150</span> y: <span class="block-input">0</span>
              </div>
              <div class="scratch-block looks">
                say <span class="block-input">"Tim BeeDev siap berpetualang! 🐝"</span> for <span class="block-input">2</span> secs
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when <span class="block-input">space ▾</span> key pressed</div>
              <div class="scratch-block event" style="background:#ffab19; color:#fff;">broadcast <span class="block-input">MulaiMisiTim ▾</span></div>
              <div class="scratch-block sound">start sound <span class="block-input">TeamCheer ▾</span></div>
            """,
            "bug_wrong": "Setiap anggota tim membuat nama broadcast yang berbeda ('Mulai', 'Start', 'Jalan') sehingga sprite tidak sinkron.",
            "bug_right": "Sepakati standar penamaan pesan broadcast bersama tim sebelum mulai merakit balok kode ✅",
            "portal_title": "Pembentukan Tim Game Jam",
            "portal_desc": "Kolaborasi tim studio game cilik: pembagian peran Game Designer, Sprite Artist, dan Lead Programmer.",
            "portal_tags": ["Game Jam", "Teamwork", "Modular Code"]
        },
        38: {
            "title": "Mendesain Dunia Game Impian (World Building & Lore)",
            "subtitle": "Merancang Peta Dunia Fantasi Sarang Emas, Desa Bunga, dan Gerbang Hutan Terlarang Multi-Area",
            "badge": "Sesi 38 • World Building & Lore",
            "hero_img": "beeby-worldbuilding.jpg",
            "src_artifact": "beeby_storybook_3d_1791794415184.jpg",
            "icon": "🗺️",
            "mechanic_badge": "Multi-Zone Map & Edge Portal Transition",
            "sim_label": "Simulator Eksplorasi Peta 3 Zona",
            "sim_action_btn": "🗺️ Pindah Zona Peta",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">ZonaPeta ▾</span> to <span class="block-input">"Desa Bunga"</span>
              </div>
              <div class="scratch-block looks">
                switch backdrop to <span class="block-input">DesaBunga ▾</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-operator"><span class="scratch-inline-sensing">x position</span> &gt; <span class="block-input">220</span></span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block looks">next backdrop</div>
                      <div class="scratch-block motion">set x to <span class="block-input">-210</span></div>
                      <div class="scratch-block sound">start sound <span class="block-input">PortalWhoosh ▾</span></div>
                    </div>
                  </div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when backdrop switches to <span class="block-input">HutanGelap ▾</span></div>
              <div class="scratch-block variable">set <span class="block-input">ZonaPeta ▾</span> to <span class="block-input">"Hutan Terlarang"</span></div>
              <div class="scratch-block looks">say <span class="block-input">"Waspada! Kita memasuki wilayah Boss!"</span> for <span class="block-input">2</span> secs</div>
            """,
            "bug_wrong": "Saat pindah backdrop di x > 220, posisi X karakter tidak dikembalikan ke kiri (-210) sehingga backdrop terus berganti tanpa henti.",
            "bug_right": "Segera set x to -210 tepat setelah next backdrop agar karakter muncul di sisi kiri area baru ✅",
            "portal_title": "World Building & Lore",
            "portal_desc": "Merancang peta dunia fantasi multi-zona dengan transisi portal tepi layar dan alur cerita petualangan.",
            "portal_tags": ["World Building", "Map Transitions", "Game Lore"]
        },
        39: {
            "title": "Sistem Dialog Kompleks & NPC Quest Pemberi Misi",
            "subtitle": "Membangun Karakter Pendukung (NPC Tetua Lebah) yang Memberikan Misi Pencarian 3 Nektar Emas",
            "badge": "Sesi 39 • NPC Quest System",
            "hero_img": "beeby-npc-quest.jpg",
            "src_artifact": "beeby_dialogue_3d_1791794275352.jpg",
            "icon": "📜",
            "mechanic_badge": "NPC State Machine & Quest Tracker",
            "sim_label": "Simulator Dialog Misi NPC",
            "sim_action_btn": "📜 Bicara ke NPC Quest",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">StatusQuest ▾</span> to <span class="block-input">"BelumMulai"</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">NektarTerkumpul ▾</span> to <span class="block-input">0</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-sensing">touching <span class="block-input">TetuaLebah ▾</span> ?</span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-operator"><span class="scratch-inline-variable">NektarTerkumpul</span> &lt; <span class="block-input">3</span></span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block looks">say <span class="block-input">"Tolong kumpulkan 3 Nektar Emas di hutan! 🍯"</span> for <span class="block-input">2</span> secs</div>
                      <div class="scratch-block variable">set <span class="block-input">StatusQuest ▾</span> to <span class="block-input">"Aktif"</span></div>
                    </div>
                  </div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">NektarTerkumpul</span> = <span class="block-input">3</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block looks">say <span class="block-input">"Misi Selesai! Ini Kunci Gerbang Boss untukmu! 🗝️"</span> for <span class="block-input">3</span> secs</div>
                  <div class="scratch-block variable">set <span class="block-input">StatusQuest ▾</span> to <span class="block-input">"Selesai"</span></div>
                </div>
              </div>
            """,
            "bug_wrong": "NPC terus mengulang dialog 'Tolong kumpulkan 3 Nektar' padahal pemain sudah mengumpulkan 3 Nektar.",
            "bug_right": "Gunakan percabangan kondisi: cek apakah NektarTerkumpul < 3 atau sudah = 3 sebelum menampilkan dialog ✅",
            "portal_title": "Dialog Kompleks & NPC Quest",
            "portal_desc": "Memprogram karakter NPC pemberi misi interaktif yang melacak progres pengumpulan item misi pemain.",
            "portal_tags": ["NPC Quest", "State Logic", "RPG Dialogue"]
        },
        40: {
            "title": "Sistem Inventori Cilik (Kantung Barang Pemain dengan List)",
            "subtitle": "Menggunakan Struktur Data List Scratch untuk Menyimpan Kunci Emas, Perisai Madu, dan Ramuan Energi",
            "badge": "Sesi 40 • List Inventory System",
            "hero_img": "beeby-inventory.jpg",
            "src_artifact": "beeby_shop_3d_1791853455697.jpg",
            "icon": "🎒",
            "mechanic_badge": "Scratch List Data Structure & Item Check",
            "sim_label": "Simulator Tas Inventori List",
            "sim_action_btn": "🎒 Simpan Item ke Tas",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block variable" style="background:#ff661a;">
                delete all of <span class="block-input">TasInventori ▾</span>
              </div>
              <div class="scratch-block variable" style="background:#ff661a;">
                add <span class="block-input">"Peta Hutan"</span> to <span class="block-input">TasInventori ▾</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-sensing">touching <span class="block-input">KunciEmas ▾</span> ?</span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block variable" style="background:#ff661a;">
                    add <span class="block-input">"Kunci Emas"</span> to <span class="block-input">TasInventori ▾</span>
                  </div>
                  <div class="scratch-block sound">start sound <span class="block-input">ItemPickup ▾</span></div>
                  <div class="scratch-block looks">hide</div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator" style="background:#ff661a;"><span class="block-input">TasInventori ▾</span> contains <span class="block-input">"Kunci Emas"</span> ?</span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block event" style="background:#ffab19; color:#fff;">broadcast <span class="block-input">BukaGerbangBoss ▾</span></div>
                </div>
              </div>
            """,
            "bug_wrong": "Tidak menaruh delete all of TasInventori di awal game sehingga barang dari permainan sebelumnya menumpuk terus.",
            "bug_right": "Selalu jalankan delete all of TasInventori saat bendera hijau diklik agar tas bersih di awal permainan ✅",
            "portal_title": "Sistem Inventori Kantung",
            "portal_desc": "Mengenal struktur data List untuk mencatat, memeriksa, dan menggunakan koleksi item di dalam kantung pemain.",
            "portal_tags": ["Data List", "Inventory Bag", "Item Logic"]
        },
        41: {
            "title": "Boss Fight Battle: Logika Serangan Musuh Raksasa (HP 20)",
            "subtitle": "Merancang Pertarungan Klimaks Melawan Raja Laba-Laba dengan Bar Darah Boss HP 20 & Pola Serangan",
            "badge": "Sesi 41 • Boss Fight Battle",
            "hero_img": "beeby-boss-battle.jpg",
            "src_artifact": "beeby_spider_3d_1791853414734.jpg",
            "icon": "👾",
            "mechanic_badge": "Boss Health Bar & Attack Pattern AI",
            "sim_label": "Simulator Pertarungan Boss HP 20",
            "sim_action_btn": "⚔️ Tembak Sengat Madu (-5 HP)",
            "block3_html": """
              <div class="scratch-block event">
                when I receive <span class="block-input">BukaGerbangBoss ▾</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">BossHP ▾</span> to <span class="block-input">20</span>
              </div>
              <div class="scratch-block looks">
                show
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-sensing">touching <span class="block-input">PeluruMadu ▾</span> ?</span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block variable">change <span class="block-input">BossHP ▾</span> by <span class="block-input">-1</span></div>
                  <div class="scratch-block looks">change <span class="block-input">brightness ▾</span> effect by <span class="block-input">50</span></div>
                  <div class="scratch-block control">wait <span class="block-input">0.1</span> seconds</div>
                  <div class="scratch-block looks">clear graphic effects</div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">BossHP</span> &lt; <span class="block-input">1</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block event" style="background:#ffab19; color:#fff;">broadcast <span class="block-input">BossKalah ▾</span></div>
                  <div class="scratch-block looks">hide</div>
                </div>
              </div>
            """,
            "bug_wrong": "Mengecek if BossHP = 0 saja, sehingga saat terkena serangan ganda (-2) dan BossHP menjadi -1, boss tidak pernah kalah.",
            "bug_right": "Gunakan kondisi if BossHP < 1 (kurang dari 1) agar nilai 0 maupun negatif tetap memicu kemenangan ✅",
            "portal_title": "Boss Fight Battle HP 20",
            "portal_desc": "Membangun pertarungan klimaks melawan Boss Raksasa dengan sistem Health Point 20, efek kedip serangan, dan pola tembakan.",
            "portal_tags": ["Boss Battle", "HP System", "Combat Logic"]
        },
        42: {
            "title": "Efek Visual Layar Bergetar (Screen Shake) & Partikel Ledakan",
            "subtitle": "Menciptakan Efek Sinematik Saat Boss Terkena Serangan dengan Guncangan Koordinat & Kloning Bintang",
            "badge": "Sesi 42 • Screen Shake & VFX",
            "hero_img": "beeby-screenshake.jpg",
            "src_artifact": "beeby_game_juice_3d_1791794753687.jpg",
            "icon": "💥",
            "mechanic_badge": "Camera Shake Offset & Particle Burst",
            "sim_label": "Simulator Screen Shake & Partikel",
            "sim_action_btn": "💥 Picu Ledakan Partikel!",
            "block3_html": """
              <div class="scratch-block event">
                when I receive <span class="block-input">EfekGetar ▾</span>
              </div>
              <div class="scratch-block-c">
                repeat <span class="block-input">6</span>
                <div class="scratch-c-indent">
                  <div class="scratch-block motion">change x by <span class="scratch-inline-operator">pick random <span class="block-input">-8</span> to <span class="block-input">8</span></span></div>
                  <div class="scratch-block motion">change y by <span class="scratch-inline-operator">pick random <span class="block-input">-8</span> to <span class="block-input">8</span></span></div>
                  <div class="scratch-block control">wait <span class="block-input">0.03</span> seconds</div>
                </div>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                repeat <span class="block-input">10</span>
                <div class="scratch-c-indent">
                  <div class="scratch-block control">create clone of <span class="block-input">PartikelLedakan ▾</span></div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block control">when I start as a clone</div>
              <div class="scratch-block motion">point in direction <span class="scratch-inline-operator">pick random <span class="block-input">-180</span> to <span class="block-input">180</span></span></div>
              <div class="scratch-block-c">
                repeat <span class="block-input">12</span>
                <div class="scratch-c-indent">
                  <div class="scratch-block motion">move <span class="block-input">8</span> steps</div>
                  <div class="scratch-block looks">change <span class="block-input">ghost ▾</span> effect by <span class="block-input">8</span></div>
                </div>
              </div>
              <div class="scratch-block control">delete this clone</div>
            """,
            "bug_wrong": "Tidak menghapus klon partikel (delete this clone) setelah ledakan selesai sehingga batas 300 klon Scratch penuh dan game macet.",
            "bug_right": "Wajib akhiri skrip when I start as a clone dengan balok delete this clone agar memori tetap ringan ✅",
            "portal_title": "Efek Visual Screen Shake",
            "portal_desc": "Menambahkan efek guncangan layar sinematik dan semburan klon partikel cahaya saat pertarungan berlangsung.",
            "portal_tags": ["Screen Shake", "VFX Particles", "Clone Management"]
        },
        43: {
            "title": "Audio Foley & Perekaman Suara Dubbing Siswa Sendiri",
            "subtitle": "Studio Dubbing Suara Asli Siswa di Tab Sounds Scratch untuk Menghidupkan Karakter & Efek Foley",
            "badge": "Sesi 43 • Voice Acting & Foley",
            "hero_img": "beeby-voice-dubbing.jpg",
            "src_artifact": "beeby_audio_3d_1791853479681.jpg",
            "icon": "🎤",
            "mechanic_badge": "Custom Audio Recording & Pitch Modulation",
            "sim_label": "Studio Dubbing & Efek Pitch Suara",
            "sim_action_btn": "🎤 Putar Dubbing Karakter",
            "block3_html": """
              <div class="scratch-block event">
                when I receive <span class="block-input">DialogHero ▾</span>
              </div>
              <div class="scratch-block sound">
                set <span class="block-input">pitch ▾</span> effect to <span class="block-input">20</span>
              </div>
              <div class="scratch-block sound">
                play sound <span class="block-input">RekamanSuaraKu ▾</span> until done
              </div>
            """,
            "block4_html": """
              <div class="scratch-block event">
                when I receive <span class="block-input">DialogBoss ▾</span>
              </div>
              <div class="scratch-block sound">
                set <span class="block-input">pitch ▾</span> effect to <span class="block-input">-40</span>
              </div>
              <div class="scratch-block sound">
                play sound <span class="block-input">SuaraRaksasa ▾</span> until done
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when 🏴 clicked</div>
              <div class="scratch-block sound">set volume to <span class="block-input">100</span> %</div>
              <div class="scratch-block sound">clear sound effects</div>
            """,
            "bug_wrong": "Memakai start sound di dalam loop forever sehingga rekaman suara bertumpuk ratusan kali seperti kaset rusak.",
            "bug_right": "Gunakan play sound ... until done untuk dialog suara agar kalimat selesai diucapkan sebelum diulang ✅",
            "portal_title": "Audio Foley & Dubbing Siswa",
            "portal_desc": "Merekam suara asli siswa untuk pengisi suara (voice acting) karakter game serta memodifikasi pitch dan efek audio.",
            "portal_tags": ["Voice Dubbing", "Foley Audio", "Sound Studio"]
        },
        44: {
            "title": "Debugging Jam: Menemukan & Memperbaiki Bug Kode Teman",
            "subtitle": "Sesi Peer Code Review & QA Testing: Saling Mencoba Game Teman, Mencatat Bug, dan Menyempurnakan Logika",
            "badge": "Sesi 44 • Debugging Jam & QA",
            "hero_img": "beeby-debugging-jam.jpg",
            "src_artifact": "beeby_controls_3d_1791853374920.jpg",
            "icon": "🔍",
            "mechanic_badge": "QA Playtesting & Edge-Case Bug Fixing",
            "sim_label": "Simulator Pemindai Bug Otomatis",
            "sim_action_btn": "🔍 Pindai & Perbaiki Bug!",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block looks">
                show
              </div>
              <div class="scratch-block looks">
                clear graphic effects
              </div>
              <div class="scratch-block motion">
                go to x: <span class="block-input">0</span> y: <span class="block-input">0</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">Nyawa</span> &lt; <span class="block-input">1</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block variable">set <span class="block-input">Nyawa ▾</span> to <span class="block-input">0</span></div>
                  <div class="scratch-block event" style="background:#ffab19; color:#fff;">broadcast <span class="block-input">GameOver ▾</span></div>
                  <div class="scratch-block control">stop <span class="block-input">other scripts in sprite ▾</span></div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when I receive <span class="block-input">ResetLevel ▾</span></div>
              <div class="scratch-block variable">set <span class="block-input">Skor ▾</span> to <span class="block-input">0</span></div>
              <div class="scratch-block looks">switch backdrop to <span class="block-input">MenuUtama ▾</span></div>
            """,
            "bug_wrong": "Sprite disembunyikan (hide) saat Game Over tetapi tidak diberi balok show saat bendera hijau diklik kembali.",
            "bug_right": "Pasang balok show dan go to x/y awal tepat di bawah when green flag clicked pada setiap sprite utama ✅",
            "portal_title": "Debugging Jam Bersama",
            "portal_desc": "Melatih ketelitian analisa logika melalui sesi uji silang (peer playtesting) untuk menemukan dan memperbaiki bug.",
            "portal_tags": ["Debugging Jam", "QA Testing", "Peer Review"]
        },
        45: {
            "title": "Polishing Game: Menu Pembuka, Tombol Play & Kredit Pembuat",
            "subtitle": "Menyulap Proyek Menjadi Game Profesional dengan Layar Judul Interaktif, Efek Hover Tombol, dan Layar Kredit",
            "badge": "Sesi 45 • Title Screen & Polish",
            "hero_img": "beeby-title-screen.jpg",
            "src_artifact": "beeby_highscore_3d_1791853334064.jpg",
            "icon": "🎬",
            "mechanic_badge": "Interactive UI Button & Scene State Flow",
            "sim_label": "Simulator Menu Utama & Tombol Play",
            "sim_action_btn": "🎬 Klik Tombol PLAY",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block looks">
                switch backdrop to <span class="block-input">LayarJudul ▾</span>
              </div>
              <div class="scratch-block looks">
                show
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-sensing">touching <span class="block-input">mouse-pointer ▾</span> ?</span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block looks">set size to <span class="block-input">115</span> %</div>
                    </div>
                  </div>
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-operator">not <span class="scratch-inline-sensing">touching <span class="block-input">mouse-pointer ▾</span> ?</span></span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block looks">set size to <span class="block-input">100</span> %</div>
                    </div>
                  </div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when this sprite clicked</div>
              <div class="scratch-block sound">start sound <span class="block-input">ClickStart ▾</span></div>
              <div class="scratch-block looks">hide</div>
              <div class="scratch-block event" style="background:#ffab19; color:#fff;">broadcast <span class="block-input">MulaiGameUtama ▾</span></div>
            """,
            "bug_wrong": "Tombol Play tetap muncul di tengah layar saat permainan sudah dimulai karena lupa diberi balok hide.",
            "bug_right": "Sembunyikan tombol Play dengan balok hide tepat sebelum menyiarkan broadcast MulaiGameUtama ✅",
            "portal_title": "Menu Pembuka & Kredit Pembuat",
            "portal_desc": "Menambahkan halaman judul profesional, animasi pembesaran tombol Play saat disentuh mouse, dan layar kredit tim.",
            "portal_tags": ["UI/UX Game", "Title Screen", "Game Polish"]
        },
        46: {
            "title": "Latihan Presentasi & Public Speaking Cilik",
            "subtitle": "Menguasai Teknik Pitching Karya 3 Menit: Perkenalan Tim, Demo Fitur Unggulan, dan Cerita Tantangan Koding",
            "badge": "Sesi 46 • Pitching & Public Speaking",
            "hero_img": "beeby-public-speaking.jpg",
            "src_artifact": "beeby_ai_hero_3d_1791794346862.jpg",
            "icon": "🎙️",
            "mechanic_badge": "3-Step Demo Pitching & Demo Mode Hotkey",
            "sim_label": "Timer Latihan Presentasi Panggung",
            "sim_action_btn": "🎙️ Mulai Simulasi Pitching",
            "block3_html": """
              <div class="scratch-block event">
                when <span class="block-input">1 ▾</span> key pressed
              </div>
              <div class="scratch-block event" style="background:#ffab19; color:#fff;">
                broadcast <span class="block-input">DemoZona1 ▾</span>
              </div>
              <div class="scratch-block looks">
                say <span class="block-input">"Ini adalah Desa Bunga tempat petualangan dimulai!"</span> for <span class="block-input">3</span> secs
              </div>
            """,
            "block4_html": """
              <div class="scratch-block event">
                when <span class="block-input">2 ▾</span> key pressed
              </div>
              <div class="scratch-block event" style="background:#ffab19; color:#fff;">
                broadcast <span class="block-input">DemoBossLangsung ▾</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">BossHP ▾</span> to <span class="block-input">5</span>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when <span class="block-input">3 ▾</span> key pressed</div>
              <div class="scratch-block looks">switch backdrop to <span class="block-input">KreditTimKreator ▾</span></div>
              <div class="scratch-block sound">play sound <span class="block-input">Applause ▾</span> until done</div>
            """,
            "bug_wrong": "Saat demo di depan juri, waktu habis karena harus bermain terlalu lama dari level 1 untuk menunjukkan Boss di akhir.",
            "bug_right": "Pasang tombol pintas (Shortcut Key 1, 2, 3) khusus Mode Presentasi untuk melompat langsung ke fitur unggulan ✅",
            "portal_title": "Latihan Public Speaking Cilik",
            "portal_desc": "Melatih rasa percaya diri berbicara di depan publik dengan struktur pitching 3 menit dan tombol pintas demo.",
            "portal_tags": ["Public Speaking", "Demo Pitching", "Presentation"]
        },
        47: {
            "title": "Final Rehearsal & Uji Coba Playtest Bersama Orang Tua",
            "subtitle": "Gladi Bersih Pameran Akbar: Simulasi Stand Pameran, Pengujian Kestabilan Penuh, dan Feedback Pengunjung",
            "badge": "Sesi 47 • Final Rehearsal",
            "hero_img": "beeby-rehearsal.jpg",
            "src_artifact": "beeby_powerups_3d_1791853394102.jpg",
            "icon": "🎪",
            "mechanic_badge": "Exhibition Stand Readiness & Auto-Reset",
            "sim_label": "Checklist Kesiapan Stand Expo",
            "sim_action_btn": "✅ Cek Kesiapan Pameran",
            "block3_html": """
              <div class="scratch-block event">
                when <span class="block-input">r ▾</span> key pressed
              </div>
              <div class="scratch-block event" style="background:#ffab19; color:#fff;">
                broadcast <span class="block-input">ResetPameran ▾</span>
              </div>
              <div class="scratch-block sound">
                stop all sounds
              </div>
            """,
            "block4_html": """
              <div class="scratch-block event">
                when I receive <span class="block-input">ResetPameran ▾</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">Skor ▾</span> to <span class="block-input">0</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">Nyawa ▾</span> to <span class="block-input">3</span>
              </div>
              <div class="scratch-block looks">
                switch backdrop to <span class="block-input">LayarJudul ▾</span>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when I receive <span class="block-input">PengunjungMenang ▾</span></div>
              <div class="scratch-block variable">change <span class="block-input">TotalPengunjungMain ▾</span> by <span class="block-input">1</span></div>
              <div class="scratch-block looks">say <span class="block-input">"Terima kasih sudah bermain di stand kami! 🌟"</span> for <span class="block-input">3</span> secs</div>
            """,
            "bug_wrong": "Setelah satu pengunjung selesai bermain di pameran, game berhenti di layar Game Over dan pengunjung berikutnya bingung cara memulai ulang.",
            "bug_right": "Sediakan tombol cepat Reset (misalnya tombol R atau tombol Mulai Lagi di layar) agar pengunjung baru langsung bisa bermain ✅",
            "portal_title": "Rehearsal Bersama Orang Tua",
            "portal_desc": "Gladi bersih pameran akbar bersama orang tua, fitur auto-reset pengunjung pameran, dan finalisasi performa.",
            "portal_tags": ["Final Rehearsal", "Playtest", "Expo Prep"]
        },
        48: {
            "title": "Grand Capstone Tahun Ke-1: Junior Coding Expo (48 Sesi)",
            "subtitle": "Pameran Portofolio Akbar 48 Sesi di Depan Orang Tua & Penganugerahan Gelar Junior Explorer Annual Graduate!",
            "badge": "Sesi 48 • Grand Expo & Graduation",
            "hero_img": "beeby-annual-graduation.jpg",
            "src_artifact": "beeby_graduation_3d_1791794586510.jpg",
            "icon": "🎓",
            "mechanic_badge": "Annual Portfolio Showcase & Year 1 Graduation",
            "sim_label": "Panggung Wisuda Tahun Ke-1 (48 Sesi)",
            "sim_action_btn": "🎓 Rayakan Wisuda Tahun 1!",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">TotalSesiTuntas ▾</span> to <span class="block-input">48</span>
              </div>
              <div class="scratch-block looks">
                switch backdrop to <span class="block-input">PanggungWisudaAkbar ▾</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">TotalSesiTuntas</span> = <span class="block-input">48</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block variable">set <span class="block-input">GelarTahunan ▾</span> to <span class="block-input">"Junior Explorer Graduate"</span></div>
                  <div class="scratch-block sound">play sound <span class="block-input">GraduationMarch ▾</span> until done</div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when this sprite clicked</div>
              <div class="scratch-block event" style="background:#ffab19; color:#fff;">broadcast <span class="block-input">LuncurkanKonfetiEmas ▾</span></div>
              <div class="scratch-block looks">say <span class="block-input">"Aku Lulus Tahun 1 Beekoding Academy! 🏆🐝"</span> for <span class="block-input">4</span> secs</div>
            """,
            "bug_wrong": "Lupa mendokumentasikan foto karya dan menyimpan salinan file .sb3 cadangan untuk portofolio kelulusan.",
            "bug_right": "Simpan file utama & cadangan (.sb3) serta abadikan momen presentasi di panggung Junior Coding Expo ✅",
            "portal_title": "Capstone 4: Junior Coding Expo",
            "portal_desc": "Pameran akbar portofolio 48 sesi (Tahun 1 Penuh) dan wisuda penganugerahan Junior Explorer Annual Graduate.",
            "portal_tags": ["Grand Expo", "Wisuda 48 Sesi", "Annual Graduate"]
        }
    }
