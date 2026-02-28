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
                    { id: 1, name: 'Margherita Pizza', description: 'Classic Italian pizza with fresh basil', price: 12990, category: 'main', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop', emoji: '🍕' },
                    { id: 2, name: 'Caesar Salad', description: 'Fresh romaine with parmesan and croutons', price: 8990, category: 'appetizer', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop', emoji: '🥗' },
                    { id: 3, name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter sauce', price: 18990, category: 'main', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop', emoji: '🐟' },
                    { id: 4, name: 'Chocolate Cake', description: 'Rich chocolate cake with vanilla cream', price: 7990, category: 'dessert', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop', emoji: '🍰' },
                    { id: 5, name: 'Cappuccino', description: 'Espresso with steamed milk', price: 4990, category: 'beverage', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=400&fit=crop', emoji: '☕' },
                    { id: 6, name: 'Chicken Pasta', description: 'Creamy chicken alfredo pasta', price: 14990, category: 'main', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=400&fit=crop', emoji: '🍝' },
                    { id: 7, name: 'Garlic Bread', description: 'Toasted bread with fresh garlic butter', price: 5990, category: 'appetizer', image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd19453?w=500&h=400&fit=crop', emoji: '🍞' },
                    { id: 8, name: 'Tiramisu', description: 'Classic Italian dessert', price: 6990, category: 'dessert', image: 'https://images.unsplash.com/photo-1571115764595-644a60f1e302?w=500&h=400&fit=crop', emoji: '🎂' },
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
                        name: 'Family Package', 
                        budget: 75000, 
                        description: 'Perfect for family gatherings with special kids menu',
                        features: ['Family-friendly seating', 'Kids menu included', 'Complimentary soft drinks', 'Birthday cake option', 'Family photo service'],
                        icon: '👨‍👩‍👧‍👦',
                        color: '#27ae60'
                    },
                    { 
                        id: 3, 
                        name: 'Premium Dining', 
                        budget: 100000, 
                        description: 'Enhanced dining with premium dishes and beverages',
                        features: ['Premium seating', 'Extended menu with special dishes', 'Priority service', 'Complimentary appetizer'],
                        icon: '⭐',
                        color: '#3498db'
                    },
                    { 
                        id: 4, 
                        name: 'Romantic Evening', 
                        budget: 150000, 
                        description: 'Perfect for couples with intimate ambiance',
                        features: ['Private corner table', 'Candlelight setup', 'Rose bouquet', 'Champagne bottle', 'Romantic music playlist', 'Dessert platter'],
                        icon: '💑',
                        color: '#e74c3c'
                    },
                    { 
                        id: 5, 
                        name: 'VIP Experience', 
                        budget: 200000, 
                        description: 'Exclusive VIP treatment with finest cuisine',
                        features: ['Private VIP section', 'Full menu including chef specials', 'Dedicated server', 'Complimentary wine pairing', 'Personalized menu'],
                        icon: '👑',
                        color: '#f39c12'
                    },
                    { 
                        id: 6, 
                        name: 'Business Dining', 
                        budget: 250000, 
                        description: 'Professional setting for corporate meetings',
                        features: ['Private meeting room', 'High-speed WiFi', 'Presentation screen', 'Business lunch menu', 'Coffee & tea service', 'Conference call setup'],
                        icon: '💼',
                        color: '#34495e'
                    },
                    { 
                        id: 7, 
                        name: 'Chef\'s Table', 
                        budget: 350000, 
                        description: 'Exclusive experience at the chef\'s table',
                        features: ['Chef\'s table seating', 'Multi-course tasting menu', 'Kitchen tour', 'Chef interaction', 'Wine pairing', 'Signed menu card'],
                        icon: '👨‍🍳',
                        color: '#16a085'
                    },
                    { 
                        id: 8, 
                        name: 'Luxury Package', 
                        budget: 500000, 
                        description: 'Ultimate luxury dining experience',
                        features: ['Private dining room', 'Custom chef-prepared menu', 'Personal sommelier', 'Live music/entertainment', 'Valet parking', 'Premium champagne'],
                        icon: '💎',
                        color: '#9b59b6'
                    },
                    { 
                        id: 9, 
                        name: 'Anniversary Special', 
                        budget: 180000, 
                        description: 'Celebrate your special milestone with elegance',
                        features: ['Decorated private area', 'Custom anniversary cake', 'Photo session', 'Memory book', 'Champagne toast', 'Live violin music'],
                        icon: '💝',
                        color: '#c0392b'
                    },
                    { 
                        id: 10, 
                        name: 'Birthday Celebration', 
                        budget: 120000, 
                        description: 'Make your birthday unforgettable',
                        features: ['Birthday decorations', 'Custom cake design', 'Party favors', 'Special birthday menu', 'Photo booth setup', 'Music selection'],
                        icon: '🎂',
                        color: '#e67e22'
                    },
                    { 
                        id: 11, 
                        name: 'Garden Dining', 
                        budget: 130000, 
                        description: 'Outdoor dining experience in our beautiful garden',
                        features: ['Garden terrace seating', 'Natural ambiance', 'BBQ options', 'Fresh cocktails', 'Sunset view', 'Live acoustic music'],
                        icon: '🌺',
                        color: '#1abc9c'
                    },
                    { 
                        id: 12, 
                        name: 'Executive Package', 
                        budget: 800000, 
                        description: 'The pinnacle of luxury for high-profile events',
                        features: ['Entire restaurant reservation', 'Custom event planning', 'Celebrity chef service', 'Full bar service', 'Security detail', 'Red carpet entry', 'Professional photography', 'Live band performance'],
                        icon: '🏆',
                        color: '#8e44ad'
                    }
                ],
                complaints: [],
                shippingZones: [
                    { id: 1, name: 'Yaounde Centre', fee: 3500, status: 'active' },
                    { id: 2, name: 'Yaounde Bastos', fee: 3500, status: 'active' },
                    { id: 3, name: 'Yaounde Nlongkak', fee: 4000, status: 'active' },
                    { id: 4, name: 'Douala Akwa', fee: 4000, status: 'active' },
                    { id: 5, name: 'Douala Bonanjo', fee: 4000, status: 'active' },
                ],
                paymentMethods: [
                    { id: 1, name: 'Orange Money', code: 'orange', emoji: '🟠', status: 'active', description: 'Mobile money via Orange' },
                    { id: 2, name: 'MTN Mobile Money', code: 'mtn', emoji: '🟡', status: 'active', description: 'Mobile money via MTN' },
                    { id: 3, name: 'Cash on Delivery', code: 'cash', emoji: '💵', status: 'active', description: 'Pay when order arrives' },
                ]
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

    updateMenuItem(id, item) {
        const data = this.getData();
        const index = data.menuItems.findIndex(m => m.id === id);
        if (index !== -1) {
            data.menuItems[index] = { ...data.menuItems[index], ...item, id };
            this.saveData(data);
            return data.menuItems[index];
        }
        return null;
    }

    deleteMenuItem(id) {
        const data = this.getData();
        data.menuItems = data.menuItems.filter(m => m.id !== id);
        this.saveData(data);
        return true;
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

    // Shipping Zone operations
    getShippingZones() {
        const data = this.getData();
        if (!data.shippingZones) {
            data.shippingZones = [];
            this.saveData(data);
        }
        return data.shippingZones;
    }

    addShippingZone(zone) {
        const data = this.getData();
        if (!data.shippingZones) data.shippingZones = [];
        zone.id = Math.max(...data.shippingZones.map(z => z.id || 0), 0) + 1;
        zone.status = zone.status || 'active';
        data.shippingZones.push(zone);
        this.saveData(data);
        return zone;
    }

    updateShippingZone(id, updates) {
        const data = this.getData();
        if (!data.shippingZones) return null;
        const zone = data.shippingZones.find(z => z.id === id);
        if (zone) {
            Object.assign(zone, updates);
            this.saveData(data);
        }
        return zone;
    }

    deleteShippingZone(id) {
        const data = this.getData();
        if (!data.shippingZones) return false;
        data.shippingZones = data.shippingZones.filter(z => z.id !== id);
        this.saveData(data);
        return true;
    }

    // Payment Method operations
    getPaymentMethods() {
        const data = this.getData();
        if (!data.paymentMethods) {
            data.paymentMethods = [];
            this.saveData(data);
        }
        return data.paymentMethods;
    }

    addPaymentMethod(method) {
        const data = this.getData();
        if (!data.paymentMethods) data.paymentMethods = [];
        method.id = Math.max(...data.paymentMethods.map(m => m.id || 0), 0) + 1;
        method.status = method.status || 'active';
        data.paymentMethods.push(method);
        this.saveData(data);
        return method;
    }

    updatePaymentMethod(id, updates) {
        const data = this.getData();
        if (!data.paymentMethods) return null;
        const method = data.paymentMethods.find(m => m.id === id);
        if (method) {
            Object.assign(method, updates);
            this.saveData(data);
        }
        return method;
    }

    deletePaymentMethod(id) {
        const data = this.getData();
        if (!data.paymentMethods) return false;
        data.paymentMethods = data.paymentMethods.filter(m => m.id !== id);
        this.saveData(data);
        return true;
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
        document.getElementById('add-item-btn').addEventListener('click', () => {
            document.getElementById('item-id').value = '';
            document.getElementById('menu-modal-title').textContent = 'Add Menu Item';
            document.getElementById('menu-form-submit').textContent = 'Add Item';
            document.getElementById('menu-form-cancel').style.display = 'none';
            document.getElementById('menu-form').reset();
            this.openModal('menu-modal');
        });
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

        // Cancel edit button for menu
        document.getElementById('menu-form-cancel').addEventListener('click', () => {
            document.getElementById('menu-form').reset();
            document.getElementById('item-id').value = '';
            document.getElementById('menu-modal-title').textContent = 'Add Menu Item';
            document.getElementById('menu-form-submit').textContent = 'Add Item';
            document.getElementById('menu-form-cancel').style.display = 'none';
            this.closeModal('menu-modal');
        });

        // Search functionality
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            // require pressing Enter before searching
            searchBox.setAttribute('placeholder', 'Type name then press Enter');
            searchBox.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const searchTerm = e.target.value.trim().toLowerCase();
                    // only search when there is some text
                    if (searchTerm) this.performSearch(searchTerm);
                }
            });
        }

        // Settings button
        const settingsBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('⚙️'));
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showSettings();
            });
        }

        // QR code actions
        const genBtn = document.getElementById('generate-qr-btn');
        if (genBtn) genBtn.addEventListener('click', () => this.generateMenuQRCode());
        const downloadBtn = document.getElementById('download-qr-btn');
        if (downloadBtn) downloadBtn.addEventListener('click', () => this.downloadMenuQRCode());
        const printBtn = document.getElementById('print-qr-btn');
        if (printBtn) printBtn.addEventListener('click', () => this.printMenuQRCode());

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.clear();
                window.location.href = 'admin-login.html';
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
            complaints: 'Customer Complaints & Feedback',
            tables: 'Table Management',
            orders: 'Order Management',
            menu: 'Menu Management',
            inventory: 'Inventory Management',
            staff: 'Staff Management',
            billing: 'Billing & Invoices',
            'shipping-zones': 'Shipping Zones Management',
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
        } else if (tabName === 'complaints') {
            loadComplaints();
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
        } else if (tabName === 'shipping-zones') {
            this.renderShippingZones();
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
        
        // Get customer data from website - Try restaurantOrders first (from checkout), then fallback to customerOrders
        let customerOrders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
        if (customerOrders.length === 0) {
            customerOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
        }
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

        // ensure QR code is there when dashboard loads
        this.generateMenuQRCode();
    }

    // -------- QR CODE SECTION --------
    generateMenuQRCode() {
        const container = document.getElementById('qr-container');
        if (!container) return;
        container.innerHTML = ''; // clear any previous
        // build absolute URL to menu page
        const origin = window.location.origin || (window.location.protocol + '//' + window.location.host);
        const menuUrl = origin + '/menu.html';
        try {
            new QRCode(container, {
                text: menuUrl,
                width: 150,
                height: 150,
                colorDark : '#000000',
                colorLight : '#ffffff',
                correctLevel : QRCode.CorrectLevel.H
            });
        } catch (e) {
            console.error('Failed to generate QR code:', e);
        }
        // show download/print buttons
        document.getElementById('download-qr-btn').style.display = 'inline-block';
        document.getElementById('print-qr-btn').style.display = 'inline-block';
    }

    downloadMenuQRCode() {
        const container = document.getElementById('qr-container');
        if (!container) return;
        const img = container.querySelector('img') || container.querySelector('canvas');
        if (!img) return;
        let dataUrl;
        if (img.tagName === 'IMG') {
            dataUrl = img.src;
        } else {
            dataUrl = img.toDataURL('image/png');
        }
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'menu-qr.png';
        a.click();
    }

    printMenuQRCode() {
        const container = document.getElementById('qr-container');
        if (!container) return;
        const img = container.querySelector('img') || container.querySelector('canvas');
        if (!img) return;
        const win = window.open('');
        if (img.tagName === 'IMG') {
            win.document.write('<img src="' + img.src + '" onload="window.print();window.close();"/>');
        } else {
            win.document.write('<img src="' + img.toDataURL('image/png') + '" onload="window.print();window.close();"/>');
        }
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
        // Load customer orders from restaurantOrders (checkout) first, fallback to customerOrders
        let customerOrders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]'); // Website orders
        if (customerOrders.length === 0) {
            customerOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
        }
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
            <div class="menu-card" data-searchable="true">
                <div class="menu-image">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 5px;">` : `<div style="width: 100%; height: 150px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; border-radius: 5px; font-size: 48px;">${item.emoji || '🍽️'}</div>`}
                </div>
                <div class="menu-content">
                    <div class="menu-name">${item.name}</div>
                    <div class="menu-description">${item.description}</div>
                    <div class="menu-category">${item.category.toUpperCase()}</div>
                    <div class="menu-price">${item.price.toLocaleString()} FCFA</div>
                    <div style="display: flex; gap: 8px; margin-top: 10px;">
                        <button class="btn-secondary" onclick="app.editMenuItem(${item.id})" style="flex: 1; padding: 8px; font-size: 12px;">✏️ Edit</button>
                        <button class="btn-danger" onclick="app.deleteMenuItem(${item.id})" style="flex: 1; padding: 8px; font-size: 12px;">🗑️ Delete</button>
                    </div>
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

    // Shipping Zones
    renderShippingZones() {
        const zones = this.db.getShippingZones();
        const zonesListEl = document.getElementById('shipping-zones-list');
        
        const html = zones.length > 0 
            ? zones.map(zone => `
                <div class="shipping-zone-card" style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 8px 0; color: #333;">${zone.name}</h3>
                        <p style="margin: 5px 0; color: #666;">
                            <strong>Fee:</strong> ${zone.fee.toLocaleString()} FCFA
                        </p>
                        <p style="margin: 5px 0; color: #666;">
                            <strong>Status:</strong> <span style="background: ${zone.status === 'active' ? '#4caf50' : '#f44336'}; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px;">${zone.status.toUpperCase()}</span>
                        </p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn-secondary" onclick="uiManager.editShippingZone(${zone.id})" style="padding: 8px 12px;">✏️ Edit</button>
                        <button class="btn-danger" onclick="uiManager.deleteShippingZone(${zone.id})" style="padding: 8px 12px;">🗑️ Delete</button>
                    </div>
                </div>
            `).join('')
            : '<p class="empty-state">No shipping zones configured. Add your first zone to enable shipping.</p>';
        
        zonesListEl.innerHTML = html;
        
        // Attach event listeners
        document.getElementById('add-shipping-zone-btn').addEventListener('click', () => {
            document.getElementById('shipping-zone-id').value = '';
            document.getElementById('shipping-zone-name').value = '';
            document.getElementById('shipping-zone-fee').value = '';
            document.getElementById('shipping-zone-status').value = 'active';
            document.getElementById('shipping-zone-modal-title').textContent = 'Add Shipping Zone';
            document.getElementById('shipping-zone-form-submit').textContent = 'Add Zone';
            this.openModal('shipping-zone-modal');
        });

        document.getElementById('shipping-zone-form').addEventListener('submit', (e) => {
            this.handleAddShippingZone(e);
        });

        // Setup close buttons for modal
        const modal = document.getElementById('shipping-zone-modal');
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => this.closeModal('shipping-zone-modal'));
    }

    editShippingZone(id) {
        const zones = this.db.getShippingZones();
        const zone = zones.find(z => z.id === id);
        if (zone) {
            document.getElementById('shipping-zone-id').value = zone.id;
            document.getElementById('shipping-zone-name').value = zone.name;
            document.getElementById('shipping-zone-fee').value = zone.fee;
            document.getElementById('shipping-zone-status').value = zone.status;
            document.getElementById('shipping-zone-modal-title').textContent = 'Edit Shipping Zone';
            document.getElementById('shipping-zone-form-submit').textContent = 'Save Changes';
            this.openModal('shipping-zone-modal');
        }
    }

    handleAddShippingZone(e) {
        e.preventDefault();
        
        const id = document.getElementById('shipping-zone-id').value;
        const name = document.getElementById('shipping-zone-name').value;
        const fee = parseFloat(document.getElementById('shipping-zone-fee').value);
        const status = document.getElementById('shipping-zone-status').value;

        if (!name || isNaN(fee) || fee < 0) {
            alert('Please fill in all fields correctly');
            return;
        }

        if (id) {
            // Update existing zone
            this.db.updateShippingZone(parseInt(id), { name, fee, status });
            alert('Shipping zone updated successfully!');
        } else {
            // Add new zone
            this.db.addShippingZone({ name, fee, status });
            alert('Shipping zone added successfully!');
        }

        this.closeModal('shipping-zone-modal');
        this.renderShippingZones();
    }

    deleteShippingZone(id) {
        if (confirm('Are you sure you want to delete this shipping zone?')) {
            this.db.deleteShippingZone(id);
            this.renderShippingZones();
        }
    }

    // Reports
    renderReports() {
        const orders = this.db.getOrders();
        const billing = this.db.getBilling();
        const tables = this.db.getTables();
        
        // Get customer orders from website
        let customerOrders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
        if (customerOrders.length === 0) {
            customerOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
        }
        const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
        
        // Calculate from INTERNAL orders
        const internalOrdersTotal = orders.length;
        const internalCompleted = orders.filter(o => o.status === 'completed').length;
        const internalRevenue = billing.reduce((sum, b) => sum + (b.amount || 0), 0);
        
        // Calculate from CUSTOMER orders
        const customerOrdersTotal = customerOrders.length;
        const customerRevenue = customerOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        
        // TOTAL across all sources
        const totalOrders = internalOrdersTotal + customerOrdersTotal;
        const totalRevenue = internalRevenue + customerRevenue;
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        const occupancyRate = tables.length > 0 ? (tables.filter(t => t.status === 'occupied').length / tables.length) * 100 : 0;
        
        // Calculate customer metrics
        const avgReviewRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1) : 0;
        const reservationCount = reservations.length;

        const html = `
            <div class="report-card">
                <h3>📊 Total Orders</h3>
                <div class="report-data">${totalOrders}</div>
                <div class="report-change">Internal: ${internalOrdersTotal} | Website: ${customerOrdersTotal}</div>
            </div>
            <div class="report-card">
                <h3>💰 Total Revenue</h3>
                <div class="report-data">${totalRevenue.toLocaleString()} FCFA</div>
                <div class="report-change">Internal: ${internalRevenue.toLocaleString()} | Website: ${customerRevenue.toLocaleString()}</div>
            </div>
            <div class="report-card">
                <h3>🪑 Table Occupancy</h3>
                <div class="report-data">${occupancyRate.toFixed(1)}%</div>
                <div class="report-change">Occupied: ${tables.filter(t => t.status === 'occupied').length}/${tables.length}</div>
            </div>
            <div class="report-card">
                <h3>💵 Avg Order Value</h3>
                <div class="report-data">${avgOrderValue.toLocaleString()} FCFA</div>
                <div class="report-change">Total revenue ÷ Total orders</div>
            </div>
            <div class="report-card">
                <h3>📅 Reservations</h3>
                <div class="report-data">${reservationCount}</div>
                <div class="report-change">Pending bookings</div>
            </div>
            <div class="report-card">
                <h3>⭐ Avg Review Rating</h3>
                <div class="report-data">${avgReviewRating}⭐</div>
                <div class="report-change">From ${reviews.length} reviews</div>
            </div>
            <div class="report-card">
                <h3>✅ Completed Orders</h3>
                <div class="report-data">${internalCompleted}</div>
                <div class="report-change">Internal orders done</div>
            </div>
            <div class="report-card">
                <h3>🔄 Pending Orders</h3>
                <div class="report-data">${internalOrdersTotal - internalCompleted}</div>
                <div class="report-change">Awaiting completion</div>
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
        const itemId = document.getElementById('item-id').value;
        const imageFile = document.getElementById('item-image-file').files[0];
        const imageUrl = document.getElementById('item-image-url').value;
        
        // Handle image
        let imageData = imageUrl || null;
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const item = {
                    name: document.getElementById('item-name').value,
                    description: document.getElementById('item-description').value,
                    price: parseFloat(document.getElementById('item-price').value),
                    category: document.getElementById('item-category').value,
                    emoji: '🍽️',
                    image: event.target.result
                };
                this.saveMenuItem(item, itemId);
            };
            reader.readAsDataURL(imageFile);
        } else {
            const item = {
                name: document.getElementById('item-name').value,
                description: document.getElementById('item-description').value,
                price: parseFloat(document.getElementById('item-price').value),
                category: document.getElementById('item-category').value,
                emoji: '🍽️',
                image: imageData
            };
            this.saveMenuItem(item, itemId);
        }
    }

    saveMenuItem(item, itemId) {
        if (itemId) {
            this.db.updateMenuItem(parseInt(itemId), item);
            alert('Menu item updated successfully!');
        } else {
            this.db.addMenuItem(item);
            alert('Menu item added successfully!');
        }
        this.closeModal('menu-modal');
        document.getElementById('menu-form').reset();
        document.getElementById('item-id').value = '';
        document.getElementById('menu-modal-title').textContent = 'Add Menu Item';
        document.getElementById('menu-form-submit').textContent = 'Add Item';
        document.getElementById('menu-form-cancel').style.display = 'none';
        this.renderMenuItems();
    }

    editMenuItem(id) {
        const item = this.db.getMenuItems().find(m => m.id === id);
        if (item) {
            document.getElementById('item-id').value = id;
            document.getElementById('item-name').value = item.name;
            document.getElementById('item-description').value = item.description;
            document.getElementById('item-price').value = item.price;
            document.getElementById('item-category').value = item.category;
            document.getElementById('item-image-url').value = item.image || '';
            document.getElementById('menu-modal-title').textContent = 'Edit Menu Item';
            document.getElementById('menu-form-submit').textContent = 'Update Item';
            document.getElementById('menu-form-cancel').style.display = 'inline-block';
            this.openModal('menu-modal');
        }
    }

    deleteMenuItem(id) {
        if (confirm('Are you sure you want to delete this menu item?')) {
            this.db.deleteMenuItem(id);
            alert('Menu item deleted successfully!');
            this.renderMenuItems();
        }
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

    performSearch(searchTerm) {
        if (!searchTerm) {
            // Show all items if search is empty
            document.querySelectorAll('[data-searchable]').forEach(item => {
                item.style.display = '';
            });
            return;
        }

        const results = [];
        const tables = this.db.getData().tables || [];
        const menuItems = this.db.getData().menuItems || [];
        const orders = this.db.getData().orders || [];
        const staff = this.db.getData().staff || [];

        // Search across all sections
        tables.forEach(t => {
            if (t.number.toLowerCase() === searchTerm) {
                results.push(`Table ${t.number}`);
            }
        });

        menuItems.forEach(m => {
            if (m.name.toLowerCase() === searchTerm) {
                results.push(`Menu: ${m.name}`);
            }
        });

        orders.forEach(o => {
            if (o.id.toLowerCase() === searchTerm) {
                results.push(`Order: ${o.id}`);
            }
        });

        staff.forEach(s => {
            if (s.name.toLowerCase() === searchTerm) {
                results.push(`Staff: ${s.name}`);
            }
        });

        if (results.length === 0) {
            alert(`No results found for "${searchTerm}"`);
        } else {
            alert(`Found ${results.length} result(s):\n\n${results.join('\n')}`);
        }
    }

    showSettings() {
        const settings = `
