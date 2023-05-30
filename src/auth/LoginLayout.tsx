import { Box, Card, Typography, Container, styled } from '@mui/material';

import Logo from 'src/components/LogoSign';

import { Helmet } from 'react-helmet-async';
import Login from './Login';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  () => `
  display: flex;
  width: 100%;
  flex: 1;
  padding: 20px;
`
);

const LoginBasic = () => {
  return (
    <>
      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
            <Logo />
            <Card
              sx={{
                mt: 15,
                px: 4,
                pt: 5,
                pb: 3
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {'Iniciar Sesión'}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3
                  }}
                >
                  {'Ingresa la información de tu cuenta'}
                </Typography>
              </Box>
              <Login />
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
};

export default LoginBasic;
