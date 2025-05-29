const app = require('./app');
const PORT = process.env.PORT || 3000;

const sequelize = require('./config/database');
sequelize.sync({ alter: true })  // อัปเดต schema อัตโนมัติให้ตรงกับ model
  .then(() => console.log('DB synced.'))
  .catch(err => console.error(err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
