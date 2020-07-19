const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const User = require('./User');

const Book = db.define("Book", {
    name: {
        type: DataTypes.STRING
    },
    loan_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    average_rating: {
        type: DataTypes.REAL,
        defaultValue: 0.0
    },
    on_loan: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{
    timestamps: false
}); 

Book.sync({alter: true});


module.exports = Book;
