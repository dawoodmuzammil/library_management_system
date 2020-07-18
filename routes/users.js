var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('GET /users');
});

/* GET user information */
router.get('/:id', function(req, res, next) {
  res.send('GET /users/:id');
});

/* POST create a new user */
router.post('/', function(req, res, next) {
  res.send('POST /users');
});

/* POST borrow a book */
router.post("/:userId/borrow/:bookId", function (req, res, next) {
  res.send("POST /users/:userId/borrow/:bookId");
});

/* POST return a book */
router.post("/:userId/borrow/:bookId", function (req, res, next) {
  res.send("POST /users/:userId/borrow/:bookId");
});

module.exports = router;
