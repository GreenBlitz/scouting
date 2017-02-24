var gearPlace = {
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
        "startTime": {
            "type": "date" // Epoch time, videoCurrentTime+gameUploadTime
        },
        "endTime": {
            "type": "date" // Epoch time, videoCurrentTime+gameUploadTime
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
