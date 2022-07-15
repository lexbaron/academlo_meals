const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.models');

const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

dotenv.config({ path: './config.env' });

const protectSession = catchAsync( async(req, res, next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    };

    if(!token){
        return next(new AppError('Invalid session', 403));
    };

    const decoded = await jwt.verify(token, process.env.JWT);

    const user = await User.findOne({where: {id: decoded.id, status: 'active'}});

    if(!user){
        return next(new AppError('the owner of this token does not exist anymore', 404));
    };

    req.sessionUser = user;
    next();
});

const protectAdminSession = catchAsync( async(req, res, next) =>{
    const { sessionUser } = req;

    if(sessionUser.role !== 'admin'){
        return next(new AppError('you are not admin to do this', 404))
    };

    next();
});

const protectUserAccount = catchAsync( async(req, res, next) =>{
    const { user, sessionUser } = req;

    if(sessionUser.id !== user.id){
        return next(new AppError('you do not own this account', 402));
    };

    next();
});

const protectReviewAuthor = catchAsync( async(req, res, next) => {
    const { review, sessionUser } = req;

    if(sessionUser.id !== review.userId){
        return next(new AppError('you do not made this review!', 402));
    };

    next();
});

const protectOrderAuthor = catchAsync( async(req, res, next) => {
    const { order, sessionUser } = req;

    if(sessionUser.id !== order.userId){
        return next(new AppError('you do not made this order!', 402));
    };

    next();
});

module.exports = { protectSession, protectUserAccount, protectAdminSession, protectReviewAuthor, protectOrderAuthor };