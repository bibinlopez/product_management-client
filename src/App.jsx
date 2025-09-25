import "./App.css"
import { ToastContainer } from "react-toastify"

import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <HomeLayout />,
      element: <div> welcome to home page</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    // {
    //   path: "/product",
    //   element: <ProductDetails />,
    // },
  ])

  return (
    <>
      <ToastContainer position='top-center' />
      <RouterProvider router={router} />
    </>
  )
}

export default App
