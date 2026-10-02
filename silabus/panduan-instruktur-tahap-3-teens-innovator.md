# 🐝 PANDUAN LENGKAP INSTRUKTUR: TAHAP 3 — TEENS INNOVATOR
### *Kurikulum & Rencana Pembelajaran Siap Ajar (Instruktur Teaching Handbook & Lesson Plans)*

- **Kode Dokumen**: `BK-INSTR-STAGE-03`
- **Target Usia**: 13 – 17 Tahun (SMP & SMA)
- **Prasyarat Siswa**: Pemahaman aljabar dasar, logika matematika, familiar dengan sistem file komputer (folder, terminal/command prompt)
- **Format Pertemuan**: 12 Sesi Pembelajaran Terpadu @ 90–120 Menit
- **Platform Utama**: *Python 3.10+*, *VS Code*, *Pygame 2.x*, *OpenCV / MediaPipe (Computer Vision)*, *API AI / JSON REST*, *Git & GitHub*
- **Rasio Mentor**: 1 Instruktur : Maksimal 6–8 Siswa (Online) / 10–12 Siswa (Offline Lab)

---

## 🎯 PEDOMAN PEDAGOGIS & POLA PIKIR SISWA REMAJA (TEENS 13–17 TAHUN)

1. **Perlakuan Seperti Junior Software Developer**: Siswa usia remaja tidak menyukai materi yang terasa seperti "anak kecil". Gunakan istilah industri nyata: *Clean Code*, *Refactoring*, *Debugging*, *Version Control*, *API Integration*, dan *Production-Ready*.
2. **Kemandirian Problem-Solving (Read The Docs & Error Stacktrace)**: Saat terjadi error, jangan langsung berikan jawabannya. Latih mereka membaca pesan terminal:
   > *"Lihat baris paling bawah error itu. Tulisannya 'KeyError: score'. Menurut dokumentasi dictionary kita, kenapa key itu tidak ditemukan?"*
3. **Relevansi Masa Depan & Portofolio Nyata**: Tunjukkan bagaimana skill yang dipelajari hari ini berhubungan langsung dengan karir masa depan: Computer Science, AI Engineering, Game Development, dan Data Science.
4. **Etika Rekayasa Software**: Tekankan pentingnya keamanan data, integritas kode, dan etika pemanfaatan AI generatif secara bertanggung jawab.

---

## 🧭 RUNDOWN STANDAR SETIAP SESI MENGAJAR (TOTAL 90–120 MENIT)

| Durasi | Segmen Pembelajaran | Aktivitas Mentor |
| :---: | :--- | :--- |
| **00 – 15 Min** | **Architecture & Concept Breakdown** | Uraikan konsep rekayasa (diagram alur data, arsitektur modul, atau matematika algoritma) sebelum mulai menulis baris kode. |
| **15 – 35 Min** | **Live Coding & Code Along** | Mentor menulis kode sambil menjelaskan filosofi desain (*why*, bukan hanya *how*). Siswa mengetik di editor masing-masing. |
| **35 – 75 Min** | **Implementation & Feature Extension** | Siswa mengembangkan fitur modul secara mandiri dengan pendampingan mentor. |
| **75 – 85 Min** | **Code Review & Refactoring** | Ulas 1 karya siswa di depan kelas: optimasi efisiensi loop, penamaan variabel sesuai PEP 8, dan penanganan edge-case. |
| **85 – 90 Min** | **Git Commit & Next Challenge** | Siswa melakukan commit kode ke repositori lokal/GitHub dan menerima ringkasan misi lanjutan. |

---

# 📚 RENCANA PELAKSANAAN PEMBELAJARAN (LESSON PLANS SESI 1 – 12)

---

## MODUL 1: REKAYASA PERANGKAT LUNAK PYTHON MODERN (SESI 1 – 4)

### SESI 01: Ekosistem Python 3 Modern, Terminal CLI & Standar PEP 8
- **Tujuan Pembelajaran**: Siswa menguasai lingkungan kerja profesional: Visual Studio Code, eksekusi script lewat terminal, tipe data primitif, dan konvensi kode bersih (*PEP 8*).
- **Konsep Kunci**: Interpreter Python, Virtual Environment, Tipe Data Primitif (`int`, `float`, `str`, `bool`), f-string formatting, PEP 8 styling.
- **Langkah Demi Langkah Instruktur**:
  1. Pandu siswa membuka terminal di VS Code (`Ctrl + ~`).
  2. Jelaskan struktur script Python yang baik: *Docstring*, deklarasi konstanta (huruf kapital), fungsi `main()`.
