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
import BookPage from "./pages/book";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";

const Layout = () => {
  return <div className="layout">
  <Header/>
  <Outlet/>
  <Footer/>
  </div>;
};
const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector(state => state.account.user);
  const userRole = user.role;

  return <div className="layout">
      {isAdminRoute && userRole === 'ADMIN' && <Header/>}
        <Outlet/>
      {isAdminRoute && userRole === 'ADMIN' && <Footer/>}
  </div>;
};


//Lay data user tu api de gui den redux
export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  const getAccount = async () => {
    if (window.location.pathname === '/login' 
      || window.location.pathname === 'register'
      || window.location.pathname === '/'
     ) 
      return;

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
    {isAuthenticated === true 
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
