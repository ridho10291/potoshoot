# 🎬 Demo Instructions - AI Visual Studio

## 🚀 Quick Start Demo

### 1. Buka Aplikasi
```
Buka file: index.html di browser
```

### 2. Login dengan Email Demo
```
Email: user@test.com
atau
Email: admin@test.com
```

### 3. Pilih Tab "Product Photoshoot"

### 4. Upload Gambar Contoh
- Klik area upload
- Pilih foto produk (contoh: botol parfum, sepatu, tas, dll)

### 5. Atur Settings
- **Lighting**: Pilih "Light" (untuk foto terang)
- **Atmosphere**: Pilih "Clean" (untuk background bersih)
- **Aspect Ratio**: Pilih "1:1" (untuk Instagram)
- **Include Logo**: ✅ Centang jika produk punya logo
- **Remove Text**: ✅ Centang jika ingin hapus teks

### 6. Tambah Instruksi Custom (Opsional)
```
Contoh instruksi:
"Tambahkan efek bokeh lembut di background untuk kesan premium dan elegan"
```

### 7. Klik "Generate Prompt"
- Tunggu 2-3 detik
- Sistem akan generate 5 variasi prompt

### 8. Lihat Hasil
Anda akan mendapat **5 kartu variasi** dengan background berbeda:

#### Variasi 1: Cafe Modern ☕
```json
{
  "variation_name": "Cafe Modern",
  "background_setting": "cozy modern cafe...",
  "background_mood": "warm and inviting"
}
```

#### Variasi 2: Studio Minimalis 🎬
```json
{
  "variation_name": "Studio Minimalis",
  "background_setting": "clean minimalist studio...",
  "background_mood": "professional and elegant"
}
```

#### Variasi 3: Alam Outdoor 🌿
```json
{
  "variation_name": "Alam Outdoor",
  "background_setting": "natural outdoor environment...",
  "background_mood": "fresh and natural"
}
```

#### Variasi 4: Urban Lifestyle 🏙️
```json
{
  "variation_name": "Urban Lifestyle",
  "background_setting": "contemporary urban lifestyle...",
  "background_mood": "trendy and sophisticated"
}
```

#### Variasi 5: Luxury Premium 💎
```json
{
  "variation_name": "Luxury Premium",
  "background_setting": "premium luxury setting...",
  "background_mood": "exclusive and premium"
}
```

### 9. Copy Prompt
- Klik tombol "Salin" pada variasi yang Anda suka
- Atau klik "Salin Semua Prompt (5 Variasi)" untuk copy semua

### 10. Gunakan di AI Generator

#### Test di ChatGPT:
```
1. Buka ChatGPT (Plus/Pro)
2. Paste prompt JSON yang sudah di-copy
3. Upload gambar produk Anda
4. Ketik: "Generate image based on this prompt"
5. Lihat hasilnya!
```

#### Test di Grok:
```
1. Buka Grok di X.com
2. Paste prompt JSON
3. Upload gambar produk
4. Klik generate
5. Lihat hasilnya!
```

---

## 🎯 Demo Scenario: Botol Parfum

### Input:
- **Produk**: Botol Parfum Luxury
- **Lighting**: Natural
- **Atmosphere**: Clean
- **Aspect Ratio**: 1:1
- **Custom**: "Tambahkan efek bokeh lembut"

### Output (Variasi 1 - Cafe Modern):
```json
{
  "variation_number": 1,
  "variation_name": "Cafe Modern",
  "system_instruction": "CRITICAL: Maintain 100% identical product - same model, same shape, same pattern, same color...",
  "generation_parameters": {
    "reference_object_identity": "Botol Parfum Luxury",
    "background_setting": "cozy modern cafe setting with warm ambient lighting, wooden table surface, coffee cups in soft blur background",
    "background_mood": "warm and inviting",
    "aspect_ratio": "1:1",
    "lighting_preference": "Natural",
    "atmosphere_vibe": "Clean",
    "resolution": "4K (3840x2160)",
    "color_enhancement": "High saturation, sharp contrast, vibrant tones, professional color grading",
    "quality_requirements": "Ultra-sharp, high clarity, photorealistic, commercial-grade"
  },
  "core_prompt": "High-end commercial product photography of Botol Parfum Luxury. The item is placed in a cozy modern cafe setting with warm ambient lighting, wooden table surface, coffee cups in soft blur background. Apply Natural studio lighting. Soft shadows, pristine reflections, 4K resolution, photorealistic, professional color grading.",
  "user_custom_instructions": "Tambahkan efek bokeh lembut",
  "target_ai_engines": ["Grok", "ChatGPT", "Gemini", "Midjourney", "Stable Diffusion", "DALL-E"],
  "output_format": "High-resolution 4K image with enhanced color vibrancy and sharpness"
}
```

### Expected Result:
- Botol parfum **100% identik** dengan foto asli
- Background: Cafe modern dengan meja kayu
- Lighting: Natural dan hangat
- Bokeh lembut di background
- Resolusi: 4K
- Tone: Tajam, terang, jelas

---

## 🎨 Demo Scenario: POV Tangan

### Input:
- **Mode**: POV Tangan
- **Produk**: Jam Tangan Kulit
- **Lighting**: Light
- **Atmosphere**: Clean
- **Custom**: "Tangan pria dengan jas formal"

