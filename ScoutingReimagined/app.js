var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  =   require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    if(file.fieldname == 'gameVideo') {
        callback(null, __dirname + '/public/games/');
    }
  },

  filename: function (req, file, callback) {
      var id = req.body.gameid;
      if(file.fieldname == 'gameVideo') {
          callback(null, id + ".mp4");
      }
  }
});
var upload = multer({ storage : storage}).fields([
    {
        name: 'gameVideo',
        maxCount:1
    }
]);

var index = require('./routes/index');
var games = require('./routes/games');
var users = require('./routes/users');
var game = require('./routes/game');
var uploadRouter = require('./routes/upload');
var setup = require('./setup');
setup.setup();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use('/', index);
app.use('/users', users);
app.use('/upload', uploadRouter.router);
app.use('/games', games);
app.use('/game', game);

// TODO: compare teams that wil play with and against you
// TODO: find the best team to choose at playoffs
app.post('/upload', upload, uploadRouter.handleUpload);

// Lower priority than routes
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
