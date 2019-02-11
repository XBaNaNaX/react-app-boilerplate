var express = require('express')
var router = express.Router();

var Role = require('../routes/connection').RoleModel;

router.route('/roles')
.post(function(req, res) {
    var role = new Role();      // create a new instance of the Unit model
    role.title = "test";  // set the units name (comes from the request)
    role.active = true;
    // save the unit and check for errors
    role.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Role created!'});
    });
})
.get(function(req, res) {
    Role.find({}, function(err, role) {
        if (err)
            res.send(err);

        role = role.filter(function(roles) {           
            return roles.active === true;
        });       

        res.json(role);
    });
})

router.route('/roles/search')
.post(function(req, res) {
    if (req.body.textSearch !== "") {
            Role.find({$text: {$search: req.body.textSearch}}, function(err, role) {
            if (err)
                res.send(err);

            role = role.filter(function(roles) {
                return role.title !== "";
            });       

            res.json(role);
        });
    }       
})

module.exports = router ;