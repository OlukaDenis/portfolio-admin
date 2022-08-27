import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { TrendingUp } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { getTotalSales } from '../../store/actions/orders.action';
import { currencyFormatter } from '../../utils';

const Budget = (props) => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.orderReducer);
  const { totalSales } = orderState;

  useEffect(() => {
    dispatch(getTotalSales());
  }, [dispatch]);
  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
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
              TOTAL SALES
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {currencyFormatter(totalSales)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56,
              }}
            >
              <TrendingUp />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ArrowDownwardIcon sx={{ color: red[900] }} />
        <Typography
          sx={{
            color: red[900],
            mr: 1,
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box> */}
      </CardContent>
    </Card>
  );
};

export default Budget;
