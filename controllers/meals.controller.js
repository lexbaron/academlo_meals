const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createMeal = catchAsync( async(req, res, next) => {
    const { name, price } = req.body;
    const { id } = req.params;

    const newMeal = await Meal.create({
        name,
        price,
        restaurantId: id
    });

    res.status(201).json({
        status: 'success',
        newMeal
    });
});

const getAllMeals = catchAsync( async(req, res, next) => {
    const meals = await Meal.findAll({ where: {status: 'active'},
    attributes:['id', 'name', 'price', 'status'],
    include: {
        model: Restaurant,
        attributes: ['name', 'address', 'rating', 'status']
    } 
});

    res.status(200).json({
        status: 'success',
        meals
    });
});

const getMealById = catchAsync( async(req, res, next) => {
    const { meal } = req;

    const mealById = await Meal.findOne({where: {id: meal.id},
        attributes:['id', 'name', 'price', 'status'],
        include: {
            model: Restaurant,
            attributes: ['name', 'address', 'rating', 'status']
        } 
    })
    
    res.status(200).json({
        status: 'success',
        mealById
    });
});

const updateMeal = catchAsync( async(req, res, next) => {
    const { meal } = req;
    const { name, price } = req.body;

    await meal.update({ name, price });

    res.status(204).json({
        status: 'success'
    });
});

const deleteMeal = catchAsync( async(req, res, next) => {
    const { meal } = req;

    await meal.update({status: 'deleted'});

    res.status(204).json({
        status: 'success'
    });
});

module.exports = { createMeal, getAllMeals, getMealById, updateMeal, deleteMeal };