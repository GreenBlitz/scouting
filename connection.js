var es = require('elasticsearch');

var client = new es.Client({
    host: 'https://elastic:greenblitz@localhost:9200',
    log: 'trace'
});

module.exports = client;
