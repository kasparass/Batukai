import React, { Fragment, useState } from 'react';

const Register = () => {
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
      console.log('Passwords do not match');
    } else {
      console.log(formData);
    }
  };

  return (
    <Fragment>
      <div class="page registration-page mt-5">
        <section class="clean-block clean-form dark">
          <div class="container pb-footer">
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

export default Register;
