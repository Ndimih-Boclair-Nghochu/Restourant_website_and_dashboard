# Installation & Setup Guide

## 📁 Files Included

Your Restaurant Management System includes:

```
Restourant management system/
├── index.html           (Main application file)
├── styles.css          (Beautiful modern styling)
├── app.js              (Complete JavaScript logic)
├── server.js           (Optional Node.js backend)
├── package.json        (Dependencies for Node.js)
├── README.md           (Full documentation)
├── QUICKSTART.md       (Quick start guide)
└── INSTALLATION.md     (This file)
```

---

## 🚀 Quick Start (Recommended)

### For Immediate Use (No Setup Required)

1. **Locate the files** at:
   ```
   c:\Users\pc\OneDrive\Desktop\Restourant management system
   ```

2. **Open the application**:
   - Double-click `index.html`
   - Or right-click → Open with → Your preferred browser
   - Or drag `index.html` to your browser window

3. **Start using**:
   - Dashboard loads automatically
   - Pre-loaded with sample data
   - Ready to go immediately!

---

## 💻 Advanced Setup (With Backend)

### Requirements
- Node.js (Download from https://nodejs.org)
- npm (Comes with Node.js)
- 200MB disk space

### Installation Steps

#### Step 1: Install Node.js
1. Go to https://nodejs.org
2. Download LTS version
3. Run installer with default settings
4. Restart your computer

#### Step 2: Navigate to Project Folder
```
cd c:\Users\pc\OneDrive\Desktop\Restourant management system
```

#### Step 3: Install Dependencies
```
npm install
```

This installs:
- Express (web server)
- SQLite (database)
- CORS (cross-origin support)

#### Step 4: Start the Server
```
npm start
```

Output should show:
```
Restaurant Management Server running on http://localhost:3000
```

#### Step 5: Open in Browser
- Open http://localhost:3000
- Dashboard loads with full backend support

---

## 🌐 Browser Configuration

### Recommended Browsers
- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)

### Browser Settings
1. Allow JavaScript (required)
2. Allow LocalStorage (required)
3. Allow Cookies (optional)

### For Best Performance
1. Disable extensions
2. Clear cache (if issues occur)
3. Use desktop version (not mobile)

---

## 📊 Data Storage Options

### Option 1: Browser LocalStorage (Default)
- **Pros**: No setup, instant use, no server needed
- **Cons**: Data per browser, limited space (~5-10MB)
- **Use for**: Small restaurants, testing, single user

**Enable**: Just open index.html

### Option 2: SQLite Database (With server.js)
- **Pros**: Persistent data, multiple users, backups
- **Cons**: Requires Node.js, more complex
- **Use for**: Medium restaurants, team access

**Enable**: Follow "Advanced Setup" above

### Option 3: Cloud Database (Enterprise)
- **Pros**: Scalable, accessible anywhere, team collaboration
- **Cons**: Requires paid service, ongoing costs
- **Use for**: Large restaurant chains

**Option**: Modify server.js to use MongoDB/PostgreSQL

---

## ⚙️ Configuration

### Customize Colors
Edit `styles.css`:
```css
/* Find this section */
--primary: #667eea;
--secondary: #764ba2;
--accent: #ffd700;

/* Change to your colors */
--primary: #your-color;
--secondary: #your-color;
--accent: #your-color;
```

### Customize Restaurant Name
Edit `index.html`:
```html
<h1 class="logo">🍽️ RestroHub</h1>
<!-- Change "RestroHub" to your restaurant name -->
```

### Customize Menu Items
Edit `app.js`, find `defaultData.menuItems` section

---

## 🔧 Troubleshooting

### Issue: Page won't load
**Solution**:
1. Refresh page (F5)
2. Hard refresh (Ctrl+Shift+F5)
3. Clear cache and cookies
4. Try different browser

### Issue: Can't add items
**Solution**:
1. Check all fields are filled
2. Open browser console (F12)
3. Check for error messages
4. Try refreshing page

### Issue: Data disappeared
**Solution**:
1. Data is in browser LocalStorage
2. Clearing cache deletes data
3. Use server version for persistence
4. Export data before clearing cache

### Issue: Port 3000 already in use (Server mode)
**Solution**:
```
# Change port in server.js
const PORT = 3000;  // Change to 3001, 8000, etc.
```

### Issue: npm install fails
**Solution**:
1. Ensure Node.js is installed: `node --version`
2. Update npm: `npm install -g npm`
3. Delete node_modules folder
4. Run `npm install` again
5. Try with admin privileges

---

## 🔐 Security & Backup

### Backup Your Data

**Browser Version**:
1. Export from Reports section
2. Save regularly
3. Use multiple browsers as backup

**Server Version**:
1. Database file: `restaurant.db`
2. Schedule automatic backups
3. Keep copies on external drive

### Reset/Clear Data

**Browser Version**:
```
1. Open browser settings
2. Go to Privacy/Cookies
3. Delete data for localhost
4. Reload page
```

**Server Version**:
```
1. Delete restaurant.db file
2. Restart server
3. Fresh database created
```

---

## 🚀 Deployment

### Deploy to Web Server

**For others to access remotely**:

1. **Choose hosting**:
   - Heroku (free tier)
   - AWS (pay as you go)
   - DigitalOcean ($5/month)
   - Firebase Hosting

2. **Update server.js**:
   ```javascript
   const PORT = process.env.PORT || 3000;
   ```

3. **Add Procfile** (for Heroku):
   ```
   web: node server.js
   ```

4. **Deploy**:
   - Push to Git repository
   - Connect to hosting platform
   - Automatic deployment

---

## 📱 Mobile Access

### Using on Mobile/Tablet

1. **Same Network**:
   - Get your computer IP: `ipconfig` (Windows)
   - On mobile, go to: `http://[your-ip]:3000`
   - Requires server running

2. **Remote Access**:
   - Use ngrok: `ngrok http 3000`
   - Share ngrok URL
   - Anyone can access

3. **Mobile App**:
   - Desktop version works on tablets
   - Limited functionality on phones
   - Consider building native app

---

## 📚 Additional Resources

- **MDN Web Docs**: https://developer.mozilla.org
- **Node.js Docs**: https://nodejs.org/docs
- **Express Docs**: https://expressjs.com
- **SQLite Docs**: https://www.sqlite.org/docs.html

---

## ✅ Verification Checklist

- [ ] All files downloaded to correct folder
- [ ] index.html opens in browser
- [ ] Dashboard shows sample data
- [ ] Can add new tables
- [ ] Can create orders
- [ ] Data persists on refresh
- [ ] (Optional) Node.js installed if using server
- [ ] (Optional) npm install completed successfully
- [ ] (Optional) Server runs on http://localhost:3000

---

## 🎉 You're Ready!

**Browser Version**: Open `index.html` now and start managing!

**Server Version**: Run `npm start` and open http://localhost:3000

---

## 📞 Support

If you encounter issues:

1. Check browser console (F12 → Console)
2. Review README.md for detailed docs
3. Check QUICKSTART.md for common tasks
4. Verify all files are in same folder
5. Try clearing cache
6. Try different browser

---

**Congratulations! Your Restaurant Management System is installed and ready to use!** 🎊

Start from QUICKSTART.md for your first steps.
