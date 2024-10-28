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

const SavingList = (props) => {
  const { open, handleClose, fetchSavingData } = props;

  // const userid = localStorage.getItem('user_id');

  // -----------  validationSchema
  const validationSchema = yup.object({
    bank: yup.string().required('Bank Description is required'),
    amount: yup.string().required('Amount is required'),
    note: yup.string().required('Note is required'),
    pass_code: yup.string().required('PassCode is required')
  });

  // -----------   initialValues
  const initialValues = {
    bank: '',
    amount: '',
    note: '',
    pass_code: ''
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(apiurls?.addSaving, values);

        console.log('API response:', response.data);
        if (response.data == 'internal server error') {
          toast.error('Something Went Wrong', { autoClose: 600 });
        } else {
          toast.success('data saved successfully', { autoClose: 600 });
          formik.resetForm();
          handleClose();
          await fetchSavingData();
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
              Basic Information
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Bank Desc</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="bank"
                    name="bank"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.bank || ''}
                    onChange={formik.handleChange}
                    error={formik.touched.bank && Boolean(formik.errors.bank)}
                    helperText={formik.touched.bank && formik.errors.bank}
                  >
                    <MenuItem value="SBI">SBI</MenuItem>
                    <MenuItem value="UCO">UCO </MenuItem>
                    <MenuItem value="INDIAN">INDIAN </MenuItem>
                    <MenuItem value="PNB">PNB </MenuItem>
                    <MenuItem value="OTHERS">OTHERS </MenuItem>
                  </Select>
                  <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.bank && formik.errors.bank}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Amount</FormLabel>
                <TextField
                  id="amount"
                  name="amount"
                  size="small"
                  fullWidth
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Comment</FormLabel>
                <TextField
                  id="note"
                  name="note"
                  size="small"
                  fullWidth
                  value={formik.values.note}
                  onChange={formik.handleChange}
                  error={formik.touched.note && Boolean(formik.errors.note)}
                  helperText={formik.touched.note && formik.errors.note}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>IFSC_CODE</FormLabel>
                <TextField
                  id="pass_code"
                  name="pass_code"
                  size="small"
                  fullWidth
                  value={formik.values.pass_code}
                  onChange={formik.handleChange}
                  error={formik.touched.pass_code && Boolean(formik.errors.pass_code)}
                  helperText={formik.touched.pass_code && formik.errors.pass_code}
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

export default SavingList;
