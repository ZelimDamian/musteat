
var mongoose = require('mongoose')
  , Dish = mongoose.model('Dish')
  , _ = require('underscore')

// New article
exports.newdish = function(req, res){
  res.render('dishes/new', {
      title: 'Новое блюдо'
    , article: req.article
    , dish: new Dish({})
  })
}


// Create an article
exports.create = function (req, res) {
  var dish = new Dish(req.body)
  dish._restaurant = req.article
 dish.save(function(err)
  {
    if(err) throw new Error("Trouble when saving dish. comments.js" + err);
    req.article.dishes.push(dish._id);
    
    req.article.save(function()
      {
       res.redirect('/articles/'+req.article._id);
      }
      )              
  })
}
  
 

// Edit an article
exports.edit = function (req, res) {
  res.render('dishes/edit', {
    title: 'Редактировать блюдо: '+req.dish.name,
    dish: req.dish
  })
}


// Update article
exports.update = function(req, res){
  var dish = req.dish

  dish = _.extend(dish, req.body)

  dish.save(function(err, doc) {
    if (err) {
      res.render('dishes/edit', {
          title: 'Редактировать блюдо'
        , dish: dish
        , errors: err.errors
      })
    }
    else {
      res.redirect('/dishes/'+dish._id)
    }
  })
}


// View an article
exports.show = function(req, res){
  res.render('dishes/show', {
    title: req.dish.name,
    dish: req.dish
  })
}


// Delete an article
exports.destroy = function(req, res){
  var article = req.article
  article.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.redirect('/dishes')
  })
}