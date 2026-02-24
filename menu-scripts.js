/* ==================== MENU PAGE SCRIPT ==================== */

// Order flow state
let currentOrder = {
    food: null,
    drink: null,
    tableNumber: null,
    isOnSite: true,
    totalAmount: 0,
    deliveryAddress: null,
    specialRecommendations: ''
};

// Load menu data from localStorage or use defaults
function getMenuData() {
    const restaurantData = JSON.parse(localStorage.getItem('restaurantData') || '{}');
    const menuItems = restaurantData.menuItems || [];
    
    // Organize by category
    const menuData = {
        appetizers: [],
        mains: [],
        desserts: [],
        beverages: [],
    };
    
    menuItems.forEach(item => {
        const category = item.category.toLowerCase();
        if (category === 'appetizer') {
            menuData.appetizers.push(item);
        } else if (category === 'main') {
            menuData.mains.push(item);
        } else if (category === 'dessert') {
            menuData.desserts.push(item);
        } else if (category === 'beverage') {
            menuData.beverages.push(item);
        }
    });
    
    // If no items in localStorage, use default menu data
    if (menuItems.length === 0) {
        return {
            appetizers: [
                { id: 1, name: 'Foie Gras Terrine', description: 'Elegant foie gras with brioche and seasonal fruit compote', price: 28000, category: 'appetizer', emoji: '🥘', priceDisplay: '28,000 FCFA', image: 'https://images.unsplash.com/photo-1476124369162-f4978dea5f00?w=500&h=400&fit=crop' },
                { id: 2, name: 'Oyster Selection', description: 'Fresh oysters from local suppliers, served with champagne mignonette', price: 24000, category: 'appetizer', emoji: '🦪', priceDisplay: '24,000 FCFA', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=400&fit=crop' },
                { id: 3, name: 'Smoked Salmon', description: 'House-smoked salmon with caviar and crème fraîche', price: 26000, category: 'appetizer', emoji: '🐟', priceDisplay: '26,000 FCFA', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop' }
            ],
            mains: [
                { id: 4, name: 'Pan-Seared Beef Tenderloin', description: 'Premium aged beef with béarnaise sauce and seasonal vegetables', price: 52000, category: 'main', emoji: '🥩', priceDisplay: '52,000 FCFA', image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&h=400&fit=crop' },
                { id: 5, name: 'Lobster Thermidor', description: 'Classic preparation with champagne cream and truffle', price: 58000, category: 'main', emoji: '🦞', priceDisplay: '58,000 FCFA', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=400&fit=crop' },
                { id: 6, name: 'Dover Sole Meunière', description: 'Delicate flatfish with brown butter and lemon', price: 48000, category: 'main', emoji: '🐟', priceDisplay: '48,000 FCFA', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop' }
            ],
            desserts: [
                { id: 7, name: 'Chocolate Soufflé', description: 'Warm chocolate soufflé with vanilla ice cream', price: 14000, category: 'dessert', emoji: '🍰', priceDisplay: '14,000 FCFA', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop' },
                { id: 8, name: 'Crème Brûlée', description: 'Classic French dessert with Madagascar vanilla', price: 12000, category: 'dessert', emoji: '🍮', priceDisplay: '12,000 FCFA', image: 'https://images.unsplash.com/photo-1470521598519-e21cc028cb29?w=500&h=400&fit=crop' },
                { id: 9, name: 'Lemon Tart', description: 'Artisanal lemon tart with Italian meringue', price: 13000, category: 'dessert', emoji: '🍋', priceDisplay: '13,000 FCFA', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=400&fit=crop' }
            ],
            beverages: [
                { id: 10, name: 'Premium Wine Selection', description: 'Carefully curated wines from renowned vineyards', price: 25000, category: 'beverage', emoji: '🍷', priceDisplay: '25,000 FCFA', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=400&fit=crop' },
                { id: 11, name: 'Signature Cocktail', description: 'Handcrafted cocktails by our master mixologist', price: 18000, category: 'beverage', emoji: '🍹', priceDisplay: '18,000 FCFA', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=400&fit=crop' },
                { id: 12, name: 'Fresh Juice', description: 'Seasonal fresh squeezed juice', price: 8000, category: 'beverage', emoji: '🥤', priceDisplay: '8,000 FCFA', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=400&fit=crop' },
                { id: 13, name: 'Espresso', description: 'Premium Italian espresso shot', price: 4000, category: 'beverage', emoji: '☕', priceDisplay: '4,000 FCFA', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=400&fit=crop' },
                { id: 14, name: 'Mineral Water', description: 'Imported mineral water', price: 5000, category: 'beverage', emoji: '💧', priceDisplay: '5,000 FCFA', image: 'https://images.unsplash.com/photo-1523677745891-6f3031224c94?w=500&h=400&fit=crop' }
            ]
        };
    }
    
    return menuData;
}

function renderMenuItems(category = 'all', gridId = 'menuGrid') {
    const menuData = getMenuData();
    const menuGrid = document.getElementById(gridId);
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';

    let itemsToDisplay = [];
    if (category === 'all') {
        Object.values(menuData).forEach(items => {
            if (Array.isArray(items)) itemsToDisplay.push(...items);
        });
        // Remove duplicates
        itemsToDisplay = Array.from(new Set(itemsToDisplay.map(item => item.id))).map(id => 
            itemsToDisplay.find(item => item.id === id)
        );
    } else {
        const categoryMap = {
            appetizers: ['appetizers'],
            mains: ['mains'],
            desserts: ['desserts'],
            beverages: ['beverages']
        };
        const categories = categoryMap[category] || [category];
        categories.forEach(cat => {
            if (menuData[cat]) itemsToDisplay.push(...menuData[cat]);
        });
    }

    // Limit to 9 items (3 rows) for home page
    if (gridId === 'homeMenuGrid') {
        itemsToDisplay = itemsToDisplay.slice(0, 9);
    }

    itemsToDisplay.forEach(item => {
        const foodCategory = item.category || 'unknown';
        const priceDisplay = typeof item.price === 'number' ? item.price.toLocaleString() + ' FCFA' : item.priceDisplay;
        const image = item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy">` : `<div style="display: flex; align-items: center; justify-content: center; height: 200px; background: #f0f0f0; font-size: 64px;">${item.emoji || '🍽️'}</div>`;
        
        const itemHTML = `
            <div class="menu-item">
                <div class="menu-image">
                    ${image}
                </div>
                <div class="menu-content">
                    <span class="category">${foodCategory}</span>
                    <h3>${item.name}</h3>
                    <p class="description">${item.description}</p>
                    <p class="price">${priceDisplay}</p>
                    <button class="btn-add-cart" onclick='startOrderFlow(${JSON.stringify(item)})'>ORDER NOW</button>
                </div>
            </div>
        `;
        menuGrid.innerHTML += itemHTML;
    });
}

// ==================== STEP-BY-STEP ORDER FLOW ====================

// Step 1: Start order with food selection
function startOrderFlow(foodItem) {
    currentOrder.food = foodItem;
    showDrinkSelectionModal();
}

// Step 2: Show drink selection modal
function showDrinkSelectionModal() {
    const menuData = getMenuData();
    const drinks = menuData.beverages;
    
    let drinksHTML = drinks.map(drink => {
        const priceDisplay = typeof drink.price === 'number' ? drink.price.toLocaleString() + ' FCFA' : drink.priceDisplay;
        const image = drink.image ? `<img src="${drink.image}" alt="${drink.name}">` : `<div style="display: flex; align-items: center; justify-content: center; height: 150px; background: #f0f0f0; font-size: 48px;">${drink.emoji || '☕'}</div>`;
        return `
            <div class="drink-option" onclick='selectDrink(${JSON.stringify(drink)})'>
                ${image}
                <h4>${drink.name}</h4>
                <p>${drink.description}</p>
                <span class="price">${priceDisplay}</span>
            </div>
        `;
    }).join('');

    showOrderModal(`
        <div class="order-modal-header">
            <h2>🍷 Complete Your Experience</h2>
            <p>You have selected <strong>${currentOrder.food.name}</strong></p>
            <p class="subtitle">Would you like to add a beverage to complement your meal?</p>
        </div>
        <div class="drinks-grid">
            ${drinksHTML}
        </div>
        <div class="modal-actions">
            <button class="btn-secondary" onclick="skipDrink()">Skip Beverage</button>
        </div>
    `, 'drink-selection');
}

// Step 3: Select drink or skip
function selectDrink(drinkItem) {
    currentOrder.drink = drinkItem;
    showTableSelectionModal();
}

function skipDrink() {
    currentOrder.drink = null;
    showTableSelectionModal();
}

// Step 4: Show table selection modal
function showTableSelectionModal() {
    showOrderModal(`
        <div class="order-modal-header">
            <h2>📍 Dining Location</h2>
            <p class="subtitle">Please select your table number or choose off-site option</p>
        </div>
        <div class="table-selection">
            <div class="location-option" onclick="selectOnSite()">
                <div class="location-icon">🏛️</div>
                <h3>Dine In</h3>
                <p>Select your table number</p>
            </div>
            <div class="location-option" onclick="selectOffSite()">
                <div class="location-icon">🚗</div>
                <h3>Takeaway</h3>
                <p>Order for pickup</p>
            </div>
            <div class="location-option" onclick="selectDelivery()">
                <div class="location-icon">🚚</div>
                <h3>Delivery</h3>
                <p>Have it delivered to you</p>
            </div>
        </div>
    `, 'table-selection');
}

function selectOnSite() {
    showOrderModal(`
        <div class="order-modal-header">
            <h2>🪑 Select Your Table</h2>
            <p class="subtitle">Please choose your table number</p>
        </div>
        <div class="table-grid">
            ${generateTableNumbers()}
        </div>
        <div class="modal-actions">
            <button class="btn-secondary" onclick="showTableSelectionModal()">← Back</button>
        </div>
    `, 'table-number');
}

function getAvailableTables() {
    // Get tables from admin dashboard
    const restaurantData = JSON.parse(localStorage.getItem('restaurantData') || '{}');
    const tables = restaurantData.tables || [];
    
    // Return only available tables, or all tables if none are available
    const availableTables = tables.filter(table => table.status === 'available');
    return availableTables.length > 0 ? availableTables : tables;
}

function generateTableNumbers() {
    const tables = getAvailableTables();
    
    if (tables.length === 0) {
        return '<div style="padding: 20px; text-align: center; color: #666;">No tables available. Please contact staff.</div>';
    }
    
    let html = '';
    tables.forEach(table => {
        const tableDisplay = table.number || `Table ${table.id}`;
        const tableCapacity = table.capacity ? ` (${table.capacity} seats)` : '';
        const tableType = table.type && table.type !== 'standard' ? ` - ${table.type.toUpperCase()}` : '';
        
        html += `<div class="table-number-option" onclick='confirmTable("${table.number || table.id}", ${table.id})'>
            ${tableDisplay}${tableCapacity}${tableType}
        </div>`;
    });
    return html;
}

function generateTakeawayTableNumbers() {
    const tables = getAvailableTables();
    
    if (tables.length === 0) {
        return '<div style="padding: 20px; text-align: center; color: #666;">No tables available. Please contact staff.</div>';
    }
    
    let html = '';
    tables.forEach(table => {
        const tableDisplay = table.number || `Table ${table.id}`;
        const tableCapacity = table.capacity ? ` (${table.capacity} seats)` : '';
        
        html += `<div class="table-number-option" onclick='confirmTakeawayTable("${table.number || table.id}", ${table.id})'>
            ${tableDisplay}${tableCapacity}
        </div>`;
    });
    return html;
}

function confirmTable(tableNumber, tableId) {
    currentOrder.tableNumber = tableNumber;
    currentOrder.tableId = tableId;
    currentOrder.isOnSite = true;
    currentOrder.deliveryAddress = null;
    showSpecialRecommendations();
}

function confirmTakeawayTable(tableNumber, tableId) {
    currentOrder.tableNumber = tableNumber;
    currentOrder.tableId = tableId;
    currentOrder.isOnSite = false;
    currentOrder.deliveryAddress = null;
    showSpecialRecommendations();
}

function selectOffSite() {
    currentOrder.isOnSite = false;
    currentOrder.deliveryAddress = null;
    showOrderModal(`
        <div class="order-modal-header">
            <h2>🪑 Select Pickup Table</h2>
            <p class="subtitle">Choose a table where you'll wait for your takeaway order</p>
        </div>
        <div class="table-grid">
            ${generateTakeawayTableNumbers()}
        </div>
        <div class="modal-actions">
            <button class="btn-secondary" onclick="showTableSelectionModal()">← Back</button>
        </div>
    `, 'table-number');
}

function selectDelivery() {
    currentOrder.tableNumber = null;
    currentOrder.isOnSite = false;
    showDeliveryAddressForm();
}

function showDeliveryAddressForm() {
    showOrderModal(`
        <div class="order-modal-header">
            <h2>📍 Delivery Address</h2>
            <p class="subtitle">Please provide your delivery address</p>
        </div>
        <div class="address-form">
            <div class="form-group">
                <label>Full Name *</label>
                <input type="text" id="customerName" placeholder="Enter your full name" required>
            </div>
            <div class="form-group">
                <label>Phone Number *</label>
                <input type="tel" id="customerPhone" placeholder="Enter your phone number" required>
            </div>
            <div class="form-group">
                <label>Street Address *</label>
                <input type="text" id="streetAddress" placeholder="Enter street address" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>City *</label>
                    <input type="text" id="city" placeholder="City" required>
                </div>
                <div class="form-group">
                    <label>Postal Code</label>
                    <input type="text" id="postalCode" placeholder="Postal code">
                </div>
            </div>
            <div class="form-group">
                <label>Additional Directions</label>
                <textarea id="directions" placeholder="Landmarks, building details, etc." rows="3"></textarea>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn-secondary" onclick="showTableSelectionModal()">← Back</button>
            <button class="btn-primary" onclick="saveDeliveryAddress()">Continue →</button>
        </div>
    `, 'address-form');
}

function saveDeliveryAddress() {
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const street = document.getElementById('streetAddress').value.trim();
    const city = document.getElementById('city').value.trim();
    const postalCode = document.getElementById('postalCode').value.trim();
    const directions = document.getElementById('directions').value.trim();

    if (!name || !phone || !street || !city) {
        alert('Please fill in all required fields');
        return;
    }

    currentOrder.deliveryAddress = {
        name: name,
        phone: phone,
        street: street,
        city: city,
        postalCode: postalCode,
        directions: directions
    };

    showSpecialRecommendations();
}

function showSpecialRecommendations() {
    showOrderModal(`
        <div class="order-modal-header">
            <h2>📝 Special Recommendations</h2>
            <p class="subtitle">Any special requests or dietary requirements?</p>
        </div>
        <div class="recommendations-form">
            <div class="form-group">
                <label>Your Recommendations (Optional)</label>
                <textarea id="specialRecommendations" placeholder="E.g., No onions, extra spicy, allergies, cooking preferences..." rows="5"></textarea>
            </div>
            <div class="recommendations-examples">
                <p><strong>Examples:</strong></p>
                <ul>
                    <li>No dairy products (lactose intolerant)</li>
                    <li>Extra spicy please</li>
                    <li>Well done steak</li>
                    <li>Separate packaging for items</li>
                    <li>Call upon arrival</li>
                </ul>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn-secondary" onclick="${currentOrder.deliveryAddress ? 'showDeliveryAddressForm()' : 'showTableSelectionModal()'}">← Back</button>
            <button class="btn-primary" onclick="saveSpecialRecommendations()">Continue to Summary →</button>
        </div>
    `, 'recommendations-form');
}

function saveSpecialRecommendations() {
    const recommendations = document.getElementById('specialRecommendations')?.value.trim() || '';
    currentOrder.specialRecommendations = recommendations;
    showOrderSummary();
}

// Step 5: Show order summary
function showOrderSummary() {
    const foodPrice = currentOrder.food.price * 1000; // Convert to FCFA
    const drinkPrice = currentOrder.drink ? currentOrder.drink.price * 1000 : 0;
    const totalPrice = foodPrice + drinkPrice;
    currentOrder.totalAmount = totalPrice;

    let locationText = '';
    if (currentOrder.isOnSite) {
        locationText = `Dine In - Table ${currentOrder.tableNumber}`;
    } else if (currentOrder.deliveryAddress) {
        locationText = 'Delivery';
    } else {
        locationText = `Takeaway - Pickup at Table ${currentOrder.tableNumber}`;
    }

    const drinkSection = currentOrder.drink 
        ? `
            <div class="summary-item">
                <div class="item-details">
                    <h4>🍷 ${currentOrder.drink.name}</h4>
                    <p>${currentOrder.drink.description}</p>
                </div>
                <div class="item-price">${drinkPrice.toLocaleString()} FCFA</div>
            </div>
        ` 
        : '<p class="no-drink">No beverage selected</p>';

    showOrderModal(`
        <div class="order-modal-header">
            <h2>📋 Order Summary</h2>
            <p class="subtitle">Please review your order before proceeding</p>
        </div>
        <div class="order-summary">
            <div class="summary-section">
                <h3>🍽️ Your Selection</h3>
                <div class="summary-item">
                    <div class="item-details">
                        <h4>${currentOrder.food.name}</h4>
                        <p>${currentOrder.food.description}</p>
                    </div>
                    <div class="item-price">${foodPrice.toLocaleString()} FCFA</div>
                </div>
                ${drinkSection}
            </div>
            
            <div class="summary-section">
                <h3>📍 Location</h3>
                <p class="location-info">${locationText}</p>
                ${currentOrder.deliveryAddress ? `
                    <div class="delivery-address-summary">
                        <p><strong>Delivery To:</strong></p>
                        <p>${currentOrder.deliveryAddress.name}</p>
                        <p>${currentOrder.deliveryAddress.phone}</p>
                        <p>${currentOrder.deliveryAddress.street}, ${currentOrder.deliveryAddress.city}</p>
                        ${currentOrder.deliveryAddress.postalCode ? `<p>${currentOrder.deliveryAddress.postalCode}</p>` : ''}
                        ${currentOrder.deliveryAddress.directions ? `<p><em>${currentOrder.deliveryAddress.directions}</em></p>` : ''}
                    </div>
                ` : ''}
            </div>

            ${currentOrder.specialRecommendations ? `
            <div class="summary-section">
                <h3>📝 Special Recommendations</h3>
                <p class="recommendations-text">${currentOrder.specialRecommendations}</p>
            </div>
            ` : ''}

            <div class="summary-total">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toLocaleString()} FCFA</span>
                </div>
                <div class="total-row">
                    <span>Service Charge:</span>
                    <span>0 FCFA</span>
                </div>
                <div class="total-row grand-total">
                    <span>Total Amount:</span>
                    <span>${totalPrice.toLocaleString()} FCFA</span>
                </div>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn-secondary" onclick="closeOrderModal()">← Back to Menu</button>
            <button class="btn-primary" onclick="showPaymentOptions()">Proceed to Payment →</button>
        </div>
    `, 'order-summary');
}

// Step 6: Show payment options
function showPaymentOptions() {
    let paymentText = 'service';
    if (currentOrder.deliveryAddress) {
        paymentText = 'delivery';
    } else if (!currentOrder.isOnSite) {
        paymentText = 'pickup';
    }
    
    showOrderModal(`
        <div class="order-modal-header">
            <h2>💳 Payment Method</h2>
            <p class="subtitle">Choose your preferred payment method</p>
        </div>
        <div class="payment-options">
            <div class="payment-option" onclick="selectPaymentMethod('online')">
                <div class="payment-icon">💳</div>
                <h3>Pay Online</h3>
                <p>Credit/Debit Card, Mobile Money</p>
                <span class="payment-badge">Secure Payment</span>
            </div>
            <div class="payment-option" onclick="selectPaymentMethod('cash')">
                <div class="payment-icon">💵</div>
                <h3>Pay with Cash</h3>
                <p>Pay upon ${paymentText}</p>
                <span class="payment-badge">Traditional Method</span>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn-secondary" onclick="showOrderSummary()">← Back to Summary</button>
        </div>
    `, 'payment-selection');
}

// Step 7: Process payment and show confirmation
function selectPaymentMethod(method) {
    const paymentMethod = method === 'online' ? 'Online Payment' : 'Cash Payment';
    
    // Save order to localStorage or send to backend
    const order = {
        orderId: 'ORD-' + Date.now(),
        food: currentOrder.food,
        drink: currentOrder.drink,
        tableNumber: currentOrder.tableNumber,
        isOnSite: currentOrder.isOnSite,
        deliveryAddress: currentOrder.deliveryAddress,
        specialRecommendations: currentOrder.specialRecommendations,
        totalAmount: currentOrder.totalAmount,
        paymentMethod: paymentMethod,
        orderTime: new Date().toLocaleString(),
        date: new Date().toISOString(),
        status: 'Confirmed'
    };

    // Save to localStorage - use restaurantOrders for consistency with checkout
    let orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
    orders.push(order);
    localStorage.setItem('restaurantOrders', JSON.stringify(orders));
    
    // Also keep backup in customerOrders for backwards compatibility
    let backupOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    backupOrders.push(order);
    localStorage.setItem('customerOrders', JSON.stringify(backupOrders));

    // Show confirmation
    showOrderConfirmation(order);
}

// Step 8: Final confirmation
function showOrderConfirmation(order) {
    showOrderModal(`
        <div class="confirmation-content">
            <div class="success-icon">✓</div>
            <h2>Order Confirmed!</h2>
            <p class="confirmation-message">
                Dear Valued Guest,<br><br>
                Thank you for choosing <strong>Le Prestige</strong>. Your order has been successfully confirmed 
                and our culinary team is preparing your exquisite meal with the utmost care and attention.
            </p>
            
            <div class="order-details-card">
                <h3>📝 Order Details</h3>
                <div class="detail-row">
                    <span>Order ID:</span>
                    <span><strong>${order.orderId}</strong></span>
                </div>
                <div class="detail-row">
                    <span>Food:</span>
                    <span>${order.food.name}</span>
                </div>
                ${order.drink ? `
                <div class="detail-row">
                    <span>Beverage:</span>
                    <span>${order.drink.name}</span>
                </div>
                ` : ''}
                <div class="detail-row">
                    <span>Location:</span>
                    <span>${order.isOnSite 
                        ? 'Dine In - Table ' + order.tableNumber 
                        : (order.deliveryAddress 
                            ? 'Delivery' 
                            : 'Takeaway - Pickup at Table ' + order.tableNumber)}</span>
                </div>
                ${order.deliveryAddress ? `
                <div class="detail-row address-detail">
                    <span>Delivery Address:</span>
                    <span>${order.deliveryAddress.street}, ${order.deliveryAddress.city}</span>
                </div>
                ` : ''}
                ${order.specialRecommendations ? `
                <div class="detail-row">
                    <span>Special Notes:</span>
                    <span>${order.specialRecommendations}</span>
                </div>
                ` : ''}
                <div class="detail-row">
                    <span>Payment:</span>
                    <span>${order.paymentMethod}</span>
                </div>
                <div class="detail-row total-row">
                    <span>Total:</span>
                    <span><strong>${order.totalAmount.toLocaleString()} FCFA</strong></span>
                </div>
            </div>

            <div class="confirmation-footer">
                <p class="thank-you">
                    🌟 We appreciate your patronage and look forward to serving you an unforgettable dining experience. 🌟
                </p>
                ${order.isOnSite 
                    ? '<p class="eta">Your order will be served at your table shortly.</p>' 
                    : (order.deliveryAddress 
                        ? '<p class="eta">You will be notified when your order is ready for delivery.</p>'
                        : '<p class="eta">Your order will be ready for pickup at Table ' + order.tableNumber + ' shortly.</p>')
                }
                }
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn-secondary" onclick='downloadReceipt(${JSON.stringify(order)})'>📥 Download Receipt</button>
            <button class="btn-primary" onclick="finishOrder()">Return to Menu</button>
        </div>
    `, 'order-confirmation');
}

function finishOrder() {
    // Reset order
    currentOrder = {
        food: null,
        drink: null,
        tableNumber: null,
        isOnSite: true,
        totalAmount: 0,
        deliveryAddress: null,
        specialRecommendations: ''
    };
    closeOrderModal();
}

// Download receipt as HTML file
function downloadReceipt(order) {
    const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Receipt - ${order.orderId}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 40px;
            background: #f5f5f5;
        }
        .receipt {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #b8941f;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #b8941f;
            margin: 0;
            font-size: 36px;
        }
        .header p {
            color: #666;
            margin: 5px 0;
        }
        .order-info {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
        }
        .order-info h2 {
            margin-top: 0;
            color: #333;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #666;
        }
        .value {
            color: #333;
        }
        .items {
            margin: 30px 0;
        }
        .item {
            padding: 15px;
            border: 1px solid #eee;
            border-radius: 5px;
            margin-bottom: 10px;
        }
        .item-name {
            font-weight: bold;
            font-size: 18px;
            color: #333;
        }
        .item-desc {
            color: #666;
            font-size: 14px;
            margin: 5px 0;
        }
        .item-price {
            color: #b8941f;
            font-weight: bold;
            font-size: 16px;
        }
        .total {
            background: #b8941f;
            color: white;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-top: 30px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            color: #666;
        }
        .address-block {
            background: #f0f8ff;
            padding: 15px;
            border-left: 4px solid #b8941f;
            margin: 15px 0;
        }
        .recommendations-block {
            background: #fff9e6;
            padding: 15px;
            border-left: 4px solid #b8941f;
            margin: 15px 0;
        }
        @media print {
            body { background: white; }
            .receipt { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <h1>🍽️ Le Prestige</h1>
            <p>Fine Dining Restaurant</p>
            <p>📞 +237 XXX XXX XXX | 📧 info@leprestige.com</p>
        </div>

        <div class="order-info">
            <h2>📋 Order Information</h2>
            <div class="info-row">
                <span class="label">Order ID:</span>
                <span class="value">${order.orderId}</span>
            </div>
            <div class="info-row">
                <span class="label">Date & Time:</span>
                <span class="value">${order.orderTime}</span>
            </div>
            <div class="info-row">
                <span class="label">Order Type:</span>
                <span class="value">${order.isOnSite 
                    ? 'Dine In - Table ' + order.tableNumber 
                    : (order.deliveryAddress 
                        ? 'Delivery' 
                        : 'Takeaway - Pickup at Table ' + order.tableNumber)}</span>
            </div>
            <div class="info-row">
                <span class="label">Payment Method:</span>
                <span class="value">${order.paymentMethod}</span>
            </div>
            <div class="info-row">
                <span class="label">Status:</span>
                <span class="value">${order.status}</span>
            </div>
        </div>

        ${order.deliveryAddress ? `
        <div class="address-block">
            <h3>📍 Delivery Address</h3>
            <p><strong>${order.deliveryAddress.name}</strong></p>
            <p>${order.deliveryAddress.phone}</p>
            <p>${order.deliveryAddress.street}</p>
            <p>${order.deliveryAddress.city}${order.deliveryAddress.postalCode ? ', ' + order.deliveryAddress.postalCode : ''}</p>
            ${order.deliveryAddress.directions ? '<p><em>' + order.deliveryAddress.directions + '</em></p>' : ''}
        </div>
        ` : ''}

        ${order.specialRecommendations ? `
        <div class="recommendations-block">
            <h3>📝 Special Recommendations</h3>
            <p>${order.specialRecommendations}</p>
        </div>
        ` : ''}

        <div class="items">
            <h2>🍽️ Ordered Items</h2>
            <div class="item">
                <div class="item-name">${order.food.name}</div>
                <div class="item-desc">${order.food.description}</div>
                <div class="item-price">${order.food.priceDisplay}</div>
            </div>
            ${order.drink ? `
            <div class="item">
                <div class="item-name">🍷 ${order.drink.name}</div>
                <div class="item-desc">${order.drink.description}</div>
                <div class="item-price">${order.drink.priceDisplay}</div>
            </div>
            ` : ''}
        </div>

        <div class="total">
            TOTAL: ${order.totalAmount.toLocaleString()} FCFA
        </div>

        <div class="footer">
            <p>🌟 Thank you for dining with Le Prestige! 🌟</p>
            <p>We hope you enjoyed your experience.</p>
            <p>For any inquiries, please contact us at info@leprestige.com</p>
        </div>
    </div>
</body>
</html>
    `;

    // Create blob and download
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt-${order.orderId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show confirmation
    alert('✅ Receipt downloaded successfully! You can open the HTML file in any browser and print it.');
}

// Modal management
function showOrderModal(content, className = '') {
    // Remove existing modal
    const existingModal = document.getElementById('orderFlowModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create new modal
    const modal = document.createElement('div');
    modal.id = 'orderFlowModal';
    modal.className = 'order-flow-modal ' + className;
    modal.innerHTML = `
        <div class="order-modal-content">
            <button class="modal-close" onclick="closeOrderModal()">×</button>
            ${content}
        </div>
    `;
    document.body.appendChild(modal);

    // Show modal with animation
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeOrderModal() {
    const modal = document.getElementById('orderFlowModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Detect which page we're on and render accordingly
    const menuGrid = document.getElementById('menuGrid');
    const homeMenuGrid = document.getElementById('homeMenuGrid');
    
    if (menuGrid) {
        // Menu page - render to menuGrid
        renderMenuItems('all', 'menuGrid');
        
        // Category filter for menu page
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const category = this.getAttribute('data-category');
                renderMenuItems(category, 'menuGrid');
            });
        });
    }
    
    if (homeMenuGrid) {
        // Home page - render to homeMenuGrid
        renderMenuItems('all', 'homeMenuGrid');
        
        // Category filter for home page
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const category = this.getAttribute('data-category');
                renderMenuItems(category, 'homeMenuGrid');
            });
        });
    }
});

// Add menu item to cart
function addMenuItemToCart(encodedData) {
    const itemData = JSON.parse(atob(encodedData));
    
    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists
    const existingItem = cart.find(item => item.name === itemData.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...itemData,
            quantity: 1,
            id: Date.now()
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update badge and display cart
    updateCartBadge();
    showCartModal();
    
    // Show confirmation on button
    event.target.textContent = '✓ ADDED';
    event.target.style.background = '#b8941f';
    setTimeout(() => {
        event.target.textContent = 'ORDER';
        event.target.style.background = '';
    }, 2000);
}
