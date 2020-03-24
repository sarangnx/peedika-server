const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

const Users = require('../models').users;
const Stores = require('../models').stores;

module.exports = function(passport) {
    /**
     * Login Strategy using username and password.
     */
    passport.use('login',new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            // Regex for phone number and email
            const phoneRegEx = /^[0-9]{10}$/g;
            const emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            // Set the fieldName based on username RegEx test.
            let fieldName = '';
            if(phoneRegEx.test(username)) {
                fieldName = 'phone';
            } else if(emailRegEx.test(username)) {
                fieldName = 'email';
            } else {
                return done(null, false, { message: 'Username / Password Incorrect' });
            }

            // database query to find user by fieldName
            // include store in case of (owner | employee)
            const user = await Users.findOne({
                where: {
                    [fieldName]: username,
                },
                include: [{
                    model: Stores,
                    as: 'store',
                    attributes: ['store_id'],
                    through: { attributes: [] }
                }],
            });

            // User NOT in the database
            if(!user){
                return done(null, false, { message: 'Username / Password Incorrect' });
            }

            // return error if user is blocked.
            if(user.blocked) {
                return done(null, false, { message: 'User account is suspended.' });
            }


            // User present in the database
            // Validate password
            if( await bcrypt.compare(password, user.password) ){
                // password match
                return done(null, user.dataValues, { message: 'Logged in Successfully'});
            } else {
                // password not matching
                return done(null, false, { message: 'Username / Password Incorrect' });
            }
        }catch(err) {
            return done(err, false, { message: 'Username / Password Incorrect' });
        }
    }));

    /**
     * Authenticate Using JWT strategy
     */
    passport.use('jwt',new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_ENCRYPTION,
    }, async (payload, done) => {
        try {
            // database query to find user by username
            const user = await Users.findOne({ where : { user_id: payload.user_id }});

            if(!user){
                done(null,false,{message: 'User not found'});
            }

            done(null, payload);

        } catch(err) {
            return done(err, false, { message: 'User Validation Error' });
        }
    }));
}
