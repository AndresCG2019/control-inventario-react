import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import AutenticacionContext from './auth/AutenticacionContext';
import { useEffect, useState } from 'react';
import { claim } from './auth/auth.model';
import { obtenerClaims } from './auth/ManejadorJWT';
import { configurarInterceptor } from './utils/interceptores';
import { ConfirmProvider } from 'material-ui-confirm';
import Footer from './components/Footer';

configurarInterceptor();

const App = () => {
  const content = useRoutes(routes);

  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(obtenerClaims());
  }, []);

  function actualizar(claims: claim[]) {
    setClaims(claims);
  }

  return (
    <ThemeProvider>
      <ConfirmProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AutenticacionContext.Provider value={{ claims, actualizar }}>
            <CssBaseline />
            {content}
          </AutenticacionContext.Provider>
        </LocalizationProvider>
      </ConfirmProvider>
    </ThemeProvider>
  );
};
export default App;
