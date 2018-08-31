var express = require('express')
var router = express.Router();

var Contact = require('../routes/connection').ContactModel;

router.route('/contacts')
.post(function(req, res) {
    var contact = new Contact();      // create a new instance of the Unit model
    contact.name = "test";  // set the units name (comes from the request)
    contact.mobile = "test";
    contact.group = "test";
    contact.role = "test";
    contact.department = "test";
    contact.nickname = "test";
    contact.office = "test";
    contact.email = "test";
    // save the unit and check for errors
    contact.save(function (err) {
        if (err)
            res.send(err);

        res.json({message: 'Contact created!'});
    });
})
.get(function(req, res) {
    Contact.find({}, function(err, contact) {
        if (err)
            res.send(err);

        contact = contact.filter(function(contacts) {
            return contacts.name !== "";
        });       

        res.json(contact);
    });
})

router.route('/contacts/search')
.post(function(req, res) {
    if (req.body.textSearch !== "") {
            Contact.find({$text: {$search: req.body.textSearch}}, function(err, contact) {
            if (err)
                res.send(err);

            contact = contact.filter(function(contacts) {
                return contacts.name !== "";
            });       

            res.json(contact);
        });
    }       
})

module.exports = router ;