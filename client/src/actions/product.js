import axios from 'axios';

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
