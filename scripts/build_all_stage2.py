import os
import sys
from generate_stage2_slides import generate_slide_deck_html

# Complete dataset for sessions 13 to 24
def get_all_stage2_sessions():
    sessions = []

    # Helper to generate standard 10-slide outline for any session
    def make_session(num, title, subtitle, badge, icon, topic_details):
        slides = []
        notes = []

        # Slide 1: Cover
        slides.append({
            "title": f"Misi Baru: <span>{topic_details['goal_title']}</span> {icon}",
            "badge": f"Pengantar & Goal Sesi {num:02d}",
            "time": "⏱️ Menit ke 00–10",
            "text": f"Selamat datang di <strong>STAGE 2: SESI {num:02d}</strong>! Hari ini kita akan mempelajari {title.lower()} untuk membawa game kita ke level berikutnya!",
            "points": [
                f"🎯 <strong>Tujuan Utama:</strong> {topic_details['goal_desc']}",
                f"🧩 <strong>Balok Kunci:</strong> <code>{topic_details['key_blocks'][0]}</code>",
                f"💡 <strong>Konsep Baru:</strong> {topic_details['core_concepts'][0]}",
                "🚀 <strong>Hasil Akhir:</strong> Proyek interaktif yang siap dimainkan dan dipamerkan!"
            ],
            "visual_html": f"""
            <div style="background: rgba(15, 23, 42, 0.85); border: 2px solid #334155; border-radius: 16px; padding: 24px; text-align: center; width: 100%;">
                <div style="font-size: 56px; margin-bottom: 12px;">{icon} 🎮</div>
                <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 8px;">Target Sesi {num:02d}</h3>
                <p style="color: #cbd5e1; font-size: 14px; line-height: 1.5;">{subtitle}</p>
                <div style="margin-top: 14px; display: inline-flex; gap: 8px; background: rgba(245, 158, 11, 0.15); padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 700; font-size: 13px;">
                    🕹️ Platform: Scratch 3.0 Studio
                </div>
            </div>
            """
        })
        notes.append({
            "title": f"Slide 1: Pembukaan Sesi {num:02d}",
            "time": "Menit 00–10 (Total 90 Menit)",
            "instructions": f"Sambut siswa dengan semangat, jelaskan target seru hari ini ({title}).",
            "script": f"Halo programmer cilik! Selamat datang di Sesi {num:02d}! Hari ini kita akan membikin game kita semakin hebat dengan {title.lower()}! Siapa yang sudah siap? Ayo buka Scratch-nya!"
        })

        # Slide 2: Mengapa Konsep Ini Penting
        slides.append({
            "title": f"Mengapa Kita Butuh <span>{topic_details['concept_name']}</span>? 🤔",
            "badge": "Analogi & Logika Dasar",
            "time": "⏱️ Menit ke 10–22",
            "text": topic_details['concept_explanation'],
            "points": topic_details['concept_points'],
            "visual_html": f"""
            <div style="background: #090d16; border: 2px solid #3b82f6; border-radius: 16px; padding: 20px; width: 100%; text-align: center;">
                <div style="font-size: 44px; margin-bottom: 10px;">💡 🧠</div>
                <h4 style="color: #38bdf8; font-size: 16px; font-weight: 800; margin-bottom: 8px;">Analogi Dunia Nyata:</h4>
                <p style="color: #e2e8f0; font-size: 13.5px; line-height: 1.5;">{topic_details['analogy']}</p>
            </div>
            """
        })
        notes.append({
            "title": f"Slide 2: Konsep {topic_details['concept_name']}",
            "time": "Menit 10–22",
            "instructions": "Gunakan peragaan fisik atau pertanyaan pemantik kepada siswa.",
            "script": f"Coba bayangkan: {topic_details['analogy']}. Di komputer, cara kerjanya persis seperti itu! Keren banget kan?"
        })

        # Slide 3: Balok Kunci & Algoritma
        slides.append({
            "title": f"Mengenal Balok Kunci: <span>{topic_details['key_block_title']}</span> 🧩",
            "badge": "Bedah Balok Kode",
            "time": "⏱️ Menit ke 22–32",
            "text": f"Untuk mengaktifkan logika ini di Scratch, kita menggunakan rangkaian balok khusus berikut ini:",
            "points": [
                f"🟡 <strong>Event:</strong> Mulai saat bendera hijau diklik",
                f"🔵 <strong>Motion / Logika:</strong> <code>{topic_details['key_blocks'][0]}</code>",
                f"🟣 <strong>Kondisi:</strong> <code>{topic_details['key_blocks'][1] if len(topic_details['key_blocks']) > 1 else topic_details['key_blocks'][0]}</code>",
                "🔄 <strong>Loop:</strong> Membungkus kode dalam perulangan agar berjalan terus-menerus"
            ],
            "visual_html": f"""
            <div style="background: rgba(30, 41, 59, 0.7); border: 2px solid #10b981; border-radius: 16px; padding: 20px; width: 100%;">
                <div style="color: #10b981; font-weight: 800; font-size: 13px; text-transform: uppercase; margin-bottom: 10px;">📦 Kode Blok Utama Scratch:</div>
                <div style="background: #0f172a; border-radius: 10px; padding: 14px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #e2e8f0; line-height: 1.8;">
                    {topic_details['code_snippet_1']}
                </div>
            </div>
            """
        })
        notes.append({
            "title": "Slide 3: Bedah Balok Kode",
            "time": "Menit 22–32",
            "instructions": "Pandu siswa menemukan balok di panel palet Scratch sesuai warnanya.",
            "script": "Ayo cari balok warna kuning untuk event dan balok warna biru/oranye. Jangan sampai terbalik urutannya ya!"
        })

        # Slide 4: Step-by-Step Perakitan
        slides.append({
            "title": f"Langkah Perakitan: <span>{topic_details['step_title']}</span> 🛠️",
            "badge": "Langkah Demi Langkah",
            "time": "⏱️ Menit ke 32–42",
            "text": f"Sekarang kita rangkai langkah-langkah praktiknya satu per satu di Scratch Studio kita!",
            "points": topic_details['step_points'],
            "visual_html": f"""
            <div style="background: rgba(30, 41, 59, 0.7); border: 2px solid #f59e0b; border-radius: 16px; padding: 20px; width: 100%;">
                <div style="color: #f59e0b; font-weight: 800; font-size: 13px; text-transform: uppercase; margin-bottom: 10px;">⚙️ Alur Instruksi:</div>
                <div style="background: #0f172a; border-radius: 10px; padding: 14px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #e2e8f0; line-height: 1.8;">
                    {topic_details['code_snippet_2']}
                </div>
            </div>
            """
        })
        notes.append({
            "title": "Slide 4: Panduan Perakitan Langkah Demi Langkah",
            "time": "Menit 32–42",
            "instructions": "Demonstrasikan di layar proyektor lalu berkeliling melihat layar laptop siswa.",
            "script": "Lihat layar kakak di depan dulu ya. Setelah kakak contohkan, giliran kalian menyusun baloknya di laptop masing-masing!"
        })

        # Slide 5: Interaktivitas & Respon Game
        slides.append({
            "title": f"Respons Permainan: <span>{topic_details['interaction_title']}</span> ⚡",
            "badge": "Interaksi & Efek",
            "time": "⏱️ Menit ke 42–52",
            "text": f"Game terasa hidup jika merespons aksi pemain secara instan dengan efek suara dan perubahan visual!",
            "points": [
                f"🔊 <strong>Efek Audio:</strong> {topic_details['audio_effect']}",
                f"🎨 <strong>Animasi Visual:</strong> {topic_details['visual_effect']}",
                "⚡ <strong>Umpan Balik Instan:</strong> Pemain langsung tahu aksi mereka berhasil",
                "🎮 <strong>Kenyamanan Bermain:</strong> Gameplay terasa halus dan memuaskan"
            ],
            "visual_html": f"""
            <div style="background: rgba(30, 41, 59, 0.7); border: 2px solid #38bdf8; border-radius: 16px; padding: 20px; width: 100%; text-align: center;">
                <div style="font-size: 40px; margin-bottom: 8px;">🔊 ✨</div>
                <h4 style="color: #38bdf8; font-size: 16px; font-weight: 800; margin-bottom: 6px;">Umpan Balik Pemain:</h4>
                <p style="color: #cbd5e1; font-size: 13px;">{topic_details['feedback_desc']}</p>
            </div>
            """
        })
        notes.append({
            "title": "Slide 5: Respon & Audio Game",
            "time": "Menit 42–52",
            "instructions": "Ajak murid memilih efek suara favorit dari pustaka audio Scratch.",
            "script": "Coba dengarkan suaranya saat karakter kita beraksi! Suara membuat game kita terasa 10 kali lebih seru!"
        })

        # Slide 6: Pengembangan Fitur Lanjutan
        slides.append({
            "title": f"Fitur Tingkat Lanjut: <span>{topic_details['advanced_title']}</span> 🚀",
            "badge": "Fitur Ekstra & Variasi",
            "time": "⏱️ Menit ke 52–62",
            "text": topic_details['advanced_text'],
            "points": topic_details['advanced_points'],
            "visual_html": f"""
            <div style="background: rgba(30, 41, 59, 0.7); border: 2px solid #a855f7; border-radius: 16px; padding: 20px; width: 100%;">
                <div style="color: #a855f7; font-weight: 800; font-size: 13px; text-transform: uppercase; margin-bottom: 10px;">🌟 Fitur Tambahan:</div>
                <div style="background: #0f172a; border-radius: 10px; padding: 14px; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; color: #e2e8f0; line-height: 1.8;">
                    {topic_details['code_snippet_3']}
                </div>
            </div>
            """
        })
        notes.append({
            "title": "Slide 6: Fitur Tingkat Lanjut",
            "time": "Menit 52–62",
            "instructions": "Beri tantangan kepada murid yang sudah selesai lebih awal.",
            "script": "Siapa yang kodenya sudah jalan? Hebat! Sekarang coba tantangan level up ini: tambahkan variasi baru!"
        })

        # Slide 7: Tantangan Praktik Mandiri
        slides.append({
            "title": f"Tantangan Mandiri: <span>{topic_details['challenge_title']}</span> 🏆",
            "badge": "Eksplorasi Kreatif",
            "time": "⏱️ Menit ke 62–74",
            "text": f"Saatnya menguji kreativitasmu! Tambahkan sentuhan personal pada proyek game buatanmu!",
            "points": topic_details['challenge_points'],
            "visual_html": f"""
            <div style="background: rgba(15, 23, 42, 0.85); border: 2px solid #f59e0b; border-radius: 16px; padding: 20px; width: 100%; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 10px;">🎯 ⭐</div>
                <h4 style="color: #fbbf24; font-size: 17px; font-weight: 800; margin-bottom: 6px;">Target Skor Tantangan:</h4>
                <p style="color: #cbd5e1; font-size: 13.5px;">{topic_details['challenge_target']}</p>
            </div>
            """
        })
        notes.append({
            "title": "Slide 7: Praktik Mandiri",
            "time": "Menit 62–74",
            "instructions": "Beri kebebasan berekspresi kepada murid dan apresiasi ide-ide unik mereka.",
            "script": "Silakan atur warna, kostum, dan skor sesuai selera kalian! Tunjukkan hasil karya unikmu!"
        })

        # Slide 8: Klinik Debugging & Solusi Error
        slides.append({
            "title": f"Dokter Kode: <span>Tips Mengatasi Bug</span> 🐛",
            "badge": "Klinik Debugging",
            "time": "⏱️ Menit ke 74–82",
            "text": "Setiap programmer pasti pernah menemui bug. Mari pelajari cara menemukan dan memperbaikinya!",
            "points": topic_details['debugging_points'],
            "visual_html": f"""
            <div style="background: rgba(239, 68, 68, 0.08); border: 2px solid #ef4444; border-radius: 16px; padding: 20px; width: 100%;">
                <div style="color: #ef4444; font-size: 16px; font-weight: 800; margin-bottom: 8px;">🛡️ Tips Dokter Kode:</div>
                <p style="color: #e2e8f0; font-size: 13px; line-height: 1.5;">{topic_details['debugging_tip']}</p>
            </div>
            """
        })
        notes.append({
            "title": "Slide 8: Klinik Debugging",
            "time": "Menit 74–82",
            "instructions": "Ajak murid membaca urutan kode langkah demi langkah saat menemui error.",
            "script": "Ingat prinsip kita: Error itu wajar! Cek satu per satu baloknya seperti detektif yang mencari petunjuk!"
        })

        # Slide 9: Rangkuman & Pesta Apresiasi
        slides.append({
            "title": f"Rangkuman Keren <span>Sesi {num:02d}</span> 🌟",
            "badge": "Review Pemahaman",
            "time": "⏱️ Menit ke 82–87",
            "text": f"Hebat sekali! Kalian berhasil menaklukkan tantangan Sesi {num:02d} dengan penuh semangat!",
            "points": topic_details['summary_points'],
            "visual_html": f"""
            <div style="background: rgba(245, 158, 11, 0.1); border: 2px solid #f59e0b; border-radius: 16px; padding: 22px; width: 100%; text-align: center;">
                <div style="font-size: 40px; margin-bottom: 8px;">🎉🏆</div>
                <h3 style="color: #fbbf24; font-size: 18px; font-weight: 800; margin-bottom: 6px;">Selamat, Programmer Cilik!</h3>
                <p style="color: #cbd5e1; font-size: 13px;">Proyek Sesi {num:02d} milikmu telah berhasil diselesaikan!</p>
                <button onclick="triggerConfetti()" style="margin-top: 12px; background: #000; color: #fbbf24; border: 1px solid #fbbf24; padding: 8px 18px; border-radius: 999px; font-weight: 800; cursor: pointer;">
                    🎊 Rayakan Keberhasilan (Klik Confetti)
                </button>
            </div>
            """
        })
        notes.append({
            "title": f"Slide 9: Rangkuman Sesi {num:02d}",
            "time": "Menit 82–87",
            "instructions": "Review 3 poin utama dan beri tepuk tangan untuk seluruh murid.",
            "script": f"Semuanya hebat hari ini! Kalian resmi menguasai {title.lower()}! Ayo kita rayakan bersama!"
        })

        # Slide 10: Teaser Sesi Berikutnya / Penutup
        next_title = topic_details['next_teaser_title']
        slides.append({
            "title": f"Misi Selanjutnya: <span>{next_title}</span> 🚀",
            "badge": "Teaser & Penutup",
            "time": "⏱️ Menit ke 87–90",
            "text": f"Petualangan Stage 2 masih berlanjut! Di pertemuan berikutnya, tantangan yang lebih spektakuler menanti kita!",
            "points": topic_details['next_teaser_points'],
            "visual_html": f"""
            <div style="background: rgba(30, 41, 59, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 24px; text-align: center; width: 100%;">
                <div style="font-size: 48px; margin-bottom: 10px;">✨🔮</div>
                <h3 style="color: #fbbf24; font-size: 20px; font-weight: 800; margin-bottom: 6px;">{next_title}</h3>
                <p style="color: #94a3b8; font-size: 13px;">Pastikan menyimpan file proyekmu dan sampai jumpa di sesi berikutnya!</p>
            </div>
            """
        })
        notes.append({
            "title": "Slide 10: Penutup & Teaser",
            "time": "Menit 87–90",
            "instructions": "Ingatkan murid menyimpan proyek (File -> Save to your computer) dan merapikan tempat belajar.",
            "script": "Simpan proyek kalian ya! Minggu depan kita akan lanjutkan dengan fitur yang semakin seru. Sampai jumpa teman-teman!"
        })

        return {
            "num": num,
            "title": title,
            "subtitle": subtitle,
            "badge": badge,
            "icon": icon,
            "slides": slides,
            "notes": notes
        }

    # Data for 13 to 24
    from stage2_data import STAGE2_SESSIONS
    sessions.append(STAGE2_SESSIONS[13])

    # SESI 14: Efek Partikel & Animasi Skor Terapung (Game Juice)
    sessions.append(make_session(
        num=14,
        title="Efek Partikel dan Animasi Skor Terapung (Game Juice)",
        subtitle="Memanfaatkan Kloning Sprite & Ghost Effect agar Game Terasa Hidup dan Memuaskan",
        badge="Sesi 14 • Game Feel & Partikel",
        icon="✨",
        topic_details={
            "goal_title": "Game Juice & Partikel Ajaib!",
            "goal_desc": "Menghadirkan efek partikel berkilau dan teks skor +1 melayang setiap kali menangkap apel.",
            "key_blocks": ["create clone of [myself]", "when I start as a clone", "change ghost effect by (10)"],
            "core_concepts": ["Game Juice (Game Feel)", "Sprite Cloning", "Ghost Transparency Effect"],
            "concept_name": "Game Juice (Sensasi Game Hidup)",
            "concept_explanation": "Game Juice adalah sentuhan estetika kecil seperti kilauan, getaran, dan animasi yang membuat game biasa terasa sangat memuaskan dimainkan!",
            "concept_points": [
                "✨ <strong>Bukan cuma mekanik:</strong> Game butuh 'rasa' yang menyenangkan saat pemain berhasil",
                "🧬 <strong>Kloning Sprite:</strong> Membuat duplikat sprite otomatis tanpa menambah sprite baru",
                "👻 <strong>Ghost Effect:</strong> Mengubah transparansi objek dari terlihat (0) hingga tembus pandang (100)",
                "🎈 <strong>Floating Score:</strong> Teks skor melayang naik ke atas lalu perlahan menghilang"
            ],
            "analogy": "Bayangkan makan kerupuk yang renyah vs kerupuk melempem. Game Juice adalah kerenyahan yang membuat pemain ingin terus bermain!",
            "key_block_title": "Kloning Sprite & Ghost Effect",
            "code_snippet_1": '<span style="color:#fbbf24;">when I start as a clone</span><br><span style="color:#f59e0b;">repeat (10)</span> {<br>&nbsp;&nbsp;<span style="color:#38bdf8;">change y by (4)</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">change ghost effect by (10)</span><br>}<br><span style="color:#ef4444;">delete this clone</span>',
            "step_title": "Membuat Sprite Teks Skor Terapung",
            "step_points": [
                "1️⃣ Buat sprite baru berupa teks '+1' berwarna kuning cerah",
                "2️⃣ Saat game mulai: sembunyikan sprite aslinya (<code>hide</code>)",
                "3️⃣ Saat apel ditangkap: buat klon (<code>create clone of [TextSkor]</code>)",
                "4️⃣ Pada klon: munculkan di koordinat apel, meluncur naik sambil memudar!"
            ],
            "code_snippet_2": '<span style="color:#fbbf24;">when 🏴 clicked</span> -> <span style="color:#a855f7;">hide</span><br><br><span style="color:#fbbf24;">when I receive [Apel Tertangkap]</span><br><span style="color:#38bdf8;">go to [Apple]</span><br><span style="color:#a855f7;">create clone of [myself]</span>',
            "interaction_title": "Percikan Bintang Partikel",
            "audio_effect": "Suara gemerlap 'Magic Coin / Bell' saat klon partikel meledak",
            "visual_effect": "5 partikel bintang meluncur ke arah acak lalu menghilang",
            "feedback_desc": "Setiap tangkapan apel menghasilkan sensasi visual ceria yang membuat pemain merasa dihargai atas prestasinya!",
            "advanced_title": "Partikel Bintang Berputar",
            "advanced_text": "Tambahkan efek putaran sudut (<code>turn 15 degrees</code>) pada partikel saat melayang untuk animasi yang lebih dinamis!",
            "advanced_points": [
                "⭐ Ubah ukuran partikel secara acak (<code>set size to random 40 to 80%</code>)",
                "🎨 Ganti warna partikel dengan <code>change color effect by 25</code>",
                "⏱️ Selalu hapus klon di akhir agar tidak memenuhi memori komputer"
            ],
            "code_snippet_3": '<span style="color:#f59e0b;">repeat (8)</span> {<br>&nbsp;&nbsp;<span style="color:#38bdf8;">move (5) steps</span><br>&nbsp;&nbsp;<span style="color:#38bdf8;">turn ↻ (15) degrees</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">change ghost effect by (12)</span><br>}<br><span style="color:#ef4444;">delete this clone</span>',
            "challenge_title": "Pesta Partikel Kemenangan",
            "challenge_points": [
                "🌟 Buat partikel bintang berwarna pelangi saat apel emas ditangkap",
                "💥 Tambahkan teks 'COMBO x2' jika berhasil menangkap 3 apel berturut-turut",
                "🎮 Coba mainkan game bersama teman: rasakan bedanya dengan dan tanpa Game Juice!"
            ],
            "challenge_target": "Game terasa sangat hidup dengan minimal 2 efek partikel berbeda!",
            "debugging_points": [
                "🐛 <strong>Bug: Klon menumpuk dan layar macet.</strong><br><em>Solusi:</em> Pastikan selalu ada blok <code>delete this clone</code> di akhir skrip klon!",
                "🐛 <strong>Bug: Teks skor muncul terus di tengah layar.</strong><br><em>Solusi:</em> Sprite asli harus di-<code>hide</code> saat bendera hijau diklik.",
                "🐛 <strong>Bug: Klon tidak terlihat.</strong><br><em>Solusi:</em> Pasang blok <code>show</code> tepat setelah <code>when I start as a clone</code>."
            ],
            "debugging_tip": "Scratch memiliki batas maksimal 300 klon. Selalu hapus klon yang sudah selesai beranimasi agar game tidak lag!",
            "summary_points": [
                "1️⃣ <strong>Game Juice:</strong> Kunci membuat game terasa asik dan adiktif",
                "2️⃣ <strong>Kloning:</strong> Menggandakan sprite secara dinamis saat permainan berlangsung",
                "3️⃣ <strong>Ghost Effect:</strong> Mengatur tingkat transparansi visual dari 0 sampai 100",
                "4️⃣ <strong>Memory Clean:</strong> Menghapus klon dengan <code>delete this clone</code>"
            ],
            "next_teaser_title": "Sesi 15: Sistem Timer Hitung Mundur 30 Detik! ⏱️",
            "next_teaser_points": [
                "⏳ <strong>Variabel Waktu:</strong> Menghitung mundur dari 30 ke 0 detik",
                "📢 <strong>Broadcast Alarm:</strong> Memicu suara peluit saat waktu habis",
                "🏆 <strong>Layar Game Over & Skor:</strong> Menampilkan pencapaian akhir pemain"
            ]
        }
    ))

    # SESI 15: Sistem Timer Hitung Mundur & Alarm Kemenangan
    sessions.append(make_session(
        num=15,
        title="Sistem Timer Hitung Mundur & Alarm Kemenangan",
        subtitle="Membangun Adrenalin Waktu dengan Variabel Timer, Alarm Broadcast, dan Layar Game Over",
        badge="Sesi 15 • Timer & Alarm",
        icon="⏱️",
        topic_details={
            "goal_title": "Pacu Adrenalin: Timer 30 Detik!",
            "goal_desc": "Menambahkan batas waktu 30 detik pada game untuk menciptakan sensasi terburu-buru dan seru.",
            "key_blocks": ["set [Waktu] to (30)", "repeat until <Waktu = 0>", "broadcast [Waktu Habis]"],
            "core_concepts": ["Countdown Timer", "Conditional Loop (Repeat Until)", "Broadcasting Events"],
            "concept_name": "Batas Waktu dalam Permainan",
            "concept_explanation": "Tanpa batas waktu, pemain bisa bermain santai selamanya. Dengan timer hitung mundur, pemain terpacu fokus dan memacu kecepatan reaksinya!",
            "concept_points": [
                "⏳ <strong>Variabel Timer:</strong> Menyimpan sisa waktu yang terus berkurang setiap detik",
                "⏱️ <strong>Hitung Mundur:</strong> Berkurang dari 30 -> 29 -> 28 ... hingga 0",
                "🛑 <strong>Kondisi Berhenti:</strong> Menggunakan blok <code>repeat until &lt;Waktu = 0&gt;</code>",
                "📢 <strong>Broadcast Sinyal:</strong> Memberi tahu seluruh sprite bahwa ronde telah berakhir"
            ],
            "analogy": "Seperti jam pasir di permainan tebak kata: saat pasirnya habis, semua pemain harus berhenti bermain!",
            "key_block_title": "Logika Jam Pasir Hitung Mundur",
            "code_snippet_1": '<span style="color:#fbbf24;">when 🏴 clicked</span><br><span style="color:#f59e0b;">set [Waktu] to (30)</span><br><span style="color:#f59e0b;">repeat until &lt;Waktu = 0&gt;</span> {<br>&nbsp;&nbsp;<span style="color:#f59e0b;">wait (1) secs</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">change [Waktu] by (-1)</span><br>}<br><span style="color:#ec4899;">broadcast [Waktu Habis]</span>',
            "step_title": "Memprogram Sinyal Waktu Habis",
            "step_points": [
                "1️⃣ Buat variabel baru bernama <code>Waktu</code> (For all sprites)",
                "2️⃣ Saat bendera hijau diklik: isi nilai 30",
                "3️⃣ Kurangi 1 setiap 1 detik sampai nilai mencapai 0",
                "4️⃣ Siarkan pesan <code>broadcast [Waktu Habis]</code> untuk menghentikan apel!"
            ],
            "code_snippet_2": '<span style="color:#fbbf24;">when I receive [Waktu Habis]</span><br><span style="color:#ec4899;">start sound [Whistle]</span><br><span style="color:#f59e0b;">stop [other scripts in sprite]</span><br><span style="color:#a855f7;">switch backdrop to [Game Over Screen]</span>',
            "interaction_title": "Alarm Menegangkan 5 Detik Terakhir",
            "audio_effect": "Suara detak jam 'Tick... Tick...' saat sisa waktu kurang dari 5 detik",
            "visual_effect": "Angka waktu berubah warna menjadi merah berkedip saat kritis",
            "feedback_desc": "Pemain merasakan ketegangan yang mendebarkan di detik-detik akhir untuk merebut apel terakhir!",
            "advanced_title": "Power-up Jam Tambahan Waktu",
            "advanced_text": "Tambahkan sprite jam emas yang sesekali jatuh: jika berhasil ditangkap, waktu bertambah +5 detik!",
            "advanced_points": [
                "🕒 Sprite Jam Emas jatuh lebih jarang dibanding apel biasa",
                "➕ Jika ditangkap mangkuk: <code>change [Waktu] by (5)</code>",
                "🎉 Muncul efek teks '+5 DETIK!' melayang di layar"
            ],
            "code_snippet_3": '<span style="color:#a855f7;">if &lt;touching [Bowl]?&gt; then</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">change [Waktu] by (5)</span><br>&nbsp;&nbsp;<span style="color:#ec4899;">start sound [Tada]</span><br>&nbsp;&nbsp;<span style="color:#38bdf8;">go to x: (random) y: (170)</span>',
            "challenge_title": "Target Skor Juara 30 Detik",
            "challenge_points": [
                "🥇 Atur skor target: minimal 25 poin sebelum waktu habis",
                "🥈 Buat backdrop Kemenangan jika skor &gt; 25, atau Coba Lagi jika &lt; 25",
                "🥉 Buat tombol 'Main Lagi' yang mereset timer dan skor saat diklik"
            ],
            "challenge_target": "Sistem timer 30 detik lengkap dengan alarm audio dan layar akhir!",
            "debugging_points": [
                "🐛 <strong>Bug: Timer berkurang dari 30 langsung ke 0 dalam sekejap.</strong><br><em>Solusi:</em> Pastikan blok <code>wait (1) secs</code> berada di dalam perulangan loop!",
                "🐛 <strong>Bug: Apel masih terus jatuh setelah waktu habis.</strong><br><em>Solusi:</em> Di sprite apel, tambahkan <code>stop other scripts in sprite</code> saat menerima Waktu Habis.",
                "🐛 <strong>Bug: Angka waktu tembus ke angka negatif (-1, -2).</strong><br><em>Solusi:</em> Gunakan <code>repeat until &lt;Waktu &lt; 1&gt;</code> agar pasti berhenti di 0."
            ],
            "debugging_tip": "Gunakan blok 'wait 1 secs' yang tepat agar detik di Scratch berjalan sinkron dengan jam dinding nyata!",
            "summary_points": [
                "1️⃣ <strong>Timer:</strong> Variabel numerik yang berkurang teratur dengan delay 1 detik",
                "2️⃣ <strong>Repeat Until:</strong> Perulangan yang berhenti otomatis saat syarat terpenuhi",
                "3️⃣ <strong>Broadcast:</strong> Mengirim sinyal universal ke seluruh aktor di panggung",
                "4️⃣ <strong>Game States:</strong> Membedakan fase bermain (Playing) dan selesai (Game Over)"
            ],
            "next_teaser_title": "Sesi 16: Logika 3 Nyawa Hati ❤️ & Apel Beracun! ☠️",
            "next_teaser_points": [
                "❤️ <strong>Variabel Nyawa:</strong> Memulai dengan 3 hati kehidupan",
                "☠️ <strong>Apel Beracun:</strong> Menghindari buah busuk yang mengurangi nyawa",
                "🛡️ <strong>Invincibility Delay:</strong> Jeda kebal sesaat setelah terluka"
            ]
        }
    ))

    # Add the remaining sessions (16 to 24) using structured data
    remaining_configs = [
        (16, "Logika Nyawa (Health Heart) & Buah Beracun", "Mekanisme Risiko vs Hadiah (Risk & Reward) dengan 3 Nyawa Hati", "Sesi 16 • Logika Nyawa", "❤️", {
            "goal_title": "Waspada Apel Beracun!", "goal_desc": "Membuat mekanisme 3 nyawa hati dan rintangan buah beracun yang harus dihindari.",
            "key_blocks": ["set [Nyawa] to (3)", "if touching [Poison] then change [Nyawa] by (-1)", "if <Nyawa < 1> then broadcast [Game Over]"],
            "core_concepts": ["Health System", "Risk vs Reward", "Invincibility Frames"],
            "concept_name": "Sistem Nyawa & Hati", "concept_explanation": "Dalam game seru, pemain tidak hanya mengejar skor, tapi juga harus berhati-hati menghindari bahaya yang bisa mengurangi nyawa!",
            "concept_points": ["❤️ Memulai ronde dengan 3 Nyawa", "☠️ Menangkap apel ungu beracun mengurangi 1 nyawa", "💥 Jika nyawa habis (0), game berakhir seketika", "🛡️ Ada jeda kebal sejenak agar nyawa tidak langsung ludes"],
            "analogy": "Seperti permainan benteng atau tag: kamu punya 3 kesempatan sebelum benar-benar tereliminasi!",
            "key_block_title": "Pengurangan Nyawa & Deteksi Bahaya",
            "code_snippet_1": '<span style="color:#a855f7;">if &lt;touching [Poison]?&gt; then</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">change [Nyawa] by (-1)</span><br>&nbsp;&nbsp;<span style="color:#ec4899;">start sound [Oops]</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">if &lt;Nyawa &lt; 1&gt; then broadcast [Game Over]</span>',
            "step_title": "Merakit Sprite Apel Beracun",
            "step_points": ["1️⃣ Duplikat sprite apel dan beri kostum warna ungu berbintik hijau", "2️⃣ Buat apel beracun jatuh dengan kecepatan berbeda", "3️⃣ Kurangi variabel Nyawa jika menyentuh mangkuk", "4️⃣ Beri efek layar berkedip merah saat terkena racun"],
            "code_snippet_2": '<span style="color:#fbbf24;">when 🏴 clicked</span><br><span style="color:#f59e0b;">set [Nyawa] to (3)</span><br><span style="color:#f59e0b;">forever</span> {<br>&nbsp;&nbsp;<span style="color:#38bdf8;">change y by (-8)</span><br>}',
            "interaction_title": "Indikator Visual 3 Hati", "audio_effect": "Suara benturan 'Buzzer / Oops' yang mengejutkan", "visual_effect": "Sprite hati di pojok layar berganti kostum dari 3 hati menjadi 2 hati", "feedback_desc": "Pemain langsung waspada melihat sisa hatinya berkurang di pojok layar!",
            "advanced_title": "Efek Berkedip Kebal (Invincibility)", "advanced_text": "Setelah terkena racun, mangkuk berkedip selama 1 detik dan kebal dari racun berikutnya.",
            "advanced_points": ["🛡️ Mencegah pengurangan nyawa beruntun yang tidak adil", "👻 Gunakan loop <code>repeat (5) [set ghost to 50, wait 0.1, set ghost to 0]</code>", "🎮 Gameplay terasa jauh lebih seimbang dan profesional"],
            "code_snippet_3": '<span style="color:#f59e0b;">repeat (4)</span> {<br>&nbsp;&nbsp;<span style="color:#a855f7;">set ghost effect to (60)</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">wait (0.1) secs</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">set ghost effect to (0)</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">wait (0.1) secs</span><br>}',
            "challenge_title": "Tantangan Hati Emas Ekstra",
            "challenge_points": ["💖 Buat item Hati Emas langka yang menambah nyawa (+1)", "☠️ Gandakan apel beracun saat skor sudah melewati 15 poin", "🏆 Raih skor 30 tanpa kehilangan 1 nyawa pun!"],
            "challenge_target": "Sistem 3 nyawa stabil dengan buah beracun dan efek kedip kebal!",
            "debugging_points": [
                "🐛 <strong>Bug: Sekali sentuh racun, 3 nyawa langsung lenyap sekaligus.</strong><br><em>Solusi:</em> Langsung pindahkan apel beracun ke atas atau beri delay <code>wait 0.5 secs</code>!",
                "🐛 <strong>Bug: Game Over tidak muncul saat nyawa 0.</strong><br><em>Solusi:</em> Cek pembanding: <code>if &lt;Nyawa &lt; 1&gt;</code> (artinya saat nyawa = 0).",
                "🐛 <strong>Bug: Apel beracun dan apel merah jatuh bersamaan di titik sama.</strong><br><em>Solusi:</em> Beri nilai <code>pick random</code> posisi X dan delay kemunculan yang berbeda."
            ],
            "debugging_tip": "Setiap deteksi tabrakan yang mengurangi nilai harus memiliki pemisah (delay atau teleport) agar tidak terhitung berkali-kali dalam 1 detik!",
            "summary_points": ["1️⃣ <strong>Nyawa:</strong> Sumber daya utama pemain yang harus dijaga", "2️⃣ <strong>Rintangan:</strong> Menghadirkan bahaya yang menuntut kehati-hatian", "3️⃣ <strong>Kondisi Kalah:</strong> Game Over dipicu saat batas toleransi habis", "4️⃣ <strong>Invincibility:</strong> Waktu perlindungan sejenak setelah cedera"],
            "next_teaser_title": "Sesi 17: Multi-Level Switching & Badai Hutan Malam! 🌙", "next_teaser_points": ["🌙 <strong>Pindah Level:</strong> Berganti latar belakang ke Hutan Malam Berangin", "🌪️ <strong>Kecepatan Dinamis:</strong> Apel jatuh lebih cepat dan bergoyang miring", "🎺 <strong>Banner Level Up:</strong> Efek transisi antar level yang megah"]
        }),

        (17, "Multi-Level Switching & Kenaikan Tingkat Kesulitan", "Pergantian Latar Panggung (Backdrops) & Tantangan Badai Angin", "Sesi 17 • Multi-Level", "🌙", {
            "goal_title": "Naik Level: Badai Hutan Malam!", "goal_desc": "Menerapkan sistem multi-level di mana latar panggung berubah dan kecepatan jatuh bertambah dinamis.",
            "key_blocks": ["switch backdrop to [Level 2]", "set [Kecepatan] to (-9)", "if <Skor > 10> then"],
            "core_concepts": ["State Management", "Dynamic Difficulty", "Backdrop Switching"],
            "concept_name": "Multi-Level & Progresi Kesulitan", "concept_explanation": "Game yang datar membuat pemain bosan. Saat pemain berhasil mencapai target, game harus naik level dengan tantangan baru yang lebih seru!",
            "concept_points": ["🌅 Level 1: Siang Hari yang tenang (Kecepatan -5)", "🌙 Level 2: Hutan Malam berbadai (Kecepatan -9, angin miring)", "⚡ Kecepatan disimpan dalam variabel dinamis", "🎉 Suara terompet kemenangan menyambut kenaikan level"],
            "analogy": "Seperti naik kelas di sekolah: materinya semakin menantang, tapi kita semakin pintar dan bangga!",
            "key_block_title": "Logika Pindah Level Otomatis",
            "code_snippet_1": '<span style="color:#a855f7;">if &lt;Skor &gt; 10&gt; and &lt;Level = 1&gt; then</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">set [Level] to (2)</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">switch backdrop to [Night Forest]</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">set [Kecepatan] to (-9)</span><br>&nbsp;&nbsp;<span style="color:#ec4899;">start sound [Level Up Fanfare]</span>',
            "step_title": "Menghubungkan Kecepatan ke Variabel",
            "step_points": ["1️⃣ Buat variabel <code>Level</code> dan <code>Kecepatan Jatuh</code>", "2️⃣ Ganti angka -6 pada apel dengan balok variabel <code>(Kecepatan Jatuh)</code>", "3️⃣ Saat skor mencapai 10, ubah kecepatan menjadi -9", "4️⃣ Tambahkan efek goyangan angin horizontal <code>change x by (random)</code>"],
            "code_snippet_2": '<span style="color:#f59e0b;">forever</span> {<br>&nbsp;&nbsp;<span style="color:#38bdf8;">change y by (Kecepatan Jatuh)</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">if &lt;Level = 2&gt; then</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#38bdf8;">change x by (pick random -3 to 3)</span><br>}',
            "interaction_title": "Spanduk 'LEVEL UP!' di Tengah Layar", "audio_effect": "Suara gemuruh angin badai dan musik terompet kemenangan", "visual_effect": "Banner tulisan LEVEL UP membesar lalu memudar secara megah", "feedback_desc": "Pemain merasa sangat bangga karena berhasil menaklukkan level pertama!",
            "advanced_title": "Level 3: Hujan Meteor Kilat", "advanced_text": "Jika pemain sanggup mencapai skor 25, bawa mereka ke Level 3 dengan latar luar angkasa!",
            "advanced_points": ["🚀 Latar panggung Galaksi Luar Angkasa", "⚡ Kecepatan apel bertambah menjadi -12", "💥 Rintangan batu meteor yang berputar cepat"],
            "code_snippet_3": '<span style="color:#a855f7;">if &lt;Skor &gt; 25&gt; then</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">set [Level] to (3)</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">switch backdrop to [Space Stars]</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">set [Kecepatan] to (-12)</span>',
            "challenge_title": "Desain Panggung Level Sendiri",
            "challenge_points": ["🎨 Gambar sendiri 2 backdrop panggung dengan tema unik", "⚖️ Uji keseimbangan game: pastikan Level 2 menantang tapi tetap bisa dimenangkan", "⏱️ Buat waktu bonus +10 detik saat berhasil naik level"],
            "challenge_target": "Game multi-level fungsional dengan minimal 2 level bertingkat!",
            "debugging_points": [
                "🐛 <strong>Bug: Langsung mulai di Level 2 saat bendera hijau diklik.</strong><br><em>Solusi:</em> Pastikan selalu ada <code>set [Level] to (1)</code> saat bendera hijau diklik!",
                "🐛 <strong>Bug: Musik level 1 dan level 2 bertabrakan.</strong><br><em>Solusi:</em> Hentikan suara lama dengan <code>stop all sounds</code> sebelum memutar musik baru.",
                "🐛 <strong>Bug: Kecepatan tidak berubah.</strong><br><em>Solusi:</em> Cek apakah balok <code>change y by</code> sudah menggunakan bulatan variabel <code>Kecepatan</code>."
            ],
            "debugging_tip": "Variabel dinamis memungkinkan 1 skrip kode berlaku untuk banyak level tanpa perlu menyalin kode berulang-ulang!",
            "summary_points": ["1️⃣ <strong>Progresi:</strong> Mengatur tingkat kesulitan bertahap agar game seru", "2️⃣ <strong>Variabel Fleksibel:</strong> Mengontrol kecepatan dengan variabel, bukan angka kaku", "3️⃣ <strong>Backdrop Switching:</strong> Mengubah suasana visual game secara dramatis", "4️⃣ <strong>Game Balancing:</strong> Seni menyeimbangkan tantangan dan keadilan game"],
            "next_teaser_title": "Sesi 18: Fisika Karakter Melompat & Gravitasi Layar! 🦘", "next_teaser_points": ["🦘 <strong>Lompatan Nyata:</strong> Karakter melompat ke atas lalu tertarik kembali ke tanah", "📈 <strong>Velocity Y:</strong> Konsep kecepatan vertikal ala game Mario Bros", "🧱 <strong>Platform Tanah:</strong> Mendarat mulus di atas pijakan lantai"]
        }),

        (18, "Fisika Lompat Karakter (Gravitasi & Velocity Y)", "Mensimulasikan Hukum Gravitasi & Lompatan Karakter ala Super Mario", "Sesi 18 • Fisika Gravitasi", "🦘", {
            "goal_title": "Fisika Melompat & Gravitasi!", "goal_desc": "Mempelajari rumus fisika dasar kecepatan vertikal (Velocity Y) untuk membuat karakter melompat realistis.",
            "key_blocks": ["change [Kecepatan Y] by (-1)", "change y by (Kecepatan Y)", "set [Kecepatan Y] to (12)"],
            "core_concepts": ["Gravity Simulation", "Velocity Y (Vertical Momentum)", "Collision Detection (Ground)"],
            "concept_name": "Gravitasi & Kecepatan Lompat", "concept_explanation": "Ketika kamu melompat di dunia nyata, tubuhmu melesat cepat ke atas, melambat di puncak, lalu tertarik semakin kencang kembali ke tanah. Itulah gravitasi!",
            "concept_points": ["🚀 Saat tombol Spasi ditekan: dorong kecepatan ke atas (+12)", "🌍 Setiap detik, gravitasi bumi menarik ke bawah (-1)", "🛑 Saat menyentuh tanah: hentikan gravitasi (Kecepatan Y = 0)", "🔒 Mencegah melompat di udara jika belum menyentuh lantai"],
            "analogy": "Seperti melempar bola ke atas: bola melesat kencang, berhenti sepersekian detik di puncak, lalu jatuh kembali ke tanganmu!",
            "key_block_title": "Loop Gravitasi Fisika 2D",
            "code_snippet_1": '<span style="color:#fbbf24;">when 🏴 clicked</span><br><span style="color:#f59e0b;">forever</span> {<br>&nbsp;&nbsp;<span style="color:#f59e0b;">change [Kecepatan Y] by (-1)</span><br>&nbsp;&nbsp;<span style="color:#38bdf8;">change y by (Kecepatan Y)</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">if &lt;touching [Tanah]?&gt; then</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#f59e0b;">set [Kecepatan Y] to (0)</span><br>}',
            "step_title": "Merakit Tombol Lompat Spasi",
            "step_points": ["1️⃣ Buat variabel baru bernama <code>Kecepatan Y</code>", "2️⃣ Pasang gravitasi konstan yang mengurangi Kecepatan Y sebesar -1", "3️⃣ Jika tombol Spasi ditekan DAN menyentuh tanah: isi Kecepatan Y = 12", "4️⃣ Karakter akan melompat parabolik dengan sangat mulus!"],
            "code_snippet_2": '<span style="color:#a855f7;">if &lt;key [space] pressed?&gt; and &lt;touching [Tanah]?&gt; then</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">set [Kecepatan Y] to (12)</span><br>&nbsp;&nbsp;<span style="color:#ec4899;">start sound [Jump]</span>',
            "interaction_title": "Efek Debu Saat Mendarat", "audio_effect": "Suara 'Boing!' kartun saat melompat dan 'Thud' saat mendarat", "visual_effect": "Sedikit efek pipih pada tubuh karakter saat menyentuh lantai", "feedback_desc": "Lompatan terasa bertenaga dan memiliki bobot fisik yang meyakinkan!",
            "advanced_title": "Lompat Dua Kali (Double Jump)", "advanced_text": "Tambahkan variabel batas loncatan agar karakter bisa melompat satu kali lagi di udara!",
            "advanced_points": ["🦘 Variabel <code>Bisa Double Jump</code> disetel ke 1", "✨ Tekan spasi kedua kali untuk loncat ekstra di udara", "🔒 Reset kembali saat menyentuh tanah"],
            "code_snippet_3": '<span style="color:#a855f7;">if &lt;key [space] pressed?&gt; and &lt;Bisa Jump = 1&gt; then</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">set [Kecepatan Y] to (10)</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">set [Bisa Jump] to (0)</span>',
            "challenge_title": "Lintasan Rintangan Melompat",
            "challenge_points": ["🧱 Buat 3 balok pijakan platform di ketinggian berbeda", "🐝 Pandu Beeby melompati jurang duri menuju sarang madu", "⭐ Kumpulkan koin yang melayang di udara saat melompat"],
            "challenge_target": "Karakter melompat dengan fisika gravitasi tanpa tembus lantai!",
            "debugging_points": [
                "🐛 <strong>Bug: Karakter tenggelam masuk ke dalam tanah.</strong><br><em>Solusi:</em> Tambahkan blok <code>change y by (1)</code> di dalam loop perbaikan tanah.",
                "🐛 <strong>Bug: Karakter bisa terbang terus jika tombol spasi ditahan.</strong><br><em>Solusi:</em> Wajib pasang syarat <code>and &lt;touching Tanah&gt;</code> pada tombol loncat!",
                "🐛 <strong>Bug: Lompatan terlalu rendah atau terlalu tinggi ke awan.</strong><br><em>Solusi:</em> Sesuaikan angka awal lompat (misal 10 s/d 14) dan gravitasi (-1)."
            ],
            "debugging_tip": "Fondasi fisika Velocity Y adalah kunci dari seluruh game platformer legendaris dunia dari Mario hingga Sonic!",
            "summary_points": ["1️⃣ <strong>Kecepatan Y:</strong> Variabel momentum yang menentukan naik atau turun", "2️⃣ <strong>Gravitasi:</strong> Pengurang kecepatan vertikal yang konstan", "3️⃣ <strong>Deteksi Tanah:</strong> Penghenti jatuh saat karakter mendarat", "4️⃣ <strong>Kontrol Udara:</strong> Membatasi lompatan hanya saat kaki menapak lantai"],
            "next_teaser_title": "Sesi 19: Game Flappy Bee: Menembus Pipa Rintangan! 🐝", "next_teaser_points": ["🐝 <strong>Flappy Mechanics:</strong> Menggabungkan lompatan spasi dengan rintangan bergerak", "🎋 <strong>Pipa Scrolling:</strong> Pipa bergerak dari kanan ke kiri secara tiada henti", "🎯 <strong>Skor Celah:</strong> Meraih poin setiap kali berhasil menembus lorong pipa"]
        }),

        (19, "Game Flappy Bee: Menembus Pipa Rintangan", "Merakit Game Legendaris Flappy Bird dengan Logika Pipa Bergerak", "Sesi 19 • Flappy Bee", "🐝", {
            "goal_title": "Flappy Bee: Terbang Tembus Pipa!", "goal_desc": "Menggabungkan fisika gravitasi dengan pipa rintangan yang bergerak menyamping dari kanan ke kiri.",
            "key_blocks": ["change x by (-6)", "go to y: (pick random -70 to 70)", "create clone of [Pipe]"],
            "core_concepts": ["Side-scrolling Obstacles", "Periodic Cloning", "Passage Clearance Detection"],
            "concept_name": "Ilusi Gerak Pipa (Side-Scrolling)", "concept_explanation": "Tahukah kamu rahasia game Flappy? Lebah sebenarnya tidak pernah maju ke depan! Yang bergerak adalah rintangan pipa dari kanan menuju ke kiri!",
            "concept_points": ["🐝 Posisi X lebah tetap terkunci di X: -100", "🎋 Pipa muncul di kanan (X: 240) dan meluncur ke kiri (X: -240)", "🎲 Celah lubang pipa diacak ketinggiannya dengan <code>pick random</code>", "🎯 Jika lebah menyentuh pipa atau lantai -> Game Over!"],
            "analogy": "Seperti berlari di atas treadmill: kita tetap di tempat, tapi pemandangan di sekitar kita yang bergerak mundur!",
            "key_block_title": "Logika Kloning & Luncuran Pipa",
            "code_snippet_1": '<span style="color:#fbbf24;">when I start as a clone</span><br><span style="color:#38bdf8;">go to x: (240) y: (pick random -70 to 70)</span><br><span style="color:#a855f7;">show</span><br><span style="color:#f59e0b;">repeat until &lt;x position &lt; -240&gt;</span> {<br>&nbsp;&nbsp;<span style="color:#38bdf8;">change x by (-6)</span><br>}<br><span style="color:#ef4444;">delete this clone</span>',
            "step_title": "Mendeteksi Skor Lolos Pipa",
            "step_points": ["1️⃣ Kloning pipa setiap 2 detik menggunakan loop <code>forever [wait 2 secs -> clone]</code>", "2️⃣ Buat sprite pipa atas dan pipa bawah dengan celah di tengah", "3️⃣ Saat posisi X pipa melewati lebah: tambah skor +1", "4️⃣ Hapus klon pipa begitu keluar di sisi kiri layar"],
            "code_snippet_2": '<span style="color:#fbbf24;">when 🏴 clicked</span><br><span style="color:#f59e0b;">forever</span> {<br>&nbsp;&nbsp;<span style="color:#a855f7;">create clone of [myself]</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">wait (1.8) secs</span><br>}',
            "interaction_title": "Animasi Kepakan Sayap Lebah", "audio_effect": "Suara 'Wing Flap' setiap kali spasi ditekan dan 'Point Ding' saat lolos", "visual_effect": "Sprite lebah menunduk ke bawah saat jatuh dan mendongak saat terbang", "feedback_desc": "Gerakan lebah yang lincah memberi kepuasan manuver yang sangat seru!",
            "advanced_title": "Kecepatan Pipa Bertahap", "advanced_text": "Setiap 5 pipa yang berhasil dilewati, percepat luncuran pipa agar permainan semakin memacu adrenalin!",
            "advanced_points": ["⚡ Skor 5: Kecepatan -7", "⚡ Skor 10: Kecepatan -8", "⚡ Skor 15: Celah pipa mengecil 10%"],
            "code_snippet_3": '<span style="color:#a855f7;">if &lt;touching [Bee]?&gt; then</span><br>&nbsp;&nbsp;<span style="color:#ec4899;">start sound [Hit Crash]</span><br>&nbsp;&nbsp;<span style="color:#ec4899;">broadcast [Game Over]</span>',
            "challenge_title": "Tantangan Flappy Master",
            "challenge_points": ["🎋 Rancang celah pipa yang pas: tidak terlalu sempit dan tidak terlalu longgar", "🪙 Letakkan koin bunga madu di tengah celah pipa untuk bonus poin", "🏆 Siapa yang bisa mencapai skor 10 di sesi ini?"],
            "challenge_target": "Game Flappy Bee utuh dengan sistem kloning pipa berkala dan skor lolos!",
            "debugging_points": [
                "🐛 <strong>Bug: Pipa menumpuk di sisi kiri layar dan tidak hilang.</strong><br><em>Solusi:</em> Cek blok <code>delete this clone</code> pada akhir perulangan repeat until.",
                "🐛 <strong>Bug: Celah pipa berada di luar layar panggung.</strong><br><em>Solusi:</em> Batasi angka acak Y pada <code>pick random -60 to 60</code>.",
                "🐛 <strong>Bug: Skor bertambah 10 kali dalam satu pipa.</strong><br><em>Solusi:</em> Gunakan variabel penanda (flag) atau hanya tambah skor saat pipa tepat di posisi lebah."
            ],
            "debugging_tip": "Ilusi gerak side-scrolling adalah teknik utama yang menghemat komputasi pada game 2D!",
            "summary_points": ["1️⃣ <strong>Side-scrolling:</strong> Memindahkan rintangan untuk menciptakan ilusi karakter maju", "2️⃣ <strong>Pipa Generator:</strong> Melahirkan rintangan secara teratur dengan kloning", "3️⃣ <strong>Celah Acak:</strong> Mengubah ketinggian celah dengan Pick Random", "4️⃣ <strong>Hitbox:</strong> Menghindari tabrakan fisik dengan presisi tinggi"],
            "next_teaser_title": "Sesi 20: Papan Rekor Tertinggi (High Score System)! 🏆", "next_teaser_points": ["🏆 <strong>High Score:</strong> Menyimpan rekor angka tertinggi sepanjang masa", "⚖️ <strong>Operator Logika:</strong> Membandingkan apakah skor baru melampaui rekor lama", "🎊 <strong>New Record:</strong> Suara kembang api selebrasi saat rekor pecah"]
        }),

        (20, "Papan Peringkat Sederhana (High Score System)", "Menyimpan Rekor Skor Tertinggi & Memotivasi Pemain Menang", "Sesi 20 • High Score System", "🏆", {
            "goal_title": "Pecahkan Rekormu: High Score System!", "goal_desc": "Membangun sistem pembanding skor tertinggi yang memotivasi pemain untuk terus menantang dirinya sendiri.",
            "key_blocks": ["if <Skor > HighScore> then", "set [HighScore] to (Skor)", "broadcast [New Record!]"],
            "core_concepts": ["Data Comparison Operators", "Persistent State Concept", "Reward Psychology"],
            "concept_name": "Sistem Rekor Tertinggi", "concept_explanation": "Mengapa kita ingin main lagi setelah kalah? Karena ada rekor angka tertinggi yang ingin kita kalahkan! Itulah kekuatan psikologi High Score!",
            "concept_points": ["📊 Variabel 1: <code>Skor Sekarang</code> (Reset ke 0 setiap ronde)", "🏆 Variabel 2: <code>Rekor Tertinggi</code> (Menyimpan nilai terbaik)", "⚖️ Operator <code>&gt;</code> (Lebih Besar): Mengecek apakah skor baru melampaui rekor lama", "🎉 Selebrasi instan saat rekor baru berhasil dipecahkan!"],
            "analogy": "Seperti mistar lompat tinggi: setiap kali ada atlet melompat lebih tinggi, mistar dinaikkan ke rekor yang baru!",
            "key_block_title": "Rumus Emas Pembanding Rekor",
            "code_snippet_1": '<span style="color:#a855f7;">if &lt;Skor &gt; HighScore&gt; then</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">set [HighScore] to (Skor)</span><br>&nbsp;&nbsp;<span style="color:#ec4899;">broadcast [Rekor Baru]</span><br>&nbsp;&nbsp;<span style="color:#ec4899;">start sound [Cheer Applause]</span>',
            "step_title": "Menampilkan Papan Skor di Layar",
            "step_points": ["1️⃣ Buat dua variabel: <code>Skor</code> dan <code>HighScore</code>", "2️⃣ Jangan pernah me-reset HighScore ke 0 saat bendera hijau diklik!", "3️⃣ Cek pembanding skor di akhir permainan atau setiap kali mendapat poin", "4️⃣ Tampilkan banner bertuliskan 'REKOR BARU TERCIPTA!'"],
            "code_snippet_2": '<span style="color:#fbbf24;">when 🏴 clicked</span><br><span style="color:#f59e0b;">set [Skor] to (0)</span><br><span style="color:#64748b;">// HighScore dibiarkan menyimpan nilai rekor sesi!</span>',
            "interaction_title": "Animasi Trofi Emas Bercahaya", "audio_effect": "Tepuk tangan meriah dan suara terompet selebrasi", "visual_effect": "Ikon trofi emas melompat-lompat di samping angka High Score", "feedback_desc": "Pemain merasa sangat bangga dan ingin mengulang bermain untuk memecahkan rekornya lagi!",
            "advanced_title": "Kategori Peringkat Bintang", "advanced_text": "Tampilkan medali perunggu (Skor 5), perak (Skor 15), atau emas (Skor 25) sesuai pencapaian akhir pemain!",
            "advanced_points": ["🥉 Skor 5–14: Medali Perunggu Cilik", "🥈 Skor 15–24: Medali Perak Hebat", "🥇 Skor 25+: Trofi Emas Grand Master"],
            "code_snippet_3": '<span style="color:#a855f7;">if &lt;Skor &gt; 25&gt; then</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">switch costume to [Trofi Emas]</span><br><span style="color:#a855f7;">else if &lt;Skor &gt; 15&gt; then</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">switch costume to [Medali Perak]</span>',
            "challenge_title": "Papan Rekor Kelas",
            "challenge_points": ["🏆 Tantang teman sebangku untuk mencoba memecahkan High Score di komputermu", "📝 Tuliskan nama pemegang rekor di layar permainan", "⭐ Buat tombol Reset High Score khusus instruktur dengan kode rahasia"],
            "challenge_target": "Sistem High Score otomatis yang memperbarui rekor tertinggi secara akurat!",
            "debugging_points": [
                "🐛 <strong>Bug: High Score selalu kembali ke 0 setiap kali game dimulai ulang.</strong><br><em>Solusi:</em> Hapus blok <code>set [HighScore] to (0)</code> dari bawah bendera hijau!",
                "🐛 <strong>Bug: Rekor baru tidak terpicu meski skor sudah lebih tinggi.</strong><br><em>Solusi:</em> Pastikan menggunakan operator tanda lebih besar (<code>&gt;</code>), bukan lebih kecil (<code>&lt;</code>).",
                "🐛 <strong>Bug: Suara tepuk tangan berbunyi berulang-ulang tanpa henti.</strong><br><em>Solusi:</em> Pasang syarat penanda agar suara hanya berbunyi 1 kali saat rekor pecah."
            ],
            "debugging_tip": "Memori variabel yang tidak di-reset saat start adalah cara Scratch menyimpan data sementara antar ronde permainan!",
            "summary_points": ["1️⃣ <strong>Operator > :</strong> Membandingkan dua nilai numerik secara logis", "2️⃣ <strong>High Score Logic:</strong> Menyimpan nilai puncak permainan", "3️⃣ <strong>Penyimpanan Sesi:</strong> Menjaga rekor tetap tersimpan selama proyek terbuka", "4️⃣ <strong>Gamifikasi:</strong> Memotivasi pemain dengan target yang terukur"],
            "next_teaser_title": "Sesi 21: Musik Game Dinamis & Tombol Mute UI! 🎵", "next_teaser_points": ["🎵 <strong>Background Music (BGM):</strong> Memutar lagu latar yang seru sepanjang permainan", "🔇 <strong>Tombol Mute UI:</strong> Tombol interaktif untuk mematikan/menyalakan suara", "🎛️ <strong>Kontrol Volume:</strong> Mengatur volume suara agar nyaman di telinga"]
        }),

        (21, "Efek Suara Latar Dinamis & Tombol Mute UI", "Desain User Experience (UX): Musik Latar (BGM) & Kontrol Suara", "Sesi 21 • BGM & Mute UI", "🎵", {
            "goal_title": "Irama Game & Tombol Mute UI!", "goal_desc": "Menerapkan musik latar (BGM) yang berputar halus dan tombol interaktif UI untuk mematikan atau menyalakan suara.",
            "key_blocks": ["play sound [BGM] until done", "set volume to (0%)", "if <Mute = 1> then switch costume to [Muted]"],
            "core_concepts": ["User Experience (UX)", "Audio Looping", "Toggle State Logic"],
            "concept_name": "User Experience & Kontrol Audio", "concept_explanation": "Game yang hebat harus memikirkan kenyamanan pemainnya. Musik membuat game menyenangkan, tetapi pemain juga harus punya kebebasan mematikan suara kapan saja!",
            "concept_points": ["🎵 BGM (Background Music): Musik yang berulang terus menerus di latar belakang", "🔊 SFX (Sound Effects): Efek suara aksi singkat seperti lompat atau koin", "🔘 Tombol Toggle Mute: Tombol switch ON / OFF di sudut layar", "👂 Kenyamanan bermain: Tidak memekakkan telinga pemain dan orang di sekitarnya"],
            "analogy": "Seperti remote TV: kamu punya tombol Mute untuk mematikan suara saat ada orang lain yang sedang berbicara!",
            "key_block_title": "Loop Musik Latar Tanpa Henti",
            "code_snippet_1": '<span style="color:#fbbf24;">when 🏴 clicked</span><br><span style="color:#f59e0b;">forever</span> {<br>&nbsp;&nbsp;<span style="color:#ec4899;">play sound [BGM Loop] until done</span><br>}',
            "step_title": "Merakit Tombol Mute Interaktif",
            "step_points": ["1️⃣ Buat sprite tombol speaker dengan 2 kostum: Speaker ON dan Speaker OFF", "2️⃣ Tempatkan di pojok kanan atas layar panggung", "3️⃣ Saat sprite tombol diklik: balik status variabel <code>Mute</code> (0 menjadi 1, 1 menjadi 0)", "4️⃣ Atur volume Scratch: jika Mute = 1, volume 0%. Jika Mute = 0, volume 100%!"],
            "code_snippet_2": '<span style="color:#fbbf24;">when this sprite clicked</span><br><span style="color:#a855f7;">if &lt;Mute = 0&gt; then</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">set [Mute] to (1)</span><br>&nbsp;&nbsp;<span style="color:#ec4899;">set volume to (0)%</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">switch costume to [Icon Mute]</span><br><span style="color:#a855f7;">else</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">set [Mute] to (0)</span><br>&nbsp;&nbsp;<span style="color:#ec4899;">set volume to (100)%</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">switch costume to [Icon Sound]</span>',
            "interaction_title": "Tombol Berkilau Saat Diklik", "audio_effect": "Suara 'Click Toggle' lembut saat tombol speaker ditekan", "visual_effect": "Ikon speaker berubah dari gelombang suara menjadi tanda silang merah", "feedback_desc": "Pemain memiliki kendali penuh atas audio permainan tanpa mengganggu jalannya game!",
            "advanced_title": "Pengaturan Volume Bertingkat", "advanced_text": "Tambahkan slider volume agar pemain bisa mengatur tingkat kekerasan suara dari 0% sampai 100%!",
            "advanced_points": ["🎚️ Ubah variabel Volume menjadi mode Slider di panggung", "🔊 Gunakan blok <code>set volume to (Volume)%</code>", "🎶 Cocok untuk bermain di tempat umum atau kelas"],
            "code_snippet_3": '<span style="color:#f59e0b;">forever</span> {<br>&nbsp;&nbsp;<span style="color:#ec4899;">set volume to (SliderVolume)%</span><br>}',
            "challenge_title": "Studio Musik Mandiri",
            "challenge_points": ["🎵 Pilih musik retro 8-bit atau lo-fi yang menenangkan dari perpustakaan Scratch", "🎛️ Tempatkan tombol Mute rapi di pojok kanan atas agar tidak tertabrak lebah", "🎧 Pastikan efek suara SFX tetap seimbang dengan volume musik latar"],
            "challenge_target": "BGM berputar mulus dengan tombol toggle Mute responsif!",
            "debugging_points": [
                "🐛 <strong>Bug: Lagu berputar tumpang tindih ratusan kali dan memekakkan telinga.</strong><br><em>Solusi:</em> Gunakan blok <code>play sound UNTIL DONE</code>, jangan gunakan <code>start sound</code> di dalam forever loop!",
                "🐛 <strong>Bug: Tombol Mute tidak berfungsi mematikan suara.</strong><br><em>Solusi:</em> Cek apakah blok <code>set volume to (0)%</code> sudah terpanggil.",
                "🐛 <strong>Bug: Kostum tombol tidak berganti saat diklik.</strong><br><em>Solusi:</em> Periksa nama kostum pada blok <code>switch costume to</code>."
            ],
            "debugging_tip": "Gunakan selalu 'play sound ... until done' di dalam perulangan musik agar Scratch menunggu lagu selesai sebelum mengulanginya dari awal!",
            "summary_points": ["1️⃣ <strong>BGM Loop:</strong> Memutar trek audio secara berkesinambungan", "2️⃣ <strong>Toggle Logic:</strong> Logika sakelar dua keadaan (ON / OFF)", "3️⃣ <strong>Volume Control:</strong> Mengatur tingkat kenyamanan pendengaran pemain", "4️⃣ <strong>UI Placement:</strong> Menata tombol antarmuka di sudut strategis"],
            "next_teaser_title": "Sesi 22: Jadi Arsitek Game: Sketsa Storyboard Capstone! 📝", "next_teaser_points": ["📐 <strong>Game Design Document:</strong> Merancang konsep game impian di lembar kerja", "🎨 <strong>Storyboard Sketsa:</strong> Menggambar alur level, karakter pahlawan, dan rintangan", "💡 <strong>Pra-Produksi:</strong> Mempersiapkan proyek Capstone akbar Semester 1"]
        }),

        (22, "Brainstorming & Sketsa Storyboard Capstone Level 2", "Merancang Game Impian di Lembar Game Design Document (GDD) Cilik", "Sesi 22 • Game Storyboard", "📝", {
            "goal_title": "Jadi Arsitek Game Impian!", "goal_desc": "Merancang konsep, alur cerita, karakter, dan mekanisme game Capstone Level 2 di atas lembar kerja Storyboard.",
            "key_blocks": ["Game Design Document (GDD)", "Storyboard Sketsa Visual", "Milestone Checklist"],
            "core_concepts": ["Game Design Methodology", "Pre-Production Planning", "Creative Storyboarding"],
            "concept_name": "Pra-Produksi & Storyboard Game", "concept_explanation": "Programmer profesional tidak langsung buru-buru koding di depan layar! Mereka merancang peta jalan, menggambar sketsa karakter, dan menyusun aturan main di atas kertas terlebih dahulu!",
            "concept_points": ["📝 <strong>GDD Cilik:</strong> Dokumen perancangan berisi judul, tema, dan aturan main", "🎨 <strong>Storyboard:</strong> Komik sketsa alur layar dari Menu Mulai hingga Game Over", "⚖️ <strong>3 Pilar Wajib:</strong> Gerak/Fisika, Skor/Tantangan, dan Audio/UI", "🎯 <strong>Fokus:</strong> Membuat 1 mekanik inti yang sangat asik dimainkan"],
            "analogy": "Seperti arsitek yang menggambar denah rumah sebelum tukang bangunan mulai menyusun batu bata!",
            "key_block_title": "Lembar Kerja Rancang Game Beekoding",
            "code_snippet_1": '📋 LEMBAR GDD CAPSTONE LEVEL 2:<br>1. Judul Game: [Karyamu Sendiri]<br>2. Karakter Utama: [Pahlawan & Kemampuannya]<br>3. Misi Permainan: [Target yang Harus Dicapai]<br>4. Rintangan Utama: [Bahaya yang Dihindari]<br>5. Fitur Keren: [Fisika / Partikel / High Score]',
            "step_title": "Menyusun Alur Panggung Permainan",
            "step_points": ["1️⃣ Layar 1: Menu Pembuka (Judul Game & Tombol Play)", "2️⃣ Layar 2: Arena Permainan (Karakter, Rintangan, Skor, Nyawa)", "3️⃣ Layar 3: Layar Kemenangan (Piala, High Score, Tombol Main Lagi)", "4️⃣ Tuliskan daftar balok Scratch yang akan digunakan untuk tiap fitur!"],
            "code_snippet_2": '🎯 MILESTONES PENGERJAAN:<br>• Milestone 1: Panggung & Karakter (Selesai Menit 30)<br>• Milestone 2: Logika Fisika & Kontrol (Selesai Menit 50)<br>• Milestone 3: Skor, Nyawa & Rintangan (Selesai Menit 70)<br>• Milestone 4: Poles Audio & Partikel (Selesai Menit 85)',
            "interaction_title": "Sesi Presentasi Ide Kilat", "audio_effect": "Suara tepuk tangan semangat saat murid menceritakan ide gamenya", "visual_effect": "Sketsa lembar kerja dipamerkan di depan teman sekelas", "feedback_desc": "Teman sekelas dan instruktur memberi masukan positif yang memperkaya ide game!",
            "advanced_title": "Inovasi Mekanik Unik", "advanced_text": "Pikirkan satu fitur unik yang belum pernah ada: gravitasi terbalik, portal teleportasi, atau musuh yang bisa membelah diri!",
            "advanced_points": ["🌀 Portal Dimensi yang memindahkan karakter ke sisi lain", "🧲 Magnet koin madu yang menarik skor otomatis", "⏳ Jam beku waktu yang menghentikan rintangan 3 detik"],
            "code_snippet_3": '💡 IDE INOVASI UNIK:<br>"Bagaimana jika karakter lebah bisa menembakkan gelembung madu untuk menjebak musuh laba-laba?"',
            "challenge_title": "Penyelesaian Lembar Rancang Game",
            "challenge_points": ["✏️ Lengkapi seluruh kolom di Lembar Game Sheet Beekoding", "🎨 Warnai sketsa karakter utama dan musuh dengan spidol warna", "🗣️ Ceritakan ide gamemu dalam 1 menit di depan mentor"],
            "challenge_target": "Lembar GDD dan Storyboard lengkap siap diproduksi di Sesi 23!",
            "debugging_points": [
                "🐛 <strong>Peringatan Mentor: Ide terlalu rumit (Feature Creep).</strong><br><em>Solusi:</em> Pilih 1 mekanik utama dulu. Fitur tambahan bisa dikerjakan setelah fitur inti selesai!",
                "🐛 <strong>Peringatan Mentor: Lupa menentukan kondisi kalah dan menang.</strong><br><em>Solusi:</em> Pastikan pemain tahu persis kapan mereka menang dan kapan kalah.",
                "🐛 <strong>Peringatan Mentor: Waktu pengerjaan tidak cukup.</strong><br><em>Solusi:</em> Gunakan milestone checklist untuk mengontrol target waktu pengerjaan."
            ],
            "debugging_tip": "Game yang sederhana namun selesai sempurna jauh lebih membanggakan daripada game raksasa yang belum bisa dimainkan!",
            "summary_points": ["1️⃣ <strong>Pra-Produksi:</strong> Tahap perencanaan fondasi sebelum mulai mengetik kode", "2️⃣ <strong>GDD:</strong> Dokumen panduan arah pengembangan game", "3️⃣ <strong>Storyboard:</strong> Gambaran visual alur pengalaman pemain", "4️⃣ <strong>Fokus & Realistis:</strong> Memastikan proyek dapat diselesaikan tepat waktu"],
            "next_teaser_title": "Sesi 23: Studio Produksi Game Mandiri Bersama Mentor! 💻", "next_teaser_points": ["💻 <strong>Studio Coding:</strong> Membangun game impian sesuai sketsa Storyboard", "🛠️ <strong>Perakitan Modular:</strong> Menggabungkan fisika, rintangan, skor, dan UI", "👥 <strong>Playtesting:</strong> Saling mencoba game teman dan membasmi bug"]
        }),

        (23, "Produksi Proyek Mandiri: Game Platformer Cilik", "Studio Pemrograman Mandiri dengan Bimbingan 1-on-1 Mentor", "Sesi 23 • Studio Produksi", "💻", {
            "goal_title": "Studio Kreator: Rakit Gamemu!", "goal_desc": "Mewujudkan sketsa Storyboard Sesi 22 menjadi game fungsional utuh dengan pendampingan intensif instruktur.",
            "key_blocks": ["Modular Coding", "My Blocks Custom Functions", "Peer Playtesting"],
            "core_concepts": ["Independent Game Production", "Iterative Development", "Peer Review & Playtesting"],
            "concept_name": "Studio Pemrograman Mandiri", "concept_explanation": "Hari ini kelas berubah menjadi Studio Game profesional! Setiap murid adalah Lead Programmer yang bertanggung jawab membangun karyanya sendiri langkah demi langkah!",
            "concept_points": ["🛠️ Ikuti rancangan Storyboard yang sudah dibuat di Sesi 22", "🧩 Rakit per bagian: Karakter -> Fisika -> Rintangan -> Skor -> Audio", "🔍 Lakukan tes permainan setiap kali menambahkan 1 fitur baru", "🤝 Mentor siap membantu 1-on-1 jika kamu menemui jalan buntu"],
            "analogy": "Seperti koki profesional yang memasak resep andalannya: mencicipi kuah setiap kali menambah bumbu baru agar rasanya pas!",
            "key_block_title": "Rapi dengan My Blocks (Fungsi Buatan)",
            "code_snippet_1": '<span style="color:#a855f7;">define [Lompat Fisika]</span><br>&nbsp;&nbsp;<span style="color:#f59e0b;">change [Kecepatan Y] by (-1)</span><br>&nbsp;&nbsp;<span style="color:#38bdf8;">change y by (Kecepatan Y)</span><br><br><span style="color:#a855f7;">define [Cek Tabrakan]</span><br>&nbsp;&nbsp;<span style="color:#a855f7;">if &lt;touching [Musuh]?&gt; then broadcast [Kalah]</span>',
            "step_title": "Checklist Produksi Sesi 23",
            "step_points": ["✅ Tahap 1: Panggung panggung & Sprite karakter utama siap", "✅ Tahap 2: Kontrol gerak halus dan fisika lompat berfungsi", "✅ Tahap 3: Rintangan musuh, koin madu, dan sistem nyawa terpasang", "✅ Tahap 4: Timer, High Score, suara BGM dan partikel aktif!"],
            "code_snippet_2": '🕹️ CHECKLIST PLAYTESTING TEMAN:<br>1. Apakah tombol kontrol mudah digerakkan? [Ya / Perlu Perbaikan]<br>2. Apakah rintangan terlalu sulit atau pas? [Pas / Terlalu Cepat]<br>3. Apakah ada bug atau karakter nyangkut? [Aman / Ada Bug]',
            "interaction_title": "Sesi Playtesting Berpasangan", "audio_effect": "Suara tawa dan seruan riang saat murid saling mencoba game teman sebangku", "visual_effect": "Teman memberikan stiker jempol apresiasi di lembar catatan karya", "feedback_desc": "Melihat orang lain memainkan game kita memberikan wawasan langsung tentang bagian mana yang perlu diperbaiki!",
            "advanced_title": "Polesan Akhir (Polishing)", "advanced_text": "Tambahkan layar petunjuk 'Cara Main: Tekan Spasi untuk Loncat' di layar awal agar siapa pun bisa langsung paham!",
            "advanced_points": ["📜 Kartu petunjuk tombol kontrol di awal game", "🌟 Efek transisi halus saat game over", "🎨 Kerapian susunan balok kode di Scratch Studio"],
            "code_snippet_3": '<span style="color:#fbbf24;">when 🏴 clicked</span><br><span style="color:#a855f7;">say [Tekan SPASI untuk Lompat & Hindari Duri!] for (3) secs</span>',
            "challenge_title": "Uji Coba Ketahanan Game",
            "challenge_points": ["🎮 Mainkan gamemu 3 kali tanpa menemui satu error pun", "👥 Mintalah 2 teman berbeda untuk mencoba memainkan karyamu", "🌟 Siapkan nama game keren untuk panggung Demo Day pekan depan!"],
            "challenge_target": "Game mandiri berfungsi penuh 100% dan siap tampil di panggung kelulusan!",
            "debugging_points": [
                "🐛 <strong>Bug: Kode terlalu panjang dan membingungkan di layar.</strong><br><em>Solusi:</em> Kelompokkan ke dalam blok pink <code>My Blocks</code> agar kode rapi dan mudah dibaca!",
                "🐛 <strong>Bug: Permainan terlalu cepat selesai (terlalu sulit).</strong><br><em>Solusi:</em> Kurangi kecepatan musuh atau perlebar celah pijakan tanah.",
                "🐛 <strong>Bug: Suara latar terus berputar di layar Game Over.</strong><br><em>Solusi:</em> Tambahkan <code>stop all sounds</code> saat siaran Game Over dikirimkan."
            ],
            "debugging_tip": "Playtesting adalah rahasia terbesar studio game kelas dunia: dengarkan masukan pemainmu dan perbaiki demi keseruan bersama!",
            "summary_points": ["1️⃣ <strong>Produksi Mandiri:</strong> Kemandirian merangkai seluruh konsep yang dipelajari", "2️⃣ <strong>Modularitas:</strong> Mengorganisir kode dengan fungsi My Blocks", "3️⃣ <strong>Playtesting:</strong> Menguji game bersama orang lain untuk penyempurnaan", "4️⃣ <strong>Penyelesaian:</strong> Menuntaskan proyek hingga standar siap rilis"],
            "next_teaser_title": "Sesi 24: DEMO DAY AKBAR & Wisuda Kelulusan Stage 2! 🎓🎉", "next_teaser_points": ["🎓 <strong>Demo Day Akbar:</strong> Pameran karya mandiri di depan orang tua & juri", "📜 <strong>Rapor & Piagam:</strong> Pembagian Rapor Kompetensi Semester 1 & Sertifikat", "🎊 <strong>Wisuda Juara:</strong> Pesta apresiasi kelulusan Stage 2 Beekoding!"]
        }),

        (24, "CAPSTONE LEVEL 2: 'Flappy Bee Adventure' & Laporan Semester", "Grand Demo Day, Showcase Karya Portofolio Mandiri & Wisuda Stage 2", "Sesi 24 • Demo Day & Wisuda", "🎓", {
            "goal_title": "Panggung Juara: Demo Day & Wisuda! 🎓", "goal_desc": "Mempresentasikan game karya mandiri di depan orang tua dan dewan penguji, evaluasi rapor semester, dan wisuda Stage 2.",
            "key_blocks": ["Live Game Demonstration", "Public Speaking Presentation", "Semester Competency Graduation"],
            "core_concepts": ["Portfolio Presentation", "Reflective Learning", "Digital Competency Mastery"],
            "concept_name": "Panggung Apresiasi & Demonstrasi Karya", "concept_explanation": "Hari ini adalah hari paling membanggakan! Selama 24 sesi penuh ketekunan, kalian telah bertransformasi dari pemula menjadi Programmer Cilik yang mampu menciptakan game mandiri!",
            "concept_points": ["🎤 <strong>Presentasi Mandiri:</strong> Memperkenalkan nama game, aturan main, dan fitur favorit", "🕹️ <strong>Live Play Demo:</strong> Memainkan game di layar besar disaksikan orang tua dan juri", "📊 <strong>Rapor Semester:</strong> Evaluasi 8 Pilar Kompetensi Komputasional", "🏅 <strong>Sertifikat Resmi:</strong> Penganugerahan piagam kelulusan Junior Code Explorer Level 2"],
            "analogy": "Seperti pameran seni atau peluncuran roket: setelah berbulan-bulan merakit di lab, saatnya memperlihatkan hasil karya mengagumkan kepada dunia!",
            "key_block_title": "Struktur Presentasi Demo Day (2 Menit)",
            "code_snippet_1": '🎤 PANDUAN BICARA SISWA:<br>1. "Halo semuanya, nama saya [Nama Siswa]!"<br>2. "Hari ini saya mempersembahkan game buatan saya: [Judul Game]!"<br>3. "Cara mainnya adalah: [Jelaskan Kontrol & Tujuan]"<br>4. "Fitur paling keren di game ini adalah: [Fisika/Partikel/Skor]"<br>5. "Tantangan tersulit yang berhasil saya atasi: [Cerita Debugging]"<br>6. "Terima kasih, selamat mencoba game saya!"',
            "step_title": "Alur Acara Wisuda Stage 2",
            "step_points": ["1️⃣ Sambutan Pembuka dari Lead Instructor & Mentor", "2️⃣ Sesi Demonstrasi Karya Interaktif Satu per Satu Siswa", "3️⃣ Pembacaan Capaian Rapor 8 Pilar Kompetensi Digital", "4️⃣ Penyerahan Sertifikat Kelulusan & Foto Bersama Keluarga!"],
            "code_snippet_2": '🏆 8 PILAR KOMPETENSI SEMESTER 1:<br>• Algoritma Sekuensial & Percabangan Logika<br>• Koordinat Layar X-Y & Fisika Gravitasi<br>• Variabel Skor, Timer & High Score System<br>• Kloning Sprite & Efek Partikel Visual<br>• Deteksi Tabrakan & Interaksi Pengguna<br>• Penyusunan Game Design Document (GDD)<br>• Kemandirian Debugging & Problem Solving<br>• Keberanian Presentasi & Public Speaking',
            "interaction_title": "Pesta Kembang Api Kelulusan", "audio_effect": "Suara lagu wisuda megah dan gemuruh tepuk tangan seisi ruangan", "visual_effect": "Hujan konfeti warna-warni dan medali emas kelulusan", "feedback_desc": "Senyum bangga di wajah murid dan orang tua menyambut capaian luar biasa 24 sesi!",
            "advanced_title": "Bocoran Petualangan Stage 3", "advanced_text": "Di Stage 3 nanti, kita akan menghubungkan koding dengan dunia fisik nyata: Micro:bit, sensor getar, instrumen musik buah, dan robotika cerdas!",
            "advanced_points": ["🤖 Micro:bit LED Matrix & Kompas Digital", "🍌 Makey Makey Piano Buah Konduktif", "🚗 Mobil Robot Otonom Penelusur Garis"],
            "code_snippet_3": '🚀 JALUR TAHAP BERIKUTNYA:<br>STAGE 3: Physical & Sensory Computing (Sesi 25–36)<br>"Koding tidak hanya hidup di layar, tapi menggerakkan benda nyata di sekelilingmu!"',
            "challenge_title": "Janji Programmer Cilik",
            "challenge_points": ["🌟 Teruslah berkreasi dan jangan pernah takut mencoba hal baru", "💻 Bagikan link game buatanmu kepada keluarga dan teman di sekolah", "🤝 Jadilah inspirasi teknologi positif bagi generasi masa depan!"],
            "challenge_target": "Kelulusan Stage 2 paripurna dan resmi bergelar Junior Code Explorer Level 2!",
            "debugging_points": [
                "🐛 <strong>Tips Mengatasi Gugup:</strong> Tarik napas dalam-dalam, tatap mata penonton dengan senyum hangat, dan berbicaralah dengan lantang penuh percaya diri!",
                "🐛 <strong>Tips Jika Game Macet di Depan Panggung:</strong> Tetap tenang, jelaskan dengan jujur kepada juri: 'Inilah seni koding, terkadang ada bug yang menantang kita untuk belajar!'",
                "🐛 <strong>Tips Menghadapi Pertanyaan Juri:</strong> Jawab dengan ceria berdasarkan pengalamanmu sendiri saat merakit kode."
            ],
            "debugging_tip": "Keberanian berdiri dan mempresentasikan karya buatan tangan sendiri adalah keterampilan hidup yang tak ternilai harganya!",
            "summary_points": ["1️⃣ <strong>Capstone Mastery:</strong> Pembuktian tuntas kemampuan merakit game komprehensif", "2️⃣ <strong>Public Speaking:</strong> Percaya diri mengomunikasikan ide teknologi di depan publik", "3️⃣ <strong>Evaluasi Holistik:</strong> Penilaian capaian rapor logika komputasional", "4️⃣ <strong>Pencapaian Akbar:</strong> Kelulusan resmi Stage 2 (Level 2) Beekoding Academy"],
            "next_teaser_title": "Sampai Jumpa di Stage 3: Sensory & Robotics! 🤖🚀", "next_teaser_points": ["🤖 <strong>Micro:bit Hardware:</strong> Menghidupkan chip pintar di tanganmu", "🕹️ <strong>Game Controller Fisik:</strong> Membuat gamepad kardus sendiri", "🎉 <strong>Selamat untuk Seluruh Lulusan Stage 2 Beekoding Academy!</strong>"]
        })
    ]

    for cfg in remaining_configs:
        sessions.append(make_session(
            num=cfg[0],
            title=cfg[1],
            subtitle=cfg[2],
            badge=cfg[3],
            icon=cfg[4],
            topic_details=cfg[5]
        ))

    return sessions

