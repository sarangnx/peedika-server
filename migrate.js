require('dotenv').config();
const Umzug = require('umzug');
const db = require('./src/models');
const path = require('path');

/**
 * create an umzug object for migrations.
 */
let migrations = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: db.sequelize
    },
    migrations:{
        params: [
            db.sequelize.getQueryInterface(),
            db.sequelize.constructor
        ],
        path: path.resolve('./src/migrations'),
        pattern: /\.js$/,
    },
    logging: false
});

/**
 * Do migrations
 */
const migrate = () => {
    return migrations.up();
}

module.exports.migrate = migrate;

/**
 * Undo single migration
 */
const migrateUndo = () => {
    // Undo last migration.
    return migrations.down();
}

module.exports.migrateUndo = migrateUndo;

/**
 * Undo all migrations
 */
const migrateUndoAll = () => {
    // Undo All migrations
    return migrations.down({ to:0 });
}

module.exports.migrateUndoAll = migrateUndoAll;

let seeders = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: db.sequelize,
        modelName: 'SequelizeSeeders'
    },
    migrations:{
        params: [
            db.sequelize.getQueryInterface(),
            db.sequelize.constructor
        ],
        path: path.resolve('./src/seeders'),
        pattern: /\.js$/
    },
    logging: false
});

/**
 * Fill table with seeds
 */
const seed = () => {
    return seeders.up();
}

module.exports.seed = seed;

/**
 * Undo single seed
 */
const seedUndo = () => {
    // Undo last seed.
    return seeders.down();
}

module.exports.seedUndo = seedUndo;

/**
 * Undo all seeds
 */
const seedUndoAll = () => {
    // Undo All seeds
    return seeders.down({ to:0 });
}

module.exports.seedUndoAll = seedUndoAll;
