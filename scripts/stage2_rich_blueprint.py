import os
import json

# Comprehensive generator for enriched Stage 2 sessions (Sesi 15 to 24)
# With 3D hero images, authentic Scratch 3.0 blocks, and interactive simulators

def get_session_configs():
    return {
        15: {
            "title": "Sistem Timer Hitung Mundur & Alarm Kemenangan",
            "subtitle": "Membangun Adrenalin Waktu dengan Variabel Timer 30 Detik, Alarm Broadcast, dan Layar Game Over",
            "badge": "Sesi 15 • Timer & Alarm",
            "hero_img": "beeby-timer.jpg",
            "icon": "⏱️",
            "mechanic_badge": "Countdown Timer & Broadcast Sinyal",
            "sim_type": "timer"
        },
        16: {
            "title": "Logika Nyawa (Health Heart) & Buah Beracun",
            "subtitle": "Mekanisme Risiko vs Hadiah (Risk & Reward) dengan 3 Hati Kehidupan dan Apel Ungu Beracun",
            "badge": "Sesi 16 • Logika Nyawa",
            "hero_img": "beeby-health.jpg",
            "icon": "❤️",
            "mechanic_badge": "Health Heart & Collision Hazards",
            "sim_type": "health"
        },
        17: {
            "title": "Multi-Level Switching & Badai Hutan Malam",
            "subtitle": "Pergantian Latar Panggung (Backdrops) & Tantangan Badai Angin dengan Kecepatan Bertingkat",
            "badge": "Sesi 17 • Multi-Level",
            "hero_img": "beeby-multilevel.jpg",
            "icon": "🌙",
            "mechanic_badge": "Level Progression & Dynamic Difficulty",
            "sim_type": "multilevel"
        },
        18: {
            "title": "Sistem Skor Tertinggi (High Score Persistence)",
            "subtitle": "Merekam Rekor Juara Pemain dengan Variabel Cloud dan Mahkota Kemenangan",
            "badge": "Sesi 18 • High Score",
            "hero_img": "beeby-highscore.jpg",
            "icon": "👑",
            "mechanic_badge": "Persistence & Conditional Record Check",
            "sim_type": "highscore"
        },
        19: {
            "title": "Kombinasi Gerakan Keyboard (Panah & WASD) vs Mouse",
            "subtitle": "Kontrol Kemudi Ganda Responsif: Tombol Panah, WASD, dan Sensor Mouse",
            "badge": "Sesi 19 • Dual Controls",
            "hero_img": "beeby-controls.jpg",
            "icon": "⌨️",
            "mechanic_badge": "Multi-Input Mechanics & Momentum",
            "sim_type": "controls"
        },
        20: {
            "title": "Koleksi Power-Up Ajaib: Magnet Buah & Keranjang Raksasa",
            "subtitle": "Menghisap Buah Apel dari Jauh dengan Magnet Emas dan Menggandakan Ukuran Mangkuk",
            "badge": "Sesi 20 • Power-Up Items",
            "hero_img": "beeby-powerups.jpg",
            "icon": "🧲",
            "mechanic_badge": "Timed Power-Ups & Attraction Physics",
            "sim_type": "powerups"
        },
        21: {
            "title": "Musuh Bergerak: Laba-laba Pencuri Apel & Patroli AI",
            "subtitle": "Membuat Karakter Rintangan Bergerak Mandiri di Atas Jaring dengan Algoritma Patroli",
            "badge": "Sesi 21 • Enemy AI Patrol",
            "hero_img": "beeby-spider.jpg",
            "icon": "🕷️",
            "mechanic_badge": "Enemy Autonomous AI & Rivalry",
            "sim_type": "enemy"
        },
        22: {
            "title": "Kustomisasi Toko Karakter: Kostum & Efek Suara",
            "subtitle": "Membangun Sistem In-Game Shop: Belanja Kostum Ninja, Robot Emas, dan Penyihir",
            "badge": "Sesi 22 • Skin Shop System",
            "hero_img": "beeby-shop.jpg",
            "icon": "🛒",
            "mechanic_badge": "Economy & Costume Customization",
            "sim_type": "shop"
        },
        23: {
            "title": "Game Balancing, Polishing & Sound FX Orchestration",
            "subtitle": "Harmonisasi Musik Latar, Nada Efek Suara, Kurva Tingkat Kesulitan, dan Game Polish",
            "badge": "Sesi 23 • Audio & Balancing",
            "hero_img": "beeby-audio.jpg",
            "icon": "🎧",
            "mechanic_badge": "Sound Design & Balance Sliders",
            "sim_type": "audio"
        },
        24: {
            "title": "Grand Showcase Stage 2 & Sertifikasi Developer Cilik Level 2",
            "subtitle": "Pameran Game Final, Turnamen Kelas Bersama Orang Tua, dan Penganugerahan Sertifikat Resmi",
            "badge": "Sesi 24 • Demo Day & Graduation",
            "hero_img": "beeby-graduation.jpg",
            "icon": "🎓",
            "mechanic_badge": "Capstone Showcase & Certificate Generator",
            "sim_type": "graduation"
        }
    }

print("Loaded Stage 2 rich configuration blueprint.")
