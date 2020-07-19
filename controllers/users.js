const db = require("../config/database");
const User = require("../models/User");
const Loan = require("../models/Loan");
const Book = require("../models/Book");
const moment = require("moment");

module.exports = {
    // gets list of all users
    async getAllUsers(req, res, next) {
        var users = await User.findAll({
            include: [{
                model: Book, // include data from Book model
                attributes: ['name', 'average_rating', 'on_loan'], // include only these fields
                group: 'on_loan',
                through: {
                    attributes: ['loaned_at', 'ratings'] // include these fields from Loan model
                }                  
            }]
        });
        // send as response
        res.send(users);
    },

    // gets one user
    async getUser(req, res, next) {
        var user = await User.findByPk(req.params.id, {
          include: [
            {
              model: Book, // include data from Book model
              attributes: ["name", "average_rating", "on_loan"], // include only these fields
              group: "on_loan",
              through: {
                attributes: ["loaned_at", "ratings"], // include these fields from Loan model
              },
            },
          ],
        });
        // send data as response
        res.send(user);
    },

    // creates a new user and saves to database
    async postNewUser(req, res, next) {
        var newUser = {
        name: req.body.name,
        };

        let { name } = newUser;

        await User.create({ name }); // save to database
        res.redirect("/users");
    },

    // lets a user to borrow a book which is not already loaned out
    async postBorrowBook(req, res, next) {
        // retrieve book information
        var book = await Book.findByPk(req.params.bookId);

        // book already on loan
        if (book.on_loan) {
            res.status(500).send("Book already on loan.");
        }
        // book not on load i.e. book available 
        else {
            var loanInstance = {
                userId: req.params.userId,
                bookId: req.params.bookId,
            };

            let { userId, bookId } = loanInstance;

            // create an entry for the loaned book in LOANS table
            await Loan.create({ userId, bookId });
            var newLoanCount = book.loan_count + 1;

            // update status of loaned book
            book.update({ on_loan: true, loan_count: newLoanCount });
            res.status(204).send("Loan successful");
        }
    },

    // lets user to return a loaned book
    async postReturnBook(req, res, next) {        
        // retrieve book information
        var book = await Book.findByPk(req.params.bookId);

        // book was not loaned in the first place
        if (!book.on_loan) {
            res.status(500).send("Book was not on loan");
        }
        // book was on loan
        else {
            // retrieve loan entry based on both the book and the user            
            var loanInstance = await Loan.findOne({
                where: {
                    userId: req.params.userId,
                    bookId: req.params.bookId,
                }          
            });
            
            // check if book was indeed borrowed by the user who is returning the book
            if (!loanInstance)
                res.status(500).send("You do not have permission to return the book if it was not issued to you.");
            else {
                // update LOANS table
                var returned_at = moment().format();
                var ratings = req.body.score;                
                await loanInstance.update({ returned_at: returned_at, ratings: ratings});
                
                // calculate average
                var loan_count = book.loan_count;
                var updatedRatings = ratings + ((loan_count - 1) * book.average_rating);
                var averageRating = updatedRatings / loan_count;                 
                
                // update average ratings of a book in the BOOKS table
                await book.update({average_rating: averageRating, on_loan: false});

                // show book information
                res.redirect("/books/" + req.params.bookId);
            }
        }
    },
};
