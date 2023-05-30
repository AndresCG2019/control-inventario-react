import { Form, Formik, FormikHelpers } from 'formik';
import { credencialesUsuario } from './auth.model';
import * as Yup from 'yup';
import { Button, CircularProgress } from '@mui/material';
import FormGroupTextMUI from 'src/utils/FormGroupTextMUI';

export default function FormularioLogin(props: formularioLoginProps) {
  return (
    <>
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
            <FormGroupTextMUI
              label="Email"
              name="email"
              handleChange={formikProps.handleChange}
              type="email"
              value={formikProps.values.email}
            />

            <FormGroupTextMUI
              label="Contraseña"
              name="password"
              handleChange={formikProps.handleChange}
              type="password"
              value={formikProps.values.password}
            />

            <Button
              sx={{
                mt: 3
              }}
              color="primary"
              startIcon={
                formikProps.isSubmitting ? (
                  <CircularProgress size="1rem" />
                ) : null
              }
              disabled={formikProps.isSubmitting}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
            >
              {'Login'}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface formularioLoginProps {
  modelo: credencialesUsuario;
  onSubmit(
    valoreS: credencialesUsuario,
    acciones: FormikHelpers<credencialesUsuario>
  ): void;
}
