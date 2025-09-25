import "./App.css"
import { ToastContainer } from "react-toastify"

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import HomeLayout from "./pages/HomeLayout"

function App() {
  // Protected Route
  const ProtectedRoute = () => {
    const token = localStorage.getItem("accessToken")

    return token ? <Outlet /> : <Navigate to='/login' replace />
  }

  // Public Route
  const PublicRoute = () => {
    const token = localStorage.getItem("accessToken")

    return token ? <Navigate to='/' replace /> : <Outlet />
  }

  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <HomeLayout />,
        },
      ],
      errorElement: <div>error page</div>,
    },
    {
      element: <PublicRoute />,
      children: [
        { path: "/login", element: <Login /> },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "*",
      element: localStorage.getItem("accessToken") ? (
        <Navigate to='/' replace />
      ) : (
        <Navigate to='/login' replace />
      ),
    },
  ])
  return (
    <>
      <ToastContainer autoClose={2000} position='top-center' />
      <RouterProvider router={router} />
    </>
  )
}

export default App
