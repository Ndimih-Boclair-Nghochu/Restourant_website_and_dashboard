/* ==================== RESERVATIONS PAGE SCRIPT ==================== */

// Load reservation plans
function loadReservationPlans() {
    const restaurantData = JSON.parse(localStorage.getItem('restaurantData') || '{}');
    const plans = restaurantData.reservationPlans || [];
    
    const planSelect = document.getElementById('reservation-plan-select');
    if (!planSelect) return;
    
    // Clear existing options except the first one
    planSelect.innerHTML = '<option value="">Select a plan</option>';
    
    // Add plans as options
    plans.forEach(plan => {
        const option = document.createElement('option');
        option.value = plan.id;
        option.textContent = `${plan.icon} ${plan.name} - ${plan.budget.toLocaleString()} FCFA`;
        option.dataset.plan = JSON.stringify(plan);
        planSelect.appendChild(option);
    });
    
    // Add change event listener to show plan details
    planSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const planDetails = document.getElementById('plan-details');
        
        if (this.value && selectedOption.dataset.plan) {
            const plan = JSON.parse(selectedOption.dataset.plan);
            planDetails.style.display = 'block';
            planDetails.innerHTML = `
                <div class="plan-preview" style="border-left: 4px solid ${plan.color}">
                    <h4>${plan.icon} ${plan.name}</h4>
                    <p class="plan-budget-display">${plan.budget.toLocaleString()} FCFA</p>
                    <p class="plan-desc">${plan.description}</p>
                    <div class="plan-features-list">
                        <strong>Included:</strong>
                        <ul>
                            ${plan.features.map(f => `<li>✓ ${f}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        } else {
            planDetails.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');

    // Load plans when page loads
    loadReservationPlans();

    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const planSelect = document.getElementById('reservation-plan-select');
            const selectedOption = planSelect.options[planSelect.selectedIndex];
            let selectedPlan = null;
            
            if (planSelect.value && selectedOption.dataset.plan) {
                selectedPlan = JSON.parse(selectedOption.dataset.plan);
            }

            const formData = {
                id: 'RES-' + Date.now(),
                name: this.querySelector('input[placeholder="Enter your full name"]').value || this.querySelector('input[placeholder="Full Name"]').value,
                email: this.querySelector('input[placeholder="your@email.com"]').value || this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[placeholder="+1 (555) 123-4567"]').value || this.querySelector('input[type="tel"]').value,
                guests: this.querySelector('select').value,
                date: this.querySelector('input[type="date"]').value,
                time: this.querySelectorAll('select')[1].value,
                message: this.querySelector('textarea').value,
                plan: selectedPlan,
                status: 'pending',
                timestamp: new Date().toISOString()
            };

            // Save to localStorage
            const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
            reservations.push(formData);
            localStorage.setItem('reservations', JSON.stringify(reservations));

            alert(`Reservation confirmed!\n\nReservation ID: ${formData.id}\nPlan: ${selectedPlan ? selectedPlan.name : 'No plan selected'}\nBudget: ${selectedPlan ? selectedPlan.budget.toLocaleString() + ' FCFA' : 'N/A'}\n\nWe will contact you shortly.`);
            this.reset();
            document.getElementById('plan-details').style.display = 'none';
        });
    }
});
