import {
  PROJECT_ERROR,
  SAVE_NEW_PROJECT,
  LOADING_PROJECT,
  SET_PROJECTS,
} from '../types';
import initialState from '../initialState';

const projecReducer = {
  ...initialState,
  projects: [],
  projectLoading: false,
};

const projectReducer = (state = projecReducer, action) => {
  switch (action.type) {
    case LOADING_PROJECT:
      return {
        ...state,
        projectLoading: true,
        success: false,
      };

    case PROJECT_ERROR:
      return {
        ...state,
        projectLoading: false,
        error: action.error,
        success: false,
      };

    case SAVE_NEW_PROJECT:
      return {
        ...state,
        projectLoading: true,
        success: true,
      };

    case SET_PROJECTS:
      return {
        projects: action.projects,
        success: true,
      };

    default:
      return state;
  }
};

export default projectReducer;
