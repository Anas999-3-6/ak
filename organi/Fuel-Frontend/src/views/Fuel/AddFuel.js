import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { apiurls } from 'Service/api';
import { toast } from 'react-toastify';

const AddLead = (props) => {
  const { open, handleClose } = props;
  const [fuelData, setFuelData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [pumpData, setPumpData] = useState([]);

  const validationSchema = yup.object({
    fuel: yup.string().required('Fuel Type is required'),
    supplier: yup.string().required('Supplier Name is required'),
    cost: yup.string().required('Cost is required'),
    liters: yup.string().required('Liters is required'),
    pump: yup.string().required('Pump is required')
  });

  const initialValues = {
    fuel: '',
    supplier: '',
    cost: '',
    liters: '',
    pump: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('Form submitted with values: ', values);
      try {
        const response = await axios.post(apiurls?.addOrder, values);

        console.log('API response:', response.data);
        toast.success('Order added successfully', { autoClose: 600 });
        formik.resetForm();
        handleClose();
      } catch (error) {
        console.error('Error adding order:', error);
        toast.error('Failed to add Order', { autoClose: 600 });
      }
    }
  });

  const fetchSupplierData = async () => {
    try {
      const response = await axios.get(apiurls?.supplierList);

      const data = response.data.map((item) => ({
        supplier: item?.name,
        id: item?._id
      }));
      setSupplierData(data);
    } catch (error) {
      console.error('Error fetching supplier data:', error);
    }
  };

  const fetchFuelData = async () => {
    try {
      const response = await axios.get(apiurls?.fuelList);
      const data = response.data.map((item) => ({
        name: item?.fuel_type,
        qty: item?.litres,
        status: item?.status,
        id: item?._id
      }));
      setFuelData(data);
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    }
  };

  // Fetch pump data or use dummy data
  const fetchPumpData = async () => {
    try {
      const response = await axios.get(apiurls?.getPump);
      const data = response.data.map((item) => ({
        name: item?.code,
        id: item?._id
      }));
      const dummyPumps = [
        { name: 'Pump 1', id: '1' },
        { name: 'Pump 2', id: '2' },
        { name: 'Pump 3', id: '3' }
      ];
      setPumpData(data);
    } catch (error) {
      console.log(error);
    }
    // Dummy pump data
  };

  useEffect(() => {
    fetchFuelData();
    fetchSupplierData();
    fetchPumpData();
  }, []);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" style={{ marginLeft: '180px' }}>
            Add New Order
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                <h1>Enter Order Details</h1>
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
                    >
                      {fuelData &&
                        fuelData.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error>{formik.errors.fuel}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Supplier</FormLabel>
                  <Select
                    id="supplier"
                    name="supplier"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.supplier}
                    onChange={formik.handleChange}
                    error={formik.touched.supplier && Boolean(formik.errors.supplier)}
                  >
                    {supplierData &&
                      supplierData.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.supplier}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>{formik.errors.supplier}</FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Total Liters</FormLabel>
                  <TextField
                    id="liters"
                    name="liters"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.liters}
                    onChange={formik.handleChange}
                    error={formik.touched.liters && Boolean(formik.errors.liters)}
                  />
                  <FormHelperText error>{formik.errors.liters}</FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Total Cost</FormLabel>
                  <TextField
                    id="cost"
                    name="cost"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.cost}
                    onChange={formik.handleChange}
                    error={formik.touched.cost && Boolean(formik.errors.cost)}
                  />
                  <FormHelperText error>{formik.errors.cost}</FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Pump</FormLabel>
                  <Select
                    id="pump"
                    name="pump"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.pump}
                    onChange={formik.handleChange}
                    error={formik.touched.pump && Boolean(formik.errors.pump)}
                  >
                    {pumpData &&
                      pumpData.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>{formik.errors.pump}</FormHelperText>
                </Grid>
              </Grid>
            </DialogContentText>
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
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

export default AddLead;
