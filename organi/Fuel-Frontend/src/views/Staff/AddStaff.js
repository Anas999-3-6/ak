/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Palette from '../../ui-component/ThemePalette';
import axios from 'axios';
import { apiurls } from 'Service/api';

const AddPolicy = (props) => {
  const { open, handleClose, getStaff } = props;

  const validationSchema = yup.object({
    designation: yup.string().required('Designation Type is required'),
    full_name: yup.string().required('Name is required'),
    address: yup.string().required('address is required'),
    qualification: yup.string().required('Qualification is required'),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number is invalid')
      .required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required')
  });

  const initialValues = {
    designation: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    qualification: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('values', values);
      const data = await axios.post(apiurls?.saveStaff, values);
      if (data.data == 'internal server error') {
        toast.error(data.data);
      } else {
        await getStaff();
        toast.success('Staff Add successfully', { autoClose: 600 });
        handleClose();
        formik.resetForm();
      }
    }
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h3">ENTER STAFF DETAILS </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                Staff Details
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Designation</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="designation"
                      name="designation"
                      size="small"
                      fullWidth
                      value={formik.values.designation || ''}
                      onChange={formik.handleChange}
                      error={formik.touched.designation && Boolean(formik.errors.designation)}
                      helperText={formik.touched.designation && formik.errors.designation}
                    >
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Attendant">Attendant</MenuItem>
                      <MenuItem value="Messenger">Messenger</MenuItem>
                      <MenuItem value="Security">Security</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.designation && formik.errors.designation}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Full Name</FormLabel>
                  <TextField
                    name="full_name"
                    type="string"
                    size="small"
                    fullWidth
                    value={formik.values.full_name}
                    onChange={formik.handleChange}
                    error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                    helperText={formik.touched.full_name && formik.errors.full_name}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Phone Number</FormLabel>
                  <TextField
                    name="phone"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    size="small"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Address</FormLabel>
                  <TextField
                    id="address"
                    name="address"
                    type="string"
                    size="small"
                    fullWidth
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Qualification</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="qualification"
                      name="qualification"
                      size="small"
                      fullWidth
                      value={formik.values.qualification || ''}
                      onChange={formik.handleChange}
                      error={formik.touched.qualification && Boolean(formik.errors.qualification)}
                      helperText={formik.touched.qualification && formik.errors.qualification}
                    >
                      <MenuItem value="UNDER-GRADUATION">UNDER-GRADUATION</MenuItem>
                      <MenuItem value="POST-GRADUATION">POST-GRADUATION</MenuItem>
                      <MenuItem value="MASTERS">MASTERS</MenuItem>
                      <MenuItem value="INTER">INTER</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.qualification && formik.errors.qualification}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
            <DialogActions>
              <Button onClick={formik.handleSubmit} variant="contained" color="primary">
                Save
              </Button>
              <Button
                onClick={() => {
                  formik.resetForm();
                  handleClose();
                }}
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPolicy;
