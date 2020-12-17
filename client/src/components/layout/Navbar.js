import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item" role="presentation">
        <Link class="nav-link" to="/create-product">
          Sukurti Prekę
        </Link>
      </li>
      <li class="nav-item" role="presentation">
        <Link class="nav-link" to="/cart">
          Krepšelis
        </Link>
      </li>
      <li class="nav-item" role="presentation">
        <Link class="nav-link" to="/profile">
          Profilis
        </Link>
      </li>
      <li class="nav-item" role="presentation">
        <a onClick={logout} class="nav-link" href="#!">
          Atsijunkti
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul class="nav navbar-nav ml-auto">
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
  );

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
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
