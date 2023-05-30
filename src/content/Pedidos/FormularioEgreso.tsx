import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormGroupTextMUI from 'src/utils/FormGroupTextMUI';
import { Button } from '@mui/material';
import DialogSelectInput from 'src/utils/DialogSelectInput';
import { proveedorDTO } from '../Proveedores/proveedores.model';
import { ArticuloDTO } from '../Inventario/inventario.model';
import { articuloEgresoDTO } from './pedidos.model';
import FormGroupText from 'src/utils/FormGroupText';

export default function FormularioIngreso(props: formularioEgresosProps) {

  const selectArticuloChanged = (childData: any, formikProps: any) => {
    let articulo: ArticuloDTO = props.articulos.filter(
      (x) => x.claveArticulo === childData
    )[0];
    // este es un buen ejemplo de como cambiar valores en formik programaticamente
    formikProps.setFieldValue('precioVenta', articulo.precioVenta);
  };

  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({})}
    >
      {(formikProps) => (
        <Form>
          <FormGroupText campo="idPedido" type="hidden"></FormGroupText>
          <FormGroupTextMUI
            label="Precio de venta"
            name="precioVenta"
            type="number"
            handleChange={formikProps.handleChange}
            value={formikProps.values.precioVenta.toString()}
          />

          <FormGroupTextMUI
            label="Cantidad"
            name="cantidad"
            type="number"
            handleChange={formikProps.handleChange}
            value={formikProps.values.cantidad.toString()}
          />

          <DialogSelectInput
            name="claveArticulo"
            label="Artículo"
            placeholder={'Selecciona una opción'}
            callback={selectArticuloChanged}
            formikProps={formikProps}
          >
            {props.articulos.map((option) => (
              <option key={option.claveArticulo} value={option.claveArticulo}>
                {option.descripcion} - {option.claveArticulo}
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

interface formularioEgresosProps {
  modelo: articuloEgresoDTO;
  onSubmit(
    valores: articuloEgresoDTO,
    accion: FormikHelpers<articuloEgresoDTO>
  ): void;
  articulos: ArticuloDTO[];
}
