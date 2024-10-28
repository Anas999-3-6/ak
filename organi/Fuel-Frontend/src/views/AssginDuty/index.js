/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddDuty from './AddDuty';
import { Visibility } from '@mui/icons-material';
import Iconify from '../../ui-component/iconify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { apiurls } from 'Service/api';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import ViewDuty from './ViewDuty/index';
import moment from 'moment';
// ----------------------------------------------------------------------

const MainDuty = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [assignData, setAssignData] = useState([]);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchAssignData = async () => {
    try {
      const response = await axios.get(apiurls?.getDuty);
      console.log(response);
      const data = response.data.map((item) => {
        return {
          attendant: item?.staff.full_name,
          fuel: item?.fuel.fuel_type,
          pumpNo: item?.pump.code,
          price: item?.fuel.liter_price,
          date: moment(item?.created_at).format('YYYY-MM-DD HH:mm:ss'),
          id: item?._id
        };
      });
      setAssignData(data);
    } catch (error) {
      console.error('Error fetching AssignDuty data:', error);
    }
  };

  useEffect(() => {
    fetchAssignData();
  }, []);

  return (
    <>
      <AddDuty open={openAdd} handleClose={handleCloseAdd} fetchAssignData={fetchAssignData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Assign Duty List</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Meter Allocation
            </Button>
            { <Button
              variant="contained"
              startIcon={<Visibility />}
              component={Link}
              to="/OrderDuty/orderCum"
              style={{ backgroundColor: '#673AB7 ' }}
            >
              Voire lhistorique des ventes
            </Button>}
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={assignData && assignData}
                columns={[
                  {
                    field: 'attendant',
                    headerName: 'ATTENDANT-DESIGNATION',
                    flex: 1,
                    cellClassName: ' name-column--cell--capitalize'
                  },

                  {
                    field: 'fuel',
                    headerName: 'FUEL',
                    flex: 1
                  },
                  {
                    field: 'pumpNo',
                    headerName: 'PUMP NO',
                    flex: 1
                  },
                  {
                    field: 'price',
                    headerName: 'PRICE/L',
                    flex: 1
                  },
                  {
                    field: 'beforeSales',
                    headerName: '(BEFORE SALES)',
                    flex: 1,
                    cellClassName: 'name-column--cell--capitalize'
                  },
                  {
                  field: 'afterSales',
                  headerName: '(AFTER SALES )	',
                  flex: 1
                  },
                  {
                  field: 'soldLiters',
                  headerName: 'SOLD(LTRS)',
                  flex: 1
                  },
                  {
                  field: 'amount',
                  headerName: 'AMOUNT',
                  flex: 1
                  },
                  {
                    field: 'date',
                    headerName: 'DATE',
                    flex: 1
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

export default MainDuty;
