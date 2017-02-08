var client = require('./connection');

client.indices.exists({
    index: 'games'
}, function(err, exists) {
    if (!exists) {
        client.indices.create({
            index: 'games'
        }, function(err, res) {
            console.log("err", err);
            console.log("res", res);
        });
    }
});

// if (!0) {
//     client.indices.create('games');
// }
