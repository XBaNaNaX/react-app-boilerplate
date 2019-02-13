var mongoose     = require('mongoose');
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
var conn = mongoose.createConnection(process.env.DB_CONNECTION_CVRS);

var Schema       = mongoose.Schema;

var RoleSchema   = new Schema({
    title: String,
    active: Boolean
});

module.exports = conn.model('Role', RoleSchema);