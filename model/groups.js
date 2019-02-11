var mongoose     = require('mongoose');
require('dotenv').config();
var conn = mongoose.createConnection(process.env.DB_CONNECTION_CVRS);

var Schema       = mongoose.Schema;

var RoleSchema   = new Schema({
    title: String,
    active: Boolean
});

module.exports = conn.model('Group', RoleSchema);