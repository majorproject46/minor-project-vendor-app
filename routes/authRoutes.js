const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const keys = require("../config/keys");
const Vendor = require("../models/vendor");
const {
    signInValidator,
    signUpValidator
} = require("../validators/authValidators");

module.exports = app => {
    app.post("/auth/createUser", signUpValidator, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            res.status(400);
            return res.send({ errorMessage: "Invalid Input", errors });
        }
        const { email, name, phone } = req.body;
        try {
            const password = await bcrpyt.hash(req.body.password, 12);
            const vendor = new Vendor({ email, password, name, phone });
            const result = await vendor.save();
            console.log(result._doc);
            res.send({ userId: result.id });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error.getMessage() });
            throw error;
        }
    });

    app.post("/auth/userSignIn", signInValidator, async (req, res) => {
        const { email, password } = req.body;
        const vendor = await Vendor.findOne({ email });
        if (vendor === null) {
            res.status(401);
            return res.send({ errorMessage: "Vendor not found" });
        }
        const isEqual = await bcrpyt.compare(password, vendor._doc.password);
        if (isEqual) {
            const token = jwt.sign(
                {
                    userId: vendor.id
                },
                keys.jwtPrivateKey,
                {
                    expiresIn: "1h"
                }
            );
            res.cookie("token", token, {
                maxAge: 3600000
            });
            res.send({ userId: vendor.id });
        } else {
            res.status(401);
            res.send({ errorMessage: "Not authorized" });
        }
    });

    app.get("/auth/currentUser", (req, res) => {
        try {
            const { userId } = req;
            if (userId !== null) {
                return res.send({ userId });
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
        res.status(200);
    });

    app.get("/auth/logout", (req, res) => {
        res.cookie("token", null, { maxAge: 0 });
        res.status(200);
        res.send("Logged out");
    });

    app.post("/secured", (req, res) => {
        res.status(403);
        res.send({ message: "You are safe to go" });
    });
};
