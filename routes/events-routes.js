const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const eventsControllers = require('../controllers/events-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/', eventsControllers.getEvents);

module.exports = router;
