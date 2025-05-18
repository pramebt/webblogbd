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
import Project from './pages/Project';
import ProjectManage from './pages/dashboard/ProjectManage';
import ProjectPost from './pages/dashboard/ProjectPost';
import ProjectEdit from './pages/dashboard/ProjectEdit';

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
        path:'/project',
        element:<Project/>
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
            path:'/dashboard/blog',
            element:<Dashboard/>
          },
          {
            path:'/dashboard/blog/post',
            element:<Post/>
          },
          {
            path:'/dashboard/blog/editpost/:id',
            element:<Editpost/>
          },
          {
            path:'/dashboard/blog/manage',
            element:<Manage/>
          },
          {
            path:'/dashboard/project/manage',
            element:<ProjectManage/>
          },
          {
            path:'/dashboard/project/post',
            element:<ProjectPost/>
          },
          {
            path:'/dashboard/project/edit/:id',
            element:<ProjectEdit/>
          },
          

        ]
      }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App