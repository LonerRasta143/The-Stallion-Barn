const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const isUserAuth = require("../middleware/isUserAuth");
const { model } = require("mongoose");

// Show registration form
router.get("/sign-in", (req, res) => {
    res.render("auth/login");
});

// Handle registration
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        req.flash("success", "Registration successful! Please log in.");
        res.redirect("/login");
    } catch (err) {
        console.error(err);
        req.flash("error", "Registration failed. Please try again.");
        res.redirect("/register");
    }});

    module.exports = router;