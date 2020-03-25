/**
 * Inventory routes.
 * Querying items, filtering based on brand,
 * filtering based on category, etc.. are done here.
 */

const express = require('express');
const multer = require('multer');
const path = require('path');

const Inventory = require('../controllers/inventory');
const jwtAuth = require('../middleware/auth.middleware').jwtAuth;

const router = express.Router();

// Storage Engine for saving uploaded images.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dest = path.resolve(process.env.IMAGE_UPLOAD_PATH);
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


/**
 * Add new Item to inventory of a store.
 * store_id is passed as a parameter.
 */
router.post('/store/:store_id', upload.single('image'), jwtAuth, Inventory.addItem);

/**
 * Edit item in the inventory.
 * item_id is passed as a parameter.
 * store_id is not required.
 */
router.patch('/item/:item_id', upload.single('image'), jwtAuth, Inventory.editItem);

/**
 * Edit only the image of an item.
 * item_id is passed as a paramter.
 */
router.patch('/item/image/:item_id', upload.single('image'), jwtAuth, Inventory.editImage);

/**
 * Delete an item from the inventory.
 * item_id is passed as a parameter.
 */
router.delete('/item/:item_id', jwtAuth, Inventory.deleteItem);

/**
 * Search for Items.
 * Query Params: { search, brand, category, page, per_page }
 */
router.get('/items', Inventory.search);

// Suggest items
router.get('/suggest', Inventory.suggest);

// Get list of all items in the inventory.
router.get('/items/all', Inventory.getAllItems);

// Get items for homepage
router.get('/items/homepage', Inventory.getRandomItems);

//  Get list of items by category, sub category and sub sub category.
router.get('/items/category', Inventory.getItemsByCategory);

// Get Items by offerID
router.get('/items/offers', Inventory.getItemsByOfferID);

// Search for a specific item by the item_id
router.get('/items/:item_id', Inventory.getItemById);

// List of categories
router.get('/categories', Inventory.getCategories);

// List of all categories, sub categories, and sub sub categories.
router.get('/categories/all', Inventory.getAllCategories);

// Get List of subcategories of a category.
router.get('/subcategory/:category_id', Inventory.getSubCategories);

router.get('/subsubcategory/:sub_category_id', Inventory.getSubSubCategories);

// List of brands
router.get('/brands', Inventory.getBrands);

module.exports = router;
