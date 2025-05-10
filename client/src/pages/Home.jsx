import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { blogs } from "../../service/blog";
import Cardblogview from "../components/common/Cardblogview";

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
    <div className="pt-20 px-20">
      <div className="flex justify-center pt-5">
        <img src="/assets/images/background2.svg" alt="background2" />
      </div>

      <div className="text-center mt-5">
        <h1>Welcome to bdblog</h1>
        <p>Your go-to platform for insightful posts.</p>
      </div>

      {/* grid blog preview */}
      <div className="mt-5 px-10 w-full flex justify-center">
        <div className="h-fit grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {previewData.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer rounded-[20px] overflow-hidden   transition-all duration-200"
              onClick={() => navigate(`/blogs/${item.id}`)}
            >
              <Cardblogview item={item}/>
            </div>
          ))}
        </div>
      </div>

      {/* Show More button */}
      {data.length > 3 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/blogs')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
