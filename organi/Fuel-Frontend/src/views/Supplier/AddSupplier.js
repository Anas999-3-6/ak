/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Rating,
  Select,
  TextField
} from '@mui/material';
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
////.............................................////

const SupplierData = (props) => {
  const { open, handleClose, fetchSupplierData } = props;

  const validationSchema = yup.object({
    name: yup.string().required('Company Name is required'),
    supplier_type: yup.string().required('Status  is required'),
    representative: yup.string().required('representative is required'),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number is invalid')
      .required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required('Address is required')
  });

  const initialValues = {
    name: '',
    supplier_type: '',
    representative: '',
    phone: '',
    email: '',
    address: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values, '...................................');
      try {
        const response = await axios.post(apiurls?.addSupplier, values);

        console.log('API response:', response.data);
        if (response.data == 'internal server error') {
          toast.error('Something Went Wrong', { autoClose: 600 });
        } else {
          toast.success('data saved successfully', { autoClose: 600 });
          formik.resetForm();
          handleClose();
          await fetchSupplierData();
        }
      } catch (error) {
        console.error('Error SavingData:', error);
        toast.error('Failed to add SavingData', { autoClose: 600 });
      }
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" style={{ marginLeft: '180px' }}>
            Add New Supplier
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <Typography style={{ marginBottom: '15px' }} variant="h6">
              <h1>Enter Supplier Details</h1>
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Name</FormLabel>
                <TextField
                  labelId="demo-simple-select-label"
                  id="name"
                  name="name"
                  type="string"
                  size="small"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Representative</FormLabel>
                <TextField
                  id="representative"
                  name="representative"
                  type="string"
                  size="small"
                  fullWidth
                  value={formik.values.representative}
                  onChange={formik.handleChange}
                  error={formik.touched.representative && Boolean(formik.errors.representative)}
                  helperText={formik.touched.representative && formik.errors.representative}
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
                <FormLabel>Address</FormLabel>
                <TextField
                  id="address"
                  name="address"
                  size="small"
                  type="string"
                  fullWidth
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
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
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Status</FormLabel>
                <Select
                  id="supplier_type"
                  name="supplier_type"
                  type="string"
                  size="small"
                  fullWidth
                  value={formik.values.supplier_type}
                  onChange={formik.handleChange}
                  error={formik.touched.supplier_type && Boolean(formik.errors.supplier_type)}
                  helperText={formik.touched.supplier_type && formik.errors.supplier_type}
                >
                  <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                  <MenuItem value="PENDING">PENDING</MenuItem>
                  <MenuItem value="TERMINATED">TERMINATED</MenuItem>
                </Select>
                <FormHelperText style={{ color: Palette.error.main }}>
                  {formik.touched.supplier_type && formik.errors.supplier_type}
                </FormHelperText>
              </Grid>
            </Grid>
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

export default SupplierData;
