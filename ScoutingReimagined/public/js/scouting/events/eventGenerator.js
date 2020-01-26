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
    events.push([refreshEventGenerator, "refresh", "black"]);
    events.push([autonomusPowerCellGenerator, "auto_cell", "orange"]);
    // -------------------------------------

    return events;
}

function getTeleopEvents(){
    var events = [];

    // -------------------------------------
    // Add your Teleopevents here:
    events.push([refreshEventGenerator, "refresh", "black"]);
    events.push([afterGameEventGenerator, "afterGame", "green"]);
    events.push([climb2020Generator, "climb", "hotpink"]);
    events.push([powerCellEventGenerator, "tele_cell", "orange"]);
    // -------------------------------------

    return events;
}

// --------------------------------------
// Add your generators here (as functions):

/*function startingEventGenerator(){
    startingEvent = new GenericEvent("start");
    startingEvent.addParam("started", ["1", "2"], null);
    startingEvent.addParam("when", ["auto", "non-auto"], null);
    startingEvent.start();
}

function climbGenerator(){
    climbEvent = new GenericEvent("climb");
    climbEvent.addParam("level", ["0 or 1", "2", "3"], null);
    climbEvent.addParam("status", ["Success", ["Timeout", "Mechanical Fail", "Driver Fail"]], null);
    climbEvent.start();
}

function cycleGenerator(){
    cycleEvent = new GenericEvent("cycle");
    cycleEvent.addParam("gamePiece", ["Cargo", "Hatch"], null);
    cycleEvent.addParam("pickupLocation", ["Floor", "Feeder"], null);
    cycleEvent.addSpecialParam("pickupStatus", ["Success", ["Driver Fail", "Mechanical Fail", "Interrupted"]], 
    function(self){
        self.timeTookPickup = Math.round(gameVideo.currentTime - self.startTime);
    }
    , null);
    cycleEvent.addSpecialParam("placeLocation", ["Cargo", ["Rocket Low", "Rocket Mid", "Rocket High"]], 
    function(self){
        self.placeStartTime = Math.round(gameVideo.currentTime - autonomousStartTime);
    },
    function(prev){
        return prev !== "Success";
    }
    );
    cycleEvent.addSpecialParam("placeStatus", ["Success", ["Driver Fail", "Mechanical Fail", "Interrupted"]], 
    function(self){
        self.timeTookPlace = Math.round(gameVideo.currentTime - self.placeStartTime);
    }
    , null);
    cycleEvent.start();
}*/

function autonomusCargoGenerator(){
    autonomusCargoEvent = new GenericEvent("Cargo")
    autonomusCargoEvent.addParam("pickupLocation", ["Floor", "Feeder", "Started with it"], null);
    autonomusCargoEvent.addSpecialParam("pickupStatus", ["Success", ["Driver Fail", "Mechanical Fail"]], 
    function(self){
        self.timeTookPickup = Math.round(gameVideo.currentTime - self.startTime);
    }
    , null);
    autonomusCargoEvent.addSpecialParam("placeLocation", ["Cargo", ["Rocket Low", "Rocket Mid", "Rocket High"]], 
    function(self){
        self.placeStartTime = Math.round(gameVideo.currentTime - autonomousStartTime);
    },
    function(prev){
        return prev !== "Success";
    }
    );
    autonomusCargoEvent.addSpecialParam("placeStatus", ["Success", ["Driver Fail", "Mechanical Fail"]], 
    function(self){
        self.timeTookPlace = Math.round(gameVideo.currentTime - self.placeStartTime);
    }
    , null);
    autonomusCargoEvent.start();
}

