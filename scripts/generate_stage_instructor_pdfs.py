import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Image, HRFlowable
)
from reportlab.pdfgen import canvas

# Color Palette Beekoding
COLOR_PRIMARY_AMBER = colors.HexColor('#D97706') # Amber 600
COLOR_DARK_AMBER = colors.HexColor('#B45309')    # Amber 700
COLOR_LIGHT_AMBER = colors.HexColor('#FEF3C7')   # Amber 100
COLOR_BG_AMBER = colors.HexColor('#FFFBEB')      # Amber 50
COLOR_NAVY = colors.HexColor('#0F172A')          # Slate 900
COLOR_NAVY_LIGHT = colors.HexColor('#1E293B')    # Slate 800
COLOR_TEXT_MAIN = colors.HexColor('#1E293B')     # Slate 800
COLOR_TEXT_MUTED = colors.HexColor('#475569')    # Slate 600
COLOR_BORDER = colors.HexColor('#E2E8F0')        # Slate 200
COLOR_EMERALD = colors.HexColor('#059669')       # Emerald 600
COLOR_EMERALD_BG = colors.HexColor('#ECFDF5')    # Emerald 50
COLOR_BLUE = colors.HexColor('#2563EB')          # Blue 600
COLOR_BLUE_BG = colors.HexColor('#EFF6FF')       # Blue 50
COLOR_PURPLE = colors.HexColor('#7C3AED')        # Purple 600
COLOR_PURPLE_BG = colors.HexColor('#F5F3FF')     # Purple 50

class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas to dynamically compute and print total page count."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(COLOR_TEXT_MUTED)

        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(18 * mm, 285 * mm, "BEEKODING ACADEMY • PANDUAN LENGKAP INSTRUKTUR (SESI 01 – 96)")
            self.setStrokeColor(COLOR_BORDER)
            self.setLineWidth(0.5)
            self.line(18 * mm, 282 * mm, 192 * mm, 282 * mm)

        # Footer (all pages)
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.5)
        self.line(18 * mm, 15 * mm, 192 * mm, 15 * mm)

        self.drawString(18 * mm, 11 * mm, "www.beekoding.id • Kurikulum Siap Ajar Mentor • Hak Cipta Dilindungi")
        page_text = f"Halaman {self._pageNumber} dari {page_count}"
        self.drawRightString(192 * mm, 11 * mm, page_text)
        self.restoreState()


