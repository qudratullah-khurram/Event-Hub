const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'username');
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username');
    if (!user) return res.redirect('/users');

    const events = await Event.find({ createdBy: req.params.id });
    res.render('users/show.ejs', { user, events });
  } catch (err) {
    console.error(err);
    res.redirect('/users');
  }
});

module.exports = router;
