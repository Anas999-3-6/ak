/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { apiurls } from 'Service/api';
import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { toast } from 'react-toastify';
import Palette from '../../ui-component/ThemePalette';

const SalesData = (props) => {
  const { open, handleClose, fetchSalesData } = props;
  const [pumpData, setPumpData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [fuelData, setFuelData] = useState([]);

  // const userid = localStorage.getItem('user_id');

  // -----------  validationSchema
  const validationSchema = yup.object({
    liter: yup.string().required('Liter is required'),
    pump: yup.string().required('Pump is required'),
    fuel: yup.string().required('Fuel is required'),
    staff: yup.string().required('Staff is required')
  });

  // -----------   initialValues
  const initialValues = {
    liter: '',
    amount: '',
    pump: '',
    fuel: '',
    staff: ''
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(apiurls?.addSales, values);
        console.log(response);
        console.log('API response:', response.data);
        if (response.data == 'internal server error') {
          toast.error('Something Went Wrong', { autoClose: 600 });
        } else if (response.data == 'fuel not available') {
          toast.error('No Enough Fuel ');
        } else {
          toast.success('data saved successfully', { autoClose: 600 });
          formik.resetForm();
          handleClose();
          await fetchSalesData();
        }
      } catch (error) {
        console.error('Error SavingData:', error);
        toast.error('Failed to add SavingData', { autoClose: 600 });
      }
    }
  });
  const fetchStaffData = async () => {
    try {
      const response = await axios.get(apiurls?.getStaff);
      const data = response.data.map((item) => ({
        name: item?.full_name,
        id: item?._id
      }));
      setStaffData(data);
    } catch (error) {
      console.error('Error fetching supplier data:', error);
    }
  };
  const fetchPumpData = async () => {
    try {
      const response = await axios.get(apiurls?.getPump);
      const data = response.data.map((item) => ({
        name: item?.code,
        id: item?._id
      }));
      setPumpData(data);
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    }
  };
  const fetchFuelData = async () => {
    try {
      const response = await axios.get(apiurls?.fuelList);
      const data = response.data.map((item) => ({
        name: item?.fuel_type,
        id: item?._id
      }));
      setFuelData(data);
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    }
  };
  useEffect(() => {
    fetchPumpData();
    fetchStaffData();
    fetchFuelData();
  }, []);

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Add New </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <Typography style={{ marginBottom: '15px' }} variant="h6">
              Basic Sales Information
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>PUMP</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="pump"
                    name="pump"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.pump || ''}
                    onChange={formik.handleChange}
                    error={formik.touched.pump && Boolean(formik.errors.pump)}
                    helperText={formik.touched.pump && formik.errors.pump}
                  >
                    {pumpData &&
                      pumpData.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.pump && formik.errors.pump}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>FUEL</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="fuel"
                    name="fuel"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.fuel}
                    onChange={formik.handleChange}
                    error={formik.touched.fuel && Boolean(formik.errors.fuel)}
                  >
                    {fuelData &&
                      fuelData.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.fuel && formik.errors.fuel}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>EMPLOYEE</FormLabel>
                  <Select
                    id="staff"
                    name="staff"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.staff || ''}
                    onChange={formik.handleChange}
                    error={formik.touched.staff && Boolean(formik.errors.staff)}
                    helperText={formik.touched.staff && formik.errors.staff}
                  >
                    {staffData &&
                      staffData.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.staff && formik.errors.staff}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>AMOUNT</FormLabel>
                <TextField
                  id="amount"
                  name="amount"
                  type="number"
                  size="small"
                  fullWidth
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>LITER_SOLD</FormLabel>
                <TextField
                  id="liter"
                  name="liter"
                  type="number"
                  size="small"
                  fullWidth
                  value={formik.values.liter}
                  onChange={formik.handleChange}
                  error={formik.touched.liter && Boolean(formik.errors.liter)}
                  helperText={formik.touched.liter && formik.errors.liter}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button type="submit" variant="contained" style={{ textTransform: 'capitalize' }}>
                Save
              </Button>
              <Button
                type="reset"
                variant="outlined"
                style={{ textTransform: 'capitalize' }}
                color="error"
                onClick={() => {
                  formik.resetForm();
                  handleClose();
                }}
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

export default SalesData;
