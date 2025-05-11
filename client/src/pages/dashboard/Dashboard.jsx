import React, { useEffect, useState } from 'react'
import { blogs } from '../../../service/blog'
import Cardblog from '../../components/common/Cardblog'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const [data,setData] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const res = await blogs()
        setData(res || [])
      }catch(error){
        console.error("Show blog failed: ",error)
      }
    }
    fetchData()
  },[])

  return (
    <div className='px-10 w-full h-screen flex justify-center'>
      <div className='h-fit grid md:grid-cols-2 lg:grid-cols-3 lg:gap-10 md:gap-5 gap-y'>
      {
        data.map((item,index)=>{
         return <div
            key={index}
            className="group cursor-pointer rounded-[20px] overflow-hidden shadow hover:shadow-lg transition-all duration-200"
            onClick={() => navigate(`/blogs/${item.id}`)}
          >
         <div>
          <Cardblog item={item}/>
         </div>
         </div>
        })
      }
      </div>
      </div>
  )
}

export default Dashboard