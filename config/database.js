const { Sequelize } = require("sequelize");

// connection to database
module.exports = new Sequelize("library_invent", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});

