var express = require('express');
var router = express.Router();
var client = require('../lib/elasticsearch/connection');

/* GET home page. */
router.post('/', function (req, res) {
    console.log('GOT EVENT TO /event!!!! event body: ' + JSON.stringify(req.body));

    var event = req.body;
    var eventName = event.eventName;

    delete event.eventName;
    event.timeTook = event.endTime - event.startTime;

    client.index({
        // teams/team/4590 : {}
        index: 'events',
        type: eventName,
        body: event
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

router.delete('/', function (req, res) {
    console.log('GOT EVENT DELETE TO /event!!!! event body: ' + JSON.stringify(req.body));
    var event = req.body;
    client.deleteByQuery({
        index: 'events',
        type: event.eventName,
        body: {
            "query": {
                "constant_score": {
                    "filter": {
                        "bool": {
                            "must": [{
                                    "term": {
                                        "startTime": event.startTime
                                    }
                                },
                                {
                                    "term": {
                                        "endTime": event.endTime
                                    }
                                },
                                {
                                    "term": {
                                        "gameId": event.gameId
                                    }
                                },
                                {
                                    "term": {
                                        "teamNumber": event.teamNumber
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    }, function (err, resp) {
        console.log(resp);
        if (err) {
            console.log(err);
            res.sendStatus(500); // Internal server error
        } else {
            console.log("Successfully deleted from elasticsearch! response: " + JSON.stringify(resp));
            res.sendStatus(200);
        }
    });
    console.log("after making request");
});

router.get('/', function (req, res) {
    client.search({
        index: 'events',
        body: {
            sort: [{
                startTime: "asc"
            }],
            query: {
                "constant_score": {
                    "filter": {
                        "bool": {
                            "must": [{
                                    "term": {
                                        gameId: req.query.gameId
                                    }
                                },
                                {
                                    "term": {
                                        teamNumber: req.query.teamNumber
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    }, function (err, resp) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        console.log(resp);
        var events = [];
        for (var i = 0; i < resp.hits.hits.length; i++) {
            var event = resp.hits.hits[i]._source;
            event.eventName = resp.hits.hits[i]._type;
            events.push(event);
        }
        res.send(events);
    });
});

module.exports = router;


