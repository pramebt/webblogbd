import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../../service/blog";

import Cardblogview from "../components/common/Cardblogview";
import CardLoading from "../components/common/CardLoading";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await blogs();
        setData(res || []);
      } catch (error) {
        console.error("Show blog fail: ", error);
      }
    };
    fetchData();
  }, []);

  // Only show the first 3 items
  const previewData = data.slice(0, 3);

  return (
    <div className="px-20 ">
      <div className="flex flex-col items-center justify-center gap-5 pt-5">
        <h1 className="text-2xl md:text-[52px] ">Blogs Of Developer</h1>
        <img
          src="/assets/images/undraw_programming.svg"
          alt="background2"
          className="block md:hidden w-100"
        />
        <img
          src="/assets/images/undraw_quiet-street.svg"
          alt="background2"
          className="hidden md:block w-150"
        />
      </div>

      <div className="font-jetbrains text-center mt-5 ">
        <h1>Learn new techniques and best practices for popular tools.</h1>
      </div>

      <div className="flex justify-center mt-6 mb-6">
        <button
          onClick={() => navigate("/blogs")}
          className="px-6 py-3 bg-[#eaaa3c] text-white rounded-lg cursor-pointer"
        >
          Read more blogs
        </button>
      </div>

      {/* grid blog preview */}
      <div className="mt-5 px-2 md:px-10 max-w-5xl mx-auto">
        {previewData.length === 0 ? (
          // แสดง GIF โหลดเมื่อยังไม่มีข้อมูล
          <div className="flex justify-center py-20">
            <img
              src="/assets/icons/Rolling.gif"
              alt="Loading..."
              className="hidden md:block w-24 h-24"
            />
            <div className="block md:hidden space-y-6 w-full px-2 sm:px-10 max-w-sm mx-auto">
              <CardLoading />
            </div>
          </div>
        ) : (
          // แสดงตารางเมื่่อมีข้อมูลแล้ว
          <div className="grid w-full h-fit gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {previewData.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => navigate(`/blogs/${item.id}`)}
              >
                <Cardblogview item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
