import {
  PROJECT_ERROR,
  SAVE_NEW_PROJECT,
  SET_PROJECTS,
  LOADING_PROJECT,
} from '../types';

import {
  uploadBytesResumable,
  imageRef,
  getStorage,
  getDownloadURL,
} from '../../firebase';

import { apiAxios } from '../../utils/axiosConfig';

const saveNewProject = (project, file) => async (dispatch) => {
  dispatch({ type: LOADING_PROJECT, value: true });
  try {
    const coverImage = await uploadImage(file);
    const payload = { ...project, coverImage };

    const result = await apiAxios.post('/projects', payload);

    dispatch({ type: LOADING_PROJECT, value: false });
    dispatch({ type: SAVE_NEW_PROJECT, project: result });

    return result;
  } catch (err) {
    dispatch({ type: LOADING_PROJECT, value: false });
    dispatch({ type: PROJECT_ERROR, error: err.message });
    return null;
  }
};

const fetchProjects = (project) => async (dispatch) => {
  dispatch({ type: LOADING_PROJECT, value: true });
  try {
    const result = await apiAxios.get('/projects', project);
    dispatch({ type: LOADING_PROJECT, value: false });
    dispatch({ type: SET_PROJECTS, projects: result.data.data });
  } catch (err) {
    dispatch({ type: LOADING_PROJECT, value: false });
    dispatch({ type: PROJECT_ERROR, error: err.message });
  }
};

const uploadImage = async (file) => {
  try {
    const metadata = {
      contentType: 'image/jpeg',
    };

    const storageRef = imageRef(getStorage(), `images/projects/${file.name}`);
    const uploadTask = await uploadBytesResumable(storageRef, file, metadata);
    const url = await getDownloadURL(uploadTask.ref);
    return url;
  } catch (err) {
    console.log('Error:', err);
    return null;
  }
};

export {
  saveNewProject,
  fetchProjects,
};
