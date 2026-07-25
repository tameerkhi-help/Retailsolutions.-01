/* =========================================
   MASTER SCRIPT - VIBEVAULT (ENTERPRISE UPGRADE)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE MENU
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // 2. ACTIVE NAV LINK
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. SCROLL ANIMATIONS
    const animElements = document.querySelectorAll('.scroll-anim');
    if (animElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        animElements.forEach(el => observer.observe(el));
    }

    // 4. PROCESS PROGRESS STEPS
    const progressSteps = document.querySelectorAll('.progress-step');
    const processCards = document.querySelectorAll('.process-card-detailed');
    if (progressSteps.length && processCards.length) {
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

    // 5. CAROUSELS (Features & Testimonials)
    function initCarousel(wrapperId, slideSelector, autoScroll = true) {
        const wrapper = document.getElementById(wrapperId);
        if (!wrapper) return;
        const track = wrapper.querySelector('.carousel-track');
        const slides = track.querySelectorAll(slideSelector);
        const prevBtn = wrapper.querySelector('.carousel-btn.prev');
        const nextBtn = wrapper.querySelector('.carousel-btn.next');
        const dotsContainer = wrapper.querySelector('.carousel-dots');
        let currentIndex = 0;
        let slidesPerView = 1;
        let totalSlides = slides.length;
        let interval;

        function getSlidesPerView() {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 1024) return 2;
            return slideSelector === '.testimonial-slide' ? 2 : 3;
        }

        function updateCarousel() {
            slidesPerView = getSlidesPerView();
            const slideWidth = 100 / slidesPerView;
            slides.forEach(slide => {
                slide.style.minWidth = `calc(${slideWidth}% - ${(20 * (slidesPerView - 1)) / slidesPerView}px)`;
            });
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            track.style.transform = `translateX(-${currentIndex * (100 / slidesPerView)}%)`;
            updateDots();
        }

        function updateDots() {
            if (!dotsContainer) return;
            const dotCount = Math.ceil(totalSlides / slidesPerView);
            dotsContainer.innerHTML = '';
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('span');
                dot.classList.toggle('active', i === Math.floor(currentIndex / slidesPerView));
                dot.addEventListener('click', () => {
                    currentIndex = i * slidesPerView;
                    updateCarousel();
                    resetAutoScroll();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function goToSlide(index) {
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            currentIndex = Math.min(Math.max(0, index), maxIndex);
            updateCarousel();
        }

        function nextSlide() {
            const maxIndex = Math.max(0, totalSlides - slidesPerView);
            if (currentIndex + slidesPerView >= totalSlides) {
                currentIndex = 0;
            } else {
                currentIndex += slidesPerView;
            }
            updateCarousel();
        }

        function prevSlide() {
            if (currentIndex - slidesPerView < 0) {
                currentIndex = Math.max(0, totalSlides - slidesPerView);
            } else {
                currentIndex -= slidesPerView;
            }
            updateCarousel();
        }

        function resetAutoScroll() {
            if (interval) {
                clearInterval(interval);
                if (autoScroll) startAutoScroll();
            }
        }

        function startAutoScroll() {
            if (interval) clearInterval(interval);
            interval = setInterval(nextSlide, 5000);
        }

        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoScroll(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoScroll(); });

        window.addEventListener('resize', () => {
            updateCarousel();
            resetAutoScroll();
        });

        // Init
        updateCarousel();
        if (autoScroll) startAutoScroll();

        // pause on hover
        wrapper.addEventListener('mouseenter', () => { if (interval) clearInterval(interval); });
        wrapper.addEventListener('mouseleave', () => { if (autoScroll) startAutoScroll(); });
    }

    // Init both carousels
    initCarousel('featuresCarousel', '.carousel-slide', true);
    initCarousel('testimonialsCarousel', '.testimonial-slide', true);

    // 6. FAQ ACCORDION
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.parentElement;
            const isActive = parent.classList.contains('active');
            // Close others
            document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
            if (!isActive) parent.classList.add('active');
        });
    });

    // 7. LEAD FORM (Home page)
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

    // 8. FLOATING CHAT BADGE
    const chatBadge = document.getElementById('chatBadge');
    if (chatBadge) {
        chatBadge.addEventListener('click', () => {
            alert('Live chat coming soon! For now, please use the contact form or email us at sales@vibevault.com');
        });
    }

});
