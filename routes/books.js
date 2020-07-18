var express = require("express");
const { asyncErrorHandler } = require("../middleware");
var router = express.Router();

const {
    getAllBooks,
    getBook,
    postNewBook
} = require("../controllers/books");

/* GET books listing. */
router.get("/", asyncErrorHandler(getAllBooks));

/* GET book information */
router.get("/:id", asyncErrorHandler(getBook));

/* POST create a new book */
router.post("/", asyncErrorHandler(postNewBook));


module.exports = router;
