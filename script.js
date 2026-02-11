// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 2000);
});

// ===== PAGE NAVIGATION =====
function navigateTo(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    // Show target page
    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.classList.add('active');
    }

    // Update nav active state
    document.querySelectorAll('.nav-links button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-page') === pageId) {
            btn.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Show/hide footer
    const footer = document.getElementById('siteFooter');
    if (pageId === 'home') {
        footer.style.display = 'none';
    } else {
        footer.style.display = 'block';
    }

    // Re-trigger fade-in animations
    setTimeout(() => {
        initFadeAnimations();
    }, 150);

    // Close mobile menu
    closeMobile();
}

// Initialize - hide footer on home
document.getElementById('siteFooter').style.display = 'none';

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('backTop');

    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
        backTop.classList.add('visible');
    } else {
        backTop.classList.remove('visible');
    }
});

// ===== MOBILE MENU =====
function toggleMobile() {
    document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobile() {
    document.getElementById('mobileMenu').classList.remove('open');
}

// ===== PERSON MODAL =====
function showPersonModal(name, desc) {
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('personModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closePersonModal() {
    document.getElementById('personModal').classList.remove('open');
    document.body.style.overflow = '';
}
document.getElementById('personModal').addEventListener('click', function(e) {
    if (e.target === this) closePersonModal();
});

// ===== FORM SUBMIT =====
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '<i class="fas fa-check-circle"></i> تم الإرسال بنجاح!';
    btn.style.background = 'linear-gradient(135deg, #059669, #047857)';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرسالة';
        btn.style.background = '';
        e.target.reset();
    }, 3000);
}

// ===== GALLERY FILTER =====
function filterGallery(category, btn) {
    // Update active button
    document.querySelectorAll('.gallery-filter button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter cards
    document.querySelectorAll('.gallery-card').forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            card.style.animation = 'modalIn 0.4s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== FADE-IN ANIMATIONS =====
function initFadeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
        observer.observe(el);
    });
}
initFadeAnimations();

// ===== HERO PARTICLES =====
function createHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const colors = [
        'rgba(37, 99, 235, 0.08)',
        'rgba(30, 64, 175, 0.06)',
        'rgba(59, 130, 246, 0.07)',
        'rgba(96, 165, 250, 0.05)',
        'rgba(184, 134, 11, 0.05)'
    ];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 150 + 30;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
            animation-duration: ${Math.random() * 15 + 15}s;
        `;
        container.appendChild(particle);
    }

    // Add subtle geometric lines
    for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        const isHorizontal = Math.random() > 0.5;
        line.style.cssText = `
            position: absolute;
            background: rgba(37, 99, 235, 0.04);
            ${isHorizontal
                ? `width: ${Math.random() * 300 + 100}px; height: 1px;`
                : `width: 1px; height: ${Math.random() * 300 + 100}px;`
            }
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;
        container.appendChild(line);
    }
}
createHeroParticles();

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePersonModal();
        closeMobile();
    }
});

// ===== SMOOTH TREE CARD HOVER =====
document.querySelectorAll('.ft-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// ===== ACTIVE NAV HIGHLIGHT ON MOBILE =====
document.querySelectorAll('.mobile-menu button').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.mobile-menu button').forEach(b => b.style.background = '');
        this.style.background = 'var(--blue-50)';
    });
});
