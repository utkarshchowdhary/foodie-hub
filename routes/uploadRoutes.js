const express = require('express');

const { verifyToken, isChef } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { uploadImage } = require('../controllers/uploadController');

const router = express.Router();

// Route for uploading recipe images (cover_image or content_image)
router.post('/', verifyToken, isChef, upload.single('image'), uploadImage);

module.exports = router;
