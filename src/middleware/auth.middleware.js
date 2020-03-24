const passport = require('passport');

/**
 * Used to authenticate each protected route requests.
 */
const jwtAuth = (req, res, next) => {
    /**
     * Function to authenticate secure routes
     */
    passport.authenticate('jwt',{ session: false }, (err, user, info)=> {
        if( err || !user ){
            res.statusCode = 401;
            res.json({
                status: 'failed',
                message: info ? info.message : 'Invalid Token',
                error: err
            });
        } else {
            /**
             * Pass Data to next middleware
             */
            next({
                status: 'success',
                data: user,
            });
        }
    })(req, res, next);
}

module.exports.jwtAuth = jwtAuth;
