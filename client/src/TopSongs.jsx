import React from 'react';

const TopSongs = (props) => {
  return (
    <div>
      {props.songs.map(song => {
        if(song.preview_url) {
          return <div><button value={song.preview_url} style={{color: props.randomColor()}} onClick={props.handleClick}>{song.name}</button>
          <br/>
          {song.artists.map(artist => <button className='artist' value={artist.id} style={{color: props.randomColor()}} onClick={props.handleArtistClick}>{artist.name} </button>)}</div>
        }
      })}
      <div>
      <br/>
        {props.added
        ? <span>Added!</span>
        : <span>Add <button value={props.genre} style={{color: props.randomColor()}} onClick={props.addGenre}>{props.genre}</button> to favorites</span>}
      </div>
    </div>
  )
};

export default TopSongs;