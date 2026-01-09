const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const { auth, committeeAuth } = require('../middleware/auth');

// Get all achievements (public)
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find()
      .populate('user', 'name email photo')
      .populate('createdBy', 'name email')
      .sort({ date: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get achievements by user
router.get('/user/:userId', async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.params.userId })
      .populate('user', 'name email photo')
      .populate('createdBy', 'name email')
      .sort({ date: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single achievement
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id)
      .populate('user', 'name email photo')
      .populate('createdBy', 'name email');
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create achievement (admin or committee)
router.post('/', auth, committeeAuth, async (req, res) => {
  try {
    const achievement = new Achievement({
      ...req.body,
      createdBy: req.user._id
    });
    await achievement.save();
    await achievement.populate('user', 'name email photo');
    await achievement.populate('createdBy', 'name email');
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update achievement (admin or committee)
router.put('/:id', auth, committeeAuth, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('user', 'name email photo')
      .populate('createdBy', 'name email');

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete achievement (admin or committee)
router.delete('/:id', auth, committeeAuth, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;




