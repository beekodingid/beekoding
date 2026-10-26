import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "worksheets")
os.makedirs(OUTPUT_DIR, exist_ok=True)

PAGE_W, PAGE_H = A4  # 210mm x 297mm

# Colors
AMBER_DARK = colors.HexColor("#B45309")
AMBER_MAIN = colors.HexColor("#F59E0B")
AMBER_LIGHT = colors.HexColor("#FEF3C7")
AMBER_BG = colors.HexColor("#FFFBEB")
NAVY = colors.HexColor("#0F172A")
SLATE_700 = colors.HexColor("#334155")
SLATE_500 = colors.HexColor("#64748B")
SLATE_200 = colors.HexColor("#E2E8F0")
EMERALD = colors.HexColor("#10B981")
EMERALD_BG = colors.HexColor("#ECFDF5")
BLUE = colors.HexColor("#3B82F6")
BLUE_BG = colors.HexColor("#EFF6FF")
ROSE = colors.HexColor("#F43F5E")
ROSE_BG = colors.HexColor("#FFF1F2")
PURPLE = colors.HexColor("#8B5CF6")
WHITE = colors.HexColor("#FFFFFF")


def draw_header(c, badge_text, title, subtitle, age_text):
    """Draws standard printable worksheet header with Child Name & Score box."""
    c.saveState()
    # Top banner background
    c.setFillColor(AMBER_BG)
    c.roundRect(14 * mm, PAGE_H - 42 * mm, PAGE_W - 28 * mm, 30 * mm, 4 * mm, fill=1, stroke=0)
    c.setStrokeColor(AMBER_MAIN)
    c.setLineWidth(1.5)
    c.roundRect(14 * mm, PAGE_H - 42 * mm, PAGE_W - 28 * mm, 30 * mm, 4 * mm, fill=0, stroke=1)

    # Badge pill
    c.setFillColor(AMBER_MAIN)
    c.roundRect(18 * mm, PAGE_H - 21 * mm, 64 * mm, 6 * mm, 2 * mm, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(21 * mm, PAGE_H - 19.2 * mm, badge_text.upper())

    # Age pill
    c.setFillColor(NAVY)
    c.roundRect(85 * mm, PAGE_H - 21 * mm, 36 * mm, 6 * mm, 2 * mm, fill=1, stroke=0)
    c.setFillColor(AMBER_LIGHT)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(88 * mm, PAGE_H - 19.2 * mm, age_text)

    # Title & Subtitle
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 15)
    c.drawString(18 * mm, PAGE_H - 29 * mm, title)
    c.setFillColor(SLATE_700)
    c.setFont("Helvetica", 9.5)
    c.drawString(18 * mm, PAGE_H - 35 * mm, subtitle)

    # Child Name & Date & Stars bar
    c.setFillColor(WHITE)
    c.setStrokeColor(SLATE_200)
    c.setLineWidth(1)
    c.roundRect(14 * mm, PAGE_H - 54 * mm, PAGE_W - 28 * mm, 9 * mm, 2.5 * mm, fill=1, stroke=1)

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(18 * mm, PAGE_H - 50.8 * mm, "Nama Kreator Cilik: ___________________________")
    c.drawString(108 * mm, PAGE_H - 50.8 * mm, "Usia: _____ Thn")
    c.drawString(142 * mm, PAGE_H - 50.8 * mm, "Bintang: [  ] [  ] [  ] [  ] [  ]")
    c.restoreState()


def draw_footer(c, answer_key_text, page_num=1):
    """Draws upside-down parent answer key and Beekoding branding footer."""
    c.saveState()
    # Parent Answer Key Box
    c.setFillColor(EMERALD_BG)
    c.setStrokeColor(EMERALD)
    c.setLineWidth(0.8)
    c.roundRect(14 * mm, 20 * mm, PAGE_W - 28 * mm, 13 * mm, 2.5 * mm, fill=1, stroke=1)

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(18 * mm, 28 * mm, "PANDUAN & KUNCI JAWABAN ORANG TUA (Dapat dilipat sebelum diberikan ke anak):")
    c.setFillColor(SLATE_700)
    c.setFont("Helvetica", 8)
    c.drawString(18 * mm, 23 * mm, answer_key_text)

    # Bottom line
    c.setStrokeColor(SLATE_200)
    c.setLineWidth(0.6)
    c.line(14 * mm, 16 * mm, PAGE_W - 14 * mm, 16 * mm)

    c.setFillColor(SLATE_500)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(14 * mm, 11 * mm, "BEEKODING — Sarang Edukasi Coding & AI Anak (Usia 6-16 Thn) • www.beekoding.my.id")
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_W - 14 * mm, 11 * mm, f"Klaim Kelas Trial Gratis via WhatsApp: 0818-1890-1737  |  Hal. {page_num}")
    c.restoreState()


