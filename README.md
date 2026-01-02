# Data Science Club Website

A full-stack web application for managing a Data Science Club, built with React (TypeScript) frontend and Node.js/Express/MongoDB backend.

## Features

- **Member Management**: View and manage club members
- **Event Management**: Create and manage club events
- **Achievements System**: Track and display member achievements
- **User Profiles**: Member profiles with skills, GitHub, and contact info
- **Admin Dashboard**: Administrative panel for managing all aspects of the club
- **Authentication**: Secure login/registration system with role-based access

## Tech Stack

### Frontend
- React 19 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- RESTful API architecture

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd data-science-club-website
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/data-science-club
   JWT_SECRET=your-secret-key
   PORT=5000
   ```
   
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   # From root directory
   npm install
   ```
   
   Create a `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   
   Start the frontend:
   ```bash
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## Project Structure

```
data-science-club-website/
├── backend/              # Express backend server
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── server.js        # Entry point
├── src/                 # React frontend
│   ├── components/      # Reusable components
│   ├── context/         # Context providers
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions (API)
│   └── layouts/         # Layout components
└── public/              # Static assets
```

## Available Scripts

### Frontend
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

### Backend
- `npm start` - Runs the server in production mode
- `npm run dev` - Runs the server with nodemon (auto-reload)

## API Documentation

See [backend/README.md](./backend/README.md) for detailed API documentation.

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL

## Learn More

- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
