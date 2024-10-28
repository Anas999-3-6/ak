/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Palette from '../../ui-component/ThemePalette';
import axios from 'axios';
import { apiurls } from 'Service/api';

const AddDuty = (props) => {
  const { open, handleClose, fetchAssignData } = props;
  const [pumpData, setPumpData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [fuelData, setFuelData] = useState([]);

  // Validation Schema
  const validationSchema = yup.object({
    pump: yup.string().required('Pump is required'),
    fuel: yup.string().required('Fuel is required'),
    price: yup.string().required('Price is required'),
    current_reading: yup.string().required('Current Reading is required'),
    staff: yup.string().required('assign is required')
  });

  // Initial Values
  const initialValues = {
    pump: '',
    fuel: '',
    price: '',
    current_reading: '',
    staff: ''
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(apiurls?.addDuty, values);
        if (response.data == 'internal server error') {
          toast.error('Something Went Wrong', { autoClose: 600 });
        } else {
          toast.success('data saved successfully', { autoClose: 600 });
          formik.resetForm();
          handleClose();
          await fetchAssignData();
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
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" style={{ marginLeft: '180px' }}>
            Ajoutez une shift
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Selectionner la pomp </FormLabel>
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
                  <FormLabel>Fuel Type</FormLabel>
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
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>prix du jour</FormLabel>
                  <TextField
                    id="price"
                    name="price"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Serie du jour</FormLabel>
                  <TextField
                    id="current_reading"
                    name="current_reading"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.current_reading || ''}
                    onChange={formik.handleChange}
                    error={formik.touched.current_reading && Boolean(formik.errors.current_reading)}
                    helperText={formik.touched.current_reading && formik.errors.current_reading}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>respopn</FormLabel>
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
                  <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.assign && formik.errors.assign}</FormHelperText>
                </Grid>
              </Grid>
            </DialogContentText>

            <DialogActions>
              <Button type="submit" variant="contained" style={{ textTransform: 'capitalize' }} color="secondary">
                Save
              </Button>
              <Button
                type="reset"
                variant="outlined"
                style={{ textTransform: 'capitalize' }}
                onClick={() => {
                  formik.resetForm();
                  handleClose();
                }}
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

export default AddDuty;