def draw_bee_icon(c, cx, cy, scale=1.0, outline_only=False):
    """Draws a cute vector Beeby mascot at (cx, cy)."""
    c.saveState()
    c.translate(cx, cy)
    c.scale(scale, scale)
    c.setLineWidth(1.5)
    c.setStrokeColor(NAVY)

    # Wings
    c.setFillColor(WHITE if outline_only else BLUE_BG)
    c.ellipse(-14, 2, -2, 16, fill=1, stroke=1)
    c.ellipse(2, 2, 14, 16, fill=1, stroke=1)

    # Body
    c.setFillColor(WHITE if outline_only else AMBER_MAIN)
    c.ellipse(-12, -10, 12, 8, fill=1, stroke=1)

    # Stripes
    if not outline_only:
        c.setFillColor(NAVY)
        c.rect(-4, -9, 3, 16, fill=1, stroke=0)
        c.rect(3, -8, 3, 14, fill=1, stroke=0)
    else:
        c.line(-4, -9, -4, 7)
        c.line(-1, -9, -1, 7)
        c.line(3, -8, 3, 6)
        c.line(6, -8, 6, 6)

    # Eyes & Smile
    c.setFillColor(NAVY)
    c.circle(-7, 1, 1.8, fill=1, stroke=0)
    c.arc(-9, -4, -3, 0, 200, 140)

    # Antennae
    c.line(-6, 7, -9, 13)
    c.circle(-9, 13, 1.5, fill=1, stroke=1)
    c.restoreState()


