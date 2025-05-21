import React, { useEffect, useState, useRef } from "react";
import { getAllProjects } from "../../service/project"; // เปลี่ยนจาก blogs เป็น getProjects
import Cardprojectview from "../components/common/Cardprojectview";
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
const Project = () => {
  const [data, setData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProjects();
        setData(res || []);
      } catch (error) {
        console.error("Show project fail: ", error);
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
        className="text-4xl font-bold mb-10"
      >
        Projects
      </motion.h1>
      {data.length === 0 ? (
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
        <motion.div 
        variants={fadeUp}
        custom={2}
        className="grid w-full h-fit gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(item)} // 👈 เปิด modal
            >
              <Cardprojectview item={item} />
            </div>
          ))}
        </motion.div>
      )}

      {/* ✅ Modal แสดงข้อมูลโปรเจกต์ */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-lg p-6 relative">
            {/* ปุ่มปิด */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setSelectedProject(null)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
            <p className="text-gray-600 mb-4">{selectedProject.subtitle}</p>
            {selectedProject.image_url && (
              <img
                src={selectedProject.image_url}
                alt="project"
                className="w-full rounded-lg mb-4"
              />
            )}
            <p className="text-gray-800 mb-4">{selectedProject.description}</p>

            {/* ลิงก์ */}
            <div className="flex flex-col gap-2">
              {selectedProject.demo_url && (
                <a
                  href={selectedProject.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  🔗 Live Demo
                </a>
              )}
              {selectedProject.github_url && (
                <a
                  href={selectedProject.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 underline"
                >
                  🛠 GitHub Repository
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Project;
