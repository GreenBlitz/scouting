var express = require('express');
var es = require('elasticsearch');
var client = require('../connection.js')
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	// var body = req.body;
	var blueTeam = [1,2,3];
	var redTeam = [4,5,6];

	res.sendStatus(200);
});

module.exports = router;
