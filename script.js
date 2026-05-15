


const particleContainer = document.getElementById('particles');

for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 5 + 2;
    const left = Math.random() * 100;
    const dur = Math.random() * 20 + 15;
    const del = Math.random() * 20;

    p.style.cssText = `width:${size}px;height:${size}px;left:${left}%;animation-duration:${dur}s;animation-delay:${del}s;`;
    p.style.background = Math.random() > 0.5 ? '#6c63ff' : '#22d3ee';

    particleContainer.appendChild(p);
}


const typedEl = document.getElementById('typed-title');
const phrases = [
    'Web Developer',
    'UI / UX Designer',
    'Front-End Engineer',
    'React Enthusiast',
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingSpeed = 90;

function typeLoop() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
        charIdx--;
        typingSpeed = 50;
    } else {
        charIdx++;
        typingSpeed = 90;
    }

    typedEl.textContent = current.slice(0, charIdx);

    if (!isDeleting && charIdx === current.length) {
        // pause before deleting
        setTimeout(() => { isDeleting = true; typeLoop(); }, 1800);
        return;
    }

    if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
    }

    setTimeout(typeLoop, typingSpeed);
}
typeLoop();


const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


let skillsAnimated = false;

const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            document.querySelectorAll('.skill-bar-fill').forEach(bar => {
                const pct = bar.getAttribute('data-pct');
                setTimeout(() => {
                    bar.style.width = pct + '%';
                }, 200);
            });
            skillBarObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const skillBarsSection = document.getElementById('skill-bars');
if (skillBarsSection) skillBarObserver.observe(skillBarsSection);





const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Shadow on scroll
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link highlight
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});


const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Load saved preference
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    themeIcon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


function handleFormSubmit(e) {
    e.preventDefault();

    const btn = document.getElementById('btn-send');
    const successBox = document.getElementById('form-success');

    // Loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    btn.disabled = true;

    // Simulate sending (replace with actual fetch/EmailJS/etc)
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
        btn.disabled = false;

        successBox.classList.add('show');
        document.getElementById('contactForm').reset();

        setTimeout(() => {
            successBox.classList.remove('show');
        }, 4000);
    }, 1500);
}


document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function () {
        this.style.transform = 'scale(0.92)';
        setTimeout(() => { this.style.transform = ''; }, 150);
    });
});


const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

// Hanya jalankan di perangkat non-touch (desktop)
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Update posisi dot (langsung)
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Update posisi outline dengan sedikit delay/animasi di CSS
        // Untuk animasi yang sangat mulus bisa pakai requestAnimationFrame, 
        // tapi CSS transition yang sudah kita buat sudah cukup baik.
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Efek Hover pada elemen interaktif
    const interactives = document.querySelectorAll('a, button, .skill-tag, .portfolio-card, input, textarea');

    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover-active');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover-active');
        });
    });

    // Efek klik
    window.addEventListener('mousedown', () => {
        cursorOutline.classList.add('click-active');
    });
    window.addEventListener('mouseup', () => {
        cursorOutline.classList.remove('click-active');
    });
}


// Menggunakan Audio Context atau base64 untuk menghindari masalah download
// Di sini kita gunakan suara pop/click synth kecil via base64
const clickSound = new Audio('data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq/9k=');
const hoverSound = new Audio('data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq/9k=');
// Catatan: Base64 audio di atas adalah audio kosong buatan sebagai *placeholder* aman. 
// Untuk suara asli, idealnya menggunakan Web Audio API (Oscillator) agar ringan dan seketika.

function playHoverSound() {
    // Membuat suara 'bloop' singkat pakai Oscillator
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
}

function playClickSound() {
    // Suara 'klik' tajam
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
}

document.querySelectorAll('a, button, .portfolio-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        // playHoverSound() // Uncomment jika ingin ada suara saat hover (kadang mengganggu)
    });
    el.addEventListener('click', playClickSound);
});
