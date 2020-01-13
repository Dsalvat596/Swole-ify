import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

export class Search extends Component {
  state = {
    genreSearch: '',
    bpm: ''
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { heading } = value;
          return (
            <div className='card card-body mb-4 p-4'>
              <h1 className='display-4 text-center'>
                <i className='fas fa-music'></i> {heading}
                <p className='lead text-center'>Choose your workout type</p>
                <div className='container'>
                  <div className='row'>
                    <div className='col-sm'>
                      <button className='btn btn-info'>Heavy Lifting</button>
                    </div>
                    <div className='col-sm'>
                      <button className='btn btn-secondary'>
                        Light Cardio
                      </button>
                    </div>
                    <div className='col-sm'>
                      <button className='btn btn-primary'>
                        Intense Cardio
                      </button>
                    </div>
                  </div>
                </div>
                <p className='lead text-center'>Select your genre of music</p>
                <form>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control form-control-lg'
                      placeholder='Genre name...'
                      name='genreSearch'
                      value={this.state.genreSearch}
                    />
                  </div>
                  <button
                    className='btn-dark btn-lg btn-block mb-5'
                    type='submit'
                  >
                    Get Some Songs!
                  </button>
                </form>
              </h1>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
