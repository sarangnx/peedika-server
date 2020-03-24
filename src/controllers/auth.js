const passport = require('passport');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const Auth = require('../helpers/auth');

require('../middleware/passport')(passport);
/*
  TODO:
  Employee Login
*/

/**
 * Login Using username (phone|email) and password
 * @param {Object} req  Request Object
 * @param {Object} res  Response Object
 * @param {Function} next Callback function
 */
const login = (req, res, next) => {

try{
    // Login using Local Strategy.
    passport.authenticate('login',{session: false}, (err,user,info) => {
        if (err || !user) {
            res.statusCode = 401;
            return res.json({
                status: 'failed',
                message: info ? info.message : 'Login failed',
            });
        }

        /**
         * Sign the user details / payload
         */
        req.login(user, {session: false}, async (err) => {
            if (err) {
                return res.json({
                    status: 'failed',
                    message: 'Login Failed',
                });
            }

            user = _.pick(user, [ 'user_id', 'roles', 'usergroup', 'store' ]);
            const token = await jwt.sign(user, process.env.JWT_ENCRYPTION, { expiresIn: process.env.JWT_EXPIRATION });
            const data = {user, token};
            return res.json({
                status: 'success',
                message: 'Login Successful',
                data: data,
            });
        });
    })(req,res,next);
}
catch(err){
    res.json({
        status: 'failed',
        message: 'Login Failed',
    });
}

}

module.exports.login = login;

/**
 * Register end users only.
 */
const register = (req, res, next) => {

    const options = {
        roles: ['new'],
        usergroup: 'user'
    }

    // Register User
    Auth.registerUser(req.body, options).then(() => {
        res.json({
            status: 'success'
        });
    }).catch((err) => {
        /**
         * Pass SQL errors to error handler middleware.
         */
        if(err.errors) {
            err.message = err.errors[0].message;
        }
        next(err);
    });

}

module.exports.register = register;


/**
 * Send a code to registered email or phone number prior to changing the password.
 * regex is used to identify between email and phone number.
 * @param {String} req.body.username - Email or Phone number that is used as username
 */
const forgotPassword = async (req, res, next) => {

    try {
        
        const username = req.body.username;

        await Auth.forgotPassword(username);

        res.json({
            status: 'success',
            message: 'Code sent to email/phone provided.'
        });

    } catch(err) {
        next(err);
    }
}

module.exports.forgotPassword = forgotPassword;


/**
 * Verify the given OTP is valid or not.
 * @param {String} req.body.otp - Send OTP to verify.
 * @param {String} req.body.username - Email or phone number used for verification.
 */
const verifyOTP = async (req, res, next) => {

    try {

        const OTP = req.body.otp;
        const user = req.body.username;

        const verification = await Auth.verifyOTP(OTP, user);

        if( verification === true ){
            res.json({
                status: 'success',
                message: 'OTP Valid'
            });
        } else {
            res.json({
                status: 'failed',
                message: 'OTP Invalid'
            });
        }

    } catch(err) {
        next(err);
    }
}

module.exports.verifyOTP = verifyOTP;


/**
 * Change password after otp verification
 * @param {String} req.body.otp - Send OTP to verify.
 * @param {String} req.body.username - Email or phone number used for verification.
 * @param {String} req.body.password - New password.
 */
const changePassword = async (req, res, next) => {

    try {

        const otp = req.body.otp;
        const username = req.body.username;
        const password = req.body.password;

        await Auth.changePassword(username, password, otp);

        res.json({
            status: 'success',
            message: 'Password reset'
        });

    } catch(err) {
        next(err);
    }
}

module.exports.changePassword = changePassword;
