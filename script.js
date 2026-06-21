// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== DARK / LIGHT MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
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

// ===== TYPING EFFECT =====
const typingText = document.querySelector('.typing-text');
const words = ['Frontend Web Developer', 'UI/UX Enthusiast', 'Creative Coder', 'Problem Solving'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 120;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// ===== SKILLS ANIMATION =====
const skillItems = document.querySelectorAll('.skill-item');

function animateSkills() {
    skillItems.forEach(item => {
        const progress = item.querySelector('.progress');
        const rect = item.getBoundingClientRect();

        if (rect.top < window.innerHeight - 50) {
            const width = progress.style.width;
            progress.style.width = '0%';
            setTimeout(() => {
                progress.style.width = width;
            }, 200);
        }
    });
}

window.addEventListener('scroll', animateSkills);

// ==========================================
// ===== CONTACT FORM - FORMSPREE ===========
// ==========================================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const sendBtn = document.getElementById('sendBtn');
    const formData = new FormData(this);

    // Show sending status
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    sendBtn.disabled = true;
    formStatus.innerHTML = '<span style="color: #667eea;">⏳ Sending your message...</span>';

    try {
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.innerHTML = '<span style="color: #51cf66;">✅ Message sent successfully! I\'ll get back to you soon.</span>';
            sendBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            this.reset();

            setTimeout(() => {
                sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                sendBtn.disabled = false;
            }, 3000);
        } else {
            const errorData = await response.json();
            formStatus.innerHTML = '<span style="color: #ff6b6b;">❌ Error: ' + (errorData.error || 'Please try again.') + '</span>';
            sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            sendBtn.disabled = false;
        }
    } catch (error) {
        formStatus.innerHTML = '<span style="color: #ff6b6b;">❌ Network error. Please check your connection.</span>';
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        sendBtn.disabled = false;
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== BACK TO TOP =====
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 999;
    display: none;
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
`;
document.body.appendChild(backToTop);

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});