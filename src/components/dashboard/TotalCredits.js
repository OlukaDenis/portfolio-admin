import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { orange } from '@mui/material/colors';
import { CreditCard } from 'react-feather';
import { getTotalCredits } from '../../store/actions/orders.action';

const TotalCredits = (props) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.orderReducer);
  const { totalCredits } = orderState;

  useEffect(() => {
    dispatch(getTotalCredits());
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
              TOTAL CREDITS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {totalCredits}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: orange[600],
                height: 56,
                width: 56,
              }}
            >
              <CreditCard />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalCredits;
