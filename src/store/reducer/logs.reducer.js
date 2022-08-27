import {
  SET_SUCCESS_LOGS,
  LOADING_LOGS,
  SET_ERROR,
} from '../types';

import initialState from '../initialState';

const logState = {
  ...initialState,
  successLogs: [],
  failedLogs: [],
};

const logReducer = (state = logState, action) => {
  switch (action.type) {
    case LOADING_LOGS:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case SET_SUCCESS_LOGS:
      return {
        ...state,
        successLogs: action.successLogs,
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

export default logReducer;
