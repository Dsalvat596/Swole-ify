import React from 'react';

const Track = props => {
  const { track } = props;
  // console.log(track);
  return (
    <div className='col-md-4'>
      <div
        className='card bg-light mb-2 shadow sm'
        style={{ maxHeight: '100%' }}
      >
        <img className='card-img-top' src={track.album.images[0].url} alt='' />
        <div className='card-body'>
          <h5>{track.artists[0].name}</h5>
          <p className='card-text' style={{ overflow: 'hidden' }}>
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
