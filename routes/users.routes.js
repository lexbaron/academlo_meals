const express = require('express');

const { protectSession, protectUserAccount, protectAdminSession } = require('../middlewares/auth.middleware');
const { userExist } = require('../middlewares/users.middleware');
const { orderExist } = require('../middlewares/orders.midddleware');

const { createUser, login, deleteUser, getAllUserOrder, getUserOrderById, updateUser, getAllUsers } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.post('/signup', createUser);

usersRouter.post('/login', login);

usersRouter.get('/', protectSession, protectAdminSession, getAllUsers)

usersRouter.patch('/:id', protectSession, userExist, protectUserAccount, updateUser);

usersRouter.delete('/:id', protectSession, userExist, protectUserAccount, deleteUser);

usersRouter.get('/orders', protectSession, getAllUserOrder);

usersRouter.get('/orders/:id',protectSession, orderExist, getUserOrderById);


module.exports = { usersRouter };

