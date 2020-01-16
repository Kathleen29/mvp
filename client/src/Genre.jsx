import React from 'react';

const Genre = (props) => {
  return (
    <div>
    {props.genres.map(genre =>
      <button key={genre} value={genre} style={{color: props.randomColor()}} onClick={props.handleClick}> {genre} |</button>
    )}
    </div>
  )
}

export default Genre;