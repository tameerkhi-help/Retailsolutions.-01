// 1. Mobile Menu Open/Close
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 2. Smooth Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Jab screen par element aaye tou ud kar samne aaye
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

// 3. FAQ Accordion Logic
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.icon');
        
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.textContent = '+';
        } else {
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
            document.querySelectorAll('.accordion-header .icon').forEach(i => i.textContent = '+');
            content.style.maxHeight = content.scrollHeight + "px";
            icon.textContent = '-';
        }
    });
});

// 4. FIREBASE Ready Contact Form Logic
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        // Form Data Variables (Firebase ke liye)
        const fName = document.getElementById('firstName').value;
        const lName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const stores = document.getElementById('stores').value;
        const msg = document.getElementById('message').value;

        // Note: Yahan aap firebase config daal kar direct form submit karwa saktay hain.
        // Example: await addDoc(collection(db, "inquiries"), { fName, lName, email, phone, stores, msg });

        // Success Notification Display
        formMessage.innerHTML = "<div style='background: #dcfce7; color: #166534; padding: 20px; border-radius: 12px; font-weight: bold; margin-top: 25px; font-size: 20px; text-align: center; border: 1px solid #bbf7d0;'>Successfully Submitted! Our team will contact you soon.</div>";
        
        contactForm.reset();
        
        setTimeout(() => { 
            formMessage.innerHTML = ""; 
        }, 5000);
    });
}
