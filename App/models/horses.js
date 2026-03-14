const mongoose = require("mongoose");

const horseSchema = new mongoose.Schema({
    name: String,
    breed: String,
    age: Number,
    color: String,
    owner: String,
    description: {
        type: String,
        default: "No description provided."
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/150"
    },
});

const Horse = mongoose.model("Horse", horseSchema);

module.exports = Horse;