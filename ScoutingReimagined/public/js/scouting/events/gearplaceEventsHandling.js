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
    gearplace_location();
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
            type:'buttonSelect',
            value: ['Failed because of interruption', 'Failed because of mechanical failure / gear fell', 'Failed because human player dropped the gear']
        }
    ], gearplace_finish);
}

function gearplace_finish(gearplace_status) {
    gearplace.endTime = Math.round(gameVideo.currentTime - autonomousStartTime);
    if (gearplace_status === 'Success') {
        gearplace.status = gearplace_status;
        delete gearplace.failReason; // Prevent ElasticSearch from indexing this value
    } else {
        gearplace.status = 'Failure';
        gearplace.failReason = gearplace_status;
    }
    sendEvent(gearplace);

    initializeEvents();
}