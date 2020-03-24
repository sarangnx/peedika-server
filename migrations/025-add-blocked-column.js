// Added a new column for marking a user as blocked upon admin request.
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'blocked', {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('users', 'blocked');
    }
};
