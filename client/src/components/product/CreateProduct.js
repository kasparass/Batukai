import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProduct } from '../../actions/product';

const CreateProduct = ({ createProduct, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    price: '',
  });

  const {
      title,
      text,
      price,
  } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProduct(formData, history);
  };

  return (
    <Fragment>
      <section className="page login-page">
        <div className="clean-block clean-form dark">
          <div className="container pb-login">
            <div className="block-heading">
              <h2 className="text-info">Pridėti prekę</h2>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label for="email">Pavadinimas</label>
                <input
                  className="form-control item"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <label for="password">Kaina</label>
                <input
                  className="form-control"
                  type="text"
                  name="price"
                  value={price}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group" mb-5>
                <label for="email">Aprašykite informacija apie prekę</label>
                <textarea
                  className="form-control item"
                  type="text"
                  name="text"
                  value={text}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <button className="btn btn-primary btn-block" type="submit">
                Pridėti prekę
              </button>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

CreateProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
};

export default connect(null, { createProduct })(withRouter(CreateProduct));
