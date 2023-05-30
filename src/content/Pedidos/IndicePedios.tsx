import { Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  urlArticulos,
  urlClientes,
  urlCuentas,
  urlPedidos
} from 'src/utils/endpoints';
import MUIDataTable from 'mui-datatables';
import {
  commandsColumn,
  commandsColumnPedidos,
  currencyColumn,
  dataTableTextLabels,
  dateColumn
} from 'src/utils/datatableUtilities';
import PageHeader from 'src/utils/PageHeader';
import { ToastCompletado, ToastError } from 'src/utils/Confirmar';
import Cargando from 'src/utils/Cargando';
import Swal from 'sweetalert2';
import { useConfirm } from 'material-ui-confirm';
import { claim } from 'src/auth/auth.model';
import { obtenerClaims } from 'src/auth/ManejadorJWT';
import { detallesDialogState, pedidoDTO } from './pedidos.model';
import FormularioPedidos from './FormularioPedidos';
import { clienteDTO } from '../Clientes/clientes.model';
import { ArticuloDTO } from '../Inventario/inventario.model';
import DetallesPedidoDialog from './DetallesPedidoDialog';

export default function IndicePedidos() {
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState<pedidoDTO[]>([]);
  const [clientes, setClientes] = useState<clienteDTO[]>([]);
  const [articulos, setArticulos] = useState<ArticuloDTO[]>([]);

  const [dialogPedidoState, setDialogPedidoState] =
    useState<detallesDialogState>({ idPedido: 0, open: false });

  const [openDialog, setopenDialog] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [dialogAction, setDialogAction] = useState<number>(
    dialogActions.Registrar
  );
  const [pedidoEditar, setPedidoEditar] = useState<pedidoDTO>();

  const tableColumns = [
    dateColumn('fechaPedido', 'Fecha', pedidos),
    { name: 'nombreCliente', label: 'Cliente' },
    currencyColumn('total', 'Total', pedidos),
    commandsColumnPedidos(onClickEdit, onClickDelete, onClickDetalles)
  ];

  const options = {
    filterType: 'checkbox',
    download: true,
    print: true,
    selectableRows: 'none',
    textLabels: dataTableTextLabels
  };

  useEffect(() => {
    let claimsValidation: claim[] = obtenerClaims();
    if (claimsValidation.length < 1) {
      navigate('/');
    }

    getPedidos();
    getClientes();
    getArticulos();
  }, []);

  function onClickEdit(dataIndex: number) {
    let element: pedidoDTO = pedidos.at(dataIndex);
    setDialogAction(dialogActions.Editar);
    setPedidoEditar(element);
    handleDialogOpen(dialogActions.Editar);
  }

  function onClickDelete(dataIndex: number) {
    let element: pedidoDTO = pedidos.at(dataIndex);
    handleDelete(element.idPedido);
  }

  function onClickDetalles(dataIndex: number) {
    let element: pedidoDTO = pedidos.at(dataIndex);
    setDialogPedidoState({ idPedido: element.idPedido, open: true });
  }

  const handleDelete = (item) => {
    confirm({
      title: 'Atención',
      description: `¿Estás seguro de que deseas borrar este pedido?`,
      confirmationText: 'Continuar',
      cancellationText: 'Cancelar'
    }).then(() => Borrar(item));
  };

  const handleDialogOpen = (accion: number) => {
    setopenDialog(true);
    setDialogAction(accion);
  };

  const handleDialogClose = () => {
    setopenDialog(false);
  };

  async function Crear(pedido: pedidoDTO) {
    try {
      const respuesta: AxiosResponse = await axios.post(urlPedidos, pedido);
      ToastCompletado('Se registró el pedido exitosamente');
      getPedidos();
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  async function Editar(pedidoEditar: pedidoDTO) {
    try {
      await axios.put(`${urlPedidos}/${pedidoEditar.idPedido}`, pedidoEditar);
      ToastCompletado('Se editó el pedido exitosamente');
      getPedidos();
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  async function getPedidos() {
    try {
      setLoadingData(true);
      const respuesta: AxiosResponse<pedidoDTO[]> = await axios.get(urlPedidos);
      setPedidos(respuesta.data);
      setLoadingData(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoadingData(false);
    }
  }

  async function getClientes() {
    try {
      setLoadingData(true);
      const respuesta: AxiosResponse<clienteDTO[]> = await axios.get(
        urlClientes
      );
      setClientes(respuesta.data);
      setLoadingData(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoadingData(false);
    }
  }

  async function getArticulos() {
    try {
      setLoadingData(true);
      const respuesta: AxiosResponse<ArticuloDTO[]> = await axios.get(
        urlArticulos
      );
      setArticulos(respuesta.data);
      setLoadingData(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoadingData(false);
    }
  }

  async function Borrar(id: number) {
    axios
      .delete(`${urlPedidos}/${id}`)
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
        getPedidos();
      })
      .catch((error: any) => {
        ToastError(error.response.data);
      });
  }

  return (
    <>
      <PageHeader
        title="Pedidos"
        hasCreateButton
        onCreateButtonClick={() => handleDialogOpen(dialogActions.Registrar)}
      />
      <Container>
        <Cargando isLoading={loadingData}></Cargando>
        <MUIDataTable data={pedidos} columns={tableColumns} options={options} />
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth={'sm'}
        >
          <DialogTitle>Pedido</DialogTitle>
          <DialogContent>
            {dialogAction === dialogActions.Registrar ? (
              <FormularioPedidos
                clientes={clientes}
                modelo={{
                  idPedido: 0,
                  fechaPedido: new Date(),
                  idCliente: 0
                }}
                onSubmit={async (pedido: pedidoDTO) => {
                  await Crear(pedido);
                  handleDialogClose();
                }}
              ></FormularioPedidos>
            ) : (
              <>
                <FormularioPedidos
                  modelo={pedidoEditar}
                  editando
                  clientes={clientes}
                  onSubmit={async (pedido: pedidoDTO) => {
                    await Editar(pedido);
                    handleDialogClose();
                  }}
                ></FormularioPedidos>
              </>
            )}
          </DialogContent>
        </Dialog>
        <DetallesPedidoDialog
          dialogState={dialogPedidoState}
          handleClose={() => setDialogPedidoState({ open: false, idPedido: 0 })}
          articulos={articulos}
        />
      </Container>
    </>
  );
}

enum dialogActions {
  Registrar,
  Editar
}
