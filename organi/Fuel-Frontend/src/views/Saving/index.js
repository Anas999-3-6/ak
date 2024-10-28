/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import moment from 'moment';
// @mui
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import SavingList from './AddSaving.js';
import { apiurls } from 'Service/api';
import axios from 'axios';

// ----------------------------------------------------------------------

const SavingData = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [savingData, setSavingData] = useState([]);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchSavingData = async () => {
    try {
      const response = await axios.get(apiurls?.getSaving);
      console.log(response);
      const data = response.data.map((item) => {
        return {
          amount: item?.amount,
          bankDesc: item?.bank,
          status: item?.status,
          shortNote: item?.note,
          date: moment(item?.created_at).format('YYYY-MM-DD HH:mm:ss'),
          id: item?._id
        };
      });
      setSavingData(data);
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    }
  };

  useEffect(() => {
    fetchSavingData();
  }, []);

  return (
    <>
      <SavingList open={openAdd} handleClose={handleCloseAdd} fetchSavingData={fetchSavingData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Saving-Management</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Bank Saving
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={savingData && savingData}
                columns={[
                  {
                    field: 'amount',
                    headerName: 'AMOUNT',
                    flex: 1,
                    cellClassName: 'name-column--cell--capitalize'
                  },
                  {
                    field: 'bankDesc',
                    headerName: 'BANK DESC',
                    flex: 1
                  },
                  {
                    field: 'shortNote',
                    headerName: 'SHORT NOTE',
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

export default SavingData;