- **Contoh Script Referensi Siap Ajar**:
  ```python
  """
  Beekoding Teens Innovator - Sesi 01
  Program: Smart Terminal Metric Calculator
  Konvensi: PEP 8 Clean Code Standard
  """

  APP_NAME = "Beekoding System Core"
  VERSION = "2026.1"

  def main():
      print(f"[{APP_NAME} v{VERSION}] Initializing System Diagnostic...\n")

      developer_name = input("Enter Developer Name: ").strip().title()
      experience_months = int(input("Enter Coding Experience (months): "))

      is_ready_for_ai = experience_months >= 6
      confidence_score = min(100.0, (experience_months * 8.5) + 20.0)

      print("\n" + "=" * 45)
      print(f"DEVELOPER PROFILE: {developer_name}")
      print(f"Experience Level : {experience_months} months")
      print(f"AI Readiness     : {'READY' if is_ready_for_ai else 'FOUNDATION PHASE'}")
      print(f"Confidence Index : {confidence_score:.1f}%")
      print("=" * 45)

  if __name__ == "__main__":
      main()
  ```
- **Tantangan Siswa**: Tambahkan validasi input menggunakan `while True` agar program tidak crash jika pengguna memasukkan huruf pada kolom angka.

---

### SESI 02: Struktur Data Koleksi (List, Dictionary) & Format JSON
- **Tujuan Pembelajaran**: Siswa mampu mengorganisir data kompleks bersarang (*nested data structures*) dan memanipulasi data dictionary seperti database mini.
- **Konsep Kunci**: List, List Comprehension, Dictionary (Key-Value), Modul `json`.
- **Contoh Script Referensi Siap Ajar**:
  ```python
  import json

  # Database siswa Beekoding berbasis List of Dictionaries
  students_database = [
      {"id": "BK-001", "name": "Alya Pratama", "role": "Junior Coder", "xp": 1450, "skills": ["Scratch", "Python"]},
      {"id": "BK-002", "name": "Bima Sena", "role": "AI Explorer", "xp": 2800, "skills": ["Python", "Teachable Machine"]},
      {"id": "BK-003", "name": "Citra Lestari", "role": "Game Dev", "xp": 3100, "skills": ["Pygame", "Design"]},
  ]

  def display_leaderboard(data):
      print(f"{'ID':<8} {'NAMA SISWA':<18} {'LEVEL XP':<10} {'STATUS'}")
      print("-" * 50)
      # Sorting berdasarkan XP tertinggi menggunakan lambda function
      sorted_data = sorted(data, key=lambda s: s["xp"], reverse=True)
      for rank, student in enumerate(sorted_data, start=1):
          tier = "Elite" if student["xp"] >= 2500 else "Rising Star"
          print(f"{student['id']:<8} {student['name']:<18} {student['xp']:<10} {tier}")

  # Simpan ke file JSON permanen
  with open("students_data.json", "w", encoding="utf-8") as f:
      json.dump(students_database, f, indent=4)

  print("Data successfully serialized to students_data.json\n")
  display_leaderboard(students_database)
  ```
- **Tantangan Siswa**: Buat fungsi `filter_by_skill(skill_name)` yang mencari semua siswa yang menguasai skill tertentu menggunakan List Comprehension.

---

