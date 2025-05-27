import React from 'react'

const Cardprojectview = ({ item }) => {
  return (
    <div
      className="bg-white rounded-2xl p-4 cursor-pointer hover:scale-[1.025] transition-transform duration-300 border border-gray-200 shadow-none"
    >
      {/* Project Image */}
      <div className="mb-3">
        <img
          src={item?.image_url || "/assets/no-image.svg"}
          alt={item?.title || "no data"}
          className="w-full h-48 object-cover rounded-xl bg-gray-100"
        />
      </div>
      {/* Project Title */}
      <div className="px-1">
        <h1 className="font-medium text-base text-gray-800 truncate">
          {item?.title || "No title"}
        </h1>
      </div>
    </div>
  )
}

export default Cardprojectview