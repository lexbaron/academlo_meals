const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');
const { User } = require('../models/user.models');

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
    const restaurants = await Restaurant.findAll({
        where: {status: 'active'},
        include: {model: Review}
    });

    res.status(200).json({
        status: 'success',
        restaurants
    })
});

const getRestaurantById = catchAsync( async(req, res, next) => {
    const { restaurant } = req;

    const restaurantById = await Restaurant.findOne({
        where: {id: restaurant.id},
        include: {model: User}
    });

    res.status(200).json({
        status: 'success',
        restaurantById
    })
});

const updateRestaurant = catchAsync( async(req, res, next) => {
    const { restaurant } = req;
    const { name, address} = req.body;

    await restaurant.update({name, address});

    res.status(204).json({
        status: 'success'
    });
});

const deleteRestaurant = catchAsync( async(req, res, next) => {
    const { restaurant } = req;

    await restaurant.update({status: 'deleted'});

    res.status(204).json({
        status: 'success'
    })
});

const createRestaurantReview = catchAsync( async(req, res, next) => {
    const { restaurant } = req;
    const { sessionUser } = req;
    const { comment, rating } = req.body;

    const newRating = await Review.create({
        userId: sessionUser.id,
        restaurantId: restaurant.id,
        comment,
        rating
    });

    res.status(201).json({
        status: 'success',
        newRating
    });
});

const updateRestaurantReview = catchAsync( async(req, res, next) => {
    const { review } = req;
    const { comment, rating } = req.body;

    await review.update({ comment, rating });

    res.status(204).json({
        status: 'success'
    });
});

const deleteRestaurantReview = catchAsync( async(req, res, next) => {
    const { review } = req;

    await review.update({status: 'deleted'});

    res.status(204).json({
        status: 'success'
    });
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