import React from 'react';

const RelatedGenres = (props) => {
  return (
    <div align='center' class='related'>
    <div>Related Genres:</div>
    {props.related.map(genre =>
      <button key={genre} value={genre} style={{color: props.randomColor()}}> {genre} |</button>
    )}
    </div>
  )
}

export default RelatedGenres;