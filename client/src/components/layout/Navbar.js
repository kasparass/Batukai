import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
      <div class="container">
        <Link class="navbar-brand logo" to="/">
          <i class="fas fa-socks"></i> Batukai
        </Link>
        <button
          data-toggle="collapse"
          class="navbar-toggler"
          data-target="#navcol-1"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item" role="presentation">
              <Link class="nav-link" to="shopping-cart.html">
                Krepšelis
              </Link>
            </li>
            <li class="nav-item" role="presentation">
              <Link class="nav-link" to="/login">
                Prisijunkti
              </Link>
            </li>
            <li class="nav-item" role="presentation">
              <Link class="nav-link" to="/register">
                Registracija
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
