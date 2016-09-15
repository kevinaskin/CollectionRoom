var mongoose = require('mongoose');
var zoneSchema = require('../schema/zoneSchema');
var Zone  = mongoose.model('Zone',zoneSchema);
module.exports = Zone;