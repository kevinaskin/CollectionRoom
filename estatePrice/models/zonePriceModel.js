/**
 * Created by Kevinaskin on 8/13/2016.
 */
var mongoose = require('mongoose');
var zonePriceSchema = require('../schema/zonePriceSchema');
var ZonePrice = mongoose.model('ZonePrice',zonePriceSchema);
module.exports = ZonePrice;