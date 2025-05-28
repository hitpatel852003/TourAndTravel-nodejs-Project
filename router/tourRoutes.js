const express = require('express');
const router = express.Router();
const {getTour,getTourBySlug} = require('../controller/tourController');

router.get('/', getTour);
router.get('/tours/:slug', getTourBySlug);

module.exports = router;
