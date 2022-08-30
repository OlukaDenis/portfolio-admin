import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import {
  Box,
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
  Label,
  RemoveRedEyeRounded,
  PhoneIphone,
  Language,
} from '@mui/icons-material';

import {
  capitalizeFirstLetter,
} from '../../utils';

import LoadingProgress from '../LoadingProgress';

const ProjectList = ({
  loading, projects, title, ...rest
}) => {
  // const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const projectState = useSelector((state) => state.projectReducer);
  const { projectLoading } = projectState;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * limit - projects.length) : 0;

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // const navigateToProjects = (event) => navigate('/app/projects');

  const getTypeColor = (status) => {
    let color;
    if (status === 'web') {
      color = 'primary';
    } else if (status === 'mobile') {
      color = 'success';
    } else {
      color = 'default';
    }
    return color;
  };

  const TypeIcon = ({ type }) => (
    <>
      {type === 'web' && <Language />}
      { type === 'mobile' && <PhoneIphone />}
    </>
  );

  // const gotToPrint = (project) => {
  //   if (project.paymentMethod === 'Credit') {
  //     navigate(`/app/projects/print/${project.projectNumber}`);
  //   } else if (project.paymentMethod === 'Lipa Na Mpesa') {
  //     navigate(`/app/projects/${project.projectNumber}`);
  //   }
  // };

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
                  Image
                </TableCell>
                <TableCell>
                  Title
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
                      Year
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Description
                </TableCell>

                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            {projectLoading && <LoadingProgress />}
            { projects.length > 0
            && (
            <TableBody>
              {(limit > 0
                ? projects.slice(page * limit, page * limit + limit)
                : projects
              ).map((project) => (
                <TableRow
                  hover
                  key={project.id}
                >
                  <TableCell>

                    <Avatar
                      alt={project.title}
                      src={project.coverImage}
                      variant="rounded"
                    />

                  </TableCell>
                  <TableCell>
                    {project.title}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="default"
                      label={project.projectYear}
                      size="medium"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={getTypeColor(project.projectType)}
                      label={capitalizeFirstLetter(project.projectType)}
                      size="medium"
                      icon={
                        project.projectType === 'web' ? <Language /> : <PhoneIphone />
                    }
                    />
                  </TableCell>

                  <TableCell>
                    {project.description}
                  </TableCell>

                  <TableCell>
                    <IconButton><RemoveRedEyeRounded sx={{ height: 30, width: 30 }} /></IconButton>
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

      <TablePagination
        component="div"
        count={projects.length}
        page={page}
        colSpan={3}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        SelectProps={{
          inputProps: {
            'aria-label': 'projects per page',
          },
          native: true,
        }}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
      />

    </Card>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProjectList;
