var climb = {
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
        "status": {
            "type": "keyword" // Can be: "success" || "fail"
        },
        "failReason": {
            "type": "keyword" // Can be: TODO: add fail reason codes for climb events
        }
    }
};

module.exports = climb;