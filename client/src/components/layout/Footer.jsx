// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#2F2F2F] text-gray-300 py-6 px-20 rounded-t-2xl ">
       <h1 className='text-white flex justify-center mb-5'>BlOD</h1> 
      <div className='bg-white w-full h-[1px] px-10'></div>
      <div className="w-full mt-5  flex flex-col md:flex-row items-center justify-between">
        
        {/* Copyright */}
        <p className="text-white text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} BD. All rights reserved.
        </p>
        
        {/* Contact info */}
        <div className="flex flex-col   space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
          <a href="tel:+66994594970" className="text-white flex flex-row gap-3 hover:text-white">
            <img 
            src="/assets/icons/phone-icon.svg" 
            alt="phone"
            className='w-4' />+66 99 459 4970
          </a>
          <a href="mailto:bdforwk@gmail.com" className="text-white flex flex-row gap-3 hover:text-white">
            <img 
            src="/assets/icons/email-icon.svg" 
            alt="phone"
            className='w-4' /> bdforwk@gmail.com
          </a>
        </div>

        
      </div>
    </footer>
  );
}
