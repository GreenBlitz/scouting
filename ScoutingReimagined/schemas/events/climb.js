var climb = {
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
        "status": {
            "type": "keyword" // Can be: "success" || "fail"
        },
        "failReason": {
            "type": "keyword" // Can be: TODO: add fail reason codes for climb events
        }
    }
};

module.exports = climb;
