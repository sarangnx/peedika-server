
module.exports = {
    up: (queryInterface, Sequelize) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('sub_category_items', null, {});
    }
};
