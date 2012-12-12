// Article schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var getTags = function (tags) {
  return tags.join(',')
}

var setTags = function (tags) {
  return tags.split(',')
}

ObjectId = Schema.ObjectId;

var ArticleSchema = new Schema({
    name: {type : String, default : '', trim : true}
  , body: {type : String, default : '', trim : true}
  , user: {type : ObjectId, ref : 'User'}
  , comments: [{type : ObjectId, ref : 'Comment'}]
  , dishes: [{type : ObjectId, ref : 'Dish'}]
  , tags: {type: [], get: getTags, set: setTags}
  , categories: []
  , createdAt  : {type : Date, default : Date.now}
})

ArticleSchema.path('name').validate(function (name) {
  return name.length > 0;
}, 'Пожалуйта, введите название ресторана')

ArticleSchema.path('body').validate(function (body) {
  return body.length > 0;
}, 'Пожалуйта, введите описание ресторана')

mongoose.model('Article', ArticleSchema)
