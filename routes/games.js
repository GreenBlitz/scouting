var express = require('express');
var router = express.Router();

/* GET games page. */
router.get('/games', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;