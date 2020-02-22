const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const isLoggedIn = (req, res, next) => {
    if (req.userId !== null) {
        return next();
    }
    res.redirect("/");
};

const getUserId = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (token != null) {
            const decodedToken = jwt.verify(token, keys.jwtPrivateKey);
            req.userId = decodedToken.userId;
        }
    } catch (err) {
        console.log(err);
    }
    next();
};

module.exports = {
    isLoggedIn,
    getUserId
};
