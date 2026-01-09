# Data Science Club Backend API

This is the backend server for the Data Science Club Website, built with Node.js, Express, and MongoDB.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/data-science-club
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/data-science-club?retryWrites=true&w=majority
```

### 3. Start MongoDB

**Local MongoDB:**
- Make sure MongoDB is installed and running on your system
- Default connection: `mongodb://localhost:27017`

**MongoDB Atlas (Cloud):**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `MONGODB_URI` in `.env`

### 4. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create member (Admin only)
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member (Admin only)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/:id` - Get achievement by ID
- `GET /api/achievements/user/:userId` - Get achievements by user
- `POST /api/achievements` - Create achievement (Admin only)
- `PUT /api/achievements/:id` - Update achievement (Admin only)
- `DELETE /api/achievements/:id` - Delete achievement (Admin only)

### Profile
- `GET /api/profile/me` - Get current user profile
- `PUT /api/profile/me` - Update current user profile

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Database Models

### User
- name, email, password, role (member/admin)
- skills, github, phone, course, year, photo

### Event
- title, date, description, location
- createdBy (reference to User)

### Achievement
- name, description, user (reference to User)
- date, createdBy (reference to User)




