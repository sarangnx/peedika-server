
module.exports = (sequelize, DataTypes) =>{
    const localbodies = sequelize.define('localbodies', {
        localbody_id: {
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
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        district: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING(100), // kerala by default
            allowNull: true,
            defaultValue: 'kerala',
        },
        total_wards: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        available_wards: {
            // array of available wards
            type: DataTypes.JSON,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM,
            values: [
                'panchayath',
                'municipality'
            ],
            defaultValue: 'panchayath',
            allowNull: false,
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
        store_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
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

    localbodies.associate = function(models) {
        localbodies.hasMany(models.users, {
            foreignKey: 'user_id',
            as: 'users'
        });

        localbodies.belongsTo(models.stores, {
            foreignKey: 'store_id',
            as: 'store'
        });
    };
    return localbodies;
};