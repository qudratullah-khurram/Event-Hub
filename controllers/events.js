
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const isSignedIn = require('../middleware/is-signed-in');

router.get('/', async (req, res) => {
  try {
    const events = await Event.find({}).populate('createdBy', 'username');
    res.render('events/index.ejs', { events });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

router.get('/new', isSignedIn, (req, res) => {
  res.render('events/new.ejs');
});

router.post('/', isSignedIn, async (req, res) => {
  try {
    const createdBy = req.session.user._id;
    const { title, description, date, location } = req.body;
    const event = await Event.create({ title, description, date, location, createdBy });
    
    await User.findByIdAndUpdate(createdBy, { $push: { createdEvents: event._id } });
    res.redirect(`/events/${event._id}`);
  } catch (err) {
    console.error(err);
    res.redirect('/events');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'username');
    if (!event) return res.redirect('/events');
    res.render('events/show.ejs', { event });
  } catch (err) {
    console.error(err);
    res.redirect('/events');
  }
});


router.get('/:id/edit', isSignedIn, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.redirect('/events');

   
    if (event.createdBy.toString() !== req.session.user._id) return res.redirect(`/events/${event._id}`);

    res.render('events/edit.ejs', { event });
  } catch (err) {
    console.error(err);
    res.redirect('/events');
  }
});


router.put('/:id', isSignedIn, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.redirect('/events');

    if (event.createdBy.toString() !== req.session.user._id) return res.redirect(`/events/${event._id}`);

    const { title, description, date, location } = req.body;
    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
    await event.save();
    res.redirect(`/events/${event._id}`);
  } catch (err) {
    console.error(err);
    res.redirect('/events');
  }
});


router.delete('/:id', isSignedIn, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.redirect('/events');

    if (event.createdBy.toString() !== req.session.user._id) return res.redirect(`/events/${event._id}`);

    await Event.findByIdAndDelete(req.params.id);
    
    await User.findByIdAndUpdate(req.session.user._id, { $pull: { createdEvents: req.params.id } });

    res.redirect('/events');
  } catch (err) {
    console.error(err);
    res.redirect('/events');
  }
});

module.exports = router;
