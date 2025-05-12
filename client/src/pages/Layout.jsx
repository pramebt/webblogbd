import React from 'react'
import Navbar from '../components/layout/Navbar'
import Home from './Home'
import Footer from '../components/layout/Footer'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='h-screen flex flex-col'>
      <div><Navbar /></div>
      <div className='flex-1 mt-20'><Outlet/></div>
      <div className=''><Footer /></div>
      
    </div>
  )
}

export default Layout