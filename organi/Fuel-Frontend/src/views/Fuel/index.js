/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddFuel from './AddFuel';
import { Visibility } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ViewOrderHistory from './OverOrderHistory/index'; // Assuming 'OverOrderHistory' is the correct import
import { useEffect } from 'react';
import { apiurls } from 'Service/api';

const Fuel = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [fuelData, setFuelData] = useState([]);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

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
    // Fetch fuel data from the API when the component mounts
    fetchFuelData();
  }, []);
  return (
    <>
      <AddFuel open={openAdd} handleClose={handleCloseAdd} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
          <Typography variant="h4">Fuel-Management</Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add New Order
            </Button>
            <Button
              variant="contained"
              startIcon={<Visibility />}
              component={Link}
              to="/order/ViewOrderHistory"
              style={{ backgroundColor: '#673AB7 ' }}
            >
              View Order History
            </Button>
          </Stack>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={fuelData && fuelData}
                columns={[
                  { field: 'name', headerName: 'FUEL TYPE', flex: 1, cellClassName: 'name-column--cell' },
                  // { field: 'qty', headerName: 'AVAILABLE LITERS', flex: 1, cellClassName: 'name-column--cell' },
                  { field: 'status', headerName: 'STATUS', flex: 1, cellClassName: 'name-column--cell' }
                ]}
                getRowId={(row) => row.id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Fuel;
