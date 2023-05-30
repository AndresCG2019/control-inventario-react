import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout/sidebarLayoutIndex';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { obtenerClaims } from './auth/ManejadorJWT';
import { claim } from './auth/auth.model';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Welcome = Loader(lazy(() => import('src/content/Welcome')));

const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));

const LoginLayout = Loader(lazy(() => import('src/auth/LoginLayout')));


const Registro = Loader(lazy(() => import('src/auth/Registro')));
const IndiceCategorias = Loader(lazy(() => import('src/content/Categorias/IndiceCategorias')));
const IndiceProveedores = Loader(lazy(() => import('src/content/Proveedores/IndiceProveedores')));
const IndiceClientes = Loader(lazy(() => import('src/content/Clientes/IndiceClientes')));
const IndiceInventario = Loader(lazy(() => import('src/content/Inventario/IndiceInventario')));
const IndicePedidos = Loader(lazy(() => import('src/content/Pedidos/IndicePedios')));

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

function obtenerClaimsWrapper(): claim[] {
  return obtenerClaims();
}

const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        // si hay un usuario logeado se redirige a welcome; si no lo hay, se redirige a login
        path: '/',
        element:
          obtenerClaims().length > 0 ? (
            <Navigate to="/modulos/welcome" replace />
          ) : (
            <Navigate to="/login" replace />
          )
      },
      {
        path: 'login',
        element: <LoginLayout />
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: '/modulos',
    element: <SidebarLayout />,
    children: [
      {
        path: 'forms',
        element: <Forms />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'welcome',
        element: <Welcome />
      }
    ]
  },
  {
    path: '/usuarios',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/usuarios/indiceUsuarios" replace />
      },
      { path: 'register', element: <Registro /> },
    ]
  },
  {
    path: '/proveedores',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/provedores/indiceProveedores" replace />
      },
      { path: 'indiceProveedores', element: <IndiceProveedores /> },
    ]
  },
  {
    path: '/clientes',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/clientes/indiceClientes" replace />
      },
      { path: 'indiceClientes', element: <IndiceClientes /> },
    ]
  },
  {
    path: '/categorias',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/categorias/indiceCategorias" replace />
      },
      { path: 'indiceCategorias', element: <IndiceCategorias /> },
    ]
  },
  {
    path: '/inventario',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/inventario/indiceInventario" replace />
      },
      { path: 'indiceInventario', element: <IndiceInventario /> },
    ]
  },
  {
    path: '/pedidos',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/pedidos/indicePedidos" replace />
      },
      { path: 'indicePedidos', element: <IndicePedidos /> },
    ]
  }
];

export default routes;
