import React from 'react'

const SideNavbar = () => {
  return (
    <div className=' bg-gray-800 text-white w-64 min-h-screen'>
      <div className='border px-10 h-full flex flex-col items-start justify-center '>
      <div className='p-4 '>
        <a href="/"><h2 className='text-lg font-bold'>Home</h2></a>
      </div>
      <div className='p-4'>
        <a href="/dashboard"><h2 className='text-lg font-bold'>Dashboard</h2></a>
      </div>
      <div className='p-4'>
        <a href="/dashboard/post"><h2 className='text-lg font-bold'>Post</h2></a>
      </div>
      <div className='p-4 '>
        <a href="/dashboard/manage"><h2 className='text-lg font-bold'>Manage</h2></a>
      </div>
      </div>
    </div>
  )
}

export default SideNavbar