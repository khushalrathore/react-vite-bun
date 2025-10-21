
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/index.jsx";
import { Layout } from "../pages/layout/Layout.jsx";
const routes = createBrowserRouter([
  {
    path: '/', element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'docs', element: <div>DOCS ? OR NOT ?</div> },
    ]
  },
  { path: '*', element: <div>404</div> },
]);
export const Routes = () => (
  <RouterProvider router={routes} />
);


