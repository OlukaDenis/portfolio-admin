import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from '@mui/material';
import {
  User as UserIcon,
} from 'react-feather';
import { BarChart, ShoppingBasket } from '@mui/icons-material';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChart,
    title: 'Dashboard',
  },
  {
    href: '/app/orders',
    icon: ShoppingBasket,
    title: 'Orders',
  },
  // {
  //   href: '/app/customers',
  //   icon: UsersIcon,
  //   title: 'Customers',
  // },
  // {
  //   href: '/app/products',
  //   icon: ShoppingBagIcon,
  //   title: 'Products',
  // },
  // {
  //   href: '/app/account',
  //   icon: UserIcon,
  //   title: 'Account',
  // },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings',
  // },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login',
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register',
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error',
  // },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const authState = useSelector((state) => state.authReducer);
  const { user } = authState;

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname, onMobileClose, openMobile]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        {
          user.photoURL
            ? (
              <Avatar
                component={RouterLink}
                alt="User photo"
                sx={{
                  cursor: 'pointer',
                  width: 64,
                  height: 64,
                }}
                to="/"
                src={user.photoURL}
                mb={2}
              />
            )
            : (
              <Avatar
                component={RouterLink}
                sx={{
                  cursor: 'pointer',
                  width: 64,
                  height: 64,
                }}
                to="/"
              >
                <UserIcon />
              </Avatar>
            )
        }
        {
          user.displayName
          && (
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {user.displayName}
          </Typography>
          )
        }
        {
          user.email
          && (
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.email}
          </Typography>
          )
        }
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false,
};

export default DashboardSidebar;