function autonomusHatchGenerator(){
    autonomusHatchEvent = new GenericEvent("hatch")
    autonomusHatchEvent.addParam("pickupLocation", ["Floor", "Feeder", "Started with it"], null);
    autonomusHatchEvent.addSpecialParam("pickupStatus", ["Success", ["Driver Fail", "Mechanical Fail"]], 
    function(self){
        self.timeTookPickup = Math.round(gameVideo.currentTime - self.startTime);
    }
    , null);
    autonomusHatchEvent.addSpecialParam("placeLocation", ["Cargo", ["Rocket Low", "Rocket Mid", "Rocket High"]], 
    function(self){
        self.placeStartTime = Math.round(gameVideo.currentTime - autonomousStartTime);
    },
    function(prev){
        return prev !== "Success";
    }
    );
    autonomusHatchEvent.addSpecialParam("placeStatus", ["Success", ["Driver Fail", "Mechanical Fail"]], 
    function(self){
        self.timeTookPlace = Math.round(gameVideo.currentTime - self.placeStartTime);
    }
    , null);
    autonomusHatchEvent.start();
}

function cargoEventGenerator(){
    cargoEvent = new GenericEvent("teleop_cargo");
    cargoEvent.addParam("Height", ["High", "Low"], null);
    cargoEvent.addParam("placeStatus", ["Success", ["Driver Fail", "Mechanical Fail"]], null);
    cargoEvent.start();
}

function hatchEventGenerator(){
    hatchEvent = new GenericEvent("teleop_hatch");
    hatchEvent.addParam("Height", ["High", "Low"], null);
    hatchEvent.addParam("placeStatus", ["Success", ["Driver Fail", "Mechanical Fail"]], null);
    hatchEvent.start();
}

function refreshEventGenerator(){
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
    } 
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
    climbEvent.addSpecialParam("When", ["1st", "2nd"], 
    function(self){
        self.climbStart = Math.round(gameVideo.currentTime - autonomousStartTime);
    }
    ,null);
    climbEvent.addParam("status", ["Success", "Fail"], null);
    climbEvent.addSpecialParam("Balanced", ["Balanced", "UnBalanced"],
    function(self){
        self.climbTime = Math.round(gameVideo.currentTime- self.climbStart);
        alert(self.climbTime);
    },
    function(prev){
        return prev !== "Success";
    });
    climbEvent.start();
}

function afterGameEventGenerator(){
    var afterGameEvent = new GenericEvent("Finish");

    // Places the robot can shoot from
    afterGameEvent.addSpecialParam("placeCount", [['Zero', 'One'], ['Two', 'All']],
    function(){
        alert("Amount of places robot can shoot from");
    } 
    , null);

    afterGameEvent.addSkipableParam("shootPlace1", ['Wall', 'Trench', 'Other'],
    function(self){
        return self["placeCount"] != 'One';
    }
    , null);

    afterGameEvent.addSkipableParam("shootPlace2", ['Wall+Trench', 'Trench+Other', 'Other+Wall'],
    function(self){
        return self["placeCount"] != 'Two';
    }
    , null);

    // main shooting place

    afterGameEvent.addSkipableSpecialParam("mainShootLocation", [['None', 'Wall'], ['Trench', 'Other']],
    function(){
        alert("Choose main shooting location");
    },
    function(self){
        return self['placeCount'] == 'Zero' || self['placeCount'] == 'One';
    }
    , null);

    // Places the robot can pick PCs from

    afterGameEvent.addSpecialParam("pickUpPlaces", [['None', 'Feeder'], ['Floor', 'Both']],
    function(){
        alert("Choose pickUp locations");
    }, null);

    // Main PCs pickup place

    afterGameEvent.addSkipableSpecialParam("mainPickUp", ['None', 'Feeder', 'Floor'], 
    function(){
        alert("Choose main pickUp location");
    },
    function(prev){
        return prev != 'Both';
    }
    , null);

    // Was the robot attacked or was attacked during the match

    afterGameEvent.addParam("defense", ['attacked', 'was attacked'], null);

    // Did the robot shutdown during the match

    afterGameEvent.addParam("shutdown", ['shutdown', 'nope'], null);
    
    // Did the robot lifted other robot during the endGame

    afterGameEvent.addParam("lifted", ['lift 0', 'lift 1', 'lift 2'], null);

    afterGameEvent.start();
}