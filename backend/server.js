console.log("🔥 BACKEND SERVER.JS IS RUNNING");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

// Load environment variables FIRST
dotenv.config();

// ---- TIME DEBUG (IMPORTANT FOR CLOUDINARY) ----
console.log("Server local time:", new Date().toString());
console.log("Server UTC time:", new Date().toISOString());

// Connect to database
connectDB();

const app = express();

// ---- MIDDLEWARE ----
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- STATIC FILES (if needed) ----
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ---- ROUTES ----
app.use("/api/auth", require("./routes/auth"));
app.use("/api/members", require("./routes/members"));
app.use("/api/committee", require("./routes/committee"));
app.use("/api/events", require("./routes/events"));
app.use("/api/achievements", require("./routes/achievements"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/event-gallery", require("./routes/eventGallery"));
app.use("/api/upload", require("./routes/upload"));

// ---- HEALTH CHECK ----
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timeUTC: new Date().toISOString(),
  });
});

// ---- GLOBAL ERROR HANDLER (REAL ONE) ----
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ---- START SERVER ----
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
