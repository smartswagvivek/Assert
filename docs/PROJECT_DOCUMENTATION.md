# Office Asset Management System - Complete Project Documentation

Version: 1.1
Date: February 21, 2026
Repository: https://github.com/smartswagvivek/Assert.git

## 1. Project Overview

Office Asset Management System is a full-stack web application for managing office assets with secure user authentication and user-scoped CRUD operations.

Primary capabilities:
- User registration and login with JWT-based auth
- Create, read, update, delete office assets
- Per-user data isolation (each user sees only their own assets)
- Responsive frontend UI
- Cloud deployment using Render (backend) + Vercel (frontend) + MongoDB Atlas (database)

## 2. Architecture

Application layers:
- Frontend: React + Vite SPA
- Backend: Node.js + Express REST API
- Database: MongoDB Atlas via Mongoose
- Authentication: JWT + bcrypt password hashing

Request flow:
1. User interacts with React frontend
2. Frontend calls backend API using Axios
3. Backend validates JWT for protected routes
4. Backend reads/writes to MongoDB Atlas
5. API response is rendered in frontend

## 3. Tech Stack

Frontend:
- React 18
- React Router DOM 6
- Axios
- Vite 5

Backend:
- Node.js
- Express 4
- Mongoose 7
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- nodemon (dev)

## 4. Repository Structure

- backend/
  - controllers/
  - middleware/
  - models/
  - routes/
  - server.js
  - package.json
  - .env (local only)
- frontend/
  - src/
    - components/
    - pages/
    - services/
    - styles/
    - App.jsx
  - vercel.json
  - package.json

Important root docs:
- README.md
- QUICKSTART.md
- SETUP.md
- API_DOCUMENTATION.md

## 5. Backend Design

Entry point: backend/server.js

Key backend behavior:
- Loads environment variables
- Connects to MongoDB using Mongoose
- Retries DB connection every 5 seconds if connection fails
- Exposes health routes:
  - GET /
  - GET /api/health
- Mounts API routes:
  - /api/auth
  - /api/assets
- Handles 404 and error responses
- Handles port conflicts with auto-fallback (5000, then next free port)

## 6. Authentication and Authorization

Authentication model:
- Passwords are hashed with bcryptjs before storage
- On login/register, backend returns JWT token
- Frontend stores token in localStorage
- Axios request interceptor injects token in Authorization header

Authorization:
- Protected endpoints use auth middleware
- Assets are scoped by logged-in user ID

Token flow:
1. Register/Login -> token issued
2. Token attached to protected API calls
3. Invalid/expired token returns 401
4. Frontend interceptor clears local auth and redirects to login

## 7. Data Models

User model:
- name
- email (unique)
- password (hashed)
- timestamps

Asset model:
- name
- category
- serialNumber
- purchaseDate
- status
- description
- userId (owner reference)
- timestamps

## 8. API Endpoints

Auth endpoints:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

Asset endpoints (protected):
- GET /api/assets
- GET /api/assets/:id
- POST /api/assets
- PUT /api/assets/:id
- DELETE /api/assets/:id

Standard response format:
- success: boolean
- message or data payload

## 9. Frontend Design

Routing:
- HashRouter is used to avoid static-host refresh 404 problems
- Public pages: landing, login, register
- Protected page: assets

Service layer:
- frontend/src/services/api.js
- Uses VITE_API_URL environment variable
- Fallback local URL: http://localhost:5000/api

Assets page UX:
- Asset listing
- Create/edit form toggling
- Delete confirmation
- Search/filter and summary cards (latest UI enhancement)
- Error and loading states

## 10. Environment Variables

Backend (.env or Render env):
- MONGODB_URI=<Atlas URI>
- JWT_SECRET=<strong random secret>
- PORT=5000 (local optional)

Frontend (Vercel env):
- VITE_API_URL=https://<your-render-backend>.onrender.com/api

Security notes:
- Never commit .env files
- Rotate exposed credentials immediately
- Use strong JWT secret in production

## 11. Local Development Setup

Prerequisites:
- Node.js installed
- MongoDB Atlas cluster/user ready

Backend:
1. cd backend
2. npm install
3. configure backend/.env
4. npm run dev

Frontend:
1. cd frontend
2. npm install
3. optional frontend/.env with VITE_API_URL
4. npm run dev

Local URLs:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## 12. Deployment Guide

Backend on Render:
- Service type: Web Service
- Root Directory: backend
- Build Command: npm install
- Start Command: npm start
- Required env: MONGODB_URI, JWT_SECRET
- Primary URL example: https://assert-9h6u.onrender.com

Frontend on Vercel:
- Root Directory: frontend
- Build Command: npm run build
- Output Directory: dist
- Env var: VITE_API_URL=https://assert-9h6u.onrender.com/api
- Redeploy after env updates

## 13. Health Checks and Monitoring

Backend health routes:
- GET / -> API running + mongodb status field
- GET /api/health -> success true/false based on DB connectivity

Interpretation:
- mongodb: connected -> DB healthy
- mongodb: disconnected -> API up but DB auth/network issue

## 14. Known Issues and Resolutions

Issue: EADDRINUSE port 5000
- Resolution: Auto-port fallback implemented in server.js

Issue: Render 404 at /
- Resolution: Added root route returning 200 JSON

Issue: Render Bad Gateway
- Typical cause: MongoDB connection/auth issue
- Resolution: Verify Atlas user, password, and network access

Issue: Atlas auth failure
- Resolution:
  - Confirm DB user credentials
  - Use correct URI format
  - URL-encode special characters in password

Issue: Vercel frontend route 404
- Resolution:
  - HashRouter in frontend
  - vercel.json rewrite present

## 15. Validation Checklist (Go-Live)

Backend:
- / returns API running response
- /api/health returns success true
- login/register endpoints return valid responses

Frontend:
- Login and Register pages open
- Login succeeds with valid user
- Assets CRUD works end-to-end

Infrastructure:
- Render env vars set correctly
- Vercel env vars set correctly
- Atlas network access and DB user verified

## 16. Security and Operations Recommendations

Immediate:
- Rotate MongoDB credentials if exposed
- Rotate JWT secret

Recommended next improvements:
- Add rate limiting on auth endpoints
- Restrict CORS to frontend domain only
- Add centralized request logging
- Add automated tests (unit + integration)
- Add CI pipeline for lint/build checks

## 17. Maintenance Notes

When updating backend API URL:
- Update VITE_API_URL in Vercel
- Redeploy frontend

When changing schema:
- Update backend model
- Update frontend forms and validation
- Update API documentation

When changing auth behavior:
- Update middleware
- Update frontend interceptor behavior

## 18. Current Deployment References

Backend URL:
- https://assert-9h6u.onrender.com

Expected frontend API env value:
- VITE_API_URL=https://assert-9h6u.onrender.com/api

Repository:
- https://github.com/smartswagvivek/Assert.git

## 19. Final Notes

The project is architected correctly for full-stack deployment. Most historical issues were configuration-related (MongoDB auth/network, environment variables, and hosting route behavior), and code-level safeguards are now added to improve runtime resilience.

End of document.
