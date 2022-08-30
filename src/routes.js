import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';
import OrderDetails from './pages/OrderDetails';
import PrintOrder from './pages/PrintOrder';
import Logs from './pages/Logs';
import TransactionLogDetails from './components/logs/TransactionLogDetails';
import NewProject from './pages/NewProject';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'orders', element: <Orders /> },
      { path: 'account', element: <Account /> },
      { path: 'orders/:id', element: <OrderDetails /> },
      { path: 'orders/print/:id', element: <PrintOrder /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'logs', element: <Logs /> },
      { path: 'logs/:id', element: <TransactionLogDetails /> },
      { path: 'newProject', element: <NewProject /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
