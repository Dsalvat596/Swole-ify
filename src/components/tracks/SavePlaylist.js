import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import { Modal, Button } from 'react-bootstrap';
import { Consumer } from '../../context';

const spotifyWebApi = new Spotify();

export class SavePlaylist extends Component {
  state = {
    playlistTitle: '',
    user: this.props.user,
    showModal: false,
    playlistUrl: ''
  };

  handleTitleInput = e => this.setState({ [e.target.name]: e.target.value });

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = (dispatch, e) => {
    dispatch({
      type: 'CLEAR_TRACKLIST'
    });
    this.setState({ showModal: false });
  };
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
          that.setState({ playlistUrl: res.external_urls.spotify });
          spotifyWebApi.addTracksToPlaylist(res.id, uriArr, function(err, res) {
            if (err) {
              console.error('Error: ', err);
            } else {
              that.handleShow();
            }
          });
        }
      }
    );
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
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
                <Modal
                  show={this.state.showModal}
                  size='sm'
                  aria-labelledby='contained-modal-title-vcenter'
                  centered
                >
                  <Modal.Body>
                    <h4>Conglaturation!</h4>
                    <p>
                      Your playlist: <strong>{this.state.playlistTitle}</strong>{' '}
                      has been created, check your Spotify Playlists! Click OKAY
                      to start over and make another playlist!
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant='outline-success'
                      onClick={this.handleClose.bind(this, dispatch)}
                    >
                      OKAY
                    </Button>
                    <Button
                      variant='outline-warning'
                      href={this.state.playlistUrl}
                      target='_blank'
                    >
                      Go To Playlist
                    </Button>
                  </Modal.Footer>
                </Modal>
              </h3>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default SavePlaylist;
