var express = require('express');
var es = require('elasticsearch');
var client = require('../connection.js');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    // var body = req.body;
    // var blueTeam = [1, 2, 3];
    // var redTeam = [4, 5, 6];
    // client.index({
    //     index: 'gov',
    //     id: '1',
    //     type: 'constituencies',
    //     body: {
    //         "ConstituencyName": "Ipswich",
    //         "ConstituencyID": "E14000761",
    //         "ConstituencyType": "Borough",
    //         "Electorate": 74499,
    //         "ValidVotes": 48694,
    //     }
    // }, function(err, resp, status) {
    //     console.log(resp);
    //     if (err) {
    //         console.log(err);
    //         res.sendStatus(500);
    //         return;
    //     }
    // });


    res.sendStatus(200);
});

module.exports = router;
