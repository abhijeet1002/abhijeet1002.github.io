// 1. Mobile Navigation Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu on clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 3. Web3Forms Handling & Security Sanitization
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');

        // Simple Anti-Spam Check (Honeypot field)
        const botCheck = form.querySelector('input[name="botcheck"]');
        if (botCheck && botCheck.checked) {
            return; // Spam bot trapped
        }

        const data = new FormData(form);

        const originalBtnText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            const result = await response.json();

            if (response.status === 200) {
                alert('Thank you, Abhijeet! Your message has been sent successfully.');
                form.reset();
            } else {
                alert(result.message || 'Oops! Something went wrong.');
            }
        } catch (error) {
            alert('Network error. Please try again later.');
        } finally {
            submitButton.textContent = originalBtnText;
            submitButton.disabled = false;
        }
    });
}
