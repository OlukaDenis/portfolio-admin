/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-classes-per-file */

import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Avatar,
} from '@mui/material';
import {
  getDatabase, ref, onValue,
} from '../../firebase';

import { getCreditDetails } from '../../store/actions/orders.action';
import PrintHeader from './print/PrintHeader';
import PrintProducts from './print/PrintProducts';
import { currencyFormatter, formatLongDate } from '../../utils';

class PrintComponent extends React.Component {
  render() {
    const { order, credit, filteredProducts } = this.props;
    const sum = order.products.reduce((acc, product) => acc + product.amount, 0);
    const fees = order.products.reduce((acc, product) => acc + product.transportFee, 0);

    const names = `${credit.firstName} ${credit.lastName}`;

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
              <Typography sx={{ paddingTop: 2, paddingBottom: 2 }} variant="h4">REWOT AFRICA COMMUNICATIONS LTD CUSTOMER CREDIT REQUEST FORM.</Typography>
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

            { credit
            && (
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Box sx={{ paddingLeft: 8, paddingTop: 4 }}>
                  <Typography variant="h6">Passport Photo</Typography>
                  <Avatar
                    variant="rounded"
                    alt="produt image"
                    src={credit.profilePic}
                    sx={{
                      width: 120, height: 150, marginTop: 2, marginBottom: 2,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={3}>
                <Box sx={{ paddingLeft: 8, paddingTop: 4 }}>
                  <Typography variant="h6">Bar liqor license</Typography>
                  <Avatar
                    variant="rounded"
                    alt="produt image"
                    src={credit.businessLicense}
                    sx={{
                      width: 120, height: 150, marginTop: 2, marginBottom: 2,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={3}>
                <Box sx={{ paddingLeft: 8, paddingTop: 4 }}>
                  <Typography variant="h6">Inside bar photo</Typography>
                  <Avatar
                    variant="rounded"
                    alt="produt image"
                    src={credit.insideBarPhoto}
                    sx={{
                      width: 120, height: 150, marginTop: 2, marginBottom: 2,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={3}>
                <Box sx={{ paddingLeft: 8, paddingTop: 4 }}>
                  <Typography variant="h6">National ID</Typography>
                  <Avatar
                    variant="rounded"
                    alt="produt image"
                    src={credit.nationalID}
                    sx={{
                      width: 120, height: 150, marginTop: 2, marginBottom: 2,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            )}

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
                  Business location:
                  {' '}
                  <strong>{credit.businessLocation}</strong>
                </Typography>
                <Typography variant="body1" sx={{ paddingTop: 1 }}>
                  Business contact person phone number:
                  {' '}
                  <strong>{credit.phoneNumber}</strong>
                </Typography>
              </Box>
            </Grid>

            <Box sx={{ paddingRight: 8, paddingLeft: 8, paddingTop: 8 }}>
              { filteredProducts && filteredProducts.length > 0 && <PrintProducts products={filteredProducts} />}
            </Box>

            { credit
            && (
            <Grid
              container
              spacing={0}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Box sx={{ paddingRight: 16, paddingTop: 4 }}>
                <Grid container>
                  <Grid>
                    <Typography variant="body1">Total Amount</Typography>
                  </Grid>
                  <Grid>
                    <Box sx={{ marginLeft: 19 }}>
                      <Typography variant="h6">{currencyFormatter(sum)}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container sx={{ marginTop: 1 }}>
                  <Grid>
                    <Typography variant="body1">Credit period</Typography>
                  </Grid>
                  <Grid>
                    <Box sx={{ marginLeft: 20 }}>
                      <Typography variant="h6">
                        {credit.creditPeriod}
                        {' '}
                        days
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container sx={{ marginTop: 1 }}>
                  <Grid>
                    <Typography variant="body1">Interest rate</Typography>
                  </Grid>
                  <Grid>
                    <Box sx={{ marginLeft: 21 }}>
                      <Typography variant="h6">
                        {credit.interestRate}
                        %
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container sx={{ marginTop: 1 }}>
                  <Grid>
                    <Typography variant="body1">Transport fees</Typography>
                  </Grid>
                  <Grid>
                    <Box sx={{ marginLeft: 18 }}>
                      <Typography variant="h6">
                        {currencyFormatter(fees)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container sx={{ marginTop: 1 }}>
                  <Grid>
                    <Typography variant="h5">Total Amount Payable</Typography>
                  </Grid>
                  <Grid>
                    <Box sx={{ marginLeft: 12 }}>
                      <Typography variant="h5">{currencyFormatter(order.amount)}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            )}

            <Box sx={{ paddingRight: 8, paddingLeft: 8, paddingTop: 8 }}>
              <Grid container>
                <Grid>
                  <Typography variant="body1">
                    Delivery date: ________________________
                  </Typography>
                </Grid>
                <Grid>
                  <Box sx={{ marginLeft: 8 }}>
                    <Typography variant="body1">
                      Delivery No: _________________________
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ marginRight: 8, marginLeft: 8, marginTop: 8 }}>
              <Typography variant="h3">DECLARATION</Typography>
              {
                credit
                && (
                <Avatar
                  variant="rounded"
                  alt="produt image"
                  src={credit.signature}
                  sx={{
                    width: 200, height: 50, marginTop: 2, marginBottom: 2,
                  }}
                />
                )
              }

              <Typography variant="body1">
                With this signature I/We confirm that the above information given by me/us is the true and
                factual position of my/ our business and I /we authorize the firm to obtain any information
                from ourselves and / or third parties to verify / confirm the information provided herein.
              </Typography>
              <Typography variant="body1">
                I/We the undersigned confirm I/We read and understood the terms of the Privacy Policy and hereby
                give express, unequivocal, free, specific and informed authority to Rewot Africa Communications
                Limited and its Affiliates to collect, use and process my/our data as per the policy provided at
                {' '}
                <a href="https://www.rewotafrica.co.ke/customer-credit-policy/" rel="noreferrer" target="_blank">
                  <u>https://www.rewotafrica.co.ke/customer-credit-policy/</u>
                </a>
              </Typography>
              <Typography sx={{ marginTop: 2 }} variant="body1">
                I,
                {' '}
                <strong>{names}</strong>
                {' '}
                (the aforesigned) do
                DECLARE that on
                {' '}
                <strong>{formatLongDate(credit.createdAt)}</strong>
                {' '}
                I ordered the aforementioned goods from REWOT AFRICA
                to be repaid on or before
                {' '}
                <strong>{formatLongDate(credit.creditDueDate)}</strong>
                .
              </Typography>
              <Typography sx={{ paddingTop: 8 }} variant="h4">For Official Use</Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rewot Africa Com. Ltd Officers Name</TableCell>
                    <TableCell>ID No.</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Sign</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                  </TableRow>

                </TableBody>
              </Table>
              <Typography variant="body1" sx={{ paddingTop: 6, paddingBottom: 20, lineHeight: '200%' }}>
                I
                _________________________________________________
                {' '}
                of National Identity Number
                {' '}
                __________________________________________________
                {' '}
                and being
                the ____________________________________________ of Rewot Africa hereby agree to give the aforementioned person/company the
                aforementioned goods on credit on the Terms & Conditions agreed and included in the Rewot Africa Credit Policy.
              </Typography>
            </Box>

          </CardContent>

        </Card>
      </div>
    );
  }
}

const CreditOrderPrint = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [order, setOrder] = useState(null);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { id } = useParams();

  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.orderReducer);
  const userState = useSelector((state) => state.userReducer);
  const { credit } = orderState;
  const { distributors } = userState;

  useEffect(() => {
    const dbRef = ref(getDatabase(), `/orders/${id}`);
    onValue(dbRef, (snapshot) => {
      const orderItem = snapshot.val();
      setOrder(orderItem);

      const { creditId } = orderItem;
      dispatch(getCreditDetails(creditId));

      if (orderItem && distributors) {
        orderItem.distributors.forEach((distributorId) => {
          const distributor = distributors.find((it) => it.userId === distributorId);
          const list = orderItem.products.filter((product) => product.distributorId === distributorId);
          const prdObj = { distributor, productList: list };

          const found = filteredProducts.some((item) => item.distributor.userId === distributorId);
          if (!found) {
            setFilteredProducts((oldArray) => [...oldArray, prdObj]);
          }
        });
      }
    }, {
      onlyOnce: true,
    });
  }, [id, dispatch, distributors, filteredProducts]);

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

      { credit && order && <PrintComponent ref={componentRef} order={order} credit={credit} filteredProducts={filteredProducts} />}

    </div>

  );
};

export default CreditOrderPrint;
