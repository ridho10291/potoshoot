document.addEventListener('DOMContentLoaded', () => {
    loadAdminData();
});

function loadAdminData() {
    // Load Dev Email
    const devEmail = localStorage.getItem('devEmail') || 'admin@test.com';
    const devInput = document.getElementById('dev-email-input');
    if (devInput) devInput.value = devEmail;

    // 1. Load Stats
    const allowedEmails = JSON.parse(localStorage.getItem('allowedEmails') || '[]');
    const stats = JSON.parse(localStorage.getItem('usageStats') || '{"logins": 0, "generates": 0}');
    
    document.getElementById('stat-users').textContent = allowedEmails.length;
    document.getElementById('stat-logins').textContent = stats.logins;
    document.getElementById('stat-generates').textContent = stats.generates;

    // 2. Load Email List
    const emailContainer = document.getElementById('email-list-container');
    if (emailContainer) {
        emailContainer.innerHTML = '';
        allowedEmails.forEach(email => {
            const el = document.createElement('div');
            el.className = 'flex-row mb-2';
            el.innerHTML = `
                <span><i class="fa-regular fa-envelope" style="margin-right:10px; color:var(--text-muted);"></i> ${email}</span>
                <button class="btn-text" onclick="removeEmail('${email}')" style="color:#ef4444;"><i class="fa-solid fa-trash"></i></button>
            `;
            emailContainer.appendChild(el);
        });
    }

    // 3. Load Login History
    const loginHistoryContainer = document.getElementById('login-history-container');
    if (loginHistoryContainer) {
        const history = JSON.parse(localStorage.getItem('loginHistory') || '[]');
        loginHistoryContainer.innerHTML = '';
        
        if (history.length === 0) {
            loginHistoryContainer.innerHTML = '<p class="text-muted text-center py-4">Belum ada riwayat login.</p>';
        } else {
            // Show top 10 recent logins
            history.slice().reverse().slice(0, 10).forEach(item => {
                const el = document.createElement('div');
                el.className = 'history-item flex-row mb-2';
                el.style.alignItems = 'flex-start';
                el.innerHTML = `
                    <div style="flex:1;">
                        <div style="font-weight:600; font-size:0.9rem; color:var(--text-main);"><i class="fa-solid fa-user-check" style="color:var(--primary); margin-right:8px;"></i> ${item.email}</div>
                        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:3px;">Login pada: ${item.time}</div>
                    </div>
                `;
                loginHistoryContainer.appendChild(el);
            });
        }
    }

    // 4. Load History List (Generates)
    const historyContainer = document.getElementById('history-list-container');
    if (historyContainer) {
        const history = JSON.parse(localStorage.getItem('generateHistory') || '[]');
        historyContainer.innerHTML = '';
        
        if (history.length === 0) {
            historyContainer.innerHTML = '<p class="text-muted text-center py-4">Belum ada riwayat generate.</p>';
        } else {
            // Show top 10
            history.slice().reverse().slice(0, 10).forEach(item => {
                const el = document.createElement('div');
                el.className = 'history-item flex-row mb-2';
                el.style.alignItems = 'flex-start';
                el.innerHTML = `
                    <div style="flex:1;">
                        <div style="font-weight:600; font-size:0.9rem; color:var(--primary);">${item.type.toUpperCase()}</div>
                        <div style="font-size:0.8rem; color:var(--text-muted); margin-top:3px;">${item.time} - oleh ${item.user}</div>
                    </div>
                    <span style="font-size:0.75rem; background:rgba(255,255,255,0.1); padding:3px 8px; border-radius:10px;">${item.status}</span>
                `;
                historyContainer.appendChild(el);
            });
        }
    }
}

window.updateDevEmail = function() {
    const input = document.getElementById('dev-email-input');
    const email = input.value.trim();
    if (!email) return;

    localStorage.setItem('devEmail', email);
    
    // Auto-add to allowed emails if not present
    let allowedEmails = JSON.parse(localStorage.getItem('allowedEmails') || '[]');
    if (!allowedEmails.includes(email)) {
        allowedEmails.push(email);
        localStorage.setItem('allowedEmails', JSON.stringify(allowedEmails));
    }
    
    showToast('Email Developer berhasil disimpan!', 'success');
    loadAdminData();
}

window.addEmail = function() {
    const input = document.getElementById('new-email');
    const email = input.value.trim();
    if (!email) return;

    let allowedEmails = JSON.parse(localStorage.getItem('allowedEmails') || '[]');
    if (allowedEmails.includes(email)) {
        showToast('Email sudah terdaftar!', 'error');
        return;
    }

    allowedEmails.push(email);
    localStorage.setItem('allowedEmails', JSON.stringify(allowedEmails));
    input.value = '';
    showToast('Email berhasil ditambahkan!', 'success');
    loadAdminData();
}

window.removeEmail = function(email) {
    let allowedEmails = JSON.parse(localStorage.getItem('allowedEmails') || '[]');
    const devEmail = localStorage.getItem('devEmail');
    
    // Prevent removing yourself or dev
    if (email === localStorage.getItem('loggedInUser')) {
        showToast('Tidak bisa menghapus akun Anda sendiri!', 'error');
        return;
    }

    if (email === devEmail) {
        showToast('Tidak bisa menghapus email Developer Utama!', 'error');
        return;
    }

    allowedEmails = allowedEmails.filter(e => e !== email);
    localStorage.setItem('allowedEmails', JSON.stringify(allowedEmails));
    showToast('Email berhasil dihapus!', 'success');
    loadAdminData();
}
