// ==================== OPTIONAL NODE.JS SERVER ====================
// This is an optional backend server for those who want to use a real database
// To use: 
// 1. Install Node.js from nodejs.org
// 2. Install dependencies: npm install express cors sqlite3 body-parser
// 3. Run: node server.js
// 4. Update app.js to make API calls instead of localStorage

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

// Create tables
db.serialize(() => {
    // Tables
    db.run(`CREATE TABLE IF NOT EXISTS tables (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT UNIQUE,
        capacity INTEGER,
        type TEXT,
        status TEXT DEFAULT 'available',
        currentOrder TEXT
    )`);

    // Menu Items
    db.run(`CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price REAL,
        category TEXT,
        emoji TEXT
    )`);

    // Orders
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        tableId INTEGER,
        tableNumber TEXT,
        status TEXT DEFAULT 'pending',
        createdAt TEXT,
        completedAt TEXT,
        FOREIGN KEY (tableId) REFERENCES tables(id)
    )`);

    // Order Items
    db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderId TEXT,
        menuItemId INTEGER,
        name TEXT,
        price REAL,
        quantity INTEGER,
        notes TEXT,
        FOREIGN KEY (orderId) REFERENCES orders(id),
        FOREIGN KEY (menuItemId) REFERENCES menu_items(id)
    )`);

    // Inventory
    db.run(`CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        quantity REAL,
        unit TEXT,
        unitPrice REAL,
        minStock INTEGER
    )`);

    // Staff
    db.run(`CREATE TABLE IF NOT EXISTS staff (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        role TEXT,
        status TEXT DEFAULT 'on-duty'
    )`);

    // Billing
    db.run(`CREATE TABLE IF NOT EXISTS billing (
        id TEXT PRIMARY KEY,
        orderId TEXT,
        tableNumber TEXT,
        itemCount INTEGER,
        amount REAL,
        createdAt TEXT,
        FOREIGN KEY (orderId) REFERENCES orders(id)
    )`);

    // Insert sample data
    const now = new Date().toLocaleString();
    
    db.run("INSERT INTO tables (number, capacity, type, status) VALUES (?, ?, ?, ?)", 
           ['T01', 4, 'standard', 'available']);
    db.run("INSERT INTO tables (number, capacity, type, status) VALUES (?, ?, ?, ?)", 
           ['T02', 4, 'standard', 'available']);
    db.run("INSERT INTO tables (number, capacity, type, status) VALUES (?, ?, ?, ?)", 
           ['VIP01', 8, 'vip', 'available']);

    db.run("INSERT INTO menu_items (name, description, price, category, emoji) VALUES (?, ?, ?, ?, ?)", 
           ['Margherita Pizza', 'Classic Italian pizza', 12.99, 'main', '🍕']);
    db.run("INSERT INTO menu_items (name, description, price, category, emoji) VALUES (?, ?, ?, ?, ?)", 
           ['Caesar Salad', 'Fresh romaine with parmesan', 8.99, 'appetizer', '🥗']);

    db.run("INSERT INTO inventory (name, quantity, unit, unitPrice, minStock) VALUES (?, ?, ?, ?, ?)", 
           ['Tomato', 50, 'kg', 2.5, 10]);

    db.run("INSERT INTO staff (name, email, phone, role, status) VALUES (?, ?, ?, ?, ?)", 
           ['John Smith', 'john@restaurant.com', '555-0101', 'manager', 'on-duty']);
});

// ==================== API ENDPOINTS ====================

// TABLES
app.get('/api/tables', (req, res) => {
    db.all('SELECT * FROM tables', (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/api/tables', (req, res) => {
    const { number, capacity, type } = req.body;
    db.run('INSERT INTO tables (number, capacity, type) VALUES (?, ?, ?)', 
           [number, capacity, type], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID, ...req.body });
    });
});

app.put('/api/tables/:id', (req, res) => {
    const { id } = req.params;
    const { status, currentOrder } = req.body;
    db.run('UPDATE tables SET status = ?, currentOrder = ? WHERE id = ?', 
           [status, currentOrder, id], (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ success: true });
    });
});

