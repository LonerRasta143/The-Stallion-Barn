const mongoose = require("mongoose");


const ownerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    
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

const User = mongoose.model("User", ownerSchema);
module.exports = User;