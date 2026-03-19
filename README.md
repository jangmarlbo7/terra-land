# TERRA — Land for Sale Platform

A full-stack land marketplace with multilingual support (Lao, English, Thai), MongoDB backend, 9-section homepage, and a secure admin panel.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env — set your MongoDB URI and admin password

# 3. Run in development
npm run dev

# 4. Run in production
npm start
```

---

## URLs

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Public homepage (9 sections) |
| `http://localhost:3000/contact` | Contact page |
| `http://localhost:3000/admin` | Admin panel (password protected) |

---

## Project Structure

```
terra-land/
├── server.js                  # Express entry point
├── package.json
├── .env.example               # Copy to .env and configure
│
├── models/
│   └── Land.js                # Mongoose schema (multilingual fields)
│
├── routes/
│   └── lands.js               # REST API — /api/lands
│
├── public/                    # User-facing pages
│   ├── index.html             # Homepage — all 9 sections
│   ├── contact.html           # Standalone contact page
│   ├── css/
│   │   └── style.css          # Shared white/black theme
│   └── js/
│       ├── lang.js            # LO/EN/TH translations + Lang manager
│       ├── api.js             # Public API fetch wrapper
│       ├── home.js            # Homepage logic (all 9 sections)
│       └── contact.js         # Contact form logic
│
└── admin/                     # Admin panel (password protected)
    ├── index.html             # Dashboard + listings + add/edit/delete
    ├── css/
    │   └── admin.css          # Admin styles
    └── js/
        └/admin.js             # CRUD, auth, form logic
```

---

## Homepage Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Full landscape photo, headline, CTAs, live stats |
| 2 | **Search** | Filter by location, price, size, type |
| 3 | **Listings** | Card grid with "View All" toggle, detail modal |
| 4 | **Categories** | Empty / Agricultural / Roadside / Investment |
| 5 | **Why Choose Us** | 6 benefit cards |
| 6 | **How It Works** | 4-step buying process |
| 7 | **Contact** | Phone, LINE, WhatsApp, contact form, chat button |
| 8 | **About Us** | Company intro + 3 key stats |
| 9 | **Map** | Styled map with office + land plot markers |

---

## API Reference

Base URL: `/api/lands`

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/lands` | Public | List lands (`status`, `type`, `featured`, `search`, `lang`) |
| GET | `/api/lands/:id` | Public | Single land detail |
| POST | `/api/lands` | Admin | Create listing |
| PUT | `/api/lands/:id` | Admin | Update listing |
| DELETE | `/api/lands/:id` | Admin | Delete listing |

Admin endpoints require header: `x-admin-token: <ADMIN_PASSWORD>`

---

## Multilingual Data Model

Each land document stores text fields as objects with three language keys:

```json
{
  "title":       { "en": "Riverside Plot", "lo": "ດິນຂ້າງແຄ້ວ", "th": "ที่ดินริมน้ำ" },
  "location":    { "en": "Savannakhet",    "lo": "ສະຫວັນນະເຂດ",  "th": "สะหวันนะเขต" },
  "description": { "en": "…",             "lo": "…",              "th": "…" }
}
```

The public site automatically reads the active language field, falling back to `en`.

---

## Adding a New Language

1. Open `public/js/lang.js`
2. Duplicate the `en` block and translate all values
3. Add a `<button class="lang-btn" data-lang="xx">` to each HTML page nav
4. Done — the `Lang` manager handles everything automatically

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/terra_land` |
| `PORT` | Server port | `3000` |
| `ADMIN_PASSWORD` | Admin panel password | `admin1234` |

---

## Production Deployment

### Option 1: Deploy on Railway (Recommended)

**What is Railway?**
Railway is a cloud hosting platform that allows you to:
- Host your app online (accessible worldwide, not just on localhost)
- Store secrets securely (passwords, database URLs) without adding them to code
- Run your server 24/7 without keeping your computer on
- Free tier available for beginners

**Step-by-Step Guide:**

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/terra-land.git
   git push -u origin main
   ```

2. **Sign up for Railway**
   - Visit [Railway.app](https://railway.app)
   - Click "Sign Up" and login with GitHub

3. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Select your `terra-land` repository
   - Click "Deploy"

4. **Set Environment Variables in Railway**
   - In Railway dashboard, go to your project → "Variables"
   - Add these two variables:
     ```
     MONGO_URI = mongodb+srv://user:password@cluster.mongodb.net/terra_land
     ADMIN_PASSWORD = your-strong-secret-password
     ```
   - (Get `MONGO_URI` from [MongoDB Atlas](https://www.mongodb.com/atlas))

5. **Deploy**
   - Railway automatically builds and deploys when you push to GitHub
   - Wait 2–5 minutes for deployment to complete
   - Check "Deployments" tab for status

6. **Access Your Live Site**
   - Railway gives you a public URL (e.g., `https://terra-land-production.up.railway.app`)
   - Anyone in the world can now visit your site!
   - Share the URL with friends, clients, or customers

**MongoDB Setup (One-time):**
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create free account
- Create a new cluster
- Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/terra_land`
- Paste this as `MONGO_URI` in Railway

---

### Option 2: Other Hosting Platforms
- [Render](https://render.com) — similar to Railway, also free tier
- [Heroku](https://heroku.com) — was free, now requires credit card
- [AWS](https://aws.amazon.com), [Google Cloud](https://cloud.google.com) — pay-as-you-go

**All require:**
- MongoDB Atlas database
- GitHub repository
- Strong `ADMIN_PASSWORD` in environment variables
