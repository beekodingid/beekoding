# Comprehensive blueprint for Stage 3 sessions (Sesi 25 to 36)
# Theme: Sensory & Physical Computing (Micro:bit, Makey Makey, Sensors & Smart Gadgets)

def get_stage3_configs():
    return {
        25: {
            "title": "Mengenal Dunia Fisik & Mikrokontroler (Micro:bit & Makey Makey)",
            "subtitle": "Menghubungkan Koding Layar ke Dunia Nyata melalui Papan Sirkuit Pintar & Koneksi Bluetooth",
            "badge": "Sesi 25 • Physical Computing",
            "hero_img": "beeby-microbit.jpg",
            "src_artifact": "beeby_microbit_s25_1791855807133.jpg",
            "icon": "🔌",
            "mechanic_badge": "Bluetooth Link & Microcontroller I/O",
            "sim_label": "Koneksi Bluetooth Micro:bit",
            "sim_action_btn": "📡 Hubungkan Bluetooth",
            "block3_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                📟 when micro:bit connected
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">StatusAlat ▾</span> to <span class="block-input">"Terhubung!"</span>
              </div>
              <div class="scratch-block looks">
                say <span class="block-input">"Halo Dunia Fisik! 🐝"</span> for <span class="block-input">2</span> seconds
              </div>
              <div class="scratch-block sound">
                start sound <span class="block-input">ConnectBeep ▾</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-sensing" style="background:#0fbd8c;">pin <span class="block-input">0 ▾</span> connected?</span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block looks">change <span class="block-input">brightness ▾</span> effect by <span class="block-input">25</span></div>
                      <div class="scratch-block sound">play sound <span class="block-input">Sparkle ▾</span> until done</div>
                    </div>
                  </div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when I receive <span class="block-input">SinyalHardware ▾</span></div>
              <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">📟 display text <span class="block-input">"READY!"</span></div>
              <div class="scratch-block motion">glide <span class="block-input">1</span> secs to x: <span class="block-input">0</span> y: <span class="block-input">50</span></div>
            """,
            "bug_wrong": "Menjalankan balok micro:bit tanpa menyalakan Scratch Link & Bluetooth di laptop.",
            "bug_right": "Pastikan aplikasi Scratch Link aktif & lampu indikator Bluetooth Micro:bit menyala stabil ✅",
            "portal_title": "Dunia Fisik & Mikrokontroler",
            "portal_desc": "Pengenalan papan sirkuit pintar Micro:bit & Makey Makey serta cara menghubungkan hardware ke Scratch via Bluetooth.",
            "portal_tags": ["Physical Computing", "Micro:bit", "Bluetooth I/O"]
        },
        26: {
            "title": "Menampilkan Animasi LED Matriks 5x5 & Senyum Digital",
            "subtitle": "Menyalakan 25 Lampu LED Merah pada Papan Micro:bit Menjadi Ikon Hati Berdetak & Emotikon",
            "badge": "Sesi 26 • LED Matrix 5x5",
            "hero_img": "beeby-led-matrix.jpg",
            "src_artifact": "beeby_led_s26_1791855819211.jpg",
            "icon": "💡",
            "mechanic_badge": "5x5 LED Pixel Grid & Frame Animation",
            "sim_label": "Simulator Layar LED 5x5",
            "sim_action_btn": "❤️ Nyalakan Pola LED",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">
                    📟 display <span class="block-input">❤️ Heart ▾</span>
                  </div>
                  <div class="scratch-block control">
                    wait <span class="block-input">0.4</span> seconds
                  </div>
                  <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">
                    📟 display <span class="block-input">💗 Small Heart ▾</span>
                  </div>
                  <div class="scratch-block control">
                    wait <span class="block-input">0.4</span> seconds
                  </div>
                </div>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">Skor</span> &gt; <span class="block-input">10</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">📟 display <span class="block-input">😊 Happy Smile ▾</span></div>
                  <div class="scratch-block sound">start sound <span class="block-input">Cheer ▾</span></div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when <span class="block-input">space ▾</span> key pressed</div>
              <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">📟 clear display</div>
              <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">📟 display text <span class="block-input">"BEEKODING"</span></div>
            """,
            "bug_wrong": "Mengganti gambar LED 1 dan LED 2 di dalam forever tanpa balok wait (mata tidak sempat melihat kedipan).",
            "bug_right": "Sisipkan wait 0.4 seconds di antara dua balok display LED agar animasi detak jantung terlihat jelas ✅",
            "portal_title": "Animasi LED Matriks 5x5",
            "portal_desc": "Memprogram koordinat matriks lampu LED 5x5 untuk menampilkan animasi detak jantung, senyum digital, dan teks berjalan.",
            "portal_tags": ["LED Matrix 5x5", "Pixel Animation", "Visual Output"]
        },
        27: {
            "title": "Tombol Fisik A dan B (Input Tombol Hardware)",
            "subtitle": "Mengendalikan Gerakan Karakter Beeby di Layar Menggunakan Saklar Taktil A & B pada Papan Fisik",
            "badge": "Sesi 27 • Tombol Fisik A & B",
            "hero_img": "beeby-buttons-ab.jpg",
            "src_artifact": "beeby_buttons_s27_1791855831193.jpg",
            "icon": "🔘",
            "mechanic_badge": "Hardware Tactile Input -> Screen Output",
            "sim_label": "Tester Saklar Fisik A & B",
            "sim_action_btn": "🔘 Tekan Tombol A / B",
            "block3_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                📟 when <span class="block-input">A ▾</span> button pressed
              </div>
              <div class="scratch-block motion">
                change x by <span class="block-input">-25</span>
              </div>
              <div class="scratch-block looks">
                switch costume to <span class="block-input">Beeby-Kiri ▾</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                📟 when <span class="block-input">B ▾</span> button pressed
              </div>
              <div class="scratch-block motion">
                change x by <span class="block-input">25</span>
              </div>
              <div class="scratch-block looks">
                switch costume to <span class="block-input">Beeby-Kanan ▾</span>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-sensing" style="background:#0fbd8c;">button <span class="block-input">any ▾</span> pressed?</span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block sound">start sound <span class="block-input">LaserPew ▾</span></div>
                  <div class="scratch-block control">create clone of <span class="block-input">PeluruMadu ▾</span></div>
                </div>
              </div>
            """,
            "bug_wrong": "Tombol A dan Tombol B sama-sama diisi change x by 25 positif sehingga karakter hanya bisa jalan ke kanan.",
            "bug_right": "Tombol A menggunakan nilai negatif (-25) untuk ke kiri, dan Tombol B positif (+25) untuk ke kanan ✅",
            "portal_title": "Tombol Fisik A dan B",
            "portal_desc": "Menghubungkan input saklar fisik tombol A dan B pada papan mikrokontroler untuk menggerakkan pesawat dan karakter di layar.",
            "portal_tags": ["Hardware Input", "Button A/B", "Event Trigger"]
        },
        28: {
            "title": "Sensor Goyang (Accelerometer) & Game Dadu Ajaib",
            "subtitle": "Mendeteksi Getaran dan Goyangan Tangan (Shake Gesture) untuk Mengocok Dadu Digital 1–6",
            "badge": "Sesi 28 • Accelerometer Sensor",
            "hero_img": "beeby-accelerometer.jpg",
            "src_artifact": "beeby_game_juice_3d_1791794753687.jpg",
            "icon": "🎲",
            "mechanic_badge": "Accelerometer Shake & Random Number",
            "sim_label": "Simulator Kocok Dadu Sensor",
            "sim_action_btn": "🎲 Guncang Micro:bit!",
            "block3_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                📟 when <span class="block-input">shaken ▾</span>
              </div>
              <div class="scratch-block sound">
                start sound <span class="block-input">DiceRoll ▾</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">AngkaDadu ▾</span> to <span class="scratch-inline-operator">pick random <span class="block-input">1</span> to <span class="block-input">6</span></span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">
                📟 display text <span class="scratch-inline-variable">AngkaDadu</span>
              </div>
              <div class="scratch-block looks">
                switch costume to <span class="scratch-inline-variable">AngkaDadu</span>
              </div>
              <div class="scratch-block looks">
                say <span class="scratch-inline-operator">join <span class="block-input">"Dadu keluar: "</span> <span class="scratch-inline-variable">AngkaDadu</span></span> for <span class="block-input">2</span> secs
              </div>
            """,
            "block5_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">AngkaDadu</span> = <span class="block-input">6</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block event" style="background:#ffab19; color:#fff;">broadcast <span class="block-input">JackpotEnam ▾</span></div>
                  <div class="scratch-block sound">play sound <span class="block-input">TadaFanfare ▾</span> until done</div>
                </div>
              </div>
            """,
            "bug_wrong": "Menulis teks '1 to 6' secara manual di dalam set variabel tanpa memakai balok hijau pick random.",
            "bug_right": "Gunakan balok operator hijau pick random (1) to (6) agar angka dadu benar-benar teracak setiap digoyang ✅",
            "portal_title": "Sensor Goyang Accelerometer",
            "portal_desc": "Memanfaatkan sensor percepatan (accelerometer) untuk mendeteksi guncangan tangan dan mengocok dadu digital acak 1–6.",
            "portal_tags": ["Accelerometer", "Shake Gesture", "Random Logic"]
        },
        29: {
            "title": "Kompas Digital & Sensor Kemiringan (Tilt Angle)",
            "subtitle": "Menavigasi Lebah Penjelajah Menggunakan Kemiringan Papan (Tilt Front, Back, Left, Right) & Arah Mata Angin",
            "badge": "Sesi 29 • Digital Compass & Tilt",
            "hero_img": "beeby-compass.jpg",
            "src_artifact": "beeby_maze_3d_1791791516285.jpg",
            "icon": "🧭",
            "mechanic_badge": "Gyroscope Tilt Angle & Compass Heading",
            "sim_label": "Simulator Kemiringan & Kompas",
            "sim_action_btn": "🧭 Putar Arah Kompas",
            "block3_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                📟 when tilted <span class="block-input">left ▾</span>
              </div>
              <div class="scratch-block motion">
                point in direction <span class="block-input">-90</span>
              </div>
              <div class="scratch-block motion">
                change x by <span class="scratch-inline-sensing" style="background:#0fbd8c;">tilt angle <span class="block-input">left ▾</span></span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-sensing" style="background:#0fbd8c;">tilted <span class="block-input">front ▾</span> ?</span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block motion">change y by <span class="block-input">6</span></div>
                    </div>
                  </div>
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-sensing" style="background:#0fbd8c;">tilted <span class="block-input">back ▾</span> ?</span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block motion">change y by <span class="block-input">-6</span></div>
                    </div>
                  </div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block variable">set <span class="block-input">ArahMataAngin ▾</span> to <span class="scratch-inline-sensing">direction</span></div>
              <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">📟 display text <span class="block-input">"U - T - S - B"</span></div>
            """,
            "bug_wrong": "Membalik arah miring depan (front) dengan miring belakang (back) sehingga kendali terasa terbalik.",
            "bug_right": "Kalibrasi arah: miring depan menambah Y (+6 ke atas), miring belakang mengurangi Y (-6 ke bawah) ✅",
            "portal_title": "Kompas Digital Magnetik",
            "portal_desc": "Membaca sudut kemiringan (tilt sensor) dan kompas magnetik untuk mengemudikan Beeby menjelajahi peta pulau.",
            "portal_tags": ["Digital Compass", "Tilt Sensor", "Navigation"]
        },
        30: {
            "title": "Sensor Suara Mikrofon & Game Lompat Tepukan",
            "subtitle": "Mengukur Desibel Suara Ruangan (Loudness Sensor) agar Beeby Melompat Saat Siswa Bertepuk Tangan!",
            "badge": "Sesi 30 • Microphone Sensor",
            "hero_img": "beeby-sound-sensor.jpg",
            "src_artifact": "beeby_tts_3d_1791794311391.jpg",
            "icon": "🎙️",
            "mechanic_badge": "Microphone Loudness & Threshold Trigger",
            "sim_label": "Simulator Sensor Desibel Suara",
            "sim_action_btn": "👏 Tepuk Tangan (Clap!)",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block variable">
                    set <span class="block-input">VolumeSuara ▾</span> to <span class="scratch-inline-sensing">loudness</span>
                  </div>
                </div>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-sensing">loudness</span> &gt; <span class="block-input">45</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block sound">start sound <span class="block-input">BoingJump ▾</span></div>
                  <div class="scratch-block motion">change y by <span class="block-input">80</span></div>
                  <div class="scratch-block control">wait <span class="block-input">0.3</span> seconds</div>
                  <div class="scratch-block motion">change y by <span class="block-input">-80</span></div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when <span class="block-input">loudness ▾</span> &gt; <span class="block-input">60</span></div>
              <div class="scratch-block looks">say <span class="block-input">"Wah suaramu lantang sekali! 🎤"</span> for <span class="block-input">1</span> seconds</div>
              <div class="scratch-block variable">change <span class="block-input">SkorLompat ▾</span> by <span class="block-input">1</span></div>
            """,
            "bug_wrong": "Mengatur batas angka loudness > 5 terlalu kecil sehingga suara napas atau bisikan membuat karakter melompat terus.",
            "bug_right": "Gunakan ambang batas (threshold) loudness > 45 agar hanya tepukan tangan nyata yang memicu lompatan ✅",
            "portal_title": "Sensor Suara Mikrofon",
            "portal_desc": "Mendeteksi gelombang desibel suara tepukan tangan melalui mikrofon untuk memicu lompatan karakter tanpa menyentuh keyboard.",
            "portal_tags": ["Loudness Sensor", "Voice Trigger", "Audio Physics"]
        },
        31: {
            "title": "Instrumen Musik Pisang Ajaib (Makey Makey Piano)",
            "subtitle": "Eksperimen Sains Konduktivitas Listrik Buah Pisang & Playdough untuk Memainkan Tangga Nada Do-Re-Mi",
            "badge": "Sesi 31 • Makey Makey Piano",
            "hero_img": "beeby-banana-piano.jpg",
            "src_artifact": "beeby_sounds_3d_1791793616098.jpg",
            "icon": "🍌",
            "mechanic_badge": "Electrical Conductivity & MIDI Notes",
            "sim_label": "Simulator Piano Pisang Do-Re-Mi",
            "sim_action_btn": "🎹 Sentuh Pisang Nada",
            "block3_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                🍌 when <span class="block-input">up arrow ▾</span> key pressed
              </div>
              <div class="scratch-block sound" style="background:#0fbd8c; color:#fff;">
                🎵 play note <span class="block-input">60 (C - Do)</span> for <span class="block-input">0.5</span> beats
              </div>
              <div class="scratch-block looks">
                change <span class="block-input">color ▾</span> effect by <span class="block-input">25</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                🍌 when <span class="block-input">down arrow ▾</span> key pressed
              </div>
              <div class="scratch-block sound" style="background:#0fbd8c; color:#fff;">
                🎵 play note <span class="block-input">62 (D - Re)</span> for <span class="block-input">0.5</span> beats
              </div>
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                🍌 when <span class="block-input">left arrow ▾</span> key pressed
              </div>
              <div class="scratch-block sound" style="background:#0fbd8c; color:#fff;">
                🎵 play note <span class="block-input">64 (E - Mi)</span> for <span class="block-input">0.5</span> beats
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">🍌 when <span class="block-input">left up right ▾</span> pressed in order</div>
              <div class="scratch-block sound">play sound <span class="block-input">ComboMelody ▾</span> until done</div>
              <div class="scratch-block variable">change <span class="block-input">SkorMusik ▾</span> by <span class="block-input">10</span></div>
            """,
            "bug_wrong": "Melepas kabel Ground (Earth) di tangan sehingga arus sirkuit tertutup tidak terbentuk saat menyentuh pisang.",
            "bug_right": "Pegang penjepit buaya Ground (Earth) di satu tangan saat jari tangan lain menyentuh buah pisang ✅",
            "portal_title": "Piano Pisang Makey Makey",
            "portal_desc": "Merakit sirkuit konduktif menggunakan buah pisang asli dan Makey Makey untuk memainkan instrumen musik digital Do-Re-Mi.",
            "portal_tags": ["Makey Makey", "Conductivity", "MIDI Piano"]
        },
        32: {
            "title": "Sensor Suhu & Alarm Termometer Pintar",
            "subtitle": "Membangun Stasiun Cuaca Cilik: Deteksi Suhu Ruangan (°C) dan Sirine Peringatan Cuaca Panas",
            "badge": "Sesi 32 • Smart Thermometer",
            "hero_img": "beeby-thermometer.jpg",
            "src_artifact": "beeby_led_s26_1791855819211.jpg",
            "icon": "🌡️",
            "mechanic_badge": "Temperature Sensor & Threshold Alarm",
            "sim_label": "Simulator Sensor Suhu (°C)",
            "sim_action_btn": "🌡️ Naikkan Suhu +2°C",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">SuhuRuangan ▾</span> to <span class="block-input">26</span>
              </div>
              <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">
                📟 display text <span class="scratch-inline-operator">join <span class="scratch-inline-variable">SuhuRuangan</span> <span class="block-input">"C"</span></span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">SuhuRuangan</span> &gt; <span class="block-input">30</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block looks">switch backdrop to <span class="block-input">SiagaPanas ▾</span></div>
                  <div class="scratch-block sound">start sound <span class="block-input">SirenAlarm ▾</span></div>
                  <div class="scratch-block looks">say <span class="block-input">"⚠️ Suhu Panas! Nyalakan Kipas!"</span></div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">SuhuRuangan</span> &lt; <span class="block-input">28</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block looks">switch backdrop to <span class="block-input">TamanSejuk ▾</span></div>
                  <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">📟 display <span class="block-input">😊 Sejuk ▾</span></div>
                </div>
              </div>
            """,
            "bug_wrong": "Menggunakan tanda (<) kurang dari 30 untuk alarm panas, sehingga alarm justru berbunyi saat ruangan dingin.",
            "bug_right": "Gunakan operator lebih besar (SuhuRuangan > 30) untuk mendeteksi kondisi panas dengan tepat ✅",
            "portal_title": "Termometer Alarm Pintar",
            "portal_desc": "Membuat sistem pemantau suhu ruangan otomatis yang menyalakan alarm sirine dan kipas virtual saat suhu melewati 30°C.",
            "portal_tags": ["Temperature Sensor", "Smart Alarm", "IoT Cilik"]
        },
        33: {
            "title": "Jam Tangan Pintar Penghitung Langkah (Smart Pedometer)",
            "subtitle": "Merancang Smartwatch Olahraga Cilik untuk Menghitung Langkah Kaki, Kalori, dan Target Harian",
            "badge": "Sesi 33 • Smart Pedometer",
            "hero_img": "beeby-pedometer.jpg",
            "src_artifact": "beeby_timer_3d_1791794788628.jpg",
            "icon": "⌚",
            "mechanic_badge": "Step Counter Algorithm & Fitness Goal",
            "sim_label": "Simulator Smartwatch Pedometer",
            "sim_action_btn": "👟 Ayunkan Langkah (+1)",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">JumlahLangkah ▾</span> to <span class="block-input">0</span>
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">TargetSehat ▾</span> to <span class="block-input">20</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                📟 when <span class="block-input">shaken ▾</span>
              </div>
              <div class="scratch-block variable">
                change <span class="block-input">JumlahLangkah ▾</span> by <span class="block-input">1</span>
              </div>
              <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">
                📟 display text <span class="scratch-inline-variable">JumlahLangkah</span>
              </div>
              <div class="scratch-block motion">
                move <span class="block-input">10</span> steps
              </div>
            """,
            "block5_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-operator"><span class="scratch-inline-variable">JumlahLangkah</span> = <span class="scratch-inline-variable">TargetSehat</span></span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block event" style="background:#ffab19; color:#fff;">broadcast <span class="block-input">TargetTercapai ▾</span></div>
                  <div class="scratch-block sound">play sound <span class="block-input">VictoryMedal ▾</span> until done</div>
                </div>
              </div>
            """,
            "bug_wrong": "Lupa mereset JumlahLangkah ke 0 saat bendera hijau diklik sehingga langkah dari sesi olahraga kemarin ikut terhitung.",
            "bug_right": "Selalu pasang set JumlahLangkah to 0 di bawah when green flag clicked sebagai inisialisasi awal ✅",
            "portal_title": "Smart Pedometer Cilik",
            "portal_desc": "Memprogram jam tangan pintar penghitung langkah kaki (Smart Pedometer) lengkap dengan indikator medali target olahraga.",
            "portal_tags": ["Smartwatch", "Step Counter", "Wearable Tech"]
        },
        34: {
            "title": "Game Controller Fisik Buatan Sendiri (DIY Cardboard Gamepad)",
            "subtitle": "Merakit Stik Konsol Game dari Kardus & Aluminium Foil untuk Mengendalikan Game Arkade Beeby",
            "badge": "Sesi 34 • DIY Cardboard Gamepad",
            "hero_img": "beeby-cardboard-pad.jpg",
            "src_artifact": "beeby_buttons_s27_1791855831193.jpg",
            "icon": "🕹️",
            "mechanic_badge": "Custom Hardware Controller & Foil Switch",
            "sim_label": "Tester Stik Kardus Konduktif",
            "sim_action_btn": "🕹️ Uji Tombol Foil",
            "block3_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                🕹️ when <span class="block-input">left arrow ▾</span> key pressed
              </div>
              <div class="scratch-block motion">
                change x by <span class="block-input">-20</span>
              </div>
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                🕹️ when <span class="block-input">right arrow ▾</span> key pressed
              </div>
              <div class="scratch-block motion">
                change x by <span class="block-input">20</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                🕹️ when <span class="block-input">space ▾</span> key pressed
              </div>
              <div class="scratch-block sound">
                start sound <span class="block-input">TurboBoost ▾</span>
              </div>
              <div class="scratch-block looks">
                change <span class="block-input">size</span> by <span class="block-input">15</span>
              </div>
              <div class="scratch-block control">
                wait <span class="block-input">0.2</span> seconds
              </div>
              <div class="scratch-block looks">
                change <span class="block-input">size</span> by <span class="block-input">-15</span>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block-c">
                if <span class="scratch-inline-sensing">touching <span class="block-input">BintangEmas ▾</span> ?</span> then
                <div class="scratch-c-indent">
                  <div class="scratch-block variable">change <span class="block-input">SkorGamepad ▾</span> by <span class="block-input">5</span></div>
                  <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">📟 display <span class="block-input">⭐ Star ▾</span></div>
                </div>
              </div>
            """,
            "bug_wrong": "Aluminium foil antara tombol Kiri dan Kanan saling bersentuhan di kardus sehingga terjadi korsleting sinyal (short circuit).",
            "bug_right": "Beri jarak minimal 2 cm antar jalur aluminium foil dan lapisi pemisah selotip isolator dengan rapi ✅",
            "portal_title": "DIY Cardboard Gamepad",
            "portal_desc": "Rekayasa kreatif membuat konsol gamepad fisik dari kardus dan saklar aluminium foil untuk bermain game Scratch.",
            "portal_tags": ["DIY Gamepad", "Maker Engineering", "Circuit Design"]
        },
        35: {
            "title": "Integrasi Proyek Hardware-Software Interaktif",
            "subtitle": "Menggabungkan Sensor Gerak, Tombol Fisik, dan Layar LED dengan Game Arkade Layar Lebar",
            "badge": "Sesi 35 • Hardware-Software Sync",
            "hero_img": "beeby-hw-integration.jpg",
            "src_artifact": "beeby_microbit_s25_1791855807133.jpg",
            "icon": "⚙️",
            "mechanic_badge": "Full-Duplex Sensor & Game Calibration",
            "sim_label": "Simulator Kalibrasi Multi-Sensor",
            "sim_action_btn": "⚙️ Sinkronisasi Sensor",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block variable">
                set <span class="block-input">SensitivitasSensor ▾</span> to <span class="block-input">15</span>
              </div>
              <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">
                📟 display <span class="block-input">✅ Checkmark ▾</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block-c">
                forever
                <div class="scratch-c-indent">
                  <div class="scratch-block motion">
                    set x to <span class="scratch-inline-operator"><span class="scratch-inline-sensing" style="background:#0fbd8c;">tilt angle <span class="block-input">right ▾</span></span> * <span class="block-input">4</span></span>
                  </div>
                  <div class="scratch-block-c">
                    if <span class="scratch-inline-sensing" style="background:#0fbd8c;">button <span class="block-input">A ▾</span> pressed?</span> then
                    <div class="scratch-c-indent">
                      <div class="scratch-block event" style="background:#ffab19; color:#fff;">broadcast <span class="block-input">TembakPerisai ▾</span></div>
                    </div>
                  </div>
                </div>
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when I receive <span class="block-input">SkorBertambah ▾</span></div>
              <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">📟 display <span class="block-input">❤️ Heart ▾</span></div>
              <div class="scratch-block sound">start sound <span class="block-input">PowerSync ▾</span></div>
            """,
            "bug_wrong": "Gerakan kemiringan terlalu lambat karena nilai tilt angle langsung dimasukkan ke posisi X tanpa pengali.",
            "bug_right": "Kalikan nilai tilt angle dengan faktor pengali (* 4) agar gerakan mangkuk di layar cepat dan responsif ✅",
            "portal_title": "Integrasi Hardware-Software",
            "portal_desc": "Menyatukan input multi-sensor fisik dengan respons visual dan audio game secara real-time serta kalibrasi sensitivitas.",
            "portal_tags": ["System Integration", "Sensor Calibration", "Real-Time Sync"]
        },
        36: {
            "title": "Capstone Stage 3: Pameran Gadget Cilik & Showcase Hardware",
            "subtitle": "Presentasi Karya Alat Sensor Interaktif di Depan Orang Tua & Sertifikasi Junior Hardware Creator Level 3",
            "badge": "Sesi 36 • Gadget Expo & Wisuda",
            "hero_img": "beeby-gadget-expo.jpg",
            "src_artifact": "beeby_grad2_3d_1791853503052.jpg",
            "icon": "🏆",
            "mechanic_badge": "Hardware Expo Pitching & Level 3 Graduation",
            "sim_label": "Generator Sertifikat Level 3",
            "sim_action_btn": "🎓 Terbitkan Sertifikat!",
            "block3_html": """
              <div class="scratch-block event">
                when 🏴 clicked
              </div>
              <div class="scratch-block looks">
                switch backdrop to <span class="block-input">PanggungExpoLevel3 ▾</span>
              </div>
              <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">
                📟 display text <span class="block-input">"EXPO 2026!"</span>
              </div>
            """,
            "block4_html": """
              <div class="scratch-block event" style="background:#0fbd8c; color:#fff;">
                📟 when <span class="block-input">any ▾</span> button pressed
              </div>
              <div class="scratch-block sound">
                play sound <span class="block-input">GrandFanfare ▾</span> until done
              </div>
              <div class="scratch-block looks">
                say <span class="block-input">"Selamat Datang di Gadget Expo Cilik! 🚀"</span> for <span class="block-input">3</span> secs
              </div>
            """,
            "block5_html": """
              <div class="scratch-block event">when I receive <span class="block-input">LulusStage3 ▾</span></div>
              <div class="scratch-block variable">set <span class="block-input">GelarSiswa ▾</span> to <span class="block-input">"Junior Hardware Creator"</span></div>
              <div class="scratch-block control" style="background:#0fbd8c; color:#fff;">📟 display <span class="block-input">🏆 Trophy ▾</span></div>
            """,
            "bug_wrong": "Baterai atau kabel USB micro:bit longgar saat sedang didemokan di panggung pameran.",
            "bug_right": "Lakukan pengecekan checklist hardware 5 menit sebelum presentasi: kabel kencang, Bluetooth aktif, suara jernih ✅",
            "portal_title": "Capstone 3: Gadget Expo Cilik",
            "portal_desc": "Pameran akbar karya gadget sensor dan controller interaktif buatan siswa serta penganugerahan Sertifikat Level 3.",
            "portal_tags": ["Gadget Expo", "Wisuda Level 3", "Hardware Showcase"]
        }
    }
