/**
 * model: users
 */

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        roles: {
            type: DataTypes.JSON,
            allowNull: true
        },
        usergroup: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        blocked: {
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
    }, { freezeTableName: true, paranoid: true });
    users.associate = function(models) {
        users.belongsToMany(models.stores, {
            through: models.store_owners,
            // field of junction table
            foreignKey: 'store_owner_id',
            timestamps: false,
            as: 'store'
        });

        // Each user has a profile.
        users.hasOne(models.user_details, {
            foreignKey: 'user_id', // target table
            as: 'user_profile'
        });

        // Each owner has a profile.
        users.hasOne(models.owner_details, {
            foreignKey: 'owner_id', // target table
            as: 'owner_profile'
        });

        // Associate with cart without any foreign key constraint.
        users.hasMany(models.cart, {
            foreignKey: 'user_id',
            constraints: false
        });

        // Associate with orders without any foreign key constraint.
        users.hasMany(models.orders, {
            foreignKey: 'user_id',
            constraints: false
        });

        users.hasOne(models.codes, {
            foreignKey: 'user_id',
            as: 'code'
        });
    };
    return users;
};
