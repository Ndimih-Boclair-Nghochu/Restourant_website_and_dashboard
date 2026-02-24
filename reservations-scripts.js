/* ==================== RESERVATIONS PAGE SCRIPT ==================== */

// Initialize demo reservation plans (only if not already present)
function initializeDemoReservationPlans() {
    let restaurantData = JSON.parse(localStorage.getItem('restaurantData') || '{}');
    
    // Only initialize if plans don't exist
    if (!restaurantData.reservationPlans || restaurantData.reservationPlans.length === 0) {
        restaurantData.reservationPlans = [
            {
                id: 'plan-1',
                name: 'Basic Dining',
                icon: '🍽️',
                budget: 50000,
                color: '#4CAF50',
                description: 'Perfect for a casual dining experience with essential services',
                features: [
                    'Standard table reservation',
                    'Menu of the day',
                    'Complimentary water',
                    'Free Wi-Fi access',
                    'Standard seating area'
                ]
            },
            {
                id: 'plan-2',
                name: 'Premium Experience',
                icon: '⭐',
                budget: 150000,
                color: '#FF9800',
                description: 'Enhanced dining with premium services and exclusive benefits',
                features: [
                    'Priority table reservation',
                    'Full menu access with chef recommendations',
                    'Complimentary welcome drink',
                    'Premium seating area',
                    'Dedicated waiter service',
                    'Background music selection',
                    'Free parking'
                ]
            },
            {
                id: 'plan-3',
                name: 'VIP Celebration',
                icon: '👑',
                budget: 300000,
                color: '#9C27B0',
                description: 'Ultimate luxury dining for special occasions and celebrations',
                features: [
                    'Private VIP room reservation',
                    'Personalized multi-course tasting menu',
                    'Premium wine pairing',
                    'Personal sommelier and chef consultation',
                    'Custom table decoration',
                    'Live music or DJ arrangement',
                    'Professional photography service',
                    'Valet parking',
                    'Complimentary anniversary cake or gift'
                ]
            },
            {
                id: 'plan-4',
                name: 'Corporate Event',
                icon: '💼',
                budget: 500000,
                color: '#2196F3',
                description: 'Professional setup for business dinners and corporate gatherings',
                features: [
                    'Private dining hall for up to 30 guests',
                    'Customized menu for corporate preferences',
                    'Presentation equipment (projector, screen, microphones)',
                    'Conference setup with WiFi',
                    'Dedicated event coordinator',
                    'Coffee and refreshments service',
                    'Complimentary business center access',
                    'Free parking for all attendees',
                    'Post-event cocktail hour option'
                ]
            },
            {
                id: 'plan-5',
                name: 'Wedding Reception',
                icon: '💒',
                budget: 1000000,
                color: '#E91E63',
                description: 'Exclusive full-venue wedding package with complete services',
                features: [
                    'Full restaurant venue exclusive booking',
                    'Customized wedding menu for up to 50 guests',
                    'Professional wedding decoration',
                    'Bridal suite preparation room',
                    'Live band or DJ with sound system',
                    'Wedding cake and champagne tower',
                    'Professional photography and videography',
                    'Event planner and coordination team',
                    'Valet parking service',
                    'Complimentary honeymoon suite or gift voucher'
                ]
            },
            {
                id: 'plan-6',
                name: 'Family Gathering',
                icon: '👨‍👩‍👧‍👦',
                budget: 120000,
                color: '#00BCD4',
                description: 'Comfortable family dining with kid-friendly options',
                features: [
                    'Large family table or private section',
                    'Family-style sharing menu',
                    'Kids menu and play area access',
                    'High chairs and booster seats available',
                    'Complimentary fruit platter',
                    'Family photo service',
                    'Free parking',
                    'Takeaway containers for leftovers'
                ]
            }
        ];
        
        localStorage.setItem('restaurantData', JSON.stringify(restaurantData));
        console.log('✅ Demo reservation plans initialized successfully!');
    }
}

// Initialize demo reservations (sample bookings)
function initializeDemoReservations() {
    let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    
    // Only initialize if no reservations exist
    if (reservations.length === 0) {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(now);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        reservations = [
            {
                id: 'RES-1738000001',
                name: 'Sarah Johnson',
                email: 'sarah.j@email.com',
                phone: '+1 (555) 234-5678',
                guests: '4',
                date: tomorrow.toISOString().split('T')[0],
                time: '19:00',
                message: 'Celebrating our anniversary! Would love a window seat.',
                plan: {
                    id: 'plan-2',
                    name: 'Premium Experience',
                    icon: '⭐',
                    budget: 150000,
                    color: '#FF9800'
                },
                status: 'confirmed',
                timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'RES-1738000002',
                name: 'Michael Chen',
                email: 'mchen@company.com',
                phone: '+1 (555) 345-6789',
                guests: '8',
                date: nextWeek.toISOString().split('T')[0],
                time: '18:30',
                message: 'Corporate dinner with clients. Need privacy and AV equipment.',
                plan: {
                    id: 'plan-4',
                    name: 'Corporate Event',
                    icon: '💼',
                    budget: 500000,
                    color: '#2196F3'
                },
                status: 'pending',
                timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'RES-1738000003',
                name: 'Emily & David Martinez',
                email: 'martinez.wedding@email.com',
                phone: '+1 (555) 456-7890',
                guests: '8',
                date: '2026-02-14',
                time: '20:00',
                message: 'Special proposal! Need help with ring presentation.',
                plan: {
                    id: 'plan-3',
                    name: 'VIP Celebration',
                    icon: '👑',
                    budget: 300000,
                    color: '#9C27B0'
                },
                status: 'confirmed',
                timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'RES-1738000004',
                name: 'The Thompson Family',
                email: 'thompson.family@email.com',
                phone: '+1 (555) 567-8901',
                guests: '6',
                date: tomorrow.toISOString().split('T')[0],
                time: '17:30',
                message: 'Birthday party for our 8-year-old. Need kids menu.',
                plan: {
                    id: 'plan-6',
                    name: 'Family Gathering',
                    icon: '👨‍👩‍👧‍👦',
                    budget: 120000,
                    color: '#00BCD4'
                },
                status: 'confirmed',
                timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 'RES-1738000005',
                name: 'Robert Williams',
                email: 'rwilliams@email.com',
                phone: '+1 (555) 678-9012',
                guests: '2',
                date: now.toISOString().split('T')[0],
                time: '20:30',
                message: 'Just a quiet dinner for two.',
                plan: {
                    id: 'plan-1',
                    name: 'Basic Dining',
                    icon: '🍽️',
                    budget: 50000,
                    color: '#4CAF50'
                },
                status: 'confirmed',
                timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        
        localStorage.setItem('reservations', JSON.stringify(reservations));
        console.log('✅ Demo reservations initialized successfully! Total:', reservations.length);
    }
}

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
    // Initialize demo plans and reservations first
    initializeDemoReservationPlans();
    initializeDemoReservations();
    
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
