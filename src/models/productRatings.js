/**
 * model: rating for product by user in a store.
 */

module.exports = (sequelize, DataTypes) => {
    const product_rating = sequelize.define('product_ratings',{
        rating_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        product_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        star_rating: {
            type: DataTypes.REAL(2,1),
            allowNull: false
        },
        feedback: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
        }
    },{ freezeTableName: true, paranoid:true });

    product_rating.associate = function(models) {
        // Association
    };
    return product_rating;
};
