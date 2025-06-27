import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../pages/layout/Layout.jsx";
import { Home } from "../pages/index.jsx";
const routes = createBrowserRouter( [
  {
    path: '/', element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'docs', element: <div>DOCS ? OR NOT ?</div> },
    ]
  },
  { path: '*', element: <div>404</div> },
] );
export const Routes = () => (
  <RouterProvider router={ routes } />
);


