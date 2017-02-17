function setup() {
    var client = require('./connection');
    indexGames(client);
}

function indexGames(client) {
    client.indices.exists({
        index: 'games'
    }, function(err, exists) {
        if (!exists) {
            client.indices.create({
                index: 'games'
            }, function(err, res) {
                console.log("err", err);
                console.log("res", res);
                if (!err) {
                    // Push mappings
                    mapGames(client);
                }
            });
        } else {
            mapGames(client);
        }

    });
}


function mapGames(client) {
    client.indices.putMapping({
        index: "games",
        type: "game",
        body: {
            properties: {
                gameId: {
                    type: "integer"
                },
                blueTeams: {
                    type: "integer"
                },
                redTeams: {
                    type: "integer"
                },
                comments: {
                    type: "text"
                }
            }
        }
    }, function(err, res) {
        console.log("err: ", err);
        console.log("res: ", res);
    });
}

module.exports = {
    setup: setup
};
