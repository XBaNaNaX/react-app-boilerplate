var mongoose     = require('mongoose');
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
var conn = mongoose.createConnection(process.env.DB_CONNECTION_CVRS);

var Schema       = mongoose.Schema;

var ContactSchema   = new Schema({
    name: String,
    group: String,
    role: String,
    department: String,
    nickname: String,
    office: String,
    mobile: String,
    email: String
});

module.exports = conn.model('Contact', ContactSchema);