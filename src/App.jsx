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
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./common/Loading";
import NotFoundPage from "./pages/notfound";
import BookPage from "./pages/book";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";

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
  const isLoading = useSelector(state => state.account.isLoading);

  const getAccount = async () => {
    if (window.location.pathname === '/login' 
      || window.location.pathname === 'register'
     ) 
      return;

    const res = await callFetchAccount();
    if(res && res.data) {
      dispatch(doGetAccountAction(res.data))
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
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFoundPage/>,
      children: [
        { index: true, element: 
        <ProtectedRoute>
          <AdminPage />
        </ProtectedRoute>
      },
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
    {isLoading === false 
      || window.location.pathname === '/login' 
      || window.location.pathname === '/register' 
      || window.location.pathname === '/' 
      ? 
      <RouterProvider router={router} />
      : <Loading/>
    }
    </>
  );
}
