var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var gameId = req.query.gameId;
    var teamNumber = req.query.teamNumber;
    res.render('game', {teamNumber: teamNumber, gameId: gameId});
});

module.exports = router;
