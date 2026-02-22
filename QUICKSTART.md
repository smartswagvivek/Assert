# Quick Start Guide - Office Asset Management System

## 🚀 Get Running in 5 Minutes

### Terminal 1: Start Backend

```bash
cd backend
npm install
npm run dev
```

✅ Backend running on `http://localhost:5000`

### Terminal 2: Start Frontend

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on `http://localhost:3000`

---

## 📱 First Steps

1. **Open** http://localhost:3000 in your browser
2. **Click** "Sign up" 
3. **Enter:**
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
4. **Click** "Sign Up"
5. **You're in!** Add your first asset

---

## 🎯 Core Files Overview

### Backend Entry Point
```
backend/server.js  ← Start here to understand server setup
```

### Frontend Entry Point
```
frontend/src/App.jsx  ← Router configuration
frontend/src/main.jsx  ← React entry point
frontend/index.html    ← HTML template
```

### API Communication
```
frontend/src/services/api.js  ← Axios setup & JWT handling
```

---

## 📋 Authentication Flow

1. **Register/Login** → JWT stored in localStorage
2. **Every Request** → JWT automatically attached via Axios interceptor
3. **Protected Routes** → JWT validated on backend
4. **Auto Logout** → Invalid token redirects to login

---

## 🛠️ Common Commands

### Backend
```bash
cd backend
npm install      # Install dependencies
npm run dev      # Start dev server with auto-reload
npm start        # Start production server
```

### Frontend
```bash
cd frontend
npm install      # Install dependencies
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📊 Database

**MongoDB Atlas** (Your connection string already configured)
- Collections auto-created on first use
- `users` collection - stores registered users
- `assets` collection - stores office assets

---

## 🔑 Key Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/auth/register` | ❌ | Create account |
| POST | `/api/auth/login` | ❌ | Login |
| GET | `/api/assets` | ✅ | Get all assets |
| POST | `/api/assets` | ✅ | Create asset |
| PUT | `/api/assets/:id` | ✅ | Update asset |
| DELETE | `/api/assets/:id` | ✅ | Delete asset |

---

## 💾 File Structure at a Glance

```
backend/
├── server.js                    # Express app & routes
├── models/
│   ├── User.js                 # User schema
│   └── Asset.js                # Asset schema
├── controllers/
│   ├── authController.js       # Auth logic
│   └── assetController.js      # Asset CRUD
├── middleware/
│   └── authMiddleware.js       # JWT protection
└── routes/
    ├── authRoutes.js           # Auth endpoints
    └── assetRoutes.js          # Asset endpoints

frontend/
├── src/
│   ├── App.jsx                 # Router
│   ├── pages/
│   │   ├── Login.jsx           # Login form
│   │   ├── Register.jsx        # Register form
│   │   └── Assets.jsx          # Asset dashboard
│   ├── components/
│   │   ├── AssetForm.jsx       # Add/Edit form
│   │   ├── AssetList.jsx       # List wrapper
│   │   └── AssetCard.jsx       # Asset card
│   ├── services/
│   │   └── api.js              # Axios setup
│   └── styles/
│       ├── auth.css            # Auth pages
│       └── assets.css          # Assets page
└── index.html                  # HTML entry
```

---

## 🔐 Environment Variables

**Backend (.env)** - Already configured with your MongoDB credentials:
```
PORT=5000
MONGODB_URI=mongodb+srv://hsvivek0908_db_user:Bdvt1234@cluster0.bwy2snw.mongodb.net/?appName=Cluster0
JWT_SECRET=your_secret_key_change_this_in_production_12345
NODE_ENV=development
```

---

## ✨ Features Included

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Password Hashing (bcryptjs)
- ✅ CRUD Operations
- ✅ MongoDB Integration
- ✅ Responsive UI
- ✅ Error Handling
- ✅ Form Validation
- ✅ Protected Routes
- ✅ Auto Token Injection

---

## 🚨 If Something Breaks

1. **Backend won't start?**
   ```bash
   cd backend
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

2. **Frontend won't start?**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

3. **Database connection failed?**
   - Check MongoDB Atlas is running
   - Verify URL in `backend/.env`
   - Ensure IP is whitelisted in MongoDB Atlas

4. **Getting 401 errors?**
   - Log out and log back in
   - Check localStorage has token
   - Verify backend is running

---

## 📚 Next Steps

After getting comfortable:

1. **Modify Asset Fields** - Edit `backend/models/Asset.js`
2. **Add Features** - Create new routes in `backend/routes/`
3. **Customize UI** - Update styles in `frontend/src/styles/`
4. **Deploy** - See SETUP.md for deployment guide

---

## 📞 Debug Mode

Add this to see detailed logs:

**Backend** - Already logging to console

**Frontend** - Check browser DevTools (F12)

---

**You're all set! Start building! 🚀**
