var shooting = {
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
        "type": "keyword" // Can be: "low" || "high"
    }
};

module.exports = shooting;
