var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
require('dotenv').config();
var conn = mongoose.createConnection(process.env.DB_CONNECTION_INVENTORY);
//var conn = mongoose.createConnection('mongodb://admin:1q2w3e4r@ds161121.mlab.com:61121/inventory');

var UnitSchema   = new Schema({
    name: String
});

module.exports = conn.model('Unit', UnitSchema);