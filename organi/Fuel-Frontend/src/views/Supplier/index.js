/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import { IconButton } from '@mui/material';
import SupplierData from './AddSupplier';
import EditIcon from '@mui/icons-material/Edit';
import { Visibility } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { apiurls } from 'Service/api';
import axios from 'axios';

// ----------------------------------------------------------------------
const StaffManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [supplierData, setSupplierData] = useState([]);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchSupplierData = async () => {
    try {
      const response = await axios.get(apiurls?.getSupplier);
      console.log(response);
      const data = response.data.map((item) => {
        return {
          name: item?.name,
          phone: item?.phone,
          email: item?.email,
          representative: item?.representative,
          address: item?.address,
          status: item?.supplier_type,
          id: item?._id
        };
      });
      setSupplierData(data);
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    }
  };

  useEffect(() => {
    fetchSupplierData();
  }, []);
  return (
    <>
      <SupplierData open={openAdd} handleClose={handleCloseAdd} fetchSupplierData={fetchSupplierData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Supplier-Management</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add New Supplier
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={supplierData && supplierData}
                columns={[
                  {
                    field: 'representative',
                    headerName: 'representative',
                    flex: 1,
                    cellClassName: 'name-column--cell--capitalize'
                  },
                  {
                    field: 'name',
                    headerName: 'NAME',
                    flex: 1,
                    cellClassName: 'name-column--cell--capitalize'
                  },
                  {
                    field: 'phone',
                    headerName: 'PHONE',
                    flex: 1
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
                    field: 'status',
                    headerName: 'STATUS',
                    flex: 1
                  }
                  // {
                  //   field: 'action',
                  //   headerName: 'ACTION ',
                  //   flex: 1,
                  //   renderCell: (params) => (
                  //     <div>
                  //       <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
                  //         <EditIcon />
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

export default StaffManagement;
