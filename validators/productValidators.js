const { body } = require("express-validator");

const Product = require("../models/product");
const Vendor = require("../models/vendor");
const productCategries = require("../models/productCategories");

const addProductValidator = [
    body("name", "Name is not valid")
        .trim()
        .isLength({ min: 3 }),
    body("description", "Description is not valid")
        .trim()
        .isLength({ min: 10 }),
    body("price", "Price is not valid").isNumeric(),
    body("productId", "Invalid ProdutId")
        .trim()
        .isLength({ min: 1 })
        .custom(async (productId, { req }) => {
            try {
                const product = await Product.findOne({ productId });
                if (product === null) {
                    return true;
                } else {
                    throw new Error("Product Already Exists");
                }
            } catch (error) {
                console.log(error);
            }
            return false;
        }),
    body("category", "Invalid Category").custom((category, { req }) => {
        if (productCategries.includes(category)) {
            return true;
        }
        return false;
    })
];

const getProductValidator = [
    body("id", "Input is Not Valid")
        .isLength({ min: 1 })
        .custom(async (id, { req }) => {
            try {
                const product = await Product.findOne({ _id: id });
                if (product === null) {
                    throw new Error("Product doesn't exist");
                }
                return true;
            } catch (error) {
                console.log(error);
            }
            return false;
        })
];

const deleteProductValidator = [
    body("id", "Input is Not Valid")
        .isLength({ min: 1 })
        .custom(async (id, { req }) => {
            try {
                const product = await Product.findOne({ _id: id });
                if (product === null) {
                    throw new Error("Product doesn't exist");
                }
                const { userId } = req;
                if (userId !== product.owner.toString()) {
                    throw new Error("Not Authorized");
                }
                const owner = await Vendor.findOne({ _id: userId });
                if (owner === null) {
                    throw new Error("Invalid Operation");
                }
            } catch (error) {
                console.log(error);
            }
            return false;
        })
];

module.exports = {
    addProductValidator,
    getProductValidator,
    deleteProductValidator
};
