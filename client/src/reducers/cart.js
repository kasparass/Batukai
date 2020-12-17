import {
  ADD_TO_CART,
  GET_CART,
  CART_ERROR,
  UPDATE_CART,
} from '../actions/types';

const initialState = {
  cart: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CART:
    case ADD_TO_CART:
    case UPDATE_CART:
      return {
        ...state,
        cart: payload,
        loading: false,
      };
    case CART_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
