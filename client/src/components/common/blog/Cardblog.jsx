import React from "react";
import { DateTime } from 'luxon';

const Cardblog = ({ item }) => {
  return (
    <div
      className="bg-[#0066FE]/10 w-full h-[280px] rounded-[20px] flex flex-col justify-between cursor-pointer"
      onClick={() => {/* navigate to detail ถ้ามี */}}
    >
      <div>
        <div className="p-[10px]">
          <img
            src="/assets/images/login-bg2.png"
            alt="bg"
            className="rounded-[20px] h-[180px] w-full object-cover"
          />
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
  );
};

export default Cardblog;
