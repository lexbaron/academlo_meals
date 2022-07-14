const express = require('express');

const { protectSession, protectUserAccount, protectAdminSession } = require('../middlewares/auth.middleware');
const { userExist } = require('../middlewares/users.middleware');
const { orderExist } = require('../middlewares/orders.midddleware');

const { createUser, login, deleteUser, getAllUserOrder, getUserOrderById, updateUser, getAllUsers } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.post('/signup', createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/',protectAdminSession, getAllUsers);

usersRouter.patch('/:id', userExist, protectUserAccount, updateUser);

usersRouter.delete('/:id', userExist, protectUserAccount, deleteUser);

usersRouter.get('/orders', getAllUserOrder);

usersRouter.get('/orders/:id', orderExist, getUserOrderById);


module.exports = { usersRouter };

