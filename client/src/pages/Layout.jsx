import React from 'react'
import Navbar from '../components/layout/nav/Navbar'
import Home from './Home'
import Footer from '../components/layout/nav/Footer'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* <img src="/assets/images/paperbg.jpg" alt="" className="fixed inset-0 object-cover w-full h-full -z-10" /> */}
      <div><Navbar /></div>
      <div className='flex-1 mt-20'><Outlet/></div>
      <div className=''><Footer /></div>
      
    </div>
  )
}

export default Layout