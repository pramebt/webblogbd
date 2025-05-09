import React from "react";

const Cardblog = ({ item }) => {
  return (
    <div className="bg-[#0066FE]/10 w-[300px] h-[280px] rounded-[20px] ">
      <div className="p-[10px]">
        <img src="/assets/images/login-bg2.png" alt="bg" className="rounded-[20px] h-[180px]" />
      </div>
    <div className="px-10">
      <h1>{item?.title || "no data"}</h1>
      <p className="text-gray-500">{item?.created_at || "no data"}</p>
    </div>
    </div>
  );
};

export default Cardblog;
