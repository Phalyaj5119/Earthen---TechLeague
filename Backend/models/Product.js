module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imageUrl: DataTypes.STRING,
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Product.associate = function(models) {
    Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
    Product.hasMany(models.CartItem, { foreignKey: 'productId' });
    Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category', });
  };

  return Product;
};
