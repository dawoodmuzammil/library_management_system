const db = require("../config/database");
const Book = require('../models/Book')

module.exports = {
    async getAllBooks(req, res, next) {
        var books = await Book.findAll();
        res.send( books);
    },

    async getBook( req, res, next) {
        var book = await Book.findByPk( req.params.id);
        res.send( book);
    },

    async postNewBook( req, res, next) {
        var newBook = {
            name: req.body.name
        }

        let { name } = newBook;

        await Book.create( {name});
        res.redirect('/books');
    }
};
