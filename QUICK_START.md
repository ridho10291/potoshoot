# ⚡ Quick Start Guide - AI Visual Studio V2.1

## 🎯 Tujuan
Generate **1 prompt JSON** yang menghasilkan **6 gambar produk** dengan background berbeda, produk tetap **100% identik**.

---

## 🚀 5 Langkah Mudah

### 1️⃣ Login
```
Buka: index.html
Email: user@test.com atau admin@test.com
```

### 2️⃣ Upload Gambar Produk
```
Klik area upload → Pilih foto produk
```

### 3️⃣ **ISI NAMA PRODUK** ⚠️ PENTING!
```
Field: "Jenis/Nama Objek Utama"

Contoh yang BENAR:
✅ "Celana Jeans Biru"
✅ "Sepatu Sneakers Putih"
✅ "Tas Kulit Coklat"
✅ "Jam Tangan Kulit"

Contoh yang SALAH:
❌ "Produk" (terlalu umum)
❌ "IMG_1234.jpg" (nama file)
❌ Kosong (tidak diisi)
```

**⚠️ WAJIB ISI FIELD INI!**  
Jika tidak diisi atau terlalu umum, AI bisa random generate produk lain.

### 4️⃣ Generate
```
Klik: "Generate Prompt (JSON)"
Tunggu: 2-3 detik
```

### 5️⃣ Copy & Gunakan
```
1. Klik tombol "Salin Prompt"
2. Buka AI generator (Grok, ChatGPT, Gemini, dll)
3. Upload gambar produk sebagai referensi
4. Paste prompt JSON
5. Generate → Dapat 6 gambar sekaligus!
```

---

## 🎨 Hasil: 6 Gambar dengan Background Berbeda

Dari **1 prompt**, AI akan generate **6 gambar**:

1. **Cafe Modern** ☕ - Suasana cafe hangat
2. **Studio Minimalis** 🎬 - Background bersih profesional
3. **Alam Outdoor** 🌿 - Natural dengan bokeh nature
4. **Urban Lifestyle** 🏙️ - Setting urban modern
5. **Luxury Premium** 💎 - Luxury dengan marble/velvet
6. **E-commerce Clean** 🛒 - Pure white background

**Produk tetap 100% sama di semua 6 gambar!**

---

## ✅ Contoh Penggunaan

### Contoh: Celana Jeans

**Input:**
```
Upload: celana_jeans_biru.jpg
Nama Produk: "Celana Jeans Biru"
Lighting: Light
Atmosphere: Clean
```

**Output:**
```json
{
  "system_instruction": "CRITICAL: Maintain EXACT product identity...",
  "reference_object_identity": "Celana Jeans Biru",
  "full_instruction": "Generate 6 variations with different backgrounds:
  1. Cafe Modern: Place Celana Jeans Biru in cozy cafe...
  2. Studio Minimalis: Place Celana Jeans Biru in clean studio...
  ...
  IMPORTANT: Keep Celana Jeans Biru EXACTLY THE SAME in all 6 images."
}
```

**Hasil di AI:**
- ✅ Gambar 1: Celana jeans biru di cafe
- ✅ Gambar 2: Celana jeans biru di studio
- ✅ Gambar 3: Celana jeans biru di outdoor
- ✅ Gambar 4: Celana jeans biru di urban
- ✅ Gambar 5: Celana jeans biru di luxury
- ✅ Gambar 6: Celana jeans biru di e-commerce

**Semua gambar: CELANA JEANS BIRU yang sama!**

---

## 🎯 Tips Penting

### ✅ DO (Lakukan)
- **Isi nama produk dengan jelas dan spesifik**
- Upload foto produk berkualitas tinggi
- Paste SELURUH JSON prompt (jangan potong)
- Upload gambar referensi ke AI generator
- Test di AI yang support image reference (ChatGPT Plus, Grok)

### ❌ DON'T (Jangan)
- Kosongkan field nama produk
- Isi nama produk terlalu umum ("Produk", "Barang")
- Gunakan nama file sebagai nama produk
- Potong/edit prompt JSON
- Lupa upload gambar referensi ke AI

---

## 🐛 Troubleshooting

### Q: AI generate produk random (celana jadi baju)
**A:** 
1. Pastikan isi field "Jenis/Nama Objek Utama" dengan jelas
2. Gunakan nama spesifik: "Celana Jeans Biru" bukan "Produk"
3. Paste SELURUH JSON prompt (termasuk system_instruction)
4. Upload gambar referensi yang jelas

### Q: Hanya dapat 1 gambar, bukan 6
**A:**
1. Gunakan AI yang support multiple variations (ChatGPT, Grok)
2. Atau generate 6x dengan prompt yang sama
3. Atau minta AI: "Generate 6 variations as specified"

### Q: Background tidak sesuai deskripsi
**A:**
1. Coba AI generator yang lebih advanced
2. Tambahkan custom instructions lebih detail
3. Adjust lighting dan atmosphere settings

---

## 🎯 Platform AI yang Direkomendasikan

### ✅ Recommended (Support Image Reference)
- **ChatGPT Plus/Pro** (DALL-E 3) - Excellent
- **Grok** (X.AI) - Excellent
- **Gemini** (Google) - Good
- **Midjourney** - Good (manual variations)

### ⚠️ Limited Support
- **Stable Diffusion** - Need manual setup
- **DALL-E 2** - Limited control

---

## 📊 Expected Results

### Quality Checklist:
- ✅ Produk 100% identik di semua 6 gambar
- ✅ Background berbeda sesuai deskripsi
- ✅ Resolusi 4K atau mendekati
- ✅ Tone warna tajam, terang, jelas
- ✅ Lighting konsisten dengan preferensi
- ✅ Komposisi profesional

---

## 🎉 Success!

Jika Anda mendapat **6 gambar** dengan:
- ✅ Produk yang **sama persis** (model, warna, bentuk)
- ✅ Background yang **berbeda-beda**
- ✅ Kualitas **4K** yang tajam dan jelas

**Selamat! Anda berhasil menggunakan AI Visual Studio!** 🚀

---

## 📞 Need Help?

Jika masih ada masalah:
1. Baca dokumentasi lengkap: `PANDUAN_PENGGUNAAN.md`
2. Lihat contoh prompt: `CONTOH_PROMPT_V2.1.json`
3. Baca update notes: `UPDATE_V2.1.md`

---

**Version**: 2.1  
**Last Updated**: 2026  
**Status**: ✅ Production Ready

**Happy Creating! 🎨✨**
