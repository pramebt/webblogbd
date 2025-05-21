import React from 'react'

const Cardprojectview = ({item}) => {
  return (
    <div
          className="border border-black bg-white/80 backdrop-blur rounded-4xl px-5 py-5 cursor-pointer hover:scale-105 transition-all duration-500"
          
        >
          <div>
            <div className="p-[10px]">
              <img
                src={item?.image_url || "no data"}
                alt={item?.title || "no data"}
                className="border border-white w-full h-[250px] object-cover rounded-2xl"
              />
            </div>
    
            <div className="bg-white flex flex-row mt-5 p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200 ease-in-out">
              <h1 className="font-semibold text-lg">{item?.title || "no data"}</h1>
            </div>
          </div>
    
          {/* Removed Edit and Delete buttons as requested */}
        </div>
  )
}

export default Cardprojectview