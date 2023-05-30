import { Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { urlArticulos, urlCategorias, urlCuentas, urlProveedores } from 'src/utils/endpoints';
import MUIDataTable from 'mui-datatables';
import {
  commandsColumn,
  commandsColumnInventario,
  currencyColumn,
  dataTableTextLabels
} from 'src/utils/datatableUtilities';
import PageHeader from 'src/utils/PageHeader';
import { ToastCompletado, ToastError } from 'src/utils/Confirmar';
import Cargando from 'src/utils/Cargando';
import Swal from 'sweetalert2';
import { useConfirm } from 'material-ui-confirm';
import { claim } from 'src/auth/auth.model';
import { obtenerClaims } from 'src/auth/ManejadorJWT';
import { ArticuloDTO, movimientosDialogState } from './inventario.model';
import FormularioArticulo from './FormularioArticulo';
import MovimientosDialog from './MovimientosDialog';
import { proveedorDTO } from '../Proveedores/proveedores.model';

export default function IndiceInventario() {
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [articulos, setArticulos] = useState<ArticuloDTO[]>([]);
  const [proveedores, setProveedores] = useState<proveedorDTO[]>([]);

  const [openDialog, setopenDialog] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [dialogAction, setDialogAction] = useState<number>(
    dialogActions.Registrar
  );
  const [articuloEditar, setArticuloEditar] = useState<ArticuloDTO>();

  const [dialogMovimientosState, setDialogMovimientosState] =
    useState<movimientosDialogState>({ open: false, articulo: undefined });

  const tableColumns = [
    { name: 'claveArticulo', label: 'Clave' },
    { name: 'descripcion', label: 'Descripción' },
    { name: 'unidad', label: 'Unidad' },
    { name: 'existencia', label: 'Existencia' },
    { name: 'descripcionCategoria', label: 'Categoría' },
    currencyColumn('precioVenta', 'Precio de Venta', articulos),
    currencyColumn('precioCompra', 'Precio de Compra', articulos),
    currencyColumn('totalVendido', 'Total Vendido', articulos),
    currencyColumn('totalComprado', 'Total Comprado', articulos),
    commandsColumnInventario(onClickEdit, onClickDelete, onClickInventario)
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

    getArticulos();
    getProveedores();
  }, []);

  function onClickEdit(dataIndex: number) {
    let element: ArticuloDTO = articulos.at(dataIndex);
    setDialogAction(dialogActions.Editar);
    setArticuloEditar(element);
    handleDialogOpen(dialogActions.Editar);
  }

  function onClickDelete(dataIndex: number) {
    let element: ArticuloDTO = articulos.at(dataIndex);
    handleDelete(element.claveArticulo);
  }

  function onClickInventario(dataIndex: number) {
    let element: ArticuloDTO = articulos.at(dataIndex);
    setDialogMovimientosState({
      open: true,
      articulo: element
    });
  }

  const handleDelete = (item) => {
    confirm({
      title: 'Atención',
      description: `¿Estás seguro de que deseas borrar este artículo?`,
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

  async function Crear(articulo: ArticuloDTO) {
    try {
      const respuesta: AxiosResponse = await axios.post(urlArticulos, articulo);
      ToastCompletado('Se registró el artículo exitosamente');
      getArticulos();
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  async function Editar(articuloEditar: ArticuloDTO) {
    try {
      await axios.put(
        `${urlArticulos}/${articuloEditar.claveArticulo}`,
        articuloEditar
      );
      ToastCompletado('Se editó el artículo exitosamente');
      getArticulos();
    } catch (error: any) {
      ToastError('Algo salio mal...');
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

  async function getProveedores() {
    try {
      setLoadingData(true);
      const respuesta: AxiosResponse<proveedorDTO[]> = await axios.get(
        urlProveedores
      );
      setProveedores(respuesta.data);
      setLoadingData(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoadingData(false);
    }
  }

  async function Borrar(id: number) {
    try {
      axios
        .delete(`${urlArticulos}/${id}`)
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
          getArticulos();
        });
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  return (
    <>
      <PageHeader
        title="Inventario"
        hasCreateButton
        onCreateButtonClick={() => handleDialogOpen(dialogActions.Registrar)}
      />
      <Container>
        <Cargando isLoading={loadingData}></Cargando>
        <MUIDataTable
          data={articulos}
          columns={tableColumns}
          options={options}
        />
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth={'sm'}
        >
          <DialogTitle>Artículo</DialogTitle>
          <DialogContent>
            {dialogAction === dialogActions.Registrar ? (
              <FormularioArticulo
                modelo={{
                  claveArticulo: '',
                  descripcion: '',
                  unidad: '',
                  existencia: 0,
                  precioVenta: 0,
                  precioCompra: 0,
                  categoria: null,
                  idCategoria: 0
                }}
                onSubmit={async (articulo: ArticuloDTO) => {
                  await Crear(articulo);
                  handleDialogClose();
                }}
              ></FormularioArticulo>
            ) : (
              <>
                <FormularioArticulo
                  modelo={articuloEditar}
                  editando
                  onSubmit={async (articulo: ArticuloDTO) => {
                    await Editar(articulo);
                    handleDialogClose();
                  }}
                ></FormularioArticulo>
              </>
            )}
          </DialogContent>
        </Dialog>
        <MovimientosDialog
          dialogState={dialogMovimientosState}
          handleClose={() =>
            setDialogMovimientosState({ open: false, articulo: undefined })
          }
          proveedores={proveedores}
        />
      </Container>
    </>
  );
}

enum dialogActions {
  Registrar,
  Editar
}
