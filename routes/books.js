var express = require("express");
var router = express.Router();

/* GET books listing. */
router.get("/", function (req, res, next) {
  res.send("GET /books");
});

/* GET book information */
router.get("/:id", function (req, res, next) {
  res.send("GET /books/:id");
});

/* POST create a new book */
router.post("/", function (req, res, next) {
  res.send("POST /books");
});


module.exports = router;
