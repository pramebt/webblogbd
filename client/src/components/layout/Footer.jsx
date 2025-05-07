// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 px-20">
       <h1 className='flex justify-center mb-5'>bdblog</h1> 
      <div className='bg-white w-full h-[1px] px-10'></div>
      <div className="w-full mt-5  flex flex-col md:flex-row items-center justify-between">
        
        {/* Copyright */}
        <p className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} BD. All rights reserved.
        </p>
        
        {/* Contact info */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
          <a href="tel:+66994594970" className="hover:text-white">
            Phone: +66 99 459 4970
          </a>
          <a href="mailto:contact@yourblog.com" className="hover:text-white">
            Email: contact@yourblog.com
          </a>
        </div>
      </div>
    </footer>
  );
}
