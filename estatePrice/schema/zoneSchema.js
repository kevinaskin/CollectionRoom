/**
 * Created by Kevinaskin on 8/13/2016.
 */

var mongoose = require('mongoose');

var zoneSchema = new mongoose.Schema({
    name: String,
    zoneId: String,
    district: String,
    x: Number,
    y: Number
});

module.exports = zoneSchema;