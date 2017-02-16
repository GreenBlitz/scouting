var express = require('express');
var client = require('../connection.js');
var fs = require('fs');
var router = express.Router();


/* POST upload page. */
var handleUpload = function(req, res) {
    var body = req.body;
    console.log(body);
    var blueTeams = req.body.blueTeam.split(",");
    var redTeams = req.body.redTeam.split(",");
    var gameid = req.body.gameid;
    var matchType = req.body.matchType;
    var comments = req.body.comments;
    client.index({
        index: 'games',
        id: gameid,
        type: matchType,
        body: {
            "blue_teams": blueTeams,
            "red_teams": redTeams,
            "comments": comments
        }
    }, function(err, resp, status) {
        console.log(resp);
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });

    /// .   .   .   Insert into ES and get gameid
    console.log(req);
    res.render('upload', {success: 1, firstTime: 0});
};


/* GET upload page. */
router.get('/', function(req, res, next) {
    res.render('upload', {success: 0, firstTime: 1});
});

module.exports = {router: router, handleUpload: handleUpload};
