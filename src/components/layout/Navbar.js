import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar navbar-dark bg-dark mb-5'>
      <span className='navbar-brand mb-0 h1 mx-auto' style={navStyle}>
        <i className='fas fa-dumbbell'></i> SWOLE-ify{' '}
        <i className='fas fa-dumbbell'></i>
      </span>
    </nav>
  );
};

const navStyle = {
  color: '#34b616',
  fontSize: '2.5rem',
  fontFamily: 'Roboto, sans-serif'
};

export default Navbar;
