import React, { Component, createContext } from 'react';
import Spotify from 'spotify-web-api-js';

const Context = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search results'
      };
    // case 'TOKEN_EXPIRED':
    //   return {
    //     ...state,
    //     loggedIn: false
    //   };
    case 'CLEAR_TRACKLIST':
      return {
        ...state,
        track_list: [],
        showStepTwo: false
      };
    case 'SET_WORKOUT':
      return {
        ...state,
        showStepTwo: true
      };
    default:
      return state;
  }
};
const spotifyWebApi = new Spotify();

export class Provider extends Component {
  state = {
    track_list: [],
    user: null,
    selectedGenres: [],
    showStepTwo: false,
    heading: 'Choose Your Destiny',
    loggedIn: false,
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  componentDidMount() {
    const params = this.getHashParams();
    this.setState({ loggedIn: params.access_token ? true : false });

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
      spotifyWebApi.getMe().then(res => {
        this.setState({ user: res });
      });
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
