var express = require('express');
var client = require('../lib/elasticsearch/connection');
var router = express.Router();


// TODO solve problem of simultaneous reviewing of games
/* GET games page. */
router.get('/', function (req, res, next) {
    var calls = [];

    calls.push(new Promise(getAllGames));
    calls.push(new Promise(getTeamGameData));


    Promise.all(calls)
        .then(function (values) {
            console.log("result of promise: " + JSON.stringify(values));
            var games = values[0];
            var importants = values[1][0];
            var reviewed = values[1][1];
            var unwanted = values[1][2];

            res.render('games', {
                Practice: games['Practice'],
                Qualification: games['Qualification'],
                Playoffs: games['Playoffs'],
                importantTeams: importants,
                reviewedTeams: reviewed,
                unwantedTeams: unwanted
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
            reject(error);
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



function getTeamGameData(resolve, reject) {
    client.search({
        index: 'team-game-data',
        body: {
            query: {
                match_all: {}
            }
        }
    }, function (error, response, status) {
        if (error) {
            console.log("search error on getTeamGameData: " + error);
            reject(error);
        } else {
            var importants = [],
                reviewed = [],
                unwanted = [];
            response.hits.hits.forEach(function (hit) {
                var data = hit['_source'];
                var teamNumber = hit['_id'];
                if (data.importantGames) {
                    importants.push({
                        teamNumber: teamNumber,
                        games: data.importantGames
                    }); // Add team id to importants.
                }
                if (data.reviewedGames) {
                    reviewed.push({
                        teamNumber: teamNumber,
                        games: data.reviewedGames
                    });
                }
                if (data.unwantedGames) {
                    unwanted.push({
                        teamNumber: teamNumber,
                        games: data.unwantedGames
                    })
                }
            });

            console.log("Calling callback on getTeamGameData...");

            resolve([importants, reviewed, unwanted]);

        }
    });
}

module.exports = router;
