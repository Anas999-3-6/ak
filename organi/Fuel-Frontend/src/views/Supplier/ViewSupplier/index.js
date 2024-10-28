/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button,
  // Dialog,
  // DialogActions,
  DialogContent,
  DialogContentText,
  // DialogTitle,
  // FormControl,
  // FormHelperText,
  // FormLabel,
  // Grid,
  // InputAdornment,
  // MenuItem,
  // OutlinedInput,
  // Radio,
  // RadioGroup,
  // Rating,
  // Select,
  // TextField,
  Typography,
  Stack,
  Box,
  Card
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TableStyle from '../../../ui-component/TableStyle';
import { Link } from 'react-router-dom';

const ViewSupplierlHistory = () => {
  const validationSchema = yup.object({
    // Your validation schema here
  });

  const initialValues = {
    // Your initial values here
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('leadValues', values);
      toast.success('Lead added successfully');
    }
  });

  const fuelData = [
    {
      id: 1,
      fuelType: 'Petrol',
      totalLitersSupplied: '1,930.00 Liters',
      cost: '40,000,.00',
      supplier: 'Adeola',
      date: 'Wed 2nd March, 2022'
    }
  ];

  const columns = [
    {
      field: 'fuelType',
      headerName: 'FUEL TYPE',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'totalLitersSupplied',
      headerName: 'TOTAL LITERS SUPPLIED',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'cost',
      headerName: 'COST',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'supplier',
      headerName: 'SUPPLIER',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'date',
      headerName: 'DATE',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center'
    }
  ];

  return (
    <div>
      <DialogContent dividers>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
            <Typography style={{ marginBottom: '15px' }} variant="h6">
              <h1>SUPPLIER HISTORY DETAILS</h1>
            </Typography>{' '}
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
              <Button variant="contained" component={Link} to="/hrms/supplier">
                BACK
              </Button>
            </Stack>
          </Stack>
          <TableStyle>
            <Box width="100%">
              <Card style={{ height: '600px', paddingTop: '15px' }}>
                <DataGrid
                  rows={fuelData}
                  columns={columns}
                  getRowId={(row) => row.id}
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{ toolbar: { showQuickFilter: true } }}
                />
              </Card>
            </Box>
          </TableStyle>
        </DialogContentText>
      </DialogContent>
    </div>
  );
};

export default ViewSupplierlHistory;
