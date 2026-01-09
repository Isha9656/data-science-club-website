# Database Management Guide

This guide explains how to set up and manage your MongoDB database for the Data Science Club Website.

## Table of Contents
1. [MongoDB Setup Options](#mongodb-setup-options)
2. [Local MongoDB Installation](#local-mongodb-installation)
3. [MongoDB Atlas (Cloud) Setup](#mongodb-atlas-cloud-setup)
4. [Database Connection](#database-connection)
5. [Database Management Tools](#database-management-tools)
6. [Common Operations](#common-operations)
7. [Backup and Restore](#backup-and-restore)

## MongoDB Setup Options

You have two main options:
1. **Local MongoDB** - Install MongoDB on your computer
2. **MongoDB Atlas** - Use MongoDB cloud service (Recommended for beginners)

---

## Local MongoDB Installation

### Windows

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Download the Windows installer (.msi file)
   - Run the installer and follow the setup wizard

2. **Install MongoDB:**
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool - recommended)

3. **Verify Installation:**
   ```bash
   # Open Command Prompt or PowerShell
   mongod --version
   mongo --version
   ```

4. **Start MongoDB Service:**
   - MongoDB should start automatically as a Windows service
   - Or manually start: `net start MongoDB`

5. **Connection String:**
   ```
   mongodb://localhost:27017/data-science-club
   ```

### macOS

1. **Using Homebrew (Recommended):**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

2. **Connection String:**
   ```
   mongodb://localhost:27017/data-science-club
   ```

### Linux (Ubuntu/Debian)

1. **Install MongoDB:**
   ```bash
   sudo apt-get update
   sudo apt-get install -y mongodb
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

2. **Connection String:**
   ```
   mongodb://localhost:27017/data-science-club
   ```

---

## MongoDB Atlas (Cloud) Setup

MongoDB Atlas is a free cloud database service - perfect for development and small projects.

### Step 1: Create Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email (free tier available)

### Step 2: Create a Cluster

1. **Choose a Cloud Provider:**
   - Select AWS, Google Cloud, or Azure
   - Choose a region close to you
   - Select **M0 Free Tier** (512MB storage, shared cluster)

2. **Configure Cluster:**
   - Cluster name: `DataScienceClub` (or any name)
   - Click "Create Cluster"
   - Wait 3-5 minutes for cluster to be created

### Step 3: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username and password (save these!)
5. Set user privileges: **"Atlas admin"** or **"Read and write to any database"**
6. Click **"Add User"**

### Step 4: Whitelist IP Address

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
   - ⚠️ For production, use specific IPs only
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Go to **Clusters** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** and version **"4.1 or later"**
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `data-science-club`

**Example Connection String:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/data-science-club?retryWrites=true&w=majority
```

### Step 6: Update Backend .env

In `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/data-science-club?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
PORT=5000
```

---

## Database Connection

### Test Connection

1. **Start your backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Check console output:**
   - You should see: `MongoDB Connected: ...`
   - If you see an error, check your connection string

### Connection Troubleshooting

**Error: "MongoServerError: Authentication failed"**
- Check username and password in connection string
- Verify database user exists in MongoDB Atlas

**Error: "MongoNetworkError: connect ECONNREFUSED"**
- Local MongoDB: Make sure MongoDB service is running
- Atlas: Check IP whitelist settings

**Error: "MongoServerError: IP not whitelisted"**
- Add your IP address in MongoDB Atlas Network Access

---

## Database Management Tools

### 1. MongoDB Compass (GUI Tool)

**Download:** https://www.mongodb.com/products/compass

**Features:**
- Visual database browser
- Query builder
- Data editing
- Index management

**Connect:**
- Local: `mongodb://localhost:27017`
- Atlas: Use your connection string

### 2. MongoDB Atlas Web Interface

- View collections and documents
- Run queries
- Monitor performance
- Manage users and security

### 3. Command Line (mongosh)

**Install mongosh:**
- Download from: https://www.mongodb.com/try/download/shell

**Connect:**
```bash
# Local
mongosh mongodb://localhost:27017/data-science-club

# Atlas
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/data-science-club"
```

---

## Common Operations

### View All Collections

**Using MongoDB Compass:**
- Open Compass
- Connect to your database
- See all collections in left sidebar

**Using mongosh:**
```javascript
use data-science-club
show collections
```

### View Documents

**Users Collection:**
```javascript
db.users.find().pretty()
```

**Events Collection:**
```javascript
db.events.find().pretty()
```

**Achievements Collection:**
```javascript
db.achievements.find().pretty()
```

### Create Admin User (via API)

**Using Postman or curl:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@marwadiuniversity.ac.in",
    "password": "admin123",
    "role": "admin"
  }'
```

**Or create directly in MongoDB:**
```javascript
use data-science-club
db.users.insertOne({
  name: "Admin User",
  email: "admin@marwadiuniversity.ac.in",
  password: "$2a$10$hashedpassword...", // Use bcrypt to hash
  role: "admin"
})
```

### Update User Role

```javascript
db.users.updateOne(
  { email: "user@marwadiuniversity.ac.in" },
  { $set: { role: "admin" } }
)
```

### Delete All Documents in Collection

```javascript
db.users.deleteMany({})
db.events.deleteMany({})
db.achievements.deleteMany({})
```

### Count Documents

```javascript
db.users.countDocuments()
db.events.countDocuments()
db.achievements.countDocuments()
```

---

## Backup and Restore

### Backup Database

**Using mongodump:**
```bash
# Local
mongodump --uri="mongodb://localhost:27017/data-science-club" --out=./backup

# Atlas
mongodump --uri="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/data-science-club" --out=./backup
```

### Restore Database

**Using mongorestore:**
```bash
mongorestore --uri="mongodb://localhost:27017/data-science-club" ./backup/data-science-club
```

### MongoDB Atlas Backup

- Atlas automatically creates backups (paid plans)
- Free tier: Manual backups only
- Go to **Clusters** → **Backups** tab

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ("member" | "admin"),
  skills: String,
  github: String,
  phone: String,
  course: String,
  year: String,
  photo: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Events Collection
```javascript
{
  _id: ObjectId,
  title: String,
  date: Date,
  description: String,
  location: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Achievements Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  user: ObjectId (ref: User),
  date: Date,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Security Best Practices

1. **Never commit .env files** - They contain sensitive credentials
2. **Use strong JWT secrets** - Generate random strings
3. **Limit IP access** - Don't use 0.0.0.0/0 in production
4. **Use environment variables** - Never hardcode credentials
5. **Regular backups** - Especially before major changes
6. **Strong passwords** - For database users

---

## Quick Reference

### Start Local MongoDB
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### Stop Local MongoDB
```bash
# Windows
net stop MongoDB

# macOS
brew services stop mongodb-community

# Linux
sudo systemctl stop mongodb
```

### Check MongoDB Status
```bash
# Windows
sc query MongoDB

# macOS/Linux
sudo systemctl status mongodb
```

---

## Need Help?

- **MongoDB Documentation:** https://docs.mongodb.com/
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **MongoDB Community:** https://community.mongodb.com/

---

## Next Steps

1. ✅ Set up MongoDB (local or Atlas)
2. ✅ Update backend `.env` with connection string
3. ✅ Start backend server and verify connection
4. ✅ Create an admin user via API
5. ✅ Start adding data through your application!




