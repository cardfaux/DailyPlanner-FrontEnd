const jwt = require('jsonwebtoken');
const config = require('config');

const HttpError = require('../models/http-error');

const jwtSecret = config.get('jwtSecret');

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}
	try {
		const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
		if (!token) {
			throw new Error('No Token, Authentication failed!', 401);
		}
		const decodedToken = jwt.verify(token, jwtSecret);
		req.userData = { userId: decodedToken.userId };
		next();
	} catch (err) {
		const error = new HttpError(
			'Authentication failed, Authorization Denied...!',
			403
		);
		return next(error);
	}
};
