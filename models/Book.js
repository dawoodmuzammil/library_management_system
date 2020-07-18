const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

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
},
{
    timestamps: false
}); 

module.exports = Book;
