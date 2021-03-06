// Packages
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

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

// @type -- GET
// @path -- /api/events/me
// @desc -- path to get user events
const getMyEvents = async (req, res, next) => {
	let userWithEvents;

	try {
		userWithEvents = await User.findById(req.userData.userId).populate(
			'events'
		);
	} catch (err) {
		const error = new HttpError('Fetching User Events Failed', 500);
		return next(error);
	}

	if (!userWithEvents) {
		return next(new HttpError('There Is No Events For That User.', 404));
	}

	res.json({
		events: userWithEvents.events.map((event) =>
			event.toObject({ getters: true })
		)
	});
};

// @type -- POST
// @path -- /api/events
// @desc -- path to add events
const createMyEvents = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Can Not Use throw Inside Of An Async Function
		//throw new HttpError('Invalid Inputs Passed, Please Check Your Data', 422);
		return next(
			new HttpError('Invalid Inputs Passed, Please Check Your Data', 422)
		);
	}

	const { title, allDay, start, end, description } = req.body;

	// Build Event Object Instanciate Event Constructor
	const createdEvent = new Event({
		title,
		allDay,
		start,
		end,
		description,
		creator: req.userData.userId
	});

	let user;
	try {
		user = await User.findById(req.userData.userId);
		console.log(req.userData.userId);
	} catch (err) {
		const error = new HttpError(
			'Creating A New Event Failed, Please Try Again',
			500
		);
		return next(error);
	}

	// Make Sure The User Is In The DataBase
	if (!user) {
		const error = new HttpError('Could Not Find A User For Provided Id', 404);
		return next(error);
	}

	console.log(user);

	// Create an Events Collection This Will Not Create It Automatically
	try {
		// Current Session
		// This Allows To Only Store The Changes If Both Operations Is Successful
		const sess = await mongoose.startSession();
		// Start Transaction In The Current Session
		sess.startTransaction();
		// Tell Mongoose Whst To Do
		// Create Our Place And Create An Unique Id
		await createdEvent.save({ session: sess });
		// Add The Place Id To Our User As Well
		// This Push Is Not The Standard Push, Allows Mongoose To Establish A Connection Between The Models
		// Adds The PlaceId To The Places Field Of The User
		user.events.push(createdEvent);
		await user.save({ session: sess });
		// Only At This Point Is The Session Saved In The DataBase
		// If Anything Failed Before This Point All Things Would Have Been Rolled Back And Not Saved
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			'Creating An Event Failed, Please Try Again',
			500
		);
		return next(error);
	}

	res.status(201).json({ event: createdEvent });
};

// @type -- PATCH
// @path -- /api/events/:eid
// @desc -- path to update an event by id
const updateEventById = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Can not Use Throw Inside Of An Async Function
		//throw new HttpError('Invalid Inputs Passed, Please Check Your Data', 422);
		return next(
			new HttpError('Invalid Inputs Passed, Please Check Your Data', 422)
		);
	}

	const { title, allDay, start, end, description } = req.body;
	const eventId = req.params.eid;

	let event;
	try {
		event = await Event.findById(eventId);
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong, Could Not Update Event',
			500
		);
		return next(error);
	}

	if (event.creator.toString() !== req.userData.userId) {
		const error = new HttpError('Editing Failed, Authorization Denied...', 401);
		return next(error);
	}

	event.title = title;
	event.allDay = allDay;
	event.start = start;
	event.end = end;
	event.description = description;

	try {
		await event.save();
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong, Could Not Save The Updated Event',
			500
		);
		return next(error);
	}

	res.status(200).json({ event: event.toObject({ getters: true }) });
};

// @type -- DELETE
// @path -- /api/events/:eid
// @desc -- path to delete an event the id
const deleteEventById = async (req, res, next) => {
	const eventId = req.params.eid;

	let event;
	try {
		event = await Event.findById(eventId).populate('creator');
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong Deleteing The Event',
			500
		);
		return next(error);
	}

	if (!event) {
		const error = new HttpError('Could Not Find An Event For The Id', 404);
		return next(error);
	}

	if (event.creator.id !== req.userData.userId) {
		const error = new HttpError(
			'Deleting Failed, Authorization Denied...',
			401
		);
		return next(error);
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await event.remove({ session: sess });
		// Pull Will Automatically Remove The Id
		event.creator.events.pull(event);
		await event.creator.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			'Something Went Wrong Deleteing The Event',
			500
		);
		return next(error);
	}
	res.status(200).json({ message: 'Deleted Event Successfully!' });
};

exports.getEvents = getEvents;
exports.getMyEvents = getMyEvents;
exports.createMyEvents = createMyEvents;
exports.updateEventById = updateEventById;
exports.deleteEventById = deleteEventById;
