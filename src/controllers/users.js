const Users = require('../helpers/users');


/**
 * Get the profile of a user.
 *  
 * @param {Number} req.params.user_id;
 */
const getUserProfile = async (data, req, res, next) => {

    try {
        const { user_id } = req.params;

        const user = await Users.getUserProfile(user_id);

        res.json({
            status: 'success',
            data: {
                user
            }
        });

    } catch(err) {
        next(err);
    }

}

module.exports.getUserProfile = getUserProfile;


/**
 * Edit user profile.
 * 
 * @param {Number} req.body - User details.
 * @param {Number} req.body.user_id - User ID
 * @param {Number} req.body.name - User Name
 * @param {String} req.body.address1 - Address Line One
 * @param {String} req.body.address2 - Address Line Two
 * @param {String} req.body.address3 - Address Line Three
 * @param {String} req.body.city - City
 * @param {String} req.body.district - District
 * @param {String} req.body.state - State
 * @param {String} req.body.pincode - pincode
 * @param {String} req.body.landmark - Landmark
 * @param {String} req.body.phone - Phone Number
 * @param {String} req.body.email - Email
 */
const editUserProfile = async (data, req, res, next) => {

    try {

        const userdata = req.body;

        await Users.editUserProfile(userdata);

        res.json({
            status: 'success',
            message: 'User profile updated.',
        });

    } catch(err) {
        next(err);
    }

}

module.exports.editUserProfile = editUserProfile;


/**
 * Edit or Add User's address.
 * 
 * @param {Number} req.body - User details.
 * @param {Number} req.body.user_id - User ID
 * @param {String} req.body.address1 - Address Line One
 * @param {String} req.body.address2 - Address Line Two
 * @param {String} req.body.address3 - Address Line Three
 * @param {String} req.body.city - City
 * @param {String} req.body.district - District
 * @param {String} req.body.state - State
 * @param {String} req.body.pincode - pincode
 * @param {String} req.body.landmark - Landmark
 */
const editUserAddress = async (data, req, res, next) => {

    try {

        const userdata = req.body;

        await Users.editUserAddress(userdata);

        res.json({
            status: 'success',
            message: 'User address updated.',
        });

    } catch(err) {
        next(err);
    }

}

module.exports.editUserAddress = editUserAddress;


/**
 * 
 * @param {Number} req.query.page - Page Number 
 * @param {Number} req.query.per_page - Items per page
 */
const getUserProfiles = async (data, req, res, next) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const per_page = parseInt(req.query.per_page) || 20;

        const offset = ( page - 1 ) * per_page;

        const result = await Users.getUserProfiles(offset, per_page);

        // combine result with extra properties.
        Object.assign(result, {
            total_pages: Math.ceil(result.count/per_page),
            per_page: per_page,
            current_page: page
        });

        res.json({
            status: 'success',
            data: result
        });

    } catch(err) {
        next(err);
    }
}

module.exports.getUserProfiles = getUserProfiles;
