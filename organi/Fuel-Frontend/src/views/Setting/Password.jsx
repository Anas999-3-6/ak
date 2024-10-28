import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Container, FormControl, InputLabel, TextField, Typography } from '@mui/material';

const validationSchema = yup.object({
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const Password = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Profile Settings Values:', values);
    }
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profile Password
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default Password;
