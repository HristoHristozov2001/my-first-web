var express = require('express');
var anotherExample = require('./anotherExample');
var router = express.Router();

router.get('/',function(req, res, next){
    res.send('Hello from example router');
});

router.use('/anotherExample',anotherExample);

module.exports = router;