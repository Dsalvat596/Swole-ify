import React, { Component, createContext } from 'react';
import Spotify from 'spotify-web-api-js';

const Context = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRACKS':
      return {
        ...state,
        selectedGenres: action.payload,
        heading: 'Search results'
      };
    default:
      return state;
  }
};
const spotifyWebApi = new Spotify();

export class Provider extends Component {
  state = {
    track_list: [],
    selectedGenres: [],
    heading: 'Choose Your Destiny',
    loggedIn: false,
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  componentDidMount() {
    const params = this.getHashParams();
    console.log(params);
    this.setState({ loggedIn: params.access_token ? true : false });

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    return window.location.hash
      .substring(1)
      .split('&')
      .reduce(function(initial, item) {
        if (item) {
          var parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
