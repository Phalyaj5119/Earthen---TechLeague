const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('earthen', 'root', '#BabaTunde3030', {
host: 'localhost',
dialect: 'mysql',
port: 3306,
});

sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Database connection error:', err));


module.exports = sequelize;