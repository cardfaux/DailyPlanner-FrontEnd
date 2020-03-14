const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const contactsControllers = require('../controllers/contacts-controllers');

const router = express.Router();

router.get('/', contactsControllers.getContacts);

module.exports = router;
