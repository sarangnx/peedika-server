
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('owner_details',[{
            owner_id: 1,
            name: 'Ajesh Ashok',
        }],{})
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('owner_details', null, {});
    }
};
