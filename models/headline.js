var mongoose = require("mongoose");

var headlineSchema = mongoose.Schema({
    headline: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

var Headline = mongoose.model('Headline', headlineSchema);
module.exports = Headline;