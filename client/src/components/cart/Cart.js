import React, { Component, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart, getCart, deleteFromCart } from '../../actions/cart';
import Spinner from '../layout/Spinner';
import { setAlert } from '../../actions/alert';
import CartItem from './CartItem';

const Cart = ({
  cart: { cart, loading, error },
  getCart,
  deleteFromCart,
  setAlert,
}) => {
  useEffect(() => {
    getCart();
  }, [getCart]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {!cart ? (
            <Fragment>{setAlert(error.msg.msg, 'warning')}</Fragment>
          ) : (
            <Fragment>
              <div class="page shopping-cart-page">
                <section class="clean-block clean-cart dark">
                  <div class="container">
                    <div class="block-heading">
                      <h2 class="text-info">Shopping Cart</h2>
                    </div>
                    <div class="content">
                      <div class="row no-gutters">
                        <div class="col-md-12 col-lg-8">
                          <div class="items">
                            {cart.items.map((item) => (
                              <CartItem key={item._id} item={item} />
                            ))}
                          </div>
                        </div>
                        <div class="col-md-12 col-lg-4">
                          <div class="summary">
                            <h3>Summary</h3>
                            <h4>
                              <span class="text">Total</span>
                              <span class="price">$360</span>
                            </h4>
                            <button
                              class="btn btn-primary btn-block btn-lg"
                              type="button"
                            >
                              Checkout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

Cart.propTypes = {
  getCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getCart, deleteFromCart, setAlert })(
  Cart
);
