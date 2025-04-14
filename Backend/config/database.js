const { Sequelize } = require('sequelize');

// Replace 'actual_password_here' with your real MySQL root password
const sequelize = new Sequelize('earthen', 'root', '#BabaTunde3030', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: console.log,
  dialectOptions: {
    connectTimeout: 60000
  },
  retry: {
    max: 5,
    timeout: 60000
  }
});

module.exports = sequelize;
