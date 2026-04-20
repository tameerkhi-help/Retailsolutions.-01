// 1. Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 2. Scroll Animations (Intersection Observer)
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

document.querySelectorAll('.scroll-anim').forEach(element => {
    observer.observe(element);
});

// 3. Contact Form Submission (Firebase Ready)
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Future Firebase Code Yahan Aayega
        
        formMessage.innerHTML = "<span style='color: #0d4b9f; font-weight: bold;'>Thank you! Your details have been submitted.</span>";
        contactForm.reset();
        
        setTimeout(() => { 
            formMessage.innerHTML = ""; 
        }, 4000);
    });
}
