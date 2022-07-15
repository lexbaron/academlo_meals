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

const mealsRouter = express();

mealsRouter.use(protectSession);

mealsRouter.post('/:id', protectAdminSession, createMeal);

mealsRouter.get('/', getAllMeals);

mealsRouter.use('/:id', mealExist);

mealsRouter.get('/:id', getMealById);

mealsRouter.patch('/:id', protectAdminSession, updateMeal);

mealsRouter.delete('/:id', protectAdminSession, deleteMeal);

module.exports = { mealsRouter };