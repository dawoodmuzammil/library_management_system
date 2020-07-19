const { Sequelize, DataTypes } = require("sequelize");
const moment = require('moment');

const db = require("../config/database");

const Book = require("./Book");
const User = require("./User");


const Loan = db.define(
  "Loan",
  {
    date_loaned: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: moment().format()
    },
    date_returned: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null
    }
  },
  {
    timestamps: false,
  }
);

Loan.sync();

User.belongsToMany(Book, { through: Loan });
Book.belongsToMany(User, { through: Loan });

module.exports = Loan;
