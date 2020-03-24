const bcrypt = require('bcryptjs');

function hashPassword(password){
    let hash = bcrypt.hashSync(password,8);
    return hash;
}

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users',[{
            user_id: 1,
            email: 'ajeshashok09@gmail.com',
            phone: '9562778198',
            password: hashPassword('ajeshashok'),
            roles: JSON.stringify(['owner']),
            usergroup: 'store'
        }],{})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};