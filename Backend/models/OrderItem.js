module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  });

  OrderItem.associate = function(models) {
    // An OrderItem belongs to an Order
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
    // An OrderItem belongs to a Product
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return OrderItem;
};
