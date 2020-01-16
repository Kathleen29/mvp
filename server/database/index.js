var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mvp_db');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var dbSchema = mongoose.Schema({
  user_id: Number,
  genre: String
});

var Genres = mongoose.model('Genres', dbSchema);

var addGenre = (genre) => {
  return Genres.create(genre)
  .then((results) => {
    return results;
  })
  .catch((err) => {
    return err;
  })
};

var getFavorites = (userId) => {
  return Genres.find({user_id: userId}).select('genre')
  .then((results) => {
    return results;
  })
  .catch((err) => {
    return err;
  })
};

module.exports = {
  addGenre,
  getFavorites
};
