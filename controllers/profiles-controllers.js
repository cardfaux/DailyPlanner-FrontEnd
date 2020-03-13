// Packages
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Bring In Error Model
const HttpError = require('../models/http-error');

// Bring In The User Model
const User = require('../models/user-model');

// Bring In The Event Model
const Profile = require('../models/profile-model');

// @type -- GET
// @path -- /api/profiles
// @desc -- path to get all the profiles
const getProfiles = async (req, res, next) => {
	let profiles;

	try {
		profiles = await Profile.find({});
	} catch (err) {
		const error = new HttpError('Fetching Profiles Failed', 500);
		return next(error);
	}

	res.json({
		profiles: profiles.map((profile) => profile.toObject({ getters: true }))
	});
};

// @type -- GET
// @path -- /api/profiles/me
// @desc -- path to get users profile
const getMyProfile = async (req, res, next) => {
	let myProfile;

	try {
		myProfile = await User.findById(req.userData.userId).populate('profile');
	} catch (err) {
		const error = new HttpError('Fetching Users Profile Failed', 500);
		return next(error);
	}

	if (!myProfile) {
		return next(new HttpError('There Is No Profile For That User.', 404));
	}

	res.json({
		profile: myProfile.profile.map((profile) =>
			profile.toObject({ getters: true })
		)
	});
};

// @type -- POST
// @path -- /api/profiles
// @desc -- path to create profile
const addNotesToProfile = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Can Not Use throw Inside Of An Async Function
		//throw new HttpError('Invalid Inputs Passed, Please Check Your Data', 422);
		return next(
			new HttpError('Invalid Inputs Passed, Please Check Your Data', 422)
		);
	}

	const { title, description } = req.body;

	// Build Event Object Instanciate Event Constructor
	const createdNotes = new Profile({
		title,
		description,
		creator: req.userData.userId
	});

	let user;
	try {
		user = await User.findById(req.userData.userId);
	} catch (err) {
		const error = new HttpError(
			'Creating A New Profile Failed, Please Try Again',
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
		await createdNotes.save({ session: sess });
		// Add The Place Id To Our User As Well
		// This Push Is Not The Standard Push, Allows Mongoose To Establish A Connection Between The Models
		// Adds The PlaceId To The Places Field Of The User
		user.profile.notes.push(createdNotes);
		await user.save({ session: sess });
		// Only At This Point Is The Session Saved In The DataBase
		// If Anything Failed Before This Point All Things Would Have Been Rolled Back And Not Saved
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			'Creating A Profile Failed, Please Try Again',
			500
		);
		return next(error);
	}

	res.status(201).json({ notes: createdNotes });
};

exports.getProfiles = getProfiles;
exports.getMyProfile = getMyProfile;
exports.addNotesToProfile = addNotesToProfile;
