import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import {
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TransactionLogs from '../components/logs/TransactionLogs';
import { fetchSuccessLogs } from '../store/actions/logs.action';

const Logs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSuccessLogs());
  }, [dispatch]);

  const logState = useSelector((state) => state.logReducer);
  const { successLogs, loading } = logState;
  console.log('State: ', logState);

  return (
    <>
      <Helmet>
        <title>Transaction Logs | Rewot dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <TransactionLogs logs={successLogs} loading={loading} title="Logs" />
      </Box>
    </>
  );
};

export default Logs;
