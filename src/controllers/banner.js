const Banner = require('../helpers/banner');

/**
 * Add Banner
 */
const addBanner = async (data, req, res, next) => {
    try {
        const banner = req.body;

        // Append filename to item.
        banner.banner_image = req._filename;

        // Add Banner
        await Banner.addBanner(banner);

        res.json({
            status: 'success',
            message: 'Banner Added.'
        });
    } catch(err) {
        next(err);
    }
}

module.exports.addBanner = addBanner;


/**
 * Get details of all banners.
 */
const viewAllBanners = async (req, res, next) => {
    try {
        const banners = await Banner.viewAllBanners();

        banners.base_url = process.env.BANNER_BASE_URL;

        res.json({
            status: 'success',
            data: banners
        });
    } catch(err){
        next(err);
    }
}

module.exports.viewAllBanners = viewAllBanners;


/**
 * Delete banner.
 *
 * @param {*} req.params.banner_id - Banner ID
 */
const deleteBanner = async (data, req, res, next) => {
    try {
        const { banner_id } = req.params;

        await Banner.deleteBanner(banner_id);

        res.json({
            status: 'success',
            message: 'Banner Deleted.'
        });
    } catch(err) {
        next(err)
    }
}
module.exports.deleteBanner = deleteBanner;
