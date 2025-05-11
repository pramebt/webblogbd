import React from 'react'
import { useEffect, useState } from 'react'
import { blogs } from '../../service/blog'
import { useNavigate } from 'react-router-dom'
import Cardblogview from '../components/common/Cardblogview'
const Blogs = () => {
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
  return (
    <div className="px-20">
      {/* grid blog preview */}
      <div className="mt-5 px-10 w-full flex justify-center">
        <div className="h-fit grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer rounded-[20px] overflow-hidden   transition-all duration-200"
              onClick={() => navigate(`/blogs/${item.id}`)}
            >
             <Cardblogview item={item} /> 
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs