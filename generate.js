// api/generate.js
export default async function handler(req, res) {
  // Hanya izinkan method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, category, count, ratio, imageBase64 } = req.body;

    // Ambil API Key dari Environment Variable (Vercel Settings)
    // JANGAN pernah hardcode API Key di sini jika repo public
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API Key belum dikonfigurasi di server.' });
    }

    let systemInstruction = "";
    let userContent = [];

    // Logika System Prompt berdasarkan Kategori
    if (category === 'Foto Produk' || category === 'POV Tangan') {
      systemInstruction = `You are an expert Product Photographer AI Prompt Engineer. 
      Generate ${count} distinct prompts in English for Midjourney/Flux.
      Format: [Subject Details], [Lighting], [Camera Angle], [Lens/Settings], [Style/Vibe] --ar ${ratio}
      Focus on: Texture, material, commercial lighting, high resolution, 8k.`;
    } else if (category === 'Pre-Wedding' || category === 'Foto Model') {
      systemInstruction = `You are an expert Portrait & Wedding Photographer AI Prompt Engineer.
      Generate ${count} distinct prompts in English.
      Format: [Subject Action/Pose], [Outfit Details], [Location/Background], [Lighting/Mood], [Camera Settings] --ar ${ratio}
      Focus on: Emotion, cinematic lighting, depth of field, aesthetic composition.`;
    } else {
      systemInstruction = `You are an expert General AI Image Prompt Engineer.
      Generate ${count} distinct prompts in English based on the user's description.
      Format: [Main Subject], [Art Style], [Lighting], [Composition], [Quality Tags] --ar ${ratio}`;
    }

    // Siapkan payload untuk Google Gemini
    // Jika ada gambar (base64), kita kirim ke Gemini Vision
    if (imageBase64) {
      userContent = [
        {
          inline_ {
            mime_type: "image/jpeg",
            data: imageBase64.split(',')[1] // Hapus header data:image/jpeg;base64,
          }
        },
        {
          text: `Based on this image, create a prompt for: ${prompt}. Category: ${category}. Additional info: ${req.body.extra || ''}`
        }
      ];
    } else {
      userContent = [{
        text: `Description: ${prompt}. Additional Instructions: ${req.body.extra || ''}. Create ${count} variations.`
      }];
    }

    // Panggil API Google Gemini
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: userContent }],
        system_instruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        }
      })
    });

    const data = await geminiResponse.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const generatedText = data.candidates[0].content.parts[0].text;

    // Kembalikan hasil ke frontend
    return res.status(200).json({ result: generatedText });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Gagal generate prompt: ' + error.message });
  }
}
