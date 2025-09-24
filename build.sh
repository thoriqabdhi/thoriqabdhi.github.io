#!/bin/bash

# --- 1. Memeriksa dan Menginisialisasi Proyek Node.js ---
echo "Mengecek inisialisasi npm..."
if [ ! -f package.json ]; then
    npm init -y
fi

# --- 2. Menginstal Dependencies ---
echo "Menginstal dependencies (Gemini SDK & Vite)..."
npm install @google/genai vite

# --- 3. Membuat Struktur Build (Opsional, tapi bagus) ---
# Vite menggunakan konfigurasi standar, jadi kita hanya perlu menjalankan servernya.

# --- 4. Menjalankan Server Pengembangan (Development Server) ---
echo "Menjalankan server lokal menggunakan Vite. Tekan Ctrl+C untuk menghentikan."
# Vite akan secara otomatis menjalankan server di localhost:5173 atau port terdekat.
# Ini akan mengatasi semua masalah 'require' dan 'import'.
./node_modules/.bin/vite
