import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './pages/Layout'
import Nopage from './pages/Nopage'
import Login from './pages/Login'
import Home from './pages/Home';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectRoute from './components/layout/ProtectRoute';
import Post from './pages/dashboard/Post';
import Manage from './pages/dashboard/Manage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Showblog from './pages/Showblog';
import Editpost from './pages/dashboard/Editpost';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';

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
        path:'/blogs/:id',
        element:<Showblog/>
      },
      {
        path:'/blogs',
        element:<Blogs/>,
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/contact'
        ,element:<Contact/>
      }
      
    ]
  },
  {
        path:'/dashboard',
        element:
        <ProtectRoute>
          <DashboardLayout/>
        </ProtectRoute>,
        children:[
          {
            path:'/dashboard',
            element:<Dashboard/>
          },
          {
            path:'/dashboard/post',
            element:<Post/>
          },
          {
            path:'/dashboard/editpost/:id',
            element:<Editpost/>
          },
          {
            path:'/dashboard/manage',
            element:<Manage/>
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