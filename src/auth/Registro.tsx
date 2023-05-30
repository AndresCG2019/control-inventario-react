import { Card, CardContent, Container } from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import PageHeader from 'src/utils/PageHeader';
import { urlCuentas } from '../utils/endpoints';
import MostrarErrores from '../utils/MostrarErrores';
import { credencialesUsuario, respuestaAutenticacion } from './auth.model';
import FormularioAuth from './FormularioAuth';
import AutenticacionContext from './AutenticacionContext';
import { guardarTokenLocalStorage, obtenerClaims } from './ManejadorJWT';
import { ToastError } from 'src/utils/Confirmar';

export default function Registro() {
  const [errores, seterrores] = useState<string[]>([]);

  const navigate = useNavigate();
  const { actualizar } = useContext(AutenticacionContext);

  async function registrar(credenciales: credencialesUsuario) {
    try {
      const respuesta = await axios.post<respuestaAutenticacion>(
        `${urlCuentas}/crear`,
        credenciales
      );

      guardarTokenLocalStorage(respuesta.data);
      actualizar(obtenerClaims());
      window.location.href = '/';
    } catch (error: any) {
      console.log(error);
      ToastError("Hubo un error al registrar al usuario");
    }
  }

  return (
    <>
      <PageHeader
        title="Registrar Usuario"
        hasCreateButton
        onCreateButtonClick={() => console.log('HOLA')}
      />

      <Container>
        <MostrarErrores errores={errores}></MostrarErrores>
        <Card>
          <CardContent>
            <FormularioAuth
              modelo={{
                email: '',
                password: '',
                nombre: '',
                apellidos: '',
                direccion: '',
                telefono: ''
              }}
              onSubmit={async (valores) => await registrar(valores)}
            />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
