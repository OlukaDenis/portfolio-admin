import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import OrderDetailLayout from '../components/OrderDetailLayout';
import { getOrderDetails } from '../store/actions/orders.action';

const OrderDetails = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id, dispatch]);
  return (
    <>
      <Helmet>
        <title>Order info | Rewot dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <OrderDetailLayout />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

OrderDetails.propTypes = {

};

export default OrderDetails;
