const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');
const { sendTemporaryPasswordEmail } = require('../utils/email');

router.get('/', async (req, res) => {
  try {
    const committee = await User.find({ 
      $or: [{ role: 'committee' }, { role: 'admin' }] 
    })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(committee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const member = await User.findById(req.params.id).select('-password');
    if (!member || (member.role !== 'committee' && member.role !== 'admin')) {
      return res.status(404).json({ message: 'Committee member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { email, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const temporaryPassword = crypto.randomBytes(8).toString('hex');
    
    const member = new User({
      ...req.body,
      password: temporaryPassword,
      role: 'committee',
      mustChangePassword: true
    });

    await member.save();

    const emailSent = await sendTemporaryPasswordEmail(email, name, temporaryPassword);
    if (!emailSent) {
      await User.findByIdAndDelete(member._id);
      return res.status(500).json({ message: 'Failed to send email. User not created.' });
    }

    const memberResponse = {
      _id: member._id,
      id: member._id.toString(),
      name: member.name,
      email: member.email,
      role: member.role,
      skills: member.skills,
      github: member.github,
      phone: member.phone,
      course: member.course,
      year: member.year,
      photo: member.photo,
      mustChangePassword: member.mustChangePassword,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt
    };

    res.status(201).json({
      ...memberResponse,
      message: 'Committee member created. Temporary password has been sent to email.'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member || (member.role !== 'committee' && member.role !== 'admin')) {
      return res.status(404).json({ message: 'Committee member not found' });
    }

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, password: undefined, role: member.role },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member || (member.role !== 'committee' && member.role !== 'admin')) {
      return res.status(404).json({ message: 'Committee member not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Committee member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

