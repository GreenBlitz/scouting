var express = require('express');
var client = require('../lib/elasticsearch/connection');
var router = express.Router();
var async = require('async');

var calls = [];

['aaa','bbb','ccc'].forEach(function(name){
    calls.push(function(callback) {
            conn.collection(name).drop(function(err) {
                if (err)
                    return callback(err);
                console.log('dropped');
                callback(null, name);
            });
        }
    )});




// TODO solve problem of simultaneous reviewing of games
/* GET games page. */
router.get('/', function (req, res, next) {
    var calls = [];

    calls.push(new Promise(getAllGames));
    calls.push(new Promise(getImportantTeams));


    Promise.all(calls).then(function(values) {
        console.log("result of promise: " + JSON.stringify(values));
        var games = values[0];
        var importants = values[1];

        res.render('games', {
            Practice: games['Practice'],
            Qualification: games['Qualification'],
            Playoffs: games['Playoffs'],
            importantTeams: importants
        });
    });
});

function getAllGames(resolve, reject) {
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
            console.log("Calling callback on getAllGames...");

            resolve(games);
        }
    });
}



function getImportantTeams(resolve, reject) {
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
                if (data.importantGames) {
                    var teamNumber = hit['_id'];
                    importants.push({
                        teamNumber: teamNumber,
                        games: data.importantGames
                    }); // Add team id to importants.
                }
            });

            console.log("Calling callback on getImportantTeams...");

            resolve(importants);

        }
    });
}

module.exports = router;
