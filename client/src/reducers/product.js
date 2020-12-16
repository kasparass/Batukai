import {
  GET_PRODUCT,
  GET_PRODUCTS,
  PRODUCT_ERROR,
  CLEAR_PRODUCT,
} from '../actions/types';

const initialSate = {
  product: null,
  products: [],
  loading: true,
  error: {},
};

export default function (state = initialSate, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: null,
        loading: false,
      };

    default:
      return state;
  }
}
