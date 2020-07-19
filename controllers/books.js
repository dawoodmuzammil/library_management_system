const db = require("../config/database");
const Book = require('../models/Book')

module.exports = {
    async getAllBooks(req, res, next) {
        // retrieve all books from the database
        var books = await Book.findAll();
        // semnd result as respone
        res.send( books);
    },

    async getBook( req, res, next) {
        // search book based on the specified PK
        var book = await Book.findByPk( req.params.id);
        // semnd result as respone
        res.send( book);
    },

    async postNewBook( req, res, next) {
        // make new instance of a Book
        var newBook = {
            name: req.body.name
        }
        // assign data to appropriate variable to make it consistent with database
        let { name } = newBook;
        // save to database
        await Book.create( {name});
        // redirect to show all books
        res.redirect('/books');
    }
};
