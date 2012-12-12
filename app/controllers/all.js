
var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , Dish = mongoose.model('Dish')
  , Comment = mongoose.model('Comment')
  
  exports.dropAll = function(req, res)
  {
    Article.remove({}).exec(function(err) {});
    Dish.remove({}).exec(function(err ) {});
    Comment.remove({}).exec(function(err) {});
    res.redirect('/');
  }