const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createRestaurant = catchAsync( async(req, res, next) => {
    const {name, address, rating} = req.body;

    const newRestaurant = await Restaurant.create({
        name,
        address,
        rating
    });

    res.status(201).json({
        status: 'success',
        newRestaurant
    })
});

const getAllRestaurants = catchAsync( async(req, res, next) => {
    const restaurants = await Restaurant.findAll();

    res.status(200).json({
        status: 'success',
        restaurants
    })
});

const getRestaurantById = catchAsync( async(req, res, next) => {
    const { restaurant } = req;

    res.status(200).json({
        status: 'success',
        restaurant
    })
});

const updateRestaurant = catchAsync( async(req, res, next) => {

});

const deleteRestaurant = catchAsync( async(req, res, next) => {

});

const createRestaurantReview = catchAsync( async(req, res, next) => {

});

const updateRestaurantReview = catchAsync( async(req, res, next) => {

});

const deleteRestaurantReview = catchAsync( async(req, res, next) => {

});

module.exports = { createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant, 
    deleteRestaurant, 
    createRestaurantReview,
    updateRestaurantReview,
    deleteRestaurantReview
};