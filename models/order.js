const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    apartmentId: {
        type: Schema.Types.ObjectId,
        ref: "Apartment",
        required: true
    },
    isDailyOrder: {
        type: Schema.Types.Boolean,
        required: true
    },
    orderDetails: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Schema.Types.Number,
                required: true
            }
        }
    ],
    orderDate: {
        type: Schema.Types.Date,
        required: true
    },
    deliveryDate: {
        type: Schema.Types.Date,
        required: true
    },
    cost: {
        type: Schema.Types.Number
    },
    isCancelled: {
        type: Schema.Types.Boolean
    }
});

module.exports = mongoose.model("Order", orderSchema);
