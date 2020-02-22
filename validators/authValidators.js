const { body } = require("express-validator");
const Vendor = require("../models/vendor");

const signUpValidator = [
    body("email")
        .isEmail()
        .withMessage("Email is not Valid")
        .normalizeEmail()
        .custom(async (email, { req }) => {
            const vendor = await Vendor.findOne({ email });
            if (vendor === null) {
                return true;
            }
            throw new Error("User Already Exists");
        }),
    body("password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Password is not Long Enough"),
    body("name", "Name is not Valid")
        .trim()
        .isLength({ min: 3 }),
    body("phone", "Mobile Phone is not valid")
        .isMobilePhone()
        .trim()
];

const signInValidator = [
    body("email", "Email is not valid")
        .isEmail()
        .normalizeEmail()
        .custom(async (email, { req }) => {
            const vendor = await Vendor.findOne({ email });
            if (vendor === null) {
                throw new Error("User does not exist");
            }
            return true;
        }),
    body("password")
        .trim()
        .isLength({ min: 4 })
];

module.exports = { signUpValidator, signInValidator };
