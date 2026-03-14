const express = require("express");
const router = express.Router();
const Horse = require("../models/horses");
const isUserAuth = require("../middleware/isUserAuth");

// Show all horses
router.get("/", async (req, res) => {
    try {
        const horses = await Horse.find({});
        res.render("horseList", { horses });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Show form to create new horse
router.get("/new", isUserAuth, (req, res) => {
    res.render("horses/new");
});

// Create new horse
router.post("/", isUserAuth, async (req, res) => {
    try {
        const { name, breed, age } = req.body;
        const newHorse = new Horse({ name, breed, age });
        await newHorse.save();
        req.flash("success", "Horse created successfully!");
        res.redirect("/horses");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;