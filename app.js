// ==================== DATABASE MANAGEMENT ====================
class RestaurantDB {
    constructor() {
        this.storageKey = 'restaurantData';
        this.initializeData();
    }

    initializeData() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultData = {
                tables: [
                    { id: 1, number: 'T01', capacity: 4, type: 'standard', status: 'available', currentOrder: null },
                    { id: 2, number: 'T02', capacity: 4, type: 'standard', status: 'available', currentOrder: null },
                    { id: 3, number: 'T03', capacity: 2, type: 'standard', status: 'available', currentOrder: null },
                    { id: 4, number: 'T04', capacity: 6, type: 'standard', status: 'available', currentOrder: null },
                    { id: 5, number: 'VIP01', capacity: 8, type: 'vip', status: 'available', currentOrder: null },
                    { id: 6, number: 'B01', capacity: 1, type: 'bar', status: 'available', currentOrder: null },
                ],
                menuItems: [
                    { id: 1, name: 'Margherita Pizza', description: 'Classic Italian pizza with fresh basil', price: 12990, category: 'main', emoji: '🍕' },
                    { id: 2, name: 'Caesar Salad', description: 'Fresh romaine with parmesan and croutons', price: 8990, category: 'appetizer', emoji: '🥗' },
                    { id: 3, name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter sauce', price: 18990, category: 'main', emoji: '🐟' },
                    { id: 4, name: 'Chocolate Cake', description: 'Rich chocolate cake with vanilla cream', price: 7990, category: 'dessert', emoji: '🍰' },
                    { id: 5, name: 'Cappuccino', description: 'Espresso with steamed milk', price: 4990, category: 'beverage', emoji: '☕' },
                    { id: 6, name: 'Chicken Pasta', description: 'Creamy chicken alfredo pasta', price: 14990, category: 'main', emoji: '🍝' },
                    { id: 7, name: 'Garlic Bread', description: 'Toasted bread with fresh garlic butter', price: 5990, category: 'appetizer', emoji: '🍞' },
                    { id: 8, name: 'Tiramisu', description: 'Classic Italian dessert', price: 6990, category: 'dessert', emoji: '🎂' },
                ],
                orders: [],
                inventory: [
                    { id: 1, name: 'Tomato', quantity: 50, unit: 'kg', unitPrice: 2500, minStock: 10, category: 'vegetable' },
                    { id: 2, name: 'Flour', quantity: 100, unit: 'kg', unitPrice: 1200, minStock: 20, category: 'pantry' },
                    { id: 3, name: 'Olive Oil', quantity: 30, unit: 'L', unitPrice: 8500, minStock: 5, category: 'oil' },
                    { id: 4, name: 'Cheese', quantity: 25, unit: 'kg', unitPrice: 12000, minStock: 5, category: 'dairy' },
                    { id: 5, name: 'Chicken Breast', quantity: 40, unit: 'kg', unitPrice: 6500, minStock: 10, category: 'meat' },
                ],
                staff: [
                    { id: 1, name: 'John Smith', email: 'john@restaurant.com', phone: '555-0101', role: 'manager', status: 'on-duty' },
                    { id: 2, name: 'Sarah Johnson', email: 'sarah@restaurant.com', phone: '555-0102', role: 'waiter', status: 'on-duty' },
                    { id: 3, name: 'Mike Brown', email: 'mike@restaurant.com', phone: '555-0103', role: 'chef', status: 'on-duty' },
                    { id: 4, name: 'Emily Davis', email: 'emily@restaurant.com', phone: '555-0104', role: 'cashier', status: 'on-duty' },
                ],
                billing: [],
                reservationPlans: [
                    { 
                        id: 1, 
                        name: 'Basic Dining', 
                        budget: 50000, 
                        description: 'Standard dining experience with our regular menu',
                        features: ['Standard seating', 'Regular menu access', 'Basic table service'],
                        icon: '🍽️',
                        color: '#95a5a6'
                    },
                    { 
                        id: 2, 
                        name: 'Premium Dining', 
                        budget: 100000, 
                        description: 'Enhanced dining with premium dishes and beverages',
                        features: ['Premium seating', 'Extended menu with special dishes', 'Priority service', 'Complimentary appetizer'],
                        icon: '⭐',
                        color: '#3498db'
                    },
                    { 
                        id: 3, 
                        name: 'VIP Experience', 
                        budget: 200000, 
                        description: 'Exclusive VIP treatment with finest cuisine',
                        features: ['Private VIP section', 'Full menu including chef specials', 'Dedicated server', 'Complimentary wine pairing', 'Personalized menu'],
                        icon: '👑',
                        color: '#f39c12'
                    },
                    { 
                        id: 4, 
                        name: 'Luxury Package', 
                        budget: 500000, 
                        description: 'Ultimate luxury dining experience',
                        features: ['Private dining room', 'Custom chef-prepared menu', 'Personal sommelier', 'Live music/entertainment', 'Valet parking', 'Premium champagne'],
                        icon: '💎',
                        color: '#9b59b6'
                    }
                ],
            };
            localStorage.setItem(this.storageKey, JSON.stringify(defaultData));
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    saveData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    // Table operations
    getTables() {
        return this.getData().tables;
    }

    addTable(table) {
        const data = this.getData();
        table.id = Math.max(...data.tables.map(t => t.id), 0) + 1;
        data.tables.push(table);
        this.saveData(data);
        return table;
    }

    updateTable(id, updates) {
        const data = this.getData();
        const table = data.tables.find(t => t.id === id);
        if (table) {
            Object.assign(table, updates);
            this.saveData(data);
        }
        return table;
    }

    // Menu operations
    getMenuItems() {
        return this.getData().menuItems;
    }

    addMenuItem(item) {
        const data = this.getData();
        item.id = Math.max(...data.menuItems.map(m => m.id), 0) + 1;
        data.menuItems.push(item);
        this.saveData(data);
        return item;
    }

    // Order operations
    getOrders() {
        return this.getData().orders;
    }

    addOrder(order) {
        const data = this.getData();
        order.id = 'ORD-' + Date.now();
        order.createdAt = new Date().toLocaleString();
        order.status = 'pending';
        order.items = [];
        data.orders.push(order);
        this.saveData(data);
        return order;
    }

    addOrderItem(orderId, item) {
        const data = this.getData();
        const order = data.orders.find(o => o.id === orderId);
        if (order) {
            order.items.push(item);
            this.saveData(data);
        }
        return order;
    }

    completeOrder(orderId) {
        const data = this.getData();
        const order = data.orders.find(o => o.id === orderId);
        if (order) {
            order.status = 'completed';
            order.completedAt = new Date().toLocaleString();
            // Update table status
            const table = data.tables.find(t => t.id === order.tableId);
            if (table) {
                table.status = 'available';
                table.currentOrder = null;
            }
            this.saveData(data);
        }
        return order;
    }

    // Inventory operations
    getInventory() {
        return this.getData().inventory;
    }

    addInventoryItem(item) {
        const data = this.getData();
        item.id = Math.max(...data.inventory.map(i => i.id), 0) + 1;
        data.inventory.push(item);
        this.saveData(data);
        return item;
    }

    updateInventory(id, quantity) {
        const data = this.getData();
        const item = data.inventory.find(i => i.id === id);
        if (item) {
            item.quantity = quantity;
            this.saveData(data);
        }
        return item;
    }

    // Staff operations
    getStaff() {
        return this.getData().staff;
    }

    addStaff(staff) {
        const data = this.getData();
        staff.id = Math.max(...data.staff.map(s => s.id), 0) + 1;
        staff.status = 'on-duty';
        data.staff.push(staff);
        this.saveData(data);
        return staff;
    }

    // Billing operations
    getBilling() {
        return this.getData().billing;
    }

    addBilling(bill) {
        const data = this.getData();
        bill.id = 'INV-' + Date.now();
        bill.createdAt = new Date().toLocaleString();
        data.billing.push(bill);
        this.saveData(data);
        return bill;
    }

    // Reservation Plans operations
    getReservationPlans() {
        return this.getData().reservationPlans || [];
    }

    addReservationPlan(plan) {
        const data = this.getData();
        if (!data.reservationPlans) data.reservationPlans = [];
        plan.id = Math.max(...data.reservationPlans.map(p => p.id), 0) + 1;
        data.reservationPlans.push(plan);
        this.saveData(data);
        return plan;
    }

    updateReservationPlan(id, updates) {
        const data = this.getData();
        if (!data.reservationPlans) data.reservationPlans = [];
        const plan = data.reservationPlans.find(p => p.id === id);
        if (plan) {
            Object.assign(plan, updates);
            this.saveData(data);
        }
        return plan;
    }

    deleteReservationPlan(id) {
        const data = this.getData();
        if (!data.reservationPlans) return;
        data.reservationPlans = data.reservationPlans.filter(p => p.id !== id);
        this.saveData(data);
    }
}

// ==================== UI MANAGER ====================
class UIManager {
    constructor(db) {
        this.db = db;
        this.currentOrder = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Tab navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.closest('.nav-btn').dataset.tab;
                console.log('Tab clicked:', tab);
                this.switchTab(tab);
            });
        });

        // Modal controls
        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('show');
            });
        });

        // Buttons
        document.getElementById('add-table-btn').addEventListener('click', () => this.openModal('table-modal'));
        document.getElementById('add-item-btn').addEventListener('click', () => this.openModal('menu-modal'));
        document.getElementById('new-order-btn').addEventListener('click', () => this.openModal('order-modal'));
        document.getElementById('add-staff-btn').addEventListener('click', () => this.openModal('staff-modal'));
        document.getElementById('add-inventory-btn').addEventListener('click', () => this.openModal('inventory-modal'));
        document.getElementById('add-plan-btn').addEventListener('click', () => addReservationPlan());

        // Forms
        document.getElementById('table-form').addEventListener('submit', (e) => this.handleAddTable(e));
        document.getElementById('menu-form').addEventListener('submit', (e) => this.handleAddMenuItem(e));
        document.getElementById('order-form').addEventListener('submit', (e) => this.handleAddOrderItem(e));
        document.getElementById('staff-form').addEventListener('submit', (e) => this.handleAddStaff(e));
        document.getElementById('inventory-form').addEventListener('submit', (e) => this.handleAddInventory(e));

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                alert('Logged out successfully');
                // In a real app, this would redirect to login
            }
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('show');
            }
        });
    }

    switchTab(tabName) {
        console.log('Switching to tab:', tabName);
        
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab
        const selectedTab = document.getElementById(tabName);
        if (selectedTab) {
            selectedTab.classList.add('active');
            console.log('Tab activated:', tabName);
        } else {
            console.error('Tab not found:', tabName);
            return;
        }

        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // Update page title
        const tabTitles = {
            dashboard: 'Dashboard',
            'customer-orders': 'Customer Orders',
            reservations: 'Reservations',
            'reservation-plans': 'Reservation Plans & Budgets',
            reviews: 'Customer Reviews',
            tables: 'Table Management',
            orders: 'Order Management',
            menu: 'Menu Management',
            inventory: 'Inventory Management',
            staff: 'Staff Management',
            billing: 'Billing & Invoices',
            reports: 'Reports & Analytics',
        };
        document.querySelector('.page-title').textContent = tabTitles[tabName];

        // Render content
        if (tabName === 'dashboard') {
            this.renderDashboard();
        } else if (tabName === 'customer-orders') {
            loadCustomerOrders();
        } else if (tabName === 'reservations') {
            loadReservations();
        } else if (tabName === 'reservation-plans') {
            this.renderReservationPlans();
        } else if (tabName === 'reviews') {
            loadReviews();
        } else if (tabName === 'tables') {
            this.renderTables();
        } else if (tabName === 'orders') {
            this.renderOrders();
        } else if (tabName === 'menu') {
            this.renderMenuItems();
        } else if (tabName === 'inventory') {
            this.renderInventory();
        } else if (tabName === 'staff') {
            this.renderStaff();
        } else if (tabName === 'billing') {
            this.renderBilling();
        } else if (tabName === 'reports') {
            this.renderReports();
        }
    }

    openModal(modalId) {
        document.getElementById(modalId).classList.add('show');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
    }

    // Dashboard
    renderDashboard() {
        console.log('Rendering dashboard with real statistics...');
        
        const orders = this.db.getOrders();
        const tables = this.db.getTables();
        const staff = this.db.getStaff();
        const billing = this.db.getBilling();
        
        // Get customer data from website
        const customerOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
        const customerReviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');

        console.log('Dashboard data:', {
            internalOrders: orders.length,
            customerOrders: customerOrders.length,
            tables: tables.length,
            staff: staff.length,
            billing: billing.length,
            reviews: customerReviews.length,
            reservations: reservations.length
        });

        // Calculate Real KPIs
        // 1. Total Revenue (Internal + Customer Orders) - All in FCFA
        const internalRevenue = billing.reduce((sum, b) => sum + (b.amount || 0), 0);
        const customerRevenue = customerOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        const totalRevenue = internalRevenue + customerRevenue;
        
        // 2. Total Orders (Both internal and customer)
        const totalOrders = orders.length + customerOrders.length;
        
        // 3. Occupied Tables
        const occupiedTables = tables.filter(t => t.status === 'occupied').length;
        const totalTables = tables.length;
        
        // 4. Staff On Duty
        const staffOnDuty = staff.filter(s => s.status === 'on-duty').length;
        const totalStaff = staff.length;

        // Update KPI Cards
        const revenueEl = document.getElementById('today-revenue');
        const ordersEl = document.getElementById('total-orders');
        const tablesEl = document.getElementById('occupied-tables');
        const staffEl = document.getElementById('staff-duty');
        
        if (revenueEl) revenueEl.textContent = totalRevenue.toLocaleString() + ' FCFA';
        if (ordersEl) ordersEl.textContent = totalOrders;
        if (tablesEl) tablesEl.textContent = `${occupiedTables}/${totalTables}`;
        if (staffEl) staffEl.textContent = `${staffOnDuty}/${totalStaff}`;

        // Update KPI changes/details
        const revenueCard = revenueEl?.closest('.kpi-card');
        if (revenueCard) {
            const changeEl = revenueCard.querySelector('.kpi-change');
            if (changeEl) {
                changeEl.textContent = `Internal: ${internalRevenue.toLocaleString()} FCFA | Website: ${customerRevenue.toLocaleString()} FCFA`;
            }
        }

        const ordersCard = ordersEl?.closest('.kpi-card');
        if (ordersCard) {
            const changeEl = ordersCard.querySelector('.kpi-change');
            if (changeEl) {
                changeEl.textContent = `Internal: ${orders.length} | Website: ${customerOrders.length}`;
            }
        }

        const tablesCard = tablesEl?.closest('.kpi-card');
        if (tablesCard) {
            const changeEl = tablesCard.querySelector('.kpi-change');
            if (changeEl) {
                const availableTables = tables.filter(t => t.status === 'available').length;
                changeEl.textContent = `Available: ${availableTables} | Reservations: ${reservations.length}`;
            }
        }

        const staffCard = staffEl?.closest('.kpi-card');
        if (staffCard) {
            const changeEl = staffCard.querySelector('.kpi-change');
            if (changeEl) {
                changeEl.textContent = `Reviews: ${customerReviews.length} | Avg Rating: ${calculateAverageRating(customerReviews)}⭐`;
            }
        }

        // Active Orders - Show recent customer orders
        const activeOrdersList = document.getElementById('active-orders-list');
        if (activeOrdersList) {
            let ordersHtml = '';
            
            // Show internal active orders
            const activeInternalOrders = orders.filter(o => o.status !== 'completed').slice(0, 3);
            if (activeInternalOrders.length > 0) {
                ordersHtml += '<div style="color: #667eea; font-weight: 600; margin-bottom: 10px;">Internal Orders</div>';
                ordersHtml += activeInternalOrders.map(order => `
                    <div class="order-item">
                        <div class="order-info">
                            <div class="order-number">Order ${order.id}</div>
                            <div class="order-details">Table: ${order.tableNumber} | Items: ${order.items?.length || 0} | ${order.createdAt}</div>
                        </div>
                        <span class="order-status">${order.status.toUpperCase()}</span>
                    </div>
                `).join('');
            }
            
            // Show recent customer orders from website
            const recentCustomerOrders = customerOrders.slice(-3).reverse();
            if (recentCustomerOrders.length > 0) {
                ordersHtml += '<div style="color: #d4af37; font-weight: 600; margin: 15px 0 10px 0;">Recent Customer Orders</div>';
                ordersHtml += recentCustomerOrders.map(order => `
                    <div class="order-item" style="border-left: 3px solid #d4af37;">
                        <div class="order-info">
                            <div class="order-number">${order.orderId}</div>
                            <div class="order-details">${order.food?.name || 'N/A'} | ${order.isOnSite ? 'Table ' + order.tableNumber : 'Takeaway'} | ${order.totalAmount?.toLocaleString() || '0'} FCFA</div>
                        </div>
                        <span class="order-status completed">CONFIRMED</span>
                    </div>
                `).join('');
            }
            
            if (ordersHtml === '') {
                ordersHtml = '<p class="empty-state">No orders yet. Orders will appear here when customers place orders.</p>';
            }
            
            activeOrdersList.innerHTML = ordersHtml;
        }

        // Recent Transactions - Show real transactions from both sources
        const recentTransactionsEl = document.getElementById('recent-transactions');
        if (recentTransactionsEl) {
            let transHtml = '';
            
            // Combine billing and customer orders for transactions
            const allTransactions = [];
            
            // Add internal billing
            billing.forEach(bill => {
                allTransactions.push({
                    id: bill.id,
                    amount: bill.amount,
                    time: bill.createdAt,
                    type: 'Internal',
                    currency: 'FCFA'
                });
            });
            
            // Add customer orders
            customerOrders.forEach(order => {
                allTransactions.push({
                    id: order.orderId,
                    amount: order.totalAmount,
                    time: order.date ? new Date(order.date).toLocaleString() : 'N/A',
                    type: 'Customer',
                    currency: 'FCFA'
                });
            });
            
            // Sort by most recent and take last 5
            const recentTrans = allTransactions.slice(-5).reverse();
            
            if (recentTrans.length > 0) {
                transHtml = recentTrans.map(trans => `
                    <div class="transaction-item">
                        <div class="transaction-desc">
                            <div class="transaction-name">${trans.type}: ${trans.id}</div>
                            <div class="transaction-time">${trans.time}</div>
                        </div>
                        <div class="transaction-amount" style="color: #28a745;">+${trans.amount?.toLocaleString() || '0'} ${trans.currency}</div>
                    </div>
                `).join('');
            } else {
                transHtml = '<p class="empty-state">No transactions yet. Transactions will appear when orders are completed.</p>';
            }
            
            recentTransactionsEl.innerHTML = transHtml;
        }
        
        console.log('Dashboard rendered successfully');
    }

    // Tables
    renderTables() {
        const tables = this.db.getTables();
        const tablesGridEl = document.getElementById('tables-grid');
        
        if (!tablesGridEl) {
            console.error('tables-grid element not found');
            return;
        }
        
        const html = tables.map(table => `
            <div class="table-card ${table.status}" onclick="uiManager.selectTable(${table.id})">
                <div class="table-number">${table.number}</div>
                <div class="table-capacity">Capacity: ${table.capacity}</div>
                <div class="table-status">${table.status.toUpperCase()}</div>
            </div>
        `).join('');
        tablesGridEl.innerHTML = html;
    }

    selectTable(tableId) {
        const table = this.db.getTables().find(t => t.id === tableId);
        if (table && table.status === 'available') {
            document.getElementById('order-table').value = tableId;
            this.openModal('order-modal');
        } else {
            alert('This table is not available');
        }
    }

    // Orders
    renderOrders() {
        const orders = this.db.getOrders(); // Internal orders from staff
        const customerOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]'); // Website orders
        const ordersListEl = document.getElementById('orders-list');
        
        if (!ordersListEl) {
            console.error('orders-list element not found');
            return;
        }
        
        console.log('Rendering orders - Internal:', orders.length, 'Customer:', customerOrders.length);
        
        // Combine both types of orders
        let html = '';
        
        // Show customer orders from website first
        if (customerOrders.length > 0) {
            html += '<h3 style="color: #667eea; margin: 20px 0 15px 0; font-size: 18px;">🛒 Customer Orders from Website</h3>';
            html += customerOrders.slice().reverse().slice(0, 10).map(order => `
                <div class="order-item" style="border-left: 4px solid #d4af37;">
                    <div class="order-info">
                        <div class="order-number">${order.orderId}</div>
                        <div class="order-details">
                            Food: ${order.food?.name || 'N/A'} | 
                            Drink: ${order.drink?.name || 'None'} | 
                            Location: ${order.isOnSite ? 'Table ' + order.tableNumber : 'Takeaway'} | 
                            Total: ${order.totalAmount?.toLocaleString() || '0'} FCFA |
                            ${order.date ? new Date(order.date).toLocaleString() : 'N/A'}
                        </div>
                    </div>
                    <div>
                        <span class="order-status completed">${order.status || 'CONFIRMED'}</span>
                        <button class="btn-primary" onclick="viewOrderDetails(${customerOrders.length - customerOrders.indexOf(order) - 1})" style="margin-left: 10px; font-size: 12px; padding: 5px 10px;">View</button>
                    </div>
                </div>
            `).join('');
        }
        
        // Show internal restaurant orders
        if (orders.length > 0) {
            html += '<h3 style="color: #667eea; margin: 20px 0 15px 0; font-size: 18px;">🍽️ Internal Restaurant Orders</h3>';
            html += orders.map(order => `
                <div class="order-item">
                    <div class="order-info">
                        <div class="order-number">Order ${order.id}</div>
                        <div class="order-details">
                            Table: ${order.tableNumber} | 
                            Items: ${order.items?.length || 0} | 
                            Total: ${(order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0).toLocaleString()} FCFA |
                            ${order.createdAt}
                        </div>
                    </div>
                    <div>
                        <span class="order-status ${order.status === 'completed' ? 'completed' : ''}">${order.status.toUpperCase()}</span>
                        ${order.status !== 'completed' ? `<button class="btn-primary" onclick="uiManager.completeOrder('${order.id}')" style="margin-left: 10px;">Complete</button>` : ''}
                    </div>
                </div>
            `).join('');
        }
        
        if (html === '') {
            html = '<p class="empty-state">No orders yet. Orders from the website and internal orders will appear here.</p>';
        }
        
        ordersListEl.innerHTML = html;
    }

    completeOrder(orderId) {
        this.db.completeOrder(orderId);
        this.renderOrders();
        this.renderDashboard();
    }

    // Menu Items
    renderMenuItems() {
        const menuItems = this.db.getMenuItems();
        const menuItemsEl = document.getElementById('menu-items');
        
        if (!menuItemsEl) {
            console.error('menu-items element not found');
            return;
        }
        
        const html = menuItems.map(item => `
            <div class="menu-card">
                <div class="menu-image">${item.emoji || '🍽️'}</div>
                <div class="menu-content">
                    <div class="menu-name">${item.name}</div>
                    <div class="menu-description">${item.description}</div>
                    <div class="menu-category">${item.category.toUpperCase()}</div>
                    <div class="menu-price">${item.price.toLocaleString()} FCFA</div>
                </div>
            </div>
        `).join('');
        menuItemsEl.innerHTML = html;

        // Populate order form menu select
        const menuSelect = document.getElementById('order-menu-item');
        if (menuSelect) {
            menuSelect.innerHTML = '<option value="">Select Menu Item</option>' + menuItems.map(item => 
                `<option value="${item.id}" data-price="${item.price}">${item.name} - ${item.price.toLocaleString()} FCFA</option>`
            ).join('');
        }
    }

    // Inventory
    renderInventory() {
        const inventory = this.db.getInventory();
        const html = inventory.map(item => {
            const usage = Math.min(100, Math.max(0, (item.quantity / (item.quantity + item.minStock)) * 100));
            const level = usage > 50 ? 'normal' : usage > 25 ? 'warning' : 'critical';
            return `
                <div class="inventory-item">
                    <div class="inventory-info">
                        <div class="inventory-name">${item.name}</div>
                        <div class="inventory-details">
                            <span>Quantity: ${item.quantity} ${item.unit}</span>
                            <span>Min Stock: ${item.minStock} ${item.unit}</span>
                            <span>Unit Price: ${item.unitPrice.toLocaleString()} FCFA</span>
                        </div>
                        <div class="stock-level">
                            <div class="stock-bar">
                                <div class="stock-fill ${level}" style="width: ${usage}%"></div>
                            </div>
                            <span>${Math.round(usage)}%</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        const inventoryListEl = document.getElementById('inventory-list');
        if (!inventoryListEl) {
            console.error('inventory-list element not found');
            return;
        }
        inventoryListEl.innerHTML = html;
    }

    // Staff
    renderStaff() {
        const staff = this.db.getStaff();
        const staffListEl = document.getElementById('staff-list');
        
        if (!staffListEl) {
            console.error('staff-list element not found');
            return;
        }
        
        const html = staff.map(member => {
            const initials = member.name.split(' ').map(n => n[0]).join('');
            return `
                <div class="staff-card">
                    <div class="staff-avatar">${initials}</div>
                    <div class="staff-name">${member.name}</div>
                    <div class="staff-role">${member.role.toUpperCase()}</div>
                    <div class="staff-contact">
                        <div>📧 ${member.email}</div>
                        <div>📱 ${member.phone}</div>
                    </div>
                    <span class="staff-status ${member.status === 'off-duty' ? 'off' : ''}">${member.status.toUpperCase()}</span>
                </div>
            `;
        }).join('');
        staffListEl.innerHTML = html;
    }

    // Billing
    renderBilling() {
        const billing = this.db.getBilling();
        const billingListEl = document.getElementById('billing-list');
        
        if (!billingListEl) {
            console.error('billing-list element not found');
            return;
        }
        
        const html = billing.length > 0
            ? billing.map(bill => `
                <div class="billing-item">
                    <div class="billing-info">
                        <div class="billing-number">Invoice ${bill.id}</div>
                        <div class="billing-details">
                            Table: ${bill.tableNumber} | 
                            Items: ${bill.itemCount} | 
                            ${bill.createdAt}
                        </div>
                    </div>
                    <div class="billing-amount">${bill.amount?.toLocaleString() || '0'} FCFA</div>
                </div>
            `).join('')
            : '<p class="empty-state">No invoices yet. Complete orders to generate invoices.</p>';
        billingListEl.innerHTML = html;
    }

    // Reports
    renderReports() {
        const orders = this.db.getOrders();
        const billing = this.db.getBilling();
        const tables = this.db.getTables();

        const totalOrders = orders.length;
        const completedOrders = orders.filter(o => o.status === 'completed').length;
        const totalRevenue = billing.reduce((sum, b) => sum + (b.amount || 0), 0);
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        const occupancyRate = tables.length > 0 ? (tables.filter(t => t.status === 'occupied').length / tables.length) * 100 : 0;

        const html = `
            <div class="report-card">
                <h3>Total Orders</h3>
                <div class="report-data">${totalOrders}</div>
                <div class="report-change">Completed: ${completedOrders}</div>
            </div>
            <div class="report-card">
                <h3>Total Revenue</h3>
                <div class="report-data">${totalRevenue.toLocaleString()} FCFA</div>
                <div class="report-change">Avg per order: ${avgOrderValue.toLocaleString()} FCFA</div>
            </div>
            <div class="report-card">
                <h3>Table Occupancy</h3>
                <div class="report-data">${occupancyRate.toFixed(1)}%</div>
                <div class="report-change">Occupied: ${tables.filter(t => t.status === 'occupied').length}/${tables.length}</div>
            </div>
            <div class="report-card">
                <h3>Average Order Value</h3>
                <div class="report-data">${avgOrderValue.toLocaleString()} FCFA</div>
                <div class="report-change">Peak: During dinner hours</div>
            </div>
        `;
        
        const reportsContainerEl = document.getElementById('reports-container');
        if (!reportsContainerEl) {
            console.error('reports-container element not found');
            return;
        }
        reportsContainerEl.innerHTML = html;
    }

    // Reservation Plans
    renderReservationPlans() {
        const plans = this.db.getReservationPlans();
        const grid = document.getElementById('plans-grid');
        
        if (!grid) {
            console.error('plans-grid element not found');
            return;
        }

        if (plans.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">No reservation plans yet. Click "+ Add Plan" to create one.</div>';
            return;
        }

        grid.innerHTML = plans.map(plan => `
            <div class="plan-card" style="border-left: 4px solid ${plan.color}">
                <div class="plan-header">
                    <span class="plan-icon" style="font-size: 48px;">${plan.icon}</span>
                    <h3 class="plan-name">${plan.name}</h3>
                </div>
                <div class="plan-budget">${plan.budget.toLocaleString()} FCFA</div>
                <p class="plan-description">${plan.description}</p>
                <div class="plan-features">
                    <h4>Features:</h4>
                    <ul>
                        ${plan.features.map(f => `<li>✓ ${f}</li>`).join('')}
                    </ul>
                </div>
                <div class="plan-actions">
                    <button class="btn-action" onclick="editReservationPlan(${plan.id})" title="Edit">✏️</button>
                    <button class="btn-action" onclick="deleteReservationPlan(${plan.id})" title="Delete" style="color: #dc3545;">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    // Form handlers
    handleAddTable(e) {
        e.preventDefault();
        const table = {
            number: document.getElementById('table-number').value,
            capacity: parseInt(document.getElementById('table-capacity').value),
            type: document.getElementById('table-type').value,
            status: 'available',
            currentOrder: null,
        };
        this.db.addTable(table);
        this.closeModal('table-modal');
        document.getElementById('table-form').reset();
        this.renderTables();
        alert('Table added successfully!');
    }

    handleAddMenuItem(e) {
        e.preventDefault();
        const item = {
            name: document.getElementById('item-name').value,
            description: document.getElementById('item-description').value,
            price: parseFloat(document.getElementById('item-price').value),
            category: document.getElementById('item-category').value,
            emoji: '🍽️',
        };
        this.db.addMenuItem(item);
        this.closeModal('menu-modal');
        document.getElementById('menu-form').reset();
        this.renderMenuItems();
        alert('Menu item added successfully!');
    }

    handleAddOrderItem(e) {
        e.preventDefault();
        const tableId = parseInt(document.getElementById('order-table').value);
        const menuItemId = parseInt(document.getElementById('order-menu-item').value);
        const quantity = parseInt(document.getElementById('order-quantity').value);
        const notes = document.getElementById('order-notes').value;

        if (!tableId || !menuItemId) {
            alert('Please select a table and menu item');
            return;
        }

        const menuItem = this.db.getMenuItems().find(m => m.id === menuItemId);
        
        if (!this.currentOrder) {
            const table = this.db.getTables().find(t => t.id === tableId);
            this.currentOrder = this.db.addOrder({ tableId, tableNumber: table.number });
            this.db.updateTable(tableId, { status: 'occupied', currentOrder: this.currentOrder.id });
        }

        const orderItem = {
            id: menuItemId,
            name: menuItem.name,
            price: menuItem.price,
            quantity,
            notes,
        };
        this.db.addOrderItem(this.currentOrder.id, orderItem);

        this.updateOrderItemsList();
        document.getElementById('order-quantity').value = 1;
        document.getElementById('order-notes').value = '';
        document.getElementById('order-menu-item').value = '';
    }

    updateOrderItemsList() {
        if (!this.currentOrder) {
            document.getElementById('order-items-list').innerHTML = '';
            document.getElementById('complete-order-btn').style.display = 'none';
            return;
        }

        const order = this.db.getOrders().find(o => o.id === this.currentOrder.id);
        const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const html = `
            ${order.items.map(item => `
                <div style="padding: 10px; border-bottom: 1px solid #eee;">
                    <div>${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} FCFA</div>
                    ${item.notes ? `<div style="font-size: 12px; color: #999;">Note: ${item.notes}</div>` : ''}
                </div>
            `).join('')}
            <div style="padding: 10px; font-weight: bold;">
                Total: ${total.toLocaleString()} FCFA
            </div>
        `;
        document.getElementById('order-items-list').innerHTML = html;
        document.getElementById('complete-order-btn').style.display = 'block';
        document.getElementById('complete-order-btn').onclick = () => this.finalizeOrder();
    }

    finalizeOrder() {
        if (this.currentOrder) {
            const order = this.db.getOrders().find(o => o.id === this.currentOrder.id);
            const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            this.db.addBilling({
                orderId: this.currentOrder.id,
                tableNumber: order.tableNumber,
                itemCount: order.items.length,
                amount: total,
            });

            this.db.completeOrder(this.currentOrder.id);
            this.closeModal('order-modal');
            this.currentOrder = null;
            document.getElementById('order-form').reset();
            document.getElementById('order-items-list').innerHTML = '';
            document.getElementById('complete-order-btn').style.display = 'none';
            alert('Order completed and billing generated!');
            this.renderOrders();
            this.renderDashboard();
        }
    }

    handleAddStaff(e) {
        e.preventDefault();
        const staff = {
            name: document.getElementById('staff-name').value,
            email: document.getElementById('staff-email').value,
            phone: document.getElementById('staff-phone').value,
            role: document.getElementById('staff-role').value,
        };
        this.db.addStaff(staff);
        this.closeModal('staff-modal');
        document.getElementById('staff-form').reset();
        this.renderStaff();
        alert('Staff member added successfully!');
    }

    handleAddInventory(e) {
        e.preventDefault();
        const item = {
            name: document.getElementById('inv-item-name').value,
            quantity: parseInt(document.getElementById('inv-quantity').value),
            unit: document.getElementById('inv-unit').value,
            unitPrice: parseFloat(document.getElementById('inv-price').value),
            minStock: parseInt(document.getElementById('inv-min-stock').value),
        };
        this.db.addInventoryItem(item);
        this.closeModal('inventory-modal');
        document.getElementById('inventory-form').reset();
        this.renderInventory();
        alert('Inventory item added successfully!');
    }
}

// ==================== INITIALIZATION ====================
let db;
let uiManager;

document.addEventListener('DOMContentLoaded', () => {
    // Display admin username
    const adminUsername = sessionStorage.getItem('adminUsername');
    if (adminUsername) {
        document.getElementById('admin-username').textContent = `👤 ${adminUsername}`;
    }

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.clear();
            window.location.href = 'admin-login.html';
        }
    });

    db = new RestaurantDB();
    uiManager = new UIManager(db);
    uiManager.renderDashboard();
    
    console.log('Admin dashboard initialized');
    console.log('Available tabs: dashboard, customer-orders, reservations, reviews, tables, orders, menu, inventory, staff, billing, reports');
    
    // Pre-load data for new sections (but don't display them yet)
    console.log('Pre-loading customer data...');
    const customerOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const customerReviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
    
    console.log(`Found ${customerOrders.length} customer orders`);
    console.log(`Found ${reservations.length} reservations`);
    console.log(`Found ${customerReviews.length} customer reviews`);
});

