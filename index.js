
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }, 3000);
});

function createParticles() {
    const particles = document.getElementById('particles');
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particles.appendChild(particle);
    }
}

createParticles();

const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.page-section');
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = item.getAttribute('data-page');
        const targetSection = document.getElementById(targetPage);
        
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/show navbar based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav item based on scroll position
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === current) {
            item.classList.add('active');
        }
    });
});

const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('click', () => {
        const contactType = card.getAttribute('data-contact');
        const contactInfo = card.querySelector('.contact-info').textContent;
        
        switch(contactType) {
            case 'email':
                window.open(`mailto:${contactInfo}`);
                break;
            case 'phone':
                window.open(`tel:${contactInfo.replace(/\s/g, '')}`);
                break;
            case 'github':
                window.open(`https://github.com/${contactInfo}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/in/${contactInfo}`, '_blank');
                break;
        }
    });
});

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'translateY(0) rotateX(0)';
    });
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeWriter(heroTitle, 'Mokshith K Y Gowda', 150);
    }
}, 3500);

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
            entry.target.classList.add('revealed');
            entry.target.style.transition = 'all 0.4s ease-out';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const pageSections = document.querySelectorAll('.page-section');
pageSections.forEach(section => {
    const cards = section.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
});

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('revealed');
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
        });
    });
});
