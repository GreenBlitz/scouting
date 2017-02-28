var express = require('express');
var router = express.Router();
var client = require('../lib/elasticsearch/connection');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('teamgamedata', {firstTime: true, success: true})
});


router.post('/', function(req, res) {
   console.log("team game data body: " + JSON.stringify(req.body));

   
   var teamNumber = req.body.teamNumber;
   var important = req.body.important;
   var unwanted = req.body.unwanted;

    client.index({
        // teams/team/4590 : {}
        index: 'team-game-data',
        id: teamNumber,
        type: "team",
        body: {
            "importantGames": important,
            "unwantedGames": unwanted
        }
    }, function (err, resp, status) {
        console.log(resp);
        if (err) {
            console.log(err);
            res.sendStatus(500); // Internal server error
        } else {
            /// .   .   .   Insert into ES and get gameid
            res.render('teamgamedata', {
                success: 1,
                firstTime: 0
            });
        }
    });
});
module.exports = router;
