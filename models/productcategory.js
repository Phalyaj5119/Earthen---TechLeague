const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./product");
const Category = require("./category");

const ProductCategory = sequelize.define("ProductCategory", {
productId: {
type: DataTypes.INTEGER,
references: { model: Product, key: "id" },
allowNull: false
},
categoryId: {
type: DataTypes.INTEGER,
references: { model: Category, key: "id" },
allowNull: false
}
}, { timestamps: false });

module.exports = ProductCategory;