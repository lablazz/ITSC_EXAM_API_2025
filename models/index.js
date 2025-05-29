const { User, Order } = require('./models');

// Set up associations
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

module.exports = { User, Order };
