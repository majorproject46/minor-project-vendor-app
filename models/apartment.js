const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const flatSchema = require("./flatSchema");

const apartmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    flats: [flatSchema],
    location: {
        type: {
            type: "String",
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    apartmentImage: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    vendors: [
        {
            type: Schema.Types.ObjectId,
            ref: "Vendor"
        }
    ]
});

module.exports = mongoose.model("Apartment", apartmentSchema);
