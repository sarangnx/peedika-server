/**
 * model: Offers
 * Details of offers (discounts).
 */

module.exports = (sequelize, DataTypes) => {
    const offers = sequelize.define('offers', {
        offer_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        offer_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        offer_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        offer_status: {
            // Set offer active state to true or false
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        discount_percentage: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        }
    }, { timestamps: true, freezeTableName: true });
    
    offers.associate = function(models) {
        offers.belongsToMany(models.inventory, {
            through: models.offer_items,
            // field of junction table
            foreignKey: 'offer_id',
            timestamps: false,
            as: 'items'
        });
    };
    return offers;
};
