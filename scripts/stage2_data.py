# Data Kurikulum Lengkap STAGE 2: SESI 13 s/d SESI 24
# Beekoding Academy - Level 2 Game Mechanics & Logika Dinamis

STAGE2_SESSIONS = {
    13: {
        "num": 13,
        "title": "Game Tangkap Buah Apel Jatuh (Koordinat X dan Y)",
        "subtitle": "Memahami Sumbu X-Y, Gravitasi Jatuh ke Bawah, dan Kontrol Mangkuk Mengikuti Mouse",
        "badge": "Sesi 13 • Game Mechanics Level 2",
        "icon": "🍎",
        "slides": [
            {
                "title": "Misi Arkade Baru: <span>Game Tangkap Apel Jatuh</span>! 🍎",
                "badge": "Pengantar & Goal Sesi 13",
                "time": "⏱️ Menit ke 00–10",
                "text": "Selamat datang di <strong>Stage 2 (Level 2)</strong>! Hari ini kita memulai petualangan baru: merakit game arkade seru di mana buah apel lezat berjatuhan dari langit dan kita harus menangkapnya menggunakan mangkuk ajaib!",
                "points": [
                    "🎯 Memahami arah pergerakan layar komputer (Sumbu X & Y)",
                    "🍎 Membuat apel jatuh terus-menerus dengan gravitasi",
                    "🥣 Menggerakkan mangkuk penangkap seirama kursor mouse",
                    "✨ Menangkap apel dan mendengar efek suara 'Chomp!'"
                ],
                "visual_html": """
                <div style="background: rgba(15, 23, 42, 0.85); border: 2px solid #334155; border-radius: 16px; padding: 24px; text-align: center; width: 100%;">
                    <div style="font-size: 56px; margin-bottom: 12px;">🍎 🥣</div>
                    <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Target Proyek Hari Ini</h3>
                    <p style="color: #cbd5e1; font-size: 14px; line-height: 1.5;">Game tangkap apel mandiri: apel jatuh dari langit secara acak, mangkuk dikontrol kursor, dan menghasilkan skor!</p>
                    <div style="margin-top: 14px; display: inline-flex; gap: 8px; background: rgba(245, 158, 11, 0.15); padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 700; font-size: 13px;">
                        🕹️ Platform: Scratch 3.0 Studio
                    </div>
                </div>
                """
            },
            {
                "title": "Peta Layar Komputer: <span>Koordinat X & Y</span> 🗺️",
                "badge": "Konsep Fundamental",
                "time": "⏱️ Menit ke 10–22",
                "text": "Di dalam panggung Scratch, setiap posisi memiliki alamat rahasia yang disebut <strong>Koordinat</strong>! Sama seperti alamat rumah, koordinat memberi tahu sprite harus berada di mana.",
                "points": [
                    "↔️ <strong>Sumbu X (Horizontal):</strong> Kiri (-240) sampai Kanan (+240)",
                    "↕️ <strong>Sumbu Y (Vertikal):</strong> Bawah (-180) sampai Atas (+180)",
                    "🎯 <strong>Titik Pusat (0, 0):</strong> Tepat di tengah layar panggung!",
                    "💡 Ingat: Ke ATAS nilainya POSITIF (+), ke BAWAH nilainya NEGATIF (-)"
                ],
                "visual_html": """
                <div style="background: #090d16; border: 2px solid #3b82f6; border-radius: 16px; padding: 20px; width: 100%; text-align: center;">
                    <div style="display: flex; justify-content: space-between; color: #94a3b8; font-size: 12px; font-weight: 700; margin-bottom: 4px;">
                        <span>Y = +180 (Langit Atas)</span>
                    </div>
                    <div style="height: 140px; position: relative; border: 1px dashed rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                        <div style="position: absolute; width: 100%; height: 2px; background: rgba(59, 130, 246, 0.4);"></div>
                        <div style="position: absolute; height: 100%; width: 2px; background: rgba(245, 158, 11, 0.4);"></div>
                        <div style="background: #1e293b; border: 2px solid #fbbf24; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 800; color: #fbbf24; z-index: 2;">Pusat (0, 0)</div>
                        <div style="position: absolute; left: 10px; color: #38bdf8; font-size: 11px; font-weight: 700;">X = -240 (Kiri)</div>
                        <div style="position: absolute; right: 10px; color: #38bdf8; font-size: 11px; font-weight: 700;">X = +240 (Kanan)</div>
                    </div>
                    <div style="color: #94a3b8; font-size: 12px; font-weight: 700; margin-top: 6px;">Y = -180 (Dasar Tanah)</div>
                </div>
                """
            },
            {
                "title": "Logika Apel Jatuh: <span>Mengurangi Nilai Y</span> ⬇️",
                "badge": "Mekanik Inti 1",
                "time": "⏱️ Menit ke 22–32",
                "text": "Bagaimana cara membuat apel jatuh ke bawah secara terus-menerus? Kuncinya adalah mengurangi nilai posisi Y apel sedikit demi sedikit dalam perulangan selamanya!",
                "points": [
                    "🔄 Gunakan blok <code>forever</code> (selamanya)",
                    "📉 Masukkan perintah <code>change y by (-6)</code>",
                    "⚡ Semakin besar angka negatif (misal: -10), semakin cepat apel jatuh!",
                    "🤔 Tapi apa yang terjadi jika apel menyentuh batas paling bawah panggung?"
                ],
                "visual_html": """
                <div style="background: rgba(30, 41, 59, 0.7); border: 2px solid #10b981; border-radius: 16px; padding: 20px; width: 100%;">
                    <div style="color: #10b981; font-weight: 800; font-size: 13px; text-transform: uppercase; margin-bottom: 10px;">📦 Kode Blok Scratch Apel:</div>
                    <div style="background: #0f172a; border-radius: 10px; padding: 14px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #e2e8f0; line-height: 1.8;">
                        <span style="color: #fbbf24;">when 🏴 clicked</span><br>
                        <span style="color: #f59e0b;">forever</span> {<br>
                        &nbsp;&nbsp;<span style="color: #38bdf8;">change y by (-6)</span><br>
                        }
                    </div>
                    <p style="color: #94a3b8; font-size: 12px; margin-top: 10px;">💡 Setiap sepersekian detik, posisi apel turun 6 langkah ke bawah!</p>
                </div>
                """
            },
            {
                "title": "Kembali ke Langit: <span>Teleportasi Apel</span> 🔄",
                "badge": "Mekanik Inti 2",
                "time": "⏱️ Menit ke 32–42",
                "text": "Jika apel dibiarkan jatuh, ia akan tersangkut di dasar layar. Kita butuh logika deteksi: jika apel sudah sampai paling bawah, pindahkan kembali ke atas di posisi acak!",
                "points": [
                    "🔍 Deteksi batas bawah: <code>if &lt;y position &lt; -160&gt;</code>",
                    "🚀 Teleportasi ke langit atas: <code>y: 170</code>",
                    "🎲 Posisi horizontal acak: <code>x: (pick random -200 to 200)</code>",
                    "✨ Hasilnya: apel seolah-olah tidak pernah habis berjatuhan!"
                ],
                "visual_html": """
                <div style="background: rgba(30, 41, 59, 0.7); border: 2px solid #f59e0b; border-radius: 16px; padding: 20px; width: 100%;">
                    <div style="color: #f59e0b; font-weight: 800; font-size: 13px; text-transform: uppercase; margin-bottom: 10px;">📦 Kode Teleportasi Apel:</div>
                    <div style="background: #0f172a; border-radius: 10px; padding: 14px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #e2e8f0; line-height: 1.8;">
                        <span style="color: #a855f7;">if</span> &lt;<span style="color: #38bdf8;">y position</span> &lt; <span style="color: #ec4899;">-160</span>&gt; <span style="color: #a855f7;">then</span><br>
                        &nbsp;&nbsp;<span style="color: #38bdf8;">go to x: (pick random -200 to 200)</span><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #38bdf8;">y: (170)</span>
                    </div>
                </div>
                """
            },
            {
                "title": "Mangkuk Penangkap: <span>Mengikuti Mouse X</span> 🥣",
                "badge": "Kontrol Pemain",
                "time": "⏱️ Menit ke 42–52",
                "text": "Sekarang giliran mangkuk penangkap! Kita ingin pemain bisa menggeser mangkuk ke kiri dan kanan dengan sangat halus dan responsif mengikuti kursor mouse.",
                "points": [
                    "🖱️ Mangkuk hanya bergerak ke samping (Horizontal), tidak boleh terbang ke atas!",
                    "🔒 Kunci posisi Y di dasar layar: misal <code>y = -140</code>",
                    "⚡ Hubungkan nilai X dengan sensor mouse: <code>set x to (mouse x)</code>",
                    "🎮 Rasakan kendali yang sangat instan dan akurat!"
                ],
                "visual_html": """
                <div style="background: rgba(30, 41, 59, 0.7); border: 2px solid #38bdf8; border-radius: 16px; padding: 20px; width: 100%;">
                    <div style="color: #38bdf8; font-weight: 800; font-size: 13px; text-transform: uppercase; margin-bottom: 10px;">🥣 Kode Sprite Mangkuk (Bowl):</div>
                    <div style="background: #0f172a; border-radius: 10px; padding: 14px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #e2e8f0; line-height: 1.8;">
                        <span style="color: #fbbf24;">when 🏴 clicked</span><br>
                        <span style="color: #38bdf8;">set y to (-140)</span><br>
                        <span style="color: #f59e0b;">forever</span> {<br>
                        &nbsp;&nbsp;<span style="color: #38bdf8;">set x to (mouse x)</span><br>
                        }
                    </div>
                </div>
                """
            },
            {
                "title": "Hap! <span>Deteksi Tabrakan & Suara Makan</span> 🔊",
                "badge": "Interaksi & Skor",
                "time": "⏱️ Menit ke 52–62",
                "text": "Saat apel menyentuh mangkuk, game harus tahu bahwa pemain berhasil menangkapnya! Kita buat apel memainkan suara 'Chomp' lalu kembali ke atas sambil menambah skor!",
                "points": [
                    "🤝 Deteksi sentuhan: <code>if touching [Bowl] then</code>",
                    "🎵 Mainkan efek suara renyah: <code>start sound [Chomp]</code>",
                    "➕ Tambah skor pemain: <code>change [Skor] by (1)</code>",
                    "🚀 Lempar apel kembali ke atas: <code>go to x: random y: 170</code>"
                ],
                "visual_html": """
                <div style="background: rgba(30, 41, 59, 0.7); border: 2px solid #a855f7; border-radius: 16px; padding: 20px; width: 100%;">
                    <div style="color: #a855f7; font-weight: 800; font-size: 13px; text-transform: uppercase; margin-bottom: 10px;">📦 Kode Lengkap Tangkap Apel:</div>
                    <div style="background: #0f172a; border-radius: 10px; padding: 14px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #e2e8f0; line-height: 1.7;">
                        <span style="color: #a855f7;">if</span> &lt;<span style="color: #38bdf8;">touching [Bowl]?</span>&gt; <span style="color: #a855f7;">then</span><br>
                        &nbsp;&nbsp;<span style="color: #ec4899;">start sound [Chomp]</span><br>
                        &nbsp;&nbsp;<span style="color: #f59e0b;">change [Skor] by (1)</span><br>
                        &nbsp;&nbsp;<span style="color: #38bdf8;">go to x: (pick random -200 to 200) y: (170)</span>
                    </div>
                </div>
                """
            },
            {
                "title": "Tantangan Koding Cilik: <span>2 Apel Sekaligus!</span> 🎮",
                "badge": "Latihan Praktik Mandiri",
                "time": "⏱️ Menit ke 62–74",
                "text": "Satu apel terasa terlalu mudah? Ayo kita gandakan tantangannya menjadi dua apel atau lebih dengan kecepatan berbeda!",
                "points": [
                    "🍎 <strong>Apel Merah:</strong> Kecepatan normal (-5), skor +1",
                    "🍏 <strong>Apel Hijau Kilat:</strong> Kecepatan super cepat (-9), skor +2!",
                    "🎨 Cara mudah: Klik kanan sprite Apple -> pilih <em>Duplicate</em>",
                    "⚡ Ubah warna kostum di Costume Editor menjadi hijau cerah!"
                ],
                "visual_html": """
                <div style="background: rgba(15, 23, 42, 0.85); border: 2px solid #f59e0b; border-radius: 16px; padding: 20px; width: 100%; text-align: center;">
                    <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 14px;">
                        <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; border-radius: 12px; padding: 14px; width: 120px;">
                            <div style="font-size: 32px;">🍎</div>
                            <div style="color: #ef4444; font-weight: 800; font-size: 13px;">Apel Merah</div>
                            <div style="color: #cbd5e1; font-size: 11px;">Speed: -5 | +1</div>
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 12px; padding: 14px; width: 120px;">
                            <div style="font-size: 32px;">🍏</div>
                            <div style="color: #10b981; font-weight: 800; font-size: 13px;">Apel Hijau</div>
                            <div style="color: #cbd5e1; font-size: 11px;">Speed: -9 | +2</div>
                        </div>
                    </div>
                    <p style="color: #fbbf24; font-size: 13px; font-weight: 700;">Tantangan: Siapa yang bisa mencapai 20 poin dalam 1 menit?</p>
                </div>
                """
            },
            {
                "title": "Dokter Kode: <span>Tips Memperbaiki Bug</span> 🐛",
                "badge": "Klinik Debugging",
                "time": "⏱️ Menit ke 74–82",
                "text": "Saat membuat game, programmer hebat tidak pernah takut dengan error. Mari kita pelajari 2 masalah umum dan solusinya!",
                "points": [
                    "🐛 <strong>Bug 1: Apel berhenti di bawah layar dan tidak naik lagi.</strong><br><em>Solusi:</em> Cek tanda pembanding. Pastikan tandanya &lt; (kurang dari -160).",
                    "🐛 <strong>Bug 2: Mangkuk bisa melayang ke atas langit.</strong><br><em>Solusi:</em> Jangan gunakan <code>go to mouse-pointer</code>! Kunci Y dengan <code>set x to mouse x</code>.",
                    "🐛 <strong>Bug 3: Skor bertambah 10 kali dalam satu tangkapan.</strong><br><em>Solusi:</em> Langsung pindahkan apel ke langit segera setelah touching mangkuk!"
                ],
                "visual_html": """
                <div style="background: rgba(239, 68, 68, 0.08); border: 2px solid #ef4444; border-radius: 16px; padding: 20px; width: 100%;">
                    <div style="color: #ef4444; font-size: 16px; font-weight: 800; margin-bottom: 8px;">🛡️ Resep Rahasia Bebas Bug:</div>
                    <p style="color: #e2e8f0; font-size: 13px; line-height: 1.5;">Selalu letakkan blok <strong>Teleportasi</strong> di dalam kondisi touching mangkuk, sehingga apel langsung menghilang dari area kontak mangkuk!</p>
                </div>
                """
            },
            {
                "title": "Rangkuman Keren <span>Sesi 13</span> 🌟",
                "badge": "Review Pemahaman",
                "time": "⏱️ Menit ke 82–87",
                "text": "Luar biasa! Hari ini kita berhasil membuat satu game arkade utuh dengan logika matematika koordinat nyata!",
                "points": [
                    "1️⃣ <strong>Sumbu Y:</strong> Mengatur gerakan jatuh (Nilai Negatif) dan naik (Nilai Positif)",
                    "2️⃣ <strong>Sumbu X:</strong> Mengatur posisi mangkuk dan letak jatuh apel secara horizontal",
                    "3️⃣ <strong>Pick Random:</strong> Menghadirkan kejutan posisi agar game tidak membosankan",
                    "4️⃣ <strong>Mouse Sensing:</strong> Mengontrol karakter dengan kepekaan kursor mouse"
                ],
                "visual_html": """
                <div style="background: rgba(245, 158, 11, 0.1); border: 2px solid #f59e0b; border-radius: 16px; padding: 22px; width: 100%; text-align: center;">
                    <div style="font-size: 40px; margin-bottom: 8px;">🎉🏆</div>
                    <h3 style="color: #fbbf24; font-size: 18px; font-weight: 800; margin-bottom: 6px;">Selamat, Programmer Cilik!</h3>
                    <p style="color: #cbd5e1; font-size: 13px;">Game Tangkap Apel buatanmu sudah siap dimainkan bersama keluarga!</p>
                    <button onclick="triggerConfetti()" style="margin-top: 12px; background: #000; color: #fbbf24; border: 1px solid #fbbf24; padding: 8px 18px; border-radius: 999px; font-weight: 800; cursor: pointer;">
                        🎊 Rayakan Keberhasilan (Klik Confetti)
                    </button>
                </div>
                """
            },
            {
                "title": "Misi Pekan Depan: <span>Sesi 14</span>! 🚀",
                "badge": "Teaser Sesi Berikutnya",
                "time": "⏱️ Menit ke 87–90",
                "text": "Di pertemuan berikutnya, kita akan menambahkan efek visual spektakuler ke game apel kita!",
                "points": [
                    "✨ <strong>Efek Partikel Kilau:</strong> Saat apel ditangkap, muncul percikan bintang!",
                    "🎈 <strong>Animasi Skor Terapung:</strong> Angka +1 melayang ke atas lalu menghilang!",
                    "🧬 <strong>Ilmu Kloning Sprite:</strong> Membuat duplikat ajaib tanpa membuat sprite baru!",
                    "🎮 Game kita akan terasa seperti game komersial profesional!"
                ],
                "visual_html": """
                <div style="background: rgba(30, 41, 59, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 24px; text-align: center; width: 100%;">
                    <div style="font-size: 48px; margin-bottom: 10px;">✨🔮</div>
                    <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 6px;">Sesi 14: Game Juice & Partikel Kloning</h3>
                    <p style="color: #94a3b8; font-size: 13px;">Siapkan imajinasi terkerenmu untuk membuat game kita berkilau!</p>
                </div>
                """
            }
        ],
        "notes": [
            {
                "title": "Slide 1: Pembukaan & Sambutan Stage 2",
                "time": "Menit 00–10 (Total 90 Menit)",
                "instructions": "Sambut siswa dengan energi baru karena mereka resmi masuk ke Stage 2! Ajak mereka memamerkan antusiasme.",
                "script": "Halo teman-teman hebat! Selamat datang di Stage 2 Beekoding! Di level baru ini, game yang kita buat akan jauh lebih keren, lebih cepat, dan mirip game di smartphone! Siapa yang siap bikin Game Tangkap Apel hari ini? Angkat tangannya tinggi-tinggi!"
            },
            {
                "title": "Slide 2: Konsep Sumbu Koordinat X dan Y",
                "time": "Menit 10–22",
                "instructions": "Gunakan analogi lantai dan lift. Sumbu X adalah berjalan ke samping kanan-kiri, sumbu Y adalah naik-turun lift.",
                "script": "Coba perhatikan layar! Komputer punya peta rahasia namanya X dan Y. Kalau kamu mau jalan ke kanan atau kiri, kamu pakai X. Tapi kalau mau naik ke langit atau jatuh ke jurang, kamu pakai Y! Ke atas itu plus (+), ke bawah itu minus (-). Gampang kan?"
            },
            {
                "title": "Slide 3: Logika Jatuh Berkelanjutan",
                "time": "Menit 22–32",
                "instructions": "Ajak murid menebak apa yang terjadi jika angka -6 diubah jadi -1 atau -15.",
                "script": "Kenapa apel jatuh ke bawah? Karena kita kurangi posisi Y-nya terus menerus dengan blok change y by (-6). Coba bayangkan gravitasi bumi yang menarik apel ke bawah. Kalau angkanya kita ganti jadi -20, apelnya bakal jatuh secepat kilat!"
            },
            {
                "title": "Slide 4: Logika Teleportasi Balik ke Langit",
                "time": "Menit 32–42",
                "instructions": "Tekankan fungsi blok pick random agar game tidak mudah ditebak.",
                "script": "Kalau apelnya jatuh sampai bawah terus hilang ke mana? Nah, kita pasang penjaga: kalau Y lebih kecil dari -160, apel langsung teleportasi balik ke langit di Y: 170! Dan hebatnya, posisi X-nya kita acak pakai pick random, jadi pemain tidak tahu apel bakal muncul di mana!"
            },
            {
                "title": "Slide 5: Kontrol Mangkuk Mengikuti Mouse",
                "time": "Menit 42–52",
                "instructions": "Jelaskan mengapa kita mengunci Y dan hanya mengubah X.",
                "script": "Sekarang kita buat mangkuknya! Mangkuk kita tidak boleh melayang ke atas kan? Makanya Y-nya kita kunci di bawah (-140). Lalu X-nya kita tempelkan ke kursor mouse: set x to mouse x. Ke mana pun mouse kamu geser, mangkuk langsung ikut seketika!"
            },
            {
                "title": "Slide 6: Deteksi Tangkapan & Suara Chomp",
                "time": "Menit 52–62",
                "instructions": "Bimbing murid memilih suara yang lucu di Sound Library Scratch.",
                "script": "Hap! Saat apel menyentuh mangkuk, bunyi Chomp! Skor langsung bertambah 1! Dan jangan lupa, apelnya harus langsung terbang lagi ke langit agar siap ditangkap ronde berikutnya!"
            },
            {
                "title": "Slide 7: Praktik Mandiri Gandakan Apel",
                "time": "Menit 62–74",
                "instructions": "Beri kebebasan murid berkreasi menggandakan sprite dan mengubah kostum warnanya.",
                "script": "Ayo sekarang coba tantangan mandiri! Duplikat sprite apelmu, ganti warnanya jadi apel emas atau apel hijau! Beri apel kedua kecepatan yang lebih tinggi dan skor yang lebih banyak!"
            },
            {
                "title": "Slide 8: Klinik Debugging & Mengatasi Error",
                "time": "Menit 74–82",
                "instructions": "Tunjukkan sikap tenang saat menemukan bug. Ajak seluruh kelas menganalisis penyebab bug.",
                "script": "Kalau ada apel yang nyangkut di bawah, jangan panik! Itu tandanya kita jadi Dokter Kode. Cek blok perbandingannya: apakah tanda panahnya sudah benar menghadap ke kiri (< -160)?"
            },
            {
                "title": "Slide 9: Rangkuman & Pesta Apresiasi",
                "time": "Menit 82–87",
                "instructions": "Ucapkan selamat dan minta setiap anak mencoba memainkan game buatan teman di sebelahnya.",
                "script": "Keren sekali semuanya! Hari ini kalian sudah belajar koordinat X-Y, deteksi tabrakan, dan sensor mouse. Ayo klik tombol kembang api untuk merayakan game pertama di Stage 2!"
            },
            {
                "title": "Slide 10: Penutup & Teaser Sesi 14",
                "time": "Menit 87–90",
                "instructions": "Ajak siswa menyimpan file proyek (Save to Computer) dan rapikan laptop.",
                "script": "Simpan proyek kalian ya! Pekan depan kita akan tambahkan efek bintang kilau dan tulisan +1 yang melayang ajaib. Sampai jumpa pekan depan, salam programmer cilik!"
            }
        ]
    }
}
