import React, { Component } from 'react';
import { Consumer } from '../../context';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Spotify from 'spotify-web-api-js';

const spotify = new Spotify();

export class Search extends Component {
  animatedComponents = makeAnimated();

  state = {
    allGenres: [],
    genreSearch: '',
    bpmMin: '',
    bpmMax: '',
    genreOptions: []
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  formatGenreForSelect(data) {
    let options = [];
    data.map(x => options.push({ value: x, label: x }));
    return options;
  }
  componentDidMount() {
    spotify
      .getAvailableGenreSeeds()
      .then(res => {
        this.setState({ genreOptions: this.formatGenreForSelect(res.genres) });
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <Consumer>
        {value => {
          const { heading } = value;
          return (
            <div className='card card-body mb-4 p-4 mx-5'>
              <h1 className='display-4 text-center'>
                <i className='fas fa-music'></i> {heading}
                <p className='lead text-center'>Choose your workout type</p>
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
                <p className='lead text-center mt-5'>
                  Select your genre of music
                </p>
                <form>
                  <Select
                    options={this.state.genreOptions}
                    components={this.animatedComponents}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    placeholder={'select genre(s)...'}
                  />
                  <button className='btn-dark btn-lg' type='submit'>
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