# ==============================================================================
# PAGE 1: LABIRIN ALGORITMA BEEBY (MAZE CODING UNPLUGGED)
# ==============================================================================
def render_page_maze(c, page_num=1):
    draw_header(
        c,
        "Lembar Kerja #1 • Algoritma & Sequence",
        "Misi Labirin Algoritma Beeby",
        "Bantu lebah Beeby berjalan menuju Sarang Madu Emas dengan menuliskan kode arah panah!",
        "Usia 5 - 8 Tahun",
    )

    # Instructions Box
    c.setFillColor(BLUE_BG)
    c.setStrokeColor(BLUE)
    c.roundRect(14 * mm, PAGE_H - 72 * mm, PAGE_W - 28 * mm, 14 * mm, 3 * mm, fill=1, stroke=1)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(18 * mm, PAGE_H - 63 * mm, "CARA BERMAIN (ATURAN PROGRAMMER CILIK):")
    c.setFont("Helvetica", 9)
    c.drawString(18 * mm, PAGE_H - 68.5 * mm, "1. Beeby hanya bisa bergerak 1 kotak setiap perintah:  [ ^ ATAS ]   [ v BAWAH ]   [ > KANAN ]   [ < KIRI ]")

    # Draw 5x5 Maze Grid on the left
    grid_x = 18 * mm
    grid_y = PAGE_H - 182 * mm
    cell_size = 20 * mm
    rows, cols = 5, 5

    # Maze layout:
    # S = Start (0,4 top-left), H = Honey (4,0 bottom-right), X = Obstacle, F = Bonus Flower
    obstacles = {(1, 4), (1, 3), (3, 3), (3, 1), (1, 1), (0, 1)}
    flowers = {(2, 4), (2, 2), (4, 2)}

    for r in range(rows):
        for col in range(cols):
            x = grid_x + col * cell_size
            y = grid_y + r * cell_size
            if (col, r) in obstacles:
                c.setFillColor( colors.HexColor("#CBD5E1") )
            elif (col, r) == (0, 4):
                c.setFillColor(AMBER_LIGHT)
            elif (col, r) == (4, 0):
                c.setFillColor(EMERALD_BG)
            else:
                c.setFillColor(WHITE)

            c.setStrokeColor(NAVY)
            c.setLineWidth(1.2)
            c.rect(x, y, cell_size, cell_size, fill=1, stroke=1)

            # Coordinate label
            c.setFillColor(SLATE_500)
            c.setFont("Helvetica", 7)
            c.drawString(x + 1.5 * mm, y + cell_size - 3.5 * mm, f"({col+1},{5-r})")

            if (col, r) in obstacles:
                c.setFillColor(SLATE_700)
                c.setFont("Helvetica-Bold", 9)
                c.drawCentredString(x + cell_size / 2, y + cell_size / 2 - 2, "BATU [X]")
            elif (col, r) in flowers:
                c.setFillColor(ROSE)
                c.circle(x + cell_size / 2, y + cell_size / 2 + 2, 4 * mm, fill=1, stroke=1)
                c.setFillColor(NAVY)
                c.setFont("Helvetica-Bold", 7)
                c.drawCentredString(x + cell_size / 2, y + 2.5 * mm, "BUNGA +10")
            elif (col, r) == (0, 4):
                draw_bee_icon(c, x + cell_size / 2, y + cell_size / 2 + 2, scale=0.8)
                c.setFillColor(NAVY)
                c.setFont("Helvetica-Bold", 7.5)
                c.drawCentredString(x + cell_size / 2, y + 2 * mm, "MULAI (START)")
            elif (col, r) == (4, 0):
                c.setFillColor(AMBER_MAIN)
                c.circle(x + cell_size / 2, y + cell_size / 2 + 2, 5 * mm, fill=1, stroke=1)
                c.setFillColor(NAVY)
                c.setFont("Helvetica-Bold", 7.5)
                c.drawCentredString(x + cell_size / 2, y + 2 * mm, "SARANG MADU")

    # Right panel: Algorithm Command Blocks to fill in
    panel_x = 126 * mm
    c.setFillColor(AMBER_BG)
    c.setStrokeColor(AMBER_MAIN)
    c.roundRect(panel_x, grid_y, 70 * mm, 100 * mm, 3 * mm, fill=1, stroke=1)

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(panel_x + 35 * mm, grid_y + 92 * mm, "SUSUN BLOK KODE BEEBY")
    c.setFont("Helvetica", 8)
    c.drawCentredString(panel_x + 35 * mm, grid_y + 87 * mm, "Gambar panah (^, v, <, >) di tiap langkah:")

    for step in range(1, 9):
        by = grid_y + 84 * mm - step * 9.8 * mm
        c.setFillColor(WHITE)
        c.setStrokeColor(NAVY)
        c.roundRect(panel_x + 5 * mm, by, 60 * mm, 7.5 * mm, 2 * mm, fill=1, stroke=1)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(panel_x + 8 * mm, by + 2.2 * mm, f"Langkah {step}:")

    # Bonus Challenge at bottom
    c.setFillColor(WHITE)
    c.setStrokeColor(NAVY)
    c.setLineWidth(1)
    c.roundRect(14 * mm, 38 * mm, PAGE_W - 28 * mm, 36 * mm, 3 * mm, fill=1, stroke=1)
    c.setFillColor(AMBER_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(18 * mm, 67 * mm, "TANTANGAN BONUS LEVEL 2 (LOOPING / PERULANGAN):")
    c.setFillColor(SLATE_700)
    c.setFont("Helvetica", 9)
    c.drawString(18 * mm, 60 * mm, "Daripada menulis: [ KANAN ] -> [ KANAN ] -> [ KANAN ], seorang Programmer menulis blok: [ ULANGI 3 KALI: KANAN ].")
    c.drawString(18 * mm, 53 * mm, "Coba ringkas jalur Beeby di atas menggunakan rumus ULANGI (Loop):")
    c.setFont("Helvetica-Bold", 9.5)
    c.setFillColor(NAVY)
    c.drawString(18 * mm, 44 * mm, "Jawaban Loop-ku:  ULANGI [ ___ ] KALI ( ___________ )  lalu  ULANGI [ ___ ] KALI ( ___________ )")

    draw_footer(
        c,
        "Kunci Jalur Tercepat (8 Langkah): 1.BAWAH -> 2.KANAN -> 3.KANAN (Bunga) -> 4.KANAN -> 5.KANAN -> 6.BAWAH -> 7.BAWAH (Bunga) -> 8.BAWAH (Sarang Madu).",
        page_num,
    )


# ==============================================================================
# PAGE 2: DETEKTIF POLA & DEKOMPOSISI (PATTERN RECOGNITION)
# ==============================================================================
def render_page_patterns(c, page_num=1):
    draw_header(
        c,
        "Lembar Kerja #2 • Pattern Recognition",
        "Detektif Pola & Dekomposisi Robot",
        "Temukan rahasia urutan pola di bawah ini dan lengkapi kotak yang kosong!",
        "Usia 6 - 9 Tahun",
    )

    y_cursor = PAGE_H - 64 * mm
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(14 * mm, y_cursor, "BAGIAN A: TEBAK URUTAN POLA BLOK KODE (Lengkapi 2 kotak terakhir!)")

    patterns = [
        ("Pola 1", ["SEGITIGA", "LINGKARAN", "SEGITIGA", "LINGKARAN", "SEGITIGA", "?", "?"]),
        ("Pola 2", ["MAJU", "MAJU", "LOMPAT", "MAJU", "MAJU", "?", "?"]),
        ("Pola 3", ["10", "20", "30", "40", "50", "?", "?"]),
        ("Pola 4", ["A1", "B2", "C3", "D4", "E5", "?", "?"]),
    ]

    for idx, (label, seq) in enumerate(patterns):
        row_y = y_cursor - 18 * mm - idx * 20 * mm
        c.setFillColor(AMBER_DARK)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(14 * mm, row_y + 5 * mm, label)

        for s_idx, item in enumerate(seq):
            bx = 34 * mm + s_idx * 23 * mm
            is_blank = item == "?"
            c.setFillColor(AMBER_BG if is_blank else WHITE)
            c.setStrokeColor(AMBER_MAIN if is_blank else NAVY)
            c.setLineWidth(1.5 if is_blank else 1)
            c.roundRect(bx, row_y, 20 * mm, 13 * mm, 2 * mm, fill=1, stroke=1)
            c.setFillColor(AMBER_DARK if is_blank else NAVY)
            c.setFont("Helvetica-Bold", 8 if len(item) > 4 else 10)
            c.drawCentredString(bx + 10 * mm, row_y + 4.8 * mm, "_____" if is_blank else item)

    # Part B: Decomposition
    decomp_y = 40 * mm
    c.setFillColor(WHITE)
    c.setStrokeColor(NAVY)
    c.setLineWidth(1.2)
    c.roundRect(14 * mm, decomp_y, PAGE_W - 28 * mm, 92 * mm, 3 * mm, fill=1, stroke=1)

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(18 * mm, decomp_y + 83 * mm, "BAGIAN B: DEKOMPOSISI — PECAH GAMBAR ROKet MENJADI BANGUN DATAR!")
    c.setFillColor(SLATE_700)
    c.setFont("Helvetica", 9)
    c.drawString(18 * mm, decomp_y + 77 * mm, "Dalam ilmu komputer, Dekomposisi artinya memecah benda rumit menjadi bagian-bagian kecil yang mudah dibuat.")

    # Draw a geometric Rocket on the left
    rx = 52 * mm
    ry = decomp_y + 18 * mm
    # Nose cone (Triangle)
    p = c.beginPath()
    p.moveTo(rx, ry + 52 * mm)
    p.lineTo(rx - 12 * mm, ry + 36 * mm)
    p.lineTo(rx + 12 * mm, ry + 36 * mm)
    p.close()
    c.setFillColor(ROSE_BG)
    c.setStrokeColor(NAVY)
    c.drawPath(p, fill=1, stroke=1)

    # Fuselage (Rectangle)
    c.setFillColor(BLUE_BG)
    c.rect(rx - 12 * mm, ry + 10 * mm, 24 * mm, 26 * mm, fill=1, stroke=1)

    # 2 Windows (Circles)
    c.setFillColor(AMBER_LIGHT)
    c.circle(rx, ry + 28 * mm, 4.5 * mm, fill=1, stroke=1)
    c.circle(rx, ry + 17 * mm, 4.5 * mm, fill=1, stroke=1)

    # 2 Side Fins (Triangles)
    p_left = c.beginPath()
    p_left.moveTo(rx - 12 * mm, ry + 20 * mm)
    p_left.lineTo(rx - 22 * mm, ry + 10 * mm)
    p_left.lineTo(rx - 12 * mm, ry + 10 * mm)
    p_left.close()
    c.setFillColor(AMBER_MAIN)
    c.drawPath(p_left, fill=1, stroke=1)

    p_right = c.beginPath()
    p_right.moveTo(rx + 12 * mm, ry + 20 * mm)
    p_right.lineTo(rx + 22 * mm, ry + 10 * mm)
    p_right.lineTo(rx + 12 * mm, ry + 10 * mm)
    p_right.close()
    c.drawPath(p_right, fill=1, stroke=1)

    # Exhaust (Rectangle)
    c.setFillColor(SLATE_200)
    c.rect(rx - 6 * mm, ry + 4 * mm, 12 * mm, 6 * mm, fill=1, stroke=1)

    # Right side: Count the shapes
    qx = 96 * mm
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(qx, decomp_y + 62 * mm, "Hitung ada berapa bangun datar penyusun roket di samping:")

    questions = [
        "1. Jumlah SEGITIGA (Atap & Sayap Roket)  =  _______ buah",
        "2. Jumlah PERSEGI PANJANG (Badan & Mesin) =  _______ buah",
        "3. Jumlah LINGKARAN (Jendela Kaca Roket)  =  _______ buah",
        "4. TOTAL SELURUH KOMPONEN ROKET           =  _______ buah",
    ]
    for qi, qtext in enumerate(questions):
        c.setFont("Helvetica-Bold", 9.5)
        c.setFillColor(SLATE_700)
        c.drawString(qx, decomp_y + 50 * mm - qi * 11 * mm, qtext)

    draw_footer(
        c,
        "Kunci Jawaban: Pola 1: LINGKARAN, SEGITIGA | Pola 2: LOMPAT, MAJU | Pola 3: 60, 70 | Pola 4: F6, G7 | Dekomposisi Roket: 3 Segitiga, 2 Persegi Panjang, 2 Lingkaran (Total 7).",
        page_num,
    )


# ==============================================================================
# PAGE 3: MISI DEBUGGING — CARI & PERBAIKI KESALAHAN KODE!
# ==============================================================================
def render_page_debugging(c, page_num=1):
    draw_header(
        c,
        "Lembar Kerja #3 • Debugging & Critical Thinking",
        "Misi Debugging: Cari & Perbaiki Bug!",
        "Tahukah kamu? Kesalahan di dalam kode komputer disebut 'BUG'. Ayo bantu Beeby memperbaikinya!",
        "Usia 7 - 10 Tahun",
    )

    missions = [
        {
            "title": "KASUS BUG #1: Robot Salah Belok ke Kolam Lumpur!",
            "desc": "Tujuan Robot: Berjalan 2 langkah ke KANAN, lalu 1 langkah ke ATAS menuju Bintang.",
            "wrong_code": ["1. KANAN", "2. KANAN", "3. BAWAH (Ke Lumpur!)", "4. AMBIL BINTANG"],
            "question": "Langkah nomor berapa yang menjadi BUG (Salah)? Lingkari di atas, lalu tulis perbaikan kodenya:",
        },
        {
            "title": "KASUS BUG #2: Urutan Kode Pagi Hari yang Terbalik (Sequence Bug)",
            "desc": "Program robot asisten pagi hari mengalami error karena urutannya terbalik:",
            "wrong_code": ["1. Pakai Sepatu", "2. Bangun Tidur", "3. Pakai Kaos Kaki", "4. Berangkat Sekolah"],
            "question": "Urutkan kembali nomor 1 sampai 4 agar program berjalan logis tanpa error:",
        },
        {
            "title": "KASUS BUG #3: Loop Tanpa Henti (Infinite Loop Bug)",
            "desc": "Beeby ingin melompati 3 batu, tapi programmer menulis kode berikut:",
            "wrong_code": ["MULAI", "ULANGI SELAMANYA (Lompat Maju)", "BERHENTI DI SARANG", "SELESAI"],
            "question": "Mengapa Beeby tidak pernah berhenti di sarang? Ubah blok ke-2 agar Beeby hanya melompat 3 kali:",
        },
    ]

    for idx, m in enumerate(missions):
        box_y = PAGE_H - 96 * mm - idx * 54 * mm
        c.setFillColor(WHITE)
        c.setStrokeColor(NAVY)
        c.setLineWidth(1.2)
        c.roundRect(14 * mm, box_y, PAGE_W - 28 * mm, 49 * mm, 3 * mm, fill=1, stroke=1)

        c.setFillColor(ROSE_BG)
        c.roundRect(16 * mm, box_y + 39 * mm, PAGE_W - 32 * mm, 8 * mm, 2 * mm, fill=1, stroke=0)
        c.setFillColor(ROSE)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(20 * mm, box_y + 41.5 * mm, m["title"])

        c.setFillColor(SLATE_700)
        c.setFont("Helvetica", 9)
        c.drawString(20 * mm, box_y + 33 * mm, m["desc"])

        # Draw code blocks
        for b_idx, block in enumerate(m["wrong_code"]):
            bx = 20 * mm + b_idx * 43 * mm
            c.setFillColor(AMBER_BG)
            c.setStrokeColor(AMBER_DARK)
            c.roundRect(bx, box_y + 19 * mm, 40 * mm, 11 * mm, 2 * mm, fill=1, stroke=1)
            c.setFillColor(NAVY)
            c.setFont("Helvetica-Bold", 7.8)
            c.drawCentredString(bx + 20 * mm, box_y + 23.2 * mm, block)

        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(20 * mm, box_y + 12 * mm, m["question"])
        c.setStrokeColor(SLATE_500)
        c.line(20 * mm, box_y + 5 * mm, PAGE_W - 20 * mm, box_y + 5 * mm)

    draw_footer(
        c,
        "Kunci Jawaban: Kasus #1: Langkah 3 salah, seharusnya 3. ATAS | Kasus #2: Urutan benar: 2 -> 3 -> 1 -> 4 | Kasus #3: Ganti 'ULANGI SELAMANYA' menjadi 'ULANGI 3 KALI'.",
        page_num,
    )


# ==============================================================================
# PAGE 4: MEWARNAI DENGAN KODE & PIXEL ART BEEBY
# ==============================================================================
def render_page_coloring_pixel(c, page_num=1):
    draw_header(
        c,
        "Lembar Kerja #4 • Conditionals (If-Then) & Kreativitas",
        "Mewarnai dengan Kode & Pixel Art Beeby",
        "Komputer menampilkan gambar di layar menggunakan kotak-kotak kecil bernama PIKSEL (Pixel).",
        "Usia 5 - 9 Tahun",
    )

    # Left: Color-by-Number Pixel Art Grid (9x9 Heart / Bee Badge)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(14 * mm, PAGE_H - 63 * mm, "MISI A: WARNAI PIKSEL SESUAI ATURAN IF-THEN")

    # Legend
    c.setFillColor(AMBER_BG)
    c.setStrokeColor(AMBER_MAIN)
    c.roundRect(14 * mm, PAGE_H - 83 * mm, 86 * mm, 17 * mm, 2 * mm, fill=1, stroke=1)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(17 * mm, PAGE_H - 71 * mm, "ATURAN LOGIKA WARNA (IF - THEN):")
    c.setFont("Helvetica", 8)
    c.drawString(17 * mm, PAGE_H - 76 * mm, "• JIKA angka = 1  ->  Biarkan PUTIH / BIRU MUDA")
    c.drawString(17 * mm, PAGE_H - 80.5 * mm, "• JIKA angka = 2  ->  Warnai KUNING MADU   |   3 = HITAM")

    pixel_map = [
        [1, 1, 2, 2, 1, 2, 2, 1, 1],
        [1, 2, 1, 1, 2, 1, 1, 2, 1],
        [1, 1, 2, 2, 2, 2, 2, 1, 1],
        [1, 2, 3, 3, 3, 3, 3, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 3, 3, 3, 3, 3, 2, 1],
        [1, 1, 2, 2, 2, 2, 2, 1, 1],
        [1, 1, 1, 3, 3, 3, 1, 1, 1],
        [1, 1, 1, 1, 3, 1, 1, 1, 1],
    ]

    gx = 15 * mm
    gy = PAGE_H - 180 * mm
    p_size = 9.3 * mm
    for r_idx, row in enumerate(pixel_map):
        for c_idx, val in enumerate(row):
            px = gx + c_idx * p_size
            py = gy + (8 - r_idx) * p_size
            c.setFillColor(WHITE)
            c.setStrokeColor(NAVY)
            c.setLineWidth(0.8)
            c.rect(px, py, p_size, p_size, fill=1, stroke=1)
            c.setFillColor(SLATE_500)
            c.setFont("Helvetica-Bold", 9)
            c.drawCentredString(px + p_size / 2, py + p_size / 2 - 3, str(val))

    # Right: Large Coloring Mascot Frame
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(108 * mm, PAGE_H - 63 * mm, "MISI B: WARNAI MASKOT BEEBY & KREASI")

    c.setFillColor(WHITE)
    c.setStrokeColor(NAVY)
    c.setLineWidth(1.2)
    c.roundRect(108 * mm, gy, 88 * mm, 114 * mm, 4 * mm, fill=1, stroke=1)

    # Draw giant outline-only Beeby for kids to color
    draw_bee_icon(c, 152 * mm, gy + 66 * mm, scale=2.6, outline_only=True)

    # Draw honeycomb hexagons to color
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(NAVY)
    c.drawCentredString(152 * mm, gy + 26 * mm, "BEBY SANG KREATOR TEKNOLOGI")
    c.setFont("Helvetica", 8)
    c.setFillColor(SLATE_700)
    c.drawCentredString(152 * mm, gy + 19 * mm, "Tambahkan gambar laptop, bintang, atau")
    c.drawCentredString(152 * mm, gy + 14 * mm, "robot impianmu di sekitar Beeby!")

    # Bottom Reflection Box
    c.setFillColor(AMBER_BG)
    c.setStrokeColor(AMBER_MAIN)
    c.roundRect(14 * mm, 38 * mm, PAGE_W - 28 * mm, 32 * mm, 3 * mm, fill=1, stroke=1)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(18 * mm, 63 * mm, "PERTANYAAN REFLEKSI LOGIKA:")
    c.setFont("Helvetica", 9)
    c.drawString(18 * mm, 55 * mm, "1. Gambar apakah yang muncul di kotak Piksel Misi A setelah kamu mewarnai angka 2 dan 3?  ________________________")
    c.drawString(18 * mm, 45 * mm, "2. Berapa jumlah kotak bernomor 3 pada baris paling bawah (ekor sengat lebah)?  _________ kotak.")

    draw_footer(
        c,
        "Kunci Jawaban: Misi A membentuk gambar Lebah Piksel (Sayap di baris 1-2, Badan belang kuning-hitam di baris 3-7, Sengat di baris 8-9). Baris paling bawah memiliki 1 kotak bernomor 3.",
        page_num,
    )


# ==============================================================================
# PAGE 5: SANDI RAHASIA BINER & LOGIKA AI JUNIOR
# ==============================================================================
def render_page_binary_ai(c, page_num=1):
    draw_header(
        c,
        "Lembar Kerja #5 • Binary Cipher & AI Decision Tree",
        "Sandi Rahasia Biner & Logika AI Junior",
        "Komputer hanya mengerti angka 0 dan 1 (Kode Biner). Pecahkan pesan rahasia Beeby di bawah ini!",
        "Usia 8 - 12 Tahun",
    )

    # Binary Cipher Key Table
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(14 * mm, PAGE_H - 63 * mm, "KAMUS SANDI BINER BEEBY (0 = Lampu Mati [o], 1 = Lampu Nyala [*]):")

    cipher = [
        ("A", "01001"), ("B", "01010"), ("D", "01100"), ("G", "01111"),
        ("I", "10001"), ("K", "10011"), ("N", "10110"), ("O", "10111"),
        ("R", "11010"), ("S", "11011"), ("T", "11100"), ("U", "11101"),
    ]

    for idx, (letter, code) in enumerate(cipher):
        col = idx % 6
        row = idx // 6
        bx = 14 * mm + col * 30.5 * mm
        by = PAGE_H - 78 * mm - row * 13 * mm
        c.setFillColor(AMBER_BG)
        c.setStrokeColor(AMBER_MAIN)
        c.roundRect(bx, by, 28 * mm, 10 * mm, 2 * mm, fill=1, stroke=1)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9)
        c.drawCentredString(bx + 14 * mm, by + 3.2 * mm, f"{letter} = {code}")

    # Secret Word Puzzle
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(14 * mm, PAGE_H - 102 * mm, "MISI A: TERJEMAHKAN KODE BINER INI MENJADI KATA RAHASIA!")

    secret_codes = ["10011", "10111", "01100", "10001", "10110", "01111"]  # K O D I N G
    for idx, sc in enumerate(secret_codes):
        bx = 14 * mm + idx * 30.5 * mm
        by = PAGE_H - 132 * mm
        c.setFillColor(WHITE)
        c.setStrokeColor(NAVY)
        c.setLineWidth(1.2)
        c.roundRect(bx, by, 28 * mm, 24 * mm, 2.5 * mm, fill=1, stroke=1)
        c.setFillColor(SLATE_700)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawCentredString(bx + 14 * mm, by + 16 * mm, sc)
        c.line(bx + 4 * mm, by + 6 * mm, bx + 24 * mm, by + 6 * mm)

    # AI Decision Tree Section
    tree_y = 38 * mm
    c.setFillColor(BLUE_BG)
    c.setStrokeColor(BLUE)
    c.roundRect(14 * mm, tree_y, PAGE_W - 28 * mm, 72 * mm, 3 * mm, fill=1, stroke=1)

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(18 * mm, tree_y + 63 * mm, "MISI B: POHON KEPUTUSAN KECERDASAN BUATAN (AI DECISION TREE)")
    c.setFillColor(SLATE_700)
    c.setFont("Helvetica", 9)
    c.drawString(18 * mm, tree_y + 57 * mm, "Ikuti cabang pertanyaan YA / TIDAK untuk menebak objek manakah yang dimaksud oleh komputer AI:")

    # Root node
    c.setFillColor(WHITE)
    c.setStrokeColor(NAVY)
    c.roundRect(68 * mm, tree_y + 42 * mm, 74 * mm, 11 * mm, 2 * mm, fill=1, stroke=1)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawCentredString(105 * mm, tree_y + 46 * mm, "Apakah benda ini bisa terbang di udara?")

    # Left & Right Branches
    c.line(85 * mm, tree_y + 42 * mm, 52 * mm, tree_y + 32 * mm)
    c.line(125 * mm, tree_y + 42 * mm, 158 * mm, tree_y + 32 * mm)
    c.drawString(58 * mm, tree_y + 36 * mm, "YA")
    c.drawString(142 * mm, tree_y + 36 * mm, "TIDAK")

    c.setFillColor(WHITE)
    c.roundRect(22 * mm, tree_y + 21 * mm, 62 * mm, 11 * mm, 2 * mm, fill=1, stroke=1)
    c.roundRect(126 * mm, tree_y + 21 * mm, 62 * mm, 11 * mm, 2 * mm, fill=1, stroke=1)
    c.setFillColor(NAVY)
    c.drawCentredString(53 * mm, tree_y + 25 * mm, "Apakah menghasilkan madu?")
    c.drawCentredString(157 * mm, tree_y + 25 * mm, "Apakah berjalan di atas rel?")

    # Questions at bottom of tree
    c.setFont("Helvetica-Bold", 9)
    c.drawString(18 * mm, tree_y + 12 * mm, "1. Jika jawabannya: Terbang = YA, Menghasilkan Madu = YA, maka objek itu adalah: _______________________")
    c.drawString(18 * mm, tree_y + 5 * mm, "2. Jika jawabannya: Terbang = TIDAK, Berjalan di Rel = YA, maka objek itu adalah: _______________________")

    draw_footer(
        c,
        "Kunci Jawaban: Misi A Sandi Biner = K - O - D - I - N - G | Misi B Pohon Keputusan AI: 1. LEBAH (Beeby), 2. KERETA API / MRT.",
        page_num,
    )


