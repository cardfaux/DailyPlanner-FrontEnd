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

exports.getProfiles = getProfiles;
