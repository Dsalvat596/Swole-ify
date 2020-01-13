import React from 'react';
import GetSpotifyAuthToken from './GetSpotifyAuthToken';
import Search from '../tracks/Search';
import { Consumer } from '../../context';

export class Index extends React.Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { heading, loggedIn } = value;
          if (loggedIn) {
            return <Search heading={heading} />;
          } else {
            return <GetSpotifyAuthToken />;
          }
        }}
      </Consumer>
    );
  }
}

export default Index;
