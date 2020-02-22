const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    apartments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Apartment"
        }
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

module.exports = mongoose.model("Vendor", vendorSchema);
