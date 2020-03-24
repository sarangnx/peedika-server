/**
 * This file contains configurations other than database.
 */

const crypto = require('crypto');

const hash = crypto.createHash('sha256');

hash.update(Date.now().toString());
let jwt_enc = hash.digest('hex');

// Global CONFIG
let CONFIG = {} 

CONFIG.env          = process.env.NODE_ENV   || 'development';
CONFIG.port         = process.env.PORT  || '3000';

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || jwt_enc;
// value in milliseconds
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '1000000';

module.exports = CONFIG;
