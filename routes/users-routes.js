const express = require('express');
const router = express.Router();

// @route --- /api/users
// @type --- GET
// @desc --- Test Route
// @access --- Public
router.get('/', (req, res) => res.send('User Route'))

module.exports = router;