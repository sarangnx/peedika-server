
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('stores',[{
            store_id: 1,
            name: 'Ashokan\'s Store',
            opening_time: '09:00',
            closing_time: '16:30',
        }],{})
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('stores', null, {});
    }
};
