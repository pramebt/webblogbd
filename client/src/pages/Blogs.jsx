import React from "react";
import { useEffect, useState,useRef } from "react";
import { blogs } from "../../service/blog";
import { useNavigate } from "react-router-dom";
import Cardblogview from "../components/common/blog/Cardblogview";
import CardLoading from "../components/common/CardLoading";
import { motion, AnimatePresence, useInView } from "framer-motion";
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const Blogs = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="px-4 sm:px-10 lg:px-20 py-10 flex flex-col items-center"
    >
      <motion.h1 
        variants={fadeUp}
        custom={1}
      className="text-center text-3xl md:text-4xl lg:text-5xl mb-5">
        Blogs
        </motion.h1>
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
          <motion.div 
          variants={fadeUp}
          custom={2}
          className="grid w-full h-fit gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => navigate(`/blogs/${item.id}`)}
              >
                <Cardblogview item={item} />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Blogs;
