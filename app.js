const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/products');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/protected'));
app.use(adminRoutes);
app.use(orderRoutes);
app.use('/', productRoutes);


sequelize.sync(); // connect and create tables

module.exports = app;
