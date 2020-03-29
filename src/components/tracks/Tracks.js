import React, { useRef, useEffect } from 'react';
import Track from '../tracks/Track';
import SavePlaylist from './SavePlaylist';

const Tracks = props => {
  const myRef = useRef();
  useEffect(() => {
    console.log(myRef);
    myRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [props.track_list]);

  return (
    // <Consumer>
    //   {value => {
    //     const { heading, track_list, user } = value;
    //     if (track_list === undefined || track_list.length === 0) {
    //       return null;
    //     } else {
    // return (
    <React.Fragment>
      <div className='mb-4 p-4 mx-5' ref={myRef}>
        <h3 className='text-center mb-4'>{props.heading}</h3>
        <div className='row'>
          {props.track_list.map(item => {
            return <Track key={item.id} track={item} />;
          })}
        </div>
        <SavePlaylist
          track_list={props.track_list}
          user={props.user}
        ></SavePlaylist>
      </div>
    </React.Fragment>
  );
};
//     }}
//   </Consumer>
// );
// };

export default Tracks;
