const express = require("express");
const router = express.Router();
const Horse = require("../models/horses");
const isUserAuth = require("../middleware/isUserAuth");
const methodOverride = require("method-override");

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
//View horse profile
router.get("/:id", async (req, res) => {
    try {
        const foundHorse = await Horse.findById(req.params.id);
        res.render("horse-profile", { horse: foundHorse });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
 //Edit horse profile
router.get("/:id/edit", isUserAuth, async (req, res) => {
    try {
        const foundHorse = await Horse.findById(req.params.id);
        res.render("edit-horse", { horse: foundHorse });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

//update horse profile
router.put("/:id", isUserAuth, async (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send("No update data provided");
    }
    try {
        const { name, breed, age } = req.body;
        const updatedHorse = await Horse.findByIdAndUpdate(req.params.id, { name, breed, age }, { new: true });
        req.flash("success", "Horse updated successfully!");
        res.redirect(`/horses/${updatedHorse._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


module.exports = router;