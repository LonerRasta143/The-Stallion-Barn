const express = require("express");
const router = express.Router();
const authRequired = require("../middleware/isUserAuth");

router.get("/", authRequired, (req, res) => {
    res.render("horseList");
});

module.exports = router;