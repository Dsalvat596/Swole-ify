import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

export class SavePlaylist extends Component {
  state = {
    playlistTitle: '',
    user: this.props.user
  };

  handleTitleInput = e => this.setState({ [e.target.name]: e.target.value });

  savePlaylist = () => {
    const uriArr = this.props.track_list.map(track => {
      return track.uri;
    });

    const that = this;

    spotifyWebApi.createPlaylist(
      this.state.user.id,
      {
        name:
          this.state.playlistTitle !== ''
            ? this.state.playlistTitle
            : 'New SWOLEIFY Playlist',
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
              that.setState({ playlistTitle: '' });
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
            value={this.state.playlistTitle}
            aria-label='playlistTitle'
            style={{ marginBottom: '5px' }}
            onChange={this.handleTitleInput}
          />
          <button
            type='submit'
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
