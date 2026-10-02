import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm, inch
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
COLOR_WHITE = colors.HexColor('#FFFFFF')

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
            self.drawString(18 * mm, 285 * mm, "BEEKODING • DOKUMEN SILABUS & KURIKULUM RESMI 2026")
            self.setStrokeColor(COLOR_BORDER)
            self.setLineWidth(0.5)
            self.line(18 * mm, 282 * mm, 192 * mm, 282 * mm)

        # Footer (all pages)
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.5)
        self.line(18 * mm, 15 * mm, 192 * mm, 15 * mm)

        self.drawString(18 * mm, 11 * mm, "www.beekoding.id • WhatsApp: +62 818-1890-1737 • Official Syllabus")
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
        fontSize=20,
        leading=24,
        textColor=COLOR_NAVY,
        spaceAfter=4,
    )

    styles['DocSubtitle'] = ParagraphStyle(
        'DocSubtitle',
        parent=base['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=COLOR_DARK_AMBER,
        spaceAfter=12,
    )

    styles['SectionHeading'] = ParagraphStyle(
        'SectionHeading',
        parent=base['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=COLOR_NAVY,
        spaceBefore=14,
        spaceAfter=6,
    )

    styles['PhaseTitle'] = ParagraphStyle(
        'PhaseTitle',
        parent=base['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=COLOR_DARK_AMBER,
        spaceBefore=8,
        spaceAfter=4,
    )

    styles['SessionTitle'] = ParagraphStyle(
        'SessionTitle',
        parent=base['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=COLOR_NAVY,
        spaceBefore=3,
        spaceAfter=2,
    )

    styles['SessionDesc'] = ParagraphStyle(
        'SessionDesc',
        parent=base['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=COLOR_TEXT_MAIN,
        spaceAfter=3,
    )

    styles['SessionActivity'] = ParagraphStyle(
        'SessionActivity',
        parent=base['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=11,
        textColor=COLOR_PRIMARY_AMBER,
        spaceAfter=4,
    )

    styles['Body'] = ParagraphStyle(
        'Body',
        parent=base['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=COLOR_TEXT_MAIN,
        spaceAfter=6,
    )

    styles['TableHeader'] = ParagraphStyle(
        'TableHeader',
        parent=base['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
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

    styles['CalloutText'] = ParagraphStyle(
        'CalloutText',
        parent=base['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=COLOR_NAVY_LIGHT,
    )

    return styles


def build_bootcamp_pdf(filepath):
    """Generates the official Summer AI & Coding Bootcamp 2026 syllabus PDF."""
    doc = SimpleDocTemplate(
        filepath,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=20 * mm,
        bottomMargin=20 * mm,
    )
    styles = create_styles()
    story = []

    # 1. Header Banner with Brand Logo and Title
    logo_path = 'public/beekoding-logo.png'
    logo_img = None
    if os.path.exists(logo_path):
        logo_img = Image(logo_path, width=16 * mm, height=16 * mm)

    title_table_data = [
        [
            logo_img or "",
            [
                Paragraph("<b>BEEKODING</b> • EDUKASI TEKNOLOGI ANAK & REMAJA", ParagraphStyle('SubHeader', fontName='Helvetica-Bold', fontSize=8, textColor=COLOR_DARK_AMBER)),
                Paragraph("Silabus Resmi: Summer AI & Coding Bootcamp 2026", styles['DocTitle']),
                Paragraph("Program Intensif 25 Pertemuan (24 Sesi Materi Terpadu + 1 Hari Akbar Demo Day & Wisuda)", styles['DocSubtitle']),
            ]
        ]
    ]
    title_table = Table(title_table_data, colWidths=[20 * mm, 154 * mm])
    title_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(title_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=COLOR_PRIMARY_AMBER, spaceBefore=4, spaceAfter=10))

    # 2. Executive Summary Table (Metadata)
    meta_data = [
        [
            Paragraph("<b>Target Siswa:</b>", styles['TableCellBold']),
            Paragraph("Grade 4 – 10 (Usia 9 – 16 Tahun)", styles['TableCell']),
            Paragraph("<b>Rasio Kelas:</b>", styles['TableCellBold']),
            Paragraph("1 Mentor : 4–5 Siswa (Maks. 25/Batch)", styles['TableCell']),
        ],
        [
            Paragraph("<b>Format Kelas:</b>", styles['TableCellBold']),
            Paragraph("Live Interactive via Google Meet / Lab", styles['TableCell']),
            Paragraph("<b>Durasi Total:</b>", styles['TableCellBold']),
            Paragraph("25 Pertemuan @ 90 – 120 Menit", styles['TableCell']),
        ],
        [
            Paragraph("<b>Prasyarat:</b>", styles['TableCellBold']),
            Paragraph("Zero Experience (Pemula Tanpa Dasar)", styles['TableCell']),
            Paragraph("<b>Output Lulusan:</b>", styles['TableCellBold']),
            Paragraph("3 Mini Proyek + 1 Capstone AI Mandiri", styles['TableCell']),
        ],
    ]
    meta_table = Table(meta_data, colWidths=[28 * mm, 59 * mm, 28 * mm, 59 * mm])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), COLOR_BG_AMBER),
        ('BOX', (0, 0), (-1, -1), 0.75, COLOR_PRIMARY_AMBER),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 8))

    # 3. Roadmap 5 Fase
    story.append(Paragraph("🧭 Peta Perjalanan Kurikulum 5 Fase", styles['SectionHeading']))
    roadmap_data = [
        [
            Paragraph("<b>Fase 1 (Sesi 1–5)</b><br/>Fondasi Literasi & Etika AI", styles['TableHeader']),
            Paragraph("<b>Fase 2 (Sesi 6–10)</b><br/>Studio Kreativitas Media AI", styles['TableHeader']),
            Paragraph("<b>Fase 3 (Sesi 11–15)</b><br/>Logika Coding & Python", styles['TableHeader']),
            Paragraph("<b>Fase 4 (Sesi 16–20)</b><br/>Machine Learning & Vision", styles['TableHeader']),
            Paragraph("<b>Fase 5 (Sesi 21–25)</b><br/>Capstone & Akbar Demo Day", styles['TableHeader']),
        ]
    ]
    roadmap_table = Table(roadmap_data, colWidths=[34.8 * mm] * 5)
    roadmap_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), COLOR_LIGHT_AMBER),
        ('BOX', (0, 0), (-1, -1), 1, COLOR_PRIMARY_AMBER),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, COLOR_PRIMARY_AMBER),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(roadmap_table)
    story.append(Spacer(1, 10))

    # 4. Rincian Sesi Per Fase
    phases = [
        {
            "phase": "FASE 1: Fondasi Literasi & Etika Generative AI (Sesi 1 – 5)",
            "goal": "Tujuan: Membangun pemahaman konseptual tentang cara berpikir komputer, etika digital, dan seni prompt engineering.",
            "sessions": [
                ("Sesi 01: Ekspedisi ke Dunia AI & Komputasi Modern",
                 "Sejarah komputer, perbedaan program biasa vs program cerdas (belajar dari data), dan eksplorasi revolusi AI.",
                 "Aktivitas: Un-plugged Turing Test Game — menguji apakah jawaban berasal dari manusia atau bot."),
                ("Sesi 02: Berkenalan dengan Asisten AI Generatif",
                 "Mengenal LLM (Claude, ChatGPT, Gemini), anatomi persona, konteks, instruksi, dan pembatasan peran AI.",
                 "Aktivitas: Merancang asisten AI bertema 'Tutor Sejarah Interaktif' atau 'Karakter Game RPG'."),
                ("Sesi 03: Prompt Engineering: Seni Memberi Perintah Cerdas",
                 "Formula emas prompt presisi (Role + Task + Context + Constraints), menghindari ambigu, dan iterasi perintah.",
                 "Aktivitas: Prompt Hack Challenge — membuat rangkuman materi sains maksimal 5 kalimat berima."),
                ("Sesi 04: Etika Digital, Privasi Data & Deteksi Halusinasi AI",
                 "Menjaga data pribadi (PII), fenomena halusinasi AI, bias algoritma, dan hak cipta media digital.",
                 "Aktivitas: Fact-Checking Detective — menguji 5 klaim AI menggunakan ensiklopedia terverifikasi."),
                ("Sesi 05: Integrasi Alur Kerja AI dalam Kehidupan Sehari-hari",
                 "AI sebagai Co-pilot (asisten kreatif) dan bukan pengganti penalaran kritis manusia.",
                 "Aktivitas: Merancang Personal Learning Dashboard berisi template prompt belajar matematika & sains."),
            ]
        },
        {
            "phase": "FASE 2: Studio Kreativitas Media & Narasi Berbasis AI (Sesi 6 – 10)",
            "goal": "Tujuan: Memanfaatkan AI generatif untuk merancang aset seni visual, musik latar, pengisi suara, dan cerita interaktif.",
            "sessions": [
                ("Sesi 06: AI Visual Studio: Seni Digital & Prompt Gambar",
                 "Parameter visual pencahayaan sinematik, sudut pandang kamera, dan variasi gaya seni (3D clay, anime, pixel art).",
                 "Aktivitas: Merancang desain karakter maskot lebah (Bee-Hero) dengan 3 variasi ekspresi emosi."),
                ("Sesi 07: Desain Aset Game & Sprite 2D",
                 "Menghasilkan latar belakang pemandangan game, platform rintangan, dan tombol UI menggunakan generator AI.",
                 "Aktivitas: Membuat set aset grafis lengkap (karakter utama, musuh, koin reward, dan background hutan)."),
                ("Sesi 08: Audio Lab: Sintesis Suara Narator & Musik Latar AI",
                 "Pembuatan narasi suara digital natural (Text-to-Speech) dan komposisi melodi atmosferik (Soundraw / Suno).",
                 "Aktivitas: Merekam dialog petualangan luar angkasa dengan efek suara futuristik ramah anak."),
                ("Sesi 09: Storyboarding & Narasi Interaktif Multi-Cabang",
                 "Merancang skenario alur cerita bercabang (choose-your-own-adventure) dengan diagram keputusan logis.",
                 "Aktivitas: Memetakan diagram alur cerita 3 babak di board interaktif."),
                ("Sesi 10: Evaluasi Proyek Mini 1: Interactive Illustrated Storybook",
                 "Menggabungkan narasi, ilustrasi AI, dan musik ke dalam buku cerita digital interaktif siap baca.",
                 "Capaian Portofolio: Karya buku cerita multimedia mandiri tersimpan di akun siswa."),
            ]
        },
        {
            "phase": "FASE 3: Logika Coding, Algoritma & Computational Thinking (Sesi 11 – 15)",
            "goal": "Tujuan: Mengubah ide kreatif menjadi baris logika kode yang dieksekusi mesin, dari blok Scratch ke dasar Python.",
            "sessions": [
                ("Sesi 11: Dekomposisi Masalah & Berpikir Algoritmik",
                 "4 Pilar Computational Thinking: Dekomposisi, Pola, Abstraksi, dan Algoritma alir (flowchart).",
                 "Aktivitas: Merancang flowchart logika untuk robot pembuat sarapan otomatis."),
                ("Sesi 12: Logika Blok Scratch: Event, Bergerak & Tabrakan Objek",
                 "Sistem koordinat X-Y, event listener tombol keyboard/mouse, dan deteksi collision antar-sprite.",
                 "Aktivitas: Membangun mekanisme gerak karakter di atas kanvas koordinat interaktif."),
                ("Sesi 13: Variabel, Logika Bersyarat (If-Else) & Scoring System",
                 "Menyimpan nilai skor pemain, batas waktu hitung mundur (countdown), dan penentuan status Game Over / Menang.",
                 "Aktivitas: Membuat game menangkap madu dengan timer 60 detik dan sistem skor dinamis."),
                ("Sesi 14: Transisi ke Bahasa Teks: Python Basics & Terminal",
                 "Menghubungkan konsep blok visual ke sintaksis teks Python: fungsi print(), input(), dan tipe data variabel.",
                 "Aktivitas: Membuat kalkulator umur ramah anak dan generator nama pahlawan di Python shell."),
                ("Sesi 15: Evaluasi Proyek Mini 2: Smart Interactive Quiz Bot",
                 "Membangun program bot kuis pengetahuan umum di Python dengan logika percabangan if-elif-else.",
                 "Capaian Portofolio: Bot kuis mandiri bebas error dengan pesan interaksi ramah pengguna."),
            ]
        },
        {
            "phase": "FASE 4: Machine Learning in Action & Computer Vision (Sesi 16 – 20)",
            "goal": "Tujuan: Mengajarkan cara kerja mesin belajar dari data melalui input kamera webcam dan pengenalan suara nyata.",
            "sessions": [
                ("Sesi 16: Bagaimana Mesin Belajar (Supervised Learning)",
                 "Siklus Machine Learning: Pengumpulan Dataset ➔ Training Model ➔ Uji Prediksi (Inference).",
                 "Aktivitas: Melatih model pengenal objek di meja belajar menggunakan Google Teachable Machine."),
                ("Sesi 17: Melatih Model Computer Vision Pengenal Gestur Tangan",
                 "Mengumpulkan data kamera untuk 3 gestur berbeda dan memahami skor akurasi (confidence level).",
                 "Aktivitas: Melatih model AI yang mampu mengenali gestur batu, gunting, dan kertas secara realtime."),
                ("Sesi 18: Melatih Model Audio: Klasifikasi Perintah Suara",
                 "Melatih model suara untuk mendeteksi kata kunci audio dan kalibrasi kebisingan suara sekitar.",
                 "Aktivitas: Membuat pendeteksi tepukan tangan atau deteksi intonasi bicara ceria vs sedih."),
                ("Sesi 19: Menghubungkan Model Machine Learning dengan Scratch / Web",
                 "Mengekspor model AI ke blok pemrograman: saat tangan melambai, karakter game melompat otomatis.",
                 "Aktivitas: Menghubungkan kontrol webcam AI dengan karakter game maskot lebah."),
                ("Sesi 20: Evaluasi Proyek Mini 3: AI Gesture-Controlled Game",
                 "Menuntaskan game interaktif utuh yang dikendalikan tanpa keyboard, melainkan gestur tangan di depan kamera.",
                 "Capaian Portofolio: Game berbasis sensor kamera inovatif yang siap dipamerkan ke orang tua."),
            ]
        },
        {
            "phase": "FASE 5: Inkubasi Capstone Project, Pitching & Demo Day (Sesi 21 – 25)",
            "goal": "Tujuan: Membangun proyek teknologi mandiri dari nol, melatih public speaking, dan presentasi panggung Demo Day.",
            "sessions": [
                ("Sesi 21: Design Thinking & Perumusan Masalah Nyata",
                 "Memilih tema proyek: edukasi, perlindungan lingkungan, atau game edukatif bermanfaat keluarga.",
                 "Aktivitas: Menyusun Project Scope Document berisi sketsa UI dan daftar fitur utama."),
                ("Sesi 22: Bimbingan Intensif Pembangunan Prototipe (Sprint 1)",
                 "Pengembangan logika kode dan integrasi fitur AI dengan pendampingan personal mentor 1-on-1.",
                 "Aktivitas: Sesi debugging mendalam untuk menyelesaikan kendala algoritma."),
                ("Sesi 23: User Testing, Pemolesan Karya & Desain Slide (Sprint 2)",
                 "Saling mencoba karya teman sekelas (peer feedback) dan membuat slide presentasi 3 menit yang memukau.",
                 "Aktivitas: Uji coba ketahanan aplikasi dan penyusunan naskah presentasi."),
                ("Sesi 24: Geladi Bersih & Pelatihan Public Speaking (Tech Pitching)",
                 "Latihan intonasi suara, kontak mata, kepercayaan diri panggung, dan manajemen waktu presentasi.",
                 "Aktivitas: Simulasi presentasi panggung dan tanya jawab di hadapan mentor."),
                ("Sesi 25: AKBAR BEEKODING DEMO DAY & WISUDA KELULUSAN",
                 "Pameran karya akbar live di hadapan orang tua dan tamu undangan industri.",
                 "Output Akhir: Penyerahan plakat sertifikat resmi 'Junior AI Expert' & portofolio digital."),
            ]
        }
    ]

    for p in phases:
        story.append(Paragraph(p["phase"], styles['PhaseTitle']))
        story.append(Paragraph(p["goal"], styles['SessionActivity']))
        for title, desc, act in p["sessions"]:
            story.append(Paragraph(f"• <b>{title}</b>", styles['SessionTitle']))
            story.append(Paragraph(desc, styles['SessionDesc']))
            story.append(Paragraph(f"&nbsp;&nbsp;<i>{act}</i>", styles['SessionActivity']))
        story.append(Spacer(1, 4))

    # 5. Rubrik Penilaian Kelulusan
    story.append(KeepTogether([
        Paragraph("📊 Matriks Rubrik Kelulusan & Capaian Portofolio", styles['SectionHeading']),
        Paragraph("Kelulusan siswa dinilai secara holistik dan objektif mencakup 5 dimensi utama:", styles['Body']),
        Table(
            [
                [
                    Paragraph("<b>Dimensi Penilaian</b>", styles['TableHeader']),
                    Paragraph("<b>Bobot</b>", styles['TableHeader']),
                    Paragraph("<b>Indikator Kriteria Keberhasilan</b>", styles['TableHeader']),
                ],
                [
                    Paragraph("Logika Algoritma & Fungsionalitas", styles['TableCellBold']),
                    Paragraph("30%", styles['TableHeader']),
                    Paragraph("Aplikasi berjalan stabil, logika percabangan tepat, dan kontrol game responsif.", styles['TableCell']),
                ],
                [
                    Paragraph("Penerapan Fitur AI / Machine Learning", styles['TableCellBold']),
                    Paragraph("25%", styles['TableHeader']),
                    Paragraph("Integrasi model computer vision, dataset terstruktur, atau pemanfaatan prompt cerdas.", styles['TableCell']),
                ],
                [
                    Paragraph("Kreativitas & Estetika Antarmuka (UI/UX)", styles['TableCellBold']),
                    Paragraph("20%", styles['TableHeader']),
                    Paragraph("Desain visual menarik, navigasi ramah anak, dan keserasian aset suara/multimedia.", styles['TableCell']),
                ],
                [
                    Paragraph("Public Speaking & Tech Pitching", styles['TableCellBold']),
                    Paragraph("15%", styles['TableHeader']),
                    Paragraph("Percaya diri mempresentasikan karya di panggung Demo Day dan menjawab pertanyaan juri.", styles['TableCell']),
                ],
                [
                    Paragraph("Persistensi & Kolaborasi (Grit)", styles['TableCellBold']),
                    Paragraph("10%", styles['TableHeader']),
                    Paragraph("Ketekunan menyelesaikan bug/error dan sikap saling mengapresiasi sesama rekan belajar.", styles['TableCell']),
                ],
            ],
            colWidths=[54 * mm, 20 * mm, 100 * mm],
            style=TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), COLOR_LIGHT_AMBER),
                ('GRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER),
                ('TOPPADDING', (0, 0), (-1, -1), 4),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ])
        ),
        Spacer(1, 10),
        # Callout pendaftaran
        Table(
            [
                [
                    Paragraph("<b>Informasi Konsultasi & Pendaftaran Batch 2026:</b><br/>"
                              "Hubungi tim konselor akademik Beekoding melalui WhatsApp <b>+62 818-1890-1737</b> "
                              "atau kunjungi website resmi kami di <b>www.beekoding.id</b> untuk klaim sesi asesmen bakat dan uji coba kelas gratis.",
                              styles['CalloutText'])
                ]
            ],
            colWidths=[174 * mm],
            style=TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), COLOR_EMERALD_BG),
                ('BOX', (0, 0), (-1, -1), 1, COLOR_EMERALD),
                ('TOPPADDING', (0, 0), (-1, -1), 6),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
                ('LEFTPADDING', (0, 0), (-1, -1), 8),
                ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ])
        )
    ]))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Generated: {filepath}")


