const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},
name: { type: DataTypes.STRING, allowNull: false }, // Pottery item name
description: { type: DataTypes.TEXT }, // Detailed description
price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
stock: { type: DataTypes.INTEGER, allowNull: false },
category: { type: DataTypes.STRING, allowNull: true }, // e.g., vase, bowl, mug, etc.
imageUrl: { type: DataTypes.STRING } // URL to product image
}, { timestamps: false });

module.exports = Product;
//
