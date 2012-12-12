// comment schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    body: {type : String, default : ''}
  , _user: {type : ObjectId, ref : 'User'}
  , createdAt: {type : Date, default : Date.now}
  , user: {}
})

mongoose.model('Comment', CommentSchema)