function Shooting() {
    return {
        "teamNumber": teamNumber,
        "gameId": gameId,
        "eventName": "shooting",
        "startTime": 1,// videoCurrentTime,
        "endTime": null,
        "timeTook": null,
        "location": null, // Can be: "low" || "high"
        "status": null, // Can be: "success" || "fail"
        "failReason": null // Can be: TODO: add fail reasons codes for shooting events
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
            type:'select',
            value: ['Failure', 'Failed because of interruption', 'Failed because of mechanical failure']
        }
    ], shooting_finish)
}

function shooting_finish(status) {
    shooting.endTime = 10; //videoCurrentTime
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
