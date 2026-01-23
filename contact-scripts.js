/* ==================== CONTACT PAGE SCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: this.querySelector('input[placeholder="Your Name"]').value,
                email: this.querySelector('input[placeholder="Your Email"]').value,
                subject: this.querySelector('input[placeholder="Subject"]').value,
                message: this.querySelector('textarea').value
            };

            // Save to localStorage
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push({...formData, timestamp: new Date().toISOString()});
            localStorage.setItem('contactMessages', JSON.stringify(messages));

            alert('Thank you! Your message has been sent. We will respond shortly.');
            this.reset();
        });
    }
});
