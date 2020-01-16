import axios from 'axios';
import Genre from './Genre.jsx';
import TopSongs from './TopSongs.jsx';
import RelatedGenres from './RelatedGenres.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: [],
      selected: null,
      audio: null,
      added: false,
      favorites: false,
      related: false
    }
    this.handleGenreClick = this.handleGenreClick.bind(this);
    this.handleSongClick = this.handleSongClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleArtistClick = this.handleArtistClick.bind(this);
    this.handleFavoritesClick = this.handleFavoritesClick.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
  };

  handleGenreClick(event) {
    var genre = event.target.value;
    axios.get('/music/' + genre)
    .then(results => {
      this.setState({
        display: results.data,
        selected: genre
      })
    })
    .catch(err => err);
  };

  handleSongClick(event) {
    if(this.state.audio) {
      this.state.audio.pause();
    }
    var songAudio = new Audio(event.target.value);
    this.setState({
      audio: songAudio
    })
    songAudio.play();
  };

  handleHomeClick() {
    if(this.state.audio) {
      this.state.audio.pause();
    };

    axios.get('/genres')
    .then(results => {
      this.setState({
        display: results.data,
        selected: null,
        audio: null,
        favorites: false,
        related: false
      })
    })
    .catch(err => err)
  };

  handleFavoritesClick() {
    if(this.state.audio) {
      this.state.audio.pause();
    };
    axios.get('/favorites/1')
    .then(results => {
      let genres = [];
      results.data.forEach(listing => genres.push(listing.genre));

      this.setState({
        display: genres,
        selected: false,
        audio: null,
        added: false,
        favorites: true,
        related: false
      })
    })
    .catch(err => err)
  };

  handleArtistClick(event) {
    axios.get('/artists/' + event.target.value)
    .then(results => {
      this.setState({
        related: results.data
      })
    })
    .catch(err => err)
  };

  addToFavorites(event) {
    axios.post('/genre/' + event.target.value + '/1')
    .then((res) => {
      this.setState({
        added: true
      })
    })
    .catch(err => err)
  };

  randomColor() {
    let colors = ['#f037a5', '#a5f037', '#37a5f0', '#df37f0', '#37f0df', '#49f037'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  componentDidMount() {
    axios.get('/genres')
    .then(results => {
      this.setState({
        display: results.data
      })
    })
    .catch(err => err)
  };

  render() {
    if(this.state.selected) {
      // preview genre and related genres
      return (
        <div class='song-list'>
          <button onClick={this.handleHomeClick}>Home &nbsp;</button>
          <button onClick={this.handleFavoritesClick}>My Favorites</button><br/>
          <TopSongs songs={this.state.display} genre={this.state.selected} handleClick={this.handleSongClick} handleArtistClick={this.handleArtistClick} addGenre={this.addToFavorites} added={this.state.added} randomColor={this.randomColor}/>
          {this.state.related ? <RelatedGenres related={this.state.related} randomColor={this.randomColor}/> : <div></div>}
        </div>
      )
    }
    else if(this.state.display) {
      return (
        <div class='genre-list'>
          {this.state.favorites
            ? <button onClick={this.handleHomeClick} randomColor={this.randomColor}>Home &nbsp;</button>
            : <button onClick={this.handleFavoritesClick} randomColor={this.randomColor}>My Favorites</button>}<br/><br/>
            <Genre genres={this.state.display} handleClick={this.handleGenreClick} randomColor={this.randomColor} />
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

ReactDOM.render(<App />, document.getElementById('App'));