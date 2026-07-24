/* =========================================
   MASTER SCRIPT - VIBEVAULT (UPGRADED)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE MENU TOGGLE
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // 2. ACTIVE NAVBAR LINK
    const currentPath = window.location.pathname.split('/').pop();
    navItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. SCROLL ANIMATIONS
    const animElements = document.querySelectorAll('.scroll-anim');
    if (animElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animElements.forEach(element => {
            observer.observe(element);
        });
    }

    // 4. PROCESS PROGRESS STEPS (visual highlight)
    const progressSteps = document.querySelectorAll('.progress-step');
    const processCards = document.querySelectorAll('.process-card-detailed');

    if (progressSteps.length && processCards.length) {
        // Highlight step when card is scrolled into view
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(processCards).indexOf(entry.target);
                    if (index !== -1 && progressSteps[index]) {
                        progressSteps.forEach(step => step.classList.remove('active'));
                        progressSteps[index].classList.add('active');
                    }
                }
            });
        }, { threshold: 0.5 });

        processCards.forEach(card => stepObserver.observe(card));
    }

    // 5. LEAD FORM (Home page)
    const leadForm = document.getElementById('leadForm');
    const leadMessage = document.getElementById('leadMessage');

    if (leadForm && leadMessage) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            leadMessage.textContent = "Thank you! We'll reach out within 24 hours.";
            leadMessage.style.color = "#16a34a";
            leadForm.reset();
            setTimeout(() => { leadMessage.textContent = ""; }, 5000);
        });
    }

});
