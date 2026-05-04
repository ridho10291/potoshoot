document.addEventListener('DOMContentLoaded', () => {
    // Nav active styling handled by server/pages directly now
    
    // 2. Pill Group Toggle (Light/Dark, Clean/Crowd)
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

    // 3. Ratio Selector
    const ratioSelectors = document.querySelectorAll('.ratio-selector');
    ratioSelectors.forEach(selector => {
        const options = selector.querySelectorAll('.ratio-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
    });

    // 4. File Upload & Preview Handling
    const setupUpload = (zoneId, inputSelector, previewId, maxFiles = 1) => {
        const zone = document.getElementById(zoneId);
        if (!zone) return;
        
        const input = zone.querySelector(inputSelector);
        const previewArea = document.getElementById(previewId);
        
        // Handle click
        zone.addEventListener('click', () => input.click());

        // Handle Drag & Drop
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
                handleFiles(e.dataTransfer.files, maxFiles, previewArea, input);
            }
        });

        // Handle file selection
        input.addEventListener('change', (e) => {
            if (e.target.files.length) {
                handleFiles(e.target.files, maxFiles, previewArea, input);
            }
        });
    };

    const handleFiles = (files, maxFiles, previewArea, inputElement) => {
        // Limit files
        const filesArray = Array.from(files).slice(0, maxFiles);
        
        if (maxFiles === 1) {
            previewArea.innerHTML = ''; // Clear previous
        }

        const currentCount = previewArea.querySelectorAll('.preview-item').length;
        if (currentCount + filesArray.length > maxFiles) {
            showToast(`Maksimal ${maxFiles} gambar diperbolehkan.`, 'error');
            return;
        }

        filesArray.forEach(file => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button class="remove-btn" onclick="this.parentElement.remove(); updateCombineCount();"><i class="fa-solid fa-xmark"></i></button>
                `;
                previewArea.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        });

        // Small delay to allow DOM update
        setTimeout(updateCombineCount, 100);
    };

    setupUpload('upload-photoshoot', 'input[type="file"]', 'preview-photoshoot', 1);
    setupUpload('upload-pov', 'input[type="file"]', 'preview-pov', 1);
    setupUpload('upload-combine', 'input[type="file"]', 'preview-combine', 5);

    // Update counter for combine section
    window.updateCombineCount = function() {
        const previewArea = document.getElementById('preview-combine');
        if (previewArea) {
            const count = previewArea.querySelectorAll('.preview-item').length;
            const infoText = document.querySelector('#combine .upload-info');
            if (infoText) {
                infoText.textContent = `${count} / 5 Gambar terpilih`;
            }
        }
    };

    // Auto text fill
    const autoBtns = document.querySelectorAll('.btn-auto');
    autoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const textarea = e.target.closest('.form-group').querySelector('textarea');
            if (textarea.placeholder.includes('tangan')) {
                textarea.value = "Tangan pria mengenakan jam tangan kulit memegang botol parfum ini dengan latar belakang sunset kota, gaya sinematik, hyper realistic.";
            } else {
                textarea.value = "Gabungkan elemen produk dengan cipratan air neon dan pencahayaan studio dramatis, gaya cyberpunk.";
            }
            showToast('Instruksi otomatis ditambahkan!');
        });
    });
});

// Mock Generation Function
window.generateAction = function(type) {
    const section = document.getElementById(type);
    const resultPanel = section.querySelector('.result-panel');
    const placeholder = resultPanel.querySelector('.result-placeholder');
    const spinner = placeholder.querySelector('.spinner');
    const icon = placeholder.querySelector('i');
    const text = placeholder.querySelector('p');

    // Basic Validation
    const previewArea = document.getElementById(`preview-${type}`);
    const filesCount = previewArea.querySelectorAll('.preview-item').length;
    
    if (type === 'combine' && filesCount < 2) {
        showToast('Minimal 2 gambar diperlukan untuk digabungkan!', 'error');
        return;
    } else if (filesCount === 0) {
        showToast('Harap unggah gambar terlebih dahulu!', 'error');
        return;
    }

    // Loading State
    icon.style.display = 'none';
    spinner.classList.remove('hidden');
    text.textContent = 'AI sedang menganalisis gambar dan menyusun prompt...';

    // Remove existing results if any
    const existingResult = resultPanel.querySelector('.generated-result');
    const existingOverlay = resultPanel.querySelector('.action-overlay');
    const existingGrid = resultPanel.querySelector('.result-grid');
    const existingPrompt = resultPanel.querySelector('.prompt-result-container');
    
    if (existingResult) existingResult.remove();
    if (existingOverlay) existingOverlay.remove();
    if (existingGrid) existingGrid.remove();
    if (existingPrompt) existingPrompt.remove();
    
    placeholder.style.display = 'flex';

    // Simulate API Call delay
    setTimeout(() => {
        placeholder.style.display = 'none';
        
        // Mock Prompts
        const promptResult = document.createElement('div');
        promptResult.className = 'prompt-result-container';
        promptResult.style.width = '100%';
        promptResult.style.height = '100%';
        promptResult.style.display = 'flex';
        promptResult.style.alignItems = 'center';
        promptResult.style.justifyContent = 'center';
        promptResult.style.animation = 'fadeIn 0.8s ease-out';
        
        // Grab dynamic context
        const detailToggle = document.getElementById(`detail-toggle-${type}`);
        const isDetailed = detailToggle ? detailToggle.checked : true;

        const fileInput = section.querySelector('input[type="file"]');
        let imgContext = "uploaded reference item";
        
        // Use user-provided object name if available, otherwise fallback to filename
        const objectNameInput = document.getElementById(`object-name-${type}`);
        const objectName = objectNameInput && objectNameInput.value.trim() !== '' ? objectNameInput.value.trim() : null;
        
        if (objectName) {
            imgContext = objectName;
        } else if (fileInput && fileInput.files.length > 0) {
            imgContext = Array.from(fileInput.files).map(f => f.name).join(' and ');
        }
        
        let lighting = "Natural";
        let vibe = "Standard";
        const activePills = section.querySelectorAll('.pill.active');
        activePills.forEach(pill => {
            if(pill.textContent === 'Light' || pill.textContent === 'Dark') lighting = pill.textContent;
            if(pill.textContent === 'Clean' || pill.textContent === 'Crowd') vibe = pill.textContent;
        });

        const activeRatio = section.querySelector('.ratio-option.active span');
        const ratioText = activeRatio ? activeRatio.textContent : "1:1";
        
        const logoCheckbox = document.getElementById(`logo-${type}`);
        const includeLogo = logoCheckbox ? logoCheckbox.checked : false;
        
        const removeTextCheckbox = document.getElementById(`remove-text-${type}`);
        const removeText = removeTextCheckbox ? removeTextCheckbox.checked : false;
        
        const textarea = section.querySelector('textarea');
        let userInstructions = textarea && textarea.value.trim() !== '' ? textarea.value.trim() : 'None';

        let promptObj = {
            "system_instruction": "CRITICAL: You are a professional image compositor. You MUST use the provided reference image(s) as the absolute source of truth. Maintain 100% identical structural and visual identity of the input item. Do NOT morph the object into something else (e.g., if it is a specific shirt, it must remain exactly that shirt, not pants or a generic shirt).",
            "generation_parameters": {
                "reference_object_identity": imgContext,
                "aspect_ratio": ratioText,
                "lighting_preference": lighting,
                "atmosphere_vibe": vibe,
                "include_brand_logo": includeLogo,
                "remove_existing_text": removeText
            },
            "user_custom_instructions": userInstructions,
            "target_ai_engines": ["Gemini", "Grok", "Midjourney", "Stable Diffusion"]
        };

        if (type === 'combine') {
            promptObj.prompt_type = "Image Compositing / Blend";
            promptObj.core_prompt = isDetailed 
                ? `Create a seamless, hyper-realistic composition combining the ${imgContext} elements. Ensure all elements are proportionally correct and lighting is cohesive. Apply ${lighting} lighting and a ${vibe} atmosphere. 4K resolution, photorealistic composition, cinematic masterpiece. ${removeText ? 'REMOVE ALL TEXT from the original images.' : ''}` 
                : `Blend ${imgContext} seamlessly. ${lighting} lighting, ${vibe} mood. ${removeText ? 'No text.' : ''}`;
        } else if (type === 'pov') {
            promptObj.prompt_type = "First-Person Point of View (POV)";
            promptObj.core_prompt = isDetailed 
                ? `A realistic first-person POV shot of hands holding ${imgContext}. The hands should interact naturally with the object. Focus on skin texture, real-world imperfections. ${lighting} lighting, ${vibe} background. 35mm lens depth of field, 4K resolution. ${removeText ? 'REMOVE ALL TEXT from the original object.' : ''}` 
                : `POV hands holding ${imgContext}. ${lighting} lighting, ${vibe} background, realistic, 4K. ${removeText ? 'No text.' : ''}`;
        } else {
            promptObj.prompt_type = "Product Photoshoot";
            promptObj.core_prompt = isDetailed 
                ? `High-end commercial product photography of ${imgContext}. The item is placed in a ${vibe} setting with ${lighting} studio lighting. Soft shadows, pristine reflections, 4K resolution, photorealistic, professional color grading. ${removeText ? 'REMOVE ALL TEXT from the original object.' : ''}` 
                : `Product photo of ${imgContext}. ${lighting} lighting, ${vibe} setting, 4K. ${removeText ? 'No text.' : ''}`;
        }

        const generatedJSON = JSON.stringify(promptObj, null, 4);

        promptResult.innerHTML = `
            <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; max-width: 85%; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.3); max-height: 90%; overflow-y: auto;">
                <h3 style="margin-bottom: 15px; color: var(--primary); display: flex; align-items: center; gap: 10px;">
                    <i class="fa-solid fa-code"></i> JSON Prompt Siap Pakai
                </h3>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border: 1px dashed rgba(255,255,255,0.2); margin-bottom: 20px; overflow-x: auto;">
                    <pre style="line-height: 1.5; font-size: 0.9rem; color: var(--text-main); font-family: monospace; white-space: pre-wrap; word-break: break-all;" id="generated-prompt-text">${generatedJSON}</pre>
                </div>
                <div style="display: flex; gap: 15px;">
                    <button class="btn-primary" onclick="copyPrompt()" style="margin-top: 0; padding: 0.8rem 1.5rem; flex: 1;">
                        <i class="fa-regular fa-copy"></i> Salin Prompt JSON
                    </button>
                </div>
            </div>
        `;

        resultPanel.appendChild(promptResult);

        // Record generation stats
        let stats = JSON.parse(localStorage.getItem('usageStats') || '{"logins": 0, "generates": 0}');
        stats.generates += 1;
        localStorage.setItem('usageStats', JSON.stringify(stats));

        // Add to history
        let history = JSON.parse(localStorage.getItem('generateHistory') || '[]');
        const user = localStorage.getItem('loggedInUser') || 'Unknown';
        const date = new Date();
        history.push({
            type: type,
            user: user,
            time: date.toLocaleString('id-ID'),
            status: 'Success'
        });
        localStorage.setItem('generateHistory', JSON.stringify(history));

        showToast('Generate berhasil!');

        // Reset spinner
        icon.style.display = 'block';
        spinner.classList.add('hidden');
        text.textContent = 'Hasil generate akan muncul di sini';
        
    }, 2500);
};

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-message');
    const icon = toast.querySelector('i');
    
    msgEl.textContent = message;
    
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

window.copyPrompt = function() {
    const textElement = document.getElementById('generated-prompt-text');
    if (!textElement) return;
    
    const text = textElement.innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast('Prompt berhasil disalin ke clipboard!', 'success');
    }).catch(err => {
        showToast('Gagal menyalin teks.', 'error');
        console.error('Copy error: ', err);
    });
};
