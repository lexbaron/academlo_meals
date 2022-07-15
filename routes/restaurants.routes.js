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

const { protectSession, protectAdminSession, protectReviewAuthor } = require('../middlewares/auth.middleware');
const { restaurantExist } = require('../middlewares/restaurants.middleware');
const { reviewExist } = require('../middlewares/reviews.middleware');
const { createRestaurantsValidator, createReviewsValidator } = require('../middlewares/validators.middleware');

const restaurantsRouter = express.Router();

restaurantsRouter.use(protectSession);

restaurantsRouter.post('/', protectAdminSession, createRestaurantsValidator, createRestaurant);

restaurantsRouter.get('/', getAllRestaurants);

restaurantsRouter.get('/:id', restaurantExist, getRestaurantById);

restaurantsRouter.patch('/:id', protectAdminSession, restaurantExist, updateRestaurant);

restaurantsRouter.delete('/:id', protectAdminSession, restaurantExist, deleteRestaurant);

restaurantsRouter.post('/reviews/:restaurantId', restaurantExist, createReviewsValidator, createRestaurantReview);

restaurantsRouter.use('/reviews/:id', reviewExist, protectReviewAuthor)

restaurantsRouter.patch('/reviews/:id', updateRestaurantReview);

restaurantsRouter.delete('/reviews/:id', deleteRestaurantReview);

module.exports = { restaurantsRouter };