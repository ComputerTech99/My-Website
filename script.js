// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
// Toggle search bar visibility
document.getElementById('search-icon').addEventListener('click', function() {
    document.getElementById('search-bar').style.display = 'block';
});

function closeSearch() {
    document.getElementById('search-bar').style.display = 'none';
}

// Toggle the visibility of the Updates section
function toggleUpdates() {
    const updatesSection = document.getElementById('updates');
    updatesSection.classList.toggle('show');
}