import React, { useEffect, useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Petrol from './Petrol';
import PopularCard from './PopularCard';
import Diesel from './Diesel';
import Gas from './Gas';
import Kerosene from './Kerosene';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import AppTrafficBySite from './TrafficBySiteCard';
import Iconify from '../../../ui-component/iconify';
import AppTasks from './AppTask';
import AppConversionRates from './AppConversionCard';
import AppCurrentVisits from './AppCurrentVisitCard';
import { gridSpacing } from 'store/constant';
import { apiurls } from 'Service/api';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  fuel_type: Yup.string().required('Fuel Type is required'),
  price: Yup.string().required('Price is required')
});

const initialValues = {
  fuel_type: '',
  price: ''
};

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [fuelData, setFuelData] = useState([]);
  const [petrolData, setPetrolData] = useState([]);
  const [dieselData, setDieselData] = useState([]);
  const [kerosineData, setKeroseneData] = useState([]);
  const [gasData, setGasData] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [fuelTypes, setFuelTypes] = useState([]);

  const fetchFuelData = async () => {
    try {
      const response = await axios.get(apiurls?.fuelList);

      const data = response.data.map((item) => {
        return {
          name: item?.fuel_type,
          qty: item?.litres,
          status: item?.status,
          id: item?._id,
          price: item?.liter_price
        };
      });

      setFuelData(data);

      let petrol = [];
      let diesel = [];
      let kerosene = [];
      let gas = [];

      data?.forEach((fuel) => {
        switch (fuel?.name) {
          case 'petrol':
            petrol.push(fuel);
            break;
          case 'Diesel':
            diesel.push(fuel);
            break;
          case 'carosine':
            kerosene.push(fuel);
            break;
          case 'gas':
            gas.push(fuel);
            break;
          default:
            break;
        }
      });

      setPetrolData(petrol);
      setDieselData(diesel);
      setKeroseneData(kerosene);
      setGasData(gas);
    } catch (error) {
      console.error('Error fetching fuel data:', error);
    }
  };

  useEffect(() => {
    setLoading(false);
    fetchFuelData();
  }, []);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSaveForm = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(apiurls?.updateFuel, values);
      console.log('API response:', response.data);
      if (response.data == 'price updated successfully') {
        toast.success('Price added successfully', { autoClose: 600 });
        setSubmitting(false);
        handleCloseForm();
        await fetchFuelData();
      } else {
        toast.error('something went wrong', { autoClose: 400 });
      }
    } catch (error) {
      console.error('Error adding order:', error);
      toast.error('Failed to add Order', { autoClose: 600 });
    }
  };

  useEffect(() => {
    // console.log('Petrol Data:', petrolData);
  }, [petrolData]);

  useEffect(() => {
    // console.log('Diesel Data:', dieselData);
  }, [dieselData]);

  useEffect(() => {
    // console.log('Kerosene Data:', kerosineData);
  }, [kerosineData]);

  useEffect(() => {
    // console.log('Gas Data:', gasData);
  }, [gasData]);

  const fetchFuelTypes = async () => {
    try {
      const response = await axios.get(apiurls?.fuelList);
      const fuelTypes = response.data.map((item) => ({
        value: item?.fuel_type,
        label: item?.fuel_type,
        id: item?._id
      }));
      setFuelTypes(fuelTypes);
    } catch (error) {
      console.error('Error fetching fuel types:', error);
    }
  };

  useEffect(() => {
    fetchFuelData();
    fetchFuelTypes();
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Petrol isLoading={isLoading} petrolData={petrolData} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <Gas isLoading={isLoading} gasData={gasData} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <Kerosene isLoading={isLoading} kerosineData={kerosineData} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Diesel isLoading={isLoading} dieselData={dieselData} />
          </Grid>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleOpenForm} style={{ marginLeft: '16px', marginTop: '20px' }}>
        ADD CURRENT PRICE
      </Button>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 }
              ]}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={6}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 }
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} lg={5}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />
                }
              ]}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' }
              ]}
            />
          </Grid>
        </Grid>
      </Grid> */}

      {/* Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="md">
        <DialogTitle
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h3">Your Form Title</Typography>
          <Typography>
            <ClearIcon onClick={handleCloseForm} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSaveForm}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field name="fuel_type" as={TextField} label="Fuel Type" fullWidth select>
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>
                    {fuelTypes.map((option) => (
                      <MenuItem key={option.value} value={option?.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="fuel_type" component="div" style={{ color: 'red' }} />
                </Grid>
                <Grid item xs={12}>
                  <Field name="price" as={TextField} label="Price" fullWidth type="number" />
                  <ErrorMessage name="price" component="div" style={{ color: 'red' }} />
                </Grid>
              </Grid>

              <DialogActions>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
                <Button onClick={handleCloseForm} variant="outlined" color="primary">
                  Close
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Dashboard;
