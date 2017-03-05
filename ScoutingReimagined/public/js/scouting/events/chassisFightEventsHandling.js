function ChassisFight() {
    return {
        "teamNumber": teamNumber,
        "gameId": gameId,
        "eventName": "chassisFight",
        "startTime": Math.round(gameVideo.currentTime - autonomousStartTime),// videoCurrentTime,
        "matchPart": (gameVideo.currentTime - autonomousStartTime) < 15 ? "autonomous" : "teleop",
        "endTime": null,
        // "alliedTeam": null, // List of all allied team numbers involved
        // "enemyTeam": null,  // List of all enemy team numbers involved
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
            value: 'Got attacked'
        }
    ], chassisFight_status_noTeamsInput);
}

function chassisFight_Teams(chassisFight_initiated) {
    chassisFight.initiated = chassisFight_initiated == 'Initiated';
    var eventsDiv = $('#eventsDiv');
    eventsDiv.empty();


    for (var i = 0; i < blueTeams.length; i++) {
        addCheckbox(blueTeams[i], "blue", i+1, "blue");
    }
    for (var j = 0; j < redTeams.length; j++) {
        addCheckbox(redTeams[j], "red", j+1, "red");
    }

    var element = document.createElement("div");
    element.className = "col-md-12";

    var button = document.createElement("button");
    button.className = "btn btn-info btn-block event-button";
    var heightText = document.createTextNode("Submit");
    button.appendChild(heightText);
    button.addEventListener("click", function() {chassisFight_status()} );
    element.appendChild(button);

    eventsDiv.append(element);

    onEnterKeyClick = chassisFight_status;
}

function addCheckbox(content, color, id, name) {
    var eventsDiv = $('#eventsDiv');

    //col-md-2
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = name;
    checkbox.value = content;
    checkbox.id = name + id;
    // checkbox.className = "hidden";

    var label = document.createElement("label");
    var labelContent = document.createTextNode(content);
    label.setAttribute("for", checkbox.id);
    label.appendChild(labelContent);
    label.className = "team-label";
    label.style.color = color;


    var element = document.createElement("div");
    element.className = "col-md-2";

    var clickOffset = name == "red" ? 3 : 0;

    buttonClickEvent[id + clickOffset] = function() {
        checkbox.checked = !checkbox.checked;
    };

    element.appendChild(checkbox);
    element.appendChild(label);
    eventsDiv.append(element);
}

function chassisFight_status() {
    var reds = [], blues = [];
    for (var i = 1; i <= 3; i++) {
        var blue = document.getElementById('blue' + i);
        var red = document.getElementById('red' + i);
        if (blue.checked) {
            blues.push(blueTeams[i-1])
        }
        if (red.checked) {
            reds.push(redTeams[i-1])
        }
    }

    if (reds.length == 0) {
        console.log("Must pick at least 1 enemy team for a fight.");
        return;
    }

    if (teamNumber in blueTeams) {
        chassisFight.alliedTeam = blues;
        chassisFight.enemyTeam = reds;
    } else {
        chassisFight.alliedTeam = reds;
        chassisFight.enemyTeam = blues;
    }

    fillEventsDivWithObjects([
        {
            type: 'button',
            value: 'Win'
        },
        {
            type:'button',
            value: 'Lose'
        }
    ], chassisFight_finish);
}

function chassisFight_status_noTeamsInput(chassisFight_initiated) {
    chassisFight.initiated = chassisFight_initiated == 'Initiated';
    var eventsDiv = $('#eventsDiv');
    eventsDiv.empty();

    if (chassisFight.initiated) {
        fillEventsDivWithObjects([
            {
                type: 'button',
                value: 'Successful event interruption'
            },
            {
                type: 'button',
                value: 'Event was not interrupted'
            }
        ], chassisFight_finish);
    } else {
        fillEventsDivWithObjects([
            {
                type: 'button',
                value: 'Continued in his task without interruption'
            },
            {
                type:'button',
                value: 'Event was interrupted'
            }
        ], chassisFight_finish);
    }
}

function chassisFight_finish(chassisFight_status) {
    chassisFight.status = (chassisFight_status == 'Successful event interruption'
                        || chassisFight_status == 'Continued in his task without interruption');
    chassisFight.endTime = Math.round(gameVideo.currentTime - autonomousStartTime);
    sendEvent(chassisFight);

    initializeEvents();

}