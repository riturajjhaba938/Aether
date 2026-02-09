const express = require('express');
const { addSource, getSources } = require('../controllers/sourceController');
const router = express.Router();

router.post('/', addSource);
router.get('/:userId', getSources);

module.exports = router;
