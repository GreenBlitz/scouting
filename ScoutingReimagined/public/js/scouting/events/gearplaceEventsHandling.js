function GearPlace() {
    return {
        "teamNumber": teamNumber,
        "gameId": gameId,
        "eventName": "gearplace",
        "startTime": Math.round(gameVideo.currentTime - autonomousStartTime),// videoCurrentTime,
        "matchPart": (gameVideo.currentTime - autonomousStartTime) < 15 ? "autonomous" : "teleop",
        "endTime": null,
        "location": null, // Can be: "left" || "center" || "right"
        "status": null, // Can be: "success" || "fail"
        "failReason": null // Can be: TODO: add fail reasons codes for shooting events
    }
}

var gearplace = null;

function gearplace_start() {
    gearplace = GearPlace();
    hideAllButtons();
    pickup_gearOrBall();
}

function gearplace_location() {
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'Left'
        },
        {
            type: 'button',
            value: 'Center'
        },
        {
            type: 'button',
            value: 'Right'
        }
    ], gearplace_status);
}

function gearplace_status(gearplace_location) {
    gearplace.location = gearplace_location;
    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'Success'
        },
        {
            type:'select',
            value: ['Failure', 'Failed because of interruption', 'Failed because of mechanical failure']
        }
    ], gearplace_finish);
}

function gearplace_finish(gearplace_status) {
    gearplace.status = gearplace_status;
    gearplace.endTime = Math.round(gameVideo.currentTime - autonomousStartTime);
    if (status === 'Success') {
        gearplace.status = status;
        delete gearplace.failReason; // Prevent ElasticSearch from indexing this value
    } else {
        gearplace.status = 'Failure';
        gearplace.failReason = status;
    }
    sendEvent(gearplace);

    initializeEvents();
}