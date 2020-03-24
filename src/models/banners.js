
module.exports = (sequelize, DataTypes) => {
    const banners = sequelize.define('banners', {
        banner_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        banner_order: {
            allowNull:false,
            type: DataTypes.INTEGER,
            unique: true
        },
        banner_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        banner_image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        offer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, { freezeTableName: true });
    
    banners.associate = function(models) {
        banners.belongsTo(models.offers, {
            sourceKey: 'offer_id', // this
            foreignKey: 'offer_id', // target
            as: 'offer'
        });
    };
    return banners;
};
