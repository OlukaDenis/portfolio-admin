/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-classes-per-file */

import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import {
  getDatabase, ref, onValue,
} from '../firebase';

// import { getOrderDetails } from '../store/actions/orders.action';
import PrintHeader from './orders/print/PrintHeader';
import PrintProducts from './orders/print/PrintProducts';
import { currencyFormatter } from '../utils';

class DetailComponent extends React.Component {
  render() {
    const { order, filteredProducts, users } = this.props;
    const customer = users.find((user) => user.userId === order.customerId);

    const sum = order.products.reduce((acc, product) => acc + product.amount, 0);
    const fees = order.products.reduce((acc, product) => acc + product.transportFee, 0);
    const names = `${customer.firstName} ${customer.lastName}`;

    return (
      <div>
        <Card>
          <CardContent>
            <PrintHeader />
            <Divider sx={{ paddingTop: 5 }} />

            <Grid
              container
              spacing={0}
              direction="row"
              justifyContent="center"
            >
              <Typography sx={{ paddingTop: 2, paddingBottom: 2 }} variant="h4">REWOT AFRICA COMMUNICATIONS LTD CUSTOMER FORM.</Typography>
            </Grid>

            <Grid
              container
              spacing={0}
              direction="row"
              justifyContent="center"
            >
              <Typography sx={{ paddingTop: 1 }} variant="h5">
                <strong>
                  ORDER NO:
                  {' '}
                  {order.orderNumber}
                </strong>
              </Typography>
            </Grid>

            <Grid container>
              <Box sx={{ paddingRight: 8, paddingLeft: 8, paddingTop: 6 }}>
                <Typography variant="body1" sx={{ paddingTop: 1 }}>
                  Customer name:
                  {' '}
                  <strong>{names}</strong>
                </Typography>
                <Typography variant="body1" sx={{ paddingTop: 1 }}>
                  Customer address:
                  {' '}
                  <strong>{order.address}</strong>
                </Typography>
                <Typography variant="body1" sx={{ paddingTop: 1 }}>
                  Customer phone:
                  {' '}
                  <strong>{customer.phone}</strong>
                </Typography>
              </Box>
            </Grid>

            <Box sx={{ paddingRight: 8, paddingLeft: 8, paddingTop: 8 }}>
              { filteredProducts && filteredProducts.length > 0 && <PrintProducts products={filteredProducts} />}
            </Box>

            { order
            && (
            <Grid
              container
              spacing={0}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >

              <Box sx={{ paddingRight: 16, paddingTop: 4 }}>
                <Grid container sx={{ marginTop: 1 }}>
                  <Grid>
                    <Typography variant="body1">Transport fees</Typography>
                  </Grid>
                  <Grid>
                    <Box sx={{ marginLeft: 3 }}>
                      <Typography variant="h6">
                        {currencyFormatter(fees)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid>
                    <Typography variant="h5">Total</Typography>
                  </Grid>
                  <Grid>
                    <Box sx={{ marginLeft: 12 }}>
                      <Typography variant="h5">{currencyFormatter(sum)}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            )}

            <Box sx={{
              paddingRight: 8, paddingLeft: 8, paddingTop: 16, paddingBottom: 16,
            }}
            >
              <Grid container>
                <Grid>
                  <Typography variant="body1">
                    Delivery date: ____________________
                  </Typography>
                </Grid>
                <Grid>
                  <Box sx={{ marginLeft: 8 }}>
                    <Typography variant="body1">
                      Delivery No: ________________________
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

          </CardContent>

        </Card>
      </div>
    );
  }
}

const OrderDetailLayout = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [order, setOrder] = useState(null);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { id } = useParams();

  const userState = useSelector((state) => state.userReducer);
  const { distributors, users } = userState;

  useEffect(() => {
    const dbRef = ref(getDatabase(), `/orders/${id}`);
    onValue(dbRef, (snapshot) => {
      const orderItem = snapshot.val();

      setOrder(orderItem);
    }, {
      onlyOnce: true,
    });
  }, [id]);

  useEffect(() => {
    if (order && distributors) {
      order.distributors.forEach((distributorId) => {
        const distributor = distributors.find((it) => it.userId === distributorId);
        const list = order.products.filter((product) => product.distributorId === distributorId);
        const prdObj = { distributor, productList: list };

        const found = filteredProducts.some((item) => item.distributor.userId === distributorId);
        if (!found) {
          setFilteredProducts((oldArray) => [...oldArray, prdObj]);
        }
      });
    }
  }, [order, distributors, filteredProducts]);

  // useEffect(() => {
  //   if (order) {
  //     const { orderNumber } = order;
  //     dispatch(getPaymentDetails(orderNumber));
  //   }
  // }, [order, dispatch]);

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="flex-end"
        sx={{ paddingBottom: 4 }}
      >
        <Button onClick={handlePrint} variant="contained">Print</Button>
      </Grid>

      { order && order.products && <DetailComponent ref={componentRef} order={order} users={users} filteredProducts={filteredProducts} />}
    </div>

  );
};

export default OrderDetailLayout;
