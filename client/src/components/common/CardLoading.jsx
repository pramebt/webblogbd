import React from 'react'
import { DateTime } from 'luxon'
const CardLoading = () => {
  return (
    <div className="w-full h-[280px] rounded-[20px] flex flex-col justify-between animate-pulse">
      <div>
        <div className="p-[10px]">
          <div className="rounded-[20px] h-[180px] w-full bg-gray-200" />
        </div>

        <div className="px-5 space-y-2">
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>

      
    </div>
  );
};

export default CardLoading