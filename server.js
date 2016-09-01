var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dbConfig = require('./config/db.js');
var secretConfig = require('./config/secret.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(expressSession({secret: secretConfig.secretKey, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

var mongoose = require('mongoose');
var UserModel = require('./app/models/UserModel.js');

mongoose.connect(dbConfig.url, function(err) {
    if(err) {
        console.log('mongo connection error', err);
    } else {
        console.log('mongo connection successful');
    }
});

var usersRoute = require('./app/routes/users');
var boardsRoute = require('./app/routes/boards');
var postsRoute = require('./app/routes/posts');
var loginRoute = require('./app/routes/login');

app.use('/users', usersRoute);
app.use('/boards', boardsRoute);
app.use('/posts', postsRoute);
app.use('/auth', loginRoute);


passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'   
    },
    function verify(username, password, done) {
      UserModel.findOne({"username":username}, function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false);
            if(password===user.password){
				return done(null, user);
            }else{
            	return done(null, false);
            }
        });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  UserModel.findById(id, function(err, user) {
    done(err, user);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err);
    res.json(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.json({
      "error": "error occured"
    });
});


app.listen(3000);
console.log("Server running");
