import moment from 'moment';
import {
  SET_ORDERS,
  SET_LOADING,
  SET_ERROR,
  SET_ORDER_COUNT,
  SET_TOTAL_SALES,
  SET_SELECTED_ORDER,
  LOADING_ORDERS,
  SET_SELECTED_CREDIT,
  SET_TOTAL_CREDITS,
  SET_SELECTED_ORDER_STATUS,
  SET_SELECTED_ORDER_PAYMENT_METHOD,
  SET_SELECTED_ORDER_PAYMENT_STATUS,
  SET_ORDERS_FILTERED,
  SET_LOANS,
  SET_PAYMENTS,
  SET_CREDITS,
} from '../types';
import {
  ref, getDatabase, onValue, query, orderByChild, limitToLast, equalTo,
} from '../../firebase';

const db = getDatabase();
let dbRef;

const getOrders = (queryLatest) => (dispatch) => {
  dispatch({ type: LOADING_ORDERS, value: true });
  if (queryLatest) {
    dbRef = query(ref(db, 'orders/'), orderByChild('createdAt'), limitToLast(5));
  } else {
    dbRef = query(ref(db, 'orders/'), orderByChild('createdAt'));
  }

  try {
    const orders = [];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const orderItem = childSnapshot.val();
        orders.push(orderItem);
      });
    }, {
      onlyOnce: true,
    });
    const sortedOrders = orders.sort((a, b) => moment(b.updatedAt, 'YYYY-MM-DD').diff(moment(a.updatedAt, 'YYYY-MM-DD')));
    dispatch({ type: LOADING_ORDERS, value: false });
    dispatch({ type: SET_ORDERS, orders: sortedOrders });
  } catch (error) {
    dispatch({ type: LOADING_ORDERS, value: false });
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

const getLoans = () => (dispatch) => {
  dispatch({ type: LOADING_ORDERS, value: true });
  dbRef = ref(db, 'loans/');

  try {
    const loans = [];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const loanItem = childSnapshot.val();
        loans.push(loanItem);
      });
    }, {
      onlyOnce: true,
    });
    dispatch({ type: LOADING_ORDERS, value: false });
    dispatch({ type: SET_LOANS, loans });
  } catch (error) {
    dispatch({ type: LOADING_ORDERS, value: false });
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

const getPayments = () => (dispatch) => {
  dispatch({ type: LOADING_ORDERS, value: true });
  dbRef = ref(db, 'payments/');

  try {
    const payments = [];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const paymentItem = childSnapshot.val();
        paymentItem.uid = childSnapshot.key;
        payments.push(paymentItem);
      });
    }, {
      onlyOnce: true,
    });
    dispatch({ type: LOADING_ORDERS, value: false });
    dispatch({ type: SET_PAYMENTS, payments });
  } catch (error) {
    dispatch({ type: LOADING_ORDERS, value: false });
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

const getCredits = () => (dispatch) => {
  console.log('Get Credits called...');
  dispatch({ type: LOADING_ORDERS, value: true });
  const creditRef = ref(db, 'credits/');

  try {
    const credits = [];
    onValue(creditRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const creditItem = childSnapshot.val();
        creditItem.uid = childSnapshot.key;
        credits.push(creditItem);
      });
    }, {
      onlyOnce: true,
    });
    dispatch({ type: LOADING_ORDERS, value: false });
    dispatch({ type: SET_CREDITS, credits });
  } catch (error) {
    dispatch({ type: LOADING_ORDERS, value: false });
    dispatch({ type: SET_ERROR, error: error.message });
    console.log('Credit Error: ', error);
  }
  return null;
};

const getOrderCount = () => (dispatch) => {
  dbRef = ref(db, '/orders');
  try {
    onValue(dbRef, (snapshot) => {
      const count = snapshot.size;
      dispatch({ type: SET_ORDER_COUNT, count });
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.message });
  }
  return null;
};

const getTotalSales = () => (dispatch) => {
  // dbRef = ref(db, '/orders');
  dbRef = query(ref(db, 'orders/'), orderByChild('orderStatus'), equalTo('delivered'));
  let total = 0;
  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      total += childData.amount;
    });
    dispatch({ type: SET_TOTAL_SALES, total });
  }, {
    onlyOnce: true,
  });
};

const getTotalCredits = () => (dispatch) => {
  dbRef = query(ref(db, 'orders/'), orderByChild('paymentMethod'), equalTo('Credit'));
  onValue(dbRef, (snapshot) => {
    const total = snapshot.size;
    dispatch({ type: SET_TOTAL_CREDITS, total });
  }, {
    onlyOnce: true,
  });
};

const getOrderDetails = (payload) => (dispatch) => {
  dbRef = ref(db, `/orders/${payload}`);
  onValue(dbRef, (snapshot) => {
    const order = snapshot.val();
    dispatch({ type: SET_SELECTED_ORDER, order });
  }, {
    onlyOnce: true,
  });
};

const getCreditDetails = (creditId) => (dispatch) => {
  dbRef = ref(db, `/credits/${creditId}`);
  dispatch({ type: SET_LOADING });
  onValue(dbRef, (snapshot) => {
    const credit = snapshot.val();
    dispatch({ type: SET_SELECTED_CREDIT, credit });
  }, {
    onlyOnce: true,
  });
};

const setSelectedOrderStatus = (status) => (dispatch) => {
  dispatch({ type: SET_SELECTED_ORDER_STATUS, status });
};

const setSelectedOrderPaymentMethod = (method) => (dispatch) => {
  dispatch({ type: SET_SELECTED_ORDER_PAYMENT_METHOD, method });
};

const setSelectedOrderPaymentStatus = (status) => (dispatch) => {
  dispatch({ type: SET_SELECTED_ORDER_PAYMENT_STATUS, status });
};

const setOrdersFiltered = (orders) => (dispatch) => {
  dispatch({ type: SET_ORDERS_FILTERED, orders });
};

export {
  getOrders,
  getOrderCount,
  getTotalSales,
  getOrderDetails,
  getCreditDetails,
  getTotalCredits,
  setSelectedOrderStatus,
  setSelectedOrderPaymentMethod,
  setSelectedOrderPaymentStatus,
  setOrdersFiltered,
  getLoans,
  getPayments,
  getCredits,
};
