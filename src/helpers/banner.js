const fs = require('fs').promises;
const path = require('path');

const Banners = require('../models').banners;
const Offers = require('../models').offers;

const required = require('../helpers/utils').required;

/**
 * Add a banner.
 * 
 * @param {Object} data - Banner details.
 */
const addBanner = async (data) => {

    try {

        required([
            'banner_name',
            'banner_image'
        ], data);

        await Banners.create(data)

    } catch(err) {
        throw err;
    }

}

module.exports.addBanner = addBanner;


/**
 * Get details of all banners.
 */
const viewAllBanners = async () => {

    try {

        const banners = await Banners.findAndCountAll({
            include: [{
                model: Offers,
                as: 'offer'
            }],
            order: [
                ['banner_order', 'ASC']
            ]
        });

        const rows = banners.rows.map((banner) => {
            banner = banner.dataValues;

            // Add URL for showing items on clicking on banners
            if(banner.offer && banner.offer.offer_id){
                banner.url = `/api/inventory/items/offers?offer_id=${banner.offer.offer_id}`;
            }

            return banner;
        });

        return {
            banners: rows,
            count: banners.count
        };

    } catch(err) {
        throw err;
    }

}

module.exports.viewAllBanners = viewAllBanners;


/**
 * Delete a banner.
 * 
 * @param {Number} banner_id - Banner ID
 */
const deleteBanner = async (banner_id) => {

    try {

        // find the item to delete
        const banner = await Banners.findOne({
            where: {
                banner_id
            }
        });

        if( !banner ){
            throw new Error('Cannot find the banner to delete.');
        }

        // get file name of banner image to delete it.
        const filename = banner.banner_image;

        // If image_path is not null, join path.
        let file;
        if( filename ){
            file = path.join(__dirname, '..', '..', 'images', 'banners', filename);
        }

        // if file is not null, try deleting the file.
        if( file ){
            try {
                await fs.unlink(file);
            } catch(err) {
                /***
                * If the error code is not ENOENT,
                * ie., if error is not 'file not found',
                * return the error.
                * There is nothing to do,
                * if there is no file to be deleted.
                */
                if( err.code !== 'ENOENT' ){
                    throw err;
                }
            }
        }

        // delete database row
        await banner.destroy();

    } catch(err) {
        throw err;
    }

}

module.exports.deleteBanner = deleteBanner;
