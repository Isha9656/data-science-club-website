const express = require('express');
const router = express.Router();
const EventGallery = require('../models/EventGallery');
const { auth, committeeAuth } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const galleries = await EventGallery.find()
      .populate('createdBy', 'name email')
      .populate('eventId', 'title date')
      .sort({ createdAt: -1 });
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const gallery = await EventGallery.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('eventId', 'title date');
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, committeeAuth, async (req, res) => {
  try {
    const gallery = new EventGallery({
      ...req.body,
      createdBy: req.user._id
    });
    await gallery.save();
    await gallery.populate('createdBy', 'name email');
    await gallery.populate('eventId', 'title date');
    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', auth, committeeAuth, async (req, res) => {
  try {
    const gallery = await EventGallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name email')
      .populate('eventId', 'title date');

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', auth, committeeAuth, async (req, res) => {
  try {
    const gallery = await EventGallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

