var express = require('express');
var router = express.Router();
var passport = require('passport');
var expressSession = require('express-session');
var UserModel = require('../models/UserModel.js');

router.post('/login', function handleLocalAuthentication(req, res, next) {

    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);
        if (!user) {
            return res.json(403, {
                message: "no user found"
            });
        }

        req.login(user, function(err) {
            if (err) return next(err);
            return res.json(user);
        });
    })(req, res, next);
});

router.get('/loggedUser', function (req, res, next) {
    console.log(req);
    if(req.user){
    	 res.json(req.user);
    }else{
    	 res.statusCode = 403;
    	 res.send({message: "user not logged in"});
    }
});

router.post('/logout', function (req, res, next) {
    req.logOut();
    res.statusCode = 200;
    res.send();
});

module.exports = router;



/*router.post('/login', function (req, res, next) {
  var username= req.body.username;
  var password= req.body.password;
  UserModel.findOne({'username':username}, function(err, user) {
    if (err) return next(err);
    if(!user || user.password!=password) {
       res.statusCode = 403;
       res.send();
    }
    res.statusCode = 200;
    res.json(user);
  });
});*/
