const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flatSchema = new Schema({
    flatNo: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = flatSchema;
