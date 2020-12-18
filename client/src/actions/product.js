import axios from 'axios';
import { setAlert } from './alert';

import {
  CLEAR_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  PRODUCT_ERROR,
} from './types';

// Get all products
export const getProducts = () => async (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT });

  try {
    const res = await axios.get('/api/products');

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get product by ID
export const getProductById = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${productId}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update product
export const createProduct = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const res = await axios.post('/api/products', formData, config);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Product Updated' : 'Product Created', 'success'));

    if (!edit) {
      history.push('/'); // redirects in actions are different
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};