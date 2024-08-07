var express = require('express');
var router = express.Router();

router.post('/submit', function(req, res){
    var recievedData = req.body;
    console.log('Recieved JSON data: ', recievedData);
    res.send('Data recieved!');
});

module.exports = router;