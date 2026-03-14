const passDataToViews = (req, res, next) => {
    res.locals.currentUser = req.session.userId || null;
    res.locals.successMessages = req.flash("success");
    res.locals.errorMessages = req.flash("error");
    next();
};

module.exports = passDataToViews;