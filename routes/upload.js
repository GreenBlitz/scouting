var express = require('express');
var client = require('../connection.js');
var fs = require('fs');
var router = express.Router();

/* POST upload page. */
router.post('/', function(req, res, next) {

    /// .   .   . Insert into ES and get gameid

    var gameid = 0;

    var files = req.files;
    if (files && files.gameVideo) {
        var file = files.gameVideo;
        var oldPath = file.path;
        var newPath = "../games/" + gameid + ".mp4";
        fs.rename(oldPath, newPath, function(err, res) {
            if (err) {
                console.error("Uploading game #" + gameid, "failed. Please insert video manually as: uploads/" + gameid + ".mp4");
            } else {
                console.log("Uploading game #" + gameid, "Successful! :)");
            }
        })
    }

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

/* GET upload page. */
router.get('/', function(req, res, next) {
    res.render('upload');
});

module.exports = router;
