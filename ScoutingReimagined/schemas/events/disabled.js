var disabled = {
    "properties": {
        "teamNumber": {
            "type": "integer"
        },
        "gameId": {
            "type": "integer"
        },
        "eventName": {
            "type": "keyword"
        },
        "startTime": { // In seconds from start of video
            "type": "integer"
        },
        "endTime": {
            "type": "integer" // In seconds from start of video
        },
        "reason": {
            "type": "keyword" // Can be: TODO: add disabled reason codes for disabled events
        },
        "recovered": {
            "type": "boolean"
        }
    }
};

module.exports = disabled;
