function tag(spec, type) {
    console.log("hello");
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
    return raw.map(a => "#" + a.gameId + "_" + a.teamNumber)
        .join(", ");
}
