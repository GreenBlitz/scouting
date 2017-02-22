function PickUp() {
    return {
        "meta_data": {
            "teamNumber": teamNumber,
            "gameId": gameId,
            "eventName": "pickup"
        },
        "type": null,
        "startTime": 1,// videoCurrentTime,
        "endTime": null,
        "timeTook": null,
        "location": null, // Can be: "low" || "high"
        "status": null, // Can be: "success" || "fail"
        "failReason": null // Can be: TODO: add fail reasons codes for shooting events
    }
}

var pickup = null;

function pickup_start() {
    pickup = PickUp();
    hideAllButtons();
    pickup_gearOrBall();
}

function pickup_gearOrBall() {
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'Gear'
        },
        {
            type: 'button',
            value: 'Ball'
        }
    ], pickup_location);
}

function pickup_location(pickup_type) {
    pickup.type = pickup_type;
    if (pickup_type == 'Gear') {
        fillEventsDivWithObjects([
            {
                type: 'button',
                value: 'Floor'
            },
            {
                type: 'button',
                value: 'Feeder'
            }
        ], pickup_status);
    } else if (pickup_type == 'Ball') {
        fillEventsDivWithObjects([
            {
                type: 'button',
                value: 'Floor'
            },
            {
                type: 'button',
                value: 'Hopper'
            }
        ], pickup_status);
    }
}

function pickup_status(pickup_location) {
    pickup.location = pickup_location;
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'Success'
        },
        {
            type:'select',
            value: ['Failure', 'Failed because of interruption', 'Failed because of mechanical failure']
        }
    ], pickup_finish);
}

function pickup_finish(pickup_status) {
    pickup.status = pickup_status;
    pickup.endTime = 10; //videoCurrentTime
    pickup.timeTook = pickup.endTime - pickup.startTime;
    if (status === 'Success') {
        pickup.status = status;
    } else {
        pickup.status = 'Failure';
        pickup.failReason = status;
    }
    sendEvent(pickup);

    initializeEvents();

}