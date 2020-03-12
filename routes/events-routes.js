const express = require('express');
const { check } = require('express-validator');

const eventsControllers = require('../controllers/events-controllers');

const router = express.Router();

router.get('/', eventsControllers.getEvents);

module.exports = router;
