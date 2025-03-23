document.addEventListener('DOMContentLoaded', () => {
    // Function to validate captcha before submission
    function isCaptchaValidated(formElement) {
        // Check if the form has hCaptcha
        const hcaptchaContainer = formElement.querySelector('.h-captcha');
        if (!hcaptchaContainer) return true; // If no captcha present, consider it validated
        
        // Get the response token
        const hcaptchaResponse = hcaptcha.getResponse(
            hcaptchaContainer.getAttribute('data-widget-id')
        );
        
        return hcaptchaResponse && hcaptchaResponse.length > 0;
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Show loading state
            submitButton.classList.add('loading');
            
            // Clear previous status messages
            formStatus.textContent = '';
            formStatus.classList.remove('success', 'error');
            
            // Check if using Formspree (when action attribute contains formspree.io)
            const isUsingFormspree = contactForm.action.includes('formspree.io');
            
            if (!isUsingFormspree) {
                // If not using Formspree, prevent default and show error
                event.preventDefault();
                formStatus.textContent = 'Please set up Formspree first (see instructions in code).';
                formStatus.classList.add('error');
                submitButton.classList.remove('loading');
                return;
            }
            
            // Check if captcha is validated (if present)
            if (!isCaptchaValidated(contactForm)) {
                event.preventDefault();
                formStatus.textContent = 'Please complete the captcha verification.';
                formStatus.classList.add('error');
                submitButton.classList.remove('loading');
                return;
            }
            
            // For Formspree forms, we'll let it submit naturally but handle the response
            // This event will only run if form validation passes
            
            // We'll set up an AJAX request for a better UX
            event.preventDefault();
            
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Success message
                formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                formStatus.classList.add('success');
                
                // Reset the form
                contactForm.reset();
            })
            .catch(error => {
                // Error message
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
                formStatus.classList.add('error');
                console.error('Error:', error);
            })
            .finally(() => {
                // Remove loading state
                submitButton.classList.remove('loading');
            });
        });
    }

    // Subscribe form handling
    const subscribeForm = document.getElementById('subscribe-form');
    const subscribeStatus = document.getElementById('subscribe-status');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Check if using Formspree
            const isUsingFormspree = subscribeForm.action.includes('formspree.io');
            
            if (!isUsingFormspree) {
                subscribeStatus.textContent = 'Please set up Formspree first (see instructions in code).';
                subscribeStatus.classList.add('error');
                return;
            }
            
            // Check if captcha is validated (if present)
            if (!isCaptchaValidated(subscribeForm)) {
                event.preventDefault();
                subscribeStatus.textContent = 'Please complete the captcha verification.';
                subscribeStatus.classList.add('error');
                return;
            }
            
            const formData = new FormData(subscribeForm);
            
            fetch(subscribeForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Success message
                subscribeStatus.textContent = 'Thank you for subscribing!';
                subscribeStatus.classList.add('success');
                
                // Reset the form
                subscribeForm.reset();
            })
            .catch(error => {
                // Error message
                subscribeStatus.textContent = 'Oops! There was a problem. Please try again.';
                subscribeStatus.classList.add('error');
                console.error('Error:', error);
            });
        });
    }

    // Modal functionality
    const modal = document.getElementById('modal');
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const closeBtn = document.querySelector('.close-btn');

    if (modal && subscribeBtn && closeBtn) {
        subscribeBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });

        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
});