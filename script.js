// ==========================================
// MASTER JAVASCRIPT - RETAILSOLUTIONS
// ==========================================

// 1. Mobile Menu Open/Close Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // Menu toggle logic - Menu ko open/close karta hai
        navLinks.classList.toggle('active');
    });
}

// 2. Smooth Scroll Animations using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Jab element screen par 10% aaye, tab ud kar fade-in ho
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate only once
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Ek baar animate ho tou dobara na ho
        }
    });
}, observerOptions);

// Saare segments jismein 'scroll-anim' class hai unhein observe karein
document.querySelectorAll('.scroll-anim').forEach(element => {
    observer.observe(element);
});

// 3. FAQ Accordion Logic
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.icon');
        
        // Agar pehle se khula hai tou band karo
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.textContent = '+';
        } else {
            // Close all other accordion items
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
            document.querySelectorAll('.accordion-header .icon').forEach(i => i.textContent = '+');
            
            // Open the clicked item
            content.style.maxHeight = content.scrollHeight + "px";
            icon.textContent = '-';
        }
    });
});

// 4. FIREBASE Connection logic & Stylized Form handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Page reload ko roko
        e.preventDefault(); 
        
        // Data get karo lead form se
        const fName = document.getElementById('firstName').value;
        const lName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const stores = document.getElementById('stores').value;
        const posSystem = document.getElementById('pos').value;
        const msg = document.getElementById('message').value;

        // ----------------------------------------------------------------------------------
        // TAWWAJA FARMAYEIN (FIREBASE SETUP):
        // Jab aap Firebase connect karain, tou niche diye gaye comments ko hata kar
        // apna proper firebase code dalein taake form direct main database mein chala jaye.
        // ----------------------------------------------------------------------------------
        
        /* try {
            // FIREBASE CODE HERE (Example using collection):
            // const db = firebase.firestore();
            // await db.collection("leads").add({
            //    fName: fName, lName: lName, email: email, phone: phone, 
            //    stores: stores, pos: posSystem, message: msg, timestamp: firebase.firestore.FieldValue.serverTimestamp()
            // });
            // console.log("Success: Submitted to Firebase");
            // Main success logic niche chalegi...
        } catch (error) {
            formMessage.innerHTML = "<div style='background: #fee2e2; color: #991b1b; padding: 20px; border-radius: 12px; font-weight: bold; margin-top: 25px;'>Firebase Error. Lead not sent.</div>";
            console.error("Error adding doc: ", error);
            return; // Stop here
        } */

        // -- ABHI KE LIYE (Design Success Logic) --
        // Form ko success design par switch karein lead message box par
        formMessage.innerHTML = "<div style='background: #dcfce7; color: #166534; padding: 20px; border-radius: 12px; font-weight: bold; margin-top: 25px; font-size: 20px; text-align: center; border: 1px solid #bbf7d0;'>Thanks John! Your audit request is securely submitted. We'll contact you shortly.</div>";
        
        // Form field ko clear kar do submit ke baad
        contactForm.reset();
        
        // 6 second baad message hata do
        setTimeout(() => { 
            formMessage.innerHTML = ""; 
        }, 6000);
    });
}
