const express = require('express');

const {
    createMeal,
    deleteMeal,
    getAllMeals,
    getMealById,
    updateMeal
} = require ('../controllers/meals.controller');

const { protectAdminSession, protectSession } = require('../middlewares/auth.middleware')
const { mealExist } = require('../middlewares/meals.middleware');
const { createMealsValidator } = require('../middlewares/validators.middleware');

const mealsRouter = express.Router();

mealsRouter.use(protectSession);

mealsRouter.post('/:id', protectAdminSession, createMealsValidator, createMeal);

mealsRouter.get('/', getAllMeals);

mealsRouter.use('/:id', mealExist);

mealsRouter.get('/:id', getMealById);

mealsRouter.patch('/:id', protectAdminSession, updateMeal);

mealsRouter.delete('/:id', protectAdminSession, deleteMeal);

module.exports = { mealsRouter };