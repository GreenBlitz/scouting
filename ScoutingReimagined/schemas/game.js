// Example Document
// {
//     "gameId": 123,
//     "blueTeams": [1, 2, 3],
//     "redTeams": [4, 5, 6],
//     "comment": "abcd",
//     "matchType": "QUAL|PRAC|PLAYOFF",
//     "winningAlliance": "red|blue",
//     "blueTeamScore": 123,
//     "redTeamScore": 456
// }

var game = {
    "properties": {
        "gameId": {
            "type": "integer"
        },
        "blueTeams": {
            "type": "integer"
        },
        "redTeams": {
            "type": "integer"
        },
        "reviewed": {
            "type": "boolean" // a boolean list the size of all the teams (6) - [false,false,false,false,false,false], that states which games were reviewed.
        },
        "comments": {
            "type": "text"
        },
        "winningAlliance": {
            "type": "keyword" // Can be: "red" || "blue"
        },
        "blueTeamScore": {
            "type": "integer"
        },
        "redTeamScore": {
            "type": "integer"
        }
    }
};

module.exports = game;
