import React, { useState } from 'react';
import LoginPage from './pages/login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const Layout = () => {
  return (
    <>
    main
    </>
  )
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404</div>
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
  ]);
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}
