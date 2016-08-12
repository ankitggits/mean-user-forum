var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var PostModel = require('../models/PostModel.js');
var BoardModel = require('../models/BoardModel.js');

router.get('/list/:boardId', function(req, res, next) {
  var boardId = req.params.boardId;
  PostModel.find({'board':boardId},function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

router.get('/:postId', function(req, res, next) {
  var postId = req.params.postId;
  PostModel.findById(postId, function (err, board) {
    if (err) return next(err);
      if(board==undefined || board==null) {
    	res.json(400, {
                message: "Could not find post"
      });
      }else{
      	res.json(board);
      }
  });
});

router.post('/:boardId', function(req, res, next) {
  var boardId = req.params.boardId;
  BoardModel.findById(boardId, function (err, board) {
  	if (err) return next(err);
    if(board==undefined || board==null) {
    	res.json(400, {
                message: "Could not find board"
      });
    }else{
    	var post = new PostModel({
		  	content: req.body.content,
  			board: boardId,
		  });
    	board.posts.push(post);
      if(board.posts.length>board.allowedPosts){
          res.json(400, {
                  message: "Can not add more posts than admin defined limit"
          });
      }else{
        board.save(function(err, savedBoard) {
        if (err) return next(err);
        post.board = savedBoard;
        post.save(function(err, savedPost) {
          if (err) return next(err);
            res.statusCode = 200;
            res.send();
        });
      });
      }
    }   
  });  
});

router.put('/:postId', function (req, res, next) {
  var postId = req.params.postId;
  PostModel.findByIdAndUpdate(postId, 
  	 { 
  		content:req.body.content
	 }, 
  	function(err, updatedPost){
  		if (err) return next(err);
    	res.statusCode = 200;
    	res.send();
  	}
  );
});

router.delete('/:postId', function (req, res, next) {
	var postId = req.params.postId;
	PostModel.findByIdAndRemove(postId, function(err, updatedPost) {
	  if (err) throw err;
	  console.log('post deleted!');
	  BoardModel.findById(updatedPost.board,function(err,postHoldingBoard){
        if (err) return next(err);
        var index = postHoldingBoard.posts.indexOf(postId);
        if (index > -1) {
            postHoldingBoard.posts.splice(index, 1);
        } 
        postHoldingBoard.save(function(err, board) {
            if (err) return next(err);
            res.statusCode = 200;
    		res.send();
        });
	   });	  
	});
});

module.exports = router;