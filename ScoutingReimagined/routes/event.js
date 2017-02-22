var express = require('express');
var router = express.Router();
var client = require('../lib/elasticsearch/connection');

/* GET home page. */
router.post('/', function(req, res){
    console.log('GOT EVENT TO /event!!!! event body: ' + JSON.stringify(req.body));

    var eventName = req.body['meta_data[eventName]'];
    var gameId = req.body['meta_data[gameId]'];
    var teamNumber = req.body['meta_data[teamNumber]'];


    client.index({
        // teams/team/4590 : {}
        index: 'events',
        type: eventName,
        body: eventBodyToEvent(req.body)
    }, function (err, resp, status) {
        console.log(resp);
        if (err) {
            console.log(err);
            res.sendStatus(500); // Internal server error
        } else {
            /// .   .   .   Insert into ES and get gameid
            console.log("Successfully wrote to elasticsearch! response: " + resp);
            res.sendStatus(200);
        }
    });
});

function eventBodyToEvent(bodyEvent) {
    delete bodyEvent['meta_data[eventName]'];
    delete bodyEvent['meta_data[gameId]'];
    bodyEvent.teamNumber = bodyEvent['meta_data[teamNumber]'];
    delete bodyEvent['meta_data[teamNumber]'];
    return bodyEvent;
}

module.exports = router;
