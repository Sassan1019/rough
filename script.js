/**
 * ROUGH RUNNERS - Interactive Script
 * 
 * Features:
 * - Scroll-triggered fade-in animations using Intersection Observer
 * - Subtle parallax effects
 * - Smooth, quiet interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initParallax();
  initPhilosophyCards();
  initMobileMenu();
  initHeaderScroll();
  initQAAccordion();
});

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (!menuToggle || !siteNav) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    siteNav.classList.toggle('open');
  });

  // Close menu when clicking nav links
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      siteNav.classList.remove('open');
    });
  });
}

/**
 * Initialize header scroll detection
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Initialize scroll-triggered fade-in animations
 */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -5% 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation for elements in the same section (150ms)
        const delay = index * 150;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Initialize subtle parallax effects
 */
function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Parallax for hero content
        if (heroContent && scrollY < windowHeight) {
          const parallaxAmount = scrollY * 0.3;
          const opacityAmount = 1 - (scrollY / windowHeight) * 1.5;

          heroContent.style.transform = `translateY(${parallaxAmount}px)`;
          heroContent.style.opacity = Math.max(0, opacityAmount);
        }

        // Fade out scroll indicator
        if (heroScrollIndicator && scrollY < windowHeight) {
          const opacityAmount = 1 - (scrollY / (windowHeight * 0.3));
          heroScrollIndicator.style.opacity = Math.max(0, opacityAmount);
        }

        ticking = false;
      });

      ticking = true;
    }
  });
}

/**
 * Smooth scroll for anchor links (if needed in future)
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Initialize staggered fade-in for philosophy cards
 */
function initPhilosophyCards() {
  const cards = document.querySelectorAll('.philosophy-card');

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

        // Stagger delay: 150ms between cards
        const delay = (cardIndex - 1) * 150;

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

/**
 * Initialize Q&A accordion functionality
 */
function initQAAccordion() {
  const qaItems = document.querySelectorAll('.qa-item');

  qaItems.forEach(item => {
    const question = item.querySelector('.qa-question');

    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items (optional - remove if you want multiple open)
      // qaItems.forEach(otherItem => otherItem.classList.remove('open'));

      // Toggle current item
      if (isOpen) {
        item.classList.remove('open');
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
