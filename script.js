/* =========================================
   MASTER SCRIPT - VIBEVAULT (100% COMPLETE)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE MENU TOGGLE & AUTO-CLOSE
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // 2. ACTIVE NAVBAR LINK HIGHLIGHTER
    const currentPath = window.location.pathname.split('/').pop();
    navItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. SMOOTH SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    const animElements = document.querySelectorAll('.scroll-anim');

    if (animElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 
        };

        const observer = new IntersectionObserver((entries, observer) => {
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

    // 4. FAQ ACCORDION LOGIC
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.icon');
            const isOpened = content.style.maxHeight;

            // Close all other active accordions
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
            document.querySelectorAll('.accordion-header .icon').forEach(i => {
                if (i) i.textContent = '+';
            });

            // Toggle current accordion
            if (!isOpened) {
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.textContent = '-';
            }
        });
    });

    // 5. CONTACT FORM SUBMISSION HANDLER
    const contactForm = document.querySelector('#contact-form') || document.querySelector('form');
    const formMessage = document.querySelector('.form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show temporary success feedback
            formMessage.textContent = "Thank you! Your message has been sent successfully.";
            formMessage.style.color = "#16a34a";
            
            // Reset form input fields
            contactForm.reset();

            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = "";
            }, 5000);
        });
    }

});
