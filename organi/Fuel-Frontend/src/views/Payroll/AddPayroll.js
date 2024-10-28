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
import { fetchStaffRecords, savePayrollDetails } from './payrollApi';
import { useEffect, useState } from 'react';

const PayrollData = (props) => {
  const { open, handleClose, fetchPayrollDetails } = props;
  const [staff, setStaff] = useState([]);
  const [payroll, setPayroll] = useState([]);
  // const [selectedStaff, setSelectedStaff] = useState('');

  const validationSchema = yup.object({
    staff: yup.string().required('Staff is required'),
    basic_salary: yup.number().required('Basic Salary is required'),
    allowances: yup.number().required('Total Allowances is required'),
    tds: yup.number().required('TDS is required')
  });

  const initialValues = {
    staff: '',
    basic_salary: '',
    allowances: '',
    tds: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('leadValues', values);
      const response = await savePayrollDetails(values);
      if (response.data == 'internal server error') {
        toast.error(response.data);
      } else {
        toast.success('PayRoll added successfully', { autoClose: 600 });
        formik.resetForm();
        handleClose();
        fetchPayrollDetails();
      }
    }
  });

  const fetchStaffDetails = async () => {
    try {
      const staffData = await fetchStaffRecords();

      const data = staffData.data.map((item) => ({
        name: item?.full_name,
        id: item?._id
      }));
      setStaff(data);
    } catch (error) {
      toast.error('something went wrong');
    }
  };

  useEffect(() => {
    fetchStaffDetails();
  }, []);

  // const handleStaffChange = (event) => {
  //   setSelectedStaff(event.target.value);
  //   formik.setFieldValue('staff', event.target.value);
  // };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" style={{ marginLeft: '180px' }}>
            Add New Payroll
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                <h1>Enter Payroll Details</h1>
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Staff</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
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
                      {staff &&
                        staff.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.staff && formik.errors.staff}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Basic Salary</FormLabel>
                  <TextField
                    id="basic_salary"
                    name="basic_salary"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.basic_salary}
                    onChange={formik.handleChange}
                    error={formik.touched.basic_salary && Boolean(formik.errors.basic_salary)}
                    helperText={formik.touched.basic_salary && formik.errors.basic_salary}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Total Allowances</FormLabel>
                  <TextField
                    id="allowances"
                    name="allowances"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.allowances}
                    onChange={formik.handleChange}
                    error={formik.touched.allowances && Boolean(formik.errors.allowances)}
                    helperText={formik.touched.allowances && formik.errors.allowances}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Tax Deducted at Source (TDS) </FormLabel>
                  <TextField
                    id="tds"
                    name="tds"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.tds}
                    onChange={formik.handleChange}
                    error={formik.touched.tds && Boolean(formik.errors.tds)}
                    helperText={formik.touched.tds && formik.errors.tds}
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

export default PayrollData;
