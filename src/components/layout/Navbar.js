import React from 'react';

const Navbar = () => {
  return (
    <nav
      className='navbar navbar-dark  mb-5'
      style={{ backgroundColor: '#040404' }}
    >
      <span className='navbar-brand mb-0 h1 mx-auto' style={navStyle}>
        {/* <span role='img' aria-label='muscle'>
          💪
        </span>{' '} */}
        SWOLEify{' '}
        {/* <span role='img' aria-label='muscle'>
          💪
        </span> */}
      </span>
    </nav>
  );
};

const navStyle = {
  color: '#249A40',
  fontSize: '3.0rem',
  fontWeight: 'bolder'
};

export default Navbar;
