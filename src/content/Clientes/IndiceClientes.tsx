import { Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { urlClientes } from 'src/utils/endpoints';
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
import { claim } from 'src/auth/auth.model';
import { obtenerClaims } from 'src/auth/ManejadorJWT';
import { clienteDTO } from './clientes.model';
import FormularioClientes from './FormularioClientes';

export default function IndiceClientes() {
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [clientes, setClientes] = useState<clienteDTO[]>([]);
  const [openDialog, setopenDialog] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [dialogAction, setDialogAction] = useState<number>(
    dialogActions.Registrar
  );
  const [clienteEditar, setClienteEditar] = useState<clienteDTO>();

  const tableColumns = [
    { name: 'nombreCompleto', label: 'Nombre' },
    { name: 'domicilio', label: 'Domicilio' },
    { name: 'email', label: 'Email' },
    { name: 'telefono', label: 'Teléfono' },
    { name: 'edad', label: 'edad' },
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

    getClientes();
  }, [])
  

  function onClickEdit(dataIndex: number) {
    let element: clienteDTO = clientes.at(dataIndex);
    setDialogAction(dialogActions.Editar);
    setClienteEditar(element);
    handleDialogOpen(dialogActions.Editar);
  }

  function onClickDelete(dataIndex: number) {
    let element: clienteDTO = clientes.at(dataIndex);
    handleDelete(element.idCliente);
  }

  const handleDelete = (item) => {
    confirm({
      title: 'Atención',
      description: `¿Estás seguro de que deseas borrar este cliente?`,
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

  async function Crear(cliente: clienteDTO) {
    try {
      const respuesta: AxiosResponse = await axios.post(urlClientes, cliente);
      ToastCompletado('Se registró el cliente exitosamente');
      getClientes();
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  async function Editar(clienteEditar: clienteDTO) {
    try {
      await axios.put(`${urlClientes}/${clienteEditar.idCliente}`, clienteEditar);
      ToastCompletado('Se editó el cliente exitosamente');
      getClientes();
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  async function getClientes() {
    try {
      setLoadingData(true);
      const respuesta: AxiosResponse<clienteDTO[]> = await axios.get(urlClientes);
      setClientes(respuesta.data);
      setLoadingData(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoadingData(false);
    }
  }

  async function Borrar(id: number) {
    try {
      axios
        .delete(`${urlClientes}/${id}`)
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
          getClientes();
        });
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  return (
    <>
      <PageHeader
        title="Clientes"
        hasCreateButton
        onCreateButtonClick={() => handleDialogOpen(dialogActions.Registrar)}
      />
      <Container>
        <Cargando isLoading={loadingData}></Cargando>
        <MUIDataTable data={clientes} columns={tableColumns} options={options} />
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth={'sm'}
        >
          <DialogTitle>Cliente</DialogTitle>
          <DialogContent>
            {dialogAction === dialogActions.Registrar ? (
              <FormularioClientes
                modelo={{
                  idCliente: 0,
                  nombreCompleto: '',
                  domicilio: '',
                  email: '',
                  telefono: '',
                  edad: 0
                }}
                onSubmit={async (cliente: clienteDTO) => {
                  await Crear(cliente);
                  handleDialogClose();
                }}
              ></FormularioClientes>
            ) : (
              <>
                <FormularioClientes
                  modelo={clienteEditar}
                  onSubmit={async (cliente: clienteDTO) => {
                    await Editar(cliente);
                    handleDialogClose();
                  }}
                ></FormularioClientes>
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
