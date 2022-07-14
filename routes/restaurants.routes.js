const express = require('express');

const {
    createRestaurant,
    createRestaurantReview,
    deleteRestaurant,
    deleteRestaurantReview,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    updateRestaurantReview
} = require('../controllers/restaurants.controller');

const { protectSession, protectAdminSession } = require('../middlewares/auth.middleware');
const { restaurantExist } = require('../middlewares/restaurants.middleware');

const restaurantsRouter = express.Router();

restaurantsRouter.use(protectSession);

restaurantsRouter.post('/', protectAdminSession, createRestaurant);

restaurantsRouter.get('/', getAllRestaurants);

restaurantsRouter.get('/:id', restaurantExist, getRestaurantById);

restaurantsRouter.patch('/:id', restaurantExist, updateRestaurant);

restaurantsRouter.delete('/:id', restaurantExist, deleteRestaurant);

restaurantsRouter.post('/reviews/:restaurantId', createRestaurantReview);

restaurantsRouter.patch('/reviews/:id', updateRestaurantReview);

restaurantsRouter.delete('/reviews/:id', deleteRestaurantReview);

module.exports = { restaurantsRouter };