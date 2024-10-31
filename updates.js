// Get elements
const subscribeBtn = document.querySelector('.subscribe-btn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const subscribeForm = document.getElementById('subscribe-form');

// Open modal when subscribe button is clicked
subscribeBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal when close button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission
subscribeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;

    // Simple email validation (you can enhance this)
    if (email) {
        alert(`Thank you for subscribing with ${email}!`);
        modal.style.display = 'none';
        subscribeForm.reset();
    } else {
        alert('Please enter a valid email address.');
    }
});