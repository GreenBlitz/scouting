var gearPickup = {
    "properties": {
        "meta_data": {
            "properties": {
                "teamNumber": {
                    "type": "integer"
                },
                "gameId": {
                    "type": "integer"
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
            "type": "keyword" // Can be: "feeder" || "floor"
        },
        "status": {
            "type": "keyword" // Can be: "success" || "fail"
        },
        "failReason": {
            "type": "keyword" // Can be: TODO: add fail reasons codes for gearPickup events
        }
    }
};

module.exports = gearPickup;
