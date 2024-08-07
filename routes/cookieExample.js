var express = require('express');
var router = express.Router();

router.get('/set-cookie', function(req, res){
    res.cookie('user', 'John Doe', {httpOnly: true});
    res.send('Cookie is set');
});

router.get('/get-cookie', function(req, res){
    var user = req.cookies.user;
    res.send('Cookie user is: ' + user);
});

router.get('/clear-cookie', function(req, res){
    res.clearCookie('user');
    res.send('Cookie is cleared!');
});

module.exports = router;