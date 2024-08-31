const { promisify } = require('util');
const { Readable } = require('stream');

const uploader = require('../config/storage');

const uploadImage = async (req, res) => {
    try {
        const { file: { buffer, mimetype, size } = {} } = req;

        if (!buffer) {
            return res.status(400).json({ status: 'error', message: 'No file uploaded' });
        }

        if (!mimetype?.startsWith('image/')) {
            return res
                .status(400)
                .json({ status: 'error', message: 'Invalid file type. Only images are allowed' });
        }

        // Limit file size to 10 MB
        if (size > 10 * 1024 * 1024) {
            return res.status(400).json({ status: 'error', message: 'File too large' });
        }

        // Upload the image to Cloudinary
        const { secure_url: imageUrl } = await new Promise((resolve, reject) => {
            const writeStream = uploader.upload_stream((err, response) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(response);
            });

            const readStream = Readable.from(buffer);

            readStream.pipe(writeStream);
        });

        res.status(200).json({
            status: 'success',
            imageUrl
        });
    } catch (error) {
        console.error('Image upload failed', error);

        res.status(500).json({ status: 'error', message: 'Image upload failed' });
    }
};

module.exports = {
    uploadImage
};
