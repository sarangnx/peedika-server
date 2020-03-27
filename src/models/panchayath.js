/**
 * model: panchayathDetails
 */

module.exports = (sequelize, DataTypes) =>{
    const panchayath = sequelize.define('panchayath', {
        panchayath_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(225),
            allowNull: false,
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        district: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING(100), // kerala by default
            allowNull: true,
        },
        total_wards: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        phone: {
            // general operations phone number
            type: DataTypes.STRING(15),
            allowNull: true
        },
        emergency_phone: {
            // emergency number
            type: DataTypes.STRING(15),
            allowNull: true
        },
        kitchen_phone: {
            // community kitchen number 
            type: DataTypes.STRING(15),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
    }, { freezeTableName: true, paranoid:true });
    stores.associate = function(models) {
        stores.belongsToMany(models.users, {
            through: models.store_owners,
            // field of junction table
            foreignKey: 'panchayath_id',
            timestamps: false,
            as: 'owner'
        });

        // Associate with orders without any foreign key constraint.
        stores.hasMany(models.orders, {
            foreignKey: 'store_id',
            constraints: false
        });
    };
    return stores;
};
