const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./customer");
const Product = require("./product");

const ProductReview = sequelize.define("ProductReview", {
customerId: {
type: DataTypes.INTEGER,
references: { model: Customer, key: "userId" },
allowNull: false
},
productId: {
type: DataTypes.INTEGER,
references: { model: Product, key: "id" },
allowNull: false
},
rating: { type: DataTypes.INTEGER, allowNull: false },
review: { type: DataTypes.TEXT }
}, { timestamps: false });

module.exports = ProductReview;