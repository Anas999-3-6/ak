import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './views/pages/authentication/authentication3/Login3';
import Register from './views/pages/authentication/authentication3/Register3';
// routing
import PageRoutes from 'routes';
// defaultTheme
import themes from 'themes';
// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { useState } from 'react';

// ==============================|| APP ||============================== //
const App = () => {
  const customization = useSelector((state) => state.customization);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    setUser(data);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <ToastContainer />

        {user ? (
          <PageRoutes />
        ) : (
          <Routes>
            <Route path="/pages/login/login3" element={<LoginPage />} />
            <Route path="/pages/register/register3" element={<Register />} />
            <Route path="*" element={<Navigate to="/pages/login/login3" />} />
          </Routes>
        )}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
