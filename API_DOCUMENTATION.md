# API Documentation - Office Asset Management

Base URL: `http://localhost:5000/api`

---

## Authentication Endpoints

### 1. Register User

**Endpoint:** `POST /auth/register`

**Description:** Create a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
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

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

**Validation Rules:**
- Name: Required, max 50 characters
- Email: Required, valid email format, unique
- Password: Required, minimum 6 characters

---

### 2. Login User

**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
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

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 3. Get Current User

**Endpoint:** `GET /auth/me`

**Description:** Get authenticated user information

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Token is not valid"
}
```

---

## Asset Endpoints

### 4. Get All Assets

**Endpoint:** `GET /assets`

**Description:** Get all assets for the authenticated user

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Dell Monitor",
      "category": "Electronics",
      "serialNumber": "SN-2024001",
      "purchaseDate": "2024-01-15T00:00:00Z",
      "status": "AVAILABLE",
      "description": "27-inch 4K Monitor",
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

---

### 5. Get Single Asset

**Endpoint:** `GET /assets/:id`

**Description:** Get a specific asset by ID

**Parameters:**
- `id` (string, required): Asset MongoDB ObjectId

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Dell Monitor",
    "category": "Electronics",
    "serialNumber": "SN-2024001",
    "purchaseDate": "2024-01-15T00:00:00Z",
    "status": "AVAILABLE",
    "description": "27-inch 4K Monitor",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Responses:**
- 404: Asset not found
- 403: Not authorized to access this asset
- 401: Invalid token

---

### 6. Create Asset

**Endpoint:** `POST /assets`

**Description:** Create a new asset

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Dell Monitor",
  "category": "Electronics",
  "serialNumber": "SN-2024001",
  "purchaseDate": "2024-01-15",
  "status": "AVAILABLE",
  "description": "27-inch 4K Monitor"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Dell Monitor",
    "category": "Electronics",
    "serialNumber": "SN-2024001",
    "purchaseDate": "2024-01-15T00:00:00Z",
    "status": "AVAILABLE",
    "description": "27-inch 4K Monitor",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Validation Rules:**
- name: Required, max 100 characters
- category: Required, must be one of: Electronics, Furniture, Tools, Supplies, Equipment, Other
- serialNumber: Required, unique, max 100 characters
- purchaseDate: Required, valid date format
- status: Optional, default "AVAILABLE"
- description: Optional, max 500 characters

**Error Response (400):**
```json
{
  "success": false,
  "message": "Serial number already exists"
}
```

---

### 7. Update Asset

**Endpoint:** `PUT /assets/:id`

**Description:** Update an existing asset

**Parameters:**
- `id` (string, required): Asset MongoDB ObjectId

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:** (All fields optional)
```json
{
  "name": "Dell Monitor 27",
  "category": "Electronics",
  "serialNumber": "SN-2024001",
  "purchaseDate": "2024-01-15",
  "status": "IN_USE",
  "description": "27-inch 4K Monitor - Updated"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Dell Monitor 27",
    "category": "Electronics",
    "serialNumber": "SN-2024001",
    "purchaseDate": "2024-01-15T00:00:00Z",
    "status": "IN_USE",
    "description": "27-inch 4K Monitor - Updated",
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

**Error Responses:**
- 404: Asset not found
- 403: Not authorized to update this asset
- 401: Invalid token
- 400: Serial number already exists

---

### 8. Delete Asset

**Endpoint:** `DELETE /assets/:id`

**Description:** Delete an asset

**Parameters:**
- `id` (string, required): Asset MongoDB ObjectId

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Asset deleted successfully"
}
```

**Error Responses:**
- 404: Asset not found
- 403: Not authorized to delete this asset
- 401: Invalid token

---

## Status Codes Reference

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Asset retrieved successfully |
| 201 | Created | Asset created successfully |
| 400 | Bad Request | Missing required fields |
| 401 | Unauthorized | Invalid or missing token |
| 403 | Forbidden | User not authorized for this asset |
| 404 | Not Found | Asset does not exist |
| 500 | Server Error | Database connection failed |

---

## Authentication Header Format

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTY3Njk0MzIwMCwiZXhwIjoxNjc5NTM1MjAwfQ.2hY3_Zq6Kx8pL9mN4oP5qR6sT7uV8wX9yZ0aB1cD2e
```

Token expires in 30 days. After expiration, user must login again.

---

## Asset Categories

Valid category values:
- `Electronics`
- `Furniture`
- `Tools`
- `Supplies`
- `Equipment`
- `Other`

---

## Asset Status Values

Valid status values:
- `AVAILABLE` - Asset is available for use
- `IN_USE` - Asset is currently being used
- `MAINTENANCE` - Asset is under maintenance
- `DAMAGED` - Asset is damaged
- `RETIRED` - Asset is no longer in use

---

## Example CURL Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Assets
```bash
curl -X GET http://localhost:5000/api/assets \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Asset
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

### Update Asset
```bash
curl -X PUT http://localhost:5000/api/assets/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "IN_USE"
  }'
```

### Delete Asset
```bash
curl -X DELETE http://localhost:5000/api/assets/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Rate Limiting & Throttling

No rate limiting is implemented in this version. For production, consider adding rate limiting middleware.

---

## CORS Configuration

CORS is enabled for all origins. Update the CORS configuration in `backend/server.js` for production:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

---

**API Documentation Version:** 1.0.0  
**Last Updated:** 2024
