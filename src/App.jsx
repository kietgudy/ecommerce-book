import React from "react";
import LoginPage from "./pages/login";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ContactPage from "./pages/contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";

const Layout = () => {
  return <div className="layout">
  <Header/>
  <Outlet/>
  <Footer/>
  </div>;
};

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404</div>,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
