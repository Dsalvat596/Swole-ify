import React from 'react';

const Track = props => {
  console.log(props);
  const { track } = props;
  return (
    <div className='col-md-6'>
      <div className='card mb-2 shadow sm'>
        <div className='card-body'>
          <h5>{track.artists[0].name}</h5>
          <p className='card-text'>
            <strong>
              <i className='fas fa-play'></i>Track
            </strong>
            : {track.name}
            <br />
            <strong>
              <i className='fas fa-compact-disc'></i>Album
            </strong>
            : {track.album.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Track;
