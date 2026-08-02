// 1. Mobile & Touch Dropdown Open Handler
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Toggle dropdown for touch/click
            dropdown.classList.toggle('active');
        });
    }
});

// Close dropdown if user clicks anywhere outside
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
});

// 2. Dynamic Date Auto-Update for IT Advisory
const currentDateElem = document.getElementById('current-date');
if (currentDateElem) {
    const today = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    currentDateElem.textContent = today.toLocaleDateString('en-US', options);
}

// 3. Mobile Navigation Hamburger Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a:not(.dropdown-btn)').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 4. Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 5. Web3Forms Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');

        const botCheck = form.querySelector('input[name="botcheck"]');
        if (botCheck && botCheck.checked) {
            return;
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
