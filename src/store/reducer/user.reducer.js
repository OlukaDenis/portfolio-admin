import {
  SET_USERS,
  SET_LOADING,
  SET_ERROR,
  SET_USER_COUNT,
  SET_DISTRIBUTORS,
} from '../types';
import initialState from '../initialState';

const userState = {
  ...initialState,
  users: [],
  userCount: 0,
  distributors: [],
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case SET_USER_COUNT:
      return {
        ...state,
        userCount: action.count,
      };

    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };

    case SET_DISTRIBUTORS:
      return {
        ...state,
        distributors: action.distributors,
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

export default userReducer;
