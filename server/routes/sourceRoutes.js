const express = require('express');
const { addSource, getSources, getSourceById } = require('../controllers/sourceController');
const router = express.Router();

router.post('/', addSource);
router.get('/single/:sourceId', getSourceById); // Must come before /:userId
router.get('/:userId', getSources);

module.exports = router;
