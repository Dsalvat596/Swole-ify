import React from 'react';
import GetSpotifyAuthToken from './GetSpotifyAuthToken';
import Search from '../tracks/Search';
import Tracks from '../tracks/Tracks';
import { Consumer } from '../../context';

export class Index extends React.Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { loggedIn } = value;
          if (loggedIn) {
            return (
              <React.Fragment>
                <Search />
                <Tracks />
              </React.Fragment>
            );
          } else {
            return <GetSpotifyAuthToken />;
          }
        }}
      </Consumer>
    );
  }
}

export default Index;
