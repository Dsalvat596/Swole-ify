import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

export class SavePlaylist extends Component {
  state = {
    playlistTitle: 'New Swolify Playlist',
    user: this.props.user
  };

  handleTitleInput = e => this.setState({ [e.target.name]: e.target.value });

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
      <div className='container save-div'>
        <h3 className='text-center mt-4'>
          <input
            type='text'
            name='playlistTitle'
            className='form-control'
            placeholder='please enter a name for your playlist'
            aria-label='playlistTitle'
            style={{ marginBottom: '5px' }}
            onChange={this.handleTitleInput}
          />
          <button
            className='btn btn-warning'
            style={{ margin: '0 auto 0 auto', width: '100%' }}
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
