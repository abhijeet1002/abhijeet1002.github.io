// 1. Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 2. AJAX Formspree Handling (Without Page Reload)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Page reload hone se rokta hai

        const form = e.target;
        const data = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');

        // Button text update for feedback
        const originalBtnText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Thank you, Abhijeet! Your message has been sent successfully.');
                form.reset(); // Form fields ko blank kar dega
            } else {
                alert('Oops! There was a problem submitting your form. Please check your Formspree URL.');
            }
        } catch (error) {
            alert('Oops! Network error. Please try again later.');
        } finally {
            submitButton.textContent = originalBtnText;
            submitButton.disabled = false;
        }
    });
}