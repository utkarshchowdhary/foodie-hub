const express = require('express');

const upload = require('../middlewares/uploadMiddleware');
const { uploadImage } = require('../controllers/uploadController');

const router = express.Router();

// Route for uploading recipe images (cover_image or content_image)
router.post('/', upload.single('image'), uploadImage);

module.exports = router;
