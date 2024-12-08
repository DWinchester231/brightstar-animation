document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            try {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                formMessage.className = 'form-message';
                formMessage.textContent = 'Sending your message...';

                // Send form data to server
                const response = await fetch('https://your-render-deployment-url.onrender.com/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    // Show success message
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                    contactForm.reset();
                } else {
                    // Show error message
                    formMessage.className = 'form-message error';
                    formMessage.textContent = result.error || 'Failed to send message. Please try again.';
                    console.error('Server error:', result);
                }
            } catch (error) {
                // Show error message
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Failed to connect to the server. Please check your internet connection and try again.';
                console.error('Network error:', error);
            } finally {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Scroll-based animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.portfolio-item, .service-card').forEach(el => {
        observer.observe(el);
    });
});
