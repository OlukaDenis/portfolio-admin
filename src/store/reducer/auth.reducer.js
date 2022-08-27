import {
  SET_LOGGED_IN, SET_LOADING, SET_USER, SET_ERROR, SET_SUCCESS,
} from '../types';
import initialState from '../initialState';

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.data,
      };

    case SET_USER:
      return {
        ...state,
        loading: false,
        user: action.user,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case SET_SUCCESS:
      return {
        ...state,
        success: action.data,
        loading: false,
      };

    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false,
      };

    default:
      return state;
  }
};

export default authReducer;
