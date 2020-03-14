const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const notesControllers = require('../controllers/notes-controllers');

const router = express.Router();

router.get('/', notesControllers.getNotes);

router.use(checkAuth);

router.get('/me', notesControllers.getMyNotes);

router.post('/', notesControllers.createANewNote);

module.exports = router;
