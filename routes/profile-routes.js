const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const profilesControllers = require('../controllers/profiles-controllers');

const router = express.Router();

//router.use(checkAuth);

router.get('/', profilesControllers.getProfiles);

module.exports = router;
