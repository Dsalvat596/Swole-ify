import React from 'react';

function GetSpotifyAuthToken(props) {
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = 'http://localhost:3000';
  const scopes = 'playlist-modify-public';

  const buttonText = !props.refresh ? 'Log in with Spotify' : props.refresh;

  return (
    <div className='container'>
      <a
        href={
          authEndpoint +
          '?response_type=token' +
          '&client_id=' +
          clientId +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' +
          encodeURIComponent(redirectUri)
        }
        className='btn btn-success btn-lg btn-block mb-5 mx-auto'
        style={{ maxWidth: '55%' }}
      >
        {buttonText}
      </a>
    </div>
  );
}

export default GetSpotifyAuthToken;
