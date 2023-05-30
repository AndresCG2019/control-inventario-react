import MUIDataTable from 'mui-datatables';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress
} from '@mui/material';
import {
  articuloIngresoDTO,
  movimientoDTO,
  movimientosDialogState
} from './inventario.model';
import { proveedorDTO } from '../Proveedores/proveedores.model';
import FormularioIngreso from './FormularioIngreso';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlArticulos } from 'src/utils/endpoints';
import { ToastError } from 'src/utils/Confirmar';
import {
  currencyColumn,
  dataTableTextLabels
} from 'src/utils/datatableUtilities';
import { FormikHelpers } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

const useStyles: any = makeStyles({
  dialogPaper: {
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }
});

export default function MovimientosDialog(props: movimientosDialogProps) {
  const classes: any = useStyles();

  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [movimientos, setMovimientos] = useState<movimientoDTO[]>([]);

  const tableColumns = [
    { name: 'tipoMovimiento', label: 'Tipo' },
    { name: 'fecha', label: 'Fecha' },
    currencyColumn('monto', 'Monto', movimientos),
    { name: 'cantidad', label: 'Cantidad' },
    { name: 'nombreCliente', label: 'Cliente' },
    { name: 'nombreProveedor', label: 'Proveedor' }
  ];

  const options = {
    filterType: 'checkbox',
    download: true,
    print: true,
    selectableRows: 'none',
    textLabels: dataTableTextLabels
  };

  useEffect(() => {
    cargarMovimientos();
  }, [props.dialogState]);

  async function guardarIngreso(
    ingreso: articuloIngresoDTO,
    accion: FormikHelpers<articuloIngresoDTO>
  ) {
    try {
      setLoadingData(true);
      await axios.post(`${urlArticulos}/ingresos`, ingreso);
      //accion.resetForm();
      cargarMovimientos();
    } catch (error) {
      ToastError(error.response.data);
      setLoadingData(false);
    }
  }

  async function cargarMovimientos() {
    try {
      console.log('entre y estos son los props', props);

      if (!props.dialogState.articulo) {
        return;
      }

      setLoadingData(true);

      const response: AxiosResponse<movimientoDTO[]> = await axios.get(
        `${urlArticulos}/movimientos/${props.dialogState.articulo.claveArticulo}`
      );

      setMovimientos(response.data);

      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      ToastError('Hubo un error al cargar los movimientos');
    }
  }

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      onClose={props.handleClose}
      open={props.dialogState.open}
      maxWidth={'lg'}
      fullWidth
    >
      <DialogContent>
        {loadingData && <LinearProgress />}
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <h3>Movimientos del Artículo</h3>
            <MUIDataTable
              data={movimientos}
              columns={tableColumns}
              options={options}
            />
          </Grid>
          <Grid item xs={4}>
            <h3>Nuevo Ingreso</h3>
            <FormularioIngreso
              modelo={{
                idIngreso: 0,
                precioCompra: props.dialogState.articulo?.precioCompra,
                cantidad: 0,
                claveArticulo: props.dialogState.articulo?.claveArticulo,
                idProveedor: 0
              }}
              proveedores={props.proveedores}
              onSubmit={async (valores, accion) =>
                await guardarIngreso(valores, accion)
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

interface movimientosDialogProps {
  dialogState: movimientosDialogState;
  handleClose: any;
  proveedores: proveedorDTO[];
}
