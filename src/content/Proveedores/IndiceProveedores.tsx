import { Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { urlProveedores } from 'src/utils/endpoints';
import MUIDataTable from 'mui-datatables';
import {
  commandsColumn,
  dataTableTextLabels
} from 'src/utils/datatableUtilities';
import PageHeader from 'src/utils/PageHeader';
import { ToastCompletado, ToastError } from 'src/utils/Confirmar';
import Cargando from 'src/utils/Cargando';
import Swal from 'sweetalert2';
import { useConfirm } from 'material-ui-confirm';
import { proveedorDTO } from './proveedores.model';
import FormularioProveedores from './FormularioProveedores';
import { claim } from 'src/auth/auth.model';
import { obtenerClaims } from 'src/auth/ManejadorJWT';
import { useNavigate } from 'react-router';

export default function IndiceProveedores() {
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [proveedores, setProveedores] = useState<proveedorDTO[]>([]);
  const [openDialog, setopenDialog] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [dialogAction, setDialogAction] = useState<number>(
    dialogActions.Registrar
  );
  const [proveedorEditar, setProveedorEditar] = useState<proveedorDTO>();

  const tableColumns = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'direccion', label: 'Dirección' },
    { name: 'telefono', label: 'Télefono' },
    { name: 'email', label: 'Email' },
    { name: 'rfc', label: 'RFC' },
    commandsColumn(onClickEdit, onClickDelete)
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

    getProveedores();
  }, [])
  

  function onClickEdit(dataIndex: number) {
    let element: proveedorDTO = proveedores.at(dataIndex);
    setDialogAction(dialogActions.Editar);
    setProveedorEditar(element);
    handleDialogOpen(dialogActions.Editar);
  }

  function onClickDelete(dataIndex: number) {
    let element: proveedorDTO = proveedores.at(dataIndex);
    handleDelete(element.idProveedor);
  }

  const handleDelete = (item) => {
    confirm({
      title: 'Atención',
      description: `¿Estás seguro de que deseas borrar este proveedor?`,
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

  async function Crear(proveedor: proveedorDTO) {
    try {
      const respuesta: AxiosResponse = await axios.post(urlProveedores, proveedor);
      ToastCompletado('Se registró el proveedor exitosamente');
      getProveedores();
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  async function Editar(proveedorEditar: proveedorDTO) {
    try {
      await axios.put(`${urlProveedores}/${proveedorEditar.idProveedor}`, proveedorEditar);
      ToastCompletado('Se editó el proveedor exitosamente');
      getProveedores();
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  async function getProveedores() {
    try {
      setLoadingData(true);
      const respuesta: AxiosResponse<proveedorDTO[]> = await axios.get(urlProveedores);
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
        .delete(`${urlProveedores}/${id}`)
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
          getProveedores();
        });
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  return (
    <>
      <PageHeader
        title="Proveedores"
        hasCreateButton
        onCreateButtonClick={() => handleDialogOpen(dialogActions.Registrar)}
      />
      <Container>
        <Cargando isLoading={loadingData}></Cargando>
        <MUIDataTable data={proveedores} columns={tableColumns} options={options} />
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth={'sm'}
        >
          <DialogTitle>Proveedor</DialogTitle>
          <DialogContent>
            {dialogAction === dialogActions.Registrar ? (
              <FormularioProveedores
                modelo={{
                    idProveedor: 0,
                    nombre: "",
                    direccion: "",
                    telefono: "",
                    email: "",
                    rfc: "",
                }}
                onSubmit={async (proveedor: proveedorDTO) => {
                  await Crear(proveedor);
                  handleDialogClose();
                }}
              ></FormularioProveedores>
            ) : (
              <>
                <FormularioProveedores
                  modelo={proveedorEditar}
                  onSubmit={async (proveedor: proveedorDTO) => {
                    await Editar(proveedor);
                    handleDialogClose();
                  }}
                ></FormularioProveedores>
              </>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}

enum dialogActions {
  Registrar,
  Editar
}
