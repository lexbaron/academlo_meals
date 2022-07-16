const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const createOrder = catchAsync( async(req, res, next) => {
    const { sessionUser } = req;
    const { quantity, mealId } = req.body;

    const mealExist = await Meal.findOne({ where: {id: mealId, status: 'active'} });

    if(!mealExist){
        return next(new AppError('meal do not found', 404));
    };

    let totalPrice = mealExist.price * quantity

    const newOrder = await Order.create({
        totalPrice,
        quantity,
        userId: sessionUser.id,
        mealId
    });

    res.status(201).json({
        status: 'success',
        newOrder
    });
});

const getAllUserOrders = catchAsync( async(req, res, next) => {
    const { sessionUser } = req;

    const orders = await Order.findAll({
        attributes: ['id', 'totalPrice', 'quantity', 'userId'],
        where: {userId: sessionUser.id},
        include: {
			model: Meal,
			attributes: ['id', 'name', 'price'],
			include: {
				model: Restaurant,
				attributes: ['id', 'name', 'address', 'rating']
			}
		}
    });

    res.status(200).json({
        status: 'success',
        orders
    });
});

const updateOrder = catchAsync( async(req, res, next) => {
    const { order } = req;

    await order.update({ status: 'completed' });

    res.status(204).json({status: 'success'});
});

const deleteOrder = catchAsync( async(req, res, next) => {
    const { order } = req;

    await order.update({ status: 'cancelled' });

    res.status(204).json({status: 'success'});
});

module.exports = { createOrder, getAllUserOrders, updateOrder, deleteOrder };