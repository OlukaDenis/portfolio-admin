import {
  applyMiddleware, combineReducers, createStore, compose,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';
import authReducer from './reducer/auth.reducer';
import orderReducer from './reducer/orders.reducer';
import userReducer from './reducer/user.reducer';
import productReducer from './reducer/products.reducer';
import logReducer from './reducer/logs.reducer';

const reducer = combineReducers({
  authReducer,
  orderReducer,
  userReducer,
  productReducer,
  logReducer,
});

const persistConfig = {
  key: 'rewot',
  storage,
  whitelist: ['authReducer'],
};
const rootReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  rootReducer,
  compose(applyMiddleware(ReduxThunk)),
);
const persistor = persistStore(store);

export {
  store,
  persistor,
};
