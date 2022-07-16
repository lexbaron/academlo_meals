const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.models');
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({path: './config.env'});

const createUser = catchAsync( async (req, res, next) => {
    const {name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        role
    });

    newUser.password = undefined;

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({
		where: {
			email,
			status: 'active',
		},
	});

	if (!user) {
		return next(new AppError('Credentials invalid', 400));
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	const token = await jwt.sign({ id: user.id }, process.env.JWT, {
		expiresIn: '30d',
	});

	res.status(200).json({
		status: 'success',
		token,
	});
});

const getAllUsers = catchAsync( async (req, res, next) => {
	const users = await User.findAll();

	res.status(200).json({
		status: 'success',
		users
	});
});

const updateUser = catchAsync( async (req, res, next) => {
	const { user } = req;
	const { name, email } = req.body;

	await user.update({name, email});

	res.status(204).json({
		status: 'success'
	})
});

const deleteUser = catchAsync( async (req, res, next) => {
	const { user } = req;

	await user.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const getAllUserOrder = catchAsync( async(req, res, next) => {
	const { sessionUser } = req;
	const userOrders = await Order.findAll({
		attributes: ['id', 'totalPrice', 'quantity', 'userId'],
		where: {userId: sessionUser.id },
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
		userOrders
	});
});

const getUserOrderById = catchAsync( async(req, res, next) => {
	const { order, sessionUser } = req;

	const userOrder = await Order.findOne({where: {id: order.id, userId: sessionUser.id}})

	res.status(200).json({
		status: 'success',
		userOrder
	});
});

module.exports = { createUser, login, updateUser, deleteUser, getAllUserOrder, getUserOrderById, getAllUsers };
