import {
  SET_PRODUCTS, SET_ERROR, SET_PRODUCT_COUNT, LOADING_PRODUCTS,
} from '../types';
import {
  ref, getDatabase, onValue, query, orderByChild, limitToLast,
} from '../../firebase';

const db = getDatabase();
let dbRef;

const getProducts = (queryLatest) => (dispatch) => {
  if (queryLatest) {
    dbRef = query(ref(db, 'items/'), orderByChild('updatedAt'), limitToLast(5));
  } else {
    dbRef = query(ref(db, 'items/'), orderByChild('updatedAt'));
  }
  dispatch({ type: LOADING_PRODUCTS });
  try {
    const products = [];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        products.push(childData);
      });
      dispatch({ type: SET_PRODUCTS, products });
    }, {
      onlyOnce: true,
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

const getProductCount = () => (dispatch) => {
  dbRef = ref(db, '/items');
  try {
    onValue(dbRef, (snapshot) => {
      const count = snapshot.size;
      dispatch({ type: SET_PRODUCT_COUNT, count });
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

export { getProducts, getProductCount };
