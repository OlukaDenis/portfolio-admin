import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavLink as RouterLink,
} from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Button,
} from '@mui/material';
import {
// Close as CloseIcon,
} from '@mui/icons-material';

import ProjectList from '../components/project/ProjectList';
import {
  fetchProjects,
} from '../store/actions/project.action';

const Dashboard = () => {
  const dispatch = useDispatch();
  const projectReducer = useSelector((state) => state.projectReducer);
  const { projects } = projectReducer;
  console.log('Projects: ', projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <>

      <Helmet>
        <title>Home | Portfolio dashboard</title>
      </Helmet>
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
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <Button
                component={RouterLink}
                variant="contained"
                sx={{ marginBottom: 3 }}
                to="/app/newProject"
              >
                New Project
              </Button>
            </Grid>

            <Grid
              item
              lg={8}
              md={12}
              xl={12}
              xs={12}
            >
              <ProjectList projects={projects} title="Projects" />

            </Grid>

          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
