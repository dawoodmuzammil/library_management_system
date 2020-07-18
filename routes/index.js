var express = require('express');
var router = express.Router();

const { asyncErrorHandler } = require("../middleware/index");
const {
    getHomepage
} = require("../controllers/index");

/* GET home page. */
router.get('/', asyncErrorHandler( getHomepage));

module.exports = router;
