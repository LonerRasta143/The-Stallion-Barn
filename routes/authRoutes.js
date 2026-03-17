const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const isUserAuth = require("../middleware/isUserAuth");
const { model } = require("mongoose");

// Show registration form
router.get("/sign-up", (req, res) => {
    res.render("sign-up");
});

//Show sign-in form
router.get("/sign-in", (req, res) => {
    res.render("sign-in");
});

// Handle registration
router.post("/sign-up", async (req, res) => {
    try {
        const { firstName, 
            lastName,
            email,
            createUsername, 
            password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, 
            lastName, 
            email, 
            username: createUsername, 
            password: hashedPassword });
        await newUser.save();
        req.flash("success", "Registration successful! Please log in.");
        res.redirect("/users/sign-in");
    } catch (err) {
        console.error(err);
        req.flash("error", "Registration failed. Please try again.");
        res.redirect("/users/sign-up");
    }});

//handle login
router.post("/sign-in", async (req, res) => {
    try {
       const{email, password} = req.body;
       const foundUser = await User.findOne({email});
       if (!foundUser) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/users/sign-in");
       }
       const isMatch = await bcrypt.compare(password, foundUser.password);
       if (isMatch) {
        req.session.userId = foundUser._id;
        req.flash("success", "Login successful!");
        res.redirect("/horses");
       } else {
        req.flash("error", "Invalid email or password.");
        res.redirect("/users/sign-in");
       }
    } catch (err) {
        console.error(err);
        req.flash("error", "An error occurred. Please try again.");
        res.redirect("/users/sign-in");
    }
});

// Handle logout
router.get("/sign-out", isUserAuth, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            req.flash("error", "An error occurred while logging out. Please try again.");
            return res.redirect("/horses");
        }
        res.clearCookie("connect.sid");
        req.flash("success", "You have been logged out.");
        res.redirect("/users/sign-in");
    });
});

// Show user profile
router.get("/profile", isUserAuth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.render("profile", { user });
    } catch (err) {
        console.error(err);
        req.flash("error", "An error occurred. Please try again.");
        res.redirect("/horses");
    }
});

//
    module.exports = router;