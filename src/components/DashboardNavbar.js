import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu, Logout } from '@mui/icons-material';
import { logout } from '../store/actions/auth.action';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  });

  const logoutUser = () => dispatch(logout());

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          {/* <Logo /> */}
          <Typography color="white" variant="h3" component="h2">
            Rewot Ciro Dashboard
          </Typography>
        </RouterLink>

        <Box sx={{ flexGrow: 1 }} />
        <Hidden xlDown>
          {/* <IconButton color="inherit" size="large">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton color="inherit" size="large" onClick={logoutUser}>
            <Logout />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
