/* ==================== FLOATING HELP WIDGET FUNCTIONALITY ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Create and inject the floating widget HTML
    const floatingWidget = document.createElement('div');
    floatingWidget.innerHTML = `
        <!-- Floating Help Widget -->
        <div class="floating-help-wrapper">
            <button class="floating-help-btn" id="helpBtn" title="Send us your feedback" aria-label="Help and feedback">
                <span>💬</span>
                <div class="floating-help-badge" id="helpBadge">1</div>
            </button>

            <!-- Help Modal Overlay -->
            <div class="help-modal-overlay" id="helpOverlay"></div>

            <!-- Help Modal -->
            <div class="help-modal" id="helpModal">
                <div class="help-modal-header">
                    <h3>Customer Feedback</h3>
                    <button class="help-modal-close" id="closeHelpBtn" aria-label="Close feedback form">×</button>
                </div>

                <div class="help-modal-content">
                    <div class="help-alert help-alert-info" id="helpInfo">
                        We value your feedback. Share any concerns and our team will respond within 24-48 hours.
                    </div>

                    <form id="helpForm">
                        <div class="help-form-group">
                            <label for="helpName">Name <span class="help-required">*</span></label>
                            <input type="text" id="helpName" name="name" required placeholder="Your name">
                        </div>

                        <div class="help-form-group">
                            <label for="helpEmail">Email <span class="help-required">*</span></label>
                            <input type="email" id="helpEmail" name="email" required placeholder="your@email.com">
                        </div>

                        <div class="help-form-group">
                            <label for="helpCategory">Category <span class="help-required">*</span></label>
                            <select id="helpCategory" name="category" required>
                                <option value="">— Select a category —</option>
                                <option value="food-quality">Food Quality</option>
                                <option value="service">Service</option>
                                <option value="billing">Billing</option>
                                <option value="reservation">Reservation</option>
                                <option value="delivery">Delivery</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div class="help-form-group">
                            <label>Urgency <span class="help-required">*</span></label>
                            <div class="help-priority-selector">
                                <button type="button" class="help-priority-btn active" data-priority="standard">Standard</button>
                                <button type="button" class="help-priority-btn" data-priority="high">High</button>
                            </div>
                            <input type="hidden" id="helpPriority" name="priority" value="standard">
                        </div>

                        <div class="help-form-group">
                            <label for="helpMessage">Your Feedback <span class="help-required">*</span></label>
                            <textarea id="helpMessage" name="message" required placeholder="Tell us about your experience..."></textarea>
                        </div>
                    </form>

                    <div class="help-alert" id="helpSuccess"></div>
                    <div class="help-alert" id="helpError"></div>
                </div>

                <div class="help-modal-footer">
                    <button class="help-submit-btn" id="helpSubmitBtn">Send Feedback</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(floatingWidget);

    // Get elements
    const helpBtn = document.getElementById('helpBtn');
    const closeHelpBtn = document.getElementById('closeHelpBtn');
    const helpModal = document.getElementById('helpModal');
    const helpOverlay = document.getElementById('helpOverlay');
    const helpForm = document.getElementById('helpForm');
    const helpSubmitBtn = document.getElementById('helpSubmitBtn');
    const helpSuccessMsg = document.getElementById('helpSuccess');
    const helpErrorMsg = document.getElementById('helpError');
    const priorityBtns = document.querySelectorAll('.help-priority-btn');
    const helpBadge = document.getElementById('helpBadge');

    // Open modal
    helpBtn.addEventListener('click', function(e) {
        e.preventDefault();
        helpModal.classList.add('active');
        helpOverlay.classList.add('active');
        document.getElementById('helpName').focus();
        helpBadge.style.display = 'none';
    });

    // Close modal
    function closeModal() {
        helpModal.classList.remove('active');
        helpOverlay.classList.remove('active');
    }

    closeHelpBtn.addEventListener('click', closeModal);
    helpOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && helpModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Priority button selection
    priorityBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            priorityBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('helpPriority').value = this.dataset.priority;
        });
    });

    // Form submission
    helpSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('helpName').value.trim();
        const email = document.getElementById('helpEmail').value.trim();
        const category = document.getElementById('helpCategory').value;
        const priority = document.getElementById('helpPriority').value;
        const message = document.getElementById('helpMessage').value.trim();

        // Validation
        if (!name || !email || !category || !message) {
            showError('Please fill in all required fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address.');
            return;
        }

        // Create complaint object
        const complaint = {
            id: 'COMPLAINT-' + Date.now(),
            name: name,
            email: email,
            phone: '',
            complaintType: category,
            priority: priority,
            subject: 'Feedback from ' + name,
            message: message,
            orderId: '',
            createdAt: new Date().toISOString(),
            status: 'pending',
            resolved: false
        };

        // Save to localStorage
        try {
            let complaints = JSON.parse(localStorage.getItem('customerComplaints') || '[]');
            complaints.push(complaint);
            localStorage.setItem('customerComplaints', JSON.stringify(complaints));
            console.log('Complaint saved successfully:', complaint);
            console.log('Total complaints in storage:', complaints.length);
        } catch (e) {
            console.error('Error saving complaint:', e);
            showError('Error saving complaint. Please try again.');
            return;
        }

        // Show success
        showSuccess('Thank you! Your feedback has been received. Our team will review it shortly.');

        // Reset form
        helpForm.reset();
        priorityBtns[0].classList.add('active');
        priorityBtns[1].classList.remove('active');
        document.getElementById('helpPriority').value = 'standard';

        // Close after delay
        setTimeout(() => {
            closeModal();
            helpForm.reset();
        }, 2000);
    });

    function showSuccess(message) {
        helpSuccessMsg.textContent = '✓ ' + message;
        helpSuccessMsg.classList.add('success');
        helpErrorMsg.classList.remove('error');
        helpErrorMsg.textContent = '';
    }

    function showError(message) {
        helpErrorMsg.textContent = message;
        helpErrorMsg.classList.add('error');
        helpSuccessMsg.classList.remove('success');
        helpSuccessMsg.textContent = '';
    }
});
