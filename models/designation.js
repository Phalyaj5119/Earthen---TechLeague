const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Department = require("./department");

const Designation = sequelize.define("Designation", {
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},
departmentId: {
type: DataTypes.INTEGER,
references: { model: Department, key: "id" },
allowNull: false
},
title: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

module.exports = Designation;