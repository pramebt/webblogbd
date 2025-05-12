import React from 'react'
import { useEffect, useState } from 'react'
import { blogs } from '../../service/blog'
import { useNavigate } from 'react-router-dom'
import Cardblogview from '../components/common/Cardblogview'
import CardLoading from '../components/common/CardLoading'
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
        {data.length === 0 ? (
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
            {data.map((item, index) => (
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
  )
}

export default Blogs