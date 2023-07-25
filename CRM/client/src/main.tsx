import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import { createBrowserRouter, redirect, RouterProvider, useLocation } from 'react-router-dom';
import Root from 'routes/Root.tsx';
import ErrorPage from 'routes/pages/ErrorPage.tsx';
import Home from 'routes/pages/Home.tsx';
import Products from 'routes/pages/Products.js';
import Clients from 'routes/pages/Clients.js';
import LoginForm from 'routes/pages/login/login.js';
import PrivateRoute from 'routes/pages/login/privateRoute.js';
const router = createBrowserRouter([
   {
      path: '/login',
      element: <LoginForm />,
   },
   {
      path: '/',
      element: (
         <PrivateRoute>
            <Root />
         </PrivateRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: 'products',
            element: <Products />,
         },
         {
            path: 'login',
            element: <LoginForm />,
         },
         {
            path: 'Clients',
            element: <Clients />,
         },
         {
            path: 'institution',
            element: <Products />,
         },
         {
            path: 'offers',
            element: <Products />,
         },
         {
            path: 'orders',
            element: <Products />,
         },
         {
            path: 'knowledge_base',
            element: <Products />,
         },
      ],
   },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </React.StrictMode>,
);
