
module.exports = (sequelize, DataTypes) => {
    const ration = sequelize.define('ration', {
        entry_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        card_no: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        aadhar_no: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        quantity: {
            // defines a unit of the item.
            type: DataTypes.DECIMAL(8,3),
            allowNull: true,
            defaultValue: 1
        },
        unit: {
            // Base unit for defining quantity.
            type: DataTypes.ENUM,
            values: [
                'g',
                'kg',
                'ml',
                'l',
                'count'
            ],
            allowNull: true,
            defaultValue: 'kg'
        },
        color: {
            type: DataTypes.STRING(20),
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
    },{ freezeTableName: true, paranoid:true });

    ration.associate = function(models) {
        ration.belongsTo(models.users, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };
    return ration;
};
