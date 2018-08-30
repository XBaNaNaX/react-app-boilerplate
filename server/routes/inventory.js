var express = require('express')
var router = express.Router();

var Unit = require('../routes/connection').UnitModel;

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
        });
    });

module.exports = router;