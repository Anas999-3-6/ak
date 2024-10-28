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
import { useEffect, useState } from 'react';
import { apiurls } from 'Service/api';
import axios from 'axios';
import moment from 'moment';

const ViewOrderHistory = () => {
  const [orderData, setOrderData] = useState([]);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(apiurls?.getOrder);
      console.log(response);
      const data = response.data.map((item) => {
        return {
          fuelType: item?.fuel.fuel_type,
          totalLitersSupplied: item?.liters,
          cost: item?.cost,
          supplier: item?.supplier.name,
          pump: item?.pump.code,
          date: moment(item?.created_at).format('YYYY-MM-DD HH:mm:ss'),
          id: item?._id
        };
      });
      setOrderData(data);
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    }
  };
  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div>
      <DialogContent dividers>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
            <Typography style={{ marginBottom: '15px' }} variant="h6">
              <h1>ORDER HISTORY DETAILS</h1>
            </Typography>{' '}
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
              <Button variant="contained" component={Link} to="/managment/Fuel">
                BACK
              </Button>
            </Stack>
          </Stack>
          <TableStyle>
            <Box width="100%">
              <Card style={{ height: '600px', paddingTop: '15px' }}>
                <DataGrid
                  rows={orderData && orderData}
                  columns={[
                    {
                      field: 'fuelType',
                      headerName: 'FUEL TYPE',
                      flex: 1,
                      cellClassName: 'name-column--cell name-column--cell--capitalize',
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
                      field: 'pump',
                      headerName: 'PUMP',
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
                  ]}
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

export default ViewOrderHistory;
