import React, { Component } from 'react';
import { Consumer } from '../../context';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Spotify from 'spotify-web-api-js';
import GetSpotifyAuthToken from '../layout/GetSpotifyAuthToken';

const spotify = new Spotify();

export class Search extends Component {
  animatedComponents = makeAnimated();

  state = {
    selectedGenres: [],
    bpmMin: '',
    bpmMax: '',
    genreOptions: [],
    tokenExpired: false
  };

  getPlaylist = (dispatch, e) => {
    e.preventDefault();
    let seeds = {
      limit: 20,
      seed_genres: this.state.selectedGenres,
      min_tempo: this.state.bpmMin,
      max_tempo: this.state.bpmMax
    };

    spotify
      .getRecommendations(seeds)
      .then(res => {
        dispatch({
          type: 'GET_TRACKS',
          payload: res.tracks
        });
      })
      .catch(err => console.error(err));
  };

  formatGenreForSelect(data) {
    let options = [];
    data.map(x => options.push({ value: x, label: x }));
    return options;
  }

  handleChange = genres => {
    if (genres && genres.length > 0) {
      this.setState({ selectedGenres: genres.map(genre => genre.value) });
    } else {
      this.setState({ selectedGenres: [] });
    }
  };
  componentDidMount() {
    spotify
      .getAvailableGenreSeeds()
      .then(res => {
        this.setState({ genreOptions: this.formatGenreForSelect(res.genres) });
      })
      .catch(err => {
        console.log('error:', err);
        if (err.status === 401) {
          this.setState({ tokenExpired: true });
        }
      });
  }
  render() {
    return (
      <Consumer>
        {value => {
          const { heading, dispatch } = value;
          if (!this.state.tokenExpired) {
            return (
              <div className='card card-body mb-4 p-4 mx-5'>
                <h1 className='display-4 text-center'>
                  <i className='fas fa-music'></i> Choose Your Destiny
                  <p className='lead text-center'>
                    <strong>Step 1: </strong>Choose your workout type
                  </p>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-sm'>
                        <button
                          className='btn btn-info'
                          onClick={() => {
                            this.setState({ bpmMin: 125, bpmMax: 140 });
                          }}
                        >
                          Heavy Lifting
                        </button>
                      </div>
                      <div className='col-sm'>
                        <button
                          className='btn btn-secondary'
                          onClick={() => {
                            this.setState({ bpmMin: 100, bpmMax: 120 });
                          }}
                        >
                          Light Cardio
                        </button>
                      </div>
                      <div className='col-sm'>
                        <button
                          className='btn btn-primary'
                          onClick={() => {
                            this.setState({ bpmMin: 121, bpmMax: 145 });
                          }}
                        >
                          Intense Cardio
                        </button>
                      </div>
                    </div>
                  </div>
                  {this.state.bpmMax && (
                    <div className='selectArea'>
                      <p className='lead text-center mt-5'>
                        <strong>Step 2: </strong>
                        Select your genre of music
                      </p>
                      <form onSubmit={this.getPlaylist.bind(this, dispatch)}>
                        <Select
                          className='mt-4 col-md-10 mx-auto'
                          options={this.state.genreOptions}
                          components={this.animatedComponents}
                          closeMenuOnSelect={true}
                          isMulti={true}
                          placeholder={'select genre(s)...'}
                          onChange={this.handleChange}
                        />
                        {this.state.selectedGenres.length > 0 &&
                        this.state.selectedGenres.length <= 5 &&
                        this.state.bpmMax ? (
                          <button className='btn-dark btn-lg' type='submit'>
                            Get Some Songs!
                          </button>
                        ) : (
                          <h6 className='text-muted pt-4'>
                            Please select between 1 and 5 genres
                          </h6>
                        )}
                      </form>
                    </div>
                  )}
                </h1>
              </div>
            );
          } else {
            return <GetSpotifyAuthToken />;
          }
        }}
      </Consumer>
    );
  }
}

export default Search;
