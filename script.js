// 1. Mobile Menu Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 2. Smooth Scroll Animation Logic
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12 // Element jab thoda sa screen par aaye tab animate ho
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

// 3. Firebase Form Submission Setup
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Page reload ko roko
        
        // Data get karo (Jab aap Firebase add karain, tou ye data database mein jayega)
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const stores = document.getElementById('stores').value;

        // Yahan aap apna Firebase Realtime Database ya Firestore ka code lagayenge
        // Example: await addDoc(collection(db, "contacts"), { name, email, stores });

        // Success Message (Design)
        formMessage.innerHTML = "<div style='background: #dcfce7; color: #166534; padding: 15px; border-radius: 8px; font-weight: bold; margin-top: 20px; font-size: 18px;'>Thank you! Your information has been securely submitted.</div>";
        
        contactForm.reset();
        
        // 5 second baad message ghaib ho jayega
        setTimeout(() => { 
            formMessage.innerHTML = ""; 
        }, 5000);
    });
}
