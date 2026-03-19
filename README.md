# 🤖 Naze WhatsApp Bot

Bot WhatsApp multi fitur yang berjalan di Termux dengan berbagai fitur menarik seperti AI ChatGPT, Brat Generator, All-in-One Downloader, dan Pinterest Search.

## ✨ Fitur

| Fitur | Deskripsi | Command |
|-------|-----------|---------|
| 🤖 AI ChatGPT | Chat dengan AI ChatGPT-4.1 Nano | `!ai <teks>` |
| 🎨 Brat Generator | Buat gambar brat style | `!brat <teks>` |
| 📥 Downloader | Download dari YT, TikTok, IG, FB, Twitter | `!dl <url>` |
| 🔍 Pinterest Search | Cari gambar di Pinterest | `!pinterest <query>` |
| 📚 Wikipedia | Cari artikel Wikipedia | `!wiki <query>` |

## 📋 Persyaratan

- Android dengan Termux terinstall
- Koneksi internet
- Nomor WhatsApp aktif

## 🚀 Instalasi di Termux

### 1. Update & Install Dependencies

```bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
```

### 2. Clone Repository

```bash
cd ~
git clone https://github.com/username/whatsapp-bot.git
cd whatsapp-bot
```

Atau buat folder manual:

```bash
cd ~
mkdir whatsapp-bot
cd whatsapp-bot
```

Lalu copy semua file ke folder tersebut.

### 3. Install Node Modules

```bash
npm install
```

### 4. Konfigurasi

Edit file `config.js` sesuai kebutuhan:

```javascript
botName: 'Naze Bot',        // Nama bot
ownerName: 'Your Name',     // Nama owner
ownerNumber: ['628xxxxxxxxxx@s.whatsapp.net'], // Nomor owner
timezone: 'Asia/Jakarta'    // Timezone
```

### 5. Jalankan Bot

```bash
npm start
```

Atau

```bash
node index.js
```

### 6. Scan QR Code

Setelah menjalankan bot:
1. QR Code akan muncul di terminal
2. Buka WhatsApp di HP → Menu → Perangkat Tertaut → Tautkan Perangkat
3. Scan QR Code yang muncul di terminal
4. Bot akan terhubung otomatis

**Note:** Jika QR Code tidak muncul dengan jelas, perbesar terminal atau kecilkan font.

## 📖 Cara Penggunaan

### 🤖 AI Chat
```
!ai halo, apa kabar?
!chatgpt jelaskan tentang javascript
!gpt buatkan puisi
```

### 🎨 Brat Generator
```
!brat Hello World
!brat aku suka kamu
```

### 📥 Downloader
```
!dl https://www.youtube.com/watch?v=xxxxx
!dl https://vt.tiktok.com/xxxxx
!dl https://www.instagram.com/reel/xxxxx
```

### 🔍 Pinterest Search
```
!pinterest anime wallpaper
!pin kucing lucu
```

### 📚 Wikipedia
```
!wiki Indonesia
!wikipedia JavaScript
```

### ℹ️ Menu & Info
```
!menu      - Tampilkan menu
!ping      - Cek status bot
!owner     - Info owner
```

## 📁 Struktur Folder

```
whatsapp-bot/
├── config.js              # Konfigurasi bot
├── index.js               # File utama
├── package.json           # Dependencies
├── README.md              # Dokumentasi
├── session/               # Session WhatsApp (auto-create)
└── handler/
    ├── message.js         # Message handler utama
    └── commands/
        ├── ai.js          # AI commands
        ├── brat.js        # Brat generator
        ├── downloader.js  # Downloader
        ├── menu.js        # Menu
        ├── owner.js       # Owner info
        └── search.js      # Search commands
```

## 🔧 Troubleshooting

### Error: "Module not found"
```bash
npm install
```

### Error: "Cannot find module '@whiskeysockets/baileys'"
```bash
npm install @whiskeysockets/baileys
```

### Session expired
Hapus folder `session` dan scan ulang:
```bash
rm -rf session
npm start
```

### Bot tidak merespon
- Pastikan koneksi internet stabil
- Cek apakah nomor sudah benar
- Restart bot dengan `Ctrl+C` lalu `npm start`

## 🔄 Auto Restart (Opsional)

Install PM2 untuk auto restart:

```bash
npm install -g pm2
pm2 start index.js --name "whatsapp-bot"
pm2 save
pm2 startup
```

## 📝 Catatan Penting

- Gunakan bot dengan bijak
- Jangan spam command
- Resiko banned WhatsApp ditanggung pengguna
- Backup session folder secara berkala

## 🛡️ Disclaimer

Bot ini dibuat untuk tujuan pembelajaran. Penggunaan bot ini sepenuhnya tanggung jawab pengguna. Developer tidak bertanggung jawab atas penyalahgunaan bot ini.

## 📞 Kontak

Jika ada masalah atau pertanyaan, hubungi owner melalui command `!owner`

## 📄 Lisensi

MIT License - Bebas digunakan dan dimodifikasi

---

⭐ Jangan lupa kasih star di repository ini!
