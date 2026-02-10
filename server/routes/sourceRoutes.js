const express = require('express');
const { addSource, getSources, getSourceById } = require('../controllers/sourceController');
const router = express.Router();
const multer = require('multer');

// Configure multer for memory storage (we'll parse the buffer directly)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Use upload.single('file') to handle multipart/form-data
router.post('/', upload.single('file'), addSource);
router.get('/single/:sourceId', getSourceById);
router.get('/:userId', getSources);

module.exports = router;
