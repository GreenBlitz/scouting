var express = require('express');
var client = require('../lib/elasticsearch/connection');
var router = express.Router();


// TODO solve problem of simultaneous reiviweing of games
/* GET games page. */
router.get('/', function (req, res, next) {
    client.search({
        index: 'games',
        body: {
            query: {
                match_all: {}
            }
        }
    }, function (error, response, status) {
        if (error) {
            console.log("search error: " + error);
            res.sendStatus(500);
        } else {
            var games = {
                'Practice': [],
                'Qualification': [],
                'Playoffs': []
            };
            response.hits.hits.forEach(function (hit) {
                var data = hit['_source'];
                if (hit['_type'] in games) {
                    games[hit['_type']].push(data);
                }
            });

            client.search({
                index: 'importants',
                body: {
                    query: {
                        match_all: {}
                    }
                }
            }, function (error, response, status) {
                if (error) {
                    console.log("search error on getImportantTeams: " + error);
                    return [];
                } else {
                    var importants = [];
                    response.hits.hits.forEach(function (hit) {
                        var data = hit['_source'];
                        if (data.important) {
                            importants.push(hit['_id']); // Add team id to importants.
                        }
                    });

                    console.log("importants: " + JSON.stringify(importants));

                    res.render('games', {
                        Practice: games['Practice'],
                        Qualification: games['Qualification'],
                        Playoffs: games['Playoffs'],
                        importantTeams: importants
                    });
                }
            });
        }
    });

});


function getImportantTeams() {

}

module.exports = router;
