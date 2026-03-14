const mongoose = require("mongoose");


const ownerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    horses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Horse"
    }]
});

const Owner = mongoose.model("Owner", ownerSchema);
module.exports = Owner;