import {
  SET_PRODUCTS, SET_LOADING, SET_ERROR, SET_PRODUCT_COUNT, LOADING_PRODUCTS,
} from '../types';
import initialState from '../initialState';

const productState = {
  ...initialState, loadingProducts: false, products: [], productCount: 0,
};

const productReducer = (state = productState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case LOADING_PRODUCTS:
      return {
        ...state,
        loadingProducts: true,
        success: false,
      };

    case SET_PRODUCT_COUNT:
      return {
        ...state,
        productCount: action.count,
      };

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        loadingProducts: false,
      };

    case SET_ERROR:
      return {
        ...state,
        loading: false,
        loadingProducts: false,
        error: action.error,
        success: false,
      };

    default:
      return state;
  }
};

export default productReducer;