### Output:
```json
{
  "variation_name": "Studio Minimalis",
  "core_prompt": "A realistic first-person POV shot of hands holding Jam Tangan Kulit. Light lighting, Clean setting with clean minimalist studio with soft gradient backdrop, professional lighting setup, pristine white or neutral tones. The hands should interact naturally with the object. Focus on skin texture, real-world imperfections.",
  ...
}
```

### Expected Result:
- Sudut pandang first-person
- Tangan pria dengan jas formal
- Memegang jam tangan kulit
- Background studio minimalis
- Fokus pada detail tekstur kulit
- Interaksi natural

---

## 🎨 Demo Scenario: Gabungkan Gambar

### Input:
- **Mode**: Gabungkan Gambar
- **Upload**: 3 gambar (produk A, B, C)
- **Lighting**: Dark
- **Atmosphere**: Crowd
- **Custom**: "Gaya cyberpunk dengan neon"

### Output:
```json
{
  "variation_name": "Urban Lifestyle",
  "core_prompt": "Create a seamless, hyper-realistic composition combining the Product A, Product B, Product C elements. Ensure all elements are proportionally correct and lighting is cohesive. Apply Dark lighting and Crowd atmosphere.",
  ...
}
```

### Expected Result:
- 3 produk digabung seamless
- Lighting dark dan dramatis
- Background urban dengan elemen crowd
- Gaya cyberpunk dengan accent neon
- Komposisi proporsional

---

## 📊 Testing Checklist

### ✅ Functional Testing
- [ ] Login berhasil
- [ ] Upload gambar berhasil
- [ ] Preview gambar muncul
- [ ] Settings bisa diubah
- [ ] Generate prompt berhasil
- [ ] 5 variasi muncul
- [ ] Copy prompt berhasil
- [ ] Toast notification muncul

### ✅ UI/UX Testing
- [ ] Animasi smooth
- [ ] Responsive di mobile
- [ ] Hover effects bekerja
- [ ] Icons tampil dengan benar
- [ ] Font terbaca jelas
- [ ] Color scheme konsisten

### ✅ Prompt Quality Testing
- [ ] JSON format valid
- [ ] System instruction lengkap
- [ ] Generation parameters akurat
- [ ] Core prompt detail
- [ ] 5 variasi berbeda
- [ ] Background descriptions jelas

### ✅ Integration Testing
- [ ] Prompt bekerja di ChatGPT
- [ ] Prompt bekerja di Grok
- [ ] Prompt bekerja di Gemini
- [ ] Prompt bekerja di Midjourney
- [ ] Hasil gambar sesuai ekspektasi
- [ ] Produk tetap identik

---

## 🎯 Success Criteria

### Prompt Quality
✅ JSON format valid dan lengkap  
✅ System instruction menjaga identitas produk 100%  
✅ 5 variasi background berbeda dan menarik  
✅ Generation parameters detail dan akurat  
✅ Core prompt jelas dan spesifik  

### Image Output (dari AI Generator)
✅ Produk 100% identik (model, bentuk, motif, warna)  
✅ Background sesuai variasi yang dipilih  
✅ Resolusi 4K atau mendekati  
✅ Tone warna tajam, terang, dan jelas  
✅ Lighting sesuai preferensi  
✅ Komposisi profesional  

### User Experience
✅ Mudah digunakan (< 5 menit untuk generate)  
✅ Interface intuitif  
✅ Feedback jelas (toast notifications)  
✅ Copy prompt mudah  
✅ Dokumentasi lengkap  

---

## 🐛 Common Issues & Solutions

### Issue: "Harap unggah gambar terlebih dahulu!"
**Solution**: Upload gambar dulu sebelum klik generate

### Issue: Prompt tidak bisa di-copy
**Solution**: Klik tombol "Salin" atau manual select + Ctrl+C

### Issue: Hasil AI tidak sesuai
**Solution**: 
- Coba variasi lain (dari 5 yang ada)
- Tambahkan instruksi custom lebih detail
- Pastikan paste seluruh JSON (termasuk system_instruction)

### Issue: Produk berubah bentuk di hasil AI
**Solution**: 
- Pastikan AI generator support image reference
- Upload gambar referensi yang jelas
- Gunakan AI yang lebih advanced (ChatGPT Plus, Grok, dll)

---

## 📝 Demo Notes

### Best Practices untuk Demo:
1. Gunakan foto produk **berkualitas tinggi**
2. Pilih produk yang **mudah dikenali** (botol, sepatu, tas)
3. Test di **minimal 2 AI generator** untuk validasi
4. Bandingkan **semua 5 variasi** untuk show diversity
5. Screenshot hasil untuk **before-after comparison**

### Demo Flow Recommendation:
```
1. Login (30 detik)
2. Upload & Settings (1 menit)
3. Generate (2-3 detik)
4. Review 5 variasi (1 menit)
5. Copy & test di AI (2-3 menit)
6. Show results (1 menit)

Total: ~6-7 menit
```

---

## 🎉 Demo Success!

Jika semua checklist ✅ dan hasil gambar dari AI generator sesuai ekspektasi, maka demo berhasil!

**Next Steps:**
- Gunakan untuk produk real
- Test dengan berbagai jenis produk
- Collect feedback dari users
- Iterate and improve

---

**Happy Demo! 🚀✨**
