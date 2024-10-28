/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import Iconify from '../../ui-component/iconify';
import CreditorsData from './AddCreditors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { apiurls } from 'Service/api';
import axios from 'axios';

// ----------------------------------------------------------------------

const CreditorData = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [creditData, setCreditorData] = useState([]);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchCreditorData = async () => {
    try {
      const response = await axios.get(apiurls?.getCreditor);
      console.log(response);
      const data = response.data.map((item) => {
        return {
          name: item?.name,
          phone: item?.phone,
          email: item?.email,
          address: item?.office_address,
          client: item?.type,
          id: item?._id
        };
      });
      setCreditorData(data);
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    }
  };

  useEffect(() => {
    fetchCreditorData();
  }, []);
  return (
    <>
      <CreditorsData open={openAdd} handleClose={handleCloseAdd} fetchCreditorData={fetchCreditorData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Creditors Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add Creditors
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={creditData && creditData}
                columns={[
                  {
                    field: 'name',
                    headerName: 'NAME',
                    flex: 1,
                    cellClassName: 'name-column--cell--capitalize'
                  },
                  {
                    field: 'phone',
                    headerName: 'PHONE',
                    flex: 1,
                    cellClassName: 'name-column--cell--capitalize'
                  },
                  {
                    field: 'email',
                    headerName: 'EMAIL',
                    flex: 1
                  },
                  {
                    field: 'address',
                    headerName: 'ADDRESS',
                    flex: 1
                  },
                  {
                    field: 'client',
                    headerName: 'CLIENT',
                    flex: 1
                  }
                  // {
                  //   field: 'action',
                  //   headerName: 'ACTION',
                  //   flex: 1,
                  //   renderCell: (params) => (
                  //     <div>
                  //       <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
                  //         <EditIcon />
                  //       </IconButton>
                  //       <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                  //         <DeleteIcon />
                  //       </IconButton>
                  //     </div>
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

export default CreditorData;
