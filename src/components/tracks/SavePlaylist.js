import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

export class SavePlaylist extends Component {
  state = {
    playlistTitle: 'New Swolify Playlist',
    user: this.props.user
  };

  savePlaylist = () => {
    const uriArr = this.props.track_list.map(track => {
      return track.uri;
    });

    spotifyWebApi.createPlaylist(
      this.state.user.id,
      {
        name: this.state.playlistTitle,
        description: 'Playlist created with SWOLEIFY'
      },
      function(err, res) {
        if (err) {
          console.error('Error: ', err);
        } else {
          spotifyWebApi.addTracksToPlaylist(res.id, uriArr, function(err, res) {
            if (err) {
              console.error('Error: ', err);
            } else {
              console.log('Playlist Created!');
            }
          });
        }
      }
    );
  };

  render() {
    return (
      <div className='container'>
        <h3 className='text-center mt-4'>
          <button
            className='btn btn-primary'
            style={{ margin: '0 auto 0 auto' }}
            onClick={this.savePlaylist}
          >
            <i className='far fa-save'></i> Save Playlist
          </button>
        </h3>
      </div>
    );
  }
}

export default SavePlaylist;
