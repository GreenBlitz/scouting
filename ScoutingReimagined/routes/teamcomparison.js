var express = require('express');
var client = require('../lib/elasticsearch/connection');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("getting all events..");
    var events = getAllEvents();
    res.render('teamcomparison', {'events': events});
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
