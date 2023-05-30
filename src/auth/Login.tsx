import axios from 'axios';
import { useContext, useState } from 'react';
import { urlCuentas } from '../utils/endpoints';
import MostrarErrores from '../utils/MostrarErrores';
import AutenticacionContext from './AutenticacionContext';
import { credencialesUsuario, respuestaAutenticacion } from './auth.model';
import FormularioLogin from './FormularioLogin';
import { guardarTokenLocalStorage, obtenerClaims } from './ManejadorJWT';
import { useNavigate } from 'react-router';
import { ToastError } from 'src/utils/Confirmar';

export default function Login() {
  const { actualizar } = useContext(AutenticacionContext);
  const [errores, seterrores] = useState<string[]>([]);

  const navigate = useNavigate();

  async function login(credenciales: credencialesUsuario) {
    try {
      const respuesta = await axios.post<respuestaAutenticacion>(
        `${urlCuentas}/login`,
        credenciales
      );

      console.log('RESPUESTA DEL LOGIN: ', respuesta.data);

      guardarTokenLocalStorage(respuesta.data);
      actualizar(obtenerClaims());
      window.location.href = '/';
    } catch (error: any) {
      console.log(error);
      ToastError("Hubo un error con el inicio de sesión")
      return;
    }
  }

  return (
    <>
      <h3>Login</h3>
      <MostrarErrores errores={errores} />
      <FormularioLogin
        modelo={{ email: '', password: '' }}
        onSubmit={async (valores) => await login(valores)}
      />
      <p
        onClick={() => navigate('/usuarios/register')}
        style={{ color: 'blue' }}
      >
        REGISTRO
      </p>
    </>
  );
}
