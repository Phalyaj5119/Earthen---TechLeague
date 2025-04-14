module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    }
  });

  Payment.associate = function(models) {
    // A Payment belongs to a User
    Payment.belongsTo(models.User, { foreignKey: 'userId' });
    // A Payment belongs to an Order
    Payment.belongsTo(models.Order, { foreignKey: 'orderId' });
  };

  return Payment;
};
