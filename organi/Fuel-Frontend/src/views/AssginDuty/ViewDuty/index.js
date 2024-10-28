/* eslint-disable react/prop-types */
import React from 'react';
import { Button, DialogContent, DialogContentText, Typography, Stack, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TableStyle from '../../../ui-component/TableStyle';
import { Link } from 'react-router-dom';

const ViewDuty = () => {
  const fuelData = [
    {
      id: 1,
      attendant: 'ADMEOL',
      fuel: 'PETROL',
      pump: 'COMBO X',
      priceL: '165.00/ltrs',
      litersSold: '600.00Ltrs',
      totalAmount: '40,000,.00',
      date: 'Wed 2nd March, 2022'
    }
  ];

  const columns = [
    {
      field: 'attendant',
      headerName: 'AttENDANT',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'fuel',
      headerName: 'FUEL',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'pump',
      headerName: 'PUMP',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'priceL',
      headerName: 'PRICE/L',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center'
    },

    {
      field: 'litersSold',
      headerName: 'LITERS SOLD',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'totalAmount',
      headerName: 'TOTAL AMOUNT',
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
              <h1>voir lhiqtorique des ventes</h1>
            </Typography>{' '}
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
              <Button variant="contained" component={Link} to="/management/assignDuty">
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

export default ViewDuty;
