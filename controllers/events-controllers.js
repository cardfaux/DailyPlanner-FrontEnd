// Bring In Error Model
const HttpError = require('../models/http-error');

// Bring In The User Model
const User = require('../models/user-model');

// Bring In The Event Model
const Event = require('../models/event-model');

// @type -- GET
// @path -- /api/events
// @desc -- path to get all the events
const getEvents = async (req, res, next) => {
	let events;

	try {
		events = await Event.find({});
	} catch (err) {
		const error = new HttpError('Fetching Events Failed', 500);
		return next(error);
	}

	res.json({
		events: events.map((event) => event.toObject({ getters: true }))
	});
};

exports.getEvents = getEvents;
