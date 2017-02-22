function Climb() {
    return {
        "meta_data": {
            "teamNumber": teamNumber,
            "gameId": gameId,
            "eventName": "climb"
        },
        "startTime": 1,// videoCurrentTime,
        "endTime": null,
        "timeTook": null,
        "status": null, // Can be: "success" || "fail"
        "failReason": null // Can be: TODO: add fail reasons codes for shooting events
    }
}

var climb = null;

function climb_start() {
    climb = Climb();
    hideAllButtons();
    climb_status();
}

function climb_status() {
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'Success'
        },
        {
            type:'select',
            value: ['Failure', 'Failed because of interruption', 'Failed because of mechanical failure']
        }
    ], climb_finish);
}

function climb_finish(climb_status) {
    climb.endTime = 10; //videoCurrentTime
    climb.timeTook = climb.endTime - climb.startTime;
    if (climb_status === 'Success') {
        climb.status = climb_status;
    } else {
        climb.status = 'Failure';
        climb.failReason = climb_status;
    }
    sendEvent(climb);

    initializeEvents();

}