const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Book = db.define("Book", {
    name: {
        type: DataTypes.STRING,
    },
    loan_count: {
        type: DataTypes.INTEGER,
    },
    average_rating: {
        type: DataTypes.REAL,
    },
}); 

module.exports = Book;
