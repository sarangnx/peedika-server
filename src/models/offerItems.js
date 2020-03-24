/**
 * model: offer_items
 * Junction table connecting offers with items.
 */

module.exports = (sequelize, DataTypes) => {
    const offer_items = sequelize.define('offer_items', {
        entry_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        offer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, { timestamps: false, freezeTableName: true });
    
    offer_items.associate = function(models) {
        // Each offer_items belongs to an offer.
        // An offer can have more than one offer_items
        offer_items.belongsTo(models.offers, {
            foreignKey: 'offer_id',
            targetKey: 'offer_id'
        });

        // Associate with inventory to get item deatils
        offer_items.belongsTo(models.inventory, {
            foreignKey: 'item_id',
            targetKey: 'item_id'
        });
    };
    return offer_items;
};
