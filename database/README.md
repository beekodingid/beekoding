# Panduan Migrasi & Impor Basis Data Beekoding (Database Migration Guide)

Berkas SQL di direktori ini dirancang khusus untuk mempermudah migrasi struktur data relasional (DDL), relasi tabel, dan data awal (DML Seed) dari seluruh fitur Beekoding Academy ke server database produksi.

---

## 📁 Struktur Berkas SQL Berdasarkan Dialek Database

### 🐘 Untuk PostgreSQL & Supabase (DBeaver / pgAdmin / Neon / AWS RDS Postgres)
| Nama Berkas | Keterangan |
|---|---|
| **`postgresql_migration_bundle.sql`** | **Rekomendasi Utama (Turnkey)**: Skema DDL 33 tabel, index performa terpisah, views analitik, dan seed data 100% native PostgreSQL & Supabase (`TEXT`, `TIMESTAMP`, `SET session_replication_role = 'replica'`). Bebas error `42704`! |
| **`schema_postgresql.sql`** | **DDL Skema Murni** untuk PostgreSQL / Supabase: 33 tabel relasional, foreign keys, indeks, dan views dashboard. |

### 🐬 Untuk MySQL & MariaDB (phpMyAdmin / Laragon / XAMPP / cPanel)
| Nama Berkas | Keterangan |
|---|---|
| **`beekoding_migration_bundle.sql`** | **Rekomendasi Utama (Turnkey)**: Skema DDL 33 tabel, index internal, views analitik, dan seed data (`LONGTEXT`, `ON UPDATE CURRENT_TIMESTAMP`, `SET FOREIGN_KEY_CHECKS = 0`). |
| **`schema.sql`** | **DDL Skema Murni** untuk MySQL 8.0+ / MariaDB 10.5+. |
| **`seed_data.sql`** | **DML Data Awal (Seed)** murni: Kumpulan data awal realistis untuk seluruh 33 entitas. |

---

## ⚠️ Troubleshooting Umum: SQL Error [42704]

### Penyebab Error:
```text
SQL Error [42704]: ERROR: unrecognized configuration parameter "foreign_key_checks"
```
Error ini terjadi ketika Anda menjalankan berkas **MySQL** (`beekoding_migration_bundle.sql`) di database server **PostgreSQL** (misal via DBeaver dengan driver PostgreSQL, Supabase SQL Editor, atau pgAdmin).

Parameter `foreign_key_checks` adalah variabel konfigurasi session khas **MySQL / MariaDB**. PostgreSQL tidak mengenali parameter tersebut.

### Solusi Cepat:
Gunakan berkas khusus PostgreSQL yang telah disediakan:
👉 **`database/postgresql_migration_bundle.sql`**

Berkas ini telah disesuaikan 100% untuk PostgreSQL:
- Menggunakan `SET session_replication_role = 'replica';` sebagai pengganti `SET FOREIGN_KEY_CHECKS = 0;`.
- Menggunakan tipe data `TEXT` sebagai pengganti `LONGTEXT`.
- Indeks dibuat terpisah dengan `CREATE INDEX IF NOT EXISTS ... ON ...`.
- Menggunakan `DEFAULT CURRENT_TIMESTAMP` murni.

---

## 🚀 Cara Import ke Berbagai Database Server

### 1. PostgreSQL / Supabase / Neon (CLI & Editor)

#### Melalui CLI (`psql`):
```bash
# 1. Buat database jika belum ada
createdb -U postgres beekoding_db

# 2. Impor berkas khusus PostgreSQL
psql -U postgres -d beekoding_db -f database/postgresql_migration_bundle.sql
```

#### Melalui Supabase SQL Editor:
1. Buka **Supabase Dashboard** -> Masuk ke proyek Anda.
2. Buka menu **SQL Editor** pada navigasi kiri.
3. Buka file `database/postgresql_migration_bundle.sql`, salin seluruh kodenya.
4. Tempel (*paste*) ke dalam SQL Editor Supabase lalu klik **RUN**.

#### Melalui DBeaver (PostgreSQL Driver):
1. Sambungkan DBeaver ke database PostgreSQL Anda.
2. Buka berkas `database/postgresql_migration_bundle.sql`.
3. Klik tombol **Execute SQL Script** (Alt + X).

---

### 2. MySQL / MariaDB (CLI & phpMyAdmin)

#### Melalui MySQL CLI:
```bash
# 1. Buat database baru
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS beekoding_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 2. Impor bundel migrasi MySQL
mysql -u root -p beekoding_db < database/beekoding_migration_bundle.sql
```

#### Melalui phpMyAdmin (XAMPP / Laragon / cPanel Hosting):
1. Buka browser dan akses **phpMyAdmin** (misal: `http://localhost/phpmyadmin`).
2. Buat database baru bernama `beekoding_db` dengan *Collation* `utf8mb4_unicode_ci`.
3. Klik database `beekoding_db` pada panel kiri.
4. Klik tab **Import** pada menu atas.
5. Pilih file `database/beekoding_migration_bundle.sql`.
6. Klik tombol **Import / Kirim**.

---

## 📊 Entitas & Modul yang Dimigrasikan (33 Tabel)

1. **Pengaturan & Keamanan**: `system_settings`, `system_users`, `audit_logs`
2. **Penerimaan & Asesmen**: `question_bank`, `students_submissions`, `consultation_inquiries`, `coding_events`, `counseling_sessions`
3. **Akademik & Pengajaran**: `instructors`, `class_batches`, `class_attendance`, `curriculum_modules`, `learning_resources`, `academic_reports`
4. **Gamifikasi & Prestasi**: `coding_quests`, `quest_submissions`, `quiz_exams`, `student_quiz_attempts`, `achievement_badges`, `student_gamification`, `student_certificates`, `student_projects`, `parent_testimonials`
5. **Keuangan & Bisnis**: `financial_transactions`, `promo_vouchers`, `instructor_payrolls`, `referral_ambassadors`, `referral_records`
6. **Komunikasi & Gateway**: `whatsapp_templates`, `class_announcements`, `whatsapp_gateway_config`, `whatsapp_queued_messages`
7. **Analytical Views**: `v_dashboard_kpis`, `v_student_academic_overview`, `v_instructor_performance`, `v_referral_leaderboard`
