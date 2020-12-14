import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div class="page registration-page mt-5">
        <section class="clean-block clean-form dark">
          <div class="container pb-register">
            <div class="block-heading">
              <h2 class="text-info">Registration</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                quam urna, dignissim nec auctor in, mattis vitae leo.
              </p>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  class="form-control item"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  class="form-control item"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="form-group">
                <label for="password">Confirm Password</label>
                <input
                  class="form-control item"
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  class="form-control item"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <button class="btn btn-primary btn-block" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
