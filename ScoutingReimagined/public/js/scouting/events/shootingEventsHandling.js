function Shooting() {
    console.log("SHOT!");
    return {
        "meta_data": {
            "teamNumber": teamNumber,
            "gameId": gameId
        },
        "startTime": 1,// videoCurrentTime,
        "endTime": null,
        "timeTook": null,
        "location": null, // Can be: "low" || "high"
        "status": null, // Can be: "success" || "fail"
        "failReason": null // Can be: TODO: add fail reasons codes for shooting events
    }
}


function shooting_start() {
    shooting = Shooting();
    hideAllButtons();
    shooting_HighLow();
}

function shooting_HighLow() {
    console.log('Got into shooting high low!');
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
    console.log('Got into shooting status!');
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
    console.log('Got into shooting finish!');
    shooting.endTime = 10; //videoCurrentTime
    shooting.timeTook = shooting.endTime - shooting.startTime;
    if (status === 'Success') {
        shooting.status = status;
    } else {
        shooting.status = 'Failure';
        shooting.failReason = status;
    }
    sendEvent(shooting);

    hideEventsDiv();
    showEventButtons();
}
