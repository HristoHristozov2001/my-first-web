var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('form');
});

router.post('/submit-form', function(req, res) {
    console.log("Form submitted");
    console.log("Request body: ", req.body);
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    res.send("Form data received: " + firstName + " " + lastName + " " + email);
});

module.exports = router;
