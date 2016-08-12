var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel.js');

router.get('/list', function (req, res, next) {
  UserModel.find(function (err, docs) {
  	if (err) return next(err);
    console.log(docs);
    res.json(docs);
  });
});

router.get('/:userId', function (req, res, next) {
  var userId = req.params.userId;
  UserModel.findById(userId, function (err, user) {
    if (err) return next(err);
     if(user==undefined || user==null) {
        res.json("error could not find user");
     }else{
        res.json(user);
     }
  });
});

router.post('/', function (req, res, next) {
  var newUser = new UserModel({
	  name: req.body.name,
	  username: req.body.username,
	  password: req.body.password,
	  role:'user',
	  email:req.body.email 
	});
  newUser.save(function(err, doc) {
  	if (err) return next(err);
    res.statusCode = 200;
    res.send();
  });
});

router.put('/:userId', function (req, res, next) {
  var userId = req.params.userId;
  UserModel.findByIdAndUpdate(userId, 
  	{ 
  		name: req.body.name,
		  username: req.body.username,
		  password: req.body.password,
		  role:'user',
		  email:req.body.email 
	 }, 
  	function(err, doc){
  		if (err) return next(err);
    	res.statusCode = 200;
      res.send();
  	}
  );
});

router.delete('/:userId', function (req, res, next) {
  var userId = req.params.userId;
  UserModel.findByIdAndRemove(userId, function(err, doc) {
    if (err) throw err;
    console.log('User deleted!');
    res.statusCode = 200;
    res.send();
  });
});

module.exports = router;

