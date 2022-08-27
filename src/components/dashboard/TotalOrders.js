import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { pink } from '@mui/material/colors';
import { ShoppingCart } from 'react-feather';
import { getOrderCount } from '../../store/actions/orders.action';

const TotalOrders = (props) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.orderReducer);
  const { orderCount } = orderState;

  useEffect(() => {
    dispatch(getOrderCount());
  }, [dispatch]);

  return (
    <Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL ORDERS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {orderCount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: pink[600],
                height: 56,
                width: 56,
              }}
            >
              <ShoppingCart />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalOrders;
