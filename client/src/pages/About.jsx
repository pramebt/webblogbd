import React, { useRef } from "react";
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
const About = () => {
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="px-20">
      <motion.div 
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className=" flex flex-col md:flex-row md:justify-between mt-20  justify-center items-center">
        <motion.div 
        variants={fadeUp}
        custom={0}
        className="md:hidden bg-[#eaaa3c] w-40 h-40 rounded-full mb-10"></motion.div>
        <div className=" text-center md:w-1/2 md:ml-10 md:text-start ">
          <motion.h1 
          variants={fadeUp}
          custom={1}  className="text-[28px] md:text-[52px] font-semibold">
            Front-end Developer
          </motion.h1>
          <motion.p 
          variants={fadeUp}
          custom={2}>
            I’m a Junior Front-End Developer who’s truly passionate about
            crafting beautiful, user-focused websites and breathing life into
            designs through code and I built this website to document various
            programming techniques.
          </motion.p>
          <div className="mt-10 mb-10">
            <a href="https://bd-portfolio-real.vercel.app/" target="_blank">
              <motion.button 
              variants={fadeUp}
              custom={3}
              className="bg-amber-300 px-5 py-3 rounded-3xl font-semibold text-white">
                Portfolio
              </motion.button>
            </a>
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <motion.div
          variants={fadeUp}
          custom={2}
          className="hidden md:block bg-[#eaaa3c] w-40 h-40 rounded-full"></motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
