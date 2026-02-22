# Office Asset Management CRUD System - Setup Guide

A production-ready full-stack Office Asset Management system built with Node.js, Express, MongoDB, React, and Vite.

## 📁 Project Structure

```
office-asset-system/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Asset.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── assetController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── assetRoutes.js
│   ├── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Assets.jsx
    │   ├── components/
    │   │   ├── AssetForm.jsx
    │   │   ├── AssetList.jsx
    │   │   └── AssetCard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── auth.css
    │   │   └── assets.css
    │   ├── index.css
    │   ├── main.jsx
    │   └── App.jsx
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── .gitignore
    └── .env (optional)
```

## 🔧 Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (already provided)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Environment Configuration

The `.env` file is already configured with your MongoDB connection string:

```
PORT=5000
MONGODB_URI=mongodb+srv://hsvivek0908_db_user:Bdvt1234@cluster0.bwy2snw.mongodb.net/?appName=Cluster0
JWT_SECRET=your_secret_key_change_this_in_production_12345
NODE_ENV=development
```

**⚠️ Security Note:** For production, change the `JWT_SECRET` to a strong random string.

### Step 3: Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

The backend will run on `http://localhost:5000`

### Available Backend Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

#### Assets (All Protected Routes)
- `GET /api/assets` - Get all assets
- `GET /api/assets/:id` - Get single asset
- `POST /api/assets` - Create asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

---

## 🎨 Frontend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step 1: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 2: Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:3000` (or next available port)

### Step 3: Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

---

## 🔐 Authentication Flow

1. **User Registration**
   - Visit `/register`
   - Enter name, email, password
   - System creates user account
   - JWT token is generated and stored in localStorage

2. **User Login**
   - Visit `/login`
   - Enter email and password
   - System validates credentials
   - JWT token is generated and stored in localStorage

3. **Protected Routes**
   - All asset routes require valid JWT token
   - Token is automatically attached to all requests via Axios interceptor
   - Invalid/expired tokens redirect to login

---

## 📝 API Usage Examples

### 1. User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. User Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create Asset

```bash
curl -X POST http://localhost:5000/api/assets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Dell Monitor",
    "category": "Electronics",
    "serialNumber": "SN-2024001",
    "purchaseDate": "2024-01-15",
    "status": "AVAILABLE",
    "description": "27-inch 4K Monitor"
  }'
```

### 4. Get All Assets

```bash
curl -X GET http://localhost:5000/api/assets \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Update Asset

```bash
curl -X PUT http://localhost:5000/api/assets/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "IN_USE"
  }'
```

### 6. Delete Asset

```bash
curl -X DELETE http://localhost:5000/api/assets/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🧪 Testing the Application

### Quick Test Steps

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend (in new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

3. **In Browser:**
   - Open http://localhost:3000
   - Click "Sign up" to create account
   - Enter details and register
   - You'll be redirected to assets page
   - Click "+ Add Asset" to create new asset
   - View, edit, or delete assets

### Sample Test Data

**User Credentials:**
```
Name: Test User
Email: test@example.com
Password: password123
```

**Sample Asset:**
```
Name: Office Laptop
Category: Electronics
Serial Number: LT-20240001
Purchase Date: 2024-01-10
Status: AVAILABLE
Description: MacBook Pro 14"
```

---

## 📚 Key Features

### Backend Features
✅ User registration and login with JWT authentication  
✅ Password hashing with bcryptjs  
✅ MongoDB integration with Mongoose  
✅ Protected API routes with auth middleware  
✅ CRUD operations for assets  
✅ User-specific asset management  
✅ Proper error handling and validation  
✅ Async/await syntax throughout  

### Frontend Features
✅ Responsive React UI with Vite  
✅ React Router for navigation  
✅ Axios instance with JWT interceptor  
✅ Login/Register pages  
✅ Asset dashboard with CRUD operations  
✅ Real-time form validation  
✅ Toast-like error messages  
✅ Modern CSS styling with gradient design  

---

## 🛡️ Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token authentication
- HTTP-only cookie-like storage via localStorage
- Request validation on both frontend and backend
- CORS enabled for frontend-backend communication
- Unique email validation
- User isolation (users can only access their assets)

---

## 🚀 Deployment Notes

### Backend Deployment (Heroku/Railway/Render)
1. Ensure `.env` is not committed to git
2. Set environment variables on deployment platform
3. MongoDB Atlas is cloud-hosted, no extra setup needed
4. Update frontend API URL to production domain

### Frontend Deployment (Vercel/Netlify)
1. Update API URL in `src/services/api.js`
2. Build: `npm run build`
3. Deploy `dist` folder
4. Update CORS settings on backend if needed

---

## 📦 Dependencies

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT generation
- **cors** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **vite** - Build tool

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB Atlas URL in `.env`
- Check internet connection
- Ensure IP whitelist includes your IP in MongoDB Atlas

### CORS Error
- Backend already has CORS enabled
- Check that backend is running on port 5000
- Verify API URL in frontend `src/services/api.js`

### 401 Unauthorized
- Token may have expired
- Try logging in again
- Check localStorage for valid token
- Verify Authorization header format: `Bearer <token>`

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Vite will use next available port automatically

---

## 📞 Support

For issues or questions:
1. Check MongoDB Atlas connection settings
2. Verify all dependencies are installed
3. Ensure backend is running before starting frontend
4. Check browser console for frontend errors
5. Check backend terminal for server errors

---

## 📄 License

MIT License - Free to use and modify

---

**Happy Coding! 🎉**
