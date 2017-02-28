function tag(spec, type) {
    console.log("Tagging spec: " + JSON.stringify(spec) + ", type: " + type);
    if (!spec) {
        return;
    }
    console.log(spec);
    var query = preProcess(spec);
    var a = $(query);
    console.log(a);
    var mapping = {
        "done": "fa-check-circle badge-done",
        "important": "fa-bullseye badge-important",
        "unwanted": "fa-asterisk badge-unwanted"
    };
    a.prepend('<i class="fa fa-5x ' + mapping[type] + '"></i>');
}

function preProcess(raw) {
    raw.map(function(a) {
        if (typeof a.games == "string") {
            a.games = [a.games];
        }
    });
    return raw.map(a => a.games.map(g => "#" + g + "_" + a.teamNumber).join(", ")).join(", ");
}
