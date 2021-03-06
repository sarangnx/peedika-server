const bcrypt = require('bcryptjs');

function hashPassword(password){
    let hash = bcrypt.hashSync(password,8);
    return hash;
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users',[{
            user_id: 1,
            email: 'sarang98divakaran@gmail.com',
            phone: '8086451278',
            password: hashPassword('sarang123'),
            usergroup: 'superadmin'
        },{
            user_id: 2,
            email: 'owner@gmail.com',
            password: hashPassword('sarang123'),
            usergroup: 'storeowner'
        }],{});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};