Restaurant Management System Settings
=====================================

Current Settings:
✓ Theme: Professional
✓ Currency: FCFA
✓ Date Format: DD/MM/YYYY
✓ Time Format: 24-hour

Features:
• Real-time Dashboard
• Multi-user Support
• Inventory Tracking
• Order Management
• Staff Management
• Billing System
• Reports & Analytics
• Reservation Planning
• Customer Reviews

Version: 1.0.0
Last Updated: January 2026
        `;
        alert(settings);
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

    db = new RestaurantDB();
    uiManager = new UIManager(db);
    // Expose app as global for onclick handlers
    window.app = uiManager;
    uiManager.renderDashboard();
    
    console.log('Admin dashboard initialized');
    console.log('Available tabs: dashboard, customer-orders, reservations, reviews, complaints, tables, orders, menu, inventory, staff, billing, reports');
    
    // Pre-load data for new sections (but don't display them yet)
    console.log('Pre-loading customer data...');
    let customerOrders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
    if (customerOrders.length === 0) {
        customerOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    }
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const customerReviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
    const customerComplaints = JSON.parse(localStorage.getItem('customerComplaints') || '[]');
    
    console.log(`Found ${customerOrders.length} customer orders`);
    console.log(`Found ${reservations.length} reservations`);
    console.log(`Found ${customerReviews.length} customer reviews`);
    console.log(`Found ${customerComplaints.length} customer complaints`);
});

// ==================== CUSTOMER ORDERS MANAGEMENT ====================
function loadCustomerOrders() {
    // Load orders from restaurantOrders (from checkout) and fallback to customerOrders for backwards compatibility
    let orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
    if (orders.length === 0) {
        orders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    }
    const tbody = document.getElementById('customer-orders-body');
    
    if (!tbody) {
        console.log('customer-orders-body element not found');
        return;
    }
    
    tbody.innerHTML = '';
    
    console.log('Loading customer orders:', orders.length);
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 30px; color: #666;">No customer orders yet. Orders placed from the website will appear here.</td></tr>';
        return;
    }
    
    // Reverse to show newest first
    const reversedOrders = [...orders].reverse();
    
    reversedOrders.forEach((order, index) => {
        const row = document.createElement('tr');
        const dateStr = order.timestamp || new Date().toLocaleString();
        
        // Get payment method display name
        const paymentMethodNames = {
            'orange': '🟠 Orange Money',
            'mtn': '🟡 MTN Mobile Money',
            'cash': '💵 Cash on Delivery'
        };
        const paymentDisplay = paymentMethodNames[order.paymentMethod] || order.paymentMethod;
        
        // Get delivery type display
        const deliveryTypeDisplay = order.deliveryType === 'delivery' ? '🚚 Home Delivery' : '🏪 Pickup';
        
        // Get shipping zone name
        let shippingZoneDisplay = '—';
        if (order.deliveryType === 'delivery' && order.shippingZone) {
            try {
                const data = JSON.parse(localStorage.getItem('restaurantData'));
                const zones = data.shippingZones || [];
                const zone = zones.find(z => z.id == order.shippingZone);
                shippingZoneDisplay = zone ? zone.name : 'Unknown Zone';
            } catch (e) {
                shippingZoneDisplay = 'Zone ' + order.shippingZone;
            }
        }
        
        const totalAmount = order.totals?.total || 0;
        
        row.innerHTML = `
            <td><strong>${order.orderId}</strong></td>
            <td>${order.fullName}</td>
            <td>${order.email}</td>
            <td>${order.phone}</td>
            <td>${deliveryTypeDisplay}</td>
            <td>${shippingZoneDisplay}</td>
            <td>${paymentDisplay}</td>
            <td><strong>$${totalAmount.toFixed(2)}</strong></td>
            <td>${dateStr}</td>
            <td style="white-space: nowrap;">
                <button class="btn-action" onclick="viewWebOrderDetails(${orders.length - 1 - index})" title="View Details">👁️</button>
                <button class="btn-action" onclick="deleteWebOrder(${orders.length - 1 - index})" title="Delete" style="color: #dc3545;">🗑️</button>
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