// MENU ITEMS
app.get('/api/menu', (req, res) => {
    db.all('SELECT * FROM menu_items', (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/api/menu', (req, res) => {
    const { name, description, price, category, emoji } = req.body;
    db.run('INSERT INTO menu_items (name, description, price, category, emoji) VALUES (?, ?, ?, ?, ?)', 
           [name, description, price, category, emoji], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID, ...req.body });
    });
});

// ORDERS
app.get('/api/orders', (req, res) => {
    db.all('SELECT * FROM orders', (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else {
            // Fetch order items for each order
            const ordersWithItems = rows.map(order => {
                db.all('SELECT * FROM order_items WHERE orderId = ?', [order.id], (err, items) => {
                    order.items = items || [];
                });
                return order;
            });
            setTimeout(() => res.json(rows), 100);
        }
    });
});

app.post('/api/orders', (req, res) => {
    const { tableId, tableNumber } = req.body;
    const orderId = 'ORD-' + Date.now();
    const now = new Date().toLocaleString();
    
    db.run('INSERT INTO orders (id, tableId, tableNumber, createdAt) VALUES (?, ?, ?, ?)', 
           [orderId, tableId, tableNumber, now], (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: orderId, tableId, tableNumber, status: 'pending', items: [] });
    });
});

app.post('/api/orders/:id/items', (req, res) => {
    const { id } = req.params;
    const { menuItemId, name, price, quantity, notes } = req.body;
    
    db.run('INSERT INTO order_items (orderId, menuItemId, name, price, quantity, notes) VALUES (?, ?, ?, ?, ?, ?)', 
           [id, menuItemId, name, price, quantity, notes], (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ success: true });
    });
});

app.put('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status, completedAt } = req.body;
    
    db.run('UPDATE orders SET status = ?, completedAt = ? WHERE id = ?', 
           [status, completedAt, id], (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ success: true });
    });
});

// INVENTORY
app.get('/api/inventory', (req, res) => {
    db.all('SELECT * FROM inventory', (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/api/inventory', (req, res) => {
    const { name, quantity, unit, unitPrice, minStock } = req.body;
    db.run('INSERT INTO inventory (name, quantity, unit, unitPrice, minStock) VALUES (?, ?, ?, ?, ?)', 
           [name, quantity, unit, unitPrice, minStock], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID, ...req.body });
    });
});

app.put('/api/inventory/:id', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    
    db.run('UPDATE inventory SET quantity = ? WHERE id = ?', [quantity, id], (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ success: true });
    });
});

// STAFF
app.get('/api/staff', (req, res) => {
    db.all('SELECT * FROM staff', (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/api/staff', (req, res) => {
    const { name, email, phone, role } = req.body;
    db.run('INSERT INTO staff (name, email, phone, role) VALUES (?, ?, ?, ?)', 
           [name, email, phone, role], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: this.lastID, ...req.body, status: 'on-duty' });
    });
});

// BILLING
app.get('/api/billing', (req, res) => {
    db.all('SELECT * FROM billing', (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

app.post('/api/billing', (req, res) => {
    const { orderId, tableNumber, itemCount, amount } = req.body;
    const billId = 'INV-' + Date.now();
    const now = new Date().toLocaleString();
    
    db.run('INSERT INTO billing (id, orderId, tableNumber, itemCount, amount, createdAt) VALUES (?, ?, ?, ?, ?, ?)', 
           [billId, orderId, tableNumber, itemCount, amount, now], (err) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ id: billId, orderId, tableNumber, itemCount, amount, createdAt: now });
    });
});

// ANALYTICS
app.get('/api/analytics', (req, res) => {
    db.all('SELECT SUM(amount) as totalRevenue, COUNT(*) as totalOrders FROM billing', (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows[0]);
    });
});

// Default route - serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home-new.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Restaurant Management Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close();
    console.log('Database connection closed.');
    process.exit(0);
});
