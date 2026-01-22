const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, "committee-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/committee", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    photoUrl: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;
