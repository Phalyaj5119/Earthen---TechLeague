const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./customer");

const Order = sequelize.define("Order", {
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},
customerId: {
type: DataTypes.INTEGER,
references: { model: Customer, key: "userId" },
allowNull: false
},
orderDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
status: { type: DataTypes.STRING, defaultValue: "Pending" } // Order status (Pending, Shipped, Delivered)
}, { timestamps: false });

module.exports = Order;
//