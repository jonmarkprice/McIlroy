// A simple router to redirect API routes
const express = require('express');
const router  = express.Router();

router.use('/user', require('./user'));
// router.use('/program', require('./program'));

module.exports = router;
