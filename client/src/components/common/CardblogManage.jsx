import React from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
const CardblogManage = ({ item, onSuccess }) => {
  const navigate = useNavigate();

  // ฟังก์ชันลบบล็อกทันทีและ refresh หน้า
  const handleDelete = async () => {
    try {
      await deleteBlogById(item.id);
      alert("Blog deleted successfully!");
      if (onSuccess) onSuccess();
      window.location.reload();
    } catch (error) {
      console.error("Delete failed: ", error);
      alert("Failed to delete the blog.");
    }
  };

  // ฟังก์ชันกด Edit: นำทางไปยังหน้าแก้ไขพร้อม id
  const handleEdit = (e) => {
    e.stopPropagation(); // ป้องกันคลิกลิงก์ parent
    navigate(`/dashboard/editpost/${item.id}`);
  };

  return (
    <div className="bg-[#0066FE]/10 w-full h-[280px] rounded-[20px] flex flex-col justify-between cursor-pointer">
      <div>
        <div className="p-[10px]">
          <img
            src="/assets/images/login-bg2.png"
            alt="bg"
            className="rounded-[20px] h-[180px] w-full object-cover"
          />
        </div>

        <div className="px-5 flex flex-row">
          <div className="flex-1">
          <h1 className="font-semibold text-lg">{item?.title || "no data"}</h1>
          <p className="text-gray-500 text-sm">
            {item?.created_at
              ? DateTime.fromISO(item.created_at, { zone: "utc" })
                  .setZone("Asia/Bangkok")
                  .toFormat("dd MMMM yyyy")
              : "no data"}
          </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleEdit}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // ป้องกันไม่ให้ parent onClick ทำงาน
                handleDelete();
              }}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardblogManage;
