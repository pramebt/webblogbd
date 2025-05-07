import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './pages/Layout'
import Nopage from './pages/Nopage'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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