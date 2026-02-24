/* ==================== CHECKOUT PAGE SCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout page
    loadCheckoutItems();
    loadShippingZones();
    attachFormListener();
});

function loadShippingZones() {
    try {
        const shippingData = localStorage.getItem('restaurantData');
        if (shippingData) {
            const data = JSON.parse(shippingData);
            const zones = data.shippingZones || [];
            
            const zoneSelect = document.getElementById('shippingZone');
            zoneSelect.innerHTML = '<option value="">Choose your delivery zone...</option>';
            
            zones.forEach(zone => {
                const option = document.createElement('option');
                option.value = zone.id;
                option.textContent = `${zone.name} - ${zone.fee.toLocaleString()} FCFA`;
                option.dataset.fee = zone.fee;
                option.dataset.name = zone.name;
                zoneSelect.appendChild(option);
            });
        }
    } catch (e) {
        console.error('Error loading shipping zones:', e);
    }
}

function updateShippingDisplay() {
    const deliveryType = document.getElementById('deliveryType').value;
    const shippingZoneGroup = document.getElementById('shipping-zone-group');
    const shippingZone = document.getElementById('shippingZone');
    
    if (deliveryType === 'delivery') {
        shippingZoneGroup.style.display = 'block';
        shippingZone.required = true;
    } else {
        shippingZoneGroup.style.display = 'none';
        shippingZone.required = false;
        shippingZone.value = '';
        updateShippingFee();
    }
}

function updateShippingFee() {
    const shippingZone = document.getElementById('shippingZone');
    const selectedOption = shippingZone.options[shippingZone.selectedIndex];
    const fee = selectedOption.dataset.fee ? parseFloat(selectedOption.dataset.fee) : 0;
    
    const feeDisplay = document.getElementById('shipping-fee-display');
    if (fee > 0) {
        feeDisplay.textContent = `Shipping Fee: ${fee.toLocaleString()} FCFA`;
    } else {
        feeDisplay.textContent = '';
    }
    
    // Recalculate total with shipping
    recalculateTotal();
}

function recalculateTotal() {
    const subtotal = window.checkoutTotals.subtotal;
    const tax = subtotal * 0.10;
    
    const shippingZone = document.getElementById('shippingZone');
    const selectedOption = shippingZone.options[shippingZone.selectedIndex];
    const shippingFee = selectedOption.dataset.fee ? parseFloat(selectedOption.dataset.fee) : 0;
    
    const finalTotal = subtotal + tax + shippingFee;
    
    document.getElementById('finalTotal').textContent = '$' + finalTotal.toFixed(2);
    document.getElementById('summaryShippingFee').textContent = '$' + shippingFee.toFixed(2);
    
    // Show/hide shipping fee row in summary
    const shippingRow = document.getElementById('summary-shipping');
    if (shippingFee > 0) {
        shippingRow.style.display = 'flex';
    } else {
        shippingRow.style.display = 'none';
    }
    
    // Store updated totals
    window.checkoutTotals.shippingFee = shippingFee;
    window.checkoutTotals.total = finalTotal;
}

function loadCheckoutItems() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const checkoutItems = document.getElementById('checkoutItems');
    
    if (cart.length === 0) {
        window.location.href = 'home-new.html';
        return;
    }

    let itemsHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        itemsHTML += `
            <div class="checkout-item">
                <div class="checkout-item-details">
                    <div class="checkout-item-name">${item.name}</div>
                    <div class="checkout-item-qty">Qty: ${item.quantity}</div>
                </div>
                <div class="checkout-item-price">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });

    checkoutItems.innerHTML = itemsHTML;

    // Calculate totals
    const tax = subtotal * 0.10;
    const finalTotal = subtotal + tax;

    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('taxAmount').textContent = '$' + tax.toFixed(2);
    document.getElementById('finalTotal').textContent = '$' + finalTotal.toFixed(2);

    // Store totals for form submission
    window.checkoutTotals = {
        subtotal: subtotal,
        tax: tax,
        total: finalTotal,
        shippingFee: 0
    };
}

function attachFormListener() {
    const form = document.getElementById('checkoutFormElement');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            processOrder();
        });
    }
}

function processOrder() {
    const form = document.getElementById('checkoutFormElement');
    const formData = new FormData(form);
    const deliveryType = formData.get('deliveryType');
    
    // Validate shipping zone selection if delivery is selected
    if (deliveryType === 'delivery') {
        const shippingZone = document.getElementById('shippingZone').value;
        if (!shippingZone) {
            alert('Please select a delivery zone');
            return;
        }
    }
    
    // Get form values
    const orderData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        zip: formData.get('zip'),
        notes: formData.get('notes'),
        deliveryType: deliveryType,
        shippingZone: deliveryType === 'delivery' ? document.getElementById('shippingZone').value : null,
        paymentMethod: formData.get('paymentMethod'),
        items: JSON.parse(localStorage.getItem('cart') || '[]'),
        totals: window.checkoutTotals,
        timestamp: new Date().toLocaleString(),
        orderId: 'ORD-' + Date.now()
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
    orders.push(orderData);
    localStorage.setItem('restaurantOrders', JSON.stringify(orders));
    
    // Also save to customerOrders for backwards compatibility
    const backupOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    backupOrders.push(orderData);
    localStorage.setItem('customerOrders', JSON.stringify(backupOrders));

    // Clear cart
    localStorage.removeItem('cart');

    // Show confirmation
    displayOrderConfirmation(orderData);
}

function displayOrderConfirmation(orderData) {
    // Hide form
    document.querySelector('.checkout-wrapper').style.display = 'none';
    document.querySelector('.order-summary').style.display = 'none';

    // Show confirmation
    const confirmation = document.getElementById('orderConfirmation');
    const orderDetails = document.getElementById('orderDetails');

    // Get payment method display name
    const paymentMethodNames = {
        'orange': '🟠 Orange Money',
        'mtn': '🟡 MTN Mobile Money',
        'cash': '💵 Cash on Delivery'
    };
    const paymentDisplay = paymentMethodNames[orderData.paymentMethod] || orderData.paymentMethod;

    // Build order details HTML
    let detailsHTML = `
        <div><strong>Order ID:</strong> <span>${orderData.orderId}</span></div>
        <div><strong>Name:</strong> <span>${orderData.fullName}</span></div>
        <div><strong>Email:</strong> <span>${orderData.email}</span></div>
        <div><strong>Phone:</strong> <span>${orderData.phone}</span></div>
        <div><strong>Delivery:</strong> <span>${orderData.deliveryType === 'delivery' ? 'Home Delivery' : 'Pickup'}</span></div>
        ${orderData.deliveryType === 'delivery' ? `<div><strong>Delivery Zone:</strong> <span>${getZoneName(orderData.shippingZone)}</span></div>` : ''}
        <div><strong>Address:</strong> <span>${orderData.address}, ${orderData.city} ${orderData.zip}</span></div>
        <div><strong>Payment Method:</strong> <span>${paymentDisplay}</span></div>
        <div><strong>Items:</strong> <span>${orderData.items.length} item(s)</span></div>
        <div><strong>Subtotal:</strong> <span>$${orderData.totals.subtotal.toFixed(2)}</span></div>
        <div><strong>Tax:</strong> <span>$${orderData.totals.tax.toFixed(2)}</span></div>
        ${orderData.totals.shippingFee ? `<div><strong>Shipping Fee:</strong> <span>$${orderData.totals.shippingFee.toFixed(2)}</span></div>` : ''}
        <div style="border-top: 2px solid var(--primary); margin-top: 10px; padding-top: 10px;"><strong style="color: var(--primary);">Total:</strong> <span style="color: var(--primary); font-weight: 700;">$${orderData.totals.total.toFixed(2)}</span></div>
    `;

    orderDetails.innerHTML = detailsHTML;
    confirmation.style.display = 'block';

    // Update cart badge
    updateCartBadge();
}

function getZoneName(zoneId) {
    try {
        const shippingData = localStorage.getItem('restaurantData');
        if (shippingData) {
            const data = JSON.parse(shippingData);
            const zones = data.shippingZones || [];
            const zone = zones.find(z => z.id == zoneId);
            return zone ? zone.name : 'Unknown Zone';
        }
    } catch (e) {
        console.error('Error getting zone name:', e);
    }
    return 'Unknown Zone';
}
