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

const CreditorsData = (props) => {
  const { open, handleClose, fetchCreditorData } = props;

  const validationSchema = yup.object({
    type: yup.string().required('Type is required'),
    name: yup.string().required(' Name is required'),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number is invalid')
      .required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    office_address: yup.string().required('Address is required')
  });

  const initialValues = {
    type: '',
    name: '',
    phone: '',
    email: '',
    office_address: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(apiurls?.addCreditor, values);

        console.log('API response:', response.data);
        if (response.data == 'internal server error') {
          toast.error('Something Went Wrong', { autoClose: 600 });
        } else {
          toast.success('data saved successfully', { autoClose: 600 });
          formik.resetForm();
          handleClose();
          await fetchCreditorData();
        }
      } catch (error) {
        console.error('Error SavingData:', error);
        toast.error('Failed to add SavingData', { autoClose: 600 });
      }
    }
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" style={{ marginLeft: '180px' }}>
            Add New Creditor
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                <h1>Enter Creditor Details</h1>
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>TYPE</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="type"
                      name="type"
                      label=""
                      size="small"
                      fullWidth
                      value={formik.values.type || ''}
                      onChange={formik.handleChange}
                      error={formik.touched.type && Boolean(formik.errors.type)}
                      helperText={formik.touched.type && formik.errors.type}
                    >
                      <MenuItem value="individual">Individual</MenuItem>
                      <MenuItem value="government">Government </MenuItem>
                      <MenuItem value="company">Company</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.type && formik.errors.type}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Full Name</FormLabel>
                  <TextField
                    id="name"
                    name="name"
                    size="small"
                    type="string"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    id="email"
                    name="email"
                    size="small"
                    type="string"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Phone Number</FormLabel>
                  <TextField
                    id="phone"
                    name="phone"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Office Address</FormLabel>
                  <TextField
                    id="office_address"
                    name="office_address"
                    size="small"
                    type="string"
                    fullWidth
                    value={formik.values.office_address}
                    onChange={formik.handleChange}
                    error={formik.touched.office_address && Boolean(formik.errors.office_address)}
                    helperText={formik.touched.office_address && formik.errors.office_address}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
            <DialogActions>
              <Button variant="contained" color="primary" type="submit">
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

export default CreditorsData;
