const Sequelize = require('sequelize');
const sequelize = new Sequelize('earthen', 'root', 'Parag@2314', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Product = require('./product');
const Category = require('./category');
const ProductCategory = require('./productcategory');
const ProductReview = require('./productreview');

module.exports = { Product, Category, ProductCategory, ProductReview, sequelize };
//