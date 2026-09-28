document.addEventListener('DOMContentLoaded', () => {

    // --- PARTİKÜL OLUŞTURUCU (Sadece Arka Plan İçin) ---
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 20; 
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 10 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            const duration = Math.random() * 10 + 10; 
            const delay = Math.random() * 10; 
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particlesContainer.appendChild(particle);
        }
    }

    // --- EKRAN GEÇİŞİ (İLERLE BUTONU - Sadece index.html'de çalışır) ---
    const enterBtn = document.getElementById('enter-btn');
    const introScreen = document.getElementById('intro-screen');
    const mainScreen = document.getElementById('main-screen');

    if (introScreen && mainScreen) {
        // Oturumda intro geçildiyse direkt ana ekranı göster
        if (sessionStorage.getItem('introPassed') === 'true') {
            introScreen.style.display = 'none';
            mainScreen.classList.remove('hidden');
            mainScreen.classList.add('active');
        }

        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                introScreen.style.opacity = '0';
                introScreen.style.transform = 'translateY(-30px)';
                setTimeout(() => {
                    introScreen.style.display = 'none';
                    mainScreen.classList.remove('hidden');
                    setTimeout(() => {
                        mainScreen.classList.add('active');
                    }, 50);
                    sessionStorage.setItem('introPassed', 'true');
                }, 600);
            });
        }
    }

    // --- GİRİŞ EKRANINA GERİ DÖNÜŞ (Tüm Sayfalarda Çalışır) ---
    const backToIntroBtns = document.querySelectorAll('.btn-back-intro');
    backToIntroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sessionStorage.removeItem('introPassed'); // Hafızayı sil
            window.location.href = 'index.html'; // Ana sayfaya (intro'ya) yönlendir
        });
    });

    // --- YAN MENÜ (HAMBURGER) İŞLEMLERİ ---
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    function toggleMenu() {
        if(sidebar && overlay) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // --- KARANLIK / AYDINLIK MOD ---
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn ? themeBtn.querySelector('i') : null;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }
});
