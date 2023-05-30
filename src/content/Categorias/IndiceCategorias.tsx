import { Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { urlCategorias, urlCuentas } from 'src/utils/endpoints';
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
import { categoriasDTO } from './categorias.model';
import FormularioCategorias from './FormularioCategorias';
import { claim } from 'src/auth/auth.model';
import { obtenerClaims } from 'src/auth/ManejadorJWT';

export default function IndiceCategorias() {
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState<categoriasDTO[]>([]);
  const [openDialog, setopenDialog] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [dialogAction, setDialogAction] = useState<number>(
    dialogActions.Registrar
  );
  const [categoriaEditar, setCategoriaEditar] = useState<categoriasDTO>();

  const tableColumns = [
    { name: 'descripcion', label: 'Nombre' },
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

    getCategorias();
  }, [])
  

  function onClickEdit(dataIndex: number) {
    let element: categoriasDTO = categorias.at(dataIndex);
    setDialogAction(dialogActions.Editar);
    setCategoriaEditar(element);
    handleDialogOpen(dialogActions.Editar);
  }

  function onClickDelete(dataIndex: number) {
    let element: categoriasDTO = categorias.at(dataIndex);
    handleDelete(element.id);
  }

  const handleDelete = (item) => {
    confirm({
      title: 'Atención',
      description: `¿Estás seguro de que deseas borrar esta categoría?`,
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

  async function Crear(categoria: categoriasDTO) {
    try {
      const respuesta: AxiosResponse = await axios.post(urlCategorias, categoria);
      ToastCompletado('Se registró la categoría exitosamente');
      getCategorias();
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  async function Editar(categoriaEditar: categoriasDTO) {
    try {
      await axios.put(`${urlCategorias}/${categoriaEditar.id}`, categoriaEditar);
      ToastCompletado('Se editó la categoría exitosamente');
      getCategorias();
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  async function getCategorias() {
    try {
      setLoadingData(true);
      const respuesta: AxiosResponse<categoriasDTO[]> = await axios.get(urlCategorias);
      setCategorias(respuesta.data);
      setLoadingData(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoadingData(false);
    }
  }

  async function Borrar(id: number) {
    try {
      axios
        .delete(`${urlCategorias}/${id}`)
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
          getCategorias();
        });
    } catch (error: any) {
      ToastError('Algo salio mal...');
    }
  }

  return (
    <>
      <PageHeader
        title="Categorías"
        hasCreateButton
        onCreateButtonClick={() => handleDialogOpen(dialogActions.Registrar)}
      />
      <Container>
        <Cargando isLoading={loadingData}></Cargando>
        <MUIDataTable data={categorias} columns={tableColumns} options={options} />
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth={'sm'}
        >
          <DialogTitle>Categoría</DialogTitle>
          <DialogContent>
            {dialogAction === dialogActions.Registrar ? (
              <FormularioCategorias
                modelo={{
                  id: 0,
                  descripcion: ''
                }}
                onSubmit={async (categoria: categoriasDTO) => {
                  await Crear(categoria);
                  handleDialogClose();
                }}
              ></FormularioCategorias>
            ) : (
              <>
                <FormularioCategorias
                  modelo={categoriaEditar}
                  onSubmit={async (categoria: categoriasDTO) => {
                    await Editar(categoria);
                    handleDialogClose();
                  }}
                ></FormularioCategorias>
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
