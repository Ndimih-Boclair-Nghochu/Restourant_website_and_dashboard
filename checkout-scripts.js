/* ==================== CHECKOUT PAGE SCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout page
    loadCheckoutItems();
    attachFormListener();
});

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
        total: finalTotal
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
    
    // Get form values
    const orderData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        zip: formData.get('zip'),
        notes: formData.get('notes'),
        deliveryType: formData.get('deliveryType'),
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

    // Build order details HTML
    let detailsHTML = `
        <div><strong>Order ID:</strong> <span>${orderData.orderId}</span></div>
        <div><strong>Name:</strong> <span>${orderData.fullName}</span></div>
        <div><strong>Email:</strong> <span>${orderData.email}</span></div>
        <div><strong>Phone:</strong> <span>${orderData.phone}</span></div>
        <div><strong>Delivery:</strong> <span>${orderData.deliveryType === 'delivery' ? 'Home Delivery' : 'Pickup'}</span></div>
        <div><strong>Address:</strong> <span>${orderData.address}, ${orderData.city} ${orderData.zip}</span></div>
        <div><strong>Items:</strong> <span>${orderData.items.length} item(s)</span></div>
        <div><strong>Subtotal:</strong> <span>$${orderData.totals.subtotal.toFixed(2)}</span></div>
        <div><strong>Tax:</strong> <span>$${orderData.totals.tax.toFixed(2)}</span></div>
        <div style="border-top: 2px solid var(--primary); margin-top: 10px; padding-top: 10px;"><strong style="color: var(--primary);">Total:</strong> <span style="color: var(--primary); font-weight: 700;">$${orderData.totals.total.toFixed(2)}</span></div>
    `;

    orderDetails.innerHTML = detailsHTML;
    confirmation.style.display = 'block';

    // Update cart badge
    updateCartBadge();
}
