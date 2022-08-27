/* eslint-disable no-param-reassign */

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import {
  Box,
  Container,
  Button,
  Grid,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowUpward,
} from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import OrderList from 'src/components/dashboard/OrderList';
import { getOrders } from '../store/actions/orders.action';
import { isDateOverdue } from '../utils';

const Orders = (...props) => {
  const headers = [
    { label: 'Address', key: 'address' },
    { label: 'Amount (KES)', key: 'amount' },
    { label: 'Date placed', key: 'createdAt' },
    { label: 'Credit ID', key: 'creditId' },
    { label: 'Customer ID', key: 'customerId' },
    { label: 'Delivery Method', key: 'deliveryMethod' },
    { label: 'Distributors', key: 'distributorNames' },
    { label: 'Order Number', key: 'orderNumber' },
    { label: 'Order status', key: 'orderStatus' },
    { label: 'Products', key: 'quantity' },
    { label: 'Transport Fee', key: 'transportFees' },
    { label: 'Payment ID', key: 'paymentId' },
    { label: 'Overdue', key: 'overDueReadable' },
  ];

  const orderStatuses = ['Placed', 'Confirmed', 'In Transit', 'Delivered', 'Canceled'];
  const paymentMethods = ['Credit', 'Lipa Na Mpesa', 'Cash on delivery'];
  const paymentStatuses = ['Initiated', 'Paid', 'Canceled', 'Declined', 'Error', 'Submitted', 'Partially paid', 'Insufficient funds'];

  const [currentOrders, setCurrentOrders] = useState([]);
  const [originalOrders, setOriginalOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedLipaStatus, setSelectedLipaStatus] = useState('');
  const [isLipaDisabled, setLipaDisabled] = useState(true);

  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.orderReducer);
  const {
    orders, loans, payments, credits,
  } = orderState;
  const userState = useSelector((state) => state.userReducer);
  const { distributors } = userState;

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    dispatch(getOrders(false));
  }, [dispatch]);

  useEffect(() => {
    if (orders && credits && distributors) {
      const overDueFilters = orders.map((order) => {
        if (order.paymentMethod === 'Credit') {
          const credit = credits.find((it) => it.uid === order.creditId);
          if (credit !== undefined) {
            let overDue;
            let overDueReadable;

            if (isDateOverdue(credit.creditDueDate)) {
              overDue = true;
              overDueReadable = 'Yes';
            } else {
              overDue = false;
              overDueReadable = 'No';
            }

            return { ...order, overDue, overDueReadable };
          }
        }
        return order;
      });

      const ordersWithNames = overDueFilters.map((order) => {
        const fullNames = order.distributors.map((distID) => {
          const mUser = distributors.find((it) => it.userId === distID);
          if (mUser !== undefined) {
            return `${mUser.firstName} ${mUser.lastName}`;
          }
          return distID;
        });

        return { ...order, distributorNames: fullNames };
      });

      const sortedOrders = ordersWithNames.sort((a, b) => moment(b.updatedAt, 'YYYY-MM-DD').diff(moment(a.updatedAt, 'YYYY-MM-DD')));
      setCurrentOrders(sortedOrders);
      setOriginalOrders(sortedOrders);
    }
  }, [orders, dispatch, credits, distributors, today]);

  const handleStatusChange = (mStatus, mPayment, mLipaStatus) => {
    setSelectedStatus(mStatus);

    if (orders && loans && payments) {
      handleApplyFilters(mStatus, mPayment, mLipaStatus);
    }
  };

  const handlePaymentChange = (mStatus, mPayment, mLipaStatus) => {
    setSelectedPayment(mPayment);

    if (mPayment === 'Cash on delivery' || mPayment === '') {
      setLipaDisabled(true);
    } else {
      setLipaDisabled(false);
      setSelectedLipaStatus('');
    }

    if (orders && loans && payments) {
      handleApplyFilters(mStatus, mPayment, mLipaStatus);
    }
  };

  const handleLipaStatus = (mStatus, mPayment, mLipaStatus) => {
    setSelectedLipaStatus(mLipaStatus);

    if (orders && loans && payments) {
      handleApplyFilters(mStatus, mPayment, mLipaStatus);
    }
  };

  const handleApplyFilters = (status, payment, lipaStatus) => {
    if (status && payment && lipaStatus) {
      const filtered = originalOrders.filter((order) => {
        if (payment.toLowerCase() === 'lipa na mpesa') {
          const filterPayments = payments.filter((it) => it.CheckoutRequestID === order.paymentId && it.paymentStatus === lipaStatus.toLowerCase());

          if (filterPayments) {
            console.log('Lipa Payment: ', filterPayments);
            return order.orderStatus.toLowerCase().includes(status.toLowerCase())
            && order.paymentMethod.toLowerCase().includes(payment.toLowerCase())
            && filterPayments.length !== 0;
          }
        } else {
          const filterLoans = loans.filter((it) => it.creditId === order.creditId && it.loanStatus === lipaStatus.toLowerCase());

          if (filterLoans) {
            console.log('Loan Payment: ', filterLoans);
            return order.orderStatus.toLowerCase().includes(status.toLowerCase())
            && order.paymentMethod.toLowerCase().includes(payment.toLowerCase())
            && filterLoans.length !== 0;
          }
        }

        return currentOrders;
      });

      const sortedOrders = filtered.sort((a, b) => moment(b.updatedAt, 'YYYY-MM-DD').diff(moment(a.updatedAt, 'YYYY-MM-DD')));
      setCurrentOrders(sortedOrders);
    } else if (payment && lipaStatus) {
      console.log(`Payment method: ${payment} Lipa status: ${lipaStatus} `);
      const filtered = originalOrders.filter((order) => {
        if (payment.toLowerCase() === 'lipa na mpesa') {
          const filterPayments = payments.filter((it) => it.CheckoutRequestID === order.paymentId && it.paymentStatus === lipaStatus.toLowerCase());

          if (filterPayments) {
            return order.paymentMethod.toLowerCase().includes(payment.toLowerCase())
            && filterPayments.length !== 0;
          }
        } else {
          const filterLoans = loans.filter((it) => it.creditId === order.creditId && it.loanStatus === lipaStatus.toLowerCase());

          if (filterLoans) {
            return order.paymentMethod.toLowerCase().includes(payment.toLowerCase())
            && filterLoans.length !== 0;
          }
        }

        return currentOrders;
      });

      const sortedOrders = filtered.sort((a, b) => moment(b.updatedAt, 'YYYY-MM-DD').diff(moment(a.updatedAt, 'YYYY-MM-DD')));
      setCurrentOrders(sortedOrders);
    } else if (status && payment) {
      console.log(`Order status: ${status} Payment method: ${payment}`);
      const filtered = originalOrders.filter((order) => order.orderStatus.toLowerCase().includes(status.toLowerCase())
      && order.paymentMethod.toLowerCase().includes(payment.toLowerCase()));
      const sortedOrders = filtered.sort((a, b) => moment(b.updatedAt, 'YYYY-MM-DD').diff(moment(a.updatedAt, 'YYYY-MM-DD')));
      setCurrentOrders(sortedOrders);
    } else if (status) {
      console.log(`Order status: ${status}`);
      const filtered = originalOrders.filter((order) => order.orderStatus.toLowerCase().includes(status.toLowerCase()));
      const sortedOrders = filtered.sort((a, b) => moment(b.updatedAt, 'YYYY-MM-DD').diff(moment(a.updatedAt, 'YYYY-MM-DD')));
      setCurrentOrders(sortedOrders);
    } else if (payment) {
      console.log(`Payment method: ${payment}`);
      const filtered = originalOrders.filter((order) => order.paymentMethod.toLowerCase().includes(payment.toLowerCase()));
      const sortedOrders = filtered.sort((a, b) => moment(b.updatedAt, 'YYYY-MM-DD').diff(moment(a.updatedAt, 'YYYY-MM-DD')));
      setCurrentOrders(sortedOrders);
    } else {
      setCurrentOrders(originalOrders);
    }
  };

  return (
    <>
      <Helmet>
        <title>Orders | Rewot dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          {/* <CustomerListToolbar /> */}

          <Grid container spacing={1}>

            <Grid item xs={9}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>FILTERS</Typography>

                  <Stack direction="row" spacing={3} sx={{ height: 56 }}>
                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel id="order-status-label">Order Status</InputLabel>
                      <Select
                        labelId="order-status-label"
                        id="order-status-select"
                        value={selectedStatus}
                        onChange={(event) => handleStatusChange(event.target.value, selectedPayment, selectedLipaStatus)}
                        label="Order Status"
                      >
                        <MenuItem value="">
                          <em>All</em>
                        </MenuItem>

                        {orderStatuses.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel id="payment_method-label">Payment Method</InputLabel>
                      <Select
                        labelId="payment_method-label"
                        id="payment_method-select"
                        value={selectedPayment}
                        onChange={(event) => handlePaymentChange(selectedStatus, event.target.value, selectedLipaStatus)}
                        label="Payment method"
                      >
                        <MenuItem value="">
                          <em>All</em>
                        </MenuItem>

                        {paymentMethods.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 200 }} disabled={isLipaDisabled}>
                      <InputLabel id="lipa-status-label">Payment Status</InputLabel>
                      <Select
                        labelId="lipa-status-label"
                        id="lipa-status-select"
                        value={selectedLipaStatus}
                        onChange={(event) => handleLipaStatus(selectedStatus, selectedPayment, event.target.value)}
                        label="Mpesa Status"
                      >
                        <MenuItem value="">
                          <em>All</em>
                        </MenuItem>

                        {paymentStatuses.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={3}>

              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="flex-end"
                sx={{ mt: 4 }}
              >

                <Stack direction="row" spacing={3} sx={{ height: 56 }}>
                  { currentOrders && (
                  <CSVLink
                    data={currentOrders}
                    headers={headers}
                    filename="Rewot-Orders.csv"
                    target="_blank"
                  >
                    <Button variant="contained" sx={{ marginRight: 0, color: 'white' }} startIcon={<ArrowUpward />}>
                      EXPORT
                    </Button>

                  </CSVLink>
                  )}
                </Stack>

              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ pt: 3 }}>
            <OrderList orders={currentOrders} title="Orders" paginate />
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default Orders;
