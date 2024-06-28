import React, { useEffect } from "react";
import LoginPage from "./pages/login";
import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ContactPage from "./pages/contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { callFetchAccount } from "./services/api";
import { useDispatch } from "react-redux";
import { doGetInfoAccount } from "./redux/account/accountSlice";

const Layout = () => {
  return <div className="layout">
  <Header/>
  <Outlet/>
  <Footer/>
  </div>;
};

//Lay data user tu api de gui den redux
export default function App() {
  const dispatch = useDispatch();
  const getAccount = async () => {
    const res = await callFetchAccount();
    if(res && res.data) {
      dispatch(doGetInfoAccount(res.data))
    }
  }
  useEffect(() => {
    getAccount();
  }, [])

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
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
