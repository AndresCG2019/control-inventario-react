import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormGroupTextMUI from 'src/utils/FormGroupTextMUI';
import { Button } from '@mui/material';
import { proveedorDTO } from './proveedores.model';

export default function FormularioProveedores(
  props: formularioProveedoresProps
) {
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        nombre: Yup.string()
          .required('Este campo es obligatorio')
          .max(100, 'La longitud maxima es de 100 caracteres'),
          direccion: Yup.string()
          .required('Este campo es obligatorio')
          .max(100, 'La longitud maxima es de 100 caracteres'),
          telefono: Yup.string()
          .required('Este campo es obligatorio')
          .max(20, 'La longitud maxima es de 20 caracteres'),
          email: Yup.string()
          .required('Este campo es obligatorio')
          .max(50, 'La longitud maxima es de 50 caracteres'),
        rfc: Yup.string()
          .required('Este campo es obligatorio')
          .min(12, "La longitud minima es de 12 caracteres")
          .max(13, 'La longitud maxima es de 13 caracteres')
      })}
    >
      {(formikProps) => (
        <Form>
          <FormGroupTextMUI
            label="Nombre"
            name="nombre"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.nombre}
          />

          <FormGroupTextMUI
            label="Dirección"
            name="direccion"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.direccion}
          />

          <FormGroupTextMUI
            label="Teléfono"
            name="telefono"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.telefono}
          />

          <FormGroupTextMUI
            label="Email"
            name="email"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.email}
          />

          <FormGroupTextMUI
            label="RFC"
            name="rfc"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.rfc}
          />

          <Button type="submit" disabled={formikProps.isSubmitting}>
            {'GUARDAR'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

interface formularioProveedoresProps {
  modelo: proveedorDTO;
  onSubmit(valores: proveedorDTO, accion: FormikHelpers<proveedorDTO>): void;
}
