import {
  SET_USERS, SET_LOADING, SET_ERROR, SET_USER_COUNT, SET_DISTRIBUTORS,
} from '../types';
import {
  ref, getDatabase, onValue, query, orderByChild, limitToLast, equalTo,
} from '../../firebase';

const db = getDatabase();
let dbRef;

const getUsers = (queryLatest) => (dispatch) => {
  if (queryLatest) {
    dbRef = query(ref(db, 'users/'), orderByChild('createdAt'), limitToLast(5));
  } else {
    dbRef = query(ref(db, 'users/'), orderByChild('createdAt'));
  }
  dispatch({ type: SET_LOADING });
  try {
    const users = [];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.role !== 'distributor') {
          users.push(childData);
        }
      });
      dispatch({ type: SET_USERS, users });
    }, {
      onlyOnce: true,
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

const getDistributors = () => (dispatch) => {
  dbRef = query(ref(db, 'users/'), orderByChild('role'), equalTo('distributor'));

  dispatch({ type: SET_LOADING });
  try {
    const distributors = [];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        distributors.push(childData);
      });
      dispatch({ type: SET_DISTRIBUTORS, distributors });
    }, {
      onlyOnce: true,
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

const getUserCount = () => (dispatch) => {
  dbRef = ref(db, '/users');
  try {
    onValue(dbRef, (snapshot) => {
      const count = snapshot.size;
      dispatch({ type: SET_USER_COUNT, count });
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

const getUserInfo = (userId) => (dispatch) => {
  // const userRef = ref(db, `/users/${userId}`);
  // try {
  //   onValue(userRef, (snapshot) => {
  //     const user = snapshot.val();
  //     dispatch({ type: SET_USER_DETAILS, user });
  //     return user;
  //   });
  // } catch (error) {
  //   dispatch({ type: SET_ERROR, error: error.message });
  //   return null;
  // }
};

export {
  getUsers, getUserCount, getUserInfo, getDistributors,
};
