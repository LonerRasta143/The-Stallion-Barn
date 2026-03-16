const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const isUserAuth = require("../middleware/isUserAuth");


router.get("/sign-up", (req, res) => {
    res.render("sign-up");
});

// sign-in 
router.get("/sign-in", (req, res) => {
    res.render("sign-in");
});

// sign-up
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

router.get(".profile", isUserAuth, async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.userId).populate("horses");
        res.render("users/profile", { user: foundUser });
} catch (err) {
    console.error(err);
    res.redirect("/users/sign-in"); 
    }});

// sign-in
router.post("/sign-in", async (req, res) => {
    try {
       const{ email, password} = req.body;
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
        req.flash("error", "An error occurred during login. Please try again.");
        res.redirect("/users/sign-in");
    }
});
//sign-out
router.get("/sign-out", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/users/sign-in");
    });
});

module.exports = router;