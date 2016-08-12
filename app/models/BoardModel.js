var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var BoardModel = new mongoose.Schema({
  _id: {type:ObjectIdSchema, default: function () { return new ObjectId()} },
  title: String,
  user: {type: ObjectIdSchema, ref: 'User'},
  posts: [{type: ObjectIdSchema, ref: 'Post'}],
  isPublic: Boolean,
  allowedPosts: Number,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Board', BoardModel);
