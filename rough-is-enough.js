/**
 * Rough is Enough - JavaScript
 * 
 * Features:
 * - Scroll progress bar
 * - Staggered card fade-in with Intersection Observer
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initCardAnimations();
});

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');

    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Staggered Card Fade-in Animations
 */
function initCardAnimations() {
    const cards = document.querySelectorAll('.card');

    if (cards.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const cardIndex = parseInt(card.dataset.card, 10) || 1;

                // Stagger delay: 200ms between cards
                const delay = (cardIndex - 1) * 200;

                setTimeout(() => {
                    card.classList.add('visible');
                }, delay);

                observer.unobserve(card);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
}
