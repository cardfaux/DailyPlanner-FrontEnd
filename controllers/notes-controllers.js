// Packages
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Bring In Error Model
const HttpError = require('../models/http-error');

// Bring In The User Model
const User = require('../models/user-model');

// Bring In The Note Model
const Note = require('../models/note-model');

// @type -- GET
// @path -- /api/notes
// @desc -- path to get all notes
const getNotes = async (req, res, next) => {
	let notes;

	try {
		notes = await Note.find({});
	} catch (err) {
		const error = new HttpError('Fetching Notes Failed', 500);
		return next(error);
	}

	res.json({
		notes: notes.map((note) => note.toObject({ getters: true }))
	});
};

// @type -- GET
// @path -- /api/notes/me
// @desc -- path to get users notes
const getMyNotes = async (req, res, next) => {
	let myNotes;

	try {
		myNotes = await User.findById(req.userData.userId).populate('notes');
	} catch (err) {
		const error = new HttpError('Fetching Users Notes Failed', 500);
		return next(error);
	}

	if (!myNotes) {
		return next(new HttpError('There Is No Notes For That User.', 404));
	}

	res.json({
		notes: myNotes.notes.map((note) => note.toObject({ getters: true }))
	});
};

// @type -- POST
// @path -- /api/notes
// @desc -- path to create notes
const createANewNote = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Can Not Use throw Inside Of An Async Function
		//throw new HttpError('Invalid Inputs Passed, Please Check Your Data', 422);
		return next(
			new HttpError('Invalid Inputs Passed, Please Check Your Data', 422)
		);
	}

	const { title, description } = req.body;

	// Build Event Object Instanciate Note Constructor
	const createdNote = new Note({
		title,
		description,
		creator: req.userData.userId
	});

	let user;
	try {
		user = await User.findById(req.userData.userId);
	} catch (err) {
		const error = new HttpError(
			'Creating A New Note Failed, Please Try Again',
			500
		);
		return next(error);
	}

	// Make Sure The User Is In The DataBase
	if (!user) {
		const error = new HttpError('Could Not Find A User For Provided Id', 404);
		return next(error);
	}

	// Create an Events Collection This Will Not Create It Automatically
	try {
		// Current Session
		// This Allows To Only Store The Changes If Both Operations Is Successful
		const sess = await mongoose.startSession();
		// Start Transaction In The Current Session
		sess.startTransaction();
		// Tell Mongoose Whst To Do
		// Create Our Place And Create An Unique Id
		await createdNote.save({ session: sess });
		// Add The Place Id To Our User As Well
		// This Push Is Not The Standard Push, Allows Mongoose To Establish A Connection Between The Models
		// Adds The PlaceId To The Places Field Of The User
		user.notes.push(createdNote);
		await user.save({ session: sess });
		// Only At This Point Is The Session Saved In The DataBase
		// If Anything Failed Before This Point All Things Would Have Been Rolled Back And Not Saved
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			'Creating A Note Failed, Please Try Again',
			500
		);
		return next(error);
	}

	res.status(201).json({ note: createdNote });
};

exports.getNotes = getNotes;
exports.getMyNotes = getMyNotes;
exports.createANewNote = createANewNote;
