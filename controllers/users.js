// controllers/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');

// index - list all users (community)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'username');
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// show - show a user's events (read-only)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username');
    if (!user) return res.redirect('/users');

    // find events by that user
    const events = await Event.find({ createdBy: req.params.id });
    res.render('users/show.ejs', { user, events });
  } catch (err) {
    console.error(err);
    res.redirect('/users');
  }
});

module.exports = router;
