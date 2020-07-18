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
module.exports = router;
