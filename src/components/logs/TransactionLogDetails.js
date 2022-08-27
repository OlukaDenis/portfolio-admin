import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  CardContent,
} from '@mui/material';

const TransactionLogDetails = () => {
  const { id } = useParams();
  const logState = useSelector((state) => state.logReducer);
  const { successLogs } = logState;

  const [selectedLog, setSelectedLog] = useState({});
  console.log('State: ', logState);

  useEffect(() => {
    if (successLogs) {
      const findLog = successLogs.find((log) => log.uid === id);
      setSelectedLog(findLog);
      console.log('Found log: ', findLog);
    }
  }, [id, successLogs]);

  return (

    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >

      <Typography sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 10 }} variant="h4">
        Log number:
        {' '}
        {id}
      </Typography>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
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

TransactionLogDetails.propTypes = {};

export default TransactionLogDetails;
