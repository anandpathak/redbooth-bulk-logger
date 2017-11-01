var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
    sessionStore = new session.MemoryStore();

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var config= require('./models/config.json');
//Setup Session
app.use(session({
    secret: config.session_secret,
    resave: false,
    store:sessionStore,
    saveUninitialized: false,
    cookie : {
       httpOnly: false,
       maxAge: 36000000,
       sameSite: false
    }
  }));

//Allow Cross-site Domain
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", config.front_end_url);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-requested-with");
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');



  next();
});

app.use('/', index);
app.use('/users', users);



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
