const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

// Get all members (public)
router.get('/', async (req, res) => {
  try {
    const members = await User.find({ role: 'member' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single member
router.get('/:id', async (req, res) => {
  try {
    const member = await User.findById(req.params.id).select('-password');
    if (!member || member.role !== 'member') {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create member (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const member = new User({
      ...req.body,
      role: 'member'
    });
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update member
router.put('/:id', auth, async (req, res) => {
  try {
    // Users can only update their own profile unless they're admin
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const member = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, password: undefined }, // Don't allow password update here
      { new: true, runValidators: true }
    ).select('-password');

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete member (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const member = await User.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


