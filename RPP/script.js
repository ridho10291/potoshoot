// AI Visual Studio - Main Script
// Single Prompt for 5-6 Images with Automatic Background Variations

document.addEventListener('DOMContentLoaded', () => {
    // Initialize pill toggles
    const pillGroups = document.querySelectorAll('.pill-group');
    pillGroups.forEach(group => {
        const pills = group.querySelectorAll('.pill');
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
        });
    });

    // Initialize ratio selector
    const ratioSelectors = document.querySelectorAll('.ratio-selector');
    ratioSelectors.forEach(selector => {
        const options = selector.querySelectorAll('.ratio-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
            });
        });
    });

    // Setup upload zones with drag & drop
    const setupUploadZone = (zoneId, inputSelector, previewId, maxFiles = 1) => {
        const zone = document.getElementById(zoneId);
        if (!zone) return;

        const input = zone.querySelector(inputSelector);
        const preview = document.getElementById(previewId);

        zone.addEventListener('click', () => input.click());

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('dragover');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('dragover');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                handleFiles(e.dataTransfer.files, maxFiles, preview, input);
            }
        });

        input.addEventListener('change', (e) => {
            if (e.target.files.length) {
                handleFiles(e.target.files, maxFiles, preview, input);
            }
        });
    };

    const handleFiles = (files, maxFiles, preview, input) => {
        const fileArray = Array.from(files).slice(0, maxFiles);
        
        if (maxFiles === 1) {
            preview.innerHTML = '';
        }

        const currentCount = preview.querySelectorAll('.preview-item').length;
        if (currentCount + fileArray.length > maxFiles) {
            showToast(`Maksimal ${maxFiles} gambar diperbolehkan.`, 'error');
            return;
        }

        fileArray.forEach(file => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const div = document.createElement('div');
                div.className = 'preview-item';
                div.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button class="remove-btn" onclick="this.parentElement.remove(); updateCombineCount();"><i class="fa-solid fa-xmark"></i></button>
                `;
                preview.appendChild(div);
            };
            reader.readAsDataURL(file);
        });

        setTimeout(updateCombineCount, 100);
    };

    setupUploadZone('upload-photoshoot', 'input[type="file"]', 'preview-photoshoot', 1);
    setupUploadZone('upload-pov', 'input[type="file"]', 'preview-pov', 1);
    setupUploadZone('upload-combine', 'input[type="file"]', 'preview-combine', 5);

    window.updateCombineCount = function() {
        const preview = document.getElementById('preview-combine');
        if (preview) {
            const count = preview.querySelectorAll('.preview-item').length;
            const info = document.querySelector('#combine .upload-info');
            if (info) {
                info.innerText = count + ' / 5 Gambar terpilih';
            }
        }
    };

    // Auto-fill button handlers
    const autoButtons = document.querySelectorAll('.btn-auto');
    autoButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const formGroup = e.target.closest('.form-group').querySelector('textarea');
            if (formGroup.placeholder.includes('tangan')) {
                formGroup.value = 'Tangan pria mengenakan jam tangan kulit memegang botol parfum ini dengan latar belakang sunset kota, gaya sinematik, hyper realistic.';
            } else {
                formGroup.value = 'Gabungkan elemen produk dengan cipratan air neon dan pencahayaan studio dramatis, gaya cyberpunk.';
            }
            showToast('Instruksi otomatis ditambahkan!');
        });
    });
});

// Main generate function - SINGLE PROMPT for 5-6 images
window.generateAction = function(tabId) {
    const tab = document.getElementById(tabId);
    const resultPanel = tab.querySelector('.result-panel');
    const placeholder = resultPanel.querySelector('.result-placeholder');
    const spinner = placeholder.querySelector('.spinner');
    const icon = placeholder.querySelector('i');
    const text = placeholder.querySelector('p');

    const previewArea = document.getElementById('preview-' + tabId);
    const imageCount = previewArea.querySelectorAll('.preview-item').length;

    if (tabId === 'combine' && imageCount < 2) {
        showToast('Minimal 2 gambar diperlukan untuk digabungkan!', 'error');
        return;
    } else if (imageCount === 0) {
        showToast('Harap unggah gambar terlebih dahulu!', 'error');
        return;
    }

    // Show loading state
    icon.style.display = 'none';
    spinner.classList.remove('hidden');
    text.textContent = 'AI sedang menganalisis gambar dan menyusun prompt...';

    // Remove previous results
    const prevResult = resultPanel.querySelector('.generated-result');
    const prevOverlay = resultPanel.querySelector('.action-overlay');
    const prevGrid = resultPanel.querySelector('.result-grid');
    const prevPrompt = resultPanel.querySelector('.prompt-result-container');
    
    if (prevResult) prevResult.remove();
    if (prevOverlay) prevOverlay.remove();
    if (prevGrid) prevGrid.remove();
    if (prevPrompt) prevPrompt.remove();

    placeholder.style.display = 'flex';

    setTimeout(() => {
        placeholder.style.display = 'none';

        // Create prompt result container
        const promptContainer = document.createElement('div');
        promptContainer.className = 'prompt-result-container';
        promptContainer.style.width = '100%';
        promptContainer.style.height = '100%';
        promptContainer.style.display = 'flex';
        promptContainer.style.flexDirection = 'column';
        promptContainer.style.alignItems = 'center';
        promptContainer.style.justifyContent = 'flex-start';
        promptContainer.style.padding = '2rem';
        promptContainer.style.overflowY = 'auto';
        promptContainer.style.gap = '1.5rem';
        promptContainer.style.animation = 'fadeIn 0.8s ease-out';

        // Get user inputs - FIXED: Use exact product name from user
        const autoDetail = document.getElementById('detail-toggle-' + tabId);
        const useAutoDetail = autoDetail ? autoDetail.checked : true;
        
        // CRITICAL FIX: Get exact product name from user input
        const objectNameInput = document.getElementById('object-name-' + tabId);
        let objectName = 'the uploaded product';
        
        if (objectNameInput && objectNameInput.value.trim() !== '') {
            // User explicitly typed the product name - USE THIS EXACTLY
            objectName = objectNameInput.value.trim();
        }

        // Get lighting and atmosphere
        let lighting = 'Natural';
        let atmosphere = 'Standard';
        
        const activePills = tab.querySelectorAll('.pill.active');
        activePills.forEach(pill => {
            if (pill.textContent === 'Light' || pill.textContent === 'Dark') {
                lighting = pill.textContent;
            }
            if (pill.textContent === 'Clean' || pill.textContent === 'Crowd') {
                atmosphere = pill.textContent;
            }
        });

        // Get aspect ratio
        const ratioElement = tab.querySelector('.ratio-option.active span');
        const aspectRatio = ratioElement ? ratioElement.textContent : '1:1';

        // Get toggles
        const logoToggle = document.getElementById('logo-' + tabId);
        const includeLogo = logoToggle ? logoToggle.checked : false;
        
        const removeTextToggle = document.getElementById('remove-text-' + tabId);
        const removeText = removeTextToggle ? removeTextToggle.checked : false;

        // Get custom instructions
        const customTextarea = tab.querySelector('textarea');
        let customInstructions = customTextarea && customTextarea.value.trim() !== '' 
            ? customTextarea.value.trim() 
            : 'None';

        // Define 6 automatic background variations
        const backgroundVariations = [
            {
                name: "Cafe Modern",
                description: "cozy modern cafe setting with warm ambient lighting, wooden table surface, coffee cups in soft blur background",
                mood: "warm and inviting"
            },
            {
                name: "Studio Minimalis",
                description: "clean minimalist studio with soft gradient backdrop, professional lighting setup, pristine white or neutral tones",
                mood: "professional and elegant"
            },
            {
                name: "Alam Outdoor",
                description: "natural outdoor environment with soft bokeh nature background, morning sunlight filtering through leaves, organic textures",
                mood: "fresh and natural"
            },
            {
                name: "Urban Lifestyle",
                description: "contemporary urban lifestyle setting, modern architecture elements in background, city ambiance with soft focus",
                mood: "trendy and sophisticated"
            },
            {
                name: "Luxury Premium",
                description: "premium luxury setting with marble or velvet textures, dramatic lighting with golden accents, high-end atmosphere",
                mood: "exclusive and premium"
            },
            {
                name: "E-commerce Clean",
                description: "pure white background with professional studio lighting, perfect for online marketplace, clean and commercial",
                mood: "commercial and clean"
            }
        ];

        // Build SINGLE unified prompt for 6 variations
        let corePromptBase = '';
        let promptType = '';
        let systemInstruction = `CRITICAL INSTRUCTION: You are a professional product photographer. You MUST maintain the EXACT product identity from the reference image. If the uploaded image shows PANTS/TROUSERS, generate ONLY pants/trousers. If it shows a SHIRT, generate ONLY a shirt. If it shows SHOES, generate ONLY shoes. DO NOT randomly change the product category. Keep 100% identical: model, shape, pattern, color, design details. ONLY change the background setting and lighting. Enhance color vibrancy, sharpness, and clarity for 4K promotional quality.`;

        if (tabId === 'combine') {
            promptType = 'Image Compositing / Blend';
            corePromptBase = useAutoDetail
                ? `Create a seamless, hyper-realistic composition combining ${objectName}. Ensure all elements are proportionally correct and lighting is cohesive. Apply ${lighting} lighting and ${atmosphere} atmosphere. ${removeText ? 'REMOVE ALL TEXT from the original images.' : ''}`
                : `Blend ${objectName} seamlessly. ${lighting} lighting, ${atmosphere} mood. ${removeText ? 'No text.' : ''}`;
        } else if (tabId === 'pov') {
            promptType = 'First-Person Point of View (POV)';
            corePromptBase = useAutoDetail
                ? `A realistic first-person POV shot of hands holding ${objectName}. ${lighting} lighting, ${atmosphere} setting. The hands should interact naturally with the object. Focus on skin texture, real-world imperfections. ${removeText ? 'REMOVE ALL TEXT from the original object.' : ''}`
                : `POV hands holding ${objectName}. ${lighting} lighting, ${atmosphere} setting, 4K. ${removeText ? 'No text.' : ''}`;
        } else {
            promptType = 'Product Photoshoot';
            corePromptBase = useAutoDetail
                ? `High-end commercial product photography of ${objectName}. Apply ${lighting} studio lighting. Soft shadows, pristine reflections, 4K resolution, photorealistic, professional color grading. ${removeText ? 'REMOVE ALL TEXT from the original object.' : ''}`
                : `Product photo of ${objectName}. ${lighting} lighting, ${atmosphere} background. 35mm lens depth of field, 4K resolution. ${removeText ? 'No text.' : ''}`;
        }

        // Build variations list for the prompt
        const variationsList = backgroundVariations.map((bg, index) => {
            return `\n${index + 1}. ${bg.name}: Place ${objectName} in ${bg.description}. Mood: ${bg.mood}.`;
        }).join('');

        // Create SINGLE unified prompt
        const unifiedPrompt = {
            system_instruction: systemInstruction,
            prompt_type: promptType,
            generation_parameters: {
                reference_object_identity: objectName,
                aspect_ratio: aspectRatio,
                lighting_preference: lighting,
                atmosphere_vibe: atmosphere,
                include_brand_logo: includeLogo,
                remove_existing_text: removeText,
                resolution: "4K (3840x2160)",
                color_enhancement: "High saturation, sharp contrast, vibrant tones, professional color grading",
                quality_requirements: "Ultra-sharp, high clarity, photorealistic, commercial-grade",
                number_of_variations: 6
            },
            core_prompt: corePromptBase,
            background_variations: variationsList,
            full_instruction: `${corePromptBase}\n\nGenerate 6 variations with these different backgrounds:${variationsList}\n\nIMPORTANT: Keep ${objectName} EXACTLY THE SAME in all 6 images - same model, same shape, same color, same pattern. ONLY change the background setting. Each variation should show ${objectName} in a different background environment as listed above.`,
            user_custom_instructions: customInstructions,
            target_ai_engines: ["Grok", "ChatGPT", "Gemini", "Midjourney", "Stable Diffusion", "DALL-E"],
            output_format: "Generate 6 separate high-resolution 4K images, each with a different background setting as specified above"
        };

        // Create single prompt card
        const promptCard = document.createElement('div');
        promptCard.className = 'unified-prompt-card';
        promptCard.style.opacity = '0';
        promptCard.style.animation = 'fadeIn 0.6s ease-out forwards';
        
        const promptJSON = JSON.stringify(unifiedPrompt, null, 2);
        
        promptCard.innerHTML = `
            <div class="prompt-card-header">
                <div class="prompt-title">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    <h2>Prompt untuk 6 Variasi Gambar</h2>
                </div>
                <span class="prompt-badge">Single Prompt → 6 Images</span>
            </div>
            
            <div class="prompt-description">
                <p><strong>Produk:</strong> ${objectName}</p>
                <p><strong>Output:</strong> 6 gambar dengan background berbeda (produk tetap 100% identik)</p>
            </div>

            <div class="variations-preview">
                <h4><i class="fa-solid fa-images"></i> 6 Variasi Background:</h4>
                <div class="variations-grid">
                    ${backgroundVariations.map((bg, i) => `
                        <div class="variation-chip">
                            <span class="chip-number">${i + 1}</span>
                            <div class="chip-content">
                                <strong>${bg.name}</strong>
                                <small>${bg.mood}</small>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="prompt-json-container">
                <div class="prompt-json-header">
                    <span><i class="fa-solid fa-code"></i> JSON Prompt Siap Pakai</span>
                    <button class="btn-copy-small" onclick="copyUnifiedPrompt()">
                        <i class="fa-regular fa-copy"></i> Salin Prompt
                    </button>
                </div>
                <pre class="prompt-json-text" id="unified-prompt-json">${promptJSON}</pre>
            </div>

            <div class="usage-instructions">
                <h4><i class="fa-solid fa-lightbulb"></i> Cara Menggunakan:</h4>
                <ol>
                    <li>Salin prompt JSON di atas</li>
                    <li>Buka AI generator (Grok, ChatGPT, Gemini, dll)</li>
                    <li>Upload gambar produk Anda sebagai referensi</li>
                    <li>Paste prompt JSON ini</li>
                    <li>Generate - AI akan membuat 6 gambar dengan background berbeda</li>
                    <li>Produk akan tetap 100% identik di semua 6 gambar</li>
                </ol>
            </div>
        `;
        
        promptContainer.appendChild(promptCard);

        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn-primary';
        copyBtn.style.marginTop = '1rem';
        copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Salin Prompt (6 Variasi)';
        copyBtn.onclick = () => copyUnifiedPrompt();
        promptContainer.appendChild(copyBtn);

        resultPanel.appendChild(promptContainer);

        // Store prompt globally for copy function
        window.currentUnifiedPrompt = unifiedPrompt;

        // Update stats
        let stats = JSON.parse(localStorage.getItem('usageStats') || '{"logins": 0, "generates": 0}');
        stats.generates += 1;
        localStorage.setItem('usageStats', JSON.stringify(stats));

        let history = JSON.parse(localStorage.getItem('generateHistory') || '[]');
        const user = localStorage.getItem('loggedInUser') || 'Unknown';
        const timestamp = new Date();
        history.push({
            type: tabId,
            user: user,
            time: timestamp.toLocaleString('id-ID'),
            status: 'Success'
        });
        localStorage.setItem('generateHistory', JSON.stringify(history));

        showToast('Generate berhasil! Prompt untuk 6 variasi telah dibuat.');
        
        icon.style.display = 'block';
        spinner.classList.add('hidden');
        text.textContent = 'Hasil generate akan muncul di sini';
    }, 2500);
};

// Copy unified prompt
window.copyUnifiedPrompt = function() {
    const promptElement = document.getElementById('unified-prompt-json');
    if (!promptElement) return;

    const promptText = promptElement.textContent;
    navigator.clipboard.writeText(promptText)
        .then(() => {
            showToast('Prompt berhasil disalin! Paste ke AI generator untuk membuat 6 gambar.', 'success');
        })
        .catch(err => {
            showToast('Gagal menyalin teks.', 'error');
            console.error('Copy error: ', err);
        });
};

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const icon = toast.querySelector('i');

    toastMessage.textContent = message;

    if (type === 'error') {
        toast.style.borderLeftColor = '#ef4444';
        toast.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        icon.className = 'fa-solid fa-circle-exclamation';
        icon.style.color = '#ef4444';
    } else {
        toast.style.borderLeftColor = '#22c55e';
        toast.style.borderColor = 'rgba(34, 197, 94, 0.3)';
        icon.className = 'fa-solid fa-check-circle';
        icon.style.color = '#22c55e';
    }

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
