const express = require("express");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const EventGallery = require("../models/EventGallery");
const { auth, committeeAuth } = require("../middleware/auth");

const router = express.Router();

// ---------- MULTER CONFIG ----------
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
  },
});

// ---------- UPLOAD + SAVE ----------
router.post(
  "/committee",
  auth,
  committeeAuth,
  upload.single("photo"),
  async (req, res) => {
    console.log("🚀 OPTION B UPLOAD ROUTE HIT");

    try {
      const { title, description, eventId } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "dsclub/event-gallery" }
      );

      console.log("☁️ Cloudinary OK");

      // Save to MongoDB
      const galleryItem = await EventGallery.create({
        title,
        description,
        eventId: eventId || undefined,
        imageUrl: result.secure_url,
        publicId: result.public_id,
        createdBy: req.user._id,
      });

      console.log("✅ SAVED TO MONGO:", galleryItem._id);

      res.status(201).json(galleryItem);
    } catch (error) {
      console.error("❌ UPLOAD ERROR:", error);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

// ---------- MULTER ERROR HANDLER ----------
router.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

module.exports = router;
