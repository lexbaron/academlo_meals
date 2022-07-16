const { app } = require('./app');

const { database } = require('./utils/database.util');

const { Meal } = require('./models/meal.model');
const { Restaurant } = require('./models/restaurant.model');
const { User } = require('./models/user.models');
const { Review } = require('./models/review.model');
const { Order } = require('./models/order.model');

database.authenticate()
    .then(console.log('database authenticated!'))
    .catch(err => console.log(err));

Restaurant.hasMany(Meal);
Meal.belongsTo(Restaurant);

User.hasMany(Review);
Review.belongsTo(User);

Restaurant.hasMany(Review);
Review.belongsTo(Restaurant);

User.hasMany(Order);
Order.belongsTo(User);

Meal.hasMany(Order);
Order.belongsTo(Meal);

database.sync({force: false})
    .then(console.log('database synced!'))
    .catch(err => console.log(err));

app.listen(5000, () => {
    console.log('server is running!!');
});