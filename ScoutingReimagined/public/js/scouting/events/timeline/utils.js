function addEventToTimeline(event) {
    var timeline = document.getElementById("timeline");

    // Event Entry:
    // <li>
    //   <div class="timeline-badge"><i class="glyphicon glyphicon-check"></i></div>
    //   <div class="timeline-panel">
    //     <div class="timeline-heading">
    //       <h4 class="timeline-title">Mussum ipsum cacilds</h4>
    //       <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p>
    //     </div>
    //     <div class="timeline-body">
    //       <p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
    //     </div>
    //   </div>
    // </li>
    var eventEntry = createEventEntry(event);
    timeline.appendChild(eventEntry);
    timeline.scrollTop = timeline.scrollHeight;
}

function createEventEntry(event) {
    var eventEntry = document.createElement("li");
    var success;
    if (event.status) {
        success = event.status === "Success";
        console.log("STATUS:", event.status);
    } else {
        success = event.recovered;
    }
    var badge = createBadge(event.eventName, success);
    var panel = createPanel(event);
    eventEntry.appendChild(badge);
    eventEntry.appendChild(panel);
    return eventEntry;
}

function createBadge(eventName, success) {
    var mapping = {
        "chassisFight": "fa-chain-broken",
        "climb": "fa-arrow-circle-o-up",
        "gearplace": "fa-cogs",
        "pickup": "fa-download",
        "shooting": "fa-bullseye",
        "stuck": "fa-wheelchair"
    };

    var color = success ? "success" : "danger";
    var badge = document.createElement("div");
    badge.className = "timeline-badge " + color;
    var icon = document.createElement("span");
    // Get glyphicon based on the event type
    icon.className = "fa " + mapping[eventName];
    badge.appendChild(icon);
    return badge;
}

function createPanel(event) {
    var panel = document.createElement("div");
    panel.className = "timeline-panel";
    var panelHeading = createHeading(event);
    var panelBody = createBody(event);
    panel.appendChild(panelHeading);
    panel.appendChild(panelBody);
    return panel;
}

function createHeading(event) {
    var panelHeading = document.createElement("div");
    panelHeading.className = "timeline-heading";
    var h4 = document.createElement("h4");
    h4.className = "timeline-title";
    h4.textContent = getHeadingContent(event);
    panelHeading.appendChild(h4);
    return panelHeading;
}

function getHeadingContent(event) {
    return event.eventName;
}


function createBody(event) {
    var panelBody = document.createElement("div");
    panelBody.className = "timeline-body";
    var p = document.createElement("p");
    p.textContent = getBodyContent(event);
    panelBody.appendChild(p);
    return panelBody;
}


function getBodyContent(event) {
    var timeTook = event.endTime - event.startTime;
    switch (event.eventName) {
        case "stuck":
            return "Stuck for " + timeTook + " Seconds. Due to " + event.reason;
        case "shooting":
            return "Attempted shooting from " + event.location + ". " + (event.failReason ? event.failReason : "Succeeded") + ". Time Took: " + timeTook;
        case "gearplace":
            return "Attempted placing gear on " + event.location + ". " (event.failReason ? event.failReason : "Succeeded") + ". Time Took: " + timeTook;
        case "climb":
            return "Attempted climbing. " + (event.failReason ? event.failReason : "Succeeded") + ". Time Took: " + timeTook;
        case "chassisFight":
            return (event.initiated ? "Initiated" : "Endured") + " fight against: " + event.enemyTeam + " with: " + event.alliedTeam + ". " +
                (event.failReason ? event.failReason : "Succeeded") + ". Time Took: " + timeTook;
        case "pickup":
            return "Attempted Picking up " + event.type + " from " + event.location + ". " + (event.failReason ? event.failReason : "Succeeded") + ". Time Took: " + timeTook;
        default:
            return "No description could be provided";
    }
}
