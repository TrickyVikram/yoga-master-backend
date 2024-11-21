const express = require('express');
const { getEnrolledClasses } = require('../controllers/enrolledController');
const router = express.Router();

router.get('/:userId', getEnrolledClasses);

module.exports = router;
