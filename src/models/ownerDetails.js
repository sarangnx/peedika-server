/**
 * model: Owner Details
 */

module.exports = (sequelize, DataTypes) => {
    const ownerDetails = sequelize.define('owner_details', {
        owner_id: {
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
        aadhaar_no: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        verification_code: {
            type: DataTypes.STRING(255),
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
    ownerDetails.associate = function(models) {
        ownerDetails.belongsTo(models.users, {
            foreignKey: 'owner_id',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    };
    return ownerDetails;
};
