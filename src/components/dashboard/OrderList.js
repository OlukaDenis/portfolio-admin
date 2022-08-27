import moment from 'moment';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Tooltip,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Label, RemoveRedEyeRounded, ArrowRight,
} from '@mui/icons-material';
import { currencyFormatter } from '../../utils';
import LoadingProgress from '../LoadingProgress';

const OrderList = ({
  loading, orders, title, paginate, ...rest
}) => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const orderState = useSelector((state) => state.orderReducer);
  const { loadingOrders } = orderState;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * limit - orders.length) : 0;

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const navigateToOrders = (event) => navigate('/app/orders');

  const getLabelColor = (status) => {
    let color;
    if (status === 'confirmed') {
      color = 'primary';
    } else if (status === 'delivered') {
      color = 'success';
    } else if (status === 'canceled') {
      color = 'error';
    } else {
      color = 'default';
    }
    return color;
  };

  const paymentColor = (status) => {
    let color;
    if (status === 'Credit') {
      // color = purple.A700;
      color = 'primary';
    } else if (status === 'Lipa Na Mpesa') {
      // color = green.A700;
      color = 'success';
    } else {
      // color = cyan.A700;
      color = 'warning';
    }
    return color;
  };

  const gotToPrint = (order) => {
    if (order.paymentMethod === 'Credit') {
      navigate(`/app/orders/print/${order.orderNumber}`);
    } else if (order.paymentMethod === 'Lipa Na Mpesa') {
      navigate(`/app/orders/${order.orderNumber}`);
    }
  };

  return (
    <Card {...rest}>
      <CardHeader title={title} />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order number
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                {
                  paginate
                  && (
                  <>
                    <TableCell>
                      Status
                    </TableCell>
                    <TableCell>
                      Payment
                    </TableCell>
                  </>
                  )
                }

                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            {loadingOrders && <LoadingProgress />}
            { orders.length > 0
            && (
            <TableBody>
              {(limit > 0
                ? orders.slice(page * limit, page * limit + limit)
                : orders
              ).map((order) => (
                <TableRow
                  hover
                  key={order.orderNumber}
                >
                  <TableCell>
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>
                    {currencyFormatter(order.amount)}
                  </TableCell>
                  <TableCell>
                    {moment(order.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  {
                    paginate && (
                    <>
                      <TableCell>
                        <Chip
                          color={getLabelColor(order.orderStatus)}
                          label={order.orderStatus.toUpperCase()}
                          size="medium"
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          color={paymentColor(order.paymentMethod)}
                          avatar={(
                            <Avatar>
                              <Label />
                            </Avatar>
                          )}
                          label={order.paymentMethod}
                          variant="outlined"
                        />

                      </TableCell>
                    </>
                    )
                  }

                  <TableCell>
                    {
                      (order.paymentMethod === 'Credit' || order.paymentMethod === 'Lipa Na Mpesa')
                      && <IconButton onClick={() => gotToPrint(order)}><RemoveRedEyeRounded sx={{ height: 30, width: 30 }} /></IconButton>
                    }

                    {/* <IconButton onClick={() => goToDetails(order)}><CloudDownload /></IconButton> */}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
              )}
            </TableBody>
            )}
          </Table>
        </Box>
      </PerfectScrollbar>

      {
        paginate ? (
          <TablePagination
            component="div"
            count={orders.length}
            page={page}
            colSpan={3}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            SelectProps={{
              inputProps: {
                'aria-label': 'orders per page',
              },
              native: true,
            }}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
          />
        )
          : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2,
              }}
            >
              <Button
                color="primary"
                endIcon={<ArrowRight />}
                size="small"
                variant="text"
                onClick={navigateToOrders}
              >
                View all
              </Button>
            </Box>
          )
      }

    </Card>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  paginate: PropTypes.bool,
};

export default OrderList;
