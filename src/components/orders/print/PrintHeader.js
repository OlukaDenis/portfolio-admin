import {
  Box,
  Grid,
  Typography,
  Container,
  Avatar,
} from '@mui/material';

const PrintHeader = () => (
  <Container>
    <Grid
      container
      spacing={0}
      direction="row"
      justifyContent="center"
    >
      <Box>
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
        >
          <Box>
            <Avatar
              alt="Rewot banner"
              src="/static/images/rewot_banner.png"
              sx={{ width: 200, height: 100 }}
            />
          </Box>
        </Grid>
        <Typography variant="h4">Onboard for executive solutions</Typography>
      </Box>
    </Grid>

    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Box sx={{ paddingLeft: 8, paddingTop: 4 }}>
          <Typography variant="h6">Keekorok Building No. 30, 1ST FLR</Typography>
          <Typography variant="h6">P.O Box 15043-00400 </Typography>
          <Typography variant="h6">Nairobi, Kenya</Typography>
        </Box>

      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box sx={{ paddingRight: 8, paddingTop: 4 }}>
            <Typography variant="h6">Contacts: +254 714399646</Typography>
            <Typography variant="h6">Email: sales@rewotafrica.co.ke</Typography>
            <Typography variant="h6">Website: www.rewotafrica.co.ke</Typography>
          </Box>

        </Grid>
      </Grid>
    </Grid>
  </Container>
);

export default PrintHeader;
