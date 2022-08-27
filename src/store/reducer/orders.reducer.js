import {
  SET_ORDERS,
  SET_LOADING,
  SET_ERROR,
  SET_ORDER_COUNT,
  SET_TOTAL_SALES,
  SET_SELECTED_ORDER,
  SET_SELECTED_CREDIT,
  LOADING_ORDERS,
  SET_TOTAL_CREDITS,
  SET_SELECTED_ORDER_STATUS,
  SET_SELECTED_ORDER_PAYMENT_METHOD,
  SET_SELECTED_ORDER_PAYMENT_STATUS,
  SET_ORDERS_FILTERED,
  SET_LOANS,
  SET_PAYMENTS,
  SET_CREDITS,
} from '../types';
import initialState from '../initialState';

const orderState = {
  ...initialState,
  orders: [],
  loans: [],
  payments: [],
  credits: [],
  orderCount: 0,
  totalSales: 0,
  totalCredits: 0,
  loadingOrders: true,
  order: null,
  credit: null,
  paymentStatus: null,
  paymentMethod: null,
  orderStatus: null,
  filteredOrders: [],
};

const orderReducer = (state = orderState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case LOADING_ORDERS:
      return {
        ...state,
        loadingOrders: action.value,
        success: false,
      };

    case SET_SELECTED_ORDER:
      return {
        ...state,
        order: action.order,
      };

    case SET_SELECTED_CREDIT:
      return {
        ...state,
        credit: action.credit,
      };

    case SET_ORDER_COUNT:
      return {
        ...state,
        orderCount: action.count,
      };

    case SET_TOTAL_SALES:
      return {
        ...state,
        totalSales: action.total,
      };

    case SET_TOTAL_CREDITS:
      return {
        ...state,
        totalCredits: action.total,
      };

    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };

    case SET_LOANS:
      return {
        ...state,
        loans: action.loans,
      };

    case SET_PAYMENTS:
      return {
        ...state,
        payments: action.payments,
      };

    case SET_CREDITS:
      return {
        ...state,
        credits: action.credits,
      };

    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        success: false,
      };

    case SET_SELECTED_ORDER_STATUS:
      return { ...state, orderStatus: action.status };

    case SET_SELECTED_ORDER_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.method };

    case SET_SELECTED_ORDER_PAYMENT_STATUS:
      return { ...state, paymentStatus: action.status };

    case SET_ORDERS_FILTERED:
      return { ...state, filteredOrders: action.orders };

    default:
      return state;
  }
};

export default orderReducer;