// ==================== CUSTOMER ORDERS MANAGEMENT ====================
function loadCustomerOrders() {
    const orders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    const tbody = document.getElementById('customer-orders-body');
    
    if (!tbody) {
        console.log('customer-orders-body element not found');
        return;
    }
    
    tbody.innerHTML = '';
    
    console.log('Loading customer orders:', orders.length);
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 30px; color: #666;">No customer orders yet. Orders placed from the website will appear here.</td></tr>';
        return;
    }
    
    // Reverse to show newest first
    const reversedOrders = [...orders].reverse();
    
    reversedOrders.forEach((order, index) => {
        const row = document.createElement('tr');
        const dateStr = order.date ? new Date(order.date).toLocaleString() : (order.orderTime || 'N/A');
        
        let orderType = '';
        if (order.isOnSite) {
            orderType = `🍽️ Table ${order.tableNumber}`;
        } else if (order.deliveryAddress) {
            orderType = '🚚 Delivery';
        } else {
            orderType = `🛍️ Takeaway (Table ${order.tableNumber})`;
        }
        
        row.innerHTML = `
            <td><strong>${order.orderId}</strong></td>
            <td>${order.customerName || (order.deliveryAddress?.name || 'Guest')}</td>
            <td>${order.food?.name || 'N/A'}</td>
            <td>${order.drink?.name || 'None'}</td>
            <td>${orderType}</td>
            <td><strong>${order.totalAmount?.toLocaleString() || '0'} FCFA</strong></td>
            <td>${order.paymentMethod || 'N/A'}</td>
            <td>${dateStr}</td>
            <td style="white-space: nowrap;">
                <button class="btn-action" onclick="viewOrderDetails(${orders.length - 1 - index})" title="View Details">👁️</button>
                <button class="btn-action" onclick="deleteCustomerOrder(${orders.length - 1 - index})" title="Delete" style="color: #dc3545;">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    console.log('Customer orders loaded successfully');
}

function refreshCustomerOrders() {
    loadCustomerOrders();
    alert('Customer orders refreshed!');
}

function viewOrderDetails(index) {
    const orders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    const order = orders[index];
    
    if (!order) {
        alert('Order not found!');
        return;
    }
    
    const foodInfo = order.food ? `${order.food.name} (${order.food.priceDisplay || order.food.price + ' FCFA'})` : 'N/A';
    const drinkInfo = order.drink ? `${order.drink.name} (${order.drink.priceDisplay || order.drink.price + ' FCFA'})` : 'None';
    
    let locationInfo = '';
    if (order.isOnSite) {
        locationInfo = `Dine-in at Table ${order.tableNumber}`;
    } else if (order.deliveryAddress) {
        locationInfo = 'Delivery';
    } else {
        locationInfo = `Takeaway - Pickup at Table ${order.tableNumber}`;
    }
    
    const dateInfo = order.date ? new Date(order.date).toLocaleString() : (order.orderTime || 'N/A');
    
    let deliveryInfo = '';
    if (order.deliveryAddress) {
        deliveryInfo = `\n\nDELIVERY ADDRESS:\n` +
                      `Name: ${order.deliveryAddress.name}\n` +
                      `Phone: ${order.deliveryAddress.phone}\n` +
                      `Address: ${order.deliveryAddress.street}, ${order.deliveryAddress.city}` +
                      (order.deliveryAddress.postalCode ? `, ${order.deliveryAddress.postalCode}` : '') +
                      (order.deliveryAddress.directions ? `\nDirections: ${order.deliveryAddress.directions}` : '');
    }
    
    let recommendationsInfo = '';
    if (order.specialRecommendations) {
        recommendationsInfo = `\n\nSPECIAL RECOMMENDATIONS:\n${order.specialRecommendations}`;
    }
    
    alert(`ORDER DETAILS\n\n` +
          `Order ID: ${order.orderId}\n` +
          `Status: ${order.status || 'Confirmed'}\n\n` +
          `FOOD ITEMS:\n` +
          `• ${foodInfo}\n` +
          (order.drink ? `• ${drinkInfo}\n` : '') +
          `\nLOCATION:\n${locationInfo}` +
          deliveryInfo +
          recommendationsInfo +
          `\n\nPAYMENT:\n${order.paymentMethod}\n\n` +
          `TOTAL AMOUNT:\n${order.totalAmount?.toLocaleString() || '0'} FCFA\n\n` +
          `ORDER TIME:\n${dateInfo}`);
}

function deleteCustomerOrder(index) {
    if (confirm('Are you sure you want to delete this order?')) {
        const orders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
        orders.splice(index, 1);
        localStorage.setItem('customerOrders', JSON.stringify(orders));
        loadCustomerOrders();
    }
}

// ==================== RESERVATIONS MANAGEMENT ====================
function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const tbody = document.getElementById('reservations-body');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (reservations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 30px; color: #666;">No reservations yet</td></tr>';
        return;
    }
    
    reservations.reverse().forEach((reservation, index) => {
        const row = document.createElement('tr');
        const planInfo = reservation.plan ? `${reservation.plan.name} ${reservation.plan.icon}` : 'No Plan';
        const budgetInfo = reservation.plan ? `${reservation.plan.budget.toLocaleString()} FCFA` : '0 FCFA';
        
        row.innerHTML = `
            <td>${reservation.id || `RES-${index + 1}`}</td>
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.phone}</td>
            <td>${reservation.date}</td>
            <td>${reservation.time}</td>
            <td>${reservation.guests}</td>
            <td><strong>${planInfo}</strong></td>
            <td><strong>${budgetInfo}</strong></td>
            <td>${reservation.message || 'None'}</td>
            <td><span class="status-badge status-${reservation.status || 'pending'}">${reservation.status || 'pending'}</span></td>
            <td>
                <button class="btn-action" onclick="updateReservationStatus(${reservations.length - 1 - index}, 'confirmed')" title="Confirm">✅</button>
                <button class="btn-action" onclick="updateReservationStatus(${reservations.length - 1 - index}, 'cancelled')" title="Cancel" style="color: #dc3545;">❌</button>
                <button class="btn-action" onclick="deleteReservation(${reservations.length - 1 - index})" title="Delete" style="color: #dc3545;">🗑️</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function refreshReservations() {
    loadReservations();
    alert('Reservations refreshed!');
}

function updateReservationStatus(index, status) {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    reservations[index].status = status;
    localStorage.setItem('reservations', JSON.stringify(reservations));
    loadReservations();
    alert(`Reservation ${status}!`);
}

function deleteReservation(index) {
    if (confirm('Are you sure you want to delete this reservation?')) {
        const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        reservations.splice(index, 1);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        loadReservations();
    }
}

// ==================== REVIEWS MANAGEMENT ====================
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
    const container = document.getElementById('reviews-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (reviews.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 30px; color: #666;">No customer reviews yet</p>';
        return;
    }
    
    reviews.forEach((review, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-admin-card';
        reviewCard.innerHTML = `
            <div class="review-admin-header">
                <div>
                    <h4>${review.name}</h4>
                    <p>${review.location || 'Guest'}</p>
                    <small>${new Date(review.date).toLocaleDateString()}</small>
                </div>
                <div class="review-rating">${'⭐'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            </div>
            <p class="review-comment">"${review.comment}"</p>
            <div class="review-actions">
                <button class="btn-action" onclick="deleteReview(${index})" title="Delete Review">🗑️ Delete</button>
            </div>
        `;
        container.appendChild(reviewCard);
    });
}

