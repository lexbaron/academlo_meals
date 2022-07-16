const { database, DataTypes } = require('../utils/database.util');

const { User } = require('./user.models');
const { Restaurant } = require('./restaurant.model')

const Review = database.define('review',{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Restaurant,
            key: 'id'
        }
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = { Review };