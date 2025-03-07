const sequelize = require("../config/database");
const Order = require("./order");
const Product = require("./product");

const OrderItem = sequelize.define("OrderItem", {
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},
orderId: {
type: DataTypes.INTEGER,
references: { model: Order, key: "id" },
allowNull: false
},
productId: {
type: DataTypes.INTEGER,
references: { model: Product, key: "id" },
allowNull: false
},
quantity: { type: DataTypes.INTEGER, allowNull: false },
price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, { timestamps: false });

module.exports = OrderItem;
//