# ==============================================================================
# PAGE 6: BLUEPRINT PERANCANG GAME PERTAMAKU (GAME DESIGN CANVAS)
# ==============================================================================
def render_page_game_canvas(c, page_num=1):
    draw_header(
        c,
        "Lembar Kerja #6 • Game Development & Variabel",
        "Blueprint Perancang Game Pertamaku",
        "Sebelum membuat game di Scratch atau Roblox, setiap Game Developer merancang blueprint di kertas!",
        "Usia 7 - 13 Tahun",
    )

    # Game Title Banner
    c.setFillColor(AMBER_BG)
    c.setStrokeColor(AMBER_MAIN)
    c.roundRect(14 * mm, PAGE_H - 70 * mm, PAGE_W - 28 * mm, 12 * mm, 2.5 * mm, fill=1, stroke=1)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(18 * mm, PAGE_H - 65.5 * mm, "JUDUL GAME IMPIANKU: _________________________________________________________________")

    # 3 Character Design Boxes
    boxes = [
        ("KARAKTER UTAMA (HERO)", "Gambar jagoan utamamu di sini:"),
        ("MUSUH / RINTANGAN", "Gambar rintangan yang harus dihindari:"),
        ("ITEM BONUS (+SKOR)", "Gambar koin/bintang penambah skor:"),
    ]
    for idx, (btitle, bsub) in enumerate(boxes):
        bx = 14 * mm + idx * 62 * mm
        by = PAGE_H - 128 * mm
        c.setFillColor(WHITE)
        c.setStrokeColor(NAVY)
        c.roundRect(bx, by, 58 * mm, 53 * mm, 3 * mm, fill=1, stroke=1)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawCentredString(bx + 29 * mm, by + 46 * mm, btitle)
        c.setFillColor(SLATE_500)
        c.setFont("Helvetica", 7.5)
        c.drawCentredString(bx + 29 * mm, by + 41 * mm, bsub)

    # Game Logic Rules (IF - THEN)
    logic_y = 38 * mm
    c.setFillColor(WHITE)
    c.setStrokeColor(NAVY)
    c.roundRect(14 * mm, logic_y, PAGE_W - 28 * mm, 74 * mm, 3 * mm, fill=1, stroke=1)

    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(18 * mm, logic_y + 65 * mm, "ATURAN LOGIKA PEMROGRAMAN GAME (IF - THEN EVENTS & VARIABEL):")
    c.setFillColor(SLATE_700)
    c.setFont("Helvetica", 9)
    c.drawString(18 * mm, logic_y + 58 * mm, "Lengkapi logika kode untuk mengatur bagaimana game kamu berjalan:")

    rules = [
        "1. KETIKA tombol [ Panah Atas / Spasi ] ditekan  ->  MAKA Karakter Hero akan: _____________________________",
        "2. JIKA Karakter menyentuh [ Item Bonus ]        ->  MAKA Variabel SKOR bertambah: + _______ poin.",
        "3. JIKA Karakter menyentuh [ Musuh / Rintangan ] ->  MAKA Variabel NYAWA berkurang: - _______ hati.",
        "4. JIKA Variabel SKOR mencapai [ _____ ] poin    ->  MAKA Tampilkan layar: 'KAMU MENANG (NEXT LEVEL)!'",
    ]
    for r_idx, r_text in enumerate(rules):
        ry = logic_y + 45 * mm - r_idx * 11.5 * mm
        c.setFillColor(AMBER_BG)
        c.setStrokeColor(AMBER_MAIN)
        c.roundRect(18 * mm, ry - 3 * mm, PAGE_W - 36 * mm, 9 * mm, 2 * mm, fill=1, stroke=1)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(21 * mm, ry, r_text)

    draw_footer(
        c,
        "Tips Orang Tua: Hasil rancangan anak di lembar ini dapat langsung diwujudkan menjadi game sungguhan di Kelas Trial Gratis Beekoding bersama mentor!",
        page_num,
    )


