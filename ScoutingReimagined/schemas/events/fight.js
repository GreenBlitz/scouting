var fight = {
    "properties": {
        "date": {
            "type": "date"
        },
        "teamNumber": {
            "type": "integer"
        },
        "gameId": {
            "type": "integer"
        },
        "eventName": {
            "type": "keyword"
        },
        "startTime": {
            "type": "date" // Epoch time, videoCurrentTime+gameUploadTime
        },
        "endTime": {
            "type": "date" // Epoch time, videoCurrentTime+gameUploadTime
        },
        "enemyTeam": {
            "type": "integer" // List of all enemy team numbers involved
        },
        "alliedTeam": {
            "type": "integer" // List of all the allied team numbers involved
        },
        "initiated": { // Was the fight intentional or coerced upon the team
            "type": "boolean"
        },
        "fightReason": {
            "type": "keyword" // Can be: TODO: add fight reason codes for fight events
        },
        "status": {
            "type": "keyword" // Can be: "success" || "fail"
        },
        "failReason": {
            "type": "keyword" // Can be: TODO: add fail reason codes for fight events
        }
    }
};

module.exports = fight;
