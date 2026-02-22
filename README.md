# Office Asset Management CRUD System

A production-ready, full-stack Office Asset Management system built with modern technologies.

## 🎯 What's Included

### Backend
- **Node.js + Express.js** - Lightweight, fast server
- **MongoDB + Mongoose** - Cloud database with schema validation
- **JWT Authentication** - Secure token-based auth
- **bcryptjs** - Password hashing and security
- **CORS** - Cross-origin resource sharing enabled
- **Error Handling** - Comprehensive error management

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Modern CSS** - Beautiful, responsive design
- **JWT Integration** - Secure token management

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, React Router 6, Axios |
| **Backend** | Node.js, Express.js, MongoDB |
| **Database** | MongoDB Atlas (Cloud) |
| **Authentication** | JWT, bcryptjs |
| **Styling** | CSS3 with responsive design |

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation & Running

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` and start using the app!

See [QUICKSTART.md](./QUICKSTART.md) for detailed instructions.

## ✨ Features

### User Management
- ✅ User registration with validation
- ✅ Secure login with JWT
- ✅ Password hashing (bcryptjs)
- ✅ User-specific data isolation
- ✅ Auto-logout on invalid token

### Asset Management (CRUD)
- ✅ **Create** - Add new office assets
- ✅ **Read** - View all your assets
- ✅ **Update** - Edit asset information
- ✅ **Delete** - Remove assets

### Asset Fields
- Name
- Category (Electronics, Furniture, Tools, Supplies, Equipment, Other)
- Serial Number (unique)
- Purchase Date
- Status (Available, In Use, Maintenance, Damaged, Retired)
- Description

### Security Features
- JWT token authentication
- Password hashing with bcryptjs
- Protected API routes
- CORS enabled
- Input validation
- User data isolation

### UI/UX
- Clean, modern interface
- Responsive design (mobile, tablet, desktop)
- Real-time form validation
- Error notifications
- Loading states
- Intuitive navigation

## 📁 Project Structure

```
office-asset-system/
├── backend/
│   ├── models/           # Database schemas
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth & validation
│   ├── routes/          # API endpoints
│   ├── server.js        # Express app
│   ├── .env            # Environment variables
│   └── package.json    # Dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── services/    # API calls
│   │   ├── styles/      # CSS files
│   │   └── App.jsx      # Main router
│   ├── index.html      # HTML entry
│   └── package.json    # Dependencies
│
├── QUICKSTART.md        # 5-minute setup guide
├── SETUP.md            # Detailed setup instructions
├── API_DOCUMENTATION.md # Complete API reference
└── README.md           # This file
```

## 🔐 Authentication Flow

1. **Register** → New user account created
2. **Login** → JWT token generated
3. **Token Storage** → Stored in localStorage
4. **Auto Injection** → Attached to all API requests via Axios interceptor
5. **Protected Routes** → JWT validated on backend
6. **Expiration** → Token expires in 30 days

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[SETUP.md](./SETUP.md)** - Comprehensive setup guide
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference

## 🛠️ Available Scripts

### Backend
```bash
npm run dev     # Start with auto-reload (nodemon)
npm start       # Start production server
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
```

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Assets (Protected)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/assets` | Get all assets |
| GET | `/api/assets/:id` | Get single asset |
| POST | `/api/assets` | Create asset |
| PUT | `/api/assets/:id` | Update asset |
| DELETE | `/api/assets/:id` | Delete asset |

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed endpoint documentation.

## 🌐 MongoDB

**Connection:** Already configured with your MongoDB Atlas credentials

**Collections:**
- `users` - User accounts with hashed passwords
- `assets` - Office assets linked to users

No additional setup needed - database connections are automatic!

## 🔒 Security

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens with 30-day expiration
- Protected routes with middleware
- Input validation on both frontend and backend
- CORS configured
- User data isolation

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Gradient header design
- Touch-friendly buttons
- Readable typography

## 🧪 Testing the Application

1. Register a new account
2. Create some assets
3. Edit an asset
4. Delete an asset
5. Logout and login again
6. Verify your assets are still there

## 🚀 Production Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables
4. Deploy!

### Frontend Deployment (Vercel/Netlify)
1. Run `npm run build`
2. Deploy `dist` folder
3. Update API URL in frontend

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Verify URL in .env, check IP whitelist |
| CORS error | Backend already has CORS enabled |
| 401 Unauthorized | Login again, check token in localStorage |
| Port already in use | Change PORT in .env or use different port |

## 📋 Code Quality

- Clean, readable code
- Consistent naming conventions
- Comprehensive error handling
- Input validation
- Async/await throughout
- Comments where needed

## 🎓 Learning Resources

- **Backend:** MongoDB + Express pattern, JWT authentication
- **Frontend:** React routing, Axios interceptors, form handling
- **Security:** Password hashing, token management
- **Database:** Mongoose schemas, query optimization

## 🤝 Contributing

Feel free to:
- Add new features
- Improve UI/UX
- Optimize performance
- Fix bugs
- Add tests

## 📝 License

MIT License - Free to use and modify

## 🎉 You're Ready!

Everything is set up and ready to run. Follow the [QUICKSTART.md](./QUICKSTART.md) guide to get started.

```bash
# Quick start (if you haven't already)
cd backend && npm install && npm run dev
# In another terminal
cd frontend && npm install && npm run dev
```

Visit `http://localhost:3000` and start managing assets!

---

**Happy Coding! 🚀**

For detailed help, check out:
- [QUICKSTART.md](./QUICKSTART.md) - Fast setup
- [SETUP.md](./SETUP.md) - Complete guide
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API reference