function viewWebOrderDetails(index) {
    const orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
    const order = orders[index];
    
    if (!order) {
        alert('Order not found!');
        return;
    }
    
    // Get payment method display name
    const paymentMethodNames = {
        'orange': '🟠 Orange Money',
        'mtn': '🟡 MTN Mobile Money',
        'cash': '💵 Cash on Delivery'
    };
    const paymentDisplay = paymentMethodNames[order.paymentMethod] || order.paymentMethod;
    
    // Get delivery type display
    const deliveryTypeDisplay = order.deliveryType === 'delivery' ? '🚚 Home Delivery' : '🏪 Pickup';
    
    // Get shipping zone name
    let shippingZoneDisplay = 'N/A';
    if (order.deliveryType === 'delivery' && order.shippingZone) {
        try {
            const data = JSON.parse(localStorage.getItem('restaurantData'));
            const zones = data.shippingZones || [];
            const zone = zones.find(z => z.id == order.shippingZone);
            shippingZoneDisplay = zone ? zone.name : 'Unknown Zone';
        } catch (e) {
            shippingZoneDisplay = 'Zone ' + order.shippingZone;
        }
    }
    
    // Build items list
    const itemsList = order.items.map(item => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    
    // Build detailed info
    let detailsHTML = `
    ╔════════════════════════════════════════╗
    ║           ORDER RECEIPT                ║
    ╚════════════════════════════════════════╝
    
    ORDER ID: ${order.orderId}
    DATE: ${order.timestamp}
    
    ─────────────────────────────────────────
    CUSTOMER INFORMATION
    ─────────────────────────────────────────
    Name: ${order.fullName}
    Email: ${order.email}
    Phone: ${order.phone}
    
    ─────────────────────────────────────────
    DELIVERY DETAILS
    ─────────────────────────────────────────
    Type: ${deliveryTypeDisplay}
    ${order.deliveryType === 'delivery' ? `Zone: ${shippingZoneDisplay}` : ''}
    ${order.deliveryType === 'delivery' ? `Address: ${order.address}, ${order.city} ${order.zip}` : `Note: Customer will pickup the order`}
    ${order.notes ? `Special Instructions: ${order.notes}` : ''}
    
    ─────────────────────────────────────────
    ORDER ITEMS
    ─────────────────────────────────────────
    ${itemsList}
    
    ─────────────────────────────────────────
    PAYMENT BREAKDOWN
    ─────────────────────────────────────────
    Subtotal:        $${order.totals.subtotal.toFixed(2)}
    Tax (10%):       $${order.totals.tax.toFixed(2)}
    ${order.totals.shippingFee ? `Shipping Fee:    $${order.totals.shippingFee.toFixed(2)}` : ''}
    ${order.totals.shippingFee ? '─────────────────────────────────────────' : ''}
    TOTAL:           $${order.totals.total.toFixed(2)}
    
    Payment Method: ${paymentDisplay}
    
    ─────────────────────────────────────────
    Thank you for your order!
    ─────────────────────────────────────────
    `;
    
    alert(detailsHTML);
}

function deleteWebOrder(index) {
    if (confirm('Are you sure you want to delete this order?')) {
        const orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
        orders.splice(index, 1);
        localStorage.setItem('restaurantOrders', JSON.stringify(orders));
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

// ==================== COMPLAINTS MANAGEMENT ====================

function loadComplaints() {
    // Load complaints from localStorage directly (not from restaurantData)
    try {
        const complaintData = localStorage.getItem('customerComplaints');
        console.log('Raw complaint data from localStorage:', complaintData);
        const complaints = JSON.parse(complaintData || '[]');
        console.log('Parsed complaints:', complaints);
        console.log('Number of complaints:', complaints.length);
        renderComplaints(complaints);
    } catch (e) {
        console.error('Error loading complaints:', e);
        renderComplaints([]);
    }
}

function renderComplaints(complaints) {
    const container = document.getElementById('complaints-container');
    
    if (!complaints || complaints.length === 0) {
        container.innerHTML = '<p class="empty-state">No complaints yet</p>';
        return;
    }

    const complaintHTML = complaints.map(complaint => {
        const priorityIcon = {
            'high': '🔴',
            'medium': '🟡',
            'low': '🟢'
        }[complaint.priority] || '⚫';

        const statusColor = {
            'pending': '#ff9800',
            'reviewing': '#2196F3',
            'resolved': '#4CAF50'
        }[complaint.status] || '#999';

        const statusIcon = {
            'pending': '⏳',
            'reviewing': '👀',
            'resolved': '✅'
        }[complaint.status] || '❓';

        const createdDate = new Date(complaint.createdAt).toLocaleDateString();
        const createdTime = new Date(complaint.createdAt).toLocaleTimeString();

        return `
            <div class="complaint-card" style="
                background: white;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 15px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                border-left: 4px solid ${statusColor};
            ">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                    <div>
                        <h3 style="color: #333; margin: 0 0 8px 0; font-size: 1.1rem;">
                            ${priorityIcon} ${complaint.subject}
                        </h3>
                        <p style="color: #666; margin: 0; font-size: 0.9rem;">
                            <strong>From:</strong> ${complaint.name} (${complaint.email})
                            ${complaint.phone ? `<br><strong>Phone:</strong> ${complaint.phone}` : ''}
                        </p>
                    </div>
                    <span style="
                        background: ${statusColor};
                        color: white;
                        padding: 6px 12px;
                        border-radius: 20px;
                        font-size: 0.85rem;
                        font-weight: 600;
                        white-space: nowrap;
                        margin-left: 10px;
                    ">
                        ${statusIcon} ${complaint.status.toUpperCase()}
                    </span>
                </div>

                <div style="background: #f5f5f5; padding: 12px; border-radius: 5px; margin-bottom: 12px;">
                    <p style="color: #555; margin: 0; line-height: 1.5;">
                        ${complaint.message}
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; margin-bottom: 12px; font-size: 0.85rem;">
                    <div>
                        <strong style="color: #666;">Type:</strong>
                        <p style="color: #999; margin: 3px 0 0 0;">${complaint.complaintType.replace('-', ' ').toUpperCase()}</p>
                    </div>
                    <div>
                        <strong style="color: #666;">Priority:</strong>
                        <p style="color: #999; margin: 3px 0 0 0;">${complaint.priority.toUpperCase()}</p>
                    </div>
                    <div>
                        <strong style="color: #666;">Date:</strong>
                        <p style="color: #999; margin: 3px 0 0 0;">${createdDate}</p>
                    </div>
                    <div>
                        <strong style="color: #666;">ID:</strong>
                        <p style="color: #999; margin: 3px 0 0 0;">${complaint.id}</p>
                    </div>
                </div>

                ${complaint.orderId ? `
                    <div style="background: #e3f2fd; padding: 8px 12px; border-radius: 5px; margin-bottom: 12px; font-size: 0.9rem;">
                        <strong>Related Order:</strong> ${complaint.orderId}
                    </div>
                ` : ''}

                <div style="display: flex; gap: 8px;">
                    <select onchange="updateComplaintStatus('${complaint.id}', this.value)" style="
                        padding: 8px 12px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 0.9rem;
                        flex: 1;
                    ">
                        <option value="">Update Status...</option>
                        <option value="pending" ${complaint.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="reviewing" ${complaint.status === 'reviewing' ? 'selected' : ''}>Reviewing</option>
                        <option value="resolved" ${complaint.status === 'resolved' ? 'selected' : ''}>Resolved</option>
                    </select>
                    <button onclick="replyToComplaint('${complaint.id}')" class="btn-secondary" style="padding: 8px 15px; font-size: 0.9rem;">
                        📧 Reply
                    </button>
                    <button onclick="deleteComplaint('${complaint.id}')" class="btn-secondary" style="padding: 8px 15px; font-size: 0.9rem; background: #e74c3c; color: white;">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = complaintHTML;
}

function filterComplaints(status) {
    let complaints = JSON.parse(localStorage.getItem('customerComplaints') || '[]');
    
    if (status) {
        complaints = complaints.filter(c => c.status === status);
    }
    
    renderComplaints(complaints);
}

function updateComplaintStatus(id, status) {
    if (!status) return;
    
    let complaints = JSON.parse(localStorage.getItem('customerComplaints') || '[]');
    const complaint = complaints.find(c => c.id === id);
    
    if (complaint) {
        complaint.status = status;
        localStorage.setItem('customerComplaints', JSON.stringify(complaints));
        loadComplaints();
        alert(`Complaint status updated to: ${status}`);
    }
}

function replyToComplaint(id) {
    let complaints = JSON.parse(localStorage.getItem('customerComplaints') || '[]');
    const complaint = complaints.find(c => c.id === id);
    
    if (!complaint) return;
    
    const reply = prompt('Enter your reply (will be sent to ' + complaint.email + '):', '');
    
    if (reply === null) return;
    
    if (!reply.trim()) {
        alert('Please enter a reply message');
        return;
    }
    
    // In a real application, this would send an email
    // For now, we'll just show a message
    alert(`Reply sent to ${complaint.email}:\n\n"${reply}"`);
    
    // Update complaint status to reviewing if it was pending
    if (complaint.status === 'pending') {
        complaint.status = 'reviewing';
        localStorage.setItem('customerComplaints', JSON.stringify(complaints));
    }
    
    loadComplaints();
}

function deleteComplaint(id) {
    if (!confirm('Are you sure you want to delete this complaint? This action cannot be undone.')) {
        return;
    }
    
    let complaints = JSON.parse(localStorage.getItem('customerComplaints') || '[]');
    complaints = complaints.filter(c => c.id !== id);
    localStorage.setItem('customerComplaints', JSON.stringify(complaints));
    loadComplaints();
    alert('Complaint deleted successfully');
}