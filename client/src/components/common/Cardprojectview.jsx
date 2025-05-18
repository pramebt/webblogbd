import React from 'react'
import { DateTime } from 'luxon'
const Cardprojectview = ({item}) => {
  return (
    <div
               className="w-full h-[280px] rounded-[20px] flex flex-col justify-between cursor-pointer"
             >
               <div>
                 <div className="p-[10px]">
                   <div className="bg-[#eaaa3c] rounded-[20px] h-[180px] w-full bg-cover"
                   ></div>
                 </div>
         
                 <div className="px-5">
                   <h1 className="font-semibold text-lg">{item?.title || "no data"}</h1>
                   <p className="text-gray-500 text-sm">
                     {item?.created_at
                       ? DateTime
                           .fromISO(item.created_at, { zone: 'utc' })
                           .setZone('Asia/Bangkok')
                           .toFormat("dd MMMM yyyy")
                       : 'no data'}
                   </p>
                 </div>
               </div>
         
               {/* Removed Edit and Delete buttons as requested */}
             </div>
  )
}

export default Cardprojectview