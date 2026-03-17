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
    activity: {
        type: String,
        default: "No activity recorded."
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    activityHistory: [
        {
            activity: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]   
});

const Horse = mongoose.model("Horse", horseSchema);

module.exports = Horse;