
/**
 * Used to create custom errors with http status codes.
 */
class ServerError extends Error {
    /**
     * @param {String} message - Error Message
     * @param {Number} code - HTTP Error Code
     */
    constructor(message, status) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }

    statusCode() {
        return this.status;
    }
}

module.exports = ServerError;
