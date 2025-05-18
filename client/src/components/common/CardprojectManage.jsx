import React from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { deleteProjectById } from "../../../service/project";

const CardprojectManage = ({ item, onSuccess }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProjectById(item.id);
      alert("Project deleted successfully!");
      if (onSuccess) onSuccess();
      window.location.reload();
    } catch (error) {
      console.error("Delete failed: ", error);
      alert("Failed to delete the project.");
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/dashboard/project/edit/${item.id}`);
  };

  return (
    <div className="bg-[#0066FE]/10 w-full h-[300px] rounded-[20px] flex flex-col justify-between cursor-pointer hover:shadow-lg transition">
      <div>
        <div className="p-[10px]">
          <img
            src={item?.image_url || "/assets/images/default-project.png"}
            alt={item?.title}
            className="rounded-[20px] h-[180px] w-full object-cover"
          />
        </div>

        <div className="px-5 flex flex-row items-start justify-between">
          <div className="flex-1">
            <h1 className="font-semibold text-lg">{item?.title || "Untitled Project"}</h1>
            <p className="text-gray-500 text-sm line-clamp-1">{item?.subtitle}</p>
            <p className="text-gray-400 text-xs">
              {item?.created_at
                ? DateTime.fromISO(item.created_at, { zone: "utc" })
                    .setZone("Asia/Bangkok")
                    .toFormat("dd MMM yyyy")
                : "no date"}
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
                e.stopPropagation();
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

export default CardprojectManage;