var express = require("express");

var Headline = require("../models/headline");

var router = express.Router();

// router.use(function(req, res, next) {
//     // res.locals.currentUser = req.user;
//     // res.locals.errors = req.flash("error");
//     // res.locals.infos = req.flash("info");
//     next();
// });

router.get("/", function(req, res, next) {
    Headline.find()
        .sort({ createdAt: "descending" })
        .exec(function(err, headlines) {
        if (err) { return next(err); }
        res.render("index", { headlines: headlines });
    });
});

module.exports = router;