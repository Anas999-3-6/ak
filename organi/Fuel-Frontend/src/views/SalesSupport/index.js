/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Button, DialogContent, DialogContentText, Typography, Stack, Box, Card, Container } from '@mui/material';
import Iconify from '../../ui-component/iconify';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TableStyle from '../../ui-component/TableStyle';
import SalesData from './AddSales';
import { apiurls } from 'Service/api';
import axios from 'axios';
import moment from 'moment';

const SalesManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get(apiurls?.getSales);
      console.log(response);
      const data = response.data.map((item) => {
        return {
          attendant: item?.staff.full_name,
          fuel: item?.fuel.fuel_type,
          pump: item?.pump.code,
          date: moment(item?.created_at).format('YYYY-MM-DD HH:mm:ss'),
          priceL: item?.fuel.liter_price,
          litersSold: item?.liter,
          totalAmount: item?.fuel.liter_price * item.liter,
          id: item?._id
        };
      });
      setSalesData(data);
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <>
      <SalesData open={openAdd} handleClose={handleCloseAdd} fetchSalesData={fetchSalesData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Sales-Management</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add Sales
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={salesData && salesData}
                columns={[
                  {
                    field: 'attendant',
                    headerName: 'ATTENDANT',
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

export default SalesManagement;
