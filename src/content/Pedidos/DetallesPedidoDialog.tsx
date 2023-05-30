import MUIDataTable from 'mui-datatables';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress
} from '@mui/material';
import { proveedorDTO } from '../Proveedores/proveedores.model';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlArticulos, urlPedidos } from 'src/utils/endpoints';
import { ToastError } from 'src/utils/Confirmar';
import {
  currencyColumn,
  dataTableTextLabels
} from 'src/utils/datatableUtilities';
import { FormikHelpers } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { articuloEgresoDTO, detallesDialogState } from './pedidos.model';
import FormularioEgreso from './FormularioEgreso';
import { ArticuloDTO } from '../Inventario/inventario.model';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

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
  const [detalles, setDetalles] = useState<articuloEgresoDTO[]>([]);

  const tableColumns = [
    currencyColumn('precioVenta', 'Precio Venta', detalles),
    { name: 'cantidad', label: 'Cantidad' },
    { name: 'claveArticulo', label: 'Articulo' },
    {
      name: 'Acciones',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex: number) => {
          return (
            <>
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => onClickDelete(dataIndex)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        }
      }
    }
  ];

  const options = {
    filterType: 'checkbox',
    download: true,
    print: true,
    selectableRows: 'none',
    textLabels: dataTableTextLabels
  };

  useEffect(() => {
    cargarDetalles();
  }, [props.dialogState]);

  const onClickDelete = (dataIndex: number) => {
    setLoadingData(true);
    const element: articuloEgresoDTO = detalles.at(dataIndex);

    axios
      .delete(`${urlPedidos}/detalles/${element.idEgreso}`)
      .then((respuesta: AxiosResponse<string>) => {
        if (respuesta.data.length > 0) {
          Swal.fire({
            title: 'Error!',
            text: respuesta.data,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Ok',
            cancelButtonColor: '#d33'
          });
        }
        cargarDetalles();
      })
      .catch((error: any) => {
        ToastError(error.response.data);
      });
  };

  async function guardarDetalle(
    detalle: articuloEgresoDTO,
    accion: FormikHelpers<articuloEgresoDTO>
  ) {
    try {
      setLoadingData(true);
      await axios.post(`${urlPedidos}/detalles`, detalle);
      //accion.resetForm();

      // no se hace setLoadingData(false) porque ya se hace en cargarMovimientos
      cargarDetalles();
    } catch (error) {
      props.handleClose();
      ToastError(error.response.data);
      setLoadingData(false);
    }
  }

  async function cargarDetalles() {
    try {
      console.log('entre y estos son los props', props);

      if (props.dialogState.idPedido == 0) {
        return;
      }

      setLoadingData(true);

      const response: AxiosResponse<articuloEgresoDTO[]> = await axios.get(
        `${urlPedidos}/detalles/${props.dialogState.idPedido}`
      );

      setDetalles(response.data);

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
            <h3>Detalles del Pedido</h3>
            <MUIDataTable
              data={detalles}
              columns={tableColumns}
              options={options}
            />
          </Grid>
          <Grid item xs={4}>
            <h3>Nuevo Detalle</h3>
            <FormularioEgreso
              modelo={{
                idEgreso: 0,
                precioVenta: 0,
                cantidad: 0,
                claveArticulo: '',
                idPedido: props.dialogState.idPedido
              }}
              articulos={props.articulos}
              onSubmit={async (valores, accion) =>
                await guardarDetalle(valores, accion)
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

interface movimientosDialogProps {
  dialogState: detallesDialogState;
  handleClose: any;
  articulos: ArticuloDTO[];
}
