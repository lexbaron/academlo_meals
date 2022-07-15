const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const restaurantExist = catchAsync( async(req, res, next) => {
    const { id, restaurantId } = req.params;

    let restaurant;

    if(restaurantId){
        restaurant = await Restaurant.findOne({where: {id: restaurantId}});
    }

    if(id){
        restaurant = await Restaurant.findOne({where: { id }});
    }

    if(!restaurant){
        return next(new AppError('restaurant not found!', 404))
    };

    req.restaurant = restaurant;
    next();
});

module.exports = { restaurantExist };