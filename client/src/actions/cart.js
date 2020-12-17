import axios from 'axios';

import { GET_CART, ADD_TO_CART, CART_ERROR, UPDATE_CART } from './types';
import { setAlert } from './alert';

export const addToCart = (productId) => async (dispatch) => {
  try {
    const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
    const res = await axios.post('/api/cart', {product: productId}, config);

    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });

    dispatch(setAlert('Prekė sėkmingai pridėta į krepšelį', 'success'));
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCart = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/cart');

    dispatch({
      type: GET_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

export const deleteFromCart = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cart/${productId}`);
    dispatch({
      type: UPDATE_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};
