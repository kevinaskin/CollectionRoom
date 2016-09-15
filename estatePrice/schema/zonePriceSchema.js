/**
 * Created by Kevinaskin on 8/13/2016.
 */
var mongoose = require('mongoose');

var zonePriceSchema = new mongoose.Schema({
    page:String,
    zone: String,
    distrct: String,
    price: Number
});

module.exports = zonePriceSchema;