import React, { Component } from 'react';
import { Consumer } from '../../context';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Spotify from 'spotify-web-api-js';
import GetSpotifyAuthToken from '../layout/GetSpotifyAuthToken';

const spotify = new Spotify();

export class Search extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  animatedComponents = makeAnimated();

  state = {
    selectedGenres: [],
    bpmMin: '',
    bpmMax: '',
    energy: '',
    genreOptions: [],
    tokenExpired: false,
    inactiveStyle: 'btn btn-secondary btn-block',
    active: '',
    activeStyle: 'btn btn-success btn-block'
  };

  setWorkoutType = (dispatch, e) => {
    e.preventDefault();

    setTimeout(() => {
      this.myRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }, 500);

    if (e.target.value === 'Intense Cardio') {
      this.setState({
        bpmMin: 121,
        bpmMax: 145,
        // energy: 0.7,

        active: e.target.value
      });
    } else if (e.target.value === 'Light Cardio') {
      this.setState({
        bpmMin: 100,
        bpmMax: 120,
        // energy: 0.7,

        active: e.target.value
      });
    } else if (e.target.value === 'Heavy Lifting') {
      this.setState({
        bpmMin: 125,
        bpmMax: 140,
        energy: 0.9,
        active: e.target.value
      });
    }
    dispatch({
      type: 'SET_WORKOUT'
    });
  };

  getPlaylist = (dispatch, e) => {
    e.preventDefault();
    let seeds = {
      limit: 24,
      seed_genres: this.state.selectedGenres,
      // target_danceability: 0.9,
      // target_energy: this.state.energy,
      target_acousticness: 0.1,
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
      .catch(err => {
        console.log('error:', err);
        if (err.status === 401) {
          this.setState({ tokenExpired: true });
        }
      });
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
          const { dispatch, showStepTwo } = value;
          if (!this.state.tokenExpired) {
            return (
              <div className='card card-body mb-4 p-4 mx-5' ref={this.myRef}>
                <h2 className='display-4 text-center'>
                  Choose Your Destiny
                  <p className='lead text-center'>
                    <strong>Step 1: </strong>Choose your workout type
                  </p>
                  <div className='container workout-select'>
                    <div className='row'>
                      <div className='col-sm'>
                        <button
                          className={
                            this.state.active === 'Heavy Lifting'
                              ? this.state.activeStyle
                              : this.state.inactiveStyle
                          }
                          value='Heavy Lifting'
                          onClick={this.setWorkoutType.bind(this, dispatch)}
                        >
                          Heavy Lifting
                        </button>
                      </div>
                      <div className='col-sm'>
                        <button
                          className={
                            this.state.active === 'Light Cardio'
                              ? this.state.activeStyle
                              : this.state.inactiveStyle
                          }
                          value='Light Cardio'
                          onClick={this.setWorkoutType.bind(this, dispatch)}
                        >
                          Light Cardio
                        </button>
                      </div>
                      <div className='col-sm'>
                        <button
                          className={
                            this.state.active === 'Intense Cardio'
                              ? this.state.activeStyle
                              : this.state.inactiveStyle
                          }
                          value='Intense Cardio'
                          onClick={this.setWorkoutType.bind(this, dispatch)}
                        >
                          Intense Cardio
                        </button>
                      </div>
                    </div>
                  </div>
                  {showStepTwo && (
                    <div className='selectArea'>
                      <p className='lead text-center mt-5'>
                        <strong>Step 2: </strong>
                        Select your genre of music
                      </p>
                      <form onSubmit={this.getPlaylist.bind(this, dispatch)}>
                        <Select
                          className='mt-4 col-md-10 mx-auto selectDrop'
                          options={this.state.genreOptions}
                          components={this.animatedComponents}
                          closeMenuOnSelect={true}
                          isMulti={true}
                          placeholder={'select genre(s)...'}
                          onChange={this.handleChange}
                          style={{ fontSize: '2rem' }}
                        />
                        {this.state.selectedGenres.length > 0 &&
                        this.state.selectedGenres.length <= 5 &&
                        this.state.bpmMax ? (
                          <button
                            className='btn-dark btn-lg submit-btn'
                            type='submit'
                          >
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
                </h2>
              </div>
            );
          } else {
            return (
              <GetSpotifyAuthToken
                refresh={'Session expired, please log in to Spotify again'}
              />
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Search;
