# Restaurant Management System 🍽️

A fully functional, production-ready restaurant management system built with modern web technologies.

## Features

### 📊 Dashboard
- Real-time KPIs (Revenue, Orders, Table Occupancy, Staff)
- Active orders overview
- Recent transactions
- Revenue analytics

### 🪑 Table Management
- View all tables with status indicators
- Manage table occupancy
- Support for Standard, VIP, and Bar tables
- Table capacity tracking

### 📋 Order Management
- Create orders from available tables
- Add multiple items to a single order
- Special instructions per item
- Order tracking and history
- Complete orders and generate billing

### 📖 Menu Management
- Pre-loaded menu items with categories
- Item descriptions and pricing
- Categories: Appetizer, Main, Dessert, Beverage
- Easy item addition

### 📦 Inventory Management
- Track stock levels
- Set minimum stock thresholds
- Visual stock indicators (Normal/Warning/Critical)
- Inventory costs and unit prices

### 👥 Staff Management
- Staff directory
- Role management (Manager, Chef, Waiter, Cashier)
- Contact information
- On-duty status tracking

### 💳 Billing & Invoicing
- Automatic invoice generation
- Order-to-bill conversion
- Transaction history

### 📈 Reports & Analytics
- Sales analytics
- Table occupancy rates
- Average order values
- Performance metrics

## Color Scheme

- **Primary**: Purple gradient (#667eea → #764ba2)
- **Accent**: Gold (#ffd700)
- **Success**: Green (#4caf50)
- **Warning**: Yellow (#ffc107)
- **Background**: Light Gray (#f5f7fa)
- **White**: #ffffff

## How to Use

### Getting Started
1. Open `index.html` in any modern web browser
2. The system comes pre-loaded with sample data
3. Navigate using the sidebar menu

### Creating Orders
1. Click "Tables" in the sidebar
2. Click on an available table
3. Select menu items and add to order
4. Click "Complete Order" to generate billing

### Managing Tables
1. Go to "Tables" section
2. Click "+ Add Table" to create new tables
3. Tables automatically show status (Available/Occupied/Reserved)

### Managing Menu
1. Go to "Menu" section
2. Click "+ Add Item" to add new menu items
3. Set name, description, price, and category

### Managing Inventory
1. Go to "Inventory" section
2. Click "+ Add Item" to add inventory
3. Monitor stock levels with visual indicators

### Managing Staff
1. Go to "Staff" section
2. Click "+ Add Staff" to add employees
3. Assign roles and contact information

### Viewing Analytics
1. Click "Reports" in the sidebar
2. See sales metrics and occupancy rates
3. Filter by date range (Today/Week/Month)

## Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser LocalStorage (no server required)
- **Responsive**: Mobile, Tablet, Desktop
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)

## Data Structure

All data is stored in browser's localStorage with the following structure:

```
{
  tables: [],
  menuItems: [],
  orders: [],
  inventory: [],
  staff: [],
  billing: []
}
```

## Pre-loaded Sample Data

The system comes with sample data including:
- 6 tables (Standard, VIP, Bar)
- 8 menu items
- 5 inventory items
- 4 staff members
- Sample orders and transactions

## Keyboard Shortcuts

- Press Tab to navigate between fields
- Press Enter to submit forms
- Click the X button to close modals
- Click outside a modal to close it

## Browser Storage

- All data is stored locally in your browser
- Data persists between sessions
- Clear browser cache to reset data
- No internet connection required

## Features in Action

### Real-time Updates
- Tables update status immediately
- Orders tracked in real-time
- Billing generated automatically

### Responsive Design
- Works on desktop (1920px and above)
- Optimized for tablets (768px - 1024px)
- Mobile friendly (below 768px)

### Performance
- Fast loading (zero network requests)
- Smooth animations
- Efficient local storage

## Installation

No installation required! Simply:
1. Download all files
2. Keep them in the same folder
3. Open `index.html` in a browser
4. Start using immediately

## Printing & Exporting

- Each invoice can be printed
- Use browser's print function (Ctrl+P or Cmd+P)
- Reports can be exported to PDF

## Tips & Tricks

1. **Bulk Operations**: Add multiple items to an order before completing
2. **Quick Table Switch**: Click different tables to change selection
3. **Inventory Alerts**: Red stock levels indicate critical inventory
4. **Staff Scheduling**: Track who's on duty for each shift
5. **Daily Reporting**: Check reports at end of shift for revenue summary

## Support Features

- Search functionality in header
- Settings panel for preferences
- Help and documentation
- Settings and logout options

## Future Enhancements

Possible additions:
- Database backend (MySQL, MongoDB)
- Multi-location support
- Advanced reporting
- Customer loyalty program
- Online ordering
- Payment gateway integration
- Mobile app
- Reservation system

## File Structure

```
restaurant-management-system/
├── index.html       # Main HTML file
├── styles.css       # All styling
├── app.js          # JavaScript logic
└── README.md       # This file
```

## Version

Version 1.0 - January 2026

## Notes

- This system is fully functional and ready to use
- No backend server required
- Data is stored locally in browser
- Perfect for small to medium restaurants
- Easy to customize colors and branding

---

**Ready to use! Open index.html and start managing your restaurant.** 🎉

For any issues or feature requests, please refer to the code comments in the files.
