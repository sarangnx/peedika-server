const Sequelize = require('sequelize');
const Umzug = require('umzug');
const path = require('path');
const logger = require('../src/middleware/winston.js');

// Initialize config
require('../config');

// Create a connection to mysql.
const sequelize = new Sequelize(
    {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        // .bind fix from https://github.com/winstonjs/winston/issues/1062
        logging: process.env.DB_LOGGING === 'true' ? logger.debug.bind(logger) : false,
    },
);

// create an umzug object for migrations.
const migrations = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize,
    },
    migrations: {
        params: [
            sequelize.getQueryInterface(),
            sequelize.constructor,
        ],
        path: path.resolve(process.env.MIGRATIONS),
        pattern: /\.js$/,
    },
    logging: process.env.DB_LOGGING === 'true' ? logger.debug.bind(logger) : false,
});

// create an umzug object for seeders.
const seeders = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize,
        modelName: 'SequelizeSeeders',
    },
    migrations: {
        params: [
            sequelize.getQueryInterface(),
            sequelize.constructor,
        ],
        path: path.resolve(process.env.SEEDERS),
        pattern: /\.js$/,
    },
    logging: process.env.DB_LOGGING === 'true' ? logger.debug.bind(logger) : false,
});

module.exports = {
    // Create DB
    async createDB() {
        await sequelize.getQueryInterface().createDatabase(process.env.DB_NAME);
    },

    // Drop database
    async dropDB() {
        await sequelize.getQueryInterface().dropDatabase(process.env.DB_NAME);
    },

    // Do migrations
    async migrate() {
        await this.createDB();
        await sequelize.query(`use ${process.env.DB_NAME}`);
        await migrations.up();
    },

    // Undo single migration
    async migrateUndo() {
        await sequelize.query(`use ${process.env.DB_NAME}`);
        await migrations.down();
    },

    // Undo all migrations
    async migrateUndoAll() {
        await sequelize.query(`use ${process.env.DB_NAME}`);
        await migrations.down({ to: 0 });
    },

    // Fill table with seeds
    async seed() {
        await sequelize.query(`use ${process.env.DB_NAME}`);
        await seeders.up();
    },

    // Undo single seed
    async seedUndo() {
        await sequelize.query(`use ${process.env.DB_NAME}`);
        await seeders.down();
    },

    // Undo all seeds
    async seedUndoAll() {
        await sequelize.query(`use ${process.env.DB_NAME}`);
        await seeders.down({ to: 0 });
    },
};
