const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const contactsControllers = require('../controllers/contacts-controllers');

const router = express.Router();

router.get('/', contactsControllers.getContacts);

router.use(checkAuth);

router.get('/me', contactsControllers.getMyContacts);

router.post(
	'/',
	[
		check('name')
			.not()
			.isEmpty(),
		check('email')
			.normalizeEmail()
			.isEmail()
	],
	contactsControllers.createMyContacts
);

router.patch(
	'/:cid',
	[
		check('name')
			.not()
			.isEmpty(),
		check('email')
			.normalizeEmail()
			.isEmail()
	],
	contactsControllers.updateContactById
);

router.delete('/:cid', contactsControllers.deleteContactById);

module.exports = router;
