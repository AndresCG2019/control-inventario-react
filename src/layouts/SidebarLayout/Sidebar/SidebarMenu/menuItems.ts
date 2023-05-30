import { ReactNode } from 'react';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Menú',
    items: [
      {
        name: 'Categorías',
        link: '/categorias/indiceCategorias',
        icon: CategoryTwoToneIcon
      },
      {
        name: 'Proveedores',
        link: '/proveedores/indiceProveedores',
        icon: AccountCircleTwoToneIcon
      },
      {
        name: 'Clientes',
        link: '/clientes/indiceClientes',
        icon: AccountCircleTwoToneIcon
      },
      {
        name: 'Inventario',
        link: '/inventario/indiceInventario',
        icon: Inventory2TwoToneIcon
      },
      {
        name: 'Pedidos',
        link: '/pedidos/indicePedidos',
        icon: AssignmentTwoToneIcon
      }
    ]
  }
];

export default menuItems;
