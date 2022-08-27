import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { purple } from '@mui/material/colors';
import { People } from '@mui/icons-material';
import { getUserCount } from '../../store/actions/users.action';

const TotalCustomers = (props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const { userCount } = userState;

  useEffect(() => {
    dispatch(getUserCount());
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
              TOTAL CUSTOMERS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {userCount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: purple[600],
                height: 56,
                width: 56,
              }}
            >
              <People />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2,
        }}
      >
        <ArrowUpwardIcon sx={{ color: green[900] }} />
        <Typography
          variant="body2"
          sx={{
            color: green[900],
            mr: 1,
          }}
        >
          16%
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

export default TotalCustomers;
