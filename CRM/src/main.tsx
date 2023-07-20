import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from 'routes/Root.tsx';
import ErrorPage from 'routes/pages/ErrorPage.tsx';

const router = createBrowserRouter([
   {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
         {
            path: 'Children',
            element: <h1>Children</h1>,
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
