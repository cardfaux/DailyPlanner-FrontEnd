const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const notesControllers = require('../controllers/notes-controllers');

const router = express.Router();

router.get('/', notesControllers.getNotes);

router.use(checkAuth);

router.get('/me', notesControllers.getMyNotes);

router.get('/:nid', notesControllers.getNoteById);

router.post(
	'/',
	[
		check('title')
			.not()
			.isEmpty(),
		check('description')
			.not()
			.isEmpty()
	],
	notesControllers.createANewNote
);

router.patch(
	'/:nid',
	[
		check('title')
			.not()
			.isEmpty(),
		check('description')
			.not()
			.isEmpty()
	],
	notesControllers.updateNoteById
);

router.delete('/:nid', notesControllers.deleteNoteById);

module.exports = router;