function refreshReviews() {
    loadReviews();
    alert('Reviews refreshed!');
}

function deleteReview(index) {
    if (confirm('Are you sure you want to delete this review?')) {
        const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        reviews.splice(index, 1);
        localStorage.setItem('customerReviews', JSON.stringify(reviews));
        loadReviews();
    }
}

// Helper function to calculate average rating
function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return '0.0';
    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return (sum / reviews.length).toFixed(1);
}

// ==================== RESERVATION PLANS MANAGEMENT ====================
function addReservationPlan() {
    const name = prompt('Plan Name (e.g., VIP Experience):');
    if (!name) return;
    
    const budget = prompt('Budget in FCFA (e.g., 150000):');
    if (!budget || isNaN(budget)) {
        alert('Invalid budget amount');
        return;
    }
    
    const description = prompt('Description:');
    const featuresInput = prompt('Features (separate with commas):');
    const features = featuresInput ? featuresInput.split(',').map(f => f.trim()) : [];
    
    const iconOptions = ['🍽️', '⭐', '👑', '💎', '🎉', '🌟', '✨', '🥂'];
    const icon = prompt(`Choose an icon (enter 1-8):\n1: ${iconOptions[0]} Basic\n2: ${iconOptions[1]} Premium\n3: ${iconOptions[2]} VIP\n4: ${iconOptions[3]} Luxury\n5: ${iconOptions[4]} Party\n6: ${iconOptions[5]} Star\n7: ${iconOptions[6]} Sparkle\n8: ${iconOptions[7]} Champagne`);
    const selectedIcon = iconOptions[parseInt(icon) - 1] || iconOptions[0];
    
    const colorOptions = ['#95a5a6', '#3498db', '#f39c12', '#9b59b6', '#e74c3c', '#1abc9c', '#34495e', '#16a085'];
    const color = colorOptions[parseInt(icon) - 1] || colorOptions[0];
    
    const plan = {
        name: name,
        budget: parseInt(budget),
        description: description || 'Custom reservation plan',
        features: features,
        icon: selectedIcon,
        color: color
    };
    
    db.addReservationPlan(plan);
    uiManager.renderReservationPlans();
    alert('Reservation plan added successfully!');
}

