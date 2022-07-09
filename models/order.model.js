const { database, DataTypes } = require('../utils/database.util');

const { Meal } = require('./meal.model');
const { User } = require('./user.models');

const Order = database.define('order', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
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
    mealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Meal,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = { Order }; 