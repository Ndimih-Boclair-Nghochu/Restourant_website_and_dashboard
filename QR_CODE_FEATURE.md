# Menu QR Code Feature Documentation

## Overview
The Menu QR Code feature allows administrators to generate, download, and print QR codes that link directly to the restaurant menu. Customers can scan these codes with their mobile devices to view and order from the menu.

## Features Implemented

### 1. **QR Code Generation**
- Automatically generates when the Dashboard tab loads
- Creates a unique QR code that points to: `http://[server-url]/menu.html`
- Uses QRCode.js library (cdnjs CDN)
- Generates high-quality QR codes (150x150px, error correction level H)

### 2. **Dashboard Integration**
- New "Menu QR Code" card added to the dashboard
- Located in the dashboard details section alongside Active Orders and Recent Transactions
- QR code displays immediately when admin views the dashboard

### 3. **User Actions**
Three buttons allow administrators to interact with the QR code:

#### Generate QR Code Button
- Regenerates the QR code on demand
- Useful to ensure latest menu URL is encoded
- Appears whenever dashboard is accessed

#### Download Button
- Downloads the QR code as a PNG image file
- Filename: `menu-qr.png`
- Can be used in:
  - Table tents/place cards
  - Printed menus
  - Marketing materials
  - Email campaigns

#### Print Button
- Opens print dialog to print the QR code
- Allows direct printing without saving to disk
- Useful for immediate physical display

## Technical Implementation

### Files Modified

#### 1. **index.html**
- Added QR code card markup in dashboard section
- Added QRCode.js library from CDN
- HTML structure:
  ```html
  <div class="card" id="qr-card">
      <h3>Menu QR Code</h3>
      <div id="qr-container"></div>
      <div class="qr-actions">
          <button id="generate-qr-btn" class="btn-secondary">Generate QR Code</button>
          <button id="download-qr-btn" class="btn-primary" style="display:none;">Download</button>
          <button id="print-qr-btn" class="btn-secondary" style="display:none;">Print</button>
      </div>
  </div>
  ```

#### 2. **styles.css**
- Added CSS for QR container centering and sizing
- Ensures QR code displays properly (150x150px)
- Center-aligned for better UI presentation

#### 3. **app.js**
- Added `generateMenuQRCode()` method
- Added `downloadMenuQRCode()` method
- Added `printMenuQRCode()` method
- Integrated event listeners in `setupEventListeners()`
- Auto-generates QR code when dashboard renders

### Methods Overview

#### `generateMenuQRCode()`
```javascript
// Clears container
// Builds absolute URL to menu.html
// Creates QR code using QRCode.js
// Shows download/print buttons
```

#### `downloadMenuQRCode()`
```javascript
// Extracts QR code image (canvas or img)
// Converts to data URL
// Creates download link with filename 'menu-qr.png'
// Triggers download automatically
```

#### `printMenuQRCode()`
```javascript
// Extracts QR code image
// Opens new window with image
// Triggers print dialog when image loads
// Auto-closes window after printing
```

## How to Use

### For Administrators:

1. **Access Dashboard**
   - Login to admin panel (index.html)
   - Navigate to Dashboard tab

2. **Generate QR Code**
   - QR code automatically generates on load
   - Or click "Generate QR Code" button to refresh

3. **Download QR Code**
   - Click "Download" button
   - Save `menu-qr.png` to your computer
   - Use in marketing materials, menus, or table displays

4. **Print QR Code**
   - Click "Print" button
   - Select printer and print settings
   - Print directly to physical materials

### For Customers:

1. **Scan QR Code**
   - Use smartphone camera or QR code scanner app
   - Point at the QR code (on table, menu, or poster)

2. **View Menu**
   - Automatically opens menu.html in browser
   - Can browse all menu items
   - Can add items to cart and order

## Features & Benefits

✅ **Automatic Generation** - QR code ready when dashboard loads  
✅ **Download Support** - Save and reuse in print materials  
✅ **Print Support** - Direct printing without extra steps  
✅ **High Quality** - Error correction level H (recovers 30% damage)  
✅ **Responsive** - Works on all screen sizes  
✅ **Mobile Friendly** - Customers scan with any smartphone  
✅ **No Dependencies** - Uses CDN-hosted library (no npm install needed)  

## Menu Access Points

The QR code links to: `http://[server-url]/menu.html`

This page includes:
- Complete menu with all items
- Item descriptions and prices
- Add to cart functionality
- Checkout process
- Delivery options

## Troubleshooting

| Issue | Solution |
|-------|----------|
| QR code not showing | Ensure JavaScript is enabled, check browser console for errors |
| Download not working | Check popup blockers, try different browser |
| Print not opening | Verify popup blockers allow printing, check browser permissions |
| QR not scannable | Ensure adequate contrast, sufficient size (150x150px minimum) |
| Wrong URL in QR | Regenerate QR code, check server URL is correct |

## Future Enhancements

- [ ] Custom QR code branding (add restaurant logo)
- [ ] Multiple QR codes for different menu sections
- [ ] QR code expiry/rotation for security
- [ ] Analytics tracking (how many times QR scanned)
- [ ] Customizable QR code sizing
- [ ] Email QR codes to customers
- [ ] Generate table-specific order QR codes
