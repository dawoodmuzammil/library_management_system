const db = require("../config/database");
const User = require("../models/User");
const Loan = require("../models/Loan");

module.exports = {
  async getAllUsers(req, res, next) {
      var users = await User.findAll();
      res.send(users);
  },

  async getUser(req, res, next) {
      var user = await User.findByPk(req.params.id);
      res.send(user);
  },

  async postNewUser(req, res, next) {
      var newUser = {
        name: req.body.name,
      };

      let { name } = newUser;

      await User.create({ name });
      res.redirect("/users");
  },

  async postBorrowBook(req, res, next) {
      var loanInstance = {
          userId: req.params.userId,
          bookId: req.params.bookId
      }

      let { userId, bookId } = loanInstance;

      await Loan.create({ userId, bookId });
      res.status(204);
  },
  
  async postReturnBook(req, res, next) {}
};
