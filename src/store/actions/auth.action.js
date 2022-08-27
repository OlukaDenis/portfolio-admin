import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, sendEmailVerification,
} from '../../firebase';
import {
  SET_LOGGED_IN, SET_LOADING, SET_ERROR, SET_USER, SET_SUCCESS,
} from '../types';

const auth = getAuth();

const loginUser = (payload) => async (dispatch) => {
  const { email, password } = payload;
  dispatch({ type: SET_LOADING });
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    const user = {
      displayName: response.user.displayName,
      email: response.user.email,
      emailVerified: response.user.emailVerified,
      phoneNumber: response.user.phoneNumber,
      photoURL: response.user.photoURL,
      uid: response.user.uid,
    };

    dispatch({ type: SET_USER, user });
    dispatch({ type: SET_LOGGED_IN, data: true });
    return response;
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

const registerUser = (payload) => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  const { email, password } = payload;
  const updatePayload = {
    displayName: `${payload.firstName} ${payload.lastName}`,
    photoURL: payload.imageUrl,
  };

  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);
    dispatch({ type: SET_SUCCESS, data: true });
    dispatch(updateUser(updatePayload));
    return response;
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

const updateUser = (payload) => async (dispatch) => {
  const { displayName, photoURL } = payload;
  dispatch({ type: SET_LOADING });
  try {
    const response = await updateProfile(auth.currentUser, { displayName, photoURL });
    dispatch({ type: SET_SUCCESS, data: true });
    return response;
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

const logout = () => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  try {
    const response = await signOut(auth);
    dispatch({ type: SET_USER, user: {} });
    dispatch({ type: SET_LOGGED_IN, data: false });
    dispatch({ type: SET_ERROR, error: '' });
    dispatch({ type: SET_SUCCESS, data: false });
    return response;
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

export {
  loginUser, registerUser, logout, updateUser,
};