def main():
    sessions = get_all_stage2_sessions()
    print(f"Loaded {len(sessions)} sessions (Sesi 13 to Sesi 24).")

    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "slides"))
    
    for s in sessions:
        if s['num'] in [13, 14]:
            print(f"Preserving custom Sesi {s['num']:02d} (already enriched with simulators & hero images)")
            continue
        num_str = f"{s['num']:02d}"
        session_dir = os.path.join(base_dir, f"sesi-{num_str}")
        os.makedirs(session_dir, exist_ok=True)
        
        file_path = os.path.join(session_dir, "index.html")
        html = generate_slide_deck_html(s)
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Generated Sesi {num_str}: {file_path} ({len(html)} bytes)")

    # Also update Sesi 12 to link forward to Sesi 13
    sesi12_path = os.path.join(base_dir, "sesi-12", "index.html")
    if os.path.exists(sesi12_path):
        with open(sesi12_path, "r", encoding="utf-8") as f:
            c = f.read()
        
        # Check if next button is already present
        if 'href="/slides/sesi-13/index.html"' not in c:
            # Replace prev button with prev + next button
            target = '<a href="/slides/sesi-11/index.html" class="btn-nav-sesi">← Sesi 11</a>'
            replacement = '<a href="/slides/sesi-11/index.html" class="btn-nav-sesi">← Sesi 11</a>\n      <a href="/slides/sesi-13/index.html" class="btn-nav-sesi">Sesi 13 →</a>'
            if target in c:
                c = c.replace(target, replacement)
                with open(sesi12_path, "w", encoding="utf-8") as f:
                    f.write(c)
                print("Updated Sesi 12: added link forward to Sesi 13.")
            else:
                print("Warning: target link in Sesi 12 not found for replacement.")
        else:
            print("Sesi 12 already links to Sesi 13.")

if __name__ == "__main__":
    main()
