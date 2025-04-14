module.exports = (sequelize, DataTypes) => {
  const AdminLog = sequelize.define('AdminLog', {
    action: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    adminId: DataTypes.INTEGER
  });

  return AdminLog;
};
