/**
 * model: store rating and feedback
 */

module.exports = (sequelize, DataTypes) => {
    const store_rating = sequelize.define('store_rating',{
        rating_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        store_id: {
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
    store_rating.associate = function(models) {
        // Association
    };
    return store_rating;
};
