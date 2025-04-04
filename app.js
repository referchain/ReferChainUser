// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Animation for hero section gradient
const heroSection = document.querySelector('.hero-section');
let gradientAngle = 45;

function animateGradient() {
    gradientAngle = (gradientAngle + 1) % 360;
    heroSection.style.background = `linear-gradient(${gradientAngle}deg, #1a237e, #311b92)`;
    requestAnimationFrame(animateGradient);
}

requestAnimationFrame(animateGradient);
