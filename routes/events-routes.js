const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const eventsControllers = require('../controllers/events-controllers');

const router = express.Router();

router.use(checkAuth);

router.get('/', eventsControllers.getEvents);

router.get('/me', eventsControllers.getMyEvents);

router.post(
	'/',
	[
		check('title')
			.not()
			.isEmpty(),
		check('allDay')
			.not()
			.isEmpty(),
		check('start')
			.not()
			.isEmpty(),
		check('end')
			.not()
			.isEmpty()
	],
	eventsControllers.createMyEvents
);

router.patch(
	'/:eid',
	[
		check('title')
			.not()
			.isEmpty(),
		check('allDay')
			.not()
			.isEmpty(),
		check('start')
			.not()
			.isEmpty(),
		check('end')
			.not()
			.isEmpty()
	],
	eventsControllers.updateEventById
);

router.delete('/:eid', eventsControllers.deleteEventById);

module.exports = router;
