# 🍽️ Menu Management System - Quick Reference

## Admin Dashboard Menu Management

### ➕ Add Menu Item
**Path:** Admin Dashboard > Menu > "+ Add Item"
```
Fields:
├─ Item Name (required)
├─ Description (optional)
├─ Price (required, in FCFA)
├─ Category (required)
│  ├─ Appetizer
│  ├─ Main Course
│  ├─ Dessert
│  └─ Beverage
└─ Image
   ├─ File Upload (JPG, PNG)
   └─ Image URL (paste link)
```

### ✏️ Edit Menu Item
**Path:** Menu Tab > Item Card > "✏️ Edit" Button
- Form opens with current item data
- Modify any field
- Click "Update Item"
- Form title changes to "Edit Menu Item"

### 🗑️ Delete Menu Item
**Path:** Menu Tab > Item Card > "🗑️ Delete" Button
- Click to delete
- Confirm in popup
- Item removed from all locations

---

## 🌐 Website Menu Display

### Menu Page (menu.html)
- **URL:** `menu.html`
- **Features:**
  - Category filters at top
  - Grid layout (responsive)
  - "ORDER NOW" buttons
  - Full item details

### Home Page (home-new.html)
- **Section:** "Today's Menu"
- **Shows:** First 9 items
- **Action:** "View Full Menu" button

### Order Placement
1. Click "ORDER NOW" on any item
2. Select beverage (optional)
3. Choose dining location
4. Confirm reservation
5. Complete payment

---

## 💾 Data Storage

**Location:** Browser LocalStorage  
**Key:** `restaurantData`  
**Object:** `restaurantData.menuItems[]`

### Item Structure
```javascript
{
  id: 1,
  name: "Item Name",
  description: "Description text",
  price: 5000,           // In FCFA
  category: "main",      // appetizer, main, dessert, beverage
  emoji: "🍽️",
  image: "URL or Base64"
}
```

---

## 🔄 Connected Sections

| Section | Status | Connection |
|---------|--------|-----------|
| **Menu** | ✅ Active | Admin CRUD + Website Display |
| **Reservations** | ✅ Active | Plan sync + Booking Form |
| **Reviews** | ✅ Active | Customer submit + Admin view |
| **Tables** | ✅ Active | Admin manage + Order flow |
| **Events** | ✅ Ready | Static content |
| **Gallery** | ✅ Ready | Static content |

---

## 🎯 Price Format

- **Storage:** Full amount in smallest unit (e.g., 5000 = 5,000 FCFA)
- **Display:** Auto-formatted with commas (e.g., "5,000 FCFA")
- **Currency:** FCFA (West African CFA franc)

**Examples:**
- 5,000 FCFA → stored as `5000`
- 25,000 FCFA → stored as `25000`
- 100,500 FCFA → stored as `100500`

---

## 📱 Responsive Behavior

**Desktop:** 3-4 columns  
**Tablet:** 2-3 columns  
**Mobile:** 1-2 columns  

---

## ⚙️ Category Mappings

**Admin Category** → **Website Display**
- `appetizer` → "Appetizers" / "appetizer"
- `main` → "Main Courses" / "mains"
- `dessert` → "Desserts" / "desserts"
- `beverage` → "Beverages" / "beverages"

---

## 🖼️ Image Handling

### Upload Methods:
1. **File Upload:** Select image from computer
   - Converts to Base64
   - Stored in localStorage
   - Max size: ~5MB total

2. **URL:** Paste image link
   - Direct reference
   - Lighter on storage
   - Requires internet access

### Recommended:
- Use **URL links** for better performance
- Use **file upload** for offline/custom images
- Default emoji shows if no image provided

---

## 🔍 Key Files

| File | Purpose |
|------|---------|
| `index.html` | Admin dashboard |
| `app.js` | Menu CRUD logic |
| `menu.html` | Menu page |
| `menu-scripts.js` | Menu display logic |
| `home-new.html` | Home page with menu |
| `styles.css` | Menu styling |
| `reservations.html` | Reservation booking |
| `reviews.js` | Review management |

---

## 🚨 Important Notes

### Image Size Limit
- localStorage limit: ~5-10MB
- Use image URLs to save space
- Monitor localStorage size

### Browser Compatibility
- Works in all modern browsers
- Requires localStorage enabled
- Private/Incognito mode may limit storage

### Backup Data
- Regularly backup menu data
- Export to file if needed
- LocalStorage is temporary if cache cleared

---

## 💡 Tips & Tricks

1. **Fast Price Updates:** Edit item, change price, save
2. **Category Re-org:** Change category to reorganize
3. **Image Swap:** Edit item, update image URL
4. **Bulk Menu:** Add multiple items > Edit as needed
5. **Default Menu:** If localStorage empty, system uses defaults
6. **Mobile Order:** Website responsive, works on phone/tablet

---

## ❌ Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Menu not showing | Refresh page / Check localStorage |
| Images not loading | Verify URL / Try file upload |
| Prices wrong | Check storage value format |
| Edit button not working | Refresh page / Check console |
| Data lost | Clear cache deleted localStorage |

---

## 📊 Statistics

- **Default Items:** 14 (across 4 categories)
- **Categories:** 4 (appetizer, main, dessert, beverage)
- **Customizable:** All items fully editable
- **Storage:** LocalStorage only (no server needed)

---

## 🎓 Example Menu Item

```javascript
{
  id: 4,
  name: "Pan-Seared Beef Tenderloin",
  description: "Premium aged beef with béarnaise sauce and seasonal vegetables",
  price: 52000,
  category: "main",
  emoji: "🥩",
  image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop"
}
```

---

**System:** Restaurant Management System  
**Version:** 1.0  
**Last Updated:** January 31, 2026  
**Status:** ✅ Production Ready
