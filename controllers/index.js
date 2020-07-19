module.exports = {

    async getHomepage( req, res, next) {
        res.send("This is homepage. Go to /users to see a list of users");
    }
}