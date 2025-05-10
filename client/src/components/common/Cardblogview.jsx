import React from "react";
import { DateTime } from 'luxon'

const Cardblogview = ({item}) => {
  return (
     <div className="bg-white w-[300px] h-[280px] rounded-[20px] ">
          
          <div className="p-[10px]">
            <img
              src="/assets/images/login-bg2.png"
              alt="bg"
              className="rounded-[20px] h-[180px]"
            />
          </div>
    
          <div className="px-10">
            <h1>{item?.title || "no data"}</h1>
            <p className="text-gray-500">
            {item?.created_at
        ? DateTime
            .fromISO(item.created_at, { zone: 'utc' })        
            .setZone('Asia/Bangkok')                          
            .toFormat("dd MMMM yyyy")              
        : 'no data'}
            </p>
          </div>
          
        </div>
      
  )
}

export default Cardblogview