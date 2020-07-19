var express = require('express');
var router = express.Router();

const { 
    getAllUsers,
    getUser,
    postNewUser,
    postBorrowBook,
    postReturnBook 
} = require("../controllers/users");
const { asyncErrorHandler } = require('../middleware');

/* GET users listing. */
router.get('/', asyncErrorHandler(getAllUsers));

/* GET user information */
router.get("/:id", asyncErrorHandler(getUser));

/* POST create a new user */
router.post("/", asyncErrorHandler(postNewUser));

/* POST borrow a book */
router.post("/:userId/borrow/:bookId", asyncErrorHandler(postBorrowBook));

/* POST return a book */
router.post("/:userId/return/:bookId", asyncErrorHandler(postReturnBook));

module.exports = router;
