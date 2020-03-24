/**
 * model: userDetails
 */

module.exports = (sequelize, DataTypes) => {
    const userDetails = sequelize.define('user_details', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        address: {
            type: DataTypes.JSON,
            allowNull: true
        },
        verification_code: {
            type: DataTypes.INTEGER,
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
    });
    userDetails.associate = function(models) {
        userDetails.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    };
    return userDetails;
};