### SESI 03: Modularisasi Fungsi Kustom (`def`), Return & Error Handling
- **Tujuan Pembelajaran**: Siswa memahami arsitektur kode modular (DRY - *Don't Repeat Yourself*), parameter default, dan penanganan crash program dengan blok `try - except`.
- **Konsep Kunci**: Parameter, Return Value, Scope Variabel (Local vs Global), Exception Handling (`ValueError`, `FileNotFoundError`).
- **Contoh Script Referensi Siap Ajar**:
  ```python
  def calculate_course_discount(base_price: float, voucher_code: str = "") -> tuple[float, float]:
      """
      Menghitung diskon kursus berdasarkan kode voucher.
      Returns: (persentase_diskon, total_harga_akhir)
      """
      valid_vouchers = {
          "BEEKODING2026": 0.20, # 20%
          "EARLYBIRD": 0.15,     # 15%
          "SIBLING": 0.10        # 10%
      }

      discount_rate = valid_vouchers.get(voucher_code.upper().strip(), 0.0)
      final_price = base_price * (1.0 - discount_rate)
      return discount_rate, final_price

  def safe_input_price():
      while True:
          try:
              raw = input("Masukkan biaya kursus reguler: Rp ")
              val = float(raw)
              if val <= 0:
                  raise ValueError("Biaya harus lebih besar dari 0.")
              return val
          except ValueError as err:
              print(f"⚠️ Input Tidak Valid: {err}. Silakan coba lagi.\n")

  # Eksekusi
  harga = safe_input_price()
  voucher = input("Masukkan kode voucher (jika ada): ")
  diskon, total = calculate_course_discount(harga, voucher)

  print(f"\nDiskon Diterapkan : {diskon * 100:.0f}%")
  print(f"Total Bayar Akhir : Rp {total:,.2f}")
  ```

---

### SESI 04: File I/O & Sistem Logging Transaksi Sederhana
- **Tujuan Pembelajaran**: Mampu membaca dan menulis file data eksternal secara aman menggunakan context manager `with open()`.
- **Konsep Kunci**: Mode File (`'r'`, `'w'`, `'a'`), Timestamp Logging (`datetime`), Error Logging.
- **Contoh Script Referensi Siap Ajar**:
  ```python
  from datetime import datetime

  LOG_FILE = "system_activity.log"

  def log_event(event_type: str, message: str):
      timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      log_entry = f"[{timestamp}] [{event_type.upper()}] {message}\n"
      with open(LOG_FILE, "a", encoding="utf-8") as f:
          f.write(log_entry)

  # Simulasi aktivitas sistem
  log_event("AUTH", "User 'febri_admin' logged in successfully.")
  log_event("CURRICULUM", "Module MOD-03 Machine Learning viewed by student BK-002.")
  log_event("WARNING", "Supabase sync fallback: Local cache utilized.")

  print(f"Logs appended to {LOG_FILE}:")
  with open(LOG_FILE, "r", encoding="utf-8") as f:
      print(f.read())
  ```

---

## MODUL 2: PENGEMBANGAN GAME GRAFIS 2D DENGAN PYGAME (SESI 5 – 8)

### SESI 05: Anatomi Game Loop & Grafis Kanvas Pygame
- **Tujuan Pembelajaran**: Memahami arsitektur inti dari setiap video game komersial: Game Loop tak hingga, Clock Tick (Frame Per Second / FPS), Event Polling, dan Surface Rendering.
- **Instalasi Modul Siswa**: `pip install pygame`
- **Contoh Script Referensi Siap Ajar**:
  ```python
  import pygame
  import sys

  pygame.init()

  # Pengaturan Layar
  SCREEN_WIDTH = 800
  SCREEN_HEIGHT = 600
  screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
  pygame.display.set_caption("Beekoding Cyber Arena - 2D Engine")

  clock = pygame.time.Clock()
  FPS = 60

  # Warna Palet Hex
  NAVY_BG = (15, 23, 42)
  HONEY_GOLD = (245, 158, 11)

  # Posisi pemain awal
  player_x = SCREEN_WIDTH // 2
  player_y = SCREEN_HEIGHT // 2
  player_speed = 6

  running = True
  while running:
      # 1. Event Polling (Mendengarkan input)
      for event in pygame.event.get():
          if event.type == pygame.QUIT:
              running = False

      # 2. Key State Handling (Gerak Mulus)
      keys = pygame.key.get_pressed()
      if keys[pygame.K_LEFT] or keys[pygame.K_a]:
          player_x -= player_speed
      if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
          player_x += player_speed
      if keys[pygame.K_UP] or keys[pygame.K_w]:
          player_y -= player_speed
      if keys[pygame.K_DOWN] or keys[pygame.K_s]:
          player_y += player_speed

      # 3. Boundary Clamping (Agar tidak keluar layar)
      player_x = max(20, min(SCREEN_WIDTH - 20, player_x))
      player_y = max(20, min(SCREEN_HEIGHT - 20, player_y))

      # 4. Rendering Frame
      screen.fill(NAVY_BG)
      pygame.draw.circle(screen, HONEY_GOLD, (player_x, player_y), 24)
      pygame.display.flip()

      # 5. Lock FPS
      clock.tick(FPS)

  pygame.quit()
  sys.exit()
  ```

---

### SESI 06: Object-Oriented Programming (OOP): Sprite Class & Collision Hitbox
- **Tujuan Pembelajaran**: Siswa mempelajari konsep Class OOP (`class Player(pygame.sprite.Sprite)`) untuk mengelola puluhan peluru dan musuh dengan deteksi tabrakan presisi menggunakan `pygame.sprite.collide_rect`.
- **Konsep Kunci**: OOP Inheritance, `self`, `super().__init__()`, Sprite Groups, Bounding Box Collision.
- **Langkah Demi Langkah Instruktur**:
  1. Pisahkan kode menjadi class `Player`, class `Laser`, dan class `Enemy`.
  2. Gunakan `pygame.sprite.Group()` untuk mengelola render dan update otomatis seluruh objek.
- **Potongan Kode Penting**:
  ```python
  class Laser(pygame.sprite.Sprite):
      def __init__(self, x, y):
          super().__init__()
          self.image = pygame.Surface((6, 16))
          self.image.fill((56, 189, 248)) # Cyan Laser
          self.rect = self.image.get_rect(center=(x, y))

      def update(self):
          self.rect.y -= 12
          if self.rect.bottom < 0:
              self.kill() # Menghapus sprite dari memori secara otomatis saat keluar layar
  ```

---

### SESI 07: Audio Mixer, State Management & Particle Effects
- **Tujuan Pembelajaran**: Menambahkan efek suara interaktif (`pygame.mixer`), sistem partikel ledakan grafis, serta pergantian layar (Menu $\rightarrow$ Playing $\rightarrow$ Game Over).
- **Konsep Kunci**: Enum Game State (`MENU`, `PLAYING`, `GAMEOVER`), Partikel RGB, Sound Channels.

---

### SESI 08: Mini Proyek 1: "Cyber Bee: Space Defense" 2D Arcade Game
- **Tujuan Pembelajaran**: Siswa menyelesaikan game arcade utuh siap main, menata kode ke dalam file terpisah (`main.py`, `settings.py`, `sprites.py`).
- **Fitur Wajib Proyek Siswa**:
  1. Gerak kapal pemain lincah dengan tembakan laser beruntun.
  2. Musuh jatuh dari atas dengan kecepatan acak.
  3. Sistem skor dan pencatatan rekor tertinggi (*High Score*) tersimpan di file lokal.
  4. Audio latar belakang dan sound effect ledakan.

---

## MODUL 3: COMPUTER VISION & ARTIFICIAL INTELLIGENCE (SESI 9 – 12)

### SESI 09: Pengantar Computer Vision: Streaming Webcam & MediaPipe Hands
- **Tujuan Pembelajaran**: Siswa memahami cara kerja computer vision modern; membaca aliran frame webcam secara realtime dan mendeteksi 21 koordinat 3D sendi tangan manusia menggunakan pustaka Google MediaPipe.
- **Instalasi Modul Siswa**: `pip install opencv-python mediapipe`
- **Konsep Kunci**: Frame RGB vs BGR, Matriks Piksel, Normalisasi Koordinat (0.0 s.d. 1.0), 21 Landmark Tangan.
- **Contoh Script Referensi Siap Ajar**:
  ```python
  import cv2
  import mediapipe as mp

  # Inisialisasi MediaPipe Hands
  mp_hands = mp.solutions.hands
  mp_drawing = mp.solutions.drawing_utils
  hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)

  cap = cv2.VideoCapture(0)

  print("Press 'q' in webcam window to quit...")

  while cap.isOpened():
      success, frame = cap.read()
      if not success:
          break

      # Flip frame secara horizontal agar seperti cermin
      frame = cv2.flip(frame, 1)
      h, w, _ = frame.shape

      # Konversi BGR OpenCV ke RGB MediaPipe
      rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
      results = hands.process(rgb_frame)

      if results.multi_hand_landmarks:
          for hand_landmarks in results.multi_hand_landmarks:
              # Gambar rangka sendi tangan
              mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

              # Dapatkan koordinat ujung jari telunjuk (Landmark 8)
              index_tip = hand_landmarks.landmark[8]
              cx, cy = int(index_tip.x * w), int(index_tip.y * h)

              # Gambar lingkaran target di ujung telunjuk
              cv2.circle(frame, (cx, cy), 15, (0, 255, 0), cv2.FILLED)
              cv2.putText(frame, f"Telunjuk: ({cx}, {cy})", (cx + 20, cy),
                          cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

      cv2.imshow("Beekoding AI Vision Lab", frame)
      if cv2.waitKey(1) & 0xFF == ord('q'):
          break

  cap.release()
  cv2.destroyAllWindows()
  ```

---

### SESI 10: Membangun Antarmuka Gestur Virtual: Air-Canvas Drawing
- **Tujuan Pembelajaran**: Menghubungkan pelacakan koordinat ujung jari untuk menggambar garis warna-warni di udara secara realtime (*Touchless Air-Painting*).
- **Konsep Kunci**: Perhitungan Jarak Euclidean antar-ujung jari (deteksi apakah telunjuk dan jempol sedang menjepit / *pinching*).
- **Logika Interaksi**:
  - Jika jari telunjuk terangkat saja $\rightarrow$ Mode Menggambar (*Drawing Mode*).
  - Jika telunjuk dan jempol menjepit (*pinch*) $\rightarrow$ Angkat Pena / Ganti Warna (*Selection Mode*).

---

### SESI 11: Integrasi API AI Generatif: Personal Coding Assistant di Terminal
- **Tujuan Pembelajaran**: Siswa mempelajari konsep API Key, HTTP Request JSON, pemanggilan model AI mutakhir (Claude / Gemini / OpenAI), dan perancangan *System Prompt* spesifik untuk membuat bot coding asisten pribadi.
- **Konsep Kunci**: API Authentication, System Persona Prompt, JSON Payload, Streaming Response.
- **Contoh Script Referensi Siap Ajar (Menggunakan Python Requests / SDK)**:
  ```python
  import os
  import json
  import urllib.request

  # Simulasi integrasi REST endpoint AI Assistant Beekoding
  def ask_ai_tutor(user_question: str) -> str:
      system_prompt = (
          "Kamu adalah Beeby, asisten AI mentor coding ramah dari Beekoding. "
          "Jawablah pertanyaan koding anak remaja dengan bahasa Indonesia yang jelas, "
          "berikan contoh kode Python singkat, dan sertakan kata-kata penyemangat!"
      )

      print("\n🐝 Beeby sedang berpikir meracik jawaban...")
      # Di kelas nyata, ganti dengan API call SDK resmi (Google Gemini / Anthropic API)
      simulated_response = (
          f"[Response untuk: '{user_question}']\n\n"
          f"Halo calon innovator! Untuk menyelesaikan masalah tersebut di Python, "
          f"kamu bisa menggunakan fungsi bawaan 'enumerate()' agar bisa melacak indeks "
          f"sekaligus nilainya. Semangat kodingnya ya! ✨"
      )
      return simulated_response

  def main():
      print("=" * 50)
      print("🐝 BEEKODING AI TERMINAL ASSISTANT")
      print("=" * 50)
      while True:
          query = input("\nTanya Beeby (atau ketik 'exit'): ").strip()
          if query.lower() in ["exit", "quit"]:
              print("Sampai jumpa di sesi berikutnya! Teruslah berkarya!")
              break
          if query:
              jawaban = ask_ai_tutor(query)
              print(jawaban)

  if __name__ == "__main__":
      main()
  ```

---

### SESI 12: CAPSTONE TEENS: PORTFOLIO SHOWCASE & PITCH DECK DEMO DAY
- **Tujuan Pembelajaran**: Siswa menyusun dokumentasi proyek akhir, mempublikasikan kode ke GitHub publik, serta mempresentasikan demo karya di hadapan audiens orang tua dan industri.
- **Komponen Wajib Proyek Capstone**:
  1. Repositori GitHub terstruktur dengan `README.md` berformat Markdown yang rapi (Deskripsi, Instalasi, Demo GIF, dan Penjelasan Fitur).
  2. Implementasi minimal 2 pilar teknologi (misal: Pygame Game + MediaPipe Vision Control, atau Web App + AI Integration).
  3. Slide Presentasi Pitch Deck 5 Lembar:
     - Slide 1: Masalah Dunia Nyata yang Ingin Diselesaikan
     - Slide 2: Solusi Aplikasi yang Dibangun
     - Slide 3: Arsitektur Teknologi & Algoritma Utama
     - Slide 4: Demo Langsung Aplikasi
     - Slide 5: Refleksi Pembelajaran & Rencana Pengembangan Masa Depan
- **Apresiasi Mentor**: Penyerahan Plakat & Sertifikat Resmi *Junior AI Expert & Innovator*, rekomendasi portofolio beasiswa, dan pendampingan publikasi karya.
