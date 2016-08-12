var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var UserModel = new mongoose.Schema({
  _id:  {type:ObjectIdSchema, default: function () { return new ObjectId()} },
  name: String,
  email: String,
  username: String,
  password: String,
  role: String,
  boards: [{type: ObjectIdSchema, ref: 'Board'}],
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserModel);
