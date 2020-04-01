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
          const { loggedIn, track_list, heading, user, showStepTwo } = value;
          if (loggedIn) {
            return (
              <React.Fragment>
                <Search />
                {track_list.length ? (
                  <Tracks
                    track_list={track_list}
                    heading={heading}
                    user={user}
                    showStepTwo={showStepTwo}
                  />
                ) : (
                  <div></div>
                )}
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
