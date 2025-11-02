import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <a className="nav-link" href="/#hotels">Hoteles</a>
        <a className="nav-link" href="/#info">Información</a>
        <a className="nav-link" href="/#about">Sobre</a>
        <a className="nav-link" href="/#contact">Contáctanos</a>
      </div>
    </nav>
  );
};

export default NavBar;

