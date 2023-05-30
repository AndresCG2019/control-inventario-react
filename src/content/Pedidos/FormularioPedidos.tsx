import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { pedidoDTO } from './pedidos.model';
import FormGroupFecha from 'src/utils/FormGroupFecha';
import { clienteDTO } from '../Clientes/clientes.model';
import DialogSelectInput from 'src/utils/DialogSelectInput';
import SelectInputEditable from 'src/utils/SelectInputEditable';

export default function FormularioPedidos(props: formularioPedidosProps) {
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        idCliente: Yup.number().min(1, 'Elija una opción')
      })}
    >
      {(formikProps) => (
        <Form>
          <FormGroupFecha campo="fechaPedido" label="Fecha" />

          <br />

          <SelectInputEditable
            editando={props.editando}
            nombre="Cliente"
            valorActual={
              props.modelo.idCliente != 0
                ? props.clientes.find(
                    (x) => x.idCliente == props.modelo.idCliente
                  ).nombreCompleto
                : ''
            }
          >
            <DialogSelectInput
              name="idCliente"
              label="Cliente"
              placeholder={'Selecciona una opción'}
            >
              {props.clientes.map((option) => (
                <option key={option.idCliente} value={option.idCliente}>
                  {option.nombreCompleto}
                </option>
              ))}
            </DialogSelectInput>
          </SelectInputEditable>

          <Button type="submit" disabled={formikProps.isSubmitting}>
            {'GUARDAR'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

interface formularioPedidosProps {
  editando: boolean;
  modelo: pedidoDTO;
  clientes: clienteDTO[];
  onSubmit(valores: pedidoDTO, accion: FormikHelpers<pedidoDTO>): void;
}

FormularioPedidos.defaultProps = {
  editando: false
};
