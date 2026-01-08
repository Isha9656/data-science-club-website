# Data Science Club Website - Setup Guide

This guide will help you set up both the frontend and backend for the Data Science Club Website.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MongoDB

**Option A: Local MongoDB**
- Install MongoDB on your system
- Make sure MongoDB service is running
- Default connection: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string
- Replace `<password>` with your database password

### 4. Create Environment File

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/data-science-club
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/data-science-club?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

### 5. Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Navigate to Root Directory

```bash
# If you're in backend directory, go back
cd ..
```

### 2. Install Dependencies (if not already installed)

```bash
npm install
```

### 3. Configure API URL

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Frontend Development Server

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Running Both Servers

You need to run both servers simultaneously:

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   npm start
   ```

## Testing the Connection

1. Open your browser to `http://localhost:3000`
2. Navigate to the Login page
3. Try logging in (the demo login should work, or register a new account)
4. Check the browser console and backend terminal for any errors

## API Endpoints

Once the backend is running, you can test the API:

- Health Check: `http://localhost:5000/api/health`
- All Members: `http://localhost:5000/api/members`
- All Events: `http://localhost:5000/api/events`

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Error:**
   - Make sure MongoDB is running (if using local)
   - Check your `MONGODB_URI` in `.env`
   - For Atlas, ensure your IP is whitelisted

2. **Port Already in Use:**
   - Change `PORT` in backend `.env` file
   - Update `REACT_APP_API_URL` in frontend `.env` accordingly

### Frontend Issues

1. **API Connection Error:**
   - Make sure backend is running
   - Check `REACT_APP_API_URL` in `.env`
   - Check browser console for CORS errors

2. **CORS Errors:**
   - Backend already has CORS enabled
   - If issues persist, check backend `server.js` CORS configuration

## Next Steps

- Create admin user via API or directly in MongoDB
- Add sample data (members, events, achievements)
- Customize the frontend and backend as needed

## Support

For issues or questions, check:
- Backend README: `backend/README.md`
- Frontend code comments
- MongoDB documentation



