import React, { Component, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart, getCart, deleteFromCart } from '../../actions/cart';

const Cart = ({ cart: { cart, loading }, getCart, deleteFromCart }) => {
    useEffect(() => {
        getCart();
    }, [getCart])
  return <Fragment>

  </Fragment>;
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

Cart.propTypes = {
  getCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { getCart, deleteFromCart })(Cart);
