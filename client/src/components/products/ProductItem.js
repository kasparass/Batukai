import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductItem = ({ product: { title, price, likes, _id } }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="clean-product-item">
        <Link to={`/products/${_id}`} className="image">
          <a href="#">
            <img
              className="img-fluid d-block mx-auto"
              src="/assets/img/shoes/DSC_1122.jpg"
            />
          </a>
        </Link>
        <div className="product-name pt-3">
          <a href="#">{title}</a>
        </div>
        <div className="about">
          <div className="rating">
            {likes.length > 0 && (
              <Fragment>
                <i className="fas fa-thumbs-up"></i> {likes.length}
              </Fragment>
            )}
          </div>
          <div className="price">
            <h3>{price} €</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {};

export default ProductItem;
