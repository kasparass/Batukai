import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProductById } from '../../actions/product';

const CartItem = ({
  item: { product },
  getProductById,
  cartProduct,
  loading,
}) => {
  useEffect(() => {
    getProductById(product);
  }, [getProductById, product]);
  console.log(cartProduct);
  return (
    <Fragment>
      {cartProduct && (
        <Fragment>
          <div class="product">
            <div class="row justify-content-center align-items-center">
              <div class="col-md-3">
                <div class="product-image">
                  <img
                    class="img-fluid d-block mx-auto image"
                    src="assets/img/shoes/DSC_1122.jpg"
                  />
                </div>
              </div>
              <div class="col-md-5 product-info">
                <a class="product-name" href="#">
                  {cartProduct.title}
                </a>
              </div>
              <div class="col-6 col-md-2 quantity">
                <label class="d-none d-md-block" for="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  id="number"
                  class="form-control quantity-input"
                  value="1"
                />
              </div>
              <div class="col-6 col-md-2 price">
                <span>{cartProduct.price} €</span>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  getProductById: PropTypes.func.isRequired,
  cartProduct: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cartProduct: state.product.product,
});

export default connect(mapStateToProps, { getProductById })(CartItem);
