import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// الستايل الأساسي
import './index.css';

// الـ Layout الأساسي
import Layout from './layouts/main';

// الصفحات
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import NotFound from './pages/NotFound';
import Podcast from './pages/Podcast';

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
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
