const authRequired = (req, res, next) => {
    if (!req.session.userId) {
        req.flash("error", "You must be logged in to access this page.");
        return res.redirect("/sign-in");
    }else {
        next();
    }
};

module.exports = authRequired;