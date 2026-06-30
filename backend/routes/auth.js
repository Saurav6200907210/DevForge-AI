const express = require('express');
const router = express.Router();
const db = require('../db');

// Simple self-contained authentication routines
router.post('/login', async (req, res, next) => {
  try {
    const { email, githubUsername, fullName, phone, linkedinUrl } = req.body;

    if (!githubUsername) {
      return res.status(400).json({ error: true, message: 'GitHub username is required' });
    }

    // Attempt to locate existing profile
    let profile = await db.profiles.findByGithub(githubUsername);

    if (!profile) {
      // Create new profile dynamically on login (frictionless signup experience!)
      const defaultAvatar = `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80`;
      profile = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        fullName: fullName || githubUsername,
        email: email || `${githubUsername}@example.com`,
        phone: phone || '',
        githubUsername: githubUsername,
        avatarUrl: `https://github.com/${githubUsername}.png` || defaultAvatar,
        linkedinUrl: linkedinUrl || '',
        createdAt: new Date().toISOString(),
        analysis: null,
        resume: null,
        portfolio: null
      };
      await db.profiles.save(profile);
    } else {
      // Update any optional credentials provided
      if (fullName) profile.fullName = fullName;
      if (email) profile.email = email;
      if (phone) profile.phone = phone;
      if (linkedinUrl) profile.linkedinUrl = linkedinUrl;
      await db.profiles.save(profile);
    }

    res.json({
      success: true,
      message: 'Authenticated successfully',
      user: profile
    });
  } catch (error) {
    next(error);
  }
});

router.get('/profile/:github', async (req, res, next) => {
  try {
    const username = req.params.github;
    const profile = await db.profiles.findByGithub(username);
    if (!profile) {
      return res.status(404).json({ error: true, message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
