module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    });
  
    OrderItem.associate = models => {
      OrderItem.belongsTo(models.Order);
      OrderItem.belongsTo(models.Product);
    };
  
    return OrderItem;
  };
  