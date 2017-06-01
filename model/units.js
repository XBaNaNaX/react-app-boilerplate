var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UnitSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Unit', UnitSchema);