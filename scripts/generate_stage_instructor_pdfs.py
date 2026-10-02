import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Image, HRFlowable, Preformatted
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
COLOR_CODE_BG = colors.HexColor('#F1F5F9')       # Slate 100

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
            self.drawString(18 * mm, 285 * mm, "BEEKODING • PANDUAN LENGKAP INSTRUKTUR & MODUL AJAR RESMI")
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
        fontSize=18,
        leading=22,
        textColor=COLOR_NAVY,
        spaceAfter=4,
    )

    styles['DocSubtitle'] = ParagraphStyle(
        'DocSubtitle',
        parent=base['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=COLOR_DARK_AMBER,
        spaceAfter=10,
    )

    styles['SectionHeading'] = ParagraphStyle(
        'SectionHeading',
        parent=base['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=COLOR_NAVY,
        spaceBefore=12,
        spaceAfter=6,
    )

    styles['SessionTitle'] = ParagraphStyle(
        'SessionTitle',
        parent=base['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=COLOR_DARK_AMBER,
        spaceBefore=6,
        spaceAfter=2,
    )

    styles['SessionDetail'] = ParagraphStyle(
        'SessionDetail',
        parent=base['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=COLOR_TEXT_MAIN,
        spaceAfter=3,
    )

    styles['AnalogyText'] = ParagraphStyle(
        'AnalogyText',
        parent=base['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=11,
        textColor=COLOR_DARK_AMBER,
        spaceAfter=4,
    )

    styles['CodeBlock'] = ParagraphStyle(
        'CodeBlock',
        parent=base['Normal'],
        fontName='Courier',
        fontSize=7.5,
        leading=10,
        textColor=COLOR_NAVY,
    )

    styles['TableHeader'] = ParagraphStyle(
        'TableHeader',
        parent=base['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=COLOR_NAVY,
        alignment=1, # Center
    )

    styles['TableCell'] = ParagraphStyle(
        'TableCell',
        parent=base['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=COLOR_TEXT_MAIN,
    )

    styles['TableCellBold'] = ParagraphStyle(
        'TableCellBold',
        parent=base['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=COLOR_NAVY,
    )

    styles['Callout'] = ParagraphStyle(
        'Callout',
        parent=base['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=COLOR_NAVY_LIGHT,
    )

    return styles


def build_junior_pdf(filepath):
    doc = SimpleDocTemplate(filepath, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=20*mm, bottomMargin=20*mm)
    styles = create_styles()
    story = []

    logo_path = 'public/beekoding-logo.png'
    logo_img = Image(logo_path, width=16*mm, height=16*mm) if os.path.exists(logo_path) else ""

    header_table = Table([[
        logo_img,
        [
            Paragraph("<b>BEEKODING</b> • PANDUAN MENGAJAR INSTRUKTUR RESMI", ParagraphStyle('Sub', fontName='Helvetica-Bold', fontSize=8, textColor=COLOR_DARK_AMBER)),
            Paragraph("Tahap 1: Junior Explorer (Usia 6 – 9 Tahun)", styles['DocTitle']),
            Paragraph("Rencana Pembelajaran 12 Sesi Siap Ajar • Unplugged Logic, ScratchJr & Scratch 3.0", styles['DocSubtitle'])
        ]
    ]], colWidths=[20*mm, 154*mm])
    header_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=COLOR_PRIMARY_AMBER, spaceBefore=4, spaceAfter=8))

    # Meta Info
    meta = [
        [
            Paragraph("<b>Target Usia:</b> 6 – 9 Tahun (TK B – SD 1-3)", styles['TableCell']),
            Paragraph("<b>Prasyarat:</b> Zero Experience (Pemula)", styles['TableCell']),
            Paragraph("<b>Platform:</b> ScratchJr, Scratch 3.0", styles['TableCell'])
        ],
        [
            Paragraph("<b>Durasi:</b> 12 Sesi @ 75 – 90 Menit", styles['TableCell']),
            Paragraph("<b>Rasio:</b> 1 Mentor : 4 – 5 Siswa", styles['TableCell']),
            Paragraph("<b>Output:</b> 2 Mini Proyek + 1 Capstone Game", styles['TableCell'])
        ]
    ]
    meta_t = Table(meta, colWidths=[58*mm, 58*mm, 58*mm])
    meta_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_AMBER),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_PRIMARY_AMBER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(meta_t)
    story.append(Spacer(1, 6))

    # Rundown
    story.append(Paragraph("🧭 Rundown Standar 90 Menit Mengajar Mentor", styles['SectionHeading']))
    rundown_data = [
        [Paragraph("<b>00–10' Ice Breaking</b><br/>Sapa anak, review 1 mnt, tunjukkan cuplikan game seru.", styles['TableCell']),
         Paragraph("<b>10–25' Live Demo</b><br/>Demo blok di layar bersama; jelaskan dengan analogi konkret.", styles['TableCell']),
         Paragraph("<b>25–60' Hands-on</b><br/>Siswa menyusun blok dipandu. Share screen bergantian.", styles['TableCell']),
         Paragraph("<b>60–75' Challenge</b><br/>Tantangan modif warna, suara & kecepatan mandiri.", styles['TableCell']),
         Paragraph("<b>75–90' Showcase</b><br/>Show & Tell, tepuk tangan koding, quest rumah.", styles['TableCell'])]
    ]
    rd_t = Table(rundown_data, colWidths=[34.8*mm]*5)
    rd_t.setStyle(TableStyle([('BACKGROUND', (0,0), (-1,-1), COLOR_LIGHT_AMBER), ('GRID', (0,0), (-1,-1), 0.5, COLOR_PRIMARY_AMBER), ('TOPPADDING', (0,0), (-1,-1), 4), ('BOTTOMPADDING', (0,0), (-1,-1), 4)]))
    story.append(rd_t)
    # Pathway 48 Sesi (1 Tahun Penuh)
    story.append(Paragraph("🗺️ Peta Jenjang 48 Sesi (1 Tahun Penuh): 4 Modul Tingkat", styles['SectionHeading']))
    pathway_junior = [
        [Paragraph("<b>Level 1 (Sesi 1–12)</b><br/><b>Starter Foundation:</b> ScratchJr, Algoritma Dasar, Cerita Digital, & Game Arcade Pertama.", styles['TableCell']),
         Paragraph("<b>Level 2 (Sesi 13–24)</b><br/><b>Game Mechanics:</b> Gravitasi X/Y, Multi-Level Maze, Variabel Skor, & AI Text-to-Speech.", styles['TableCell']),
         Paragraph("<b>Level 3 (Sesi 25–36)</b><br/><b>Hardware & Sensory:</b> Koding Micro:bit / Makey Makey, Sensor Gerak & Musik Interaktif.", styles['TableCell']),
         Paragraph("<b>Level 4 (Sesi 37–48)</b><br/><b>Junior Game Jam:</b> Kolaborasi Tim, Animasi Kompleks, Pameran Karya & Persiapan Lomba.", styles['TableCell'])]
    ]
    pw_j = Table(pathway_junior, colWidths=[43.5*mm]*4)
    pw_j.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_EMERALD_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_EMERALD),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(pw_j)
    story.append(Spacer(1, 6))

    # Lesson plans 12 sessions
    sessions = [
        ("Sesi 01: Petualangan Robot Lebah (Unplugged Computational Thinking)",
         "Konsep: Algoritma & Urutan Langkah. Komputer tidak bisa menebak; butuh instruksi presisi.",
         "Analogi Mentor: 'Bayangkan robot pelayan: kalau cuma dibilang 'ambil minum', dia bingung. Harus detail: Maju 3 langkah -> Buka kulkas -> Ambil botol.'",
         "Aktivitas: Permainan fisik 'Robot Manusia' dan lembar maze arah [↑] [↑] [→] [↑]."),
        ("Sesi 02: Menghidupkan Karakter di Scratch (Stage, Sprite, & Motion)",
         "Konsep: Panggung (Stage), Aktor (Sprite), dan Perintah Gerak Pertama (Motion).",
         "Kode Inti: [When Green Flag Clicked] -> move (50) steps -> say [Halo, aku Beeby!] for (2) secs.",
         "Tips Mentor: Ajarkan siswa memilih background Flowers dan sprite Bee. Ukuran dikecilkan ke 50%."),
        ("Sesi 03: Pemicu Peristiwa (Events: Klik, Sentuh, & Suara)",
         "Konsep: Hubungan sebab-akibat (Cause & Effect) melalui blok event topi emas.",
         "Kode Inti: [When this sprite clicked] -> change size by (20) -> start sound [Magic Spell] -> say [Terima kasih!] -> wait (1) sec -> set size to (100)%.",
         "Tantangan Siswa: Tambahkan 3 bunga berbeda yang bersuara nada Pop, Boing, dan Coin."),
        ("Sesi 04: Kepakan Sayap Lebah (Perulangan Loop: Repeat & Forever)",
         "Konsep: Loop otomatis. Menghindari menyusun ratusan blok yang sama.",
         "Kode Inti: [When Green Flag Clicked] -> forever [next costume -> wait (0.2) secs -> move (5) steps -> if on edge, bounce].",
         "Common Bug: Sayap mengepak secepat kilat. Solusi: Pastikan ada wait (0.2) secs."),
        ("Sesi 05: Percakapan Santun Dua Karakter (Timing & Wait Block)",
         "Konsep: Komunikasi dua arah; karakter saling menunggu giliran bicara.",
         "Kode Inti: Karakter A berbicara 3 detik -> Karakter B menunggu (wait 3 secs) baru menjawab.",
         "Tips Mentor: Gunakan analogi 'Saat Ayah bicara, kita mendengarkan dulu baru menjawab'."),
        ("Sesi 06: Ekstensi AI Text-to-Speech (Karakter Berbicara Nyata)",
         "Konsep: Ekstensi Scratch tambahan dan sintesis suara bahasa Indonesia.",
         "Kode Inti: set voice to [squeak] -> set language to [Indonesian] -> speak [Halo teman-teman!].",
         "Tantangan Siswa: Buat katak bersuara giant dan anak kucing bersuara kitten."),
        ("Sesi 07: Merancang Karakter Hero Bersama AI (Creative Image Prompting)",
         "Konsep: Prompt gambar visual ramah anak. Formula: [Karakter] + [Baju/Topi] + [Gaya 3D Kartun] + [Warna].",
         "Demo Mentor: 'Cute friendly baby bee wearing tiny blue astronaut helmet, 3D Pixar cartoon style'.",
         "Aktivitas: Download hasil gambar AI, hapus background, upload sprite ke Scratch siswa."),
        ("Sesi 08: Evaluasi Mini Proyek 1: Buku Cerita Interaktif Digital",
         "Karya Siswa: Menggabungkan karakter AI, Text-to-Speech, dan tombol navigasi halaman.",
         "Rubrik: Minimal 2 karakter, percakapan bergantian, dan ada tombol interaktif."),
        ("Sesi 09: Labirin Sarang Lebah (Navigasi Tombol Panah & Sensor Warna)",
         "Konsep: Kontrol 4 tombol panah keyboard dan deteksi tabrakan tembok (Color Sensing).",
         "Kode Inti: if <key up arrow pressed> -> change y by (6). if <touching color biru> -> go to x: (-200) y: (140).",
         "Common Bug: Karakter macet di tembok. Solusi: Kecilkan ukuran sprite lebah ke 40%."),
        ("Sesi 10: Mengumpulkan Madu & Variabel Skor (Variables System)",
         "Konsep: Variabel sebagai wadah tabungan angka yang bertambah setiap panen madu.",
         "Kode Inti: set [Skor] to (0) di awal game. Pada bunga: if touching [Bee] -> change [Skor] by (1) -> hide.",
         "Tantangan Siswa: Gandakan (duplicate) bunga menjadi 5 buah di sudut berbeda."),
        ("Sesi 11: Rintangan Musuh Bergerak & Pesan Kemenangan",
         "Konsep: Animasi patroli musuh, broadcast message [Game Over], dan backdrop pesta menang.",
         "Kode Inti: Laba-laba glide bolak-balik. if touching [Laba-laba] -> broadcast [Game Over] -> stop all.",
         "Penyelesaian: Jika Skor = 5 -> broadcast [You Win] dan bunyikan suara kembang api."),
        ("Sesi 12: CAPSTONE JUNIOR: 'Bee Honey Harvest' & Mini Demo Day",
         "Output Akhir: Game arcade mandiri utuh berlatar sarang lebah siap dimainkan.",
         "Showcase Siswa: Presentasi 2 menit di depan kelas: nama game, cara main, dan fitur favorit.",
         "Apresiasi Mentor: Pembagian Sertifikat Resmi Junior Code Explorer & Lencana Keberanian.")
    ]

    story.append(Paragraph("📖 Rencana Pelaksanaan Pembelajaran (Sesi 1 – 12 Siap Ajar)", styles['SectionHeading']))
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

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Generated: {filepath}")


def build_intermediate_pdf(filepath):
    doc = SimpleDocTemplate(filepath, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=20*mm, bottomMargin=20*mm)
    styles = create_styles()
    story = []

    logo_path = 'public/beekoding-logo.png'
    logo_img = Image(logo_path, width=16*mm, height=16*mm) if os.path.exists(logo_path) else ""

    header_table = Table([[
        logo_img,
        [
            Paragraph("<b>BEEKODING</b> • PANDUAN MENGAJAR INSTRUKTUR RESMI", ParagraphStyle('Sub', fontName='Helvetica-Bold', fontSize=8, textColor=COLOR_DARK_AMBER)),
            Paragraph("Tahap 2: Intermediate Coder (Usia 10 – 12 Tahun)", styles['DocTitle']),
            Paragraph("Rencana Pembelajaran 12 Sesi Siap Ajar • Scratch 3.0 Lanjutan, Machine Learning & Python Turtle", styles['DocSubtitle'])
        ]
    ]], colWidths=[20*mm, 154*mm])
    header_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=COLOR_PRIMARY_AMBER, spaceBefore=4, spaceAfter=8))

    # Meta Info
    meta = [
        [
            Paragraph("<b>Target Usia:</b> 10 – 12 Tahun (SD 4-6)", styles['TableCell']),
            Paragraph("<b>Prasyarat:</b> Logika Dasar, Angka Negatif", styles['TableCell']),
            Paragraph("<b>Platform:</b> Scratch Lanjutan, Teachable Machine, Python", styles['TableCell'])
        ],
        [
            Paragraph("<b>Durasi:</b> 12 Sesi @ 90 Menit", styles['TableCell']),
            Paragraph("<b>Rasio:</b> 1 Mentor : 5 – 6 Siswa", styles['TableCell']),
            Paragraph("<b>Output:</b> Platformer Game, AI Vision Game, Python Bot", styles['TableCell'])
        ]
    ]
    meta_t = Table(meta, colWidths=[58*mm, 58*mm, 58*mm])
    meta_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_AMBER),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_PRIMARY_AMBER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    # Pathway 48 Sesi (1 Tahun Penuh)
    story.append(Paragraph("🗺️ Peta Jenjang 48 Sesi (1 Tahun Penuh): 4 Modul Tingkat", styles['SectionHeading']))
    pathway_inter = [
        [Paragraph("<b>Level 1 (Sesi 1–12)</b><br/><b>App & Game Logic:</b> MIT App Inventor, Mobile Sensors, & Game Platformer 2D Fisika.", styles['TableCell']),
         Paragraph("<b>Level 2 (Sesi 13–24)</b><br/><b>Web Frontend:</b> HTML5 Semantik, Desain CSS3 Modern, & JavaScript DOM Interaktif.", styles['TableCell']),
         Paragraph("<b>Level 3 (Sesi 25–36)</b><br/><b>Data & Game Engine:</b> TinyDB / LocalStorage, Game 2D JavaScript, & Roblox Lua Dasar.", styles['TableCell']),
         Paragraph("<b>Level 4 (Sesi 37–48)</b><br/><b>Python Transition:</b> Logika Sintaks Teks, Algoritma Struktur Data, & Persiapan Lomba Bebras.", styles['TableCell'])]
    ]
    pw_i = Table(pathway_inter, colWidths=[43.5*mm]*4)
    pw_i.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_EMERALD_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_EMERALD),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(pw_i)
    story.append(Spacer(1, 6))

    sessions = [
        ("Sesi 01: Peta Koordinat Kartesius 2D & Mekanika Bidikan",
         "Konsep: Sumbu X (-240 ke 240), Sumbu Y (-180 ke 180), Sudut Hadap, dan Pelacak Mouse.",
         "Kode Inti: point towards [mouse-pointer]. Saat spasi ditekan -> clone bullet bergerak maju 15 steps repeat until edge.",
         "Tantangan: Batasi sudut rotasi meriam agar tidak bisa menembak ke tanah."),
        ("Sesi 02: Engine Fisika Platformer (Gravitasi & Velocity Y)",
         "Konsep: Simulasi gravitasi (-1 per frame), kecepatan vertikal, dan deteksi menapak tanah.",
         "Kode Inti: change [velocityY] by (-1) -> change y by (velocityY). if touching ground -> repeat until not touching ground: change y by 1 -> set velocityY to 0. if up arrow: set velocityY to 14.",
         "Common Bug: Infinite Jump di udara. Solusi: Blok cek up arrow harus di dalam touching ground."),
        ("Sesi 03: Multi-Variable: Health Point, Dynamic Score & Timer",
         "Konsep: State management game loop. Variabel Skor, Nyawa, dan Waktu (60s).",
         "Kode Inti: Loop timer per detik. Saat kena racun: change [Nyawa] by (-1), efek ghost berkedip invulnerability. if Nyawa < 1 -> broadcast Game Over.",
         "Tantangan: Tambahkan bonus hati (Heart Item) penambah nyawa."),
        ("Sesi 04: Algoritma Kloning & Spawner Musuh Acak",
         "Konsep: Efisiensi memori; 1 sprite master memproduksi puluhan musuh klon.",
         "Kode Inti: Master sprite: forever [wait pick random 1 to 3 -> create clone]. Klon: go to x: 240 y: random (-100 to 120) -> gerak ke kiri -> delete this clone saat tertembak.",
         "Peringatan Mentor: Selalu tambahkan 'delete this clone' agar tidak mencapai limit 300."),
        ("Sesi 05: Anatomi Machine Learning: Data, Model & Prediksi",
         "Konsep: Perbedaan koding aturan statis vs model AI yang belajar dari pola data.",
         "Aktivitas: Eksperimen Google Quick, Draw! dan pengamatan confidence score probabilitas.",
         "Diskusi Mentor: Masalah bias data jika contoh yang diberikan tidak bervariasi."),
        ("Sesi 06: Melatih Model Computer Vision Pengenal Gestur Tangan",
         "Konsep: Google Teachable Machine Image Model. 3 Kelas: Tangan Kiri, Tangan Kanan, Netral.",
         "Praktik: Rekam 100 sampel kamera per kelas -> Klik Train Model -> Export Tensorflow.js Cloud URL.",
         "Tips: Pastikan pencahayaan ruangan merata agar akurasi di atas 85%."),
        ("Sesi 07: Integrasi Model Kamera AI dengan Game Scratch",
         "Konsep: Menghubungkan URL model cloud ke ekstensi AI Scratch (Stretch3 / TM2Scratch).",
         "Kode Inti: if <model prediction is Tangan Kanan with confidence > 0.8> then change x by (10).",
         "Tantangan: Tambahkan gestur ke-4: membuka mulut untuk menembakkan laser madu!"),
        ("Sesi 08: Evaluasi Proyek Mini 2: AI Gesture-Controlled Game",
         "Karya Siswa: Game interaktif utuh dikendalikan 100% tanpa menyentuh keyboard mouse.",
         "Rubrik: Model responsif, navigasi halus, skor bertambah, dan presentasi alur latihan AI."),
        ("Sesi 09: Dari Blok ke Kode Teks: Geometri Python Turtle",
         "Konsep: Setiap blok Scratch memiliki padanan baris di Python (move 100 -> t.forward(100)).",
         "Kode Inti: import turtle -> screen.bgcolor('#0F172A') -> for i in range(6): t.forward(80); t.left(60).",
         "Output: Gambar hexagon sarang lebah geometris presisi."),
        ("Sesi 10: Variabel, Input Interaktif & Typecasting Python",
         "Konsep: Tipe data String vs Integer, fungsi input(), dan konversi int(input()).",
         "Kode Inti: kotak = int(input('Berapa kotak? ')) -> total = kotak * 12 -> print(f'Total madu: {total}').",
         "Common Bug: TypeError can't multiply sequence. Solusi: Gunakan int() sebelum perkalian."),
        ("Sesi 11: Struktur Percabangan if-elif-else & Game Tebak Angka",
         "Konsep: Indentasi spasi Python, import random, dan while loop.",
         "Kode Inti: rahasia = random.randint(1, 50) -> while kesempatan > 0: if tebakan == rahasia: menang! elif tebakan < rahasia: terlalu kecil.",
         "Tantangan: Berikan skor bonus berdasarkan sisa kesempatan."),
        ("Sesi 12: CAPSTONE INTERMEDIATE: 'Python Smart Bot' & Demo Day",
         "Output Akhir: Bot kuis interaktif cerdas atau game petualangan teks dengan percabangan cerita.",
         "Showcase: Presentasi kode baris per baris dan live playtest di depan orang tua.",
         "Apresiasi Mentor: Penyerahan Sertifikat Intermediate AI Coder.")
    ]

    story.append(Paragraph("📖 Rencana Pelaksanaan Pembelajaran (Sesi 1 – 12 Siap Ajar)", styles['SectionHeading']))
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

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Generated: {filepath}")


def build_teens_pdf(filepath):
    doc = SimpleDocTemplate(filepath, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=20*mm, bottomMargin=20*mm)
    styles = create_styles()
    story = []

    logo_path = 'public/beekoding-logo.png'
    logo_img = Image(logo_path, width=16*mm, height=16*mm) if os.path.exists(logo_path) else ""

    header_table = Table([[
        logo_img,
        [
            Paragraph("<b>BEEKODING</b> • PANDUAN MENGAJAR INSTRUKTUR RESMI", ParagraphStyle('Sub', fontName='Helvetica-Bold', fontSize=8, textColor=COLOR_DARK_AMBER)),
            Paragraph("Tahap 3: Teens Innovator (Usia 13 – 17 Tahun)", styles['DocTitle']),
            Paragraph("Rencana Pembelajaran 12 Sesi Siap Ajar • Python 3 Murni, Pygame 2D, MediaPipe AI Vision & REST API", styles['DocSubtitle'])
        ]
    ]], colWidths=[20*mm, 154*mm])
    header_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=COLOR_PRIMARY_AMBER, spaceBefore=4, spaceAfter=8))

    # Meta Info
    meta = [
        [
            Paragraph("<b>Target Usia:</b> 13 – 17 Tahun (SMP & SMA)", styles['TableCell']),
            Paragraph("<b>Prasyarat:</b> Aljabar Dasar, Sistem File Komputer", styles['TableCell']),
            Paragraph("<b>Platform:</b> Python 3, VS Code, Pygame, MediaPipe, Git", styles['TableCell'])
        ],
        [
            Paragraph("<b>Durasi:</b> 12 Sesi @ 90 – 120 Menit", styles['TableCell']),
            Paragraph("<b>Rasio:</b> 1 Mentor : 6 – 8 Siswa", styles['TableCell']),
            Paragraph("<b>Output:</b> Pygame Space Shooter, Air-Canvas AI, Portofolio GitHub", styles['TableCell'])
        ]
    ]
    meta_t = Table(meta, colWidths=[58*mm, 58*mm, 58*mm])
    meta_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_AMBER),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_PRIMARY_AMBER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    # Pathway 48 Sesi (1 Tahun Penuh)
    story.append(Paragraph("🗺️ Peta Jenjang 48 Sesi (1 Tahun Penuh): 4 Modul Tingkat", styles['SectionHeading']))
    pathway_teens = [
        [Paragraph("<b>Level 1 (Sesi 1–12)</b><br/><b>Python Foundation & Games:</b> Python 3, CLI Scripting, Pygame 2D, & OOP Dasar.", styles['TableCell']),
         Paragraph("<b>Level 2 (Sesi 13–24)</b><br/><b>Modern Web Fullstack:</b> React 19, TypeScript, Tailwind CSS, & Cloud API.", styles['TableCell']),
         Paragraph("<b>Level 3 (Sesi 25–36)</b><br/><b>AI Vision & Machine Learning:</b> MediaPipe, OpenCV, Scikit-learn, & LLM Prompt Engineering.", styles['TableCell']),
         Paragraph("<b>Level 4 (Sesi 37–48)</b><br/><b>Capstone & Startup Launch:</b> Git Collaboration, CI/CD Cloud Deploy, Portofolio Beasiswa / Kampus.", styles['TableCell'])]
    ]
    pw_t = Table(pathway_teens, colWidths=[43.5*mm]*4)
    pw_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_EMERALD_BG),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_EMERALD),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(pw_t)
    story.append(Spacer(1, 6))

    sessions = [
        ("Sesi 01: Ekosistem Python 3 Modern, Terminal CLI & Standar PEP 8",
         "Konsep: Environment profesional VS Code, terminal shell, tipe data primitif, f-strings, dan konvensi penamaan PEP 8.",
         "Kode Inti: def main(): developer = input().title(); score = (exp * 8.5) + 20; print(f'Profile: {developer} Readiness: {score:.1f}%').",
         "Panduan: Latih siswa terbiasa menjalankan script lewat terminal: python main.py."),
        ("Sesi 02: Struktur Data Koleksi (List, Dictionary) & JSON Serialization",
         "Konsep: List of dictionaries, sorting dengan lambda function, dan ekspor data ke file JSON permanen.",
         "Kode Inti: sorted_students = sorted(data, key=lambda s: s['xp'], reverse=True) -> json.dump(data, f, indent=4).",
         "Tantangan: Buat fungsi pencarian siswa berdasarkan skill tertentu menggunakan List Comprehension."),
        ("Sesi 03: Modularisasi Fungsi Kustom (def), Return & Error Handling",
         "Konsep: Arsitektur kode DRY (Don't Repeat Yourself), parameter default, tuple return, dan blok try-except.",
         "Kode Inti: def calc_discount(price, voucher=''): return rate, total. try: val = float(input()) except ValueError: alert!.",
         "Penting: Biasakan siswa membaca pesan error terminal (traceback)."),
        ("Sesi 04: File I/O & Sistem Audit Logging Waktu Nyata",
         "Konsep: Context manager with open(), mode append ('a'), dan pencatatan timestamp datetime.",
         "Kode Inti: with open('activity.log', 'a') as f: f.write(f'[{datetime.now()}] [{event}] {msg}\\n').",
         "Aktivitas: Membuat modul logger mini untuk melacak aktivitas login pengguna."),
        ("Sesi 05: Anatomi Game Loop & Grafis Kanvas Pygame",
         "Konsep: Game Loop tak hingga, Clock Tick (60 FPS), Event Polling (pygame.QUIT), dan Surface Blitting.",
         "Kode Inti: screen = pygame.display.set_mode((800,600)) -> keys = pygame.key.get_pressed() -> player_x clamping -> clock.tick(60).",
         "Setup: pip install pygame."),
        ("Sesi 06: OOP Sprite Class & Collision Hitbox Berkecepatan Tinggi",
         "Konsep: Object-Oriented Programming (class Player, class Laser), sprite.Group(), dan pygame.sprite.collide_rect.",
         "Kode Inti: class Laser(pygame.sprite.Sprite): def update(self): self.rect.y -= 12; if self.rect.bottom < 0: self.kill().",
         "Keunggulan: self.kill() membersihkan sprite dari RAM otomatis saat keluar layar."),
        ("Sesi 07: Audio Mixer, State Management & Efek Partikel",
         "Konsep: State machine (MENU, PLAYING, GAMEOVER), audio channels, dan generator partikel RGB ledakan.",
         "Kode Inti: pygame.mixer.Sound('laser.wav').play() -> Partikel berkurang radiusnya setiap frame sampai hilang.",
         "Tantangan: Tambahkan power-up triple laser."),
        ("Sesi 08: Mini Proyek 1: 'Cyber Bee: Space Defense 2D'",
         "Karya Siswa: Video game arcade 2D utuh terbagi menjadi 3 file terstruktur: main.py, sprites.py, settings.py.",
         "Rubrik: Gerak mulus 60 FPS, deteksi tabrakan presisi, sound effect, dan rekor skor tersimpan di file lokal."),
        ("Sesi 09: Computer Vision: Webcam Stream & MediaPipe Hands",
         "Konsep: Pemrosesan frame kamera, konversi BGR ke RGB, dan pelacakan 21 koordinat sendi tangan manusia.",
         "Kode Inti: mp_hands.Hands(max_num_hands=1) -> landmark[8] (ujung telunjuk) -> cx, cy = int(x*w), int(y*h) -> draw circle.",
         "Setup: pip install opencv-python mediapipe."),
        ("Sesi 10: Membangun Antarmuka Virtual: Air-Canvas Drawing",
         "Konsep: Menghitung jarak Euclidean telunjuk dan jempol. Jika telunjuk saja: Menggambar; Jika menjepit (pinch): Angkat pena/Ganti warna.",
         "Kode Inti: math.hypot(x2-x1, y2-y1) < threshold -> ganti warna kuas.",
         "Output: Aplikasi melukis di udara bebas tanpa menyentuh layar."),
        ("Sesi 11: Integrasi API AI Generatif: AI Coding Assistant Terminal",
         "Konsep: REST API, JSON payload request, pemanggilan model LLM mutakhir, dan rekayasa System Prompt persona.",
         "Kode Inti: Merancang persona asisten Beeby: ramah, memberikan tips koding ringkas dan motivasi pemuda.",
         "Nilai Etika: Menjaga kerahasiaan API Key menggunakan file .env dan etika AI generatif."),
        ("Sesi 12: CAPSTONE TEENS: PORTFOLIO SHOWCASE & DEMO DAY",
         "Output Akhir: Repositori GitHub terstruktur dengan README.md profesional + demo langsung di hadapan dewan penilai.",
         "Presentasi Pitch Deck 5 Lembar: Problem Statement -> Solution Architecture -> Code Demo -> Lessons Learned.",
         "Apresiasi Mentor: Penyerahan Plakat & Sertifikat Resmi Junior AI Expert & Innovator.")
    ]

    story.append(Paragraph("📖 Rencana Pelaksanaan Pembelajaran (Sesi 1 – 12 Siap Ajar)", styles['SectionHeading']))
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

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Generated: {filepath}")


if __name__ == '__main__':
    os.makedirs('public/curriculum', exist_ok=True)
    p1 = os.path.join('public', 'curriculum', 'panduan-instruktur-junior-explorer.pdf')
    p2 = os.path.join('public', 'curriculum', 'panduan-instruktur-intermediate-coder.pdf')
    p3 = os.path.join('public', 'curriculum', 'panduan-instruktur-teens-innovator.pdf')

    print("Generating Stage 1, 2, and 3 Instructor Guide PDFs...")
    build_junior_pdf(p1)
    build_intermediate_pdf(p2)
    build_teens_pdf(p3)
    print("All stage-specific instructor guide PDFs successfully generated!")
