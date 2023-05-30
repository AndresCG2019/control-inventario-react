import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormGroupTextMUI from 'src/utils/FormGroupTextMUI';
import { Button } from '@mui/material';
import { articuloIngresoDTO } from './inventario.model';
import FormGroupText from 'src/utils/FormGroupText';
import FormGroupFecha from 'src/utils/FormGroupFecha';
import DialogSelectInput from 'src/utils/DialogSelectInput';
import { proveedorDTO } from '../Proveedores/proveedores.model';

export default function FormularioIngreso(props: formularioIngresoProps) {
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        precioCompra: Yup.number()
          .positive('Ingresa un precio de compra')
          .min(1, 'Ingresa un precio de compra'),
        cantidad: Yup.number()
          .integer('Ingresa un número entero')
          .positive('Ingresa un precio de compra')
          .min(1, 'Ingresa un precio de compra'),
        idProveedor: Yup.number().min(1, 'Elije una opción')
      })}
    >
      {(formikProps) => (
        <Form>
          <FormGroupText campo="claveArticulo" type="hidden" />

          <FormGroupTextMUI
            label="Precio de Compra"
            name="precioCompra"
            type="number"
            handleChange={formikProps.handleChange}
            value={formikProps.values.precioCompra.toString()}
          />

          <FormGroupTextMUI
            label="Cantidad"
            name="cantidad"
            type="number"
            handleChange={formikProps.handleChange}
            value={formikProps.values.cantidad.toString()}
          />

          <DialogSelectInput
            name="idProveedor"
            label="Proveedor"
            placeholder={'Selecciona una opción'}
          >
            {props.proveedores.map((option) => (
              <option key={option.idProveedor} value={option.idProveedor}>
                {option.nombre}
              </option>
            ))}
          </DialogSelectInput>

          <Button type="submit" disabled={formikProps.isSubmitting}>
            {'GUARDAR'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

interface formularioIngresoProps {
  modelo: articuloIngresoDTO;
  onSubmit(
    valores: articuloIngresoDTO,
    accion: FormikHelpers<articuloIngresoDTO>
  ): void;
  proveedores: proveedorDTO[];
}
