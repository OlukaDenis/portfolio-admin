import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Grid,
  Box,
  Button,
  Container,
  Link,
  InputLabel,
  Select,
  TextField,
  FormControl,
  Chip,
  Typography,
  Alert,
  OutlinedInput,
  Avatar,
  MenuItem,
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import {
  saveNewProject,
} from '../store/actions/project.action';
import {
  capitalizeFirstLetter,
} from '../utils';

const tags = [
  'Web',
  'Mobile',
  'Android',
  'Retrofit',
  'Kotlin',
  'Java',
  'Datastore',
  'Room',
  'Mobile Money',
  'Mpesa',
  'Realtime Database',
  'Coroutines',
  'RxJava',
  'MVVM',
  'Jetpack',
  'Firestore',
  'GCP',
  'Clean Architecture',
  'React',
  'Redux',
  'Javascript',
  'NodeJs',
  'Google Play',
  'Ruby',
  'HTML/CSS',
  'Canvas',
  'PhaserJs',
];

const years = [
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
];

const types = [
  'mobile',
  'web',
  'hybrid',
  'desktop',
];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const NewProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.projectReducer);
  const { success, error } = authState;

  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  const submitForm = async (values) => {
    if (!image) {
      setImageError(true);
      return;
    }

    const result = await dispatch(saveNewProject(values, imageFile));
    if (result) {
      navigate('/');
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImageFile(img);
      setImage(URL.createObjectURL(img));
      setImageError(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>New Project | Portfolio Dashboard</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center',
          py: 3,
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              title: '',
              description: '',
              tags: [],
              liveUrl: '',
              codeUrl: '',
              projectType: '',
              projectYear: '',
            }}
            validationSchema={
                Yup.object().shape({
                  title: Yup.string().required('Title is required'),
                  description: Yup.string().required('Description is required'),
                  tags: Yup.array().of(
                    Yup.string().required('Tag required'),
                  ),
                  liveUrl: Yup.string().optional(),
                  codeUrl: Yup.string().optional(),
                  projectType: Yup.string().required('Type required'),
                  projectYear: Yup.string().required('Year required'),
                })
          }
            onSubmit={submitForm}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new project
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Fill in the fields
                  </Typography>
                </Box>

                <Grid
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Title"
                      name="title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.title}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Project Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.projectType}
                        label="Project Type"
                        name="projectType"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.projectType && errors.projectType)}
                        helperText={touched.projectType && errors.projectType}
                      >
                        {types.map((year) => (
                          <MenuItem
                            key={year}
                            value={year}
                          >
                            {capitalizeFirstLetter(year)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Year</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.projectYear}
                        label="Year"
                        name="projectYear"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.projectYear && errors.projectYear)}
                        helperText={touched.projectYear && errors.projectYear}
                      >
                        {years.map((year) => (
                          <MenuItem
                            key={year}
                            value={year}
                          >
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Live URL (optional)"
                      name="liverUrl"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.liverUrl}
                      error={Boolean(touched.liverUrl && errors.liverUrl)}
                      helperText={touched.liverUrl && errors.liverUrl}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Code URL (optional)"
                      name="codeUrl"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.codeUrl}
                      error={Boolean(touched.codeUrl && errors.codeUrl)}
                      helperText={touched.codeUrl && errors.codeUrl}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                  >

                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        name="tags"
                        onBlur={handleBlur}
                        value={values.tags}
                        onChange={handleChange}
                        error={Boolean(touched.tags && errors.tags)}
                        helperText={touched.tags && errors.tags}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {tags.map((tag) => (
                          <MenuItem
                            key={tag}
                            value={tag}
                          >
                            {tag}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={4}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                  >

                    {
                        imageError && (
                        <Alert variant="filled" severity="error">
                          Please select image
                        </Alert>
                        )
                    }

                    {
                        image ? (
                          <Avatar
                            variant="rounded"
                            alt="User photo"
                            sx={{
                              cursor: 'pointer',
                              width: 200,
                              height: 200,
                            }}
                            to="/"
                            src={image}
                            mb={2}
                          />
                        )
                          : (
                            <Avatar
                              variant="rounded"
                              sx={{
                                cursor: 'pointer',
                                width: 200,
                                height: 200,
                              }}
                              to="/"
                            >
                              <PhotoCameraIcon />
                            </Avatar>
                          )
                      }
                    <Box sx={{ marginTop: 2 }}>
                      <Button
                        variant="contained"
                        size="small"
                        component="label"
                      >
                        Pick Image
                        <input
                          accept="image/*"
                          type="file"
                          onChange={onImageChange}
                          hidden
                        />
                      </Button>
                    </Box>
                  </Grid>

                </Grid>

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Save Project
                  </Button>
                </Box>

              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default NewProject;
