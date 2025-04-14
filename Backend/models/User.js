module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  });

  User.associate = function(models) {
    // Associations can be defined here
    User.hasMany(models.Payment, { foreignKey: 'userId' });
    User.hasMany(models.Order, { foreignKey: 'userId' });
  };

  return User;
};
