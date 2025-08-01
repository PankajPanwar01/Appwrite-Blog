import React from 'react';
import logo from '../assets/icon.png'; 

function Logo({ width = '100px' }) {
  return (
    <div>
      <img src={logo} alt="PostBlog Logo" style={{ width }} />
    </div>
  );
}

export default Logo;
