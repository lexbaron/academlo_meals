const express = require('express');

const { protectSession, protectOrderAuthor } = require('../middlewares/auth.middleware')
const { orderExist } = require('../middlewares/orders.midddleware');
const { createOrdersValidator } = require('../middlewares/validators.middleware');

const {
    createOrder,
    deleteOrder,
    getAllUserOrders,
    updateOrder
} = require('../controllers/orders.controller');

const ordersRouter = express.Router();

ordersRouter.use(protectSession);

ordersRouter.post('/', createOrdersValidator, createOrder);

ordersRouter.get('/me', getAllUserOrders);

ordersRouter.use('/:id', orderExist, protectOrderAuthor)

ordersRouter.patch('/:id', updateOrder);

ordersRouter.delete('/:id', deleteOrder);

module.exports = { ordersRouter };