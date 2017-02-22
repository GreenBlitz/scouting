var express = require('express');
var router = express.Router();
var client = require('../lib/elasticsearch/connection');

/* GET home page. */
router.post('/', function(req, res){
    console.log('GOT EVENT TO /event!!!! event body: ' + JSON.stringify(req.body));

    var event = req.body;
    var eventName = event.eventName;

    delete req.body.eventName;
    event.timeTook = event.endTime - event.startTime;



    client.index({
        // teams/team/4590 : {}
        index: 'events',
        type: eventName,
        body: req.body
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

module.exports = router;
