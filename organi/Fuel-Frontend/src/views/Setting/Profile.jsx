import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Container, FormControl, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { apiurls } from 'Service/api';

const Profile = () => {
  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required')
  });

  const initialValues = {
    name: '',
    email: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await axios.patch(apiurls?.userUpdate, values);
        console.log(values);
        alert('User data updated successfully');
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profile Details
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="name">Name</InputLabel>
          <TextField
            id="name"
            name="name"
            variant="outlined"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Profile;
