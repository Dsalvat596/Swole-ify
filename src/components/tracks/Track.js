import React from 'react';
import './Track.css';

const Track = props => {
  const { track } = props;
  // console.log(track);
  return (
    <div className='col-md-4'>
      <div className='track-card'>
        <img
          className='album-art-avatar'
          src={track.album.images[0].url}
          alt=''
        />
        <div className='track-card-body'>
          <h5>{track.artists[0].name}</h5>
          <p className='card-text'>
            <strong>Title</strong>: {track.name}
            <br />
            <strong>Album</strong>: {track.album.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Track;
