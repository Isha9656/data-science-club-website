# Quick Start: Database Setup

## Option 1: MongoDB Atlas (Cloud - Easiest) ⭐ Recommended

### 5-Minute Setup:

1. **Sign up:** https://www.mongodb.com/cloud/atlas/register
2. **Create Free Cluster:**
   - Click "Build a Database"
   - Choose **M0 Free** tier
   - Select region → Click "Create"
3. **Create Database User:**
   - Go to "Database Access" → "Add New Database User"
   - Username: `datascienceclub`
   - Password: `YourSecurePassword123!`
   - Click "Add User"
4. **Whitelist IP:**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"
5. **Get Connection String:**
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `data-science-club`

6. **Update `backend/.env`:**
   ```env
   MONGODB_URI=mongodb+srv://datascienceclub:YourSecurePassword123!@cluster0.xxxxx.mongodb.net/data-science-club?retryWrites=true&w=majority
   JWT_SECRET=your-random-secret-key-here
   PORT=5000
   ```

7. **Test Connection:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Look for: `MongoDB Connected: ...`

---

## Option 2: Local MongoDB

### Windows:

1. **Download:** https://www.mongodb.com/try/download/community
2. **Install:** Run installer, choose "Complete"
3. **Verify:** MongoDB starts automatically
4. **Update `backend/.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/data-science-club
   JWT_SECRET=your-random-secret-key-here
   PORT=5000
   ```

### macOS:

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Update `backend/.env` same as Windows.

---

## Create Your First Admin User

After starting the backend, create an admin user:

**Using curl (PowerShell/Command Prompt):**
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Admin\",\"email\":\"admin@marwadiuniversity.ac.in\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

**Using Postman:**
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Body (JSON):
  ```json
  {
    "name": "Admin",
    "email": "admin@marwadiuniversity.ac.in",
    "password": "admin123",
    "role": "admin"
  }
  ```

**Or use the frontend:**
- Go to http://localhost:3000/login
- Click "Sign Up"
- Select "Committee" (admin)
- Fill in the form

---

## Verify Everything Works

1. **Backend running:** `http://localhost:5000/api/health` should return `{"message":"Server is running","status":"OK"}`
2. **Database connected:** Check backend console for "MongoDB Connected"
3. **Frontend running:** `http://localhost:3000` should load
4. **Login works:** Try logging in with your admin account

---

## Common Issues

**"MongoDB Connected" not showing:**
- Check your connection string in `.env`
- For Atlas: Verify IP is whitelisted
- For local: Make sure MongoDB service is running

**"Authentication failed":**
- Check username/password in connection string
- Verify database user exists in Atlas

**"ECONNREFUSED":**
- Local: Start MongoDB service
- Atlas: Check network access settings

---

## Next Steps

✅ Database connected  
✅ Admin user created  
✅ Ready to use!  

Start adding members, events, and achievements through your application!

For detailed information, see [DATABASE_MANAGEMENT.md](./DATABASE_MANAGEMENT.md)




