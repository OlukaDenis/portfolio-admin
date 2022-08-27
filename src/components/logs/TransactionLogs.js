import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Tooltip,
} from '@mui/material';

const TransactionLogs = ({
  loading, logs, title, ...rest
}) => {
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(0);
  const [selectedLog, setSelectedLog] = useState({});

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * limit - logs.length) : 0;

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const goToLogDetails = (log) => {
    // navigate(`/app/logs/${log.uid}`);
    const findLog = logs.find((item) => item.uid === log.uid);
    setSelectedLog(findLog);
  };

  return (

    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >

          <Grid
            item
            lg={5}
            sm={6}
            xl={6}
            xs={12}
          >
            <Card {...rest}>
              <CardHeader title={title} />
              <Divider />
              <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          Log number
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

                        <TableCell>
                          Loan Number
                        </TableCell>

                      </TableRow>
                    </TableHead>

                    {/* {loadingOrders && <LoadingProgress />} */}
                    { logs.length > 0
            && (
            <TableBody>
              {(limit > 0
                ? logs.slice(page * limit, page * limit + limit)
                : logs
              ).map((log) => (
                <TableRow
                  hover
                  key={log.uid}
                  onClick={() => goToLogDetails(log)}
                  sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3,
                  }}
                >
                  <TableCell>
                    {log.uid}
                  </TableCell>

                  {/* For transaction dates */}
                  {log.createdAt
                  && (
                  <TableCell>
                    {
                  (log.createdAt) ? log.createdAt : ''
                  }
                  </TableCell>
                  )}

                  {log.updatedLoan
                  && (
                    <TableCell>
                      {
                    (log.updatedLoan.createdAt) ? log.updatedLoan.createdAt : ''
                    }
                    </TableCell>
                  )}

                  {!log.updatedLoan && !log.createdAt
                    && (
                    <TableCell>
                      -
                    </TableCell>
                    )}

                  {/* For Loan numbers */}
                  {log.updatedLoan && log.updatedLoan.loan
                    && (
                    <TableCell>
                      {log.updatedLoan.loan.loanNumber}
                    </TableCell>
                    )}

                  {!log.updatedLoan
                    && (
                    <TableCell>
                      -
                    </TableCell>
                    )}
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

              <TablePagination
                component="div"
                count={logs.length}
                page={page}
                colSpan={3}
                rowsPerPage={limit}
                rowsPerPageOptions={[15, 20, { label: 'All', value: -1 }]}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'Logs per page',
                  },
                  native: true,
                }}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
              />

            </Card>
          </Grid>

          <Grid
            item
            lg={5}
            sm={6}
            xl={6}
            xs={12}
          >
            <Card>
              <CardContent>

                <Box sx={{
                  backgroundColor: '#444',
                  color: 'white',
                  minHeight: '100%',
                  padding: 8,
                }}
                >
                  <div>
                    <pre>
                      <code>
                        {JSON.stringify(selectedLog, null, 2)}
                      </code>
                    </pre>
                  </div>
                </Box>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>

  );
};

TransactionLogs.propTypes = {
  logs: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default TransactionLogs;
