const appRoot = require('app-root-path');
const winston = require('winston');
const triplebeam = require('triple-beam');

const { LEVEL, MESSAGE } = triplebeam;
const { combine, timestamp, printf, json, colorize, align } = winston.format;

// Custom colors for log Levels & Messages.
const levelColors = {
    error: 'bold red',
    warn: 'bold yellow',
    info: 'bold blue',
    verbose: 'bold cyan',
    debug: 'bold magenta',
    silly: 'bold green',
};
const messageColors = {
    error: 'white',
    warn: 'white',
    info: 'white',
    verbose: 'white',
    debug: 'white',
    silly: 'white',
    timestamp: 'grey',
};

// Custom format for console Logs.
const customFormat = printf(({ level, message, timestamp }) => `[ ${timestamp} ] ${level} ${message}`);

// custom settings for transports
// errors are logged in error.log
// combined logs are in app.log
const options = {
    error: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: combine(
            timestamp(),
            json(),
        ),
    },
    info: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: combine(
            timestamp(),
            json(),
        ),
    },
    console: {
        level: 'silly',
        handleExceptions: true,
        json: true,
        colorize: true,
        format: combine(
            timestamp({ format: 'D MMM YYYY hh:mm:ss A' }),
            winston.format((info) => {
                // custom format
                info.level = info.level.toUpperCase();

                if (!info.message) {
                    // when passing an object sometimes it gets combined with
                    // info object, and no message property is created, but
                    // a stringified version of object is present in info[MESSAGE]
                    info.message = JSON.parse(info[MESSAGE]);
                }

                if (info.message instanceof Object) {
                    info.message = JSON.stringify(info.message, null, 2); // pretty print objects
                }

                return info;
            })(),
            winston.format((info) => {
                // Level colorizer
                const levelColorizer = colorize({ level: true, colors: levelColors });
                info.level = levelColorizer.colorize(info[LEVEL], info.level);
                return info;
            })(),
            winston.format((info) => {
                // Message colorizer
                const messageColorizer = colorize({ message: true, colors: messageColors });
                info.message = messageColorizer.colorize(info[LEVEL], info.message);
                return info;
            })(),
            winston.format((info) => {
                // Timestamp colorizer
                const timestampColorizer = colorize({ message: true, colors: messageColors });
                info.timestamp = timestampColorizer.colorize('timestamp', info.timestamp);
                return info;
            })(),
            align(),
            customFormat,
        ),
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.error),
        new winston.transports.File(options.info),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
    emitErrs: false, // suppress winston errors
});

module.exports = logger;
