const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMsg = errors.array().map(err => err.msg);

        const message = errorMsg.join('. ');

        return next(new AppError(message, 400));
    }

    next();
};

const createUsersValidator = [
    body('name').notEmpty().withMessage('name cannot be empty'),
    body('email').notEmpty().withMessage('email cannot be empty').isEmail().withMessage('must provide a valid email'),
    body('password').
    notEmpty().
    withMessage('password cannot be empty').
    isLength({min: 8}).
    withMessage('the password must be at least 8 characters length').
    isAlphanumeric().
    withMessage('password must have letters and numbers'),
    checkResult
];

const createRestaurantsValidator = [
    body('name').notEmpty().withMessage('name cannot be empty'),
    body('address').notEmpty().withMessage('address cannot be empty'),
    body('rating').notEmpty().withMessage('rating cannot be empty').isNumeric().withMessage('must provide a number'),
    checkResult
];

const createReviewsValidator = [
    body('comment').isString().withMessage('must provide letters'),
    body('rating').notEmpty().withMessage('rating cannot be empty').isNumeric().withMessage('must provide only numbers'),
    checkResult
];

const createMealsValidator = [
    body('name').notEmpty().withMessage('name cannot be empty'),
    body('price').notEmpty().withMessage('price cannot be empty').isNumeric().withMessage('must provide only numbers'),
    checkResult
];

const createOrdersValidator = [
    body('quantity').notEmpty().withMessage('quantity cannot be empty').isNumeric().withMessage('must provide only numbers'),
    body('mealId').notEmpty().withMessage('meal id cannot be empty').isNumeric().withMessage('must provide only numbers'),
    checkResult
]

module.exports = { createUsersValidator,
    createRestaurantsValidator, 
    createReviewsValidator, 
    createMealsValidator,
    createOrdersValidator
};