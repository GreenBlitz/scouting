function Stuck() {
    return {
        "meta_data": {
            "teamNumber": teamNumber,
            "gameId": gameId
        },
        "startTime": 1,// videoCurrentTime,
        "endTime": null,
        "timeTook": null,
        "reason": null, // Can be: TODO: add disabled reason codes for disabled events
        "recovered": null // boolean
    }
}

var stuck = null;

function stuck_start() {
    stuck = Stuck();
    hideAllButtons();
    stuck_reason();
}

function stuck_reason() {
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: '[DEFAULT]Electrical failure'
        },
        {
            type: 'button',
            value: 'Disabled by referee'
        },
        {
            type: 'button',
            value: 'Hit by other robot'
        },
        {
            type: 'button',
            value: 'Flipped'
        }
    ], stuck_recovered);
}

function stuck_recovered(stuck_reason) {
    switch(stuck_reason) {
        case 'Disabled by referee':
            stuck.reason = 'disabled';
            break;
        case 'Hit by other robot':
            stuck.reason = 'hit';
            break;
        case 'Flipped':
            stuck.reason = 'flip';
            break;
        default:
            stuck.reason = 'electrical';
            break;
    }
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'Recovered'
        },
        {
            type: 'button',
            value: 'Did not recover'
        }
    ], stuck_finish);
}

function stuck_finish(stuck_recovery) {
    stuck.recovered = stuck_recovery == 'Recovered';
    stuck.endTime = 10; //videoCurrentTime
    var videoLength = 100; // TODO video length
    stuck.timeTook = stuck.recovered ? videoLength : (stuck.endTime - stuck.startTime);
    sendEvent(stuck);

    initializeEvents();

}