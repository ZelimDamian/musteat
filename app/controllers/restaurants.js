
var mongoose = require('mongoose')
  , Restaurant = mongoose.model('Restaurant')
  , _ = require('underscore')

// New restaurant
exports.new = function(req, res){
  res.render('restaurants/new', {
      title: 'Новый ресторан'
    , restaurant: new Restaurant({})
  })
}


// Create an restaurant
exports.create = function (req, res) {
  var restaurant = new restaurant(req.body)
  restaurant.user = req.user

  restaurant.save(function(err){
    if (err) {
      res.render('restaurants/new', {
          title: 'Новый ресторан'
        , restaurant: restaurant
        , errors: err.errors
      })
    }
    else {
      res.redirect('/restaurants/'+restaurant._id)
    }
  })
}


// Edit an restaurant
exports.edit = function (req, res) {
  res.render('restaurants/edit', {
    title: 'Edit '+req.restaurant.title,
    restaurant: req.restaurant
  })
}


// Update restaurant
exports.update = function(req, res){
  var restaurant = req.restaurant

  restaurant = _.extend(restaurant, req.body)

  restaurant.save(function(err, doc) {
    if (err) {
      res.render('restaurants/edit', {
          title: 'Редактировать ресторан'
        , restaurant: restaurant
        , errors: err.errors
      })
    }
    else {
      res.redirect('/restaurants/'+restaurant._id)
    }
  })
}


// View an restaurant
exports.show = function(req, res){
  res.render('restaurant/show', {
    title: req.restaurant.title,
    restaurant: req.restaurant,
    comments: req.comments
  })
}


// Delete an restaurant
exports.destroy = function(req, res){
  var restaurant = req.restaurant
  restaurant.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.redirect('/restaurants')
  })
}


// Listing of restaurants
exports.index = function(req, res){
  var perPage = 5
    , page = req.param('page') > 0 ? req.param('page') : 0

  restaurant
    .find({})
    .populate('user', 'name')
    .sort({'createdAt': -1}) // sort by date
    .limit(perPage)
    .skip(perPage * page)
    .exec(function(err, restaurants) {
      if (err) return res.render('500')
      restaurant.count().exec(function (err, count) {
        res.render('restaurants/index', {
            title: 'List of restaurants'
          , restaurants: restaurants
          , page: page
          , pages: count / perPage
        })
      })
    })
}

