import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormGroupTextMUI from 'src/utils/FormGroupTextMUI';
import { Button } from '@mui/material';
import { clienteDTO } from './clientes.model';

export default function FormularioClientes(
  props: formularioClientesProps
) {
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        nombreCompleto: Yup.string()
          .required('Este campo es obligatorio')
          .max(100, 'La longitud maxima es de 100 caracteres'),
          domicilio: Yup.string()
          .required('Este campo es obligatorio')
          .max(100, 'La longitud maxima es de 100 caracteres'),
          email: Yup.string()
          .required('Este campo es obligatorio')
          .max(20, 'La longitud maxima es de 20 caracteres'),
          telefono: Yup.string()
          .required('Este campo es obligatorio')
          .max(50, 'La longitud maxima es de 50 caracteres'),
        edad: Yup.number().min(1, "Ingrese la edad del cliente")
      })}
    >
      {(formikProps) => (
        <Form>
          <FormGroupTextMUI
            label="Nombre"
            name="nombreCompleto"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.nombreCompleto}
          />

          <FormGroupTextMUI
            label="Domicilio"
            name="domicilio"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.domicilio}
          />

          <FormGroupTextMUI
            label="Email"
            name="email"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.email}
          />

          <FormGroupTextMUI
            label="Teléfono"
            name="telefono"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.telefono}
          />

          <FormGroupTextMUI
            label="Edad"
            name="edad"
            type="number"
            handleChange={formikProps.handleChange}
            value={formikProps.values.edad.toString()}
          />

          <Button type="submit" disabled={formikProps.isSubmitting}>
            {'GUARDAR'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

interface formularioClientesProps {
  modelo: clienteDTO;
  onSubmit(valores: clienteDTO, accion: FormikHelpers<clienteDTO>): void;
}
