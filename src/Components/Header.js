import React from 'react';
import logo from '../Images/logo.gif';
import '../Style/Header.css';

function Header() {
  return (
    <div>
      <img className="logo" src={ logo } alt="Logo" />
    </div>
  );
}

export default Header;
