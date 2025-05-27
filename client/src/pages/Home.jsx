import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "../../service/blog";
import { motion } from "framer-motion";
import Cardblogview from "../components/common/blog/Cardblogview";
import CardLoading from "../components/common/CardLoading";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.13,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
};
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
   <motion.div 
      variants={container}
      initial="hidden"
      animate="visible"
      className="px-4 sm:px-10 lg:px-20"
    >
      <motion.div
        variants={container}
        className="flex flex-col items-center justify-center gap-5 pt-10"
      >
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-2xl md:text-[52px] font-bold text-gray-900 text-center"
        >Blogs Of Developer</motion.h1>
        <motion.div variants={fadeUp} custom={2} className="w-full flex justify-center">
          <img
            src="/assets/images/undraw_programming.svg"
            alt="background2"
            className="block md:hidden w-64"
          />
          <img
            src="/assets/images/undraw_monster-artist.svg"
            alt="background2"
            className="hidden md:block w-[360px]"
          />
        </motion.div>
      </motion.div>
      

       {/* Description */}
      <motion.div
        variants={fadeUp}
        custom={3}
        className="font-jetbrains text-center mt-8 mb-2 max-w-3xl mx-auto text-gray-700"
      >
        <h2 className="text-base md:text-lg font-normal">
          This blog is a curated journal of my learning journey covering coding projects,
          diverse skills, and actionable tips with practical guides to help you apply what I’ve discovered.
        </h2>
      </motion.div>

      <motion.div
        variants={fadeUp}
        custom={4}
        className="flex justify-center mt-6 mb-6"
      >
        <button
          onClick={() => navigate("/blogs")}
          className="px-8 py-3 bg-[#eaaa3c] hover:bg-amber-400 transition-all duration-200 text-white font-semibold text-lg rounded-3xl shadow-sm active:scale-95"
        >
          Read more blogs
        </button>
      </motion.div>

      {/* grid blog preview */}
      <motion.div
            variants={fadeUp}
            custom={5}
            className="flex justify-center py-5"
          >
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
      </motion.div>
    </motion.div>
  );
};

export default Home;
