var disabled = {
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
        "reason": {
            "type": "keyword" // Can be: TODO: add disabled reason codes for disabled events
        },
        "recovered": {
            "type": "boolean"
        }
    }
};

module.exports = disabled;
