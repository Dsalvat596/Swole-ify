import React, { Component } from 'react';
import Track from '../tracks/Track';
import { Consumer } from '../../context';

export class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          console.log(value);
          const { heading, track_list } = value;
          if (track_list === undefined || track_list.length === 0) {
            return <div></div>;
          } else {
            return (
              <React.Fragment>
                <div className='mb-4 p-4 mx-5'>
                  <h3 className='text-center mb-4'>{heading}</h3>
                  <div className='row'>
                    {track_list.map(item => {
                      return <Track key={item.id} track={item} />;
                    })}
                  </div>
                  <h3 className='text-center mt-4'>
                    <button
                      className='btn btn-success'
                      style={{ width: '40%', margin: '0 auto 0 auto' }}
                    >
                      <i className='far fa-save'></i> Save Playlist
                    </button>
                  </h3>
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Tracks;
