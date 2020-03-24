/**
 * model: brands
 * Stores the list of brands, and associates with
 * inventory.
 */

module.exports = (sequelize, DataTypes) => {
    const brands = sequelize.define('brands', {
        brand_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        brand_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }, { timestamps: false, freezeTableName: true });
    
    brands.associate = function(models) {
        brands.hasMany(models.inventory, {
            sourceKey: 'brand_id', // this
            foreignKey: 'brand_id', // target
            as: 'items'
        });
    };
    return brands;
};
