/**
 * Error Handler Middleware, catches errors, sends appropriate
 * HTTP response and logs error messages.
 */

const logger = require('./winston.js');
const codes = require('./errorCodes.js');

module.exports = function (error, req, res, next) {
    const code = parseInt(error.code, 10) || parseInt(error.status, 10) || 500;

    res.status(code);
    res.json({
        error: {
            type: codes[code],
            message: error.message || codes[code].toLowercase(),
        },
    });

    const message = `${req.method || ''} ${req.url || ''} ${error.message}`;
    logger.error(message);
    next();
};
