var pickup = {
    "properties": {
        "teamNumber": {
            "type": "integer"
        },
        "gameId": {
            "type": "integer"
        },
        "type": {
            "type": "keyword" // can be: "ball" || "gear"
        },
        "startTime": { // In seconds from start of video
            "type": "integer"
        },
        "endTime": {
            "type": "integer" // In seconds from start of video
        },
        "location": {
            "type": "keyword" // Can be: "feeder" || "floor"
        },
        "status": {
            "type": "keyword" // Can be: "success" || "fail"
        },
        "failReason": {
            "type": "keyword" // Can be: TODO: add fail reason codes for ballPickup events
        }
    }
};

module.exports = pickup;