function editReservationPlan(id) {
    const plans = db.getReservationPlans();
    const plan = plans.find(p => p.id === id);
    
    if (!plan) {
        alert('Plan not found!');
        return;
    }
    
    const name = prompt('Plan Name:', plan.name);
    if (!name) return;
    
    const budget = prompt('Budget in FCFA:', plan.budget);
    if (!budget || isNaN(budget)) {
        alert('Invalid budget amount');
        return;
    }
    
    const description = prompt('Description:', plan.description);
    const featuresInput = prompt('Features (separate with commas):', plan.features.join(', '));
    const features = featuresInput ? featuresInput.split(',').map(f => f.trim()) : plan.features;
    
    const iconOptions = ['🍽️', '⭐', '👑', '💎', '🎉', '🌟', '✨', '🥂'];
    const iconIndex = iconOptions.indexOf(plan.icon) + 1;
    const icon = prompt(`Choose an icon (enter 1-8, current: ${iconIndex}):\n1: ${iconOptions[0]} Basic\n2: ${iconOptions[1]} Premium\n3: ${iconOptions[2]} VIP\n4: ${iconOptions[3]} Luxury\n5: ${iconOptions[4]} Party\n6: ${iconOptions[5]} Star\n7: ${iconOptions[6]} Sparkle\n8: ${iconOptions[7]} Champagne`);
    const selectedIcon = iconOptions[parseInt(icon) - 1] || plan.icon;
    
    const colorOptions = ['#95a5a6', '#3498db', '#f39c12', '#9b59b6', '#e74c3c', '#1abc9c', '#34495e', '#16a085'];
    const color = colorOptions[parseInt(icon) - 1] || plan.color;
    
    const updates = {
        name: name,
        budget: parseInt(budget),
        description: description || plan.description,
        features: features,
        icon: selectedIcon,
        color: color
    };
    
    db.updateReservationPlan(id, updates);
    uiManager.renderReservationPlans();
    alert('Reservation plan updated successfully!');
}

function deleteReservationPlan(id) {
    if (confirm('Are you sure you want to delete this reservation plan?')) {
        db.deleteReservationPlan(id);
        uiManager.renderReservationPlans();
        alert('Reservation plan deleted successfully!');
    }
}
