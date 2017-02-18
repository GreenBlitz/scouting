var express = require('express');
var client = require('../lib/elasticsearch/connection');
var router = express.Router();


// TODO solve problem of simultaneous reiviweing of games
/* GET games page. */
router.get('/', function (req, res, next) {
    client.search({
        index: 'games',
        type: 'game',
        body: {
            query: {
                match_all: {}
            }
        }
    }, function (error, response, status) {
        if (error) {
            console.log("search error: " + error);
            res.send(500);
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
            res.render('games', {
                Practice: games['Practice'],
                Qualification: games['Qualification'],
                Playoffs: games['Playoffs']
            });
        }
    });

});

module.exports = router;
