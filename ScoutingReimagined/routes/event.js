var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res){
    console.log('GOT EVENT TO /event!!!! event body: ' + JSON.stringify(req.body));

    res.end();
});

module.exports = router;
