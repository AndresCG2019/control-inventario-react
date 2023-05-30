import { Form, Formik, FormikHelpers } from 'formik';
import { credencialesUsuario } from './auth.model';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import FormGroupTextMUI from 'src/utils/FormGroupTextMUI';
import { Button, CircularProgress, Grid } from '@mui/material';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';

export default function FormularioAuth(props: formularioAuthProps) {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Este campo es obligatorio')
          .email('Debe colocar un email valido'),
        password: Yup.string().required('Este campo es obligatorio')
      })}
    >
      {(formikProps) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <FormGroupTextMUI
                label="Email"
                name="email"
                type="text"
                handleChange={formikProps.handleChange}
                value={formikProps.values.email}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <FormGroupTextMUI
                label="Contraseña"
                name="password"
                type="password"
                handleChange={formikProps.handleChange}
                value={formikProps.values.password}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <FormGroupTextMUI
                label="Nombre"
                name="nombre"
                type="text"
                handleChange={formikProps.handleChange}
                value={formikProps.values.nombre}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
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
                label="Direccion"
                name="direccion"
                type="text"
                handleChange={formikProps.handleChange}
                value={formikProps.values.direccion}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <FormGroupTextMUI
                label="Telefono"
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
                startIcon={<SaveTwoToneIcon />}
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

interface formularioAuthProps {
  modelo: credencialesUsuario;
  onSubmit(
    valoreS: credencialesUsuario,
    acciones: FormikHelpers<credencialesUsuario>
  ): void;
}
