const express = require('express');
const axios = require('axios');
const db = require('./database/index.js');
const header = require('./config.js');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/genres', (req, res) => {
  axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', header)
  .then(results => {
    res.send(results.data.genres);
  })
  .catch(err => {
    console.log('err')
  })
});

app.get('/music/:genre', (req, res) => {
  let url = 'https://api.spotify.com/v1/recommendations?seed_genres=' + req.params.genre;
  axios.get(url, header)
  .then(results => {
    res.send(results.data.tracks)
  })
  .catch(err => {
    res.sendStatus(404);
  })
})

app.get('/artists/:id', (req, res) => {
  let url = 'https://api.spotify.com/v1/artists/' + req.params.id;
  axios.get(url, header)
  .then(results => {
    res.send(results.data.genres)
  })
  .catch(err => {
    res.sendStatus(404);
  })
});

app.get('/favorites/:user', (req, res) => {
  db.getFavorites(req.params.user)
  .then(results => {
    res.send(results);
  })
  .catch(err => err)
})

app.post('/genre/:genre/:user', (req, res) => {
// add genre to database
  db.addGenre({
    user_id: req.params.user,
    genre: req.params.genre
  })
  .then(() => {
    res.sendStatus(201);
  })
  .catch(err => err)
});

app.listen(process.env.port || 3001, () => {
  console.log('Listening on port 3001')
})

