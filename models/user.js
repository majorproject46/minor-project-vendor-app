const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    apartmentDetails: {
        apartment: {
            type: Schema.Types.ObjectId,
            ref: "Apartment"
        },
        flatNo: {
            type: String
        },
        isAdmin: {
            type: Schema.Types.Boolean
        }
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
