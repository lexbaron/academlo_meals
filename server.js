const { app } = require('./app');

const { database } = require('./utils/database.util');

const { Meal } = require('./models/meal.model');
const { Restaurant } = require('./models/restaurant.model');
const { User } = require('./models/user.models');

database.authenticate()
    .then(console.log('database authenticated!'))
    .catch(err => console.log(err));

Restaurant.hasMany(Meal);
Meal.belongsTo(Restaurant);

User.belongsToMany(Restaurant, {through: 'review'});
Restaurant.belongsToMany(User, {through: 'review'});

User.belongsToMany(Meal, {through: 'order'});
Meal.belongsToMany(User, {through: 'order'});

database.sync({})
    .then(console.log('database synced!'))
    .catch(err => console.log(err));

app.listen(5000, () => {
    console.log('server is running!!');
});