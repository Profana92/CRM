import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from 'routes/Root.tsx';
import ErrorPage from 'routes/pages/ErrorPage.tsx';
import Home from 'routes/pages/Home.tsx';
import Products from 'routes/pages/Products.tsx';
import Clients from 'routes/pages/Clients.tsx';
import Institutions from 'routes/pages/Institutions.tsx';
import Offers from 'routes/pages/Offers.tsx';
import Orders from 'routes/pages/Orders.tsx';
import LoginForm from 'routes/pages/login/login.tsx';
import PrivateRoute from 'routes/pages/login/privateRoute.tsx';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCdkx0QHxbf1xzZFdMZFxbRXVPMyBoS35RdUVkW3lecnBVR2RdUEV3');

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
            element: (
               <PrivateRoute>
                  <Products />
               </PrivateRoute>
            ),
         },

         {
            path: 'Clients',
            element: (
               <PrivateRoute>
                  <Clients />
               </PrivateRoute>
            ),
         },
         {
            path: 'institution',
            element: (
               <PrivateRoute>
                  <Institutions />
               </PrivateRoute>
            ),
         },
         {
            path: 'offers',
            element: (
               <PrivateRoute>
                  <Offers />
               </PrivateRoute>
            ),
         },
         {
            path: 'orders',
            element: (
               <PrivateRoute>
                  <Orders />
               </PrivateRoute>
            ),
         },
         {
            path: 'knowledge_base',
            element: (
               <PrivateRoute>
                  <Products />
               </PrivateRoute>
            ),
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
