var disabled = {
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
        "reason": {
            "type": "keyword" // Can be: TODO: add disabled reason codes for disabled events
        },
        "recoverd": {
            "type": "boolean"
        }
    }
};

module.exports = disabled;
