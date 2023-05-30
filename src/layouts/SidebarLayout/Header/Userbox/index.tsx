import { useContext, useRef, useState } from 'react';
import { Box, Button, Hidden, Popover, Typography } from '@mui/material';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import Autorizado from 'src/auth/Autorizado';
import AutenticacionContext from 'src/auth/AutenticacionContext';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'src/auth/ManejadorJWT';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

function HeaderUserbox() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { claims, actualizar } = useContext(AutenticacionContext);

  const navigate = useNavigate();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  function obtenerNombreUsuario(): string {
    return claims.filter((x: { nombre: string }) => x.nombre === 'email')[0]
      ?.valor;
  }

  function cerrarSesion() {
    logout();
    actualizar([]);
    navigate('/login');
  }

  return (
    <>
      <Autorizado
        autorizado={
          <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
            <Hidden mdDown>
              <UserBoxText>
                <UserBoxLabel variant="body1">
                  {obtenerNombreUsuario()}
                </UserBoxLabel>
              </UserBoxText>
            </Hidden>
            <Hidden smDown>
              <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
            </Hidden>
          </UserBoxButton>
        }
        noAutorizado={
          <Button variant="outlined" onClick={() => navigate('/login')}>
            Login
          </Button>
        }
      />
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Box sx={{ m: 1 }}>
            <Button onClick={() => cerrarSesion()} color="primary" fullWidth>
              <LogoutTwoToneIcon sx={{ mr: 1 }} />
              Cerrar Sesión
            </Button>
          </Box>
        </MenuUserBox>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
