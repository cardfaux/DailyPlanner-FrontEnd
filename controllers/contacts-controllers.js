// Packages
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Bring In Error Model
const HttpError = require('../models/http-error');

// Bring In The User Model
const User = require('../models/user-model');

// Bring In The Event Model
const Contact = require('../models/contact-model');

// @type -- GET
// @path -- /api/contacts
// @desc -- path to get all the contacts
const getContacts = async (req, res, next) => {
	let contacts;

	try {
		contacts = await Event.find({});
	} catch (err) {
		const error = new HttpError('Fetching Contacts Failed', 500);
		return next(error);
	}

	res.json({
		contacts: contacts.map((contact) => contact.toObject({ getters: true }))
	});
};

exports.getContacts = getContacts;
