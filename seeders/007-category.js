

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('category', [{
            category_id: 1,
            category_name: 'Grocery',
            image: 'grocery.jpg'
        },{
            category_id: 2,
            category_name: 'Vegetables & Fruits',
            image: 'vegnfruits.jpg'
        },{
            category_id: 3,
            category_name: 'Sanitary items',
            image: 'sanitary.jpg'
        },{
            category_id: 4,
            category_name: 'Medicals',
            image: 'medicals.jpg'
        },{
            category_id: 5,
            category_name: 'Vegetables',
            parent_category_id: 2,
            image: 'vegetables.jpg'
        },{
            category_id: 6,
            category_name: 'Fruits',
            parent_category_id: 2,
            image: 'fruits.jpg'
        }],{});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('category', null, {});
    }
};
