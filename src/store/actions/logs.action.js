import {
  SET_SUCCESS_LOGS,
  LOADING_LOGS,
  SET_ERROR,
} from '../types';
import {
  ref, getDatabase, onValue,
} from '../../firebase';

const db = getDatabase();

const fetchSuccessLogs = () => (dispatch) => {
  console.log('Fetching logs....');
  dispatch({ type: LOADING_LOGS, value: true });

  const dbRef = ref(db, 'logs/loanPayments/success/');

  try {
    const successLogs = [];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const logItem = childSnapshot.val();
        logItem.uid = childSnapshot.key;
        successLogs.push(logItem);
      });
      dispatch({ type: LOADING_LOGS, value: false });
      dispatch({ type: SET_SUCCESS_LOGS, successLogs });
    }, { onlyOnce: true });
  } catch (error) {
    console.error(error);
    dispatch({ type: LOADING_LOGS, value: false });
    dispatch({ type: SET_ERROR, error: error.message });
  }
};

export { fetchSuccessLogs };
