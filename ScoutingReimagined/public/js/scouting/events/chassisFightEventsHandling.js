function ChassisFight() {
    return {
        "teamNumber": teamNumber,
        "gameId": gameId,
        "eventName": "chassisFight",
        "startTime": 1,// videoCurrentTime,
        "endTime": null,
        "timeTook": null,
        "alliedTeam": null, // List of all allied team numbers involved
        "enemyTeam": null,  // List of all enemy team numbers involved
        "status": null, // Can be: "success" || "fail"
        "fightReason": null, // Can be: TODO: add fight reason codes for fight events
        "failReason": null, // Can be: TODO: add fail reason codes for fight events
        "initiated": null // Was the fight intentional or coerced upon the team
    }
}

var chassisFight = null;

function chassisFight_start() {
    chassisFight = ChassisFight();
    hideAllButtons();
    chassisFight_initiated();
}

function chassisFight_initiated() {
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'Initiated'
        },
        {
            type: 'button',
            value: 'Got hit on'
        }
    ], chassisFight_Teams);
}

function chassisFight_Teams(chassisFight_initiated) {
    chassisFight.initiated = chassisFight_initiated == 'Initiated';
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'Floor'
        },
        {
            type: 'button',
            value: 'Feeder'
        }
    ], chassisFight_status);
}

function chassisFight_status(chassisFight_location) {
    chassisFight.location = chassisFight_location;
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'Success'
        },
        {
            type:'select',
            value: ['Failure', 'Failed because of interruption', 'Failed because of mechanical failure']
        }
    ], chassisFight_finish);
}

function chassisFight_finish(chassisFight_status) {
    chassisFight.status = chassisFight_status;
    chassisFight.endTime = 10; //videoCurrentTime
    if (status === 'Success') {
        chassisFight.status = status;
    } else {
        chassisFight.status = 'Failure';
        chassisFight.failReason = status;
    }
    sendEvent(chassisFight);

    initializeEvents();

}