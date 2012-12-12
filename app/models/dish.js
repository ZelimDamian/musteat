// Dish schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var DishSchema = new Schema({
    name: {type : String, default : '', trim : true}
  , description: {type : String, default : '', trim : true}
  , _restaurant: {type : Schema.ObjectId, ref : 'Article'}
  , price : {type: Number, default : 0.0 }
  , comments: [{type : Schema.ObjectId, ref : 'Comment'}]
  , categories: []
  , createdAt  : {type : Date, default : Date.now}
  , type: {type: String, default: ''}
})

//DishSchema.path('name').validate(function (name) {
//  return name.length > 0
//}, 'Article title cannot be blank')
//
//DishSchema.path('description').validate(function (description) {
//  return description.length > 0
//}, 'Article body cannot be blank')

mongoose.model('Dish', DishSchema)
