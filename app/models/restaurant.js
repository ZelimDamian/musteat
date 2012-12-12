// Article schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema


var getTags = function (tags) {
  return tags.join(',')
}

var setTags = function (tags) {
  return tags.split(',')
}


var RestaurantSchema = new Schema({
    name: {type : String, default : '', trim : true}
  , description: {type : String, default : '', trim : true}
  , user: {type : Schema.ObjectId, ref : 'User'}
  , comments: [{type : Schema.ObjectId, ref : 'Comment'}]
  , dishes: [{type : Schema.ObjectId, ref : 'Dish'}]
  , tags: {type: [], get: getTags, set: setTags}
  , categories: []
  , createdAt  : {type : Date, default : Date.now}
})

RestaurantSchema.path('name').validate(function (name) {
  return name.length > 0
}, 'Пожалуйста, введите название ресторана.')

RestaurantSchema.path('description').validate(function (description) {
  return description.length > 0
}, 'Поажалуйста, введите описание ресторана.')

mongoose.model('Restaurant', RestaurantSchema)
