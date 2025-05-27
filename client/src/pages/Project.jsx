import React, { useEffect, useState, useRef } from "react";
import { getAllProjects } from "../../service/project"; // เปลี่ยนจาก blogs เป็น getProjects
import Cardprojectview from "../components/common/project/Cardprojectview";
import CardLoading from "../components/common/CardLoading";
import { motion, useInView } from "framer-motion";
import ProjectModal from "../components/common/project/ProjectModal";
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
      {/* ... โค้ดเดิม ... */}
      {data.length === 0 ? (
        // loading state เหมือนเดิม
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
          className="grid w-full h-fit gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(item)}
            >
              <Cardprojectview item={item} />
            </div>
          ))}
        </motion.div>
      )}

      {/* ✅ ใช้ ProjectModal แทน block modal เดิม */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
};

export default Project;