def create_styles():
    base = getSampleStyleSheet()
    styles = {}

    styles['DocTitle'] = ParagraphStyle(
        'DocTitle',
        parent=base['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=COLOR_NAVY,
        spaceAfter=3,
    )

    styles['DocSubtitle'] = ParagraphStyle(
        'DocSubtitle',
        parent=base['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=COLOR_DARK_AMBER,
        spaceAfter=8,
    )

    styles['LevelHeading'] = ParagraphStyle(
        'LevelHeading',
        parent=base['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=COLOR_NAVY,
        spaceBefore=10,
        spaceAfter=5,
    )

    styles['SectionHeading'] = ParagraphStyle(
        'SectionHeading',
        parent=base['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=COLOR_NAVY,
        spaceBefore=8,
        spaceAfter=4,
    )

    styles['SessionTitle'] = ParagraphStyle(
        'SessionTitle',
        parent=base['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=COLOR_DARK_AMBER,
        spaceBefore=4,
        spaceAfter=1,
    )

    styles['SessionDetail'] = ParagraphStyle(
        'SessionDetail',
        parent=base['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        textColor=COLOR_TEXT_MAIN,
        spaceAfter=2,
    )

    styles['AnalogyText'] = ParagraphStyle(
        'AnalogyText',
        parent=base['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=7.2,
        leading=10,
        textColor=COLOR_DARK_AMBER,
        spaceAfter=3,
    )

    styles['TableCell'] = ParagraphStyle(
        'TableCell',
        parent=base['Normal'],
        fontName='Helvetica',
        fontSize=7.2,
        leading=9.5,
        textColor=COLOR_TEXT_MAIN,
    )

    return styles


def render_sessions_block(story, styles, level_title, sessions):
    story.append(Paragraph(f"<b>{level_title}</b>", styles['LevelHeading']))
    for item in sessions:
        title = item[0]
        conc = item[1] if len(item) > 1 else ""
        code = item[2] if len(item) > 2 else ""
        tips = item[3] if len(item) > 3 else ""
        story.append(Paragraph(f"<b>{title}</b>", styles['SessionTitle']))
        if conc:
            story.append(Paragraph(f"• <b>Konsep & Inti:</b> {conc}", styles['SessionDetail']))
        if code:
            story.append(Paragraph(f"• <b>Instruksi / Kode:</b> {code}", styles['SessionDetail']))
        if tips:
            story.append(Paragraph(f"• <b>Panduan Mengajar:</b> <i>{tips}</i>", styles['AnalogyText']))


# ==============================================================================
# 1. TAHAP 1: JUNIOR EXPLORER (SESI 01 - 96)
# ==============================================================================
def build_junior_pdf(filepath):
    doc = SimpleDocTemplate(filepath, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=20*mm, bottomMargin=20*mm)
    styles = create_styles()
    story = []

    logo_path = 'public/beekoding-logo.png'
    logo_img = Image(logo_path, width=16*mm, height=16*mm) if os.path.exists(logo_path) else ""

    header_table = Table([[
        logo_img,
        [
            Paragraph("<b>BEEKODING ACADEMY</b> • PANDUAN MENGAJAR INSTRUKTUR RESMI", ParagraphStyle('Sub', fontName='Helvetica-Bold', fontSize=8, textColor=COLOR_DARK_AMBER)),
            Paragraph("Tahap 1: Junior Explorer (Usia 6 – 9 Tahun)", styles['DocTitle']),
            Paragraph("Kurikulum 2 Tahun Lengkap (Sesi 01 – 96) • Scratch 3.0, Micro:bit, Math Logic & Game Expo", styles['DocSubtitle'])
        ]
    ]], colWidths=[20*mm, 154*mm])
    header_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=COLOR_PRIMARY_AMBER, spaceBefore=3, spaceAfter=6))

    # Meta Info
    meta = [
        [
            Paragraph("<b>Target Usia:</b> 6 – 9 Tahun (TK B – SD 1-3)", styles['TableCell']),
            Paragraph("<b>Prasyarat:</b> Zero Experience (Pemula)", styles['TableCell']),
            Paragraph("<b>Platform:</b> ScratchJr, Scratch 3.0, Micro:bit", styles['TableCell'])
        ],
        [
            Paragraph("<b>Durasi:</b> 96 Sesi @ 75 – 90 Menit (2 Tahun)", styles['TableCell']),
            Paragraph("<b>Rasio:</b> 1 Mentor : 4 – 5 Siswa", styles['TableCell']),
            Paragraph("<b>Output:</b> 8 Game & Proyek Mandiri + Pameran", styles['TableCell'])
        ]
    ]
    meta_t = Table(meta, colWidths=[58*mm, 58*mm, 58*mm])
    meta_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_AMBER),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_PRIMARY_AMBER),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(meta_t)
    story.append(Spacer(1, 4))

    # 4-Level Pathway Summary Table
    story.append(Paragraph("🗺️ Peta Jenjang 8 Level (Sesi 01 – 96): Jalur 2 Tahun Penuh", styles['SectionHeading']))
    pw_data = [
        [Paragraph("<b>Level 1 (Sesi 1–12)</b><br/><b>Starter Foundation:</b> ScratchJr, Algoritma Arah, Karakter Animasi & Game Sederhana.", styles['TableCell']),
         Paragraph("<b>Level 2 (Sesi 13–24)</b><br/><b>Game Mechanics:</b> Koordinat X/Y, Timer, Nyawa, Gravitasi, & Flappy Bee.", styles['TableCell']),
         Paragraph("<b>Level 3 (Sesi 25–36)</b><br/><b>Physical Computing:</b> Micro:bit LED, Makey Makey, Accelerometer, & Jam Pintar.", styles['TableCell']),
         Paragraph("<b>Level 4 (Sesi 37–48)</b><br/><b>Junior Game Jam:</b> Kerja Sama Tim, Boss Battle, Voice Acting, & Pameran Tahunan.", styles['TableCell'])],
        [Paragraph("<b>Level 5 (Sesi 49–60)</b><br/><b>Digital Art & Sound:</b> Pen Extension, Geometri Mandala, Musik MIDI, & Video Sensing.", styles['TableCell']),
         Paragraph("<b>Level 6 (Sesi 61–72)</b><br/><b>Math & Logic:</b> Kuis Aritmatika, List Inventori, Labirin Otomatis, & Soal Bebras.", styles['TableCell']),
         Paragraph("<b>Level 7 (Sesi 73–84)</b><br/><b>Robotics & IoT:</b> Mobil Otonom, Lampu Pintar, Palang Kereta, & Kota Cerdas Beeville.", styles['TableCell']),
         Paragraph("<b>Level 8 (Sesi 85–96)</b><br/><b>Pre-Code & Wisuda:</b> Python Turtle Teks, Grand Capstone 2 Tahun, & Wisuda Akbar.", styles['TableCell'])]
    ]
    pw_t = Table(pw_data, colWidths=[43.5*mm]*4)
    pw_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_EMERALD_BG),
        ('BACKGROUND', (0,1), (-1,1), COLOR_BLUE_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(pw_t)
    story.append(Spacer(1, 4))

    # Level 1
    l1 = [
        ("Sesi 01: Petualangan Robot Lebah (Unplugged Computational Thinking)", "Algoritma & Instruksi Presisi.", "Permainan fisik 'Robot Manusia' dan labirin petak arah panah.", "Analogi: Robot pelayan butuh instruksi detail."),
        ("Sesi 02: Menghidupkan Karakter di Scratch (Stage, Sprite & Motion)", "Panggung (Stage), Aktor (Sprite), dan Perintah Gerak Pertama.", "[When Green Flag Clicked] -> move (50) steps -> say [Halo, aku Beeby!].", "Pilih latar belakang Flowers dan sprite Bee ukuran 50%."),
        ("Sesi 03: Pemicu Peristiwa (Events: Klik, Sentuh, & Efek Suara)", "Hubungan sebab-akibat (Cause & Effect) melalui blok event topi emas.", "[When this sprite clicked] -> change size by (20) -> start sound [Magic Spell].", "Tantangan: Tambahkan 3 bunga berbeda yang bersuara Pop dan Coin."),
        ("Sesi 04: Kepakan Sayap Lebah (Perulangan Loop: Repeat & Forever)", "Menghindari menyusun puluhan blok yang sama dengan loop otomatis.", "forever [next costume -> wait (0.2) secs -> move (5) steps -> if on edge, bounce].", "Common Bug: Sayap terlalu cepat. Solusi: Pastikan ada wait 0.2 detik."),
        ("Sesi 05: Percakapan Dua Karakter (Timing & Wait Block)", "Komunikasi bergantian; karakter saling menunggu giliran bicara.", "Sprite A bicara 3 detik -> Sprite B wait (3) secs -> baru menjawab.", "Analogi: Mendengarkan teman dulu sebelum menjawab telepon."),
        ("Sesi 06: Ekstensi AI Text-to-Speech (Karakter Berbicara Nyata)", "Ekstensi Scratch dan sintesis suara Bahasa Indonesia.", "set voice to [squeak] -> set language to [Indonesian] -> speak [Halo teman!].", "Tantangan: Buat katak bersuara giant dan anak kucing bersuara kitten."),
        ("Sesi 07: Merancang Karakter Hero Bersama AI Generator", "Prompt gambar ramah anak: [Karakter] + [Baju] + [Gaya Kartun 3D] + [Warna].", "Cute baby bee with tiny astronaut helmet, 3D Pixar cartoon style.", "Aktivitas: Unduh hasil gambar AI, hapus background, upload sprite."),
        ("Sesi 08: Evaluasi Mini Proyek 1: Buku Cerita Animasi Interaktif", "Menggabungkan karakter AI, Text-to-Speech, dan tombol navigasi halaman.", "Rubrik: Minimal 2 karakter, percakapan bergantian, ada efek suara klik.", "Instruktur membimbing siswa merapikan alur dongeng digital."),
        ("Sesi 09: Labirin Sarang Lebah (Navigasi Tombol Panah & Sensing Warna)", "Kontrol 4 tombol panah keyboard dan deteksi tabrakan tembok (Color Sensing).", "if <key up arrow pressed> -> change y by (6). if <touching color biru> -> balik ke start.", "Common Bug: Sprite macet di tembok. Solusi: Kecilkan ukuran sprite lebah ke 35%."),
        ("Sesi 10: Panen Madu & Variabel Skor (Variables System)", "Variabel sebagai wadah tabungan angka yang bertambah setiap panen madu.", "set [Skor] to (0). if touching [Bee] -> change [Skor] by (1) -> hide.", "Tantangan: Gandakan bunga menjadi 6 buah di sudut labirin berbeda."),
        ("Sesi 11: Rintangan Laba-Laba Berpatroli & Layar Game Over", "Animasi patroli musuh, broadcast message, dan backdrop kemenangan.", "Spider glide bolak-balik. if touching [Spider] -> broadcast [Game Over].", "Jika Skor = 6 -> broadcast [You Win] dan mainkan suara kembang api."),
        ("Sesi 12: CAPSTONE LEVEL 1: 'Bee Honey Harvest' & Demo Day Cilik", "Game arcade mandiri buatan anak yang utuh dan siap dimainkan.", "Presentasi 2 menit: nama game, cara main, dan fitur favorit.", "Apresiasi: Pembagian Sertifikat Kelulusan Junior Code Explorer Level 1.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 1: STARTER FOUNDATION & VISUAL MOTION (SESI 01 – 12)", l1)

    # Level 2
    l2 = [
        ("Sesi 13: Game Tangkap Buah Apel Jatuh (Koordinat X dan Y)", "Sumbu vertikal Y (atas positif, bawah negatif).", "forever [change y by (-6) -> if y < -160 then go to x: random y: 170].", "Mangkuk penangkap digerakkan kursor mouse: set x to mouse x."),
        ("Sesi 14: Efek Partikel dan Animasi Skor Terapung", "Kloning efek kilau saat apel berhasil ditangkap mangkuk.", "when I start as a clone -> repeat (10) [change y by (4) -> change ghost effect by 10].", "Membuat game terasa memuaskan dan hidup (*game juice*)."),
        ("Sesi 15: Sistem Timer Hitung Mundur & Alarm Kemenangan", "Variabel waktu Waktu. Menghitung mundur dari 30 ke 0.", "repeat until <Waktu = 0> [wait (1) secs -> change Waktu by (-1)].", "Analogi: Jam pasir yang butirannya jatuh satu per satu."),
        ("Sesi 16: Logika Nyawa (Health Heart) & Buah Beracun", "Variabel Nyawa berkurang jika menangkap buah busuk.", "if touching Buah Busuk -> change Nyawa by (-1) -> start sound [Oops].", "Jika Nyawa = 0 -> siarkan Game Over."),
        ("Sesi 17: Multi-Level Switching (Kenaikan Tingkat Kesulitan)", "Jika Skor >= 10, ganti background ke Level 2 dan naikkan kecepatan jatuh.", "Kecepatan bertambah membuat pemain semakin tertantang konsentrasi."),
        ("Sesi 18: Fisika Lompat Sederhana (Gravitasi & Velocity Y Dasar)", "Karakter melompat ke atas lalu tertarik kembali ke tanah.", "repeat (10) [change y by (8)] -> repeat (10) [change y by (-8)].", "Fondasi utama membuat game platformer seperti Mario Bros."),
        ("Sesi 19: Game Flappy Bee: Menembus Pipa Rintangan", "Scrolling rintangan pipa menyamping dan menjaga ketinggian terbang.", "Tombol spasi mengepakkan sayap lebah ke atas."),
        ("Sesi 20: Papan Peringkat Sederhana (High Score System)", "Membandingkan nilai: if Skor > HighScore then set HighScore to Skor.", "Memotivasi anak untuk terus mencoba memecahkan rekor sendiri."),
        ("Sesi 21: Efek Suara Latar Dinamis & Tombol Mute", "Background music loop dan tombol kontrol suara yang bisa diklik.", "Belajar kenyamanan pengalaman bermain pengguna (User Experience)."),
        ("Sesi 22: Brainstorming & Sketsa Storyboard Capstone Level 2", "Anak menggambar alur game impian di lembar Game Sheet Beekoding.", "Perencanaan matang sebelum mulai merangkai balok kode."),
        ("Sesi 23: Produksi Proyek Mandiri: Game Platformer Cilik", "Pembangunan game mandiri dengan bimbingan 1-on-1 instruktur.", "Memastikan setiap anak mandiri mengatasi bug koding."),
        ("Sesi 24: CAPSTONE LEVEL 2: 'Flappy Bee Adventure' & Laporan Semester", "Game multi-level interaktif lengkap dengan sistem skor dan nyawa.", "Showcase hasil karya dan pembagian Sertifikat Kompetensi Semester 1.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 2: GAME MECHANICS & LOGIKA DINAMIS (SESI 13 – 24)", l2)

    # Level 3
    l3 = [
        ("Sesi 25: Mengenal Dunia Fisik & Mikrokontroler (Micro:bit / Makey Makey)", "Komputer bukan cuma layar; ada di jam tangan, remote dan mobil.", "Menghubungkan mikrokontroler fisik ke Scratch via Bluetooth."),
        ("Sesi 26: Menampilkan Animasi LED Emotikon & Senyum Digital", "Menyalakan matriks LED 5x5 membentuk ikon hati berdetak dan senyum.", "Melihat kode menghasilkan cahaya nyata di tangan anak."),
        ("Sesi 27: Tombol Fisik A dan B (Input Hardware)", "Menghubungkan tombol fisik hardware untuk menggerakkan sprite di layar.", "Memahami konsep Input -> Process -> Output."),
        ("Sesi 28: Sensor Goyang (Accelerometer) & Game Dadu Ajaib", "Deteksi getaran dan kemiringan (Shake gesture).", "Saat alat digoyang, angka dadu 1-6 muncul acak di layar LED."),
        ("Sesi 29: Kompas Digital & Sensor Magnetik", "Menentukan arah mata angin Utara, Selatan, Barat, dan Timur dengan koding.", "Belajar navigasi sains sambil memprogram kompas digital."),
        ("Sesi 30: Detektor Suara & Sensor Kebisingan Mikrofon", "Deteksi desibel suara ruangan. Jika anak bertepuk tangan, sprite melompat.", "Membuat game interaktif berbasis suara tepukan tangan."),
        ("Sesi 31: Instrumen Musik Pisang Ajaib (Makey Makey Piano)", "Konduktivitas listrik buah dan playdough menghasilkan nada piano Do-Re-Mi.", "Eksperimen sains seru menghubungkan koding dengan benda dapur."),
        ("Sesi 32: Sensor Suhu & Alarm Termometer Pintar", "Membaca sensor panas. Jika suhu > 30°C, muncul ikon matahari dan sirine.", "Simulasi alat pemantau cuaca pintar mandiri."),
        ("Sesi 33: Jam Tangan Pintar Penghitung Langkah (Smart Pedometer)", "Menghitung hentakan langkah kaki saat anak melompat di tempat.", "Membuat prototipe Apple Watch / Fitbit versi cilik."),
        ("Sesi 34: Game Controller Fisik Buatan Sendiri (DIY Cardboard Gamepad)", "Membuat gamepad dari kardus dan aluminium foil untuk mengontrol Scratch.", "Melatih keterampilan kreativitas fisik motorik dan koding terpadu."),
        ("Sesi 35: Integrasi Proyek Hardware-Software Interaktif", "Menggabungkan sensor fisik dengan animasi game di layar komputer.", "Uji coba kalibrasi sensor dan kepekaan respons tombol."),
        ("Sesi 36: CAPSTONE LEVEL 3: Pameran Gadget Cilik & Showcase Hardware", "Pameran alat sensor buatan anak yang terhubung dengan game.", "Apresiasi: Sertifikat Junior Hardware & Sensory Creator.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 3: SENSORY & PHYSICAL COMPUTING (SESI 25 – 36)", l3)

    # Level 4
    l4 = [
        ("Sesi 37: Pengenalan Game Jam & Pembentukan Tim Kreator Cilik", "Bekerja sama dalam tim: pembagian desainer grafis dan programmer logika.", "Melatih kolaborasi, komunikasi, dan pembagian tugas sehat."),
        ("Sesi 38: Mendesain Dunia Game Impian (World Building & Lore)", "Merancang peta dunia fantasi sarang lebah, desa bunga, dan hutan rintangan.", "Storytelling digital yang memperkuat imajinasi anak."),
        ("Sesi 39: Sistem Dialog Kompleks & NPC Quest Pemberi Misi", "Karakter pendukung (NPC) pemberi misi: 'Kumpulkan 3 nektar emas!'.", "Membangun alur cerita RPG petualangan interaktif."),
        ("Sesi 40: Sistem Inventori Cilik (Kantung Barang Pemain)", "List variabel untuk mencatat item kunci yang sudah didapatkan pemain.", "Pengenalan struktur data koleksi secara visual ramah anak."),
        ("Sesi 41: Boss Fight Battle: Logika Serangan Musuh Raksasa", "Musuh besar dengan nyawa tebal (Boss HP = 20) dan pola tembakan beruntun.", "Membuat tantangan klimaks yang mendebarkan di akhir level game."),
        ("Sesi 42: Efek Visual Layar Bergetar (Screen Shake) & Partikel Ledakan", "Mengubah koordinat panggung dengan cepat untuk efek ledakan dramatis.", "Meningkatkan kualitas visual standar game komersial."),
        ("Sesi 43: Audio Foley & Perekaman Suara Karakter Siswa Sendiri", "Siswa merekam suara mereka sendiri lewat mikrofon untuk dubbing karakter.", "Anak sangat bangga mendengar suaranya sendiri di dalam game."),
        ("Sesi 44: Debugging Jam: Menemukan & Memperbaiki Bug Teman", "Belajar membaca kode teman, saling memberi masukan positif dan solusi.", "Menumbuhkan empati dan ketelitian analisa logika komputasi."),
        ("Sesi 45: Polishing Game: Menambahkan Menu Pembuka & Kredit Pembuat", "Tombol Play, Cara Main, dan nama lengkap tim pembuat di layar judul.", "Standarisasi penyelesaian proyek hingga siap rilis."),
        ("Sesi 46: Latihan Presentasi & Public Speaking Cilik", "Melatih kontak mata, intonasi suara lantang, dan struktur demo game.", "Mempersiapkan rasa percaya diri anak berbicara di depan publik."),
        ("Sesi 47: Final Rehearsal & Uji Coba Bersama Orang Tua", "Simulasi pameran dan uji coba memainkan karya teman sekelas.", "Pengecekan akhir kestabilan game."),
        ("Sesi 48: GRAND CAPSTONE TAHUN KE-1: Junior Coding Expo (48 Sesi)", "Pameran akbar portofolio tahunan di depan orang tua dan dewan juri.", "Penganugerahan Sertifikat Resmi Junior Explorer Annual Graduate.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 4: JUNIOR GAME JAM & KOLABORASI KARYA (SESI 37 – 48)", l4)

    # Level 5
    l5 = [
        ("Sesi 49: Ekstensi Pena Koding (Pen Extension & Menggambar Garis)", "Mengontrol pena digital panggung: pen down, set pen color, move steps.", "Mengubah layar komputer menjadi kanvas lukis digital ajaib."),
        ("Sesi 50: Menggambar Bangun Datar Geometri Otomatis", "Derajat putar bangun datar (Segitiga 120°, Persegi 90°, Lingkaran 1° loop 360).", "Integrasi matematika sudut putar dengan pemrograman visual."),
        ("Sesi 51: Pola Bunga Mandala & Fraktal Ajaib (Matematika Kreatif)", "Perulangan bersarang (Nested Loop) membentuk mandala pelangi simetris.", "Karya seni fraktal otomatis yang memukau mata anak."),
        ("Sesi 52: Menggambar Spidol Ajaib dengan Pelacak Kursor Mouse", "Aplikasi Paint mandiri: kuas menggambar mengikuti posisi mouse dengan warna.", "Membuat software papan gambar digital sendiri."),
        ("Sesi 53: Ekstensi Musik & Pemrograman Ritme Drum MIDI", "Ketukan birama (BPM), instrumen piano, snare drum, dan bassline digital.", "Mempelajari komposisi musik menggunakan logika blok koding."),
        ("Sesi 54: Komposisi Lagu 'Twinkle Little Star' dengan Koding Blok", "Menyusun nada lagu klasik: play note (60) for (0.5) beats secara urut.", "Memahami korelasi antara partitur musik dan baris perintah kode."),
        ("Sesi 55: Ekstensi Video Sensing (Kamera Web Interaktif)", "Deteksi gerakan fisik tubuh anak nyata di depan kamera komputer.", "Teknologi penginderaan kamera yang membuat anak bergerak aktif."),
        ("Sesi 56: Game Menepuk Balon Udara di Depan Kamera", "when video motion > 20 on sprite -> pop sound -> score bertambah -> hide.", "Game augmented reality sederhana yang sangat menyenangkan."),
        ("Sesi 57: Filter Wajah Digital AR Sederhana (Kacamata & Topi Bergerak)", "Efek AR: sprite kacamata menempel dan mengikuti posisi gerakan kepala anak.", "Memahami cara kerja filter Instagram dan TikTok dari balik layar."),
        ("Sesi 58: Integrasi Seni, Musik, dan Gerakan Kamera", "Instalasi seni digital yang merespons tarian dan tepukan tangan anak.", "Kombinasi multimedia interaktif tanpa batas."),
        ("Sesi 59: Gladi Bersih Proyek Seni Digital Interaktif", "Finishing dan pengujian pencahayaan kamera webcam anak.", "Memastikan interaksi video sensing berjalan lancar."),
        ("Sesi 60: CAPSTONE LEVEL 5: Digital Art & Interactive Music Expo", "Pameran galeri interaktif multi-ekstensi karya mandiri anak.", "Apresiasi: Sertifikat Digital Creative Artist Level 5.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 5: ADVANCED SCRATCH EXTENSIONS & SENI DIGITAL (SESI 49 – 60)", l5)

    # Level 6
    l6 = [
        ("Sesi 61: Operasi Aritmatika Cerdas (Penjumlahan, Pengurangan & Perkalian)", "Operator hijau: (+), (-), (*), dan perbandingan (>), (<), (=).", "Melatih pemahaman logika matematika dasar lewat koding."),
        ("Sesi 62: Game Kuis Matematika Kilat Berwaktu (Math Challenge)", "Komputer membuat soal acak: ask [Berapa 7 + 8?] and wait. Cek kebenaran.", "Mengubah latihan berhitung menjadi game kuis seru."),
        ("Sesi 63: Mengenal Struktur Data List (Daftar Belanja Karakter)", "Perbedaan variabel tunggal dengan List yang bisa menampung banyak data.", "Konsep database sederhana yang sangat penting."),
        ("Sesi 64: Game Tebak Kata & Kamus Mini Bahasa Inggris", "Memanggil kata acak dari dalam daftar: item (random) of [Kamus].", "Membangun aplikasi edukasi bahasa interaktif."),
        ("Sesi 65: Algoritma Pencarian Linear (Linear Search Sederhana)", "Memeriksa satu per satu barang di dalam tas ransel apakah ada ramuan obat.", "Mengenalkan konsep algoritma pencarian komputer."),
        ("Sesi 66: Logika Labirin Otomatis (Algoritma Penelusur Tembok Kiri)", "Robot yang mencari jalan keluar sendiri dengan aturan selalu menempel di tembok kiri.", "Dasar navigasi robot penjelajah tanpa bantuan manusia."),
        ("Sesi 67: Simulasi Ekosistem Akuarium Virtual (Ikan Besar Makan Ikan Kecil)", "Kecerdasan buatan perilaku hewan: ikan mencari makan sendiri saat lapar.", "Simulasi biologi ekosistem alam buatan (*Artificial Life*)."),
        ("Sesi 68: Sistem Ekonomi Mini: Jual Beli Madu di Toko Desa", "Transaksi: Kurangi stok madu, tambah tabungan koin emas, beli ramuan.", "Belajar literasi finansial dasar melalui simulasi game."),
        ("Sesi 69: Penyusunan Puzzle Logika Asah Otak (Bebras Challenge Kids)", "Latihan soal komputasional berpikir kritis internasional standar SD awal.", "Mempersiapkan kemampuan analitis tingkat tinggi."),
        ("Sesi 70: Pengembangan Game Puzzle Asah Otak Mandiri", "Siswa merancang teka-teki logika untuk dimainkan teman sekelas.", "Melatih logika sebab-akibat yang mendalam."),
        ("Sesi 71: Pengujian Kasus Ekstrem (Edge Cases & Debugging Lanjut)", "Menemukan bug jika pemain memasukkan jawaban aneh atau angka negatif.", "Membangun aplikasi yang tahan banting terhadap error."),
        ("Sesi 72: CAPSTONE LEVEL 6: 'Smart Bee Kingdom' & Sertifikasi Logika", "Simulasi kerajaan lebah dengan sistem kuis, inventory list, dan ekonomi koin.", "Apresiasi: Sertifikat Computational Logic Master Level 6.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 6: ALGORITMA MATEMATIKA, LOGIKA LABIRIN & STRUKTUR DATA (SESI 61 – 72)", l6)

    # Level 7
    l7 = [
        ("Sesi 73: Pengenalan Robot Otonom & Kendaraan Masa Depan", "Bagaimana mobil tanpa sopir tahu kapan harus berhenti di lampu merah.", "Membuka wawasan masa depan teknologi otomasi cerdas."),
        ("Sesi 74: Simulasi Robot Pengantar Makanan (Line Follower Virtual)", "Robot berbelok mengikuti jalur garis hitam di lantai menggunakan sensor warna.", "Simulasi robot pabrik dan restoran modern."),
        ("Sesi 75: Logika Palang Pintu Kereta Api Pintar Otomatis", "Sensor jarak: jika kereta mendekat < 50 langkah, palang turun dan sirine berbunyi.", "Rekayasa sistem keamanan keselamatan transportasi."),
        ("Sesi 76: Lampu Taman Pintar Hemat Energi (Smart Home Lighting)", "Sensor cahaya: jika panggung gelap malam hari, lampu menyala otomatis.", "Konsep efisiensi energi pada rumah pintar (*Smart Home*)."),
        ("Sesi 77: Robot Pembersih Debu Otomatis (Vacuum Robot Logic)", "Menjelajah ruangan acak, memantul saat tabrak kursi, kembali ke charger saat baterai lemah.", "Meniru kecerdasan robot Roomba pembersih rumah."),
        ("Sesi 78: Simulator Sistem Lalu Lintas 4 Persimpangan Lampu Merah", "Pengaturan siklus lampu Merah, Kuning, Hijau agar mobil tidak bertabrakan.", "Belajar manajemen antrean dan algoritma penjadwalan kota."),
        ("Sesi 79: Robot Pengelompok Sampah Cerdas (Smart Recycling Sorter)", "Klasifikasi objek: botol plastik ke tong biru, sisa makanan ke tong cokelat.", "Pendidikan kepedulian lingkungan hidup berbasis teknologi."),
        ("Sesi 80: Rumah Kaca Pintar & Penyiram Tanaman Otomatis", "Sensor kelembaban: jika tanah kering, pompa air menyiram selama 3 detik.", "Pertanian cerdas masa depan (*Smart Agriculture*)."),
        ("Sesi 81: Perancangan Miniatur Kota Pintar (Smart City Beeville)", "Menggabungkan mobil otonom, lampu pintar, dan palang pintu ke 1 panggung besar.", "Proyek kolaborasi kota cerdas terpadu."),
        ("Sesi 82: Uji Ketahanan Sistem Kota Pintar (Stress Test Sim)", "Menguji jika ada 20 mobil lewat sekaligus apakah terjadi kemacetan.", "Analisa beban sistem rekayasa kota."),
        ("Sesi 83: Pembuatan Video Dokumentasi Karya Robotik Anak", "Siswa merekam layar dan menjelaskan cara kerja kota pintar buatan mereka.", "Dokumentasi portofolio multimedia berkualitas."),
        ("Sesi 84: CAPSTONE LEVEL 7: Pameran Kota Pintar 'Beeville Smart City'", "Pameran simulasi kota cerdas interaktif. Presentasi di depan orang tua.", "Apresiasi: Sertifikat Junior Robotics & IoT Pioneer Level 7.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 7: ROBOTIK CERDAS & SIMULASI DUNIA NYATA (SESI 73 – 84)", l7)

    # Level 8
    l8 = [
        ("Sesi 85: Jembatan Menuju Koding Teks (Dari Blok Warna ke Baris Kalimat)", "Menunjukkan bahwa blok Scratch adalah kalimat bahasa pemrograman sungguhan.", "Menghilangkan rasa takut anak terhadap koding teks."),
        ("Sesi 86: Menulis Perintah Teks Pertama: Python Turtle Graphics", "Menulis sintaks teks: forward(100), right(90) untuk menggambar rumah.", "Pengalaman pertama mengetik kode teks asli dengan bangga."),
        ("Sesi 87: Mengenal Struktur Variabel Teks: Nama dan Angka", "Penulisan variabel: player_name = 'Budi' dan score = 100 di Python.", "Memahami perbedaan tipe teks (string) dan angka (integer)."),
        ("Sesi 88: Logika Kondisional Teks (If-Else Ramah Anak)", "Membaca kode: if score > 50: print('Hebat!') else: print('Coba lagi!').", "Transisi mulus cara berpikir komputer dari visual ke sintaksis."),
        ("Sesi 89: Perancangan Proyek Mahakarya 2 Tahun (Grand Capstone Finale)", "Menentukan proyek pamungkas impian siswa menggabungkan seluruh keahlian 2 tahun.", "Perencanaan matang proyek puncak wisuda."),
        ("Sesi 90: Produksi Grand Capstone Bagian 1: Desain Dunia & Mekanika Inti", "Membangun struktur dasar game dan aset karakter utama.", "Pendampingan intensif instruktur."),
        ("Sesi 91: Produksi Grand Capstone Bagian 2: Integrasi AI, Suara & Sistem Level", "Menambahkan kecerdasan buatan, dialog suara, dan tantangan bertingkat.", "Pematangan fitur unggulan karya anak."),
        ("Sesi 92: Produksi Grand Capstone Bagian 3: Polishing Visual & Efek Partikel", "Penyempurnaan visual, tombol menu, dan transisi panggung.", "Karya berstandar pameran profesional."),
        ("Sesi 93: Uji Coba Kualitas (Playtesting) Bersama Seluruh Instruktur", "Pengujian bug menyeluruh oleh dewan instruktur Beekoding.", "Memastikan performa aplikasi sempurna tanpa cela."),
        ("Sesi 94: Pembuatan Halaman Web Portofolio Digital Siswa", "Membuat halaman profil online berisi foto anak, video demo, dan sertifikat prestasi.", "Portofolio digital yang bisa diakses keluarga dari mana saja."),
        ("Sesi 95: Gladi Bersih Wisuda Kelulusan 2 Tahun & Pitching Practice", "Latihan pidato kelulusan, postur tubuh percaya diri, dan intonasi presentasi.", "Mempersiapkan mental panggung anak."),
        ("Sesi 96: GRAND GRADUATION DAY & BEEKODING YOUTH EXPO (96 SESI)", "Wisuda Akbar 2 Tahun Kelulusan Tahap 1 Junior Explorer.", "Penganugerahan Plakat & Sertifikat Master Graduate + Tiket Emas Tahap 2.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 8: PRE-CODE TRANSISI & WISUDA AKBAR 2 TAHUN (SESI 85 – 96)", l8)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Generated: {filepath}")


# ==============================================================================
# 2. TAHAP 2: INTERMEDIATE CODER (SESI 01 - 96)
# ==============================================================================
def build_intermediate_pdf(filepath):
    doc = SimpleDocTemplate(filepath, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=20*mm, bottomMargin=20*mm)
    styles = create_styles()
    story = []

    logo_path = 'public/beekoding-logo.png'
    logo_img = Image(logo_path, width=16*mm, height=16*mm) if os.path.exists(logo_path) else ""

    header_table = Table([[
        logo_img,
        [
            Paragraph("<b>BEEKODING ACADEMY</b> • PANDUAN MENGAJAR INSTRUKTUR RESMI", ParagraphStyle('Sub', fontName='Helvetica-Bold', fontSize=8, textColor=COLOR_DARK_AMBER)),
            Paragraph("Tahap 2: Intermediate Coder (Usia 10 – 12 Tahun)", styles['DocTitle']),
            Paragraph("Kurikulum 2 Tahun Lengkap (Sesi 01 – 96) • MIT App Inventor, Web Frontend, Roblox Lua & Python", styles['DocSubtitle'])
        ]
    ]], colWidths=[20*mm, 154*mm])
    header_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=COLOR_PRIMARY_AMBER, spaceBefore=3, spaceAfter=6))

    # Meta Info
    meta = [
        [
            Paragraph("<b>Target Usia:</b> 10 – 12 Tahun (SD Kelas 4, 5, 6)", styles['TableCell']),
            Paragraph("<b>Prasyarat:</b> Logika Dasar, Angka Negatif", styles['TableCell']),
            Paragraph("<b>Platform:</b> App Inventor, HTML/CSS/JS, Roblox, Python", styles['TableCell'])
        ],
        [
            Paragraph("<b>Durasi:</b> 96 Sesi @ 90 Menit (2 Tahun)", styles['TableCell']),
            Paragraph("<b>Rasio:</b> 1 Mentor : 5 – 6 Siswa", styles['TableCell']),
            Paragraph("<b>Output:</b> Aplikasi Android, Website Live, Game 3D", styles['TableCell'])
        ]
    ]
    meta_t = Table(meta, colWidths=[58*mm, 58*mm, 58*mm])
    meta_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_AMBER),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_PRIMARY_AMBER),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(meta_t)
    story.append(Spacer(1, 4))

    # 4-Level Pathway Summary Table
    story.append(Paragraph("🗺️ Peta Jenjang 8 Level (Sesi 01 – 96): Jalur 2 Tahun Penuh", styles['SectionHeading']))
    pw_data = [
        [Paragraph("<b>Level 1 (Sesi 1–12)</b><br/><b>App Inventor:</b> Aplikasi Android Mobile, Sensor Accelerometer, & Database TinyDB.", styles['TableCell']),
         Paragraph("<b>Level 2 (Sesi 13–24)</b><br/><b>Web Frontend:</b> Struktur HTML5 Semantik, Desain CSS3 Flexbox, & Portofolio Web.", styles['TableCell']),
         Paragraph("<b>Level 3 (Sesi 25–36)</b><br/><b>JavaScript Interaktif:</b> Manipulasi DOM, Event Listener, Array & LocalStorage.", styles['TableCell']),
         Paragraph("<b>Level 4 (Sesi 37–48)</b><br/><b>Game Engine 2D:</b> Canvas HTML5, Gravitasi Fisika, Dino Runner, & Hosting Cloud.", styles['TableCell'])],
        [Paragraph("<b>Level 5 (Sesi 49–60)</b><br/><b>Roblox Lua 3D:</b> 3D Workspace, Obby Parkour, Kill Brick, Leaderstats, & Koin.", styles['TableCell']),
         Paragraph("<b>Level 6 (Sesi 61–72)</b><br/><b>Python 3 Teks:</b> Sintaks Teks Murni, Loop While/For, Fungsi Def, & File IO Catatan.", styles['TableCell']),
         Paragraph("<b>Level 7 (Sesi 73–84)</b><br/><b>Olimpiade Bebras:</b> Algoritma Binary Search, Bubble Sort, Stack/Queue, & Ujian OSN.", styles['TableCell']),
         Paragraph("<b>Level 8 (Sesi 85–96)</b><br/><b>Grand Finale:</b> Git & GitHub, Live Custom Domain, Video Pitch, & Wisuda Akbar.", styles['TableCell'])]
    ]
    pw_t = Table(pw_data, colWidths=[43.5*mm]*4)
    pw_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_EMERALD_BG),
        ('BACKGROUND', (0,1), (-1,1), COLOR_BLUE_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(pw_t)
    story.append(Spacer(1, 4))

    # Level 1
    l1 = [
        ("Sesi 01: Arsitektur Aplikasi Smartphone & MIT Companion", "Designer vs Blocks Editor. Live test via WiFi Companion QR Code.", "Memahami cara kerja ponsel pintar menjalankan aplikasi."),
        ("Sesi 02: Aplikasi Soundboard Interaktif & Button Events", "Layout horizontal, tombol gambar, komponen audio Sound.Play.", "Logika saat tombol ditekan memutar efek suara."),
        ("Sesi 03: Sensor Gerak Smartphone (Accelerometer) & Dadu", "Membaca sensor guncangan fisik: when Shaking do random dice.", "Melihat ponsel nyata merespons gerakan tangan anak."),
        ("Sesi 04: Penerjemah Suara Cerdas (AI Speech Recognizer)", "Pengenalan suara AI: siswa bicara ke ponsel, teks diterjemahkan otomatis.", "Aplikasi cilik mirip Google Translate buatan sendiri."),
        ("Sesi 05: Desain UI Modern: Palet Hex, Tipografi, CardView", "Estetika antarmuka modern, padding, border radius sudut melengkung.", "Membangun tampilan aplikasi yang sedap dipandang."),
        ("Sesi 06: Aplikasi Kalkulator Konversi Nilai & Logika Variabel", "TextBox input angka, Label hasil, dan operasi matematika dinamis.", "Membuat aplikasi alat bantu hitung uang jajan anak."),
        ("Sesi 07: Logika Percabangan Kompleks: Penentu Grade Ujian", "if - else if - else: Nilai >= 85 grade A (hijau), < 60 remedial (merah).", "Logika evaluasi bertingkat pada aplikasi."),
        ("Sesi 08: Database Lokal Ponsel (TinyDB Penyimpan Data)", "Data tidak hilang saat aplikasi ditutup: TinyDB.StoreValue.", "Fondasi memahami penyimpanan memori ponsel."),
        ("Sesi 09: Membaca & Menghapus Data TinyDB (To-Do List)", "Mengambil data: TinyDB.GetValue. Menampilkan agenda tugas harian.", "Aplikasi produktivitas mandiri di ponsel anak."),
        ("Sesi 10: Animasi Canvas 2D & Game Sentuh Whack-a-Mole", "Canvas, ImageSprite, Clock Timer. Sprite berpindah acak tiap detik.", "Game reaksi cepat menangkap monster di layar sentuh."),
        ("Sesi 11: Export Berkas APK Mandiri & Instalasi di Ponsel", "Melakukan build .apk, menginstal di ponsel Android anak dan orang tua.", "Kebanggaan nyata memegang aplikasi buatan sendiri."),
        ("Sesi 12: CAPSTONE LEVEL 1: 'My Android Utility App' & Showcase", "Aplikasi Android fungsional terpasang nyata di smartphone.", "Apresiasi: Sertifikat Junior Mobile App Developer Level 1.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 1: MOBILE APP CREATION DENGAN APP INVENTOR (SESI 01 – 12)", l1)

    # Level 2
    l2 = [
        ("Sesi 13: Anatomi Web Dunia: Client, Server & Browser", "Cara kerja internet, request HTTP, dan teks editor VS Code profesional.", "Memahami pondasi internet modern."),
        ("Sesi 14: Struktur Tulang HTML5 Semantik", "Tag pembuka dan penutup: h1, p, a, img, ul, li, section, footer.", "Membangun kerangka dokumen web standar."),
        ("Sesi 15: Merancang Halaman Profil Biodata Developer Cilik", "Website portofolio pribadi berisi foto diri, hobi, dan daftar karya.", "Halaman web biodata pertama anak di browser."),
        ("Sesi 16: Pengenalan CSS3: Warna, Google Fonts & Gaya", "Selector, Property, Value. background-color, color, font-family.", "Menghias tampilan web dengan estetika warna modern."),
        ("Sesi 17: Memahami CSS Box Model (Margin, Border, Padding)", "Kotak kado berbingkai. Jarak luar (margin) vs ruang dalam (padding).", "Kunci utama merapikan posisi elemen di halaman web."),
        ("Sesi 18: Tata Letak Modern dengan CSS Flexbox", "Align items dan justify content untuk susunan rapi horizontal/vertikal.", "Teknik tata letak yang digunakan industri startup."),
        ("Sesi 19: Form Input Interaktif (Teks, Password, Dropdown)", "Tag form, input text, select, button submit.", "Merancang formulir interaktif di halaman web."),
        ("Sesi 20: Desain Responsif & CSS Media Queries", "Tampilan menyesuaikan layar HP dan laptop secara otomatis.", "Website yang nyaman dibaca di perangkat mana saja."),
        ("Sesi 21: Animasi Transisi Halus (Hover Effects & Keyframes)", "Tombol membesar halus saat didekati kursor: transition all 0.3s.", "Efek visual mikro yang memanjakan mata pengguna."),
        ("Sesi 22: Penyusunan Layout Portofolio Karya Lengkap", "Menggabungkan komponen HTML/CSS menjadi website multi-halaman.", "Penyatuan seluruh hasil belajar menjadi karya utuh."),
        ("Sesi 23: Code Review & Pembersihan Struktur Kode", "Indentasi spasi rapi dan validasi standar W3C.", "Membiasakan budaya menulis kode bersih dan rapi."),
        ("Sesi 24: CAPSTONE LEVEL 2: 'My Personal Digital Portfolio'", "Website profil interaktif responsif siap dipamerkan online.", "Apresiasi: Sertifikat Junior Web Designer Level 2.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 2: WEB FRONTEND FUNDAMENTALS (HTML5 & CSS3) (SESI 13 – 24)", l2)

    # Level 3
    l3 = [
        ("Sesi 25: Menghidupkan Web: Otak Logika JavaScript", "HTML adalah tulang, CSS pakaian, JS otot dan saraf penggerak.", "Memahami peran bahasa pemrograman web paling populer di dunia."),
        ("Sesi 26: Variabel Modern (let, const) & Tipe Data", "let skor = 0; const nama = 'Budi'; console.log(nama).", "Dasar penyimpanan memori dalam bahasa pemrograman teks."),
        ("Sesi 27: Manipulasi DOM (Document Object Model)", "document.getElementById('judul').innerText = 'Selamat Datang!'.", "Menghubungkan kode JavaScript dengan elemen di layar HTML."),
        ("Sesi 28: Menangkap Aksi Pengguna (Event Listeners)", "tombol.addEventListener('click', function() { alert('Halo!'); }).", "Merespons klik mouse dan ketikan keyboard pengguna."),
        ("Sesi 29: Fitur Toggle Night Mode / Dark Mode Dinamis", "Memanipulasi class CSS secara dinamis dengan classList.toggle.", "Fitur modern yang sering dijumpai di aplikasi masa kini."),
        ("Sesi 30: Struktur Logika Pengkondisian JS & Perbandingan", "if (umur >= 12) { izinkan(); } else { tolak(); }.", "Percabangan alur logika berdasarkan input data."),
        ("Sesi 31: Logika Perulangan (for loop) & Array Koleksi", "let buah = ['Apel', 'Mangga', 'Jeruk']; for perulangan data.", "Memproses sekumpulan data secara cepat dan efisien."),
        ("Sesi 32: Merender Daftar Elemen Dinamis ke Layar Web", "Menambahkan tag li otomatis dari array data ke halaman web.", "Dasar rendering data yang digunakan framework modern."),
        ("Sesi 33: Aplikasi Web To-Do List Interaktif", "Mengetik tugas, klik tambah, tugas muncul dan bisa dicoret selesai.", "Aplikasi utilitas nyata yang berguna sehari-hari."),
        ("Sesi 34: Penyimpanan Web Browser (LocalStorage)", "localStorage.setItem('tasks', JSON.stringify(daftar)).", "Data tetap tersimpan aman meskipun browser ditutup."),
        ("Sesi 35: Integrasi Audio & Efek Suara Tombol Web", "Memutar suara sound effect saat tugas berhasil diselesaikan.", "Meningkatkan kepuasan interaksi pengguna."),
        ("Sesi 36: CAPSTONE LEVEL 3: Web App Interaktif Mandiri", "Aplikasi web JavaScript mandiri dengan penyimpanan lokal permanen.", "Apresiasi: Sertifikat Junior JavaScript Developer Level 3.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 3: JAVASCRIPT & LOGIKA WEB DINAMIS (SESI 25 – 36)", l3)

    # Level 4
    l4 = [
        ("Sesi 37: Pengenalan HTML5 Canvas & Game Loop", "Siklus perulangan: update -> clear -> draw -> requestAnimationFrame.", "Memahami cara game komputer menggambar grafis berkecepatan tinggi."),
        ("Sesi 38: Karakter Geometri & Animasi Gerak Sumbu X-Y", "Menggerakkan kotak karakter pemain dengan tombol keyboard panah.", "Dasar kontrol pergerakan karakter game di browser."),
        ("Sesi 39: Sistem Gravitasi dan Deteksi Menapak Tanah", "Kecepatan vertikal bertambah ke bawah kecuali menyentuh lantai.", "Fisika gravitasi dunia nyata diimplementasikan ke kode."),
        ("Sesi 40: Algoritma Deteksi Tabrakan Kotak (AABB Collision)", "Rumus matematika memeriksa tumpang-tindih koordinat dua objek.", "Fondasi deteksi kena rintangan pada game platformer."),
        ("Sesi 41: Spawning Rintangan Rintangan Acak & Skor Berjalan", "Rintangan muncul dari kanan meluncur ke kiri secara periodik.", "Tantangan ketangkasan yang semakin cepat seiring waktu."),
        ("Sesi 42: Game Endless Runner 2D: 'Dino Bee Jump'", "Karakter melompati rintangan kaktus yang bergerak semakin cepat.", "Membangun game legendaris seperti Google Chrome Dino Game."),
        ("Sesi 43: Mengganti Kotak dengan Gambar Sprite Animasi", "Memotong bingkai gambar berjalan (walking frames) dari file PNG.", "Grafis game menjadi jauh lebih hidup dan menarik."),
        ("Sesi 44: Audio Manager Game (Musik, Efek Lompat, Game Over)", "Mengelola audio channels agar suara efek tidak memotong musik latar.", "Tata suara game yang profesional."),
        ("Sesi 45: Menu Utama Game, Pause Screen, & Tombol Restart", "State management: MENU, PLAYING, dan GAMEOVER.", "Kelengkapan alur navigasi permainan komersial."),
        ("Sesi 46: Playtesting Antarteman & Balancing Kesulitan", "Uji coba saling memainkan game teman dan menyeimbangkan kecepatan.", "Memastikan game tidak terlalu mudah dan tidak mustahil dimenangkan."),
        ("Sesi 47: Deploy Game ke Cloudflare Pages / GitHub Pages", "Game live di internet dengan alamat web URL resmi gratis.", "Siswa bisa mengirimkan link game ke teman dan grup keluarga."),
        ("Sesi 48: GRAND CAPSTONE TAHUN KE-1: '2D Browser Arcade' (48 Sesi)", "Turnamen pameran game browser karya siswa. Laporan Evaluasi Tahun 1.", "Apresiasi: Sertifikat Intermediate Coder Annual Graduate.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 4: GAME ENGINE 2D & FISIKA GAME JAVASCRIPT (SESI 37 – 48)", l4)

    # Level 5
    l5 = [
        ("Sesi 49: Pengenalan Roblox Studio & 3D Workspace", "Sumbu 3D (X, Y, Z), Part geometri (Block, Sphere), Material & Anchor.", "Memasuki dunia pembuatan game 3D terpopuler di dunia."),
        ("Sesi 50: Membangun Rintangan 3D Pertama (Obby Level 1)", "Menyusun blok lompat lava menantang dan checkpoint SpawnLocation.", "Mendesain rintangan 3D yang seru dimainkan."),
        ("Sesi 51: Bahasa Pemrograman Lua & Scripting di Roblox", "Menulis script Lua di dalam Part: script.Parent.BrickColor = BrickColor.", "Bahasa pemrograman industri game profesional."),
        ("Sesi 52: Event Sentuhan (Touched) & Laser Pembunuh (Kill Brick)", "part.Touched:Connect(function(hit) hit.Parent.Humanoid.Health = 0 end).", "Logika karakter kalah saat menyentuh balok lava merah."),
        ("Sesi 53: Variabel, Properti & Operasi Aritmatika Lua", "Mengubah transparansi blok, kecepatan lari WalkSpeed, dan gravitasi.", "Mempengaruhi hukum fisika di dalam dunia virtual 3D."),
        ("Sesi 54: Timer & Platform Penghilang Jejak Disappearing", "Saat diinjak, blok berkedip selama 2 detik lalu tembus pandang.", "Rintangan klasik yang membutuhkan ketepatan waktu melompat."),
        ("Sesi 55: Papan Peringkat Roblox (Leaderstats: Koin & Level)", "Menyimpan data skor koin dan level pemain di papan peringkat global server.", "Mekanisme kompetisi antarpemain di dunia multiplayer."),
        ("Sesi 56: Benda Koleksi Koin Berputar & Partikel 3D", "Koin berputar otomatis dengan rotasi CFrame dan efek partikel bintang.", "Efek visual 3D yang memikat mata pemain."),
        ("Sesi 57: Pintu Toko Interaktif & Pembelian Power-Up", "Jika Koin >= 10, kurangi 10 koin dan gandakan WalkSpeed menjadi 32.", "Sistem ekonomi mikro di dalam game 3D."),
        ("Sesi 58: Playtesting Multiplayer Bersama di Server yang Sama", "Seluruh siswa bergabung ke 1 server game yang sama untuk mabar.", "Melihat game karya sendiri dimainkan bersama teman sekelas."),
        ("Sesi 59: Menambahkan Efek Suara, Musik & Lighting 3D", "Pencahayaan atmosferik dramatis (Atmosphere & SunRays).", "Kualitas grafis 3D standar game studio profesional."),
        ("Sesi 60: CAPSTONE LEVEL 5: Publikasi Game Obby 3D di Roblox", "Game 3D Roblox live di internet yang bisa dimainkan jutaan pemain.", "Apresiasi: Sertifikat Junior Roblox Game Developer Level 5.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 5: ROBLOX LUA GAME ENGINEERING (SESI 49 – 60)", l5)

    # Level 6
    l6 = [
        ("Sesi 61: Selamat Datang di Dunia Koding Teks: Python 3", "Menulis sintaks teks asli. Fungsi output pertama: print('Halo Dunia!').", "Bahasa pemrograman nomor satu di dunia untuk AI dan software."),
        ("Sesi 62: Variabel Python, Input Pengguna & Format String", "nama = input('Siapa nama kamu? '); print(f'Halo, {nama}!').", "Menerima input dinamis dari keyboard pengguna."),
        ("Sesi 63: Operasi Matematika & Tipe Data Python", "Integer, Float, String, Boolean. Konversi tipe data int() dan float().", "Ketelitian tipe data pada bahasa pemrograman profesional."),
        ("Sesi 64: Percabangan Teks (if, elif, else) & Indentasi Tab", "Python mewajibkan indentasi spasi/tab rapi sebagai penanda blok kode.", "Melatih kedisiplinan struktur penulisan kode bersih."),
        ("Sesi 65: Game Tebak Angka Misterius (Modul random Python)", "Komputer memilih angka rahasia, pemain menebak dengan petunjuk arah.", "Game teks logika yang sangat melatih algoritma biner."),
        ("Sesi 66: Perulangan while Loop & Validasi Input", "Game loop berbasis teks yang terus berjalan sampai pemain mengetik 'keluar'.", "Mengendalikan siklus hidup eksekusi program."),
        ("Sesi 67: Perulangan for Loop & Manipulasi Huruf Teks", "Menghitung jumlah huruf vokal dalam kalimat secara otomatis.", "Pemrosesan karakter teks tingkat dasar."),
        ("Sesi 68: Struktur Data List di Python (Array Dinamis)", "list.append(), list.remove(), list.sort(), dan nilai tertinggi max().", "Mengelola daftar inventori dan nilai skor siswa."),
        ("Sesi 69: Membuat Fungsi Mandiri (def) & Parameter", "Modularitas kode: membungkus logika ke dalam fungsi reusable.", "Konsep inti arsitektur software profesional."),
        ("Sesi 70: Proyek Aplikasi Konsol Teks: Sistem Kasir Mini", "Menghitung total belanja, diskon member, dan cetak struk kasir.", "Aplikasi bisnis nyata yang berguna di dunia perdagangan."),
        ("Sesi 71: Membaca & Menulis Berkas Catatan (File I/O)", "with open('catatan.txt', 'w') as f: f.write('Data aman tersimpan').", "Menyimpan data program ke dalam hard drive komputer."),
        ("Sesi 72: CAPSTONE LEVEL 6: Aplikasi Utilitas Python Mandiri", "Program utilitas Python berbasis teks terminal yang fungsional.", "Apresiasi: Sertifikat Junior Python Programmer Level 6.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 6: TRANSISI KE BAHASA TEKS MURNI: PYTHON 3 (SESI 61 – 72)", l6)

    # Level 7
    l7 = [
        ("Sesi 73: Pengenalan Olimpiade Informatika: Bebras & OSN", "4 pilar Computational Thinking: Dekomposisi, Abstraksi, Pola, Algoritma.", "Mempersiapkan siswa berprestasi di kancah olimpiade sains."),
        ("Sesi 74: Dekomposisi Masalah Rumit Jadi Sub-Tugas Mudah", "Analisis optimasi rute terpendek dan penataan jadwal sibuk.", "Kemampuan memecah masalah besar menjadi bagian-bagian kecil."),
        ("Sesi 75: Pengenalan Pola & Deret Aritmatika-Geometri", "Menemukan formula pola bilangan dan menuliskannya dalam Python.", "Matematika diskrit yang aplikatif dan menyenangkan."),
        ("Sesi 76: Logika Boolean Kompleks & Tabel Kebenaran", "Operasi logika saklar gerbang: AND, OR, NOT, dan XOR.", "Memecahkan teka-teki logika ruang rahasia berkunci ganda."),
        ("Sesi 77: Algoritma Pencarian Efisien: Binary Search", "Menebak halaman kamus dengan selalu membagi dua rentang angka.", "Memahami efisiensi algoritma logarithmic O(log n)."),
        ("Sesi 78: Algoritma Pengurutan Nilai: Bubble Sort", "Menukar dua angka bersebelahan yang salah urutan hingga rapi.", "Melihat visualisasi gerak data di memori komputer."),
        ("Sesi 79: Konsep Tumpukan (Stack) & Antrean (Queue)", "Stack: LIFO (Piring cuci) vs Queue: FIFO (Antrean tiket bioskop).", "Struktur data penting dalam perancangan sistem operasi."),
        ("Sesi 80: Simulasi Soal Ujian Bebras Benjamins Bagian 1", "Bedah soal olimpiade berpikir komputasional internasional resmi.", "Latihan soal logika tingkat dunia."),
        ("Sesi 81: Simulasi Soal Ujian Bebras Benjamins Bagian 2", "Strategi mengenali perangkap soal logika dan trik cepat menjawab.", "Meningkatkan skor kecepatan berpikir analitis."),
        ("Sesi 82: Pembahasan Trik Cepat & Manajemen Waktu Ujian", "Tips tenang menghadapi kompetisi sains nasional dan internasional.", "Membangun ketangguhan mental bertanding siswa."),
        ("Sesi 83: Try Out Mandiri Olimpiade Informatika Dasar", "Simulasi ujian berwaktu mandiri dengan sistem skoring resmi.", "Pengukuran objektif kemampuan logika anak."),
        ("Sesi 84: CAPSTONE LEVEL 7: Evaluasi Kompetensi Algoritma", "Hasil evaluasi skor uji kompetensi logika dan portofolio solusi.", "Apresiasi: Sertifikat Computational Thinking & Olympiad Ready Level 7.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 7: OLIMPIADE KOMPUTASI & PROBLEM SOLVING (SESI 73 – 84)", l7)

    # Level 8
    l8 = [
        ("Sesi 85: Merancang Grand Capstone Mahakarya 2 Tahun", "Pilihan: Web App Interaktif, Game 3D Roblox Kompleks, atau Utilitas Python.", "Perencanaan matang proyek puncak sebelum wisuda."),
        ("Sesi 86: Wireframing UI & Penyusunan Milestone Sprint", "Menyusun target pengerjaan mingguan (Project Management).", "Belajar mengelola proyek seperti software engineer profesional."),
        ("Sesi 87: Sprint 1 Pengerjaan: Fondasi Struktur & Database", "Membangun kerangka dasar sistem dan skema penyimpanan data.", "Pendampingan teknis 1-on-1 dari instruktur senior."),
        ("Sesi 88: Sprint 2 Pengerjaan: Logika Interaktivitas Fitur", "Mengimplementasikan fitur-fitur andalan aplikasi karya anak.", "Fokus pada kelancaran fungsi dan kemudahan penggunaan."),
        ("Sesi 89: Sprint 3 Pengerjaan: Pengujian Bug & Validasi Input", "Mencegah input kosong atau error angka yang bisa merusak aplikasi.", "Membangun sistem yang kokoh terhadap kesalahan pengguna."),
        ("Sesi 90: Sprint 4 Pengerjaan: Sentuhan Estetika UI/UX", "Penyempurnaan palet warna, tipografi, dan audio visual.", "Kualitas presentasi karya berstandar tinggi."),
        ("Sesi 91: Pengenalan Git Dasar & Upload ke GitHub Pribadi", "Siswa memiliki profil GitHub resmi berisi source code dan README.md.", "Memulai jejak digital profesional (*developer footprint*)."),
        ("Sesi 92: Deployment Aplikasi ke Cloud Hosting Publik Live", "Domain website live di internet yang bisa diakses dari smartphone.", "Karya terverifikasi aktif di internet global."),
        ("Sesi 93: Pembuatan Video Demo & Pitch Deck Presentasi", "Slide presentasi ringkas dan video demo screen recording 2 menit.", "Keterampilan komunikasi publik yang sangat berharga."),
        ("Sesi 94: Gladi Bersih Presentasi di Depan Instruktur Senior", "Simulasi tanya-jawab teknis seputar arsitektur kode aplikasi.", "Melatih kesiapan menjawab pertanyaan dewan juri."),
        ("Sesi 95: Rehearsal Wisuda & Diskusi Peminatan Teens Innovator", "Pengenalan roadmap Tahap 3: Python AI, React 19, dan Data Science.", "Menjaga semangat belajar berkesinambungan ke jenjang remaja."),
        ("Sesi 96: GRAND GRADUATION DAY & INTERMEDIATE EXPO (96 SESI)", "Wisuda Akbar 2 Tahun Kelulusan Tahap 2 Intermediate Coder.", "Penganugerahan Sertifikat Master Graduate & Tiket Masuk Tahap 3: Teens Innovator.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 8: INTEGRASI PROYEK AKHIR & PORTOFOLIO MASA DEPAN (SESI 85 – 96)", l8)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Generated: {filepath}")


# ==============================================================================
# 3. TAHAP 3: TEENS INNOVATOR (SESI 01 - 96)
# ==============================================================================
def build_teens_pdf(filepath):
    doc = SimpleDocTemplate(filepath, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=20*mm, bottomMargin=20*mm)
    styles = create_styles()
    story = []

    logo_path = 'public/beekoding-logo.png'
    logo_img = Image(logo_path, width=16*mm, height=16*mm) if os.path.exists(logo_path) else ""

    header_table = Table([[
        logo_img,
        [
            Paragraph("<b>BEEKODING ACADEMY</b> • PANDUAN MENGAJAR INSTRUKTUR RESMI", ParagraphStyle('Sub', fontName='Helvetica-Bold', fontSize=8, textColor=COLOR_DARK_AMBER)),
            Paragraph("Tahap 3: Teens Innovator (Usia 13 – 17 Tahun)", styles['DocTitle']),
            Paragraph("Kurikulum 2 Tahun Lengkap (Sesi 01 – 96) • Python OOP, React 19, Computer Vision, Cloud API & Startup", styles['DocSubtitle'])
        ]
    ]], colWidths=[20*mm, 154*mm])
    header_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=COLOR_PRIMARY_AMBER, spaceBefore=3, spaceAfter=6))

    # Meta Info
    meta = [
        [
            Paragraph("<b>Target Usia:</b> 13 – 17 Tahun (SMP & SMA/SMK)", styles['TableCell']),
            Paragraph("<b>Prasyarat:</b> Aljabar Dasar, Sistem File Komputer", styles['TableCell']),
            Paragraph("<b>Platform:</b> Python 3, React 19, MediaPipe, Supabase, Git", styles['TableCell'])
        ],
        [
            Paragraph("<b>Durasi:</b> 96 Sesi @ 90 – 120 Menit (2 Tahun)", styles['TableCell']),
            Paragraph("<b>Rasio:</b> 1 Mentor : 6 – 8 Siswa", styles['TableCell']),
            Paragraph("<b>Output:</b> Fullstack Web, AI Vision, Portofolio Beasiswa", styles['TableCell'])
        ]
    ]
    meta_t = Table(meta, colWidths=[58*mm, 58*mm, 58*mm])
    meta_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_AMBER),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_PRIMARY_AMBER),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(meta_t)
    story.append(Spacer(1, 4))

    # 4-Level Pathway Summary Table
    story.append(Paragraph("🗺️ Peta Jenjang 8 Level (Sesi 01 – 96): Jalur 2 Tahun Standar Industri", styles['SectionHeading']))
    pw_data = [
        [Paragraph("<b>Level 1 (Sesi 1–12)</b><br/><b>Python & OOP:</b> PEP 8, List Comp, OOP Class/Inheritance, Pygame 2D Engine.", styles['TableCell']),
         Paragraph("<b>Level 2 (Sesi 13–24)</b><br/><b>Modern React:</b> React 19, TypeScript, Tailwind CSS, Hooks, & Vite Deploy.", styles['TableCell']),
         Paragraph("<b>Level 3 (Sesi 25–36)</b><br/><b>AI & Machine Learning:</b> Pandas, Scikit-learn, LLM API, & Prompt Engineering.", styles['TableCell']),
         Paragraph("<b>Level 4 (Sesi 37–48)</b><br/><b>Cloud Backend:</b> Supabase PostgreSQL, CRUD, JWT Auth, RLS, & CI/CD Cloud.", styles['TableCell'])],
        [Paragraph("<b>Level 5 (Sesi 49–60)</b><br/><b>Computer Vision:</b> OpenCV, MediaPipe Hands 21 Titik, Air Canvas, & Pose.", styles['TableCell']),
         Paragraph("<b>Level 6 (Sesi 61–72)</b><br/><b>RESTful API Backend:</b> FastAPI Python, Pydantic, Swagger Docs, & Docker.", styles['TableCell']),
         Paragraph("<b>Level 7 (Sesi 73–84)</b><br/><b>Data Science:</b> Web Scraping, Time Series, NLP Sentiment, & Streamlit Dashboard.", styles['TableCell']),
         Paragraph("<b>Level 8 (Sesi 85–96)</b><br/><b>Startup Incubator:</b> Grand Capstone Multi-Cloud, Pitch Deck Silicon Valley & Wisuda.", styles['TableCell'])]
    ]
    pw_t = Table(pw_data, colWidths=[43.5*mm]*4)
    pw_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_EMERALD_BG),
        ('BACKGROUND', (0,1), (-1,1), COLOR_BLUE_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(pw_t)
    story.append(Spacer(1, 4))

    # Level 1
    l1 = [
        ("Sesi 01: Ekosistem Python 3 Modern, Terminal Shell & PEP 8", "VS Code, virtual environment (venv), pip manager, sintaks clean code PEP 8.", "Membiasakan remaja bekerja dengan alat pengembang profesional."),
        ("Sesi 02: Tipe Data Kompleks: List Comprehensions & Dictionaries", "data = [x**2 for x in range(10) if x % 2 == 0]. Nested dictionary.", "Sintaks Python elegan dan efisien untuk pemrosesan data."),
        ("Sesi 03: Penanganan Kesalahan Eksepsi (Try-Except-Finally)", "Mencegah aplikasi crash: try: res = int(val) except ValueError as err.", "Menulis program yang tangguh terhadap kesalahan input pengguna."),
        ("Sesi 04: Pemrograman Berorientasi Objek (OOP): Class & __init__", "class Student: def __init__(self, name, xp): self.name = name; self.xp = xp.", "Paradigma pemrograman standar industri software engineering."),
        ("Sesi 05: OOP: Enkapsulasi, Getter-Setter & Metode Spesial", "Melindungi variabel internal kelas dan metode __repr__ serta __str__.", "Memastikan integritas data objek dalam program."),
        ("Sesi 06: OOP: Pewarisan (Inheritance) & Polimorfisme", "class PremiumUser(User): def get_discount(): return self.rate * 0.8.", "Efisiensi kode tanpa menduplikasi logika yang sama."),
        ("Sesi 07: Sistem Manipulasi File Lanjut: JSON & CSV Parsing", "Membaca dataset .json dan mengekspor laporan terstruktur ke format .csv.", "Integrasi penyimpanan data aplikasi berbasis file."),
        ("Sesi 08: Algoritma Pencarian & Pengurutan (QuickSort & Lambda)", "sorted_list = sorted(products, key=lambda p: p['price'], reverse=True).", "Algoritma pengurutan data tingkat lanjut."),
        ("Sesi 09: Pengenalan Pygame 2D Engine: Loop & Event Handling", "Refresh rate 60 FPS, memproses event keyboard dan mouse tanpa lag.", "Membangun game 2D dari baris kode Python murni."),
        ("Sesi 10: Pygame Sprite Groups & Vektor Gerak 2D", "Menembakkan laser peluru dan mendeteksi tabrakan dengan musuh alien.", "Matematika vektor 2D diaplikasikan ke pergerakan game."),
        ("Sesi 11: Game Space Shooter Lengkap: Skor, Audio & Partikel", "State machine (MENU, PLAYING), audio channels, dan partikel ledakan.", "Menghasilkan video game desktop yang seru dan mulus."),
        ("Sesi 12: CAPSTONE LEVEL 1: 'Python Space Defense' & Refactoring", "Game 2D modular berbasis OOP Python dengan arsitektur bersih.", "Apresiasi: Sertifikat Junior Python Software Engineer Level 1.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 1: PYTHON CORE & OBJECT-ORIENTED PROGRAMMING (SESI 01 – 12)", l1)

    # Level 2
    l2 = [
        ("Sesi 13: Arsitektur Web Modern: Single Page Application (SPA)", "Mengapa startup beralih ke React, Vite bundler, dan ekosistem npm modern.", "Memahami evolusi teknologi web terkini."),
        ("Sesi 14: Komponen React & Sintaks JSX Modern", "Membuat komponen fungsi reusable: function ProductCard({ title, price }).", "Pondasi modular antarmuka web modern."),
        ("Sesi 15: Styling Modern dengan Tailwind CSS Utility Classes", "Flexbox, grid, responsif breakpoint (sm, md, lg), dan styling dark mode.", "Framework styling paling banyak digunakan developer startup."),
        ("Sesi 16: Manajemen State Komponen dengan Hook useState", "Pengaturan state form input, counter angka, dan toggle menu interaktif.", "Reaktivitas antarmuka tanpa manipulasi DOM manual."),
        ("Sesi 17: Siklus Hidup & Efek Samping dengan Hook useEffect", "Mengambil data API saat komponen pertama kali dimuat (fetch on mount).", "Menghubungkan komponen antarmuka dengan dunia luar."),
        ("Sesi 18: Penanganan Form Terkendali & Validasi Input", "Validasi format email dan password secara realtime sebelum submit.", "Keamanan dan kenyamanan pengalaman pengguna mengisi data."),
        ("Sesi 19: Rendering List Dinamis & Kunci Unik React (key)", "items.map(item => <ItemRow key={item.id} data={item} />).", "Merender ribuan data dengan performa rendering optimal."),
        ("Sesi 20: Manajemen State Global dengan Context API", "Mengalirkan state Theme (Dark/Light) dan Authentication ke seluruh halaman.", "Menghindari prop drilling antar hierarki komponen."),
        ("Sesi 21: Routing Halaman Multi-View Client-Side", "Navigasi antar halaman Home, Dashboard, dan Profil tanpa reload browser.", "Pengalaman browsing secepat aplikasi mobile native."),
        ("Sesi 22: Desain Dashboard Portofolio Developer Profesional", "Antarmuka dashboard dengan diagram visual grafik dan widget metrik metrik.", "Desain UI modern standar dashboard SaaS Silicon Valley."),
        ("Sesi 23: Optimasi Kinerja Web: Code Splitting & Lazy Loading", "Memperkecil ukuran bundle awal agar website terbuka dalam < 1 detik.", "Standar Web Vitals dan optimasi performa tinggi."),
        ("Sesi 24: CAPSTONE LEVEL 2: 'Modern Developer Showcase Web App'", "Web App React modern yang terdeploy live di Cloudflare Pages / Vercel.", "Apresiasi: Sertifikat Junior React Frontend Engineer Level 2.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 2: MODERN FRONTEND WEB (REACT 19 & TAILWIND) (SESI 13 – 24)", l2)

    # Level 3
    l3 = [
        ("Sesi 25: Pengantar AI Modern: Machine Learning vs Deep Learning", "Bagaimana model AI dilatih menggunakan data (Dataset -> Model -> Inference).", "Membedah cara kerja kecerdasan buatan dari balik layar."),
        ("Sesi 26: Analisis Data Eksploratif Menggunakan Pandas & Numpy", "Membaca file CSV, membersihkan missing values, menghitung rata-rata.", "Keahlian dasar mengolah data mentah menjadi informasi berharga."),
        ("Sesi 27: Visualisasi Data Interaktif: Matplotlib & Seaborn", "Menampilkan grafik heatmap korelasi dan diagram sebaran scatter plot.", "Mengkomunikasikan wawasan data melalui grafik visual jelas."),
        ("Sesi 28: Model Prediksi Machine Learning: Regresi Linear", "Memprediksi harga rumah atau nilai ujian berdasarkan jam belajar siswa.", "Model kecerdasan buatan prediksi angka pertama siswa."),
        ("Sesi 29: Model Klasifikasi Data: Decision Tree & Random Forest", "Mengklasifikasikan email spam vs bukan spam secara otomatis.", "Model pengambilan keputusan berbasis pohon logika AI."),
        ("Sesi 30: Evaluasi Akurasi Model AI: Precision, Recall & F1", "Menghindari bias data dan mengukur keandalan model prediksi AI.", "Standar metodologi sains data yang valid dan etis."),
        ("Sesi 31: Pengenalan LLM & Arsitektur Transformer", "Tokenisasi, context window, embeddings, dan temperature pada model AI.", "Memahami teknologi di balik ChatGPT, Gemini, dan Claude."),
        ("Sesi 32: Integrasi REST API LLM Modern (Gemini / OpenAI API)", "Mengirim request HTTP POST dari Python untuk mendapatkan respon AI cerdas.", "Menghubungkan kode program siswa dengan model AI tercanggih."),
        ("Sesi 33: Prompt Engineering Tingkat Mahir: Structured JSON", "Memaksa output LLM selalu berupa JSON schema valid untuk diproses kode.", "Teknik prompting standar arsitektur kecerdasan buatan."),
        ("Sesi 34: Membangun Aplikasi 'AI Smart Study Buddy'", "Asisten belajar pintar yang mampu meringkas modul PDF dan membuat kuis.", "Aplikasi kecerdasan buatan nyata yang membantu pendidikan teman sebaya."),
        ("Sesi 35: Etika AI, Privasi Data & Pengelolaan Secret (.env)", "Tidak boleh mengunggah kunci API rahasia ke repositori publik GitHub.", "Tata kelola keamanan siber dan etika profesional."),
        ("Sesi 36: CAPSTONE LEVEL 3: 'AI Powered Learning Assistant'", "Aplikasi web kecerdasan buatan terintegrasi API yang siap pakai.", "Apresiasi: Sertifikat Junior AI & Machine Learning Specialist Level 3.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 3: MACHINE LEARNING & GENERATIVE AI INTEGRATION (SESI 25 – 36)", l3)

    # Level 4
    l4 = [
        ("Sesi 37: Arsitektur Backend: Monolith vs Serverless Cloud", "Peran server cloud, database relasional SQL, dan API gateway.", "Memahami fondasi infrastruktur cloud modern."),
        ("Sesi 38: Database Relasional PostgreSQL & Cloud Supabase", "Tabel, baris, kolom, tipe data UUID, primary key, dan foreign key.", "Database terstruktur yang andal menampung jutaan transaksi."),
        ("Sesi 39: Desain Skema Database (Entity Relationship Diagram)", "Merancang skema tabel: Users, Courses, Batches, dan Transactions.", "Arsitektur data relasional standar industri."),
        ("Sesi 40: Operasi Database CRUD Lengkap via Supabase Client", "supabase.from('tasks').select(), .insert(), .update(), .delete().", "Mengoperasikan database cloud langsung dari kode program."),
        ("Sesi 41: Sistem Autentikasi Pengguna: Email, Password & JWT", "Registrasi, login aman, reset password, dan proteksi sesi aktif.", "Fitur keamanan identitas pengguna standar aplikasi web."),
        ("Sesi 42: Keamanan Baris Data (Row Level Security - RLS)", "Aturan SQL: Pengguna hanya boleh membaca data miliknya sendiri.", "Proteksi keamanan database tingkat tinggi mencegah kebocoran data."),
        ("Sesi 43: Cloud Storage: Upload Foto Profil & Dokumen", "Mengunggah avatar gambar ke bucket Supabase Storage dan URL publik.", "Penyimpanan berkas media di server komputasi awan."),
        ("Sesi 44: Realtime Database Subscriptions (Live Data Sync)", "Data di layar otomatis terupdate tanpa reload saat database berubah.", "Membangun fitur chat dan notifikasi langsung waktu nyata."),
        ("Sesi 45: Integrasi Penuh Frontend React dengan Cloud Supabase", "Menyatukan antarmuka visual dengan penyimpanan database awan.", "Aplikasi web fullstack fungsional seutuhnya."),
        ("Sesi 46: Penanganan Keamanan & Sanitasi Input (CORS, XSS)", "Mencegah serangan injeksi kode jahat dari peretas luar.", "Standar keamanan aplikasi berbasis web produksi."),
        ("Sesi 47: CI/CD Pipeline & Automated Cloud Deployment", "Automasi deployment cloud menggunakan GitHub Actions.", "Praktik DevOps modern para software engineer."),
        ("Sesi 48: GRAND CAPSTONE TAHUN KE-1: 'Fullstack Cloud Web App' (48 Sesi)", "Presentasi aplikasi fullstack cloud mandiri di hadapan dewan juri.", "Apresiasi: Sertifikat Resmi Teens Innovator Annual Graduate.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 4: CLOUD BACKEND & DATABASE SUPABASE (SESI 37 – 48)", l4)

    # Level 5
    l5 = [
        ("Sesi 49: Pengantar Computer Vision & OpenCV Python", "Matriks piksel BGR, pemrosesan citra digital, akses webcam realtime.", "Memberi mata pada komputer untuk melihat dunia nyata."),
        ("Sesi 50: Operasi Citra: Grayscale, Blur & Edge Canny", "cv2.cvtColor, GaussianBlur, Canny untuk deteksi garis tepi objek.", "Transformasi citra digital untuk ekstraksi fitur visual."),
        ("Sesi 51: Pelacakan Fitur Wajah dengan MediaPipe Face Mesh", "468 titik koordinat landmark wajah 3D untuk deteksi mata dan senyum.", "Teknologi pengenal ekspresi wajah kecerdasan buatan."),
        ("Sesi 52: Deteksi Gestur Tangan (Hand Tracking 21 Titik)", "Membaca koordinat ujung jari telunjuk (Landmark 8) dan jempol (Landmark 4).", "Pelacakan jari tangan manusia dengan latensi rendah."),
        ("Sesi 53: Aplikasi 'Air Canvas': Melukis di Udara Bebas", "Menggerakkan jari di depan kamera untuk menggambar garis warna tanpa sentuh.", "Karya aplikasi augmented reality interaktif yang memukau."),
        ("Sesi 54: Pengenalan Gerakan Cubit (Pinch Gesture Mode)", "Jarak euclidean telunjuk-jempol < 30px untuk klik / ganti kuas.", "Interaksi gestur alami ala headset Apple Vision Pro."),
        ("Sesi 55: Game Pengendali Tanpa Sentuh (Touchless Controller)", "Gerakan tangan di kamera untuk mengendalikan mobil balap virtual.", "Pengganti joystick fisik menggunakan kecerdasan buatan vision."),
        ("Sesi 56: Deteksi Postur Tubuh (MediaPipe Pose Tracking 33 Titik)", "Aplikasi Fitness AI penghitung otomatis gerakan push-up dan squat.", "Penerapan AI vision pada industri kesehatan dan olahraga."),
        ("Sesi 57: Klasifikasi Gestur Kustom dengan Model Machine Learning", "Melatih model K-NN untuk mengenali kode bahasa isyarat tangan.", "Teknologi inklusif untuk membantu teman tuli berkomunikasi."),
        ("Sesi 58: Optimasi Frame Rate (FPS) & Threading Webcam", "Memastikan program berjalan mulus di 30-60 FPS tanpa jeda patah-patah.", "Optimasi komputasi performa tinggi di Python."),
        ("Sesi 59: Gladi Bersih Proyek Computer Vision Interaktif", "Pengujian variasi pencahayaan ruangan dan kestabilan landmark.", "Penyempurnaan responsivitas aplikasi."),
        ("Sesi 60: CAPSTONE LEVEL 5: 'Touchless AI Vision Application'", "Aplikasi Computer Vision mandiri interaktif responsif.", "Apresiasi: Sertifikat Junior Computer Vision Engineer Level 5.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 5: COMPUTER VISION & REALTIME AI GESTURE (SESI 49 – 60)", l5)

    # Level 6
    l6 = [
        ("Sesi 61: Arsitektur RESTful API & Standar HTTP Protocols", "Endpoint URL, status code (200 OK, 201 Created, 400 Bad, 404, 500).", "Bahasa komunikasi universal antar komputer di internet."),
        ("Sesi 62: Framework FastAPI Python & Pemrograman Asinkron", "@app.get('/api/v1/users') async def: return {'status': 'success'}.", "Framework backend Python modern tercepat standar industri."),
        ("Sesi 63: Validasi Skema Data Otomatis dengan Pydantic Models", "Memastikan request JSON sesuai tipe data valid sebelum diproses.", "Mencegah kesalahan data kotor merusak server."),
        ("Sesi 64: Dokumentasi API Otomatis dengan Swagger UI", "Dokumentasi interaktif terstandar industri dapat diuji di /docs.", "Kemudahan kolaborasi antar tim backend dan frontend."),
        ("Sesi 65: Koneksi Database Relasional Menggunakan ORM", "Berinteraksi dengan database menggunakan objek Python tanpa SQL manual.", "Abstraksi database profesional yang aman dan bersih."),
        ("Sesi 66: Autentikasi Modern: Hash bcrypt & OAuth2 JWT Tokens", "Password tidak pernah disimpan teks polos, melainkan hash kriptografi.", "Keamanan akun pengguna berstandar perbankan digital."),
        ("Sesi 67: Middleware: CORS & Rate Limiting Proteksi Server", "Mengizinkan frontend mengakses API dan membatasi request spam per detik.", "Mencegah serangan brute force dan server kelebihan beban."),
        ("Sesi 68: Background Task & Pemrosesan Asinkron Worker", "Mengirim email notifikasi di latar belakang tanpa membuat user menunggu.", "Optimasi throughput server backend."),
        ("Sesi 69: Pengujian API Otomatis (Unit Testing dengan Pytest)", "Menguji setiap endpoint otomatis sebelum kode dipublikasikan.", "Menjamin keandalan software tanpa regresi bug."),
        ("Sesi 70: Containerization: Membuat Dockerfile Pertama", "Membungkus aplikasi backend ke dalam kontainer Docker portabel.", "Standar infrastruktur deployment cloud modern."),
        ("Sesi 71: Deploy Backend ke Cloud Serverless (Render / Railway)", "Server backend aktif online 24 jam melayani request dari seluruh dunia.", "Kemandirian merilis server produksi di awan."),
        ("Sesi 72: CAPSTONE LEVEL 6: Produksi RESTful API Microservice", "Backend API live di cloud dengan otentikasi token JWT dan Swagger resmi.", "Apresiasi: Sertifikat Junior Backend API Specialist Level 6.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 6: BACKEND API RESTFUL DENGAN FASTAPI (SESI 61 – 72)", l6)

    # Level 7
    l7 = [
        ("Sesi 73: Siklus Proyek Data Science: Dari Data Menjadi Value", "CRISP-DM: Business Understanding, Data Prep, Modeling, Evaluation.", "Metodologi riset data para analis perusahaan teknologi."),
        ("Sesi 74: Web Scraping Beretika: Ambil Data Publik (BeautifulSoup)", "Mengumpulkan data harga pasar atau ulasan pengguna otomatis dari web.", "Keahlian menambang data publik untuk bahan riset."),
        ("Sesi 75: Data Wrangling & Feature Engineering Lanjut", "Normalisasi skala data, one-hot encoding, ekstraksi fitur tanggal.", "Menyiapkan data agar siap diproses algoritma machine learning."),
        ("Sesi 76: Analisis Deret Waktu (Time Series Forecasting)", "Memprediksi tren penjualan masa depan berdasarkan data masa lalu.", "Keahlian prediksi bisnis yang sangat dicari industri."),
        ("Sesi 77: Natural Language Processing (NLP) & Analisis Sentimen", "Klasifikasi komentar media sosial: positif, netral, atau negatif.", "Memahami persepsi publik melalui kecerdasan bahasa alami."),
        ("Sesi 78: Unsupervised Learning: Clustering K-Means", "Pengelompokan segmentasi profil pelanggan otomatis tanpa label.", "Personalisasi layanan digital berbasis data pelanggan."),
        ("Sesi 79: Dashboard Visualisasi Bisnis dengan Streamlit", "Mengubah analisis Python menjadi dashboard web visual dalam 50 baris.", "Membuat aplikasi data analytics interaktif dengan cepat."),
        ("Sesi 80: Integrasi Model Prediksi ke Dalam Dashboard Web", "Pengguna menggeser slider nilai, dashboard menampilkan prediksi realtime.", "Menghidupkan model sains data ke tangan pengguna awam."),
        ("Sesi 81: Uji Validitas Statistik & A/B Testing Fundamentals", "Pengujian hipotesis statistik apakah fitur baru benar-benar efektif.", "Pengambilan keputusan berbasis data faktual (*Data-Driven*)."),
        ("Sesi 82: Pembuatan Laporan Eksekutif Data Science Bisnis", "Menulis kesimpulan bisnis yang mudah dipahami direktur dan investor.", "Keterampilan komunikasi data eksekutif."),
        ("Sesi 83: Deploy Dashboard Data Analytics ke Streamlit Cloud", "Dashboard analitik data live aktif di internet siap dibagikan.", "Portofolio visual analitik yang mengesankan di CV."),
        ("Sesi 84: CAPSTONE LEVEL 7: 'Big Data Predictive Analytics Dashboard'", "Dashboard data live yang menyajikan prediksi cerdas dan visualisasi.", "Apresiasi: Sertifikat Junior Data Scientist Specialist Level 7.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 7: DATA SCIENCE & PREDICTIVE ANALYTICS (SESI 73 – 84)", l7)

    # Level 8
    l8 = [
        ("Sesi 85: Inkubasi Ide Startup: Design Thinking & Lean Canvas", "Identifikasi masalah pasar nyata, Value Proposition dan target pengguna.", "Membina jiwa kewirausahaan teknologi (*Technopreneurship*)."),
        ("Sesi 86: Arsitektur Sistem Terpadu (Fullstack + API + AI Engine)", "Merancang arsitektur monorepo menggabungkan seluruh keahlian 2 tahun.", "Arsitektur software skala besar standar insinyur senior."),
        ("Sesi 87: Sprint 1: Setup Repositori Organisasi & Cloud DB", "Manajemen branch git, project board kanban, dan database schema.", "Memulai siklus pengembangan software tangkas (Agile/Scrum)."),
        ("Sesi 88: Sprint 2: Core Engine & Logika Bisnis Aplikasi", "Membangun fitur inti aplikasi startup yang memecahkan masalah utama.", "Fokus pada penyelesaian fungsionalitas produk terpenting."),
        ("Sesi 89: Sprint 3: Integrasi Layanan AI Cerdas & Analisis Data", "Menyematkan kecerdasan buatan LLM/Vision ke dalam alur aplikasi.", "Memberikan keunggulan kompetitif unik pada produk siswa."),
        ("Sesi 90: Sprint 4: Antarmuka Responsif & Desain Aksesibilitas", "Pengujian tampilan mobile, dark mode, dan kemudahan navigasi pengguna.", "Pengalaman pengguna yang menyenangkan dan intuitif."),
        ("Sesi 91: Security Audit & Performance Profiling (Lighthouse 95+)", "Enkripsi data, sanitasi input, audit performa Web Vitals halaman.", "Kesiapan produk menghadapi lalu lintas pengguna internet massal."),
        ("Sesi 92: Deployment Multi-Cloud (Cloudflare, Railway, Supabase)", "Konfigurasi domain kustom HTTPS SSL dan integrasi continuous deploy.", "Peluncuran produk ke internet secara resmi dan aman."),
        ("Sesi 93: Penyusunan Portofolio Akademik & GitHub Profile README", "Menulis resume teknologi internasional untuk beasiswa kampus luar negeri.", "Aset krusial pendaftaran universitas dan karir masa depan."),
        ("Sesi 94: Pitch Deck Standar Silicon Valley & Teknik Demo Day", "Presentasi 5 menit: Problem -> Solution -> Demo -> Tech -> Roadmap.", "Keterampilan pitching persuasif di hadapan investor dan akademisi."),
        ("Sesi 95: Rehearsal Akbar & Evaluasi Panel Dewan Juri Industri", "Simulasi tanya jawab teknis bersama praktisi senior industri software.", "Penyempurnaan akhir sebelum wisuda kelulusan akbar."),
        ("Sesi 96: GRAND DEMO DAY & BEEKODING TEENS GRADUATION (96 SESI)", "Wisuda Akbar 2 Tahun Kelulusan Tahap 3 Teens Innovator.", "Penganugerahan Gelar Kehormatan Beekoding Junior Tech Leader & Sertifikat Master.")
    ]
    render_sessions_block(story, styles, "📌 LEVEL 8: GRAND CAPSTONE STARTUP INCUBATOR & WISUDA (SESI 85 – 96)", l8)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Generated: {filepath}")


if __name__ == '__main__':
    os.makedirs('public/curriculum', exist_ok=True)
    p1 = os.path.join('public', 'curriculum', 'panduan-instruktur-junior-explorer.pdf')
    p2 = os.path.join('public', 'curriculum', 'panduan-instruktur-intermediate-coder.pdf')
    p3 = os.path.join('public', 'curriculum', 'panduan-instruktur-teens-innovator.pdf')

    print("Generating comprehensive 96-session Stage Instructor Guide PDFs...")
    build_junior_pdf(p1)
    build_intermediate_pdf(p2)
    build_teens_pdf(p3)
    print("All 96-session stage instructor guide PDFs successfully generated!")
