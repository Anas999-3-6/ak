/* eslint-disable react/prop-types */
import React from 'react';
import { Button, DialogContent, DialogContentText, Typography, Stack, Box, Card } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TableStyle from '../../../ui-component/TableStyle';
import { Link } from 'react-router-dom';

const ViewCreditorHistory = () => {
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
              <h1>PURCHASES HISTORY DETAILS</h1>
            </Typography>{' '}
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
              <Button variant="contained" component={Link} to="/hrms/cred">
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

export default ViewCreditorHistory;
