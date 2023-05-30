import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormGroupTextMUI from 'src/utils/FormGroupTextMUI';
import { Button } from '@mui/material';
import { categoriasDTO } from './categorias.model';

export default function FormularioCategorias(props: formularioCategoriasProps) {
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        descripcion: Yup.string()
          .required('Este campo es obligatorio')
          .max(100, 'La longitud maxima es de 100 caracteres'),
        
      })}
    >
      {(formikProps) => (
        <Form>
          <FormGroupTextMUI
            label="Descripción"
            name="descripcion"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.descripcion}
          />

          <Button type='submit' disabled={formikProps.isSubmitting}>{'GUARDAR'}</Button>
        </Form>
      )}
    </Formik>
  );
}

interface formularioCategoriasProps {
  modelo: categoriasDTO;
  onSubmit(
    valores: categoriasDTO,
    accion: FormikHelpers<categoriasDTO>
  ): void;
}
