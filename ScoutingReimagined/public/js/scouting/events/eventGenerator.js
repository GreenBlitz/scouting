var generatedTeleopEvents = false;

function generateEvent(generator, name, color){
    console.log("event" + String(generator));
    var elem = document.getElementById("scouterButtons");
    elem.innerHTML = 
    '<div class="col-sm-2">\n' +
        '<button id="' + name + '" class="btn btn-info btn-block btn-rounded hidden" style="height: 10vh; font-size: xx-large; color:' + color + '" onclick="' + generator.name + '()">' + name + '</button>\n' +
    '</div>\n' + elem.innerHTML;
}

function getRelevantEvents(){
    if (gameVideo.currentTime - autonomousStartTime <= 15){
        return getAutonomusEvents();
    }else if (gameVideo.currentTime - autonomousStartTime > 15){
        if (!generatedTeleopEvents){
            generatedTeleopEvents = true;
            generateAllEvents();
        }
        return getTeleopEvents();
    }
}

function generateAllEvents(){
    var events = getRelevantEvents();

    for (var i in events){
        generateEvent(events[i][0], events[i][1], events[i][2]);
    }
}

function getButtonNames(){
    var events = getRelevantEvents();
    var ret = [];

    for (var i in events){
        ret.push(events[i][1]);
    }
    ret.push('comment');

    return ret;
}

function getButtonClickEvents(){
    var retVal = {};
    var index = 1;

    var events = getRelevantEvents();

    for (var elem in events){
        retVal[index] = events[elem][0];
        index += 1;
    }
    retVal[index] = comment_start; // Comments are special, so hard coded

    return retVal;
}

function getAutonomusEvents(){
    var events = [];

    // -------------------------------------
    // Add your autonomusEvents here:
    events.push([teleEventGenerator, "tele", "black"]);
    events.push([autonomusPowerCellGenerator, "auto_cell", "orange"]);
    // -------------------------------------

    return events;
}

function getTeleopEvents(){
    var events = [];

    // -------------------------------------
    // Add your Teleopevents here:
    events.push([autoEventGenerator, "auto", "black"]);
    events.push([afterGameEventGenerator, "afterGame", "green"]);
    events.push([climb2020Generator, "climb", "hotpink"]);
    events.push([powerCellEventGenerator, "tele_cell", "orange"]);
    // -------------------------------------

    return events;
}

// --------------------------------------
// Add your generators here (as functions):

function teleEventGenerator(){
    var refreshEvent = new GenericEvent("refresh");
    refreshEvent.start();
}

function autoEventGenerator(){
    var refreshEvent = new GenericEvent("refresh");
    refreshEvent.start();
}


function autonomusPowerCellGenerator(){
    autonomusPowerCellEvent = new GenericEvent("autoCell");
    autonomusPowerCellEvent.addSpecialParam("pickupLocation", ["Picked up", "Starting balls"],
    function(){
        alert("Where the PCs from?");
    } 
    , null);
    autonomusPowerCellEvent.addSpecialParam("Height", ["Low", "High"],
    function(){
        alert("Height of shooting");
    }
    , null);

    autonomusPowerCellEvent.addSpecialParam("PowerCellShot", ["1", "2", "3", "4", "5"],
    function(){
        alert("Amount of PC shooting");

    }/*,
    function(){
        var ls
        if (this == "1"){
            ls = ["0", "1"];
        }
        else if (this == "2"){
            ls = ["0", "1", "2"];
        }
        else if (this == "3"){
            ls = ["0", "1", "2", "3"];
        }
        else if (autonomusPowerCellEvent["PowerCellShot"] == "4"){
            ls = ["0", "1", "2", "3", "4"];
        }
        else if (autonomusPowerCellEvent["PowerCellShot"] == "5"){
            ls = ["0", "1", "2", "3", "4", "5"];
        }
        alert(ls);

        return ls;
    }*/
    , null);

    autonomusPowerCellEvent.addSkipableSpecialParam("3PointSuccess", ["0", "1", "2", "3", "4", "5"],
    function(){
        alert("3PointSuccess");
    }
    ,function(self){
        return self["Height"] != "High";
    }
    , null);
    autonomusPowerCellEvent.addSkipableSpecialParam("2PointSuccess", ["0", "1", "2", "3", "4", "5"], 
    function(){
        alert("2PointSuccess");
    }
    ,function(self){
        return self["Height"] != "High";
    }
    , null);
    autonomusPowerCellEvent.addSkipableSpecialParam("1PointSuccess", ["0", "1", "2", "3", "4", "5"], 
    function(){
        alert("1PointSuccess");
    }
    ,function(self){
        return self["Height"] !="Low";
    }
    , null);
    autonomusPowerCellEvent.start();
}


function powerCellEventGenerator(){
    powerCellEvent = new GenericEvent("PowerCells");
    powerCellEvent.addSpecialParam("PowerCellShot", ["1", "2", "3", "4", "5"],
    function(){
        alert("Amount of PC shooting");
    }
    , null);
    powerCellEvent.addParam("Height", ["Low", "High"], null);
    powerCellEvent.addSkipableSpecialParam("3PointSuccess", ["0", "1", "2", "3", "4", "5"],
    function(){
        alert("3PointSuccess");
    }
    ,function(self){
        return self["Height"] != "High";
    }
    , null);
    powerCellEvent.addSkipableSpecialParam("2PointSuccess", ["0", "1", "2", "3", "4", "5"], 
    function(){
        alert("2PointSuccess");
    }
    ,function(self){
        return self["Height"] != "High";
    }
    , null);
    powerCellEvent.addSkipableSpecialParam("1PointSuccess", ["0", "1", "2", "3", "4", "5"], 
    function(){
        alert("1PointSuccess");
    }
    ,function(self){
        return self["Height"] !="Low";
    }
    , null);
    powerCellEvent.start();
}


function climb2020Generator(){
    climbEvent = new GenericEvent("Climb");
    climbEvent.addParam("When", ["1st", "2nd", '3rd'],null);
    climbEvent.addParam("status", ["Success", "Fail"], null);
    climbEvent.addParam("Balanced", ["Balanced", "UnBalanced"],
    function(prev){
        return prev !== "Success";
    });
    climbEvent.start();
}


function afterGameEventGenerator(){
    var afterGameEvent = new GenericEvent("Finish");

    // Was the robot attacked or was attacked during the match

    afterGameEvent.addParam("defense", ['attacked', 'nope'], null);

    // Did the robot shutdown during the match

    afterGameEvent.addParam("shutdown", ['shutdown', 'nope'], null);
    
    // Did the robot lifted other robot during the endGame

    afterGameEvent.addParam("lifted", ['lift 0', 'lift 1', 'lift 2'], null);

    afterGameEvent.addParam("fortune wheel", ['no can do', 'rotation control', 'position control', 'both'], null);

    afterGameEvent.start();
}