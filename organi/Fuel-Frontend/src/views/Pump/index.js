/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import AddPumps from './AddPump';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';
import { apiurls } from 'Service/api';
import axios from 'axios';
import moment from 'moment';
// ----------------------------------------------------------------------

const Pump = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [pumpData, setPumpData] = useState([]);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchPumpData = async () => {
    try {
      const response = await axios.get(apiurls?.getPump);
      console.log('response=====>>>>>', response);
      console.log(response);
      const data = response.data.map((item) => {
        return {
          pumpCode: item?.code,
          pumpDesc: item?.desc,
          status: item?.status,
          fuelType: item?.fuel.fuel_type,
          avl_qty: item?.avl_qty,

          date: moment(item?.created_at).format('YYYY-MM-DD HH:mm:ss'),
          id: item?._id
        };
      });
      setPumpData(data);
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    }
  };

  useEffect(() => {
    fetchPumpData();
  }, []);

  return (
    <>
      <AddPumps open={openAdd} handleClose={handleCloseAdd} fetchPumpData={fetchPumpData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">PUMP-MANAGEMENT</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Pump
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={pumpData && pumpData}
                columns={[
                  {
                    field: 'pumpCode',
                    headerName: 'PUMP CODE',
                    flex: 1,
                    cellClassName: 'name-column--cell--capitalize'
                  },
                  {
                    field: 'pumpDesc',
                    headerName: 'PUMP DESC',
                    flex: 1,
                    cellClassName: 'name-column--cell--capitalize'
                  },
                  {
                    field: 'avl_qty',
                    headerName: 'AVAILABLE QTY ',
                    flex: 1,
                    cellClassName: 'name-column--cell--capitalize'
                  },
                  {
                    field: 'fuelType',
                    headerName: 'FUEL TYPE',
                    flex: 1,
                    cellClassName: 'name-column--cell--capitalize'
                  },
                  {
                    field: 'date',
                    headerName: 'DATE',
                    flex: 1,
                    cellClassName: 'name-column--cell--capitalize'
                  }
                  // {
                  //   field: 'status',
                  //   headerName: 'STATUS',
                  //   flex: 1,
                  //   cellClassName: 'name-column--cell--capitalize'
                  // },
                  // {
                  //   field: 'action',
                  //   headerName: 'ACTION',
                  //   flex: 1,
                  //   cellClassName: 'name-column--cell--capitalize',
                  //   renderCell: (params) => (
                  //     <IconButton color="primary">
                  //       <EditIcon />
                  //     </IconButton>
                  //   )
                  // }
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

export default Pump;
