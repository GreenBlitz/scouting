var express = require('express');
var client = require('../connection.js');
var fs = require('fs');
var router = express.Router();


/* POST upload page. */
var handleUpload = function(req, res) {
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

    /// .   .   .   Insert into ES and get gameid
    console.log(req);
    res.render('upload', {success: 1, firstTime: 0});
};


/* GET upload page. */
router.get('/', function(req, res, next) {
    res.render('upload', {success: 0, firstTime: 1});
});

module.exports = {router: router, handleUpload: handleUpload};
