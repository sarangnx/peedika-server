
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('store_owners',[{
            entry_id: 1,
            store_owner_id: 2,
            store_id: 1,
        }],{})
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('store_owners', null, {});
    }
};
