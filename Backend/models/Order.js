module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  Order.associate = function(models) {
    // An Order belongs to a User
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    // An Order has many Payments
    Order.hasMany(models.Payment, { foreignKey: 'orderId' });
    // An Order has many OrderItems
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
  };

  return Order;
};
