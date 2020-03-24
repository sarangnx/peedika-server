/**
 * Banners routes
 */
const express = require('express');
const multer = require('multer');
const path = require('path');

const Banner = require('../controllers/banner');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();


// Storage Engine for saving uploaded images.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dest = path.join(__dirname, '..', '..', 'images', 'banners');
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        // RegEx for extracting extension from filename
        const regEx = /\.[a-zA-Z]{3,4}$/;

        // Extension
        let ext = file.originalname.match(regEx);
        // 0 to -extension length. (remove extension from name)
        let name = file.originalname.slice(0, -ext.length);
        let filename = `${name}-${Date.now()}${ext}`;

        // Add filename to req, so that it can be passed through middlewares.
        req._filename = filename
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });


// Add banner
router.post('/new', upload.single('image'), jwtAuth, Banner.addBanner);

// View all banners.
router.get('/all', Banner.viewAllBanners);

// Delete Banner.
router.delete('/:banner_id', jwtAuth, Banner.deleteBanner);

module.exports = router;
