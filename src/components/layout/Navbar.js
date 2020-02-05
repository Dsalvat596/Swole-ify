import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar navbar-dark bg-dark mb-5'>
      <span className='navbar-brand mb-0 h1 mx-auto' style={navStyle}>
        <span role='img' aria-label='muscle'>
          💪
        </span>{' '}
        SWOLEify{' '}
        <span role='img' aria-label='muscle'>
          💪
        </span>
      </span>
    </nav>
  );
};

const navStyle = {
  color: '#FFC108',
  fontSize: '2.5rem',
  fontFamily: 'Righteous, cursive'
};

export default Navbar;
