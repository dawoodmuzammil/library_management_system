const { Sequelize, DataTypes } = require("sequelize");
const moment = require('moment');

const db = require("../config/database");

const Book = require("./Book");
const User = require("./User");


const Loan = db.define(
  "Loan",
  {    
    loaned_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: moment().format()
    },
    returned_at: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null
    },
    ratings: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        validate: {
            min: 0,
            max: 10
        }
    }
  },
  {
    timestamps: false,
  }
);

User.belongsToMany(Book, { through: Loan, foreignKey: 'userId' });
Book.belongsToMany(User, { through: Loan, foreignKey: "bookId" });
Loan.sync({alter: true});


module.exports = Loan;
