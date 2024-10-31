document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Simple form validation
    if (name === '' || email === '' || message === '') {
        alert('Please fill out all fields.');
        return;
    }

    // Perform AJAX request or any other desired action
    // For demonstration, we'll just display an alert

    alert('Thank you for your message. I will get back to you soon.');

    // Reset the form
    document.getElementById('contact-form').reset();
});
// JavaScript to handle modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const closeBtn = document.querySelector('.close-btn');

    subscribeBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});