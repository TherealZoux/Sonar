import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import Layout from './layouts/main';

import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import NotFound from './pages/NotFound';
import Podcast from './pages/Podcast';
import Category from './pages/Category';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "library",
        element: <Library />
      },
      {
        path: "podcast/:id",
        element: <Podcast />
      },
      {
        path: "category/:id",
        element: <Category />
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
