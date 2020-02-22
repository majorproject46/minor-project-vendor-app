const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productCategories = ["Dairy", "Newspaper", "Groceries", "Others"];

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Schema.Types.Number,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productImage: {
        type: String
    },
    category: {
        type: "String",
        enum: productCategories,
        required: true
    }
});

module.exports = mongoose.model("Product", productSchema);
