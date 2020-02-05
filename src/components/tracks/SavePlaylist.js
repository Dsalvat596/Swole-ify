import React, { Component } from 'react';

export class SavePlaylist extends Component {
  state = {
    playlistTitle: 'New Playlist',
    track_list: this.props.track_list
  };
  render() {
    return (
      <div className='container'>
        <h3 className='text-center mt-4'>
          <button
            className='btn btn-primary'
            style={{ margin: '0 auto 0 auto' }}
          >
            <i className='far fa-save'></i> Save Playlist
          </button>
        </h3>
      </div>
    );
  }
}

export default SavePlaylist;