def build_prospectus_pdf(filepath):
    """Generates the master curriculum prospectus PDF (Kurikulum Lengkap Beekoding)."""
    doc = SimpleDocTemplate(
        filepath,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=20 * mm,
        bottomMargin=20 * mm,
    )
    styles = create_styles()
    story = []

    # 1. Header Banner
    logo_path = 'public/beekoding-logo.png'
    logo_img = None
    if os.path.exists(logo_path):
        logo_img = Image(logo_path, width=16 * mm, height=16 * mm)

    title_table_data = [
        [
            logo_img or "",
            [
                Paragraph("<b>BEEKODING</b> • KURIKULUM MASTER 2026", ParagraphStyle('SubHeader', fontName='Helvetica-Bold', fontSize=8, textColor=COLOR_DARK_AMBER)),
                Paragraph("Grand Prospectus: Kurikulum Terpadu Beekoding", styles['DocTitle']),
                Paragraph("Kerangka Pembelajaran Koding, Artificial Intelligence, dan 8 Pilar Kecerdasan Digital", styles['DocSubtitle']),
            ]
        ]
    ]
    title_table = Table(title_table_data, colWidths=[20 * mm, 154 * mm])
    title_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(title_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=COLOR_PRIMARY_AMBER, spaceBefore=4, spaceAfter=10))

    # 2. Visi & Kerangka Pedagogi
    story.append(Paragraph("🧭 Kerangka Kurikulum Induk (*Master Pedagogical Framework*)", styles['SectionHeading']))
    story.append(Paragraph(
        "Kurikulum Beekoding dirancang untuk membimbing generasi muda Indonesia bertransformasi dari sekadar "
        "<b>konsumen pasif teknologi</b> menjadi <b>pencipta percaya diri (confident creator) & inovator beretika</b>. "
        "Pembelajaran mengadopsi standar internasional <i>Computer Science Teachers Association (CSTA)</i> dan "
        "<i>ISTE Standards</i> yang disesuaikan dengan kearifan budaya serta karakter anak Indonesia.",
        styles['Body']
    ))

    # 3. Jenjang Usia
    story.append(Paragraph("🎯 3 Tahapan Jenjang Pembelajaran Berkelanjutan", styles['SectionHeading']))
    stages_data = [
        [
            Paragraph("<b>Jenjang</b>", styles['TableHeader']),
            Paragraph("<b>Target Usia & Kelas</b>", styles['TableHeader']),
            Paragraph("<b>Pendekatan Belajar</b>", styles['TableHeader']),
            Paragraph("<b>Platform & Perangkat</b>", styles['TableHeader']),
            Paragraph("<b>Karakteristik Output</b>", styles['TableHeader']),
        ],
        [
            Paragraph("<b>Tahap 1:<br/>Junior Explorer</b>", styles['TableCellBold']),
            Paragraph("Usia 6 – 9 Tahun<br/>(TK B – SD Kelas 1-3)", styles['TableCell']),
            Paragraph("Sensori, kinestetik, un-plugged games, visual block beranimasi.", styles['TableCell']),
            Paragraph("ScratchJr, Scratch 3.0, AI Voice & Art Generator ramah anak.", styles['TableCell']),
            Paragraph("Animasi cerita interaktif, game labirin sederhana, kreasi seni AI.", styles['TableCell']),
        ],
        [
            Paragraph("<b>Tahap 2:<br/>Intermediate Coder</b>", styles['TableCellBold']),
            Paragraph("Usia 10 – 12 Tahun<br/>(SD Kelas 4-6)", styles['TableCell']),
            Paragraph("Komputasional terstruktur, game physics, visual machine learning.", styles['TableCell']),
            Paragraph("Scratch lanjutan, Python Turtle, Teachable Machine, Micro:bit.", styles['TableCell']),
            Paragraph("Game arcade multi-level, bot kuis Python, model AI pengenal gestur.", styles['TableCell']),
        ],
        [
            Paragraph("<b>Tahap 3:<br/>Teens Innovator</b>", styles['TableCellBold']),
            Paragraph("Usia 13 – 17 Tahun<br/>(SMP & SMA)", styles['TableCell']),
            Paragraph("Bahasa teks murni, rekayasa perangkat lunak, integrasi AI API.", styles['TableCell']),
            Paragraph("Python murni, Pygame, OpenCV dasar, ESP32 IoT, WebXR/3D.", styles['TableCell']),
            Paragraph("Aplikasi AI utilitas mandiri, game 2D/3D utuh, prototipe IoT cerdas.", styles['TableCell']),
        ],
    ]
    stages_table = Table(stages_data, colWidths=[28 * mm, 30 * mm, 40 * mm, 38 * mm, 38 * mm])
    stages_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), COLOR_LIGHT_AMBER),
        ('GRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(stages_table)
    story.append(Spacer(1, 8))

    # 4. 8 Pilar Kecerdasan Digital
    story.append(Paragraph("🧩 8 Pilar Kecerdasan Kognitif Digital Beekoding", styles['SectionHeading']))
    pillars_data = [
        [
            Paragraph("<b>1. Logical Thinking</b><br/>Penalaran sebab-akibat, percabangan if-else, dan silogisme komputasi.", styles['TableCell']),
            Paragraph("<b>2. Numerical Thinking</b><br/>Operasi variabel angka, sistem koordinat X-Y, dan probabilitas.", styles['TableCell']),
        ],
        [
            Paragraph("<b>3. Spatial Thinking</b><br/>Orientasi sudut, rotasi objek 2D/3D, dan perspektif lingkungan virtual.", styles['TableCell']),
            Paragraph("<b>4. Pattern Recognition</b><br/>Pengenalan pola berulang, modularisasi fungsi (custom blocks), dan loop.", styles['TableCell']),
        ],
        [
            Paragraph("<b>5. Creativity & Innovation</b><br/>Imajinasi desain orisinal, narasi storytelling, dan kreasi estetika media.", styles['TableCell']),
            Paragraph("<b>6. Problem Solving & Debugging</b><br/>Dekomposisi tantangan rumit dan ketekunan menelusuri bug program.", styles['TableCell']),
        ],
        [
            Paragraph("<b>7. Language & AI Prompting</b><br/>Komunikasi prompt cerdas, sintaksis ekspresif, dan presentasi gagasan.", styles['TableCell']),
            Paragraph("<b>8. Grit & Resilience</b><br/>Daya tahan mental menghadapi kegagalan kode hingga program sukses tuntas.", styles['TableCell']),
        ],
    ]
    pillars_table = Table(pillars_data, colWidths=[87 * mm, 87 * mm])
    pillars_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), COLOR_BG_AMBER),
        ('GRID', (0, 0), (-1, -1), 0.5, COLOR_PRIMARY_AMBER),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(pillars_table)
    story.append(Spacer(1, 8))

    # 5. Daftar 7 Modul Kurikulum Unggulan
    story.append(KeepTogether([
        Paragraph("📚 7 Rumpun Modul Spesialisasi Kurikulum", styles['SectionHeading']),
        Table(
            [
                [Paragraph("<b>Kode</b>", styles['TableHeader']), Paragraph("<b>Rumpun Spesialisasi</b>", styles['TableHeader']), Paragraph("<b>Fokus & Portofolio Akhir</b>", styles['TableHeader'])],
                [Paragraph("MOD-01", styles['TableCellBold']), Paragraph("Fondasi Coding & Computational Thinking", styles['TableCellBold']), Paragraph("Logika algoritma, dekomposisi masalah, pemrograman visual blok ke sintaksis teks.", styles['TableCell'])],
                [Paragraph("MOD-02", styles['TableCellBold']), Paragraph("Generative AI & Prompt Engineering", styles['TableCellBold']), Paragraph("Literasi AI, seni perintah presisi, sintesis audio narator, dan ilustrasi digital.", styles['TableCell'])],
                [Paragraph("MOD-03", styles['TableCellBold']), Paragraph("Machine Learning & Eksperimen Data", styles['TableCellBold']), Paragraph("Computer vision (kamera), audio speech recognition, dan dataset interaktif.", styles['TableCell'])],
                [Paragraph("MOD-04", styles['TableCellBold']), Paragraph("Game Development & Interactive Media", styles['TableCellBold']), Paragraph("Mekanika game loop, physics engine 2D/3D, level design, dan scoring system.", styles['TableCell'])],
                [Paragraph("MOD-05", styles['TableCellBold']), Paragraph("Robotika, Sensor & Physical Computing", styles['TableCellBold']), Paragraph("Perakitan mikrokontroler (Micro:bit / ESP32), sensor gerak, dan IoT ramah anak.", styles['TableCell'])],
                [Paragraph("MOD-06", styles['TableCellBold']), Paragraph("Teknologi Imersif & Space Astro-Code", styles['TableCellBold']), Paragraph("Eksplorasi antariksa kubah 360°, pelacakan satelit, dan lingkungan 3D WebXR.", styles['TableCell'])],
                [Paragraph("MOD-07", styles['TableCellBold']), Paragraph("Capstone Project & Tech Pitching", styles['TableCellBold']), Paragraph("Design Thinking, pembuatan slide deck, dan panggung pameran akbar Demo Day.", styles['TableCell'])],
            ],
            colWidths=[20 * mm, 64 * mm, 90 * mm],
            style=TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), COLOR_LIGHT_AMBER),
                ('GRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER),
                ('TOPPADDING', (0, 0), (-1, -1), 3.5),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ])
        ),
        Spacer(1, 10),
        # Penutup & Kontak
        Table(
            [
                [
                    Paragraph("<b>Kemitraan Sekolah & Pendaftaran Kursus:</b><br/>"
                              "Beekoding menyediakan implementasi kurikulum ekstrakurikuler sekolah, pendampingan guru (TOT), "
                              "hingga kelas reguler privat & batch. Konsultasikan kebutuhan kurikulum institusi Anda melalui "
                              "WhatsApp resmi kami di <b>+62 818-1890-1737</b> atau email <b>halo@beekoding.id</b>.",
                              styles['CalloutText'])
                ]
            ],
            colWidths=[174 * mm],
            style=TableStyle([
                ('BACKGROUND', (0, 0), (-1, -1), COLOR_EMERALD_BG),
                ('BOX', (0, 0), (-1, -1), 1, COLOR_EMERALD),
                ('TOPPADDING', (0, 0), (-1, -1), 6),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
                ('LEFTPADDING', (0, 0), (-1, -1), 8),
                ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ])
        )
    ]))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Generated: {filepath}")


if __name__ == '__main__':
    os.makedirs('public/curriculum', exist_ok=True)
    bootcamp_pdf_path = os.path.join('public', 'curriculum', 'silabus-summer-bootcamp-2026.pdf')
    prospectus_pdf_path = os.path.join('public', 'curriculum', 'kurikulum-lengkap-beekoding-2026.pdf')

    print("Generating curriculum PDF documents...")
    build_bootcamp_pdf(bootcamp_pdf_path)
    build_prospectus_pdf(prospectus_pdf_path)
    print("All curriculum PDF documents successfully generated!")
