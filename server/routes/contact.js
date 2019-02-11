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

router.route('/contacts/update/')
.post(function(req, res) {
    console.log(req.body.data)
    if (req.body.data.contact_id !== "") {
        const _id = req.body.data.contact_id;
        let data = {
            name: req.body.data.name,
            nickname: req.body.data.nickname,
            office: req.body.data.office,
            mobile: req.body.data.mobile,
        }
        Contact.findByIdAndUpdate(_id, data, {new: true}, function(err, contact) {
            if (err)
                res.status(500).send(err);

            res.status(201).json({
                data: contact,
                message: "success"
            });
        });
    }       
})

module.exports = router ;