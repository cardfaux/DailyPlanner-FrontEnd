const express = require('express');
const { check } = require('express-validator');

const checkAuth = require('../middleware/check-auth');

const profilesControllers = require('../controllers/profiles-controllers');

const router = express.Router();

router.get('/', profilesControllers.getProfiles);

router.use(checkAuth);

router.get('/me', profilesControllers.getMyProfile);

router.put('/notes', profilesControllers.addNotesToProfile);

module.exports = router;
