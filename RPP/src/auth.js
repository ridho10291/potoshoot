// Initialize default allowed emails if none exist
if (!localStorage.getItem('allowedEmails')) {
    localStorage.setItem('allowedEmails', JSON.stringify(['admin@test.com', 'user@test.com']));
}

// Init stats
if (!localStorage.getItem('usageStats')) {
    localStorage.setItem('usageStats', JSON.stringify({ logins: 0, generates: 0 }));
}

// Init mock generate history
if (!localStorage.getItem('generateHistory')) {
    localStorage.setItem('generateHistory', JSON.stringify([]));
}

// Init login history
if (!localStorage.getItem('loginHistory')) {
    localStorage.setItem('loginHistory', JSON.stringify([]));
}

// Init Dev Email
if (!localStorage.getItem('devEmail')) {
    localStorage.setItem('devEmail', 'admin@test.com');
}

function checkAuth() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.indexOf('.html') === -1;
    const isAdminPage = window.location.pathname.endsWith('admin.html');
    const devEmail = localStorage.getItem('devEmail') || 'admin@test.com';

    // If not logged in and not on login page -> go to login
    if (!loggedInUser && !isLoginPage) {
        window.location.href = 'index.html';
    }
    // If logged in and on login page -> go to dashboard
    else if (loggedInUser && isLoginPage) {
        window.location.href = 'dashboard-ai.html';
    }
    // If logged in but trying to access admin page and NOT dev
    else if (loggedInUser && isAdminPage && loggedInUser !== devEmail) {
        alert('Akses Ditolak! Hanya Developer yang bisa mengakses halaman ini.');
        window.location.href = 'dashboard-ai.html';
    }
}

// Run auth check immediately
checkAuth();

function handleLogin(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email-input').value.trim();

    if (!emailInput) {
        showToast('Masukkan email terlebih dahulu!', 'error');
        return;
    }

    const allowed = JSON.parse(localStorage.getItem('allowedEmails') || '[]');

    if (allowed.includes(emailInput)) {
        localStorage.setItem('loggedInUser', emailInput);

        // Record login stat
        let stats = JSON.parse(localStorage.getItem('usageStats'));
        stats.logins += 1;
        localStorage.setItem('usageStats', JSON.stringify(stats));

        // Record login history
        let loginHistory = JSON.parse(localStorage.getItem('loginHistory') || '[]');
        loginHistory.push({
            email: emailInput,
            time: new Date().toLocaleString('id-ID')
        });
        localStorage.setItem('loginHistory', JSON.stringify(loginHistory));

        showToast('Login berhasil! Mengalihkan...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard-ai.html';
        }, 1000);
    } else {
        showToast('Email tidak terdaftar. Hubungi Admin untuk Login.', 'error');
    }
}

function handleLogout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

function updateUserInfo() {
    const userDisplay = document.getElementById('logged-user-email');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (userDisplay) {
        userDisplay.textContent = loggedInUser || 'User';
    }

    // Hide Dev Admin menu if user is not the Developer
    const devEmail = localStorage.getItem('devEmail') || 'admin@test.com';
    if (loggedInUser !== devEmail) {
        const adminLinks = document.querySelectorAll('a[href="admin.html"]');
        adminLinks.forEach(link => {
            link.style.display = 'none';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateUserInfo();

    // Attach login form handler if exists
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
