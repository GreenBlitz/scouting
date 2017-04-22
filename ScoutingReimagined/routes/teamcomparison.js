var express = require('express');
var client = require('../lib/elasticsearch/connection');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("getting all events..");
    var events = getAllEvents();
    res.render('teamcomparison', {'events': [
        {
            "_index": "events",
            "_type": "gearplace",
            "_id": "AVrXkyql3SkVUya5L5YR",
            "_score": 1,
            "_source": {
                "status": "Success",
                "matchPart": "teleop",
                "gameId": 82,
                "startTime": 24,
                "timeTook": 0,
                "competition": "district4",
                "location": "Right",
                "teamNumber": 1943,
                "endTime": 24
            }
        },
        {
            "_index": "events",
            "_type": "gearplace",
            "_id": "AVrXoboc3SkVUya5L5Zl",
            "_score": 1,
            "_source": {
                "status": "Success",
                "matchPart": "teleop",
                "gameId": 83,
                "startTime": 74,
                "timeTook": 3,
                "competition": "district4",
                "location": "Left",
                "teamNumber": 1690,
                "endTime": 77
            }
        }
    ]});
});



function getAllEvents() {
    client.search({
        index: 'events',
        size: 10000,
        body: {
            query: {
                constant_score: {
                    filter: {
                        terms: {
                            _type: ["shooting", "gearplace"]
                        }
                    }
                }
            }
        }
    }, function (error, response, status) {
        if (error) {
            console.log("search error: " + error);
        } else {
            return response.hits.hits;
        }
    });
    return [];
}

module.exports = router;
