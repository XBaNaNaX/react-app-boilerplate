const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const favicon = require('serve-favicon');
//import routes
var inventory = require('./routes/inventory');
var contact = require('./routes/contact');
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use('/api', inventory);
app.use('/api', contact);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

module.exports = app;