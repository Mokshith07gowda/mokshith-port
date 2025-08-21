// Navigation functionality
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetPage = item.getAttribute('data-page');
        
        // Remove active class from all nav items and pages
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Add active class to clicked nav item and corresponding page
        item.classList.add('active');
        document.getElementById(targetPage).classList.add('active');
    });
});

// Contact card click functionality
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        const link = card.getAttribute('data-link');
        
        switch(type) {
            case 'email':
                window.open(`mailto:${link}`, '_self');
                break;
            case 'phone':
                window.open(`tel:${link}`, '_self');
                break;
            case 'github':
            case 'linkedin':
                window.open(link, '_blank');
                break;
        }
    });
});

// Smooth scrolling / transition effect
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});
