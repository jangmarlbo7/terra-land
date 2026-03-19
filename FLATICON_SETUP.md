# Flaticon Icons Setup Guide

This guide explains how to add Flaticon icons to replace emoji icons throughout the application.

## Steps to Add Flaticon Icons

### 1. **Visit Flaticon**
Go to: https://www.flaticon.com/free-icons/ux-design

### 2. **Download SVG Icons**
For each icon you need:
- Search for the icon (e.g., "search", "location", "house", "landmark")
- Click the icon
- Download as **SVG** (regular style, free version)
- Save to `public/icons/` folder

### 3. **Create Icons Directory**
```bash
mkdir -p public/icons
```

### 4. **Icons Needed**

| Icon Name | Usage | Flaticon Search |
|-----------|-------|-----------------|
| arrow-back.svg | Back button | "arrow back" |
| search.svg | City search | "search" or "magnifier" |
| location.svg | My location / Map marker | "location" or "gps" |
| home.svg | Navigation home | "home" |
| map.svg | Map section | "map" |
| sell.svg | Sell land page | "sell" or "sales" |
| phone.svg | Contact phone | "phone" |
| email.svg | Contact email | "email" or "mail" |
| facebook.svg | Contact Facebook | "facebook" |
| whatsapp.svg | Contact WhatsApp | "whatsapp" or "message" |
| line.svg | Contact LINE | search "line messaging" or "chat" |

### 5. **Usage in HTML**

Replace emoji icons with SVG images:

**Old (emoji):**
```html
<button>📍 My Location</button>
```

**New (SVG icon):**
```html
<button>
  <img src="/icons/location.svg" alt="location" style="width: 18px; height: 18px; margin-right: 4px;">
  My Location
</button>
```

### 6. **Icon Styling**
For consistency, use this CSS:

```css
.icon {
  width: 18px;
  height: 18px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
}

.icon.sm {
  width: 16px;
  height: 16px;
}

.icon.lg {
  width: 24px;
  height: 24px;
}
```

## Files to Update

1. **public/map.html** - Replace emoji icons with SVG
2. **public/submit.html** - Replace emoji icons with SVG
3. **public/index.html** - Replace emoji icons with SVG (navigation, sections)
4. **admin/index.html** - Replace emoji icons with SVG (dashboard icons)

## Example: Replace Icons in map.html

```html
<!-- Before -->
<button class="back-btn">← Back to Home</button>

<!-- After -->
<button class="back-btn">
  <img src="/icons/arrow-back.svg" alt="back" class="icon">
  Back to Home
</button>
```

## Flaticon Attribution

If using Flaticon icons, you should include attribution (even for free icons):
```html
<p style="font-size: 0.75rem; color: #999; margin-top: 20px;">
  Icons by <a href="https://www.flaticon.com">Flaticon</a>
</p>
```

## Quick Icon Download Links

Format: Search term → Icon to download

- **Location Icons**: "location pin", "gps marker", "map pin"
- **Search**: "search icon", "magnifying glass"
- **Back**: "back arrow", "left arrow"
- **Contact**: "phone icon", "envelope", "message"

## Pro Tips

1. **Color SVGs**: Add color to SVGs using CSS filter or inline:
```html
<img src="/icons/location.svg" alt="location" style="filter: invert(0.2);">
```

2. **Different sizes**: Use CSS classes for different icon sizes
3. **Consistency**: Keep all icons from the same Flaticon pack for visual consistency
4. **Accessibility**: Always include `alt` text on image icons

---

Once icons are downloaded and placed in `public/icons/`, update the HTML files to use them.