def build_single_pdf(filename, render_fn):
    filepath = os.path.join(OUTPUT_DIR, filename)
    c = canvas.Canvas(filepath, pagesize=A4)
    c.setTitle("Worksheet Logika & Koding Anak — Beekoding")
    c.setAuthor("Beekoding Academy (www.beekoding.my.id)")
    render_fn(c, page_num=1)
    c.showPage()
    c.save()
    print(f"[generate_worksheet_pdfs] Created {filepath}")


def build_bundle_pdf(filename, render_fns):
    filepath = os.path.join(OUTPUT_DIR, filename)
    c = canvas.Canvas(filepath, pagesize=A4)
    c.setTitle("Bundel Lengkap 6-in-1 Worksheet Logika & Koding Anak — Beekoding")
    c.setAuthor("Beekoding Academy (www.beekoding.my.id)")
    for idx, fn in enumerate(render_fns, start=1):
        fn(c, page_num=idx)
        c.showPage()
    c.save()
    print(f"[generate_worksheet_pdfs] Created Mega Bundle {filepath}")


if __name__ == "__main__":
    build_single_pdf("worksheet-1-labirin-algoritma-beeby.pdf", render_page_maze)
    build_single_pdf("worksheet-2-detektif-pola-logika.pdf", render_page_patterns)
    build_single_pdf("worksheet-3-misi-debugging-kode.pdf", render_page_debugging)
    build_single_pdf("worksheet-4-mewarnai-pixel-art-beeby.pdf", render_page_coloring_pixel)
    build_single_pdf("worksheet-5-sandi-rahasia-biner-ai.pdf", render_page_binary_ai)
    build_single_pdf("worksheet-6-kanvas-perancang-game.pdf", render_page_game_canvas)

    build_bundle_pdf(
        "bundel-lengkap-worksheet-logika-beekoding-2026.pdf",
        [
            render_page_maze,
            render_page_patterns,
            render_page_debugging,
            render_page_coloring_pixel,
            render_page_binary_ai,
            render_page_game_canvas,
        ],
    )
