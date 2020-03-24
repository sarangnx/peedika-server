
module.exports = (sequelize, DataTypes) => {
    const codes = sequelize.define('codes', {
        entry_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        code: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW'),
        }
    }, { freezeTableName: true });

    codes.associate = function(models) {

        codes.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'cascade'
        });

    };
    return codes;
};
