var express = require('express')
var router = express.Router();

var Group = require('../routes/connection').GroupModel;

router.route('/groups')
.post(function(req, res) {
    var group = new Group();      // create a new instance of the Unit model
    group.title = "test";  // set the units name (comes from the request)
    group.active = true;
    // save the unit and check for errors
    group.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Group created!'});
    });
})
.get(function(req, res) {
    Group.find({}, function(err, group) {
        if (err)
            res.send(err);

        group = group.filter(function(groups) {           
            return groups.active === true;
        });       

        res.json(group);
    });
})

router.route('/groups/search')
.post(function(req, res) {
    if (req.body.textSearch !== "") {
            Group.find({$text: {$search: req.body.textSearch}}, function(err, group) {
            if (err)
                res.send(err);

            group = group.filter(function(groups) {
                return group.title !== "";
            });       

            res.json(group);
        });
    }       
})

module.exports = router ;