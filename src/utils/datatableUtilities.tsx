import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentIcon from '@mui/icons-material/Assignment';


export const dataTableTextLabels = {
  body: {
    noMatch: 'No se encontraron registros que coincidan',
    toolTip: 'Clasificar',
    columnHeaderTooltip: (column) => `Ordenar por ${column.label}`
  },
  pagination: {
    next: 'Siguiente página',
    previous: 'Página anterior',
    rowsPerPage: 'Registros por página:',
    displayRows: 'de'
  },
  toolbar: {
    search: 'Buscar',
    downloadCsv: 'Descargar CSV',
    print: 'Imprimir',
    viewColumns: 'Ver Columnas',
    filterTable: 'Filtrar Tabla'
  },
  filter: {
    all: 'Todo',
    title: 'FILTROS',
    reset: 'REESTABLECER'
  },
  viewColumns: {
    title: 'Mostrar Columnas',
    titleAria: 'Mostrar/Ocultar Columnas'
  },
  selectedRows: {
    text: 'registro(s)',
    delete: 'Borrar',
    deleteAria: 'Borrar Registros Seleccionados'
  }
};

function formatearFecha(fechaStr: string): string {
  const fecha = new Date(fechaStr);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear().toString().slice(-2);
  
  return`${dia}/${mes}/${anio}`;
}

export function commandsColumn(onClickEdit, onClickDelete) {
  return {
    name: 'Acciones',
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRenderLite: (dataIndex: number) => {
        return (
          <>
            <IconButton
              aria-label="update"
              color="primary"
              onClick={() => onClickEdit(dataIndex)}
            >
              <EditIcon />
            </IconButton>
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
  };
}

export function commandsColumnInventario(
  onClickEdit,
  onClickDelete,
  onClickMovimientos
) {
  return {
    name: 'Acciones',
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRenderLite: (dataIndex: number) => {
        return (
          <>
            <IconButton
              aria-label="movimientos"
              color="primary"
              onClick={() => onClickMovimientos(dataIndex)}
            >
              <LocalShippingIcon />
            </IconButton>
            <IconButton
              aria-label="update"
              color="primary"
              onClick={() => onClickEdit(dataIndex)}
            >
              <EditIcon />
            </IconButton>
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
  };
}

export function commandsColumnPedidos(
  onClickEdit,
  onClickDelete,
  onClickDetalles
) {
  return {
    name: 'Acciones',
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRenderLite: (dataIndex: number) => {
        return (
          <>
            <IconButton
              aria-label="movimientos"
              color="primary"
              onClick={() => onClickDetalles(dataIndex)}
            >
              <AssignmentIcon />
            </IconButton>
            <IconButton
              aria-label="update"
              color="primary"
              onClick={() => onClickEdit(dataIndex)}
            >
              <EditIcon />
            </IconButton>
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
  };
}

export function currencyColumn(name: string, label: string, data: any) {
  return {
    name: name,
    label: label,
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRenderLite: (dataIndex: number) => {
        return (
          <p>
            {new Intl.NumberFormat('es-MX', {
              style: 'currency',
              currency: 'MXN'
            }).format(data.at(dataIndex)[name])}
          </p>
        );
      }
    }
  };
}

export function dateColumn(name: string, label: string, data: any) {
  return {
    name: name, 
    label: label,
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRenderLite: (dataIndex: number) => {
        return (
          <p>
            {formatearFecha(data.at(dataIndex)[name])}
          </p>
        );
      }
    }
  };
}
