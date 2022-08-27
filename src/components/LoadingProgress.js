import { CircularProgress, Box } from '@mui/material';

const LoadingProgress = () => (
  <Box sx={{
    display: 'flex', justifyContent: 'center', paddingTop: 2, paddingBottom: 2,
  }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingProgress;
