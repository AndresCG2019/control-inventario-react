import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { credencialesUsuario } from './auth.model';
import FormGroupText from '../utils/FormGroupText';
import { Button, Grid, CircularProgress } from '@mui/material';
import FormGroupTextMUI from 'src/utils/FormGroupTextMUI';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { useNavigate } from 'react-router';
import Autorizado from './Autorizado';
export default function FormularioEditar(props: formularioEditarProps) {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errores, setErrores] = useState<string[]>([]);

  const navigate = useNavigate();

  return (
    <Formik initialValues={props.modelo} onSubmit={props.onSubmit}>
      {(formikProps) => (
        <Form>
          <FormGroupText campo="id_empresa" type="hidden"></FormGroupText>
          <br />

          <Grid container spacing={2}>
            <Autorizado
              autorizado={
                <>
                </>
              }
            ></Autorizado>
            <Grid item xs={12} md={6}  lg={6}>
              <FormGroupTextMUI
                label="Nombre"
                name="nombre"
                type="text"
                handleChange={formikProps.handleChange}
                value={formikProps.values.nombre}
              />
            </Grid>
            <Grid item xs={12} md={6}  lg={6}>
              <FormGroupTextMUI
                label="Apellidos"
                name="apellidos"
                type="text"
                handleChange={formikProps.handleChange}
                value={formikProps.values.apellidos}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormGroupTextMUI
                label="Dirección"
                name="direccion"
                type="text"
                handleChange={formikProps.handleChange}
                value={formikProps.values.direccion}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormGroupTextMUI
                label="Teléfono"
                name="telefono"
                type="text"
                handleChange={formikProps.handleChange}
                value={formikProps.values.telefono}
              />
            </Grid>

            <Grid item md={2} lg={2}>
              <Button
                color="primary"
                startIcon={
                  formikProps.isSubmitting ? (
                    <CircularProgress size="1rem" />
                  ) : (
                    <SaveTwoToneIcon />
                  )
                }
                disabled={formikProps.isSubmitting}
                type="submit"
                size="large"
                variant="outlined"
              >
                {'Guardar'}
              </Button>
            </Grid>

            <Grid item md={2} lg={2}>
              <Button
                onClick={() => navigate('/usuarios')}
                size="large"
                color="error"
                variant="outlined"
                startIcon={<CancelTwoToneIcon />}
              >
                {'Cancelar'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

interface formularioEditarProps {
  modelo: credencialesUsuario;
  onSubmit(
    valoreS: credencialesUsuario,
    acciones: FormikHelpers<credencialesUsuario>
  ): void;
}
