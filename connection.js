var es = require('elasticsearch');

var client = new es.Client({
    host: 'http://elastic:greenblitz@localhost:9200',
    log: 'trace'
});

module.exports = client;
