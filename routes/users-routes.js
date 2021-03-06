const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const usersControllers = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

// -----------------Users Routes Starts-----------------------------
router.get('/', usersControllers.getUsers);

router.post(
	'/signup',
	fileUpload.single('image'),
	[
		check('name')
			.not()
			.isEmpty(),
		check('email')
			.normalizeEmail()
			.isEmail(),
		check('password').isLength({ min: 6 })
	],
	usersControllers.signup
);

router.post('/login', usersControllers.login);

router.get('/myData', checkAuth, usersControllers.getMyData);
// ----------------Users Routes Ends----------------------------------

module.exports = router;
