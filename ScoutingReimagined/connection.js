var es = require('elasticsearch');

console.log("HELLO WORLD!");
var client = new es.Client({
    host: 'http://elasticsearch:9200',
    log: 'trace'
});

module.exports = client;
