import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './pages/Layout'
import Nopage from './pages/Nopage'
import Login from './pages/Login'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Nopage />,
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App