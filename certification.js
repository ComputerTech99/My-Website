// Handle Download Button Click
const downloadButtons = document.querySelectorAll('.download-btn');

downloadButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filePath = button.getAttribute('data-file');
        // Redirect to the file path to initiate download
        window.location.href = filePath;
    });
});