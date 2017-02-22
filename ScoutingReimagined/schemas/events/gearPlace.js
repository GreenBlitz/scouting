var gearPlace = {
    "properties": {
        "meta_data": {
            "properties": {
                "teamNumber": {
                    "type": "integer"
                },
                "gameId": {
                    "type": "integer"
                },
                "eventName": {
                    "type": "keyword"
                }
            }
        },

        "startTime": { // In seconds from start of video
            "type": "integer"
        },
        "endTime": {
            "type": "integer" // In seconds from start of video
        },
        "timeTook": {
            "type": "integer"
        },
        "location": {
            "type": "keyword" // Can be: "left" || "center" || "right"
        },
        "status": {
            "type": "keyword" // Can be: "success" || "fail"
        },
        "failReason": {
            "type": "keyword" // Can be: TODO: add fail reason codes for fight events
        }
    }
};

module.exports = gearPlace;
