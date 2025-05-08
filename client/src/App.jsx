import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './pages/Layout'
import Nopage from './pages/Nopage'
import Login from './pages/Login'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectRoute from './components/layout/ProtectRoute';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path:'*',
        element: <Nopage/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/dashboard',
        element:
        <ProtectRoute>
          <Dashboard/>
        </ProtectRoute>
      }
      
    ]
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App