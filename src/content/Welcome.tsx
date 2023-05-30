import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

export default function Welcome() {

  return (
    <>
      <Helmet>
        <title>Bienvenido</title>
      </Helmet>
      <PageTitleWrapper>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenido a Control de Inventario
        </Typography>
      </PageTitleWrapper>
      <p>Sistema de Control.</p>
    </>
  );
}
