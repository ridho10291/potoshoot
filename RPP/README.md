# 🎨 AI Visual Studio - Product Photo Prompt Generator

![Version](https://img.shields.io/badge/version-2.0-blue)
![Status](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## 📖 Deskripsi

**AI Visual Studio** adalah aplikasi web untuk menghasilkan **prompt JSON profesional** yang dapat digunakan di berbagai AI Image Generator (Grok, ChatGPT, Gemini, Midjourney, Stable Diffusion, DALL-E) untuk membuat foto produk promosi berkualitas tinggi.

### 🎯 Keunggulan Utama

✅ **5 Variasi Otomatis** - Setiap generate menghasilkan 5 prompt dengan latar belakang berbeda  
✅ **Produk 100% Identik** - Sistem menjaga model, bentuk, motif, dan warna produk tetap sama  
✅ **Resolusi 4K** - Semua prompt dirancang untuk output 4K (3840x2160)  
✅ **Tone Warna Tajam** - High saturation, sharp contrast, vibrant tones  
✅ **Multi-Platform** - Kompatibel dengan Grok, ChatGPT, Gemini, Midjourney, dll  
✅ **Siap Promosi** - Cocok untuk affiliate marketing dan UMKM  

---

## 🚀 Fitur Utama

### 1. **Product Photoshoot** 📸
Generate prompt untuk foto produk profesional dengan berbagai setting background:
- Cafe Modern (warm & inviting)
- Studio Minimalis (professional & elegant)
- Alam Outdoor (fresh & natural)
- Urban Lifestyle (trendy & sophisticated)
- Luxury Premium (exclusive & premium)

### 2. **POV Tangan** 🤲
Generate prompt untuk foto dengan sudut pandang first-person (tangan memegang produk):
- Realistic hand texture
- Natural interaction
- Cinematic composition
- High detail focus

### 3. **Gabungkan Gambar** 🎨
Generate prompt untuk menggabungkan beberapa elemen produk:
- Seamless composition
- Cohesive lighting
- Proportional elements
- Professional blending

---

## 🎨 5 Variasi Background Otomatis

Setiap kali generate, sistem menghasilkan **5 prompt berbeda** dengan variasi background:

| # | Variasi | Suasana | Cocok Untuk |
|---|---------|---------|-------------|
| 1 | **Cafe Modern** ☕ | Warm & Inviting | Lifestyle, F&B, Fashion Casual |
| 2 | **Studio Minimalis** 🎬 | Professional & Elegant | Premium, Tech, Kosmetik |
| 3 | **Alam Outdoor** 🌿 | Fresh & Natural | Natural, Eco-friendly, Health |
| 4 | **Urban Lifestyle** 🏙️ | Trendy & Sophisticated | Fashion, Gadget, Urban |
| 5 | **Luxury Premium** 💎 | Exclusive & Premium | Luxury, Jewelry, High-end |

---

## 📋 Struktur Prompt JSON

Setiap variasi menghasilkan JSON dengan struktur lengkap:

```json
{
  "variation_number": 1,
  "variation_name": "Cafe Modern",
  "system_instruction": "CRITICAL: Maintain 100% identical product...",
  "generation_parameters": {
    "reference_object_identity": "Product Name",
    "background_setting": "Detailed background description",
    "background_mood": "Mood description",
    "aspect_ratio": "1:1",
    "lighting_preference": "Natural",
    "atmosphere_vibe": "Clean",
    "resolution": "4K (3840x2160)",
    "color_enhancement": "High saturation, sharp contrast...",
    "quality_requirements": "Ultra-sharp, photorealistic..."
  },
  "core_prompt": "Detailed prompt for AI...",
  "user_custom_instructions": "Custom instructions...",
  "target_ai_engines": ["Grok", "ChatGPT", "Gemini", ...],
  "output_format": "High-resolution 4K image..."
}
```

---

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS dengan Glass Morphism design
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Inter (Google Fonts)
- **Storage**: LocalStorage untuk data persistence
- **Authentication**: Email-based login system

---

## 📦 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/ai-visual-studio.git
cd ai-visual-studio
```

### 2. Buka di Browser
```bash
# Buka index.html di browser
# Atau gunakan live server
```

### 3. Login
- Email default: `admin@test.com` atau `user@test.com`
- Masuk ke dashboard

---

## 📖 Cara Penggunaan

### Step 1: Upload Gambar
- Klik area upload atau drag & drop
- Pilih foto produk (JPG/PNG)

### Step 2: Atur Preferensi
- **Lighting**: Light / Dark
- **Atmosphere**: Clean / Crowd
- **Aspect Ratio**: 1:1 / 16:9 / 9:16
- **Opsi**: Include Logo, Remove Text

### Step 3: Tambah Instruksi (Opsional)
- Ketik instruksi custom di textarea

### Step 4: Generate
- Klik tombol "Generate Prompt"
- Tunggu 2-3 detik
- Dapatkan 5 variasi prompt

### Step 5: Copy & Gunakan
- Copy prompt JSON (per variasi atau semua)
- Paste ke AI generator pilihan (Grok, ChatGPT, dll)
- Upload gambar referensi
- Generate image!

---

## 🎯 Penggunaan di Platform AI

### Grok (X.AI)
```
1. Copy prompt JSON
2. Buka Grok di X.com
3. Paste prompt + upload gambar
4. Generate
```

### ChatGPT (OpenAI)
```
1. Copy prompt JSON
2. Buka ChatGPT Plus/Pro
3. Paste prompt + upload gambar
4. Ketik: "Generate image based on this prompt"
```

### Midjourney
```
1. Copy "core_prompt"
2. Discord: /imagine prompt: [paste]
3. Add: --ar 1:1 --quality 2 --stylize 1000
```

### Gemini / Stable Diffusion / DALL-E
```
1. Copy prompt JSON atau core_prompt
2. Paste ke platform
3. Upload gambar referensi
4. Generate
```

---

## 📁 Struktur File

```
ai-visual-studio/
├── index.html              # Login page
├── dashboard-ai.html       # Main dashboard
├── admin.html             # Admin panel
├── style.css              # Main stylesheet
├── script.js              # Main JavaScript
├── auth.js                # Authentication logic
├── admin.js               # Admin functionality
├── CHANGELOG.md           # Update history
├── PANDUAN_PENGGUNAAN.md  # User guide
├── CONTOH_PROMPT.json     # Example prompt
└── README.md              # This file
```

---

## 🎨 Fitur UI/UX

- **Glass Morphism Design** - Modern dan elegan
- **Dark Theme** - Nyaman untuk mata
- **Responsive Layout** - Mobile-friendly
- **Smooth Animations** - Fade-in, hover effects
- **Toast Notifications** - User feedback
- **Drag & Drop Upload** - Easy file upload
- **Preview System** - Real-time image preview

---

## 🔐 Sistem Autentikasi

- Email-based login
- LocalStorage persistence
- Admin & user roles
- Login history tracking
- Usage statistics

### Default Emails
- Admin: `admin@test.com`
- User: `user@test.com`

---

## 📊 Statistik & History

Aplikasi melacak:
- Total logins
- Total generates
- Generate history (type, user, time, status)
- Login history (email, time)

---

## 🎯 Use Cases

### 1. **Affiliate Marketing**
- Buat foto produk menarik untuk promosi
- Variasi background untuk A/B testing
- High-quality untuk conversion rate tinggi

### 2. **UMKM / Small Business**
- Foto produk profesional tanpa fotografer
- Hemat biaya studio
- Cepat dan mudah

### 3. **E-commerce**
- Foto produk untuk marketplace
- Banner website
- Social media content

### 4. **Content Creator**
- Instagram feed & story
- TikTok content
- YouTube thumbnail

---

## 💡 Tips & Best Practices

### ✅ DO
- Upload foto resolusi tinggi
- Gunakan foto dengan background bersih
- Coba semua 5 variasi
- Tambahkan instruksi custom yang spesifik
- Save prompt JSON untuk reuse

### ❌ DON'T
- Upload foto blur atau low-res
- Gunakan foto dengan watermark besar
- Harapkan hasil instan
- Lupa backup prompt yang bagus

---

## 🐛 Troubleshooting

### Masalah: Gambar tidak terupload
**Solusi**: Pastikan format JPG/PNG dan ukuran < 10MB

### Masalah: Hasil AI tidak sesuai
**Solusi**: 
- Coba variasi lain
- Tambahkan instruksi custom lebih detail
- Gunakan foto produk lebih jelas
- Paste seluruh JSON (bukan hanya core_prompt)

### Masalah: Produk berubah bentuk
**Solusi**: 
- Pastikan paste system_instruction
- Upload gambar referensi yang jelas
- Gunakan AI yang support image reference

---

## 🔄 Update History

### Version 2.0 (Current)
- ✅ 5 variasi otomatis dengan background berbeda
- ✅ Produk 100% identik system
- ✅ Resolusi 4K support
- ✅ Enhanced color vibrancy
- ✅ Improved prompt structure
- ✅ Better UI/UX dengan kartu variasi

### Version 1.0
- Basic prompt generation
- 4 variations grid
- Simple UI

---

## 📄 License

MIT License - Free to use for personal and commercial projects

---

## 👨‍💻 Developer

Developed with ❤️ for affiliate marketers and UMKM owners

---

## 🙏 Credits

- **Font Awesome** - Icons
- **Google Fonts** - Inter font
- **AI Platforms** - Grok, ChatGPT, Gemini, Midjourney, Stable Diffusion, DALL-E

---

## 📞 Support

Untuk pertanyaan atau bantuan, hubungi admin melalui email yang terdaftar.

---

## 🎉 Happy Creating!

Buat foto produk promosi yang **profesional, menarik, dan berkualitas tinggi** untuk bisnis Anda!

**AI Visual Studio** - *Your Product Photo Prompt Generator* 🚀✨

---

**Made with 💜 for Indonesian Entrepreneurs**
