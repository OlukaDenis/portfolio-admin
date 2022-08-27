import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import TotalOrders from 'src/components/dashboard/TotalOrders';
import TotalCredits from 'src/components/dashboard/TotalCredits';
import Budget from '../components/dashboard/Budget';
import OrderList from '../components/dashboard/OrderList';
import LatestProducts from '../components/dashboard/LatestProducts';
import TotalCustomers from '../components/dashboard/TotalCustomers';
import {
  getOrders, getPayments, getLoans, getCredits,
} from '../store/actions/orders.action';
import { getDistributors, getUsers } from '../store/actions/users.action';

const Dashboard = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.orderReducer);
  const { orders } = orderState;

  useEffect(() => {
    dispatch(getUsers(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrders(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCredits());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLoans());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDistributors());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchSuccessLogs());
  // }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Home | Rewot dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <Budget />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalCustomers />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalOrders />
            </Grid>
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalCredits />
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              {/* <Sales /> */}
              <OrderList orders={orders} title="Latest orders" />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              {/* <TrafficByDevice sx={{ height: '100%' }} /> */}
              <LatestProducts sx={{ height: '100%' }} />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              {/* <LatestProducts sx={{ height: '100%' }} /> */}
            </Grid>
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              {/* <OrderList orders={orders.reverse()} title="Latest orders" /> */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
