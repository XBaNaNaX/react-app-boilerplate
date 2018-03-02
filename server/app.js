const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const favicon = require('serve-favicon');
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:1q2w3e4r@ds161121.mlab.com:61121/inventory');
var Unit = require('../model/units');

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

router.route('/units')

// create a unit (accessed at POST http://localhost:8080/api/units)
    .post(function (req, res) {

        var unit = new Unit();      // create a new instance of the Unit model
        unit.name = req.body.name;  // set the units name (comes from the request)

        // save the unit and check for errors
        unit.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Units created!'});
        });

    })
    .get(function (req, res) {
        Unit.find({},function (err, units) {
            if (err)
                res.send(err);

            res.json(units);
        });
    });

    router.route('/units/:unit_id')

    // get the unit with that id (accessed at GET http://localhost:8080/api/units/:unit_id)
    .get(function(req, res) {
        Unit.findById(req.params.unit_id, function(err, unit) {            
            if (err)
                res.send(err);
            res.json(unit);
        });
    })
    .put(function(req, res) {

        // use our unit model to find the unit we want
        Unit.findById(req.params.unit_id, function(err, unit) {

            if (err)
                res.send(err);

            unit.name = req.body.name;  // update the units info

            // save the unit
            unit.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Unit updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Unit.remove({
            _id: req.params.unit_id
        }, function(err, unit) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
            res.redirect('/');
        });
    });


app.use('/api', router);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;