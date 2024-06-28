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
import { useDispatch, useSelector } from "react-redux";
import { doGetInfoAccount } from "./redux/account/accountSlice";
import Loading from "./common/Loading";
import NotFoundPage from "./pages/notfound";

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
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

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
      errorElement: <NotFoundPage/>,
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
    {isAuthenticated === true ? 
      <RouterProvider router={router} />
      : <Loading/>
    }
    </>
  );
}
