var pickup = {
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
        "type": {
            "type": "keyword" // can be: "ball" || "gear"
        },
        "startTime": {
            "type": "date" // Epoch time, videoCurrentTime+gameUploadTime
        },
        "endTime": {
            "type": "date" // Epoch time, videoCurrentTime+gameUploadTime
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
