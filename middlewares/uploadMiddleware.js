const multer = require('multer');

// Store files in memory for Cloudinary upload
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
