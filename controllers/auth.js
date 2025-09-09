// controllers/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust case to your filename
// show register form
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});
// handle register
router.post('/sign-up', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    // store minimal user info in session
    req.session.user = { _id: user._id.toString(), username: user.username };
    res.redirect('/events');
  } catch (err) {
    console.error(err);
    res.redirect('/auth/sign-up');
  }
});

// show login form
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

// handle login
router.post('/sign-in', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.redirect('/auth/sign-in');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.redirect('/auth/sign-in');

    req.session.user = { _id: user._id.toString(), username: user.username };
    res.redirect('/events');
  } catch (err) {
    console.error(err);
    res.redirect('/auth/sign-in');
  }
});

// sign out
router.get('/sign-out', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
