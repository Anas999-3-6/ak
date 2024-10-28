/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import Palette from '../../ui-component/ThemePalette';
import axios from 'axios';
import { apiurls } from 'Service/api';
import { toast } from 'react-toastify';
import { FormLabel } from '@mui/material';

const AddPumps = (props) => {
  const { open, handleClose, fetchPumpData } = props;
  const [fuelData, setFuelData] = useState([]);

  // -----------  validationSchema
  const validationSchema = yup.object({
    fuel: yup.string().required('Fuel is required'),
    pump: yup.string().required('Pump is required'),
    desc: yup.string().required(' Pump Desc is required'),
    code: yup.string().required(' Pump Code is required')
  });

  // -----------   initialValues
  const initialValues = {
    fuel: '',
    pump: '',
    desc: '',
    code: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(apiurls?.addPump, values);

        toast.success('Pump added successfully', {
          autoClose: 6000
        });
        formik.resetForm();
        handleClose();
        fetchPumpData();
      } catch (error) {
        console.error('Error adding order:', error);
        toast.error('Failed to add Order');
      }
    }
  });
  const fetchFuelData = async () => {
    try {
      const response = await axios.get(apiurls?.fuelList);

      const data = response.data.map((item) => {
        return {
          name: item?.fuel_type,
          qty: item?.litres,
          status: item?.status,
          id: item?._id
        };
      });
      setFuelData(data);
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    }
  };

  useEffect(() => {
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
          <Typography variant="h3" style={{ marginLeft: '180px' }}>
            Add New Pump{' '}
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                <h1>Enter Pump Details</h1>
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
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
                      helperText={formik.touched.fuel && formik.errors.fuel}
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
                  <FormLabel>Pump Status</FormLabel>
                  <Select
                    id="pump"
                    name="pump"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.pump}
                    onChange={formik.handleChange}
                    error={formik.touched.pump && Boolean(formik.errors.pump)}
                    helperText={formik.touched.pump && formik.errors.pump}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="damaged">Damaged</MenuItem>
                    <MenuItem value="faulty">Faulty</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.pump && formik.errors.pump}</FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Pump Desc</FormLabel>
                  <TextField
                    id="desc"
                    name="desc"
                    size="small"
                    fullWidth
                    value={formik.values.desc}
                    onChange={formik.handleChange}
                    error={formik.touched.desc && Boolean(formik.errors.desc)}
                    helperText={formik.touched.desc && formik.errors.desc}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Pump Code</FormLabel>
                  <TextField
                    id="code"
                    name="code"
                    size="small"
                    type="String"
                    fullWidth
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    error={formik.touched.code && Boolean(formik.errors.code)}
                    helperText={formik.touched.code && formik.errors.code}
                  />
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

export default AddPumps;
