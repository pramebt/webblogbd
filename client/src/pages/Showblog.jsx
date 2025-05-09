// src/pages/Showblog.jsx
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getBlogById } from '../../service/blog'
const Showblog = () => {
  const navigate = useNavigate()
  const id = useParams()
  const [data,setData] = useState()

  useEffect(()=>{
    const fetchData = async () =>{
          try{
            const res = await getBlogById(id)
            setData(res)
          }catch(error){
            console.error("Show blog failed: ",error)
          }
        }
        fetchData()
  },[id])

  if(!data){
    return <h1>loading</h1>
  }
  return (
    <div className='pt-20 px-20'>
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-700">{data.description}</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-blue-500">Back</button>
      {/* แสดงฟิลด์อื่นๆ ตามที่มีใน item */}
    </div>
  )
}

export default Showblog