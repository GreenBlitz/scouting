function Shooting() {
    return {
        "teamNumber": teamNumber,
        "gameId": gameId,
        "eventName": "shooting",
        "startTime": Math.round(gameVideo.currentTime - autonomousStartTime),// videoCurrentTime,
        "matchPart": (gameVideo.currentTime - autonomousStartTime) < 15 ? "autonomous" : "teleop",
        "endTime": null,
        "location": null, // Can be: "low" || "high"
        "status": null, // Can be: "success" || "fail"
        "failReason": null, // Can be: TODO: add fail reasons codes for shooting events
        "competition": competition
    }
}

var shooting = null;

function shooting_start() {
    shooting = Shooting();
    hideAllButtons();
    shooting_HighLow();
}

function shooting_HighLow() {
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'High'
        },
        {
            type: 'button',
            value: 'Low'
        }
    ], shooting_status);
}

function shooting_status(height) {
    shooting.location = height;
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'Success'
        },
        {
            type:'buttonSelect',
            value: ['Failed because of interruption', 'Failed because of mechanical failure']
        }
    ], shooting_finish)
}

function shooting_finish(status) {
    shooting.endTime = Math.round(gameVideo.currentTime - autonomousStartTime);
    if (status === 'Success') {
        shooting.status = status;
        delete shooting.failReason; // Prevent ElasticSearch from indexing this value
    } else {
        shooting.status = 'Failure';
        shooting.failReason = status;
    }
    sendEvent(shooting);

    initializeEvents();
}
