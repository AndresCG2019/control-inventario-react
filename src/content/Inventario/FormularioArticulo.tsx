import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormGroupTextMUI from 'src/utils/FormGroupTextMUI';
import { Button } from '@mui/material';
import { ArticuloDTO } from './inventario.model';
import FormGroupText from 'src/utils/FormGroupText';
import DialogSelectInput from 'src/utils/DialogSelectInput';
import { useEffect, useState } from 'react';
import { categoriasDTO } from '../Categorias/categorias.model';
import axios, { AxiosResponse } from 'axios';
import { urlCategorias } from 'src/utils/endpoints';

export default function FormularioArticulo(props: formularioArticuloProps) {
  const [categorias, setCategorias] = useState<categoriasDTO[]>([]);

  useEffect(() => {
    getCategorias();
  }, []);

  async function getCategorias() {
    try {
      const respuesta: AxiosResponse<categoriasDTO[]> = await axios.get(
        urlCategorias
      );
      setCategorias(respuesta.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        claveArticulo: Yup.string()
          .required('Este campo es obligatorio')
          .max(100, 'La longitud maxima es de 100 caracteres'),
        descripcion: Yup.string()
          .required('Este campo es obligatorio')
          .max(80, 'La longitud maxima es de 80 caracteres'),
        unidad: Yup.string()
          .required('Este campo es obligatorio')
          .max(50, 'La longitud maxima es de 50 caracteres'),
        precioVenta: Yup.number().min(0, 'Ingrese un valor válido'),
        precioCompra: Yup.number().min(0, 'Ingrese un valor válido')
      })}
    >
      {(formikProps) => (
        <Form>
          {props.editando ? (
            <FormGroupText campo="claveArticulo" type="hidden" />
          ) : (
            <FormGroupTextMUI
              label="Clave"
              name="claveArticulo"
              type="text"
              handleChange={formikProps.handleChange}
              value={formikProps.values.claveArticulo}
            />
          )}

          <FormGroupTextMUI
            label="Descripción"
            name="descripcion"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.descripcion}
          />

          <FormGroupTextMUI
            label="Unidad"
            name="unidad"
            type="text"
            handleChange={formikProps.handleChange}
            value={formikProps.values.unidad}
          />

          <FormGroupTextMUI
            label="Precio de Venta"
            name="precioVenta"
            type="number"
            handleChange={formikProps.handleChange}
            value={formikProps.values.precioVenta.toString()}
          />

          <FormGroupTextMUI
            label="Precio de Compra"
            name="precioCompra"
            type="number"
            handleChange={formikProps.handleChange}
            value={formikProps.values.precioCompra.toString()}
          />

          {props.editando ? (
            <FormGroupText campo="idCategoria" type="hidden" />
          ) : (
            <DialogSelectInput
              name="idCategoria"
              label="Categoría"
              placeholder={'Selecciona una opción'}
            >
              {categorias.map((option) => (
                <option key={option.descripcion} value={option.id}>
                  {option.descripcion}
                </option>
              ))}
            </DialogSelectInput>
          )}

          <Button type="submit" disabled={formikProps.isSubmitting}>
            {'GUARDAR'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

interface formularioArticuloProps {
  editando: boolean;
  modelo: ArticuloDTO;
  onSubmit(valores: ArticuloDTO, accion: FormikHelpers<ArticuloDTO>): void;
}

FormularioArticulo.defaultProps = {
  editando: false
